RPC Call
--------

.. program:: call

Synopsis
^^^^^^^^

:samp:`call {[OPTIONS]} {METHOD}({[ARGUMENT]})`

Description
^^^^^^^^^^^

The :program:`call` tool can be used to invoke methods of RSB RPC
servers.

.. option:: --version

   Display version information.

.. option:: --help

   Display help.

.. option:: --help-for THING

   Display help for :samp:`{THING}`.

Examples
^^^^^^^^

In this example, the :program:`call` tool is used to invoke the
terminate method of the remote server at :term:`scope` ``/control``
without an argument.::

  $ ./call 'spread:/mycomponent/control/status()'
  "running" # prints return value, if any
  $ ./call 'spread:/mycomponent/control/terminate()'
  $ # returns once the method call completes

Implementations
^^^^^^^^^^^^^^^

======================= ============= ====================================== ===============
Implementation Language Project       Repository Link                        Compiled Binary
======================= ============= ====================================== ===============
Common Lisp             cl-rsb-tools  |repository_versioned|/cl/cl-rsb-tools Linux i686, Linux x86_64, MacOS x86_64
======================= ============= ====================================== ===============
