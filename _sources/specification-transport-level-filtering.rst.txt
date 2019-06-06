.. _specification-transport-level-filtering:

===========================
 Transport-level Filtering
===========================

.. note::

   This specification is a draft and may change at any
   time. Furthermore, the features described in this specification are
   not yet implemented.

For efficiency, it is desirable to filter :term:`event` s at the
:term:`transport`-level, i.e. during processing in
:term:`connector` s. The decision whether a :term:`notification` (or
later :term:`event`) can be discarded or not should be made as early
as possible. In general, during processing in :term:`connector` s,
there are at least two opportunities:

#. After obtaining :term:`notification` s from the wire, but before
   decoding the complete meta-data and payload

#. After decoding meta-data and :term:`payload`, but before
   constructing an :term:`event` object and adding additional
   meta-data

Notification Filtering (1)
==========================

One possible method for filtering :term:`notification` s before
decoding everything works by extracting the required meta-data
fields. This has to be supported by the serialization mechanism used
for :term:`notification` s.

An implementation of this scheme could work by implementing backends
for XPath engines that operate on serialized data instead of
DOM-infosets. The :term:`connector` in question could then translate
client-supplied :term:`filter` s on :term:`event` meta-data into XPath
expression that would be applicable to supported serialization
formats.

Example:

A :term:`Spread` :term:`connector` with suitable serialization
mechanism for :term:`notification` s (e.g. Protocol Buffers) could translate an ``OriginFilter`` for origin ``A60CBE00-99B8-11E0-8A00-001AA0342D7D`` into::

  node()/meta_data[@sender_id="A60CBE00-99B8-11E0-8A00-001AA0342D7D"]

Compatible Filters

* Origin Filter
  :samp:`node()/meta_data[@sender_id="{ORIGIN}"]`

* Method Filter
  :samp:`node()[@method="{METHOD}"]`

Implementation
--------------

The matching could be implemented efficiently by an XPath backend that
skips over fields of the serialized representation which do not have
to be inspected to decide whether the XPath matches. For
``Notification`` protocol buffer messages, the following document
object model is recommended::

  + Document
  +-- root                  element node, corresponds to instance of "Notification" protocol buffer message
  +---- packed_size         attribute node, "virtual": does not correspond to a field
  +---- version             attribute node, corresponds to "version" field in "Notification" message
  +---- id                  attribute node, corresponds to "id" field in "Notification" message
  +---- method              attribute node, corresponds to "method" field in "Notification" message
  [...]
  +---- meta_data           element node, corresponds to "meta_data" field in "Notification" message
  +------ sender_id         attribute node, corresponds to "sender_id" field in "MetaData" message
  +------ create_time       attribute node, corresponds to "create_time" field in "MetaData" message
  [...]
  +------ user_times        element node, corresponds to "user_time" field in "MetaData" message
  +-------- key             attribute node, corresponds to "key" field in "UserTime" message
  +-------- timestamp       attribute node, corresponds to "timestamp" field in "UserTime" message
  +------ user_times        can be repeated
  [...]
  +------ user_infos        element node, corresponds to "user_infos" field in "MetaData" message
  +-------- key             attribute node, corresponds to "key" field in "UserInfo" message
  +-------- value           attribute node, corresponds to "value" field in "UserInfo" message
  +------ user_infos        can be repeated
  [...]

Payload Filtering (2)
=====================

Depending on the serialization mechanism used for notification
payloads, it may be possible to translate client-supplied filters
which discriminate based on event payloads into filters that are
applicable to serialized notification payloads.

Example:

TBD

Implementations
===============

=========== =====================
Language    File(s)
=========== =====================
C++         *not yet implemented*
Java        *not yet implemented*
Python      *not yet implemented*
Common Lisp *not yet committed*
=========== =====================
