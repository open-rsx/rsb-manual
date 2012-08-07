.. _specification-zmq:

=====================
 ØMQ-based Transport
=====================

The `ØMQ`_ :term:`transport` provided by |project| is a thin layer on
top of the ØMQ API. |project| :term:`connector` s correspond to ØMQ
sockets.

Schemas
-------

All schemas handled by the ØMQ :term:`transport` are of the form
:samp:`zmq+{SCHEMA}` where :samp:`{SCHEMA}` is a ØMQ schema such as
e.g. ``tcp``, ``pgm`` or ``epgm``.

For example:

==================================== ================================
|project| URL                        ØMQ URL
==================================== ================================
``zmq+epgm://eth0;239.192.1.1:8888`` ``epgm://eth0;239.192.1.1:8888``
``zmq+tcp://0.0.0.0:5555``           ``tcp://*:5555``
==================================== ================================

ØMQ Sockets
-----------

The ØMQ :term:`transport` only uses ``PUB`` and ``SUB`` sockets. Other
communication patterns supported by ØMQ are not
used. :term:`Connector` s for the receiving direction use ``SUB``
sockets and :term:`connector` s for the sending direction use ``PUB``
sockets.

Whether sockets are configured via ``bind`` or ``connect`` depends on
the ØMQ transport mechanism. For example, when using the ``epgm``
multicast transport mechanism, all sockets can be configured using
``connect``, but the TCP transport mechanism requires one socket to be
configured using ``bind``.

``SUB`` sockets used by receiving :term:`connector` s are subscribed
to suitable :term:`scope` s via :samp:`setsockopt({SOCKET}, SUBSCRIBE,
{SCOPE})` where :samp:`{SCOPE}` is the :ref:`string representation
<specification-scope>` of the :term:`scope` for which the respective
:term:`connector` should receive :term:`event` s. In conjunction with
a suitable `message structure`_, this allows selecting
:term:`notification` s on the ØMQ level: a subscription configured
this way will only receive :term:`notification` s sent to the
:term:`scope` designated by :samp:`{SCOPE}` or one of its subscopes.

Message Structure
-----------------

|project| :term:`event` s are mapped to ØMQ messages in the following
way:

===== ===============================================================
Frame Contents
===== ===============================================================
1     String representation of the :term:`scope` of the :term:`event`
2     :term:`event` serialized as :term:`notification` using the
      usual serialization (TODO)
===== ===============================================================

Implementations
---------------

=========== ================================================
Language    File(s)
=========== ================================================
C++         *not yet implemented*
Java        *not yet implemented*
Python      *not yet implemented*
Common Lisp |repository_versioned| rsb-zmq-cl/src/transport/
=========== ================================================
