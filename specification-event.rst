.. _specification-event:

=======
 Event
=======

Conceptually and when represented in programs, |project| :term:`events
<event>` consist of the following components:

+------------------------+----------------------------------------------------------------------+-----------------------------------+----------------+
| Name                   | Type                                                                 | Comment                           | Required       |
+========================+======================================================================+===================================+================+
| `Sequence number`_     | 32-bit unsigned integer                                              | Assigned by :term:`informer`      | yes            |
+------------------------+----------------------------------------------------------------------+-----------------------------------+----------------+
| `Sender id`_           | `UUID <http://en.wikipedia.org/wiki/Universally_unique_identifier>`_ | Unique Id of the :term:`informer` | yes            |
+------------------------+----------------------------------------------------------------------+-----------------------------------+----------------+
| `Event id`_            | `UUID <http://en.wikipedia.org/wiki/Universally_unique_identifier>`_ | Unique Id of the :term:`event`    | lazily derived |
+------------------------+----------------------------------------------------------------------+-----------------------------------+----------------+
| :term:`Scope`          | :term:`Scope` object                                                 | Destination :term:`scope`         | yes            |
+------------------------+----------------------------------------------------------------------+-----------------------------------+----------------+
| `Method`_              | ASCII string                                                         |                                   | no             |
+------------------------+----------------------------------------------------------------------+-----------------------------------+----------------+
| :term:`Data type`      | ASCII string                                                         | Specifies type of :term:`payload` | no?            |
+------------------------+----------------------------------------------------------------------+-----------------------------------+----------------+
| :term:`Event payload`  | Domain-specific object                                               |                                   | no             |
+------------------------+----------------------------------------------------------------------+-----------------------------------+----------------+
| `Timestamps`_          | Multiple named 64-bit integers                                       |                                   | no             |
+------------------------+----------------------------------------------------------------------+-----------------------------------+----------------+
| `Cause vector`_        | Set of :term:`event ids <event id>`                                  |                                   | no             |
+------------------------+----------------------------------------------------------------------+-----------------------------------+----------------+

.. _specification-sequence-number:

Sequence Number
===============

:term:`Event` sequence numbers are 32-bit unsigned integers which
indicate the order of :term:`events <event>` published by a particular
:term:`informer`. Sequence numbers start at 0 corresponding to the
first :term:`event` and are incremented by 1 for each subsequent
:term:`event`. Sequence numbers wrap around to 0 at 4294967296 (that
is, the largest sequence number is 4294967295).

.. important::

   :term:`Participants <participant>` which receive :term:`events
   <event>` cannot generally rely on

   #. receiving *all* :term:`events <event>` (according to
      :term:`sequence numbers <sequence number>`) published by a
      particular :term:`informer`. This assumption may hold, however,
      if the :term:`informer` in question behaves according to some
      constraints (i.e. publishing only to one particular
      :term:`scope`).
   #. receiving :term:`events <event>` published by a particular
      :term:`informer` *in order* (according to :term:`sequence numbers
      <sequence number>`).

      TODO cross-reference quality of service

.. _specification-event-sender-id:

Sender Id
=========

ID (a UUID) of the sending :term:`participant`.

.. _specification-event-id:

Event ID
========

The id component of an :term:`event` is derived from the
:term:`sequence number` of the :term:`event` and the id of the
:term:`participant` that sent the :term:`event` as follows:

#. Construct a string representation of the :term:`sequence number`

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

.. _specification-event-method:

Method
======

:term:`Events <event>` can carry an optional method string which
indicates the role of the :term:`event` in a particular communication
pattern or some kind of action performed by the respective
:term:`event`.

Currently, the following method strings are defined:

+---------------+-----------------------------------------------------------------------------+
| String        | Meaning                                                                     |
+===============+=============================================================================+
| ``"REQUEST"`` | Request :term:`event` of a :ref:`method call <specification-request-reply>` |
+---------------+-----------------------------------------------------------------------------+
| ``"REPLY"``   | Reply :term:`event` of a :ref:`method call <specification-request-reply>`   |
+---------------+-----------------------------------------------------------------------------+

