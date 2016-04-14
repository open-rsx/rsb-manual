.. _call:
.. _tool-call:

==========
 RPC Call
==========

.. program:: call

Synopsis
========

:samp:`rsb call {[OPTIONS]} {SERVER-URI}/{METHOD}({[ARGUMENT]})`

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
  :samp:`{METHOD}` is called without argument.

* As the respective Boolean value when equal to ``true`` or ``false``

* As string when surrounded with double-quotes (``"``)

* As integer number when consisting of digits without decimal point

* As float number when consisting of digits with decimal point

* If :samp:`{ARGUMENT}` starts with ``/``, it is parsed as a
  :term:`scope`.

* If :samp:`{ARGUMENT}` is the single character ``-`` or the string
  ``-:binary``, the entire "contents" of standard input (until end of
  file) is read as a string or octet-vector respectively and used as
  argument for the method call.

* If :samp:`{ARGUMENT}` is of one of the forms :samp:`#P"{PATHNAME}"`,
  :samp:`#P"{PATHNAME}":{ENCODING}` or :samp:`#P"{PATHNAME}":binary`,
  the file designated by :samp:`{PATHNAME}` is read into a string
  (optionally employing :samp:`{ENCODING}`) or octet-vector and used as
  argument for the method call.

* If :samp:`{ARGUMENT}` is of the form
  :samp:`pb:.{MESSAGE-TYPE-NAME}:{{FIELDS}}`, a protocol buffer
  message of type :samp:`{MESSAGE-TYPE-NAME}` is constructed and its
  fields are populated according to :samp:`{FIELDS}`. :samp:`{FIELDS}`
  uses the syntax produced/consumed by the various TextFormat classes
  of the protocol buffer API and the ``--decode``/``--encode`` options
  of the :program:`protoc` binary.

* If :samp:`{ARGUMENT}` is of one the forms
  :samp:`pb:.{MESSAGE-TYPE-NAME}:#P"{PATHNAME}"` or
  :samp:`pb:.{MESSAGE-TYPE-NAME}:#P"{PATHNAME}":{ENCODING}`, a protocol
  buffer message of type :samp:`{MESSAGE-TYPE-NAME}` is constructed
  according to the contents of the file designated by
  :samp:`{PATHNAME}`.

.. note::

   When written as part of a shell command, some of the above forms
   may require protection from processing by the shell, usually by
   surrounding the form in single quotes ('). For example:

   .. code-block:: sh

      $ rsb call 'socket:/foobar/()'            # empty argument
      $ rsb call 'socket:/foo/bar(#P"my-file")' # read argument from my-file

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

     $ rsb call 'spread:/mycomponent/control/status()'
     "running" # prints return value, if any
     $ rsb call 'spread:/mycomponent/control/terminate()'
     $ # returns once the method call completes

  In the above example, the :program:`call` command is used to invoke
  the ``status`` and ``terminate`` methods of the :term:`remote
  server` at :term:`scope` ``/mycomponent/control`` without an
  argument.

* .. code-block:: sh

     $ cat my-data.txt | rsb call 'socket:/printer/print(-)'
     $ cat my-data.txt | rsb call 'socket:/printer/print(-:binary)'
     $ rsb call 'socket:/printer/print(#P"my-data.txt")'
     $ rsb call 'socket:/printer/print(#P"my-data.txt":latin-1)'
     $ rsb call 'socket:/printer/print(#P"my-data.txt":binary)'

  Two ways of using the content of the file :file:`my-data.txt` as
  argument in a call of the ``print`` method on the :term:`scope`
  ``/printer``. The call uses the socket :term:`transport` (with its
  default configuration). This form can only be used for sending
  string payloads.

  .. note::

     Note the use of single quotes (``'``) to prevent elements of the
     pathname ``#P"my-data.txt"`` from being processed by the shell.

* .. code-block:: sh

     $ rsb call                                                  \
       -I…/rst-proto/proto/stable/                               \
       -l…/rst-proto/proto/stable/rst/robot/RobotCollision.proto \
       'socket:/mycomponent/handlecollision(pb:.rst.robot.RobotCollision:{kind: "SELF" collision_detail: { geometry: { contact_points: [ { x: 0 y: 1 z: 2 frame_id: "foo" }, { x: 3 y: 4 z: 5 } ] } object_1: "o1" } })'

  In the above example, the :program:`call` tool is used to call the
  ``handlecollision`` method of the :term:`remote server` at
  :term:`scope` ``/mycomponent`` with a protocol buffer message
  argument. The protocol buffer message is of type
  ``rst.robot.RobotCollision`` with ``kind`` enum field set to
  ``SELF`` and an embedded ``rst.kinematics.ObjectCollision`` message
  with two contact points in the ``collision_detail`` field.

  The specification of the message content uses the syntax
  produced/consumed by the various TextFormat classes of the protocol
  buffer API and the ``--decode``/``--encode`` options of the
  :program:`protoc` binary.

  .. note::

     Note how the definition of the protocol buffer message type is
     loaded using :option:`-I (--idl-path) <common --idl-path>` and
     :option:`-l (--load-idl) <common --load-idl>` commandline
     options.

Implementations
===============

======================= ============= ===============================
Implementation Language Project       Repository Link
======================= ============= ===============================
Common Lisp             rsb-tools-cl  |repository_versioned_tools_cl|
======================= ============= ===============================
