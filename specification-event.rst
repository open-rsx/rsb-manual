.. _specification-event:

=======
 Event
=======

Conceptually and when represented in programs, |project| :term:`event`
s consist of the following components:

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

.. _specification-sequence-number:

Sequence Number
===============

:term:`Event` sequence numbers are 32-bit unsigned integers which
indicate the order of :term:`event` s published by a particular
:term:`informer`. Sequence numbers start at 0 corresponding to the
first :term:`event` and are incremented by 1 for each subsequent
:term:`event`. Sequence numbers wrap around to 0 at 4294967296 (that
is, the largest sequence number is 4294967295).

.. important::

   :term:`Participant` s which receive :term:`event` s cannot
   generally rely on

   #. receiving *all* :term:`event` s (according to :term:`sequence
      number` s) published by a particular :term:`informer`. This
      assumption may hold, however, if the :term:`informer` in
      question behaves according to some constraints (i.e. publishing
      only to one particular :term:`scope`).
   #. receiving :term:`event` s published by a particular
      :term:`informer` *in order* (according to :term:`sequence
      number` s).

      TODO cress-reference quality of service

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

Meta Data
=========

:term:`Event` s carry a set of meta data with themselves. Some meta
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
============

Each :term:`event` can have a set of causing :term:`event` ids (the
idea is based on [Luckham2001PEI]_).  The user who sends an
:term:`event` needs to insert the respective :term:`event` ids
manually if required.

Currently, there is no specification regarding how these ids shall be
used. Especially the handling of questions related to transitivity has
not yet been solved.

Implementations
===============

=========== ====================================================
Language    File(s)
=========== ====================================================
C++         |repository_versioned| rsb-cpp/src/rsb/Event.{h,cpp}
Java        |repository_versioned| rsb-java/src/rsb/Event.java
Python      |repository_versioned| rsb-python/rsb/__init__.py
Common Lisp |repository_versioned| rsb-cl/src/event.lisp
=========== ====================================================
