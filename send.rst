.. _send:

======
 Send
======

.. program:: send

Synopsis
========

:samp:`send {[OPTIONS]} {EVENT-SPEC} {[DESTINATION-URI]}`

Description
===========

Send an event constructed according to :samp:`{EVENT-SPEC}` to
listeners on scopes specified by :samp:`{DESTINATION-URI}`.

:samp:`{EVENT-SPEC}` is treated as follows:

* As string when surrounded with double-quotes (``"``)
* As integer number when consisting of digits without decimal point
* As float number when consisting of digits with decimal point
* If :samp:`{EVENT-SPEC}` is the single character ``-``, the entire
  "contents" of standard input (until end of file) is read as a string
  and used as argument for the method send

:samp:`{DESTINATION-URI}` designates the destination :term:`scope` to
which the :term:`event` should be sent and the :term:`transport`
configuration which should be used for sending the :term:`event`.

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

Examples
========

* .. code-block:: sh

     $ send '"running"' 'spread:/mycomponent/state'

  In the above example, the :program:`send` tool is used to send an
  :term:`event` whose payload is the string ``running`` to the
  :term:`channel` designated by the :term:`scope`
  ``/mycomponent/state``.

Implementations
===============

======================= ============= ===================================
Implementation Language Project       Repository Link
======================= ============= ===================================
Common Lisp             rsb-tools-cl  |repository_versioned| rsb-tools-cl
======================= ============= ===================================