.. note::

   The values mentioned above should not be used to indicate
   application-level semantics. Further, it has not yet been decided,
   whether new values should be introduced as needed or if some kind
   of coordination is required.

.. _specification-event-timestamps:

Timestamps
==========

:term:`Events <event>` carry a set of timestamps. All timestamps are
expressed in

#. `Coordinated Universal Time (UTC)
   <http://en.wikipedia.org/wiki/Coordinated_Universal_Time>`_
#. since `UNIX epoch <http://en.wikipedia.org/wiki/Unix_time#Encoding_time_as_a_number>`_
#. and stored with microsecond precision

(even if the clock source used by |project| cannot actually provide
microsecond precision).

.. note::

   When considering the issue of representing time rigorously, the
   above description is far from unambiguous. Since we are no experts
   with respect to representing time, we just say "convert your UTC
   time to UNIX time keeping up to 6 decimals of the remainder".

For each :term:`event`, the following timestamps are maintained by
|project|:

create time

  A timestamp that is automatically filled with the time at which the
  :term:`event` object was created in the client program. This should
  usually reflect the time at which the notified condition most likely
  occurred in the sending process. If :term:`event` objects are
  reused, this timestamp has to be reset manually by the client.

send time

  The time at which the generated :term:`notification` for an
  :term:`event` was sent on the bus (after serialization).

receive time

  The time at which an :term:`event` is received by a :term:`listener`
  in its serialized form (before deserialization).

deliver time

  The time at which an :term:`event` is dispatched to the client
  (after deserialization). The timestamp is set directly before
  passing the :term:`event` to the :term:`handler`.

The relation between the various timestamps is illustrated in the
below figure:

.. digraph:: timestamps

   fontname=Arial
   fontsize=11
   node [fontsize=11,fontname=Arial]
   edge [fontsize=11,fontname=Arial]

   rankdir=LR
   node [shape="rect"]

   subgraph cluster_informer {
     label = "Informer"

     event
     node [style="rounded,filled",fillcolor="#ffc0c0"]
     create
     serialize
     send
   }

   subgraph cluster_in_flight {
     label = "In-flight"

     helper [shape=none,label=""]
   }

   subgraph cluster_listener {
     label = "Listener"

     node [style="rounded,filled",fillcolor="#c0c0ff"]
     receive
     deserialize
     deliver
   }

   create -> event
   event -> serialize
   serialize -> send
   send -> helper
   helper -> receive
   receive -> deserialize
   deserialize -> deliver

   node [shape=note,style="filled",fillcolor="#ffffe0"]
   create_time [label="attach create time"]
   create_time -> create
   send_time [label="attach send time"]
   send_time -> send
   receive_time [label="attach receive time"]
   receive_time -> receive
   deliver_time [label="attach deliver time"]
   deliver_time -> deliver

.. important::

   As indicated in the above figure, create time, send time and user
   times are computed using the clock source of the sending process,
   whereas receive time and deliver time are filled using the clock
   source of receiving :term:`participant's <participant>` process.

.. _specification-event-user-meta-data:

User-defined Meta Data
======================

The following meta data items are user-defined:

user times

  A set of user-defined keys and associated timestamps. These
  timestamps use the same encoding as the :ref:`framework-maintained
  timestamps <specification-event-timestamps>`.

user infos

  A set of key-value user-defined options with string keys and values.

.. _specification-event-cause-vector:

Cause Vector
============

Each :term:`event` can have a set of causing :term:`event` ids (the
idea is based on [Luckham2001PEI]_).  The user who sends an
:term:`event` needs to insert the respective :term:`event` ids
manually if required.

.. important::

   Currently, there is no specification regarding how these ids shall
   be used. Especially the handling of questions related to
   transitivity has not yet been solved.

Implementations
===============

=========== =======================================================
Language    File(s)
=========== =======================================================
C++         |repository_versioned_cpp| at ``src/rsb/Event.{h,cpp}``
Java        :download:`/../rsb-java/src/rsb/Event.java`
Python      :download:`/../rsb-python/rsb/__init__.py`
Common Lisp :download:`/../rsb-cl/src/event.lisp`
=========== =======================================================
