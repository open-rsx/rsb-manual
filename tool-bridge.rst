.. _tool-bridge:

========
 Bridge
========

.. program:: bridge

Synopsis
========

:samp:`rsb bridge {[OPTIONS]} {SIMPLE-FORWARDING-SPECIFICATION}`

Description
===========

Forward :term:`events <event>` according to
:samp:`{SIMPLE-FORWARDING-SPECIFICATION}` (See
:ref:`tool-bridge-simple-forwarding-specification`).

.. note::

   When written as part of a shell command, the :ref:`forwarding
   specification <tool-bridge-simple-forwarding-specification>` may
   require protection from processing by the shell, usually by
   surrounding the form in single quotes ('). For example:

   .. code-block:: sh

      $ rsb bridge 'socket:/foo/ <-> spread:/bar/'

The :ref:`usual commandline options <common-options>` are
accepted. Specialized commandline options:

.. option:: --max-queued-events POSITIVE-INTEGER

   Specify the maximum number of :term:`events <event>` that may be
   kept in a queue in case processing (i.e. forwarding) cannot keep up
   with the rate of incoming :term:`events <event>`.

   This queue can smooth over bursts of :term:`events <event>`, but if
   the sustained rate of incoming :term:`events <event>` is above the
   maximum processing speed, it will overflow and an error will be
   signaled. The behavior in this case can be controlled via
   :option:`common --on-error`.

.. _tool-bridge-simple-forwarding-specification:

Simple Forwarding Specification
===============================

Simple forwarding specifications describe from and to which buses /
:term:`scopes <scope>` :term:`events <event>` should be forwarded and
can be constructed according to the following grammar:

.. productionlist::
   bridge-specification: forwarding-specification (";" forwarding-specification)*
   forwarding-specification: (unidirectional-forwarding-specification
                           :  | bidirectional-forwarding-specification)
   unidirectional-forwarding-specification: (input-specification)+
                                          : "->"
                                          : (filter)*
                                          : transform?
                                          : (output-specification)+
   bidirectional-forwarding-specification: (input-specification)+
                                         : "<->"
                                         : (output-specification)+
   filter: FILTER
   transform: TRANSFORM
   input-specification: URI
   output-specification: URI

* Unidirectional forwarding, described by the
  :token:`unidirectional-forwarding-specification` production, consists
  in forwarding :term:`events <event>` from bus / :term:`scope(s)
  <scope>` described by the :token:`input-specification`\ s on the left
  hand side of the ``->`` to the bus / :term:`scope(s) <scope>`
  described by the :token:`output-specification`\ s on the right hand
  side.

* Bidirectional forwarding, described by the
  :token:`bidirectional-forwarding-specification` production, is like
  unidirectional forwarding but also forwards :term:`events <event>`
  from the right hand side to the left hand side. As a consequence,
  :term:`filters <filter>` are not supported.

.. _tool-bridge-forwarding-cycles:

Forwarding Cycles
=================

Forwarding specifications, in particular bidirectional ones, can
describe cyclic forwarding of :term:`events <event>`. For example, the
specification ``socket:/foo -> socket:/foo`` is obviously cyclic since
forwarded :term:`events <event>` are published on :term:`scope`
``/foo`` and would therefore immediately be picked up for forwarding
again. Such a forwarding setup has to be prevented since it
immediately degrades the affected system, usually making it completely
unusable.

The :program:`bridge` command has two mechanisms for dealing with the
problem:

#. Forwarding specifications are analyzed ahead of time to determine
   whether they are cyclic. This analysis yields one of three results:

   #. Definitely cyclic (above example). In this case, a continuable
      error is signaled.

   #. Maybe cyclic (e.g. ``socket:/foo/bar -> socket:/foo``). In this
      case, warning is signaled.

   #. Definitely not cyclic (e.g. ``spread:/foo -> socket:/bar``)

   Cases 1. and 2. usually indicate configuration errors and should be
   avoided.

#. When a cyclic forwarding specification is used, forwarded
   :term:`events <event>` are tagged when leaving the bridge,
   recognized when they enter the bridge a second time and discarded.

Examples
========

* .. code-block:: sh

     $ rsb bridge 'spread:/from -> socket:/to'

  In the above example, the :program:`bridge` command is used to
  establish unidirectional forwarding from :term:`scope` ``/from`` to
  :term:`scope` ``/to`` within the bus designated by ``spread:``.

  .. note::

     Note the use of single quotes (``'``) to prevent the shell from
     breaking up the :ref:`simple forwarding specification
     <tool-bridge-simple-forwarding-specification>` into multiple
     arguments because of the whitespace in it.

* .. code-block:: sh

     $ rsb bridge 'socket://remotehost/ <-> socket://localhost/'

  In the above example, the :program:`bridge` command is used to
  establish bidirectional forwarding affecting all :term:`events
  <event>` between ``remotehost`` and ``localhost``.

  .. note::

     Note the use of single quotes (``'``) to prevent the shell from
     breaking up the :ref:`simple forwarding specification
     <tool-bridge-simple-forwarding-specification>` into multiple
     arguments because of the whitespace in it.

Implementations
===============

======================= ============= ===============================
Implementation Language Project       Repository Link
======================= ============= ===============================
Common Lisp             rsb-tools-cl  |repository_versioned_tools_cl|
======================= ============= ===============================
