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
  +---- portfile    string          Write automatically assigned port here
  +---- server      { 0, 1, auto }  Act as server?
  +---- tcpnodelay  boolean         Implementation detail

.. note::

   The ``portfile`` option is only supported by the Common Lisp
   implementation as part of a special mode of operations which is
   explained :ref:`below <specification-socket-auto-port>`.

.. _specification-socket-addresses-and-ports:

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

.. note::

   This "auto" mode can only work properly for connections on a single
   computer: if a host other than the local host was used, it would be
   impossible to act as server when required.

   In special cases, "auto" may still be useful for setups distributed
   over multiple computers but these cases require a detailed
   understanding of the above protocol and should generally be
   avoided.

.. _specification-socket-auto-port:

Automatic Selection of an Unused Server Port
--------------------------------------------

The combination of options ``port=0``, ``server=1`` causes the server
to choose an unused port automatically. The purpose of the
``portfile`` option is obtaining this automatically assigned port.

The following values are supported

``-``

  Write the selected port to the standard output stream.

``-2``

  Write the selected port to the error output stream.

any other string

  Interpret the string as a filename and write the selected port to
  that file. The file is overwritten, if it already exists.

.. warning::

   This feature is only supported in the Common Lisp implementation.

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
#. receive m\ :sub:`zero` from the server
#. concurrently send and receive length-delimited (via m\ :sub:`size`)
   notification messages m\ :sub:`payload`
#. shutdown; one of:

   #. error shutdown

      #. error in send or receive operation
      #. close socket

   #. passive orderly shutdown

      #. "end of file" in receive operation
      #. shutdown socket for writing
      #. close socket

   #. active orderly shutdown

      #. termination request from client program
      #. shutdown socket for writing
      #. wait for "end of file" from server
      #. close socket

.. digraph:: client_states

   fontname=Arial
   fontsize=11
   node [fontsize=11,fontname=Arial]
   edge [fontsize=11,fontname=Arial]

   "new";
   "setup-handshake";
   "established";
   "shutdown-handshake-active" [label="shutdown-handshake[active]"];
   "shutdown-handshake-passive" [label="shutdown-handshake[passive]"];
   "closed";
   "new" -> "setup-handshake";
   "setup-handshake" -> "established" [label="receive() : m_zero"];
   "setup-handshake" -> "closed" [label="error"];
   "established" -> "closed" [label="error"];
   "established" -> "shutdown-handshake-active" [label="program shutdown => shutdown(socket)"];
   "shutdown-handshake-active" -> "closed" [label="error | receive() : end-of-file"];
   "established" -> "shutdown-handshake-passive" [label="receive() : end-of-file"];
   "shutdown-handshake-passive" -> "closed" [label="error | shutdown(socket)"];

   subgraph cluster_established_send {
     label="sending states when in state \"established\""
     "established-send" [label="established"];
     "size-sent";
     "closed-send" [label="closed"];
     "established-send" -> "size-sent" [label="send(m_size)"];
     "size-sent" -> "established-send" [label="send(m_payload)"];
     "established-send" -> "closed-send" [label="error"];
     "size-sent" -> "closed-send" [label="error"];
   };

   subgraph cluster_established_receive {
     label="receiving states when in state \"established\""
     "established-receive" [label="established"];
     "size-received";
     "closed-receive" [label="closed"];
     "shutdown-handshake-receive" [label="shutdown-handshake[passive]"];
     "established-receive" -> "size-received" [label="receive() : m_size"];
     "size-received" -> "established-receive" [label="receive() : m_payload"];
     "established-receive" -> "closed-receive" [label="error"];
     "size-received" -> "closed-receive" [label="error"];
     "established-receive" -> "shutdown-handshake-receive" [label="receive() : end-of-file"];
   };

Server Perspective
==================

The server establishes a listening TCP socket on the configured
port. When a connection is accepted, the server continues to accept
other connections and concurrently performs the following protocol on
the new connection:

#. accept client connection
#. send m\ :sub:`zero` in to the client
#. concurrently send and received notifications using length-delimited
   encoding via m\ :sub:`size` and m\ :sub:`payload`
#. shutdown; one of:

   #. error shutdown

      #. error in send or receive operation
      #. close socket

   #. passive orderly shutdown

      #. "end of file" in receive operation
      #. shutdown socket for writing
      #. close socket

   #. active orderly shutdown

      #. termination request from client program
      #. shutdown socket for writing
      #. wait for "end of file" from client
      #. close socket

.. digraph:: server_states

   fontname=Arial
   fontsize=11
   node [fontsize=11,fontname=Arial]
   edge [fontsize=11,fontname=Arial]

   "new";
   "setup-handshake";
   "established";
   "shutdown-handshake-active" [label="shutdown-handshake[active]"];
   "shutdown-handshake-passive" [label="shutdown-handshake[passive]"];
   "closed";
   "new" -> "setup-handshake";
   "setup-handshake" -> "established" [label="send(m_zero)"];
   "setup-handshake" -> "closed" [label="error"];
   "established" -> "closed" [label="error"];
   "established" -> "shutdown-handshake-active" [label="program shutdown => shutdown(socket)"];
   "shutdown-handshake-active" -> "closed" [label="error | receive() : end-of-file"];
   "established" -> "shutdown-handshake-passive" [label="receive() : end-of-file"];
   "shutdown-handshake-passive" -> "closed" [label="error | shutdown(socket)"];

   subgraph cluster_established_send {
     label="sending states when in state \"established\""
     "established-send" [label="established"];
     "size-sent";
     "closed-send" [label="closed"];
     "established-send" -> "size-sent" [label="send(m_size)"];
     "size-sent" -> "established-send" [label="send(m_payload)"];
     "established-send" -> "closed-send" [label="error"];
     "size-sent" -> "closed-send" [label="error"];
   };

   subgraph cluster_established_receive {
     label="receiving states when in state \"established\""
     "established-receive" [label="established"];
     "size-received";
     "closed-receive" [label="closed"];
     "shutdown-handshake-receive" [label="shutdown-handshake[passive]"];
     "established-receive" -> "size-received" [label="receive() : m_size"];
     "size-received" -> "established-receive" [label="receive() : m_payload"];
     "established-receive" -> "closed-receive" [label="error"];
     "size-received" -> "closed-receive" [label="error"];
     "established-receive" -> "shutdown-handshake-receive" [label="receive() : end-of-file"];
   };

Example
=======

::

   # handshake
   S -> C 0x00 0x00 0x00 0x00 0x00
   # established
   C -> S 0x23 0x00 0x00 0x00                          # 35-byte payload follows
   C -> S 0x12 0x34 0x56 0x78 0x9a ...                 # 35-byte payload blob
   C -> S 0x03 0x00 0x00 0x00                          # 3-byte payload follows
   C -> S 0x12 0x34 0x56                               # 3-byte payload blob
   ...
   # shutdown
   C -> S end-of-file
   S -> C end-of-file

Implementations
===============

=========== ===========================================================
Language    File(s)
=========== ===========================================================
C++         |repository_versioned_cpp| at ``src/rsb/transport/socket``
Java        |repository_versioned_java| at ``src/rsb/transport/socket``
Python      :download:`upstream/rsb-python/rsb/transport/socket/__init__.py`
Common Lisp |repository_versioned_cl| at ``src/transport/socket``
=========== ===========================================================
