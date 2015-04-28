.. _tool-introspect:

============
 Introspect
============

.. seealso::

   :ref:`specification-introspection`
     Specification of the :term:`introspection` protocol

.. program:: introspect

Synopsis
========

:samp:`rsb introspect {[OPTIONS]} {URI*}`

Description
===========

Display :term:`introspection` information for hosts, processes and
:term:`participants <participant>` reachable via the :term:`transports
<transport>` designated by :samp:`{URI}`\ s (zero or more URIs).

When no URIs are supplied, the default :term:`transport` configuration
is used.

The usual :ref:`commandline options <common-options>` and
:ref:`environment variables <common-environment-variables>` are
accepted. Specialized commandline options:

.. option:: --style SPEC, -s SPEC

   Specify a processing style for :term:`introspection` data and or
   events. :samp:`{SPEC}` has to be of the form::

     KIND KEY1 VALUE1 KEY2 VALUE2 ...

   where keys and values are optional and depend on
   :samp:`{KIND}`. Examples (note that the single quotes have to be
   included only when within a shell):

   .. code-block:: sh

     --style object-tree
     -s monitor
     -s 'object-tree :delay 5'

   .. tip::

      Use the :option:`common --help-for` ``styles`` or
      :option:`common --help-for` ``all`` options to display the full
      help text for this item.

.. option:: --response-timeout SECONDS

   Time in seconds to wait for responses to :term:`introspection`
   requests.

   In most systems, all replies should arrive within a few
   milliseconds. However, circumstances like heavily loaded system,
   degraded system performance or extreme communication latency may
   required larger values.

The output contains descriptions of

* :term:`Participants <participant>` including

  * Unique IDs
  * :term:`Scopes <scope>`
  * :term:`Data types <data type>`

* Operating system processes including

  * Program names
  * Commandline options
  * Start time

* Hosts

  * Hostname
  * Estimated clock offset (relative to local host)
  * Estimated communication latency (relative to local host)

.. only:: html

   .. seealso::

      :ref:`uri-schema`
        For details regarding the URI syntax of :samp:`{URI}` for
        specifying :term:`transport` and :term:`scope`.

      :ref:`common-options`
        The usual commandline options are accepted.

.. only:: man

   .. include:: common.rst
      :start-line: 13
      :end-line:   113

   .. include:: common.rst
      :start-line: 115
      :end-line:   147

Examples
========

* .. code-block:: sh

     $ rsb introspect

  In the above example, the :program:`introspect` command is used to
  :term:`introspect <introspection>` all :term:`participants
  <participant>` that can be contacted the currently configured
  :term:`transports <transport>`.

  For example, the output could look like this::

    fuchsit           UP      ( 10 s )
    │ Clock offset   < 1 ms │ Machine type    x86               │ Software type    linux
    │ Latency        < 1 ms │ Machine version …T9600  @ 2.80GHz │ Software version 3.16.0-4-686-pae
    └─016883          RUNNING ( 10 s ) logger --on-error continue -f and --style monitor/timeline socket:?server=1
      │ Uptime       9 d    │ User        jmoringe
      │ Latency   < 1 ms    │ RSB Version 0.11.0
      │ Transports socket://localhost:55555/
      └─61582DC3      ACTIVE           LISTENER<T>            /

  This output should be interpreted as follows:

  * |project| processes have been detected on one host with hostname
    "fuchsit".

  * The offset between the system clock of host "fuchsit" and the
    local host is less than one millisecond.

  * The |project| communication latency between host "fuchsit" and the
    local host is less than one millisecond.

  * One process with process id 016883 has been detected on host
    "fuchsit". The process is executing the program "logger" with
    commandline arguments "--on-error continue -f …".

  * The process has been started by user jmoringe, has been running
    for nine days and is using an |project| implementation with
    version 0.11.0.

  * Within the process, there is one :term:`listener`
    :term:`participant` on :term:`scope` ``/``.  The unique id of the
    :term:`participant` starts with ``61582DC3``.

* .. code-block:: sh

     $ rsb introspect socket: spread://somehost

  Gather :term:`introspection` information via two :term:`transports
  <transport>`: the socket :term:`transport` and the :term:`Spread`
  :term:`transport`. The gathered information is merged as if all
  collected processes and :term:`participants <participant>` were
  participant in a single |project| bus.

* .. code-block:: sh

     $ rsb introspect --style monitor/object-tree

  Like the first example, but instead of printing one snapshot and
  exiting, continue gathering :term:`introspection` information and
  periodically print an updated object tree.

* .. code-block:: sh

     $ rsb introspect --style monitor/events

  Continuously collect :term:`introspection` information and print
  information about significant changes in the observed
  system. Significant changes include start and termination of
  processes and addition and removal of :term:`participants
  <participant>`.

Implementations
===============

======================= ============= ===============================
Implementation Language Project       Repository Link
======================= ============= ===============================
Common Lisp             rsb-tools-cl  |repository_versioned_tools_cl|
======================= ============= ===============================
