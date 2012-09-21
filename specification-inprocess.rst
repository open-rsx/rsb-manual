.. _specification-inprocess:

=====================
 Inprocess Transport
=====================

This page describes the inprocess transport which delivers
:term:`event` s published by :term:`informer` s in a process to
:term:`participant` s in the same process (i.e. inter-process or
network communication does not occur).

Schema
======

.. seealso::

   :ref:`specification-uris`
     Use of URIs in |project|.

The inprocess :term:`transport` uses the ``inprocess`` URI schema.

Notification Format
===================

Since :term:`event` s are transported within a single process, there
is no need for serializing them into :term:`notification` s and hence
no need to apply :term:`converter` s as well. Instead, :term:`event`
objects published by :term:`informer` s are just passed to the
appropriate :term:`participant` s after necessary meta-data has been
added.

.. important::

   This implementation requires that client code is forbidden to
   modify received :term:`event` s.

Hierarchical Bus
================

Distribution of :term:`event` s *can* be implemented as follows

* An associative array maps :term:`scope` s to receiving
  :term:`participant` s, listening on the respective :term:`scope`
* An :term:`event` is delivered to the list of :term:`participant` s
  obtained by concatenating the :term:`participant` lists of all
  :term:`superscope` s of the :term:`event`'s :term:`scope`.

Example for :term:`scope` ``/foo/bar/``::

  super-scopes(/foo/bar/, include-self? = yes) = /, /foo/, /foo/bar/

Implementations
===============

=========== ==========================================================
Language    File(s)
=========== ==========================================================
C++         |repository_versioned| rsb-cpp/src/rsb/transport/inprocess
Java        *not yet implemented*
Python      :download:`/../rsb-python/rsb/transport/local/__init__.py`
Common Lisp |repository_versioned| rsb-cl/src/transport/inprocess
=========== ==========================================================
