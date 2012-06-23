.. _specification:

===============
 Specification
===============

.. _specification-scope:

Scopes
======

Scopes designate :term:`channel` instances on the unified bus. :term:`Channel` instances
are themselves hierarchical, hence scopes also reflect this
structure.

There is a string-based notation for scopes:
``/parent/sub/subsubscope/``. A scope is valid if it matches the
regular expression: ``/([a-zA-Z0-9]+/)*``.

.. _specification-events:

Events
======

Conceptually and when represented in programs, |project|
:term:`events` consist of the following components:

+------------------------+----------------------------------------------------------------------+-------------------------------+----------------+
| Name                   | Type                                                                 | Comment                       | Required       |
+========================+======================================================================+===============================+================+
| sequence number        | 32-bit unsigned integer                                              | Assigned by informer          | yes            |
+------------------------+----------------------------------------------------------------------+-------------------------------+----------------+
| id                     | `UUID <http://en.wikipedia.org/wiki/Universally_unique_identifier>`_ | Unique Id of the event        | lazily derived |
+------------------------+----------------------------------------------------------------------+-------------------------------+----------------+
| :term:`scope`          | Scope object                                                         | Destination scope             | yes            |
+------------------------+----------------------------------------------------------------------+-------------------------------+----------------+
| method                 | ASCII string                                                         |                               | no             |
+------------------------+----------------------------------------------------------------------+-------------------------------+----------------+
| :term:`data type`      |                                                                      |                               | no?            |
+------------------------+----------------------------------------------------------------------+-------------------------------+----------------+
| :term:`event payload`  | Domain-specific object                                               |                               | no             |
+------------------------+----------------------------------------------------------------------+-------------------------------+----------------+
| meta-data              | (see below)                                                          | see below                     | no             |
+------------------------+----------------------------------------------------------------------+-------------------------------+----------------+
| cause vector           | set of EventIds                                                      | see below                     | no             |
+------------------------+----------------------------------------------------------------------+-------------------------------+----------------+

The id component of an :term:`event` is derived from the sequence
number of the :term:`event` and the id of the :term:`participant` that
sent the :term:`event` as follows:

#. Construct a string representation of the sequence number

   * Radix 16
   * Lower-case letters
   * Zero-padding to width 8

#. Use the UUID v.5 algorithm to construct the event id

   * namespace: id of the sending participant
   * name: the string constructed above

Examples / Test Cases::

  sequence number        0
  sender id              D8FBFEF4-4EB0-4C89-9716-C425DED3C527

  sequence number string "00000000"

  event id               v5-uuid(D8FBFEF4-4EB0-4C89-9716-C425DED3C527, "00000000")
  => 84F43861-433F-5253-AFBB-A613A5E04D71

::

  sequence number        378
  sender id              BF948D47-618F-4B04-AAC5-0AB5A1A79267

  sequence number string "0000017a"

  event id               v5-uuid(BF948D47-618F-4B04-AAC5-0AB5A1A79267, "0000017a")
  => BD27BE7D-87DE-5336-BECA-44FC60DE46A0

Meta Data
---------

:term:`Events` carry a set of meta data with themselves. Some meta
data items are specified and processed by |project| while others are
user-defined and not interpreted by |project|.

All timestamps are expressed in `Coordinated Universal Time (UTC)
<http://en.wikipedia.org/wiki/Coordinated_Universal_Time>`_ and stored
with microsecond precision (even if the clock source used by |project|
cannot actually provide microsecond precision).

The current set of specified, required meta data items is given below:

  sender id

    ID (a UUID) of the sending participant.

  create time

    A timestamp that is automatically filled with the time the
    :term:`event` object was in the client program. This should usually
    reflect the time at which the notified condition most likely
    occurred in the sender. If :term:`event` objects are reused, this
    timestamp has to be reset manually by the client.

  send time

    The time at which the generated :term:`notification` for an
    :term:`event` was sent on the bus (after serialization).

  receive time

    The time at which an :term:`event` is received by a listener in its
    encoded form.

  deliver time

    The time at which an :term:`event` was decoded and will be
    dispatched to the client as soon as possible (set directly before
    passing it to the client handler).

The following meta data items are user-defined:

  user times

    A set of user-defined keys and associated timestamps

  user infos

    A set of key-value user-defined options with string keys and values.

.. note::

   create time, send time and user times are computed using the clock
   source of the sending process, whereas receive time and deliver
   time are filled using the clock source of receiving participant's
   process.

Cause Vector
------------

Each :term:`event` can have a set of causing :term:`event` ids (the
idea is based on [Luckham2001PEI]_).  The user who sends an
:term:`event` needs to insert the respective :term:`event` ids
manually if required.

Currently, there is no specification regarding how these ids shall be
used. Especially the handling of questions related to transitivity has
not yet been solved.

.. _specification-uris:

URIs
====

Generic URIs
------------

