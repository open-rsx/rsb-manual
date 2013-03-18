.. _specification-socket:

======================
 TCP-Socket Transport
======================

The TCP-socket-based :term:`transport` layers a very simple protocol
on top of ordinary TCP sockets:

* Processes act as either TCP-clients or -servers for a common
  port. There is one server and zero or more clients. Each
  client-server connection is a bi-direction stream of
  :term:`notifications <notification>` which are sent and received by
  :term:`participants <participant>` in the respective processes.
* Each process may host zero, one or many :term:`participants
  <participant>`. Within a process, the :term:`participants
  <participant>` share a connection.

.. _specification-socket-schema:

Schema
======

.. seealso::

   :ref:`specification-uris`
     Use of URIs in |project|.

The TCP-socket-based :term:`transport` uses the ``tcp`` URI schema.

.. _specification-socket-options:

Options
=======

.. seealso::

   :ref:`specification-config`
     Specification of configuration mechanism.

The following :ref:`configuration <specification-config>` options are
accepted by the TCP-socket-based :term:`transport`::

  Name              Type            Comment
  + transport
  +-- socket
  +---- host        string          Name of host running server
  +---- port        uint            Port on which server listens
  +---- server      { 0, 1, auto }  Act as server?
  +---- tcpnodelay  boolean         Implementation detail

Addresses and Ports
===================

+---------------+---------+-------+
|               |Server   |Client |
+===============+=========+=======+
|Default address|localhost|0.0.0.0|
+---------------+---------+-------+
|Default port   |55555    |55555  |
+---------------+---------+-------+

It is possible to operate in "auto" mode instead of client or server
mode. In that case the following actions are performed:

#. Try to bind a listen socket to the configured address, port pair

   * If this succeeds, act as server
   * If this fails, goto 2
#. Try to connect to a socket bound to the configured address, port
   pair

   * If this succeeds, act as client
   * If this fails, give up


Messages
========

The following messages are exchanged:

+-----------------+----------------+-------------------------------------+--------------------------------------------+
| Name            |Size [bytes]    |Content                              |Comment                                     |
+=================+================+=====================================+============================================+
|m\ :sub:`zero`   |4               |four 0 bytes                         |only used during handshake                  |
+-----------------+----------------+-------------------------------------+--------------------------------------------+
|m\ :sub:`size`   |4               |size of payload in m\ :sub:`payload` |little-endian                               |
+-----------------+----------------+-------------------------------------+--------------------------------------------+
|m\ :sub:`payload`|variable        |payload blob                         |size is specified by previous m\ :sub:`size`|
+-----------------+----------------+-------------------------------------+--------------------------------------------+

.. note::

   The handshake part of the protocol (explained below) is required to
   prevent the following scenario from happening:

   #. A client process connects to the TCP-socket of the server
      (without handshake)
   #. The client process creates a :term:`listener` waiting for
      :term:`events <event>` from some remote :term:`participant`
   #. The client process causes some remote :term:`participant` to send
      an :term:`event` which the :term:`listener` should receive
   #. The :term:`event` is not delivered to the :term:`listener` since
      the connection is not yet fully established despite the fact
      that the listener was established *before* the :term:`event` was
      caused.

Client Perspective
==================

From the client's perspective, the protocol consist of

#. connect to the server socket
#. send m\ :sub:`zero`
#. receiving m\ :sub:`zero` and
#. concurrently send and receive length-delimited (via m\ :sub:`size`)
   notification messages m\ :sub:`payload`

.. digraph:: client_states

   fontname=Arial
   fontsize=11
   node [fontsize=11,fontname=Arial]
   edge [fontsize=11,fontname=Arial]

   "new";
   "handshake-in-progress";
   "closed";
   "new" -> "handshake-in-progress" [label="send(m_zero)"];
   "handshake-in-progress" -> "established" [label="receive() : m_zero"];
   "handshake-in-progress" -> "closed" [label="reset | error"];
   "established" -> "closed" [label="reset | error"];

   subgraph cluster_established_send {
     label="sending states when in state \"established\""
     "established-send" [label="established"];
     "size-sent";
     "closed-send" [label="closed"];
     "established-send" -> "size-sent" [label="send(m_size)"];
     "size-sent" -> "established-send" [label="send(m_payload)"];
     "established-send" -> "closed-send" [label="reset | error"];
     "size-sent" -> "closed-send" [label="reset | error"];
   };

    subgraph cluster_established_receive {
     label="receiving states when in state \"established\""
     "established-receive" [label="established"];
     "size-received";
     "closed-receive" [label="closed"];
     "established-receive" -> "size-received" [label="receive() : m_size"];
     "size-received" -> "established-receive" [label="receive() : m_payload"];
     "established-receive" -> "closed-receive" [label="reset | error"];
     "size-received" -> "closed-receive" [label="reset | error"];
   };

Server Perspective
==================

The server establishes a listening TCP socket on the configured
port. When a connection is accepted, the server continues to accept
other connections and concurrently performs the following protocol on
the new connection:

#. accept client connection
#. receive m\ :sub:`zero` from the client
#. send m\ :sub:`zero` in reply
#. concurrently send and received notifications using length-delimited
   encoding via m\ :sub:`size` and m\ :sub:`payload`

.. digraph:: server_states

   fontname=Arial
   fontsize=11
   node [fontsize=11,fontname=Arial]
   edge [fontsize=11,fontname=Arial]

   "new";
   "handshake-in-progress";
   "established";
   "closed";
   "new" -> "handshake-in-progress" [label="receive() : m_zero"];
   "handshake-in-progress" -> "established" [label="send(m_zero)"];
   "handshake-in-progress" -> "closed" [label="reset | error"];
   "established" -> "closed" [label="reset | error"];

    subgraph cluster_established_send {
     label="sending states when in state \"established\""
     "established-send" [label="established"];
     "size-sent";
     "closed-send" [label="closed"];
     "established-send" -> "size-sent" [label="send(m_size)"];
     "size-sent" -> "established-send" [label="send(m_payload)"];
     "established-send" -> "closed-send" [label="reset | error"];
     "size-sent" -> "closed-send" [label="reset | error"];
   };

    subgraph cluster_established_receive {
     label="receiving states when in state \"established\""
     "established-receive" [label="established"];
     "size-received";
     "closed-receive" [label="closed"];
     "established-receive" -> "size-received" [label="receive() : m_size"];
     "size-received" -> "established-receive" [label="receive() : m_payload"];
     "established-receive" -> "closed-receive" [label="reset | error"];
     "size-received" -> "closed-receive" [label="reset | error"];
   };

Example
=======

::

   # handshake
   C -> S 0x00 0x00 0x00 0x00
   S -> C                     0x00 0x00 0x00 0x00 0x00
   # established
   C -> S 0x23 0x00 0x00 0x00                          # 35-byte payload follows
   C -> S 0x12 0x34 0x56 0x78 0x9a ...                 # 35-byte payload blob
   C -> S 0x03 0x00 0x00 0x00                          # 3-byte payload follows
   C -> S 0x12 0x34 0x56                               # 3-byte payload blob
   ...

Implementations
===============

=========== ===========================================================
Language    File(s)
=========== ===========================================================
C++         |repository_versioned_cpp| at ``src/rsb/transport/socket``
Java        |repository_versioned_java| at ``src/rsb/transport/socket``
Python      :download:`/../rsb-python/rsb/transport/socket/__init__.py`
Common Lisp |repository_versioned_cl| at ``src/transport/socket``
=========== ===========================================================
