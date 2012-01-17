RPC Call
--------

.. program:: call

Synopsis
^^^^^^^^

:samp:`|call_binary| {[OPTIONS]} {SERVER-URI}{METHOD}({[ARGUMENT]})`

Description
^^^^^^^^^^^

The :program:`call` tool can be used to invoke methods of |project|
RPC servers.

The :ref:`usual commandline options <common-options>` are
accepted. Specialized commandline options:

.. option:: --timeout SPEC, -t SPEC

   If the result of the method call does not arrive within the amount
   of time specified by :samp:`{SPEC}`, consider the call to have
   failed and exit with non-zero status.

.. option:: --no-wait

   Do not wait for the result of the method call. Immediately return
   with zero status without printing a result to standard output.

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
