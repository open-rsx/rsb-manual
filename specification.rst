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

Client States
-------------

.. digraph:: foo

   "new";
   "handshake-in-progress";
   "established";
   "closed";
   "new" -> "handshake-in-progress" [label="send(00 00 00 00)"];
   "handshake-in-progress" -> "established" [label="receive(00 00 00 00)"];
   "handshake-in-progress" -> "closed" [label="error"];
   "established" -> "header-sent" [label="send(S1 S2 S3 S4)"];
   "established" -> "closed";
   "header-sent" -> "established" [label="send(P1 P2 ...)"];
   "closed";
