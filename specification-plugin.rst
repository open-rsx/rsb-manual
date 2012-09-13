.. _specification-plugin:

=========
 Plugins
=========

.. seealso::

   :ref:`tutorial-plugins`
     Examples demonstrating how to write |project| :term:`plugins <plugin>`

:term:`Plugins <plugin>` are loaded at initialization time

* This means, registration of provided :term:`converters <converter>`
  and :term:`connectors <connector>` happens during initialization
* This is required in order for |project| to be able inquire about
  capabilities and configuration of :term:`converters <converter>` and
  :term:`connectors <connector>`

Selection and loading of :term:`plugins <plugin>` is configured using
the usual configuration mechanism: for each implementation language of
|project|, a language-specific section configures:

* Means of locating :term:`plugins <plugin>` (e.g. dynamic linker
  searchpath for C++, classpath for Java, :envvar:`PYTHONPATH` for
  Python)
* Names of the :term:`plugins <plugin>` that should be loaded

.. _specification-plugin-cpp:

C++ Plugins
===========

In the C++ implementation of |project|, :term:`plugins <plugin>` are
shared objects defining symbols

#. :c:func:`rsc_plugin_init`
#. :c:func:`rsc_plugin_shutdown`

:term:`Plugins <plugin>` are configured via the configuration options

``plugins.cpp.path``

  Colon-separated list of directories in which expanded
  (e.g. ``rsbspread`` -> :samp:`{DIRECTORY}/librsbspread.so` on Linux)
  plugin libraries will be searched.

``plugins.cpp.load``

  Colon-separated list of plugins that should be loaded. (Names do not
  include prefixes like ``lib`` of suffixes like ``.so`` or ``.dll``)

Configuration Examples:

.. code-block:: ini

   [plugins.cpp]
   path = /vol/vampire/lib/rsb0.8/plugins:/vol/cor/lib/rsb0.8/plugins
   load = rsbspread:rsbvampire # no "libX" or filetype suffix like ".so"

.. code-block:: sh

   RSB_PLUGINS_CPP_PATH=/vol/cor/lib/rsb0.8/plugins

The default searchpath for C++ :term:`plugins <plugin>` is

#. :samp:`{HOME}/.rsb{VERSION}/plugins`
#. :samp:`{PREFIX}/lib/rsb{VERSION}/plugins`

where :samp:`{HOME}` is the home directory of the current user,
:samp:`{PREFIX}` is the prefix into which |project| has been installed
and :samp:`{VERSION}` are the major and minor components of the
current |project| version (|version| for this version). Example:

#. :file:`/homes/juser/.rsb0.8/plugins`
#. :file:`/usr/lib/rsb0.8/plugins`

.. _specification-plugin-python:

Python Plugins
==============

.. warning::

   This section is work in progress.

Python :term:`plugins <plugin>` are :ref:`modules <python:tut-modules>`
defining functions

#. :py:func:`rsbPluginInit`
#. :py:func:`rsbPluginShutdown`

:term:`Plugins <plugin>` are configured via the configuration options

``plugins.python.path``

  Colon-separated list of directories which get added to
  :py:data:`sys.path`?

``plugins.python.load``

  Colon-separated list of plugins that should be loaded.

.. todo:: default searchpath

.. _specification-plugin-java:

Java Plugins
============

.. warning::

   This section is work in progress.

Java :term:`plugins <plugin>` are Jar files?

:term:`Plugins <plugin>` are configured via the configuration options

``plugins.java.path``

  TODO

``plugins.java.load``

  Colon-separated list of plugins that should be loaded.

.. todo:: default searchpath

.. _specification-plugin-common-lisp:

Common Lisp Plugins
===================

.. warning::

   This section is work in progress.

Common Lisp :term:`plugins <plugin>` are ASDF-systems or FASL-bundles?

:term:`Plugins <plugin>` are configured via the configuration options

``plugins.lisp.path``

  Colon-separated list of directories that should be searched for
  plugins.

``plugins.lisp.load``

  Colon-separated list of plugins that should be loaded.

.. todo:: default searchpath

Implementations
===============

=========== ==================================================================
Language    File(s)
=========== ==================================================================
C++         *implemented as part of the RSC library*
Java        *not yet implemented*
Python      *not yet implemented*
Common Lisp *not yet implemented*
=========== ==================================================================