Syntax::

  rsb:[PATH][#FRAGMENT]

Components of the URL are interpreted as follows:

* :samp:`{SCHEME}`   -> has to be ``rsb``
* :samp:`{PATH}`     -> A :term:`scope` which designates a one of the following things

  * A :term:`channel`
  * A :term:`participant`

    * A :term:`service` (which is-a :term:`participant`)
* :samp:`{FRAGMENT}` ->

  * Not allowed when designating a :term:`channel`
  * ID of a :term:`participant` otherwise

This may resolve to:

* :term:`Service` and/or :term:`Participant`

  * If there is only one of these entities this is enough for
    resolving it
  * If multiple entities reside on the :term:`scope`, a
    single instance can be selected using their ID::

      rsb:/hierarchical/service/definition/further/to/participant#UniqueIDOfParticipant[UUID]
* Nothing

These generic URIs require a global naming service.

Transport-specific URLs
-----------------------

Syntax::

  [SCHEME:][//HOST][:PORT][PATH][?QUERY][#FRAGMENT]
  transport://<location.transport.specific[:PORT]>/hierarchical/service/definition/further/to/participant

Components of the URL are interpreted as follows:

* :samp:`{SCHEME}`   -> :term:`transport` name (e.g spread)
* :samp:`{HOST}`     -> Transport-specific "host" option (e.g. host that runs the daemon for Spread :term:`transport`)
* :samp:`{PORT}`     -> Transport-specific "port" option (e.g. port on which daemon listens for Spread :term:`transport`)
* :samp:`{PATH}`     -> A :term:`scope` which designates one of the following things

  * A :term:`channel`
  * A :term:`participant`

    * A :term:`service` (which is-a :term:`participant`)
* :samp:`{QUERY}`    -> "freestyle" transport-specific options
* :samp:`{FRAGMENT}` ->

  * Not allowed when designating a :term:`channel`
  * ID of a :term:`participant` otherwise

Examples
--------

The following examples demonstrate generic URIs:

  ``rsb:``
    The :term:`channel` designated by the :term:`scope` ``/``.

  ``rsb:/``
    The :term:`channel` designated by the :term:`scope` ``/``.

  ``rsb:/foo/bar``
    The :term:`channel` designated by the :term:`scope` ``/foo/bar``.

  ``rsb:/foo/bar#10838319-09A4-4D15-BD59-5E054CDB4403``
    The :term:`participant` with ID
    ``10838319-09A4-4D15-BD59-5E054CDB4403``.

The following example demonstrate how to specify bus connections when
creating :term:`participants`:

  `` ``
    Participate in :term:`channel` with :term:`scope` ``/`` using the
    default :term:`transport` configuration.

  ``spread:``
    Participate in :term:`channel` with :term:`scope` ``/`` using the
    :term:`Spread` :term:`transport` with its default configuration.

  ``inprocess:``
    Participate in :term:`channel` with :term:`scope` ``/`` using the
    in-process :term:`transport` with its default configuration.

  ``spread://localhost:5555``
    Participate in :term:`channel` with :term:`scope` ``/`` via the
    :term:`Spread` daemon running on localhost and listening on port
    5555.

  ``inprocess://someotherhost``
    Syntactically correct, but does not make sense.

  ``spread:/foo/bar``
    Participate in :term:`channel` with :term:`scope` ``/foo/bar``
    using the default :term:`transport` configuration.

  ``spread:?maxfragmentsize=10000``
    Participate in :term:`channel` with :term:`scope` ``/`` using the
    :term:`Spread` :term:`transport` with default host and port and a
    maximum event fragment size of 10000 bytes.

  ``spread:?maxfragmentsize=10000&tcpnodelay=yes``
    Likewise, but in addition with tcpnodelay option set to ``yes``.

Implementations
---------------

=========== ==============================================
Language    File(s)
=========== ==============================================
C++         *not yet implemented*
Java        *not yet implemented*
Python      *not yet implemented*
Common Lisp |repository_versioned|/cl/cl-rsb/src/uris.lisp
=========== ==============================================

Spread Transport
================

TCP-Socket-based Transport
==========================

The TCP-socket-based :term:`transport` layers a very simple protocol
on top of ordinary TCP sockets:

* Processes act as either TCP-clients or -servers for a common
  port. There is one server and zero or more clients. Each
  client-server connection is a bi-direction stream of
  :term:`notification` s which are sent and received by
  :term:`participant` s in the respective processes.
* Each process may host zero, one or many
  :term:`participant` s. Within a process, the :term:`participants`
  share a connection.

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
      events from some remote :term:`participant`
   #. The client process causes some remote :term:`participant` to send
      an :term:`event` which the :term:`listener` should receive
   #. The :term:`event` is not delivered to the :term:`listener` since
      the connection is not yet fully established despite the fact
      that the listener was established *before* the :term:`event` was
      caused.

Client Perspective
------------------

From the client's perspective, the protocol consist of

#. connect to the server socket
#. send m\ :sub:`zero`
#. receiving m\ :sub:`zero` and
#. concurrently send and receive length-delimited (via m\ :sub:`size`)
   notification messages m\ :sub:`payload`

.. digraph:: client_states

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
------------------

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
-------

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
---------------

=========== ===================================================================
Language    File(s)
=========== ===================================================================
C++         |repository_versioned|/cpp/core/src/rsb/transport/socket
Java        *not yet implemented*
Python      |repository_versioned|/python/core/rsb/transport/socket/__init__.py
Common Lisp |repository_versioned|/cl/cl-rsb/src/transport/socket
=========== ===================================================================
