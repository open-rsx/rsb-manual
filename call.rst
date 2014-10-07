.. _call:

==========
 RPC Call
==========

.. program:: call

Synopsis
========

:samp:`call {[OPTIONS]} {SERVER-URI}/{METHOD}({[ARGUMENT]})`

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

* If :samp:`{ARGUMENT}` is the empty string, i.e. the call
  specification is of the form :samp:`{SERVER-URI}/{METHOD}()`, the
  method is called without argument.
* As string when surrounded with double-quotes (``"``)
* As integer number when consisting of digits without decimal point
* As float number when consisting of digits with decimal point
* If :samp:`{ARGUMENT}` is the single character ``-``, the entire
  "contents" of standard input (until end of file) is read as a string
  and used as argument for the method call.
* If :samp:`{ARGUMENT}` is of the form :samp:`#P{PATHNAME}`, the file
  designated by :samp:`{PATHNAME}` is read and its content is used as
  argument for the method call.

.. note::

   When written as part of a shell command, some of the above forms
   may require protection from processing by the shell, usually by
   surrounding the form in single quotes ('). For example:

   .. code-block:: sh

      $ call 'socket:/foobar/()'          # empty argument
      $ call 'socket:/foo/bar(#Pmy-file)' # read argument from my-file

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

* .. code-block:: sh

     $ call 'spread:/mycomponent/control/status()'
     "running" # prints return value, if any
     $ call 'spread:/mycomponent/control/terminate()'
     $ # returns once the method call completes

  In the above example, the :program:`call` tool is used to invoke the
  ``status`` and ``terminate`` methods of the remote server at
  :term:`scope` ``/mycomponent/control`` without an argument.

* .. code-block:: sh

     $ cat my-data.txt | call 'socket:/printer/print(-)'
     $ call 'socket:/printer/print(#Pmy-data.txt)'

  Two ways of using the content of the file :file:`my-data.txt` as
  argument in a call of the ``print`` method on the :term:`scope`
  ``/printer``. The call uses the socket :term:`transport` (with its
  default configuration). This form can only be used for sending
  string payloads.

  .. note::

     Note the use of single quotes (``'``) to prevent elements of the
     pathname ``#Pmy-data.txt`` from being processed by the shell.

Implementations
===============

======================= ============= ===============================
Implementation Language Project       Repository Link
======================= ============= ===============================
Common Lisp             rsb-tools-cl  |repository_versioned_tools_cl|
======================= ============= ===============================
