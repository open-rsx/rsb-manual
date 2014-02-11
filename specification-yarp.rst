.. _specification-yarp:

=================
 YARP Transports
=================

A subset of the network protocols used in `YARP`_ (called "carriers"
there) is supported by |project|.

The `YARP`_ :term:`transports <transport>` for |project| map the
following URI schemas to `YARP`_ network protocols:

``tcp+yarp`` (See :ref:`specification-tcpyarp`)

  Direct connections to the TCP endpoints of `YARP`_ ports.

``yarp`` (See :ref:`specification-yarp-nameservice`)

  Connections to `YARP`_ ports are made via the `YARP`_
  nameservice.

.. _specification-tcpyarp:

TCP+YARP Transport (without Nameservice operations)
===================================================

Direct connections to the TCP endpoints of `YARP`_ ports. This
ow-level protocol requires knowing the TCP port of a `YARP`_
port. Knowing the port name is not sufficient on this level.

The details of this protocol are documented `here
<http://eris.liralab.it/yarpdoc/yarp_protocol.html>`_.

.. note::

   This schema is supported in the C++ and Common Lisp implementations
   of |project|.

Schema
------

.. seealso::

   :ref:`specification-uris`
     Use of URIs in |project|.

This :term:`transport` uses the ``tcp+yarp`` URI schema.

.. _specification-tcpyarp-options:

Options
-------

The following :ref:`configuration <configuration>` options are
accepted::

  Name         Type   Comment
  + transport
  +-- tcp+yarp
  +---- host   string Hostname on which endpoint runs
  +---- port   uint16 Port on which endpoint listens

Implementations
---------------

=========== ==========================================================
Language    File(s)
=========== ==========================================================
C++         |repository_versioned| rsb-yarp-cpp/src/rsb/transport/yarp
Java        *not implemented yet*
Python      *not implemented yet*
Common Lisp |repository_versioned| rsb-yarp-cl/src/transport/yarptcp
=========== ==========================================================

.. _specification-yarp-nameservice:

YARP Transport (with Nameservice operations)
============================================

Connections to `YARP`_ ports are made via the `YARP`_ nameservice. In
this case, the `YARP`_ nameservice is consulted to determine the (TCP)
endpoint for a `YARP`_ port name. After that, a low-level connection
is established, if the carrier of the port is supported.

For this schema, nameservice queries which yield multiple results or
change over time can lead to a changing set of connections.  For
example, the URL ``yarp:/iCubSim/cam`` could causes connections to be
established to `YARP`_ ports named ``/iCubSim/cam/left``,
``/iCubSim/cam/left/fovea``, ``/iCubSim/cam/right``,
``/iCubSim/cam/right/fovea`` if these ports are registered in the
`YARP`_ nameservice.

.. note::

   This schema is only supported in the Common Lisp implementation of
   |project|.

Schema
------

.. seealso::

   :ref:`specification-uris`
     Use of URIs in |project|.

This :term:`transport` uses the ``yarp`` URI schema.

.. _specification-yarp-nameservice-options:

Options
-------

The following :ref:`configuration <configuration>` options are
accepted::

  Name        Type   Comment
  + transport
  +-- yarp
  +---- host  string Hostname or address on which the YARP nameserver listens
  +---- port  uint16 Port on which the YARP nameserver listens

Implementations
---------------

=========== ==========================================================
Language    File(s)
=========== ==========================================================
C++         *not implemented yet*
Java        *not implemented yet*
Python      *not implemented yet*
Common Lisp |repository_versioned| rsb-yarp-cl/src/transport/yarp
=========== ==========================================================

Limitations
===========

The :term:`connectors <connector>` provided by the `YARP`_
:term:`transports <transport>` for |project| are not proper `YARP`_
ports:

* They do not accept incoming connections
* They do not support the port management protocol (except the
  part required for connecting to other ports)
* Only the ``tcp`` carrier is supported. ``udp`` and special-purpose
  carriers are not supported.
