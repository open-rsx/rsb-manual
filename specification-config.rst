.. _specification-config:

===============
 Configuration
===============

The configuration mechanism in |project| is based on the following
principles:

* The configuration mechanism works identically across implementation
  languages

* We cannot (and do not want) to handle configuration of individual
  :term:`participants <participant>`:

  * The configuration mechanism is intended to provide process-wide
    defaults.

  * :term:`Participants <participant>` that require individual configurations have
    to be configured programmatically.

* Configuration options are obtained from multiple configuration
  sources:

  * `Configuration files`_
  * `Environment variables`_
..  * `Commandline options`_

* Configuration options are organized in a tree of `name-value pairs`_

Name-value Pairs
================

.. seealso::

   :ref:`Specification of inprocess Transport <specification-inprocess-options>`
     Options accepted by the inprocess :term:`transport`.

   :ref:`Specification of Spread-based Transport <specification-spread-options>`
     Options accepted by the :term:`Spread` :term:`transport`.

   :ref:`Specification of TCP-socket-based Transport <specification-socket-options>`
     Options accepted by the TCP-socket-based :term:`transport`.

Option names consist of multiple components which are specified in
configuration-source-dependent syntax. For example, in `configuration
files`_ section names like ``[transport.spread]`` are concatenated
with names of contained options like ``port`` to obtain
``transport.spread.port``. For `environment variables`_, the name
:envvar:`RSB_TRANSPORT_SPREAD_PORT` is mapped to
``transport.spread.port``.

Currently the following option tree is defined (uppercase option name
components are placeholders, :samp:`{LANGUAGE}` refers to the
implementation language, e.g. ``cpp``, ``java``, etc.)

.. parsed-literal::

  Name                                Type                      Comment
  ----                                ----                      -------

  + qualityofservice
  +-- reliability                     { UNRELIABLE, RELIABLE }
  +-- ordering                        { UNORDERED, ORDERED }

  + errorhandling
  +-- onhandlererror                  { LOG, PRINT, EXIT }

  + plugins
  +-- :samp:`{LANGUAGE}`
  +---- path                          list of strings
  +---- load                          list of strings

  + transport

  +-- :samp:`{NAME}`                                                     #
  +---- enabled                       bool                      #
  +---- :samp:`{TRANSPORT_SPECIFIC_OPTION}` ?                         # Subtree is valid
  +---- converter                                               # for all transports
  +------ :samp:`{LANGUAGE}`                                             #
  +-------- :samp:`{WIRE-SCHEMA}`              string                    #

Effective Configuration
=======================

Configuration sources are processed in the following order such that
options from sources which are processed later take precedence over
options from sources which are processed earlier:

#. Start with **Global Defaults**

#. Merge with **Config Files** ("Merge 4"), being the result of:

   #. Start with **System Config** file |system_config_file|
   
   #. Merge with **Installation Prefix Config** file, e.g. |prefix_config_file|
      if installed to :path:`/usr/local` ("Merge 1")

   #. Merge with **User Config** file |user_config_file| ("Merge 2")

   #. Merge with **Current Directory Config** file |pwd_config_file|
      ("Merge 3")

#. Merge with :ref:`options supplied via environment variables
   <specification-config-environment-variables>` ("Merge 5")

#. Merge with :ref:`programatically supplied options
   <specification-config-programmatic-options>` ("Merge 6")

..
   #. Merge with :ref:`commandline options
      <specification-config-commandline-options>` ("Merge 5")

   #. Merge with :ref:`options supplied via URI
      <specification-config-uri-options>` ("Merge 7")

.. digraph:: configuration_processing
   :caption: Computation of effective transport configuration. In
             merges, solid arrows indicate precedence over dashed
             arrows.

   fontname=Arial
   fontsize=11
   node [fontsize=11,fontname=Arial]
   edge [fontsize=11,fontname=Arial]

   node [shape = box]

   subgraph cluster_global_defaults {
     label = "Global Defaults"

     global_transports [label="options"]
   }

   subgraph cluster_config_files {
     label = "Config Files"

     system_config [label="System Config\ne.g. /etc/rsb.conf"]
     prefix_config [label="Prefix Config\ne.g. /usr/local/etc/rsb.conf"]
     user_config [label="User Config\ne.g. $HOME/.config/rsb.conf"]
     pwd_config [label="Current Dir. Config\ne.g. $(pwd)/rsb.conf"]

     subgraph cluster_config_merge_1 {
       label = "Merge 1"
       style = "rounded,filled"

       config_1_options [label = "options", fillcolor = "white", style="filled"]
     }

     system_config -> config_1_options [style="dashed"]
     prefix_config -> config_1_options
     
     subgraph cluster_config_merge_2 {
       label = "Merge 2"
       style = "rounded,filled"

       config_2_options [label = "options", fillcolor = "white", style="filled"]
     }

     config_1_options -> config_2_options [style="dashed"]
     user_config -> config_2_options

     subgraph cluster_config_merge_3 {
       label = "Merge 3"
       style = "rounded,filled"

       config_3_options [label = "options", fillcolor = "white", style="filled"]
     }

     config_2_options -> config_3_options [style="dashed"]
     pwd_config -> config_3_options

     config_3_options [label="options"]
     /* config_transports [label="options"] */

     /* config_2_options -> config_transports */
   }

   subgraph cluster_step_3 {
     label = "Merge 4"
     style = "rounded,filled"

     step_3_options [label = "options", fillcolor = "white", style="filled"]
   }

   global_transports -> step_3_options [style="dashed"]
   config_3_options -> step_3_options

   subgraph cluster_environment_variables_options {
     label = "Environment Variables"

     environment_options [label="options"]
   }

   subgraph cluster_step_4 {
     label = "Merge 5"
     style = "rounded,filled"

     step_4_options [label = "options", fillcolor = "white", style="filled"]
   }

   step_3_options -> step_4_options [style="dashed"]
   environment_options -> step_4_options

   /* subgraph cluster_commandline_options {
     label = "Commandline"

     commandline_options [label="options"]
   }

   subgraph cluster_step_5 {
     label = "Merge 6"
     style = "rounded,filled"

     step_5_options [label = "options", fillcolor = "white", style="filled"]
   }

   step_4_options -> step_5_options [style="dashed"]
   commandline_options -> step_5_options */

   subgraph cluster_programmatic_options {
     label = "Programmatic Options"

     programmatic_options [label="options"]
   }

   subgraph cluster_step_6 {
     label = "Merge 6"
     style = "rounded,filled"

     step_6_options [label = "options", fillcolor = "white", style="filled"]
   }

   step_4_options -> step_6_options [style="dashed"]
   programmatic_options -> step_6_options

   /* subgraph cluster_uri {
     label = "URI"

     uri_schema [label="schema"]
     host
     port
     options

     uri_transports [label=transports]

     uri_schema -> uri_transports
   }

   subgraph cluster_step_7 {
     label = "Merge 7"
     style = "rounded,filled"

     step_7_options [label = "options", fillcolor = "white", style="filled"]
   }

   step_6_options -> step_7_options [style="dashed"]
   uri_transports -> step_7_options */


Sources
=======

The following sections briefly explain the currently defined
configuration sources.

Configuration Files
-------------------

Configuration files use the following syntax, which is similar to
`INI-files <http://en.wikipedia.org/wiki/INI_file>`_ or `desktop-files
<http://standards.freedesktop.org/desktop-entry-spec/latest/>`_

