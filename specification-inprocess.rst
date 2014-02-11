.. _specification-inprocess:

=====================
 Inprocess Transport
=====================

This page describes the inprocess transport which delivers
:term:`events <event>` published by :term:`informers <informer>` in a
process to :term:`participants <participant>` in the same process
(i.e. inter-process or network communication does not occur).

.. _specification-inprocess-schema:

Schema
======

.. seealso::

   :ref:`specification-uris`
     Use of URIs in |project|.

The inprocess :term:`transport` uses the ``inprocess`` URI schema.

.. _specification-inprocess-options:

Options
=======

.. seealso::

   :ref:`specification-config`
     Specification of configuration mechanism.

The following :ref:`configuration <specification-config>` options are
accepted by the inprocess :term:`transport`::

  Name           Type  Comment
  + transport
  +-- inprocess        No options

Notification Format
===================

Since :term:`events <event>` are transported within a single process,
there is no need for serializing them into :term:`notifications
<notification>` and hence no need to apply :term:`converters
<converter>` as well. Instead, :term:`event` objects published by
:term:`informers <informer>` are just passed to the appropriate
receiving :term:`participants <participant>` after necessary meta-data
has been added.

.. important::

   This implementation implies that client code is forbidden to modify
   sent (after sending) and received :term:`events <event>`.

Hierarchical Bus
================

Distribution of :term:`events <event>` *can* be implemented as follows

* An associative array maps :term:`scopes <scope>` to receiving
  :term:`participants <participant>`, listening on the respective
  :term:`scope`

* An :term:`event` is delivered to the list of :term:`participants
  <participant>` obtained by concatenating the :term:`participant`
  lists of all :term:`superscopes <superscope>` of the :term:`event`'s
  :term:`scope`.

Example for :term:`scope` ``/foo/bar/``::

  super-scopes(/foo/bar/, include-self? = yes) = /, /foo/, /foo/bar/

Implementations
===============

=========== ==============================================================
Language    File(s)
=========== ==============================================================
C++         |repository_versioned_cpp| at ``src/rsb/transport/inprocess``
Java        |repository_versioned_java| at ``src/rsb/transport/inprocess``
Python      :download:`/../rsb-python/rsb/transport/local/__init__.py`
Common Lisp |repository_versioned_cl| at ``src/transport/inprocess``
=========== ==============================================================
