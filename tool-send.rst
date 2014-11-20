.. _send:
.. _tool-send:

======
 Send
======

.. program:: send

Synopsis
========

:samp:`send {[OPTIONS]} {EVENT-SPEC} {[DESTINATION-URI]}`

Description
===========

Send an :term:`event` constructed according to :samp:`{EVENT-SPEC}` to
:term:`listeners <listener>` on :term:`scopes <scope>` specified by
:samp:`{DESTINATION-URI}`.

:samp:`{EVENT-SPEC}` is treated as follows:

* As the empty payload when it is the empty string
* As the respective Boolean value when equal to ``true`` or ``false``
* As string when surrounded with double-quotes (``"``)
* As integer number when consisting of digits without decimal point
* As float number when consisting of digits with decimal point
* If :samp:`{EVENT-SPEC}` is the single character ``-``or the string
  ``-:binary``, the entire "contents" of standard input (until end of
  file) is read as a string or octet-vector respectively and sent.
* If :samp:`{EVENT-SPEC}` is of one of the forms
  :samp:`#P"{PATHNAME}"`, :samp:`#P"{PATHNAME}":{ENCODING}` or
  :samp:`#P"{PATHNAME}":binary`, the file designated by
  :samp:`{PATHNAME}` is read into a string (optionally employing
  :samp:`{ENCODING}`) or octet-vector and sent.

.. note::

   When written as part of a shell command, some of the above forms
   may require protection from processing by the shell, usually by
   surrounding the form in single quotes ('). For example:

   .. code-block:: sh

      $ send '' ...            # empty payload
      $ send '#P"my-file"' ... # read payload from my-file

:samp:`{DESTINATION-URI}` designates the destination :term:`scope` to
which the :term:`events <event>` should be sent and the
:term:`transport` configuration which should be used for sending the
:term:`event`.

.. only:: html

   .. seealso::

      :ref:`uri-schema`
        For details regarding the URI syntax of
        :samp:`{DESTINATION-URI}` for specifying :term:`transport` and
        :term:`scope`.

      :ref:`common-options`
        The usual commandline options are accepted.

      :ref:`idl-options`
        The usual IDL-related options are accepted.

.. only:: man

   .. include:: common.rst
      :start-line: 13
      :end-line:   113

   .. include:: common.rst
      :start-line: 115
      :end-line:   147

.. option:: --method METHOD

   Set the :term:`method field` of the :term:`event` being sent to
   :samp:`{METHOD}`. Default behavior is sending an :term:`event`
   without :term:`method field`.

.. option:: --meta-data, -D NAME=VALUE

   Set the :term:`meta-data` item :samp:`{NAME}` to :samp:`{VALUE}` in
   the :term:`event` being sent. This option can be specified multiple
   times for distinct :samp:`{NAME}` s.

.. option:: --timestamp, -T NAME=YYYY-MM-DD[THH:MM:SS[.µµµµµµ[+ZH:ZM]]]

   Set the :ref:`timestamp <meta-data>` named :samp:`{NAME}` to
   :samp:`{VALUE}` in the :term:`event` being sent. This option can be
   specified multiple times for distinct :samp:`{NAME}` s.

.. option:: --cause, -c PARTICIPANT-ID:SEQUENCE-NUMBER

   Add the :term:`event id` specified by
   :samp:`{PARTICIPANT-ID:SEQUENCE-NUMBER}` to the :ref:`cause vector
   <meta-data>` of the :term:`event` being sent. This option can be
   specified multiple times.

Examples
========

* .. code-block:: sh

     $ send '' /mycomponent/trigger

  Send an :term:`event` without a payload to the :term:`channel`
  designated by the :term:`scope` ``/mycomponent/trigger``.

  .. note::

     Note the use of single quotes (``'``) to allow specifying an
     empty payload.

* .. code-block:: sh

     $ send '"running"' 'spread:/mycomponent/state'

  Send an :term:`event` whose payload is the string ``running`` to the
  :term:`channel` designated by the :term:`scope`
  ``/mycomponent/state``.

  .. note::

     Note the use of single quotes (``'``) to prevent the shell from
     processing the double quotes (``"``) that identify the payload as
     a string.

* .. code-block:: sh

     $ send 5 'spread:/somescope?name=4803'

  Send an integer. Use :term:`Spread` :term:`transport`, like in the
  previous example, but use the \"daemon name\" option of the
  :term:`Spread` :term:`transport` instead of specifying host and
  port.

  .. note::

     Note the use of single quotes (``'``) to prevent elements of the
     destination URI from being processed by the shell (not necessary
     for all shells).

* .. code-block:: sh

     $ cat my-data.txt | send - 'socket:/printer'
     $ cat my-data.txt | send -:binary 'socket:/printer'
     $ send '#P"my-data.txt"' 'socket:/printer'
     $ send '#P"my-data.txt":latin-1' 'socket:/printer'
     $ send '#P"my-data.txt":binary' 'socket:/printer'

  Two ways of sending the content of the file :file:`my-data.txt` to
  the :term:`scope` ``/printer`` using the socket :term:`transport`
  (with its default configuration). This form can only be used for
  sending string payloads.

  .. note::

     Note the use of single quotes (``'``) to prevent elements of the
     pathname ``#"Pmy-data.txt"`` from being processed by the shell.


Implementations
===============

======================= ============= ===============================
Implementation Language Project       Repository Link
======================= ============= ===============================
Common Lisp             rsb-tools-cl  |repository_versioned_tools_cl|
======================= ============= ===============================
