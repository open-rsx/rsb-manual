.. _call:

==========
 RPC Call
==========

.. program:: call

Synopsis
========

:samp:`|call_binary| {[OPTIONS]} {SERVER-URI}/{METHOD}({[ARGUMENT]})`

Description
===========

Call :samp:`{METHOD}` of the |project| RPC server at
:samp:`{SERVER-URI}` with argument :samp:`{ARGUMENT}` and print the
result to standard output, if any.

:samp:`{SERVER-URI}` designates the root :term:`scope` of the remote
server and the :term:`transport` that should be used.

.. tip::

   For details regarding the URI syntax involved in :term:`transport`
   and :term:`channel` specifications, see :ref:`uri-schema`.

:samp:`{ARGUMENT}` is treated as follows:

* As string when surrounded with double-quotes (``"``)
* As integer number when consisting of digits without decimal point
* As float number when consisting of digits with decimal point
* If :samp:`{ARGUMENT}` is the single character ``-``, the entire
  "contents" of standard input (until end of file) is read as a string
  and used as argument for the method call
* If :samp:`{ARGUMENT}` is the empty string, i.e. the call
  specification is of the form :samp:`{SERVER-URI}/{METHOD}()`, the
  method is called without argument

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
========

In this example, the :program:`call` tool is used to invoke the
``status`` and ``terminate`` methods of the remote server at
:term:`scope` ``/mycomponent/control`` without an argument.

.. code-block:: sh

  $ call 'spread:/mycomponent/control/status()'
  "running" # prints return value, if any
  $ call 'spread:/mycomponent/control/terminate()'
  $ # returns once the method call completes

Implementations
===============

======================= ============= ====================================== ===============
Implementation Language Project       Repository Link                        Compiled Binary
======================= ============= ====================================== ===============
Common Lisp             cl-rsb-tools  |repository_versioned|/cl/cl-rsb-tools Linux i686, Linux x86_64, MacOS x86_64
======================= ============= ====================================== ===============