* Comments are initiated by the ``#`` character and extend to the end
  of the current line

* After removing comments, all lines have to be of one of the
  following forms:

  * empty

  * :samp:`[{NAME}]` where :samp:`NAME` consists of alphanumeric
    characters and colons

  * :samp:`{NAME} = {VALUE}` where :samp:`NAME` consists of
    alphanumeric characters

  * Double quotes (``"``) can be used in :samp:`{NAME}` to avoid
    splitting at ``.`` characters. E.g ``[transport."socket.new"]``
    would interpreted as the section name ``(transport, socket.new)``.

Here is an example:

.. code-block:: ini

   [qualityofservice]
   reliability = UNRELIABLE
   ordering = UNORDERED

   [errorhandling]
   onhandlererror = LOG

   [transport.spread]
   host    = localhost
   port    = 4803
   enabled = 1                          # this is the default

   [spread.converter.cpp]
   image = IplImage                     # wire-schema = data-type

   [transport.inprocess]
   foo     = barbar
   factor  = 1.5
   enabled = 1

   [plugins.cpp]
   path = /vol/vampire/lib:/vol/cor/lib
   load = rsbspread:rsbvampire     # no filetype suffix

Please note that only files with the platform's respective line
endings are supported (i.e. ``\n`` on Linux and ``\r\n`` on Windows).

.. _specification-config-environment-variables:

Environment Variables
---------------------

Environment variables are processed according to the following rules:

#. Variables whose names start with ``RSB_`` are processed

#. The ``RSB_`` prefix is stripped form the name

#. To obtain the name of the corresponding option, the remainder of
   the name is converted to lower case and split at ``_`` characters

Examples:

* :envvar:`RSB_PLUGINS_CPP_LOAD`      -> ``plugins.cpp.load``

* :envvar:`RSB_TRANSPORT_SPREAD_PORT` -> ``transport.spread.port``

..
  .. _specification-config-commandline-options:

  Commandline Options (TODO this was a section but sections cannot appear in comments)

  Commandline options are processed according to the following rules:

  #. Options whose names start with ``rsb-`` are processed

  #. Language-specific name components (such as ``plugins.cpp.load``)
     are dropped. For example, the option named ``plugin.cpp.load``
     corresponds to the ``--rsb-plugins-load`` commandline option

  #. Components are joined with/strings are split at ``-`` characters

  Examples:

  * :option:`--rsb-plugins-load`          -> ``plugins.cpp.load``

  * :option:`--rsb-transport-spread-port` -> ``transport.spread.port``

.. _specification-config-programmatic-options:

Programmatic Options
--------------------

Please have a look at the API documentation for ParticipantConfig (C++, Python)
or Properties (Java). Links to the API documentation can be found in the left
sidebar.

..
  .. _specification-config-uri-options:

  URI Options

Example and Test Case
=====================

Consider the following situation:

* Contents of |user_config_file|

  .. code-block:: ini

     [transport.spread]
     host = azurit
     port = 5301

* Contents of |pwd_config_file|

  .. code-block:: ini

     [transport.spread]
     host = localhost

* Environment Variables

  :envvar:`RSB_TRANSPORT_SPREAD_PORT` = ``4444``

This should result in the following effective option values:

* ``transport.spread.host = localhost``

* ``transport.spread.port = 4444``

Implementations
===============

=========== =============================================
Language    File(s)
=========== =============================================
C++         |repository_versioned| rsb-cpp/src/rsb/
Java        |repository_versioned| rsb-java/src/rsb/
Python      :download:`/../rsb-python/rsb/__init__.py`
Common Lisp :download:`/../rsb-cl/src/configuration.lisp`
=========== =============================================
