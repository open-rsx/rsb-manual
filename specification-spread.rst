.. _specification-spread:

==================
 Spread Transport
==================

This page describes the protocol used by the :term:`Spread`-based
:term:`transport`.

Schema
======

.. seealso::

   :ref:`specification-uris`
     Use of URIs in |project|.

The :term:`Spread` :term:`transport` uses the ``spread`` URI schema.

Notification Format
===================

Data exchanged on the wire by the :term:`Spread`-based
:term:`transport` is encoded using `Google protocol buffers`_. A
:term:`Spread` message always contains a fragment of a
:term:`notification` elementary communication unit:

.. literalinclude:: ../rsb-protocol/rsb/protocol/FragmentedNotification.proto
   :language: protobuf
   :lines:    26-
   :linenos:

.. literalinclude:: ../rsb-protocol/rsb/protocol/Notification.proto
   :language: protobuf
   :lines:    26-
   :linenos:

Fragmentation
=============

Because :term:`Spread` has a message size limit, a single
:term:`notification` may not be sufficient to transport a whole
:term:`event` when the :term:`payload` is large. Hence, :term:`event`
s may be encoded in several ``FragmentedNotification`` s which are
sent sequentially. Multiple ``FragmentedNotification`` objects are
constructed according to the following rules:

* The size of individual fragments (i.e. serialized size of the
  ``FragmentedNotification`` objects) must not exceed 100,000 octets
* Fragment numbers are in the range :samp:`[0, {NUMBER-OF-FRAGMENTS} -
  1]`
* The fields which differ among ``FragmentedNotification`` s for one
  :term:`event` are:

  * The number of the fragment (``FragmentedNotification.data_part``
    field)
  * The :term:`payload` (``FragmentedNotification.notification.data``
    field)
  * Which fields of the ``Notification`` embedded in
    ``FragmentedNotification.notification`` are present (see below)

* Each of the ``FragmentedNotification`` objects contains a
  ``Notification`` object

  * The :term:`event id` (``Notification.event_id`` field) is always
    present (to specify the :term:`event` to which a fragment belongs)

  * For the initial fragment (fragment number 0), all fields of the
    embedded ``Notification`` object are present
  * For subsequent fragments (fragment number >= 1), only the following
    fields of the embedded ``Notification`` object are present:

    * ``Notification.event_id``
    * ``Notification.data``

Hierarchical Bus
================

The hierarchical bus is created by sending each message to a
:term:`Spread`-group corresponding to its :term:`scope` as well as to
:term:`Spread`-groups corresponding to all :term:`superscope` s
including the root-:term:`scope` (``/``) (In :term:`Spread`
terminology this is called "multigroup mulitcast").

Example for :term:`scope` ``/foo/bar/``::

  super-scopes(/foo/bar/, include-self? = yes) = /, /foo/, /foo/bar/

Group Names
===========

Group names are created by applying the following steps to the fully
formal :term:`scope` string representation (**including trailing
slash**):

#. Hash the scope string using `MD5 <http://en.wikipedia.org/wiki/MD5>`_.
#. Convert the 16 bytes of output to a 32 character string by
   concatenating the **zero-padded** hex (base-16) representations of
   the individual bytes. Letters of the hex representation have to be
   lower case.
#. Remove the final character of the hex representation of the hash.
   (Since :term:`Spread` group names can only be 32 bytes long
   *including the 0-terminator*)

Example::

  /         -> "6666cd76f96956469e7be39d750cc7d\0"
  /foo/     -> "4f87be8f6e593d167f5fd1ab238cfc2\0"
  /foo/bar/ -> "1c184f3891344400380281315d9e738\0"

Quality of Service
==================

The following table explains how the 2D |project| QoS settings are
mapped to :term:`Spread` message types:

============= =================== ================
Quality       unreliable          reliable
============= =================== ================
**unordered** ``UNRELIABLE_MESS`` ``RELIABLE_MESS``
**ordered**   ``FIFO_MESS``       ``FIFO_MESS``
============= =================== ================

Implementations
===============

=========== ==============================================================
Language    File(s)
=========== ==============================================================
C++         |repository_versioned_cpp| at ``src/rsb/transport/spread``
Java        |repository_versioned_java| at ``src/rsb/transport/spread``
Python      :download:`/../rsb-python/rsb/transport/rsbspread/__init__.py`
Common Lisp |repository_versioned_cl| at ``src/transport/spread``
=========== ==============================================================
