.. _specification-ros:

================
 ROS Transports
================

The `ROS`_ :term:`transport` enables some communication between
|project| :term:`participants <participant>` and `ROS`_ nodes.

The `ROS`_ :term:`transport` for |project| maps the following URI
schemas to ROS network protocols:

``tcp+ros`` (See :ref:`specification-tcpros`)

  Direct connections to the TCP endpoints of `ROS`_ nodes.

``ros`` (See :ref:`specification-ros`)

  Connections to `ROS`_ nodes are made via the `ROS`_ master.

.. _specification-tcpros:

TCP+ROS Transport (without Master Lookup)
=========================================

Direct connections to the TCP endpoints of `ROS`_ nodes. This
low-level protocol requires knowing the hostname and TCP port of a
`ROS`_ node. Knowing the node name and/or topic is not sufficient on
this level.

.. note::

   This schema is supported in the Python and Common Lisp
   implementations of |project|.

Schema
------

.. seealso::

   :ref:`specification-uris`
     Use of URIs in |project|.

This :term:`transport` uses the ``tcp+ros`` URI schema.

.. _specification-tcpros-options:

Options
-------

The following :ref:`configuration` options are accepted::

  Name        Type   Comment
  + transport
  +-- tcp+ros
  +---- host  string Hostname on which endpoint runs
  +---- port  uint16 Port on which entpoint listens

Implementations
---------------

=========== ==================================================================
Language    File(s)
=========== ==================================================================
C++         *not implemented yet*
Java        *not implemented yet*
Python      :download:`/../rsb-ros-python/rsbros/transport/tcpros/__init__.py`
Common Lisp |repository_versioned_ros_cl| src/transport/tcpros
=========== ==================================================================

.. _specification-ros-nameservice:

ROS Transport (with Master Lookup)
==================================

Connections to `ROS`_ nodes are made and accepted via the `ROS`_
master. That is the `ROS`_ master is consulted to determine the
endpoint for a given topic. After that, a low-level connection is
established, if one of the `ROS`_ transports offered by the endpoint
is supported.

For this schema, nameservice queries which yield multiple results or
change over time can lead to a changing set of connections.  For
example, the URL ``ros:/foo`` could causes connections to be
established to nodes publishing the topics ``/foo/bar`` and
``/foo/baz``.

.. note::

   This schema is only supported in the Common Lisp implementation of
   |project|.

Schema
------

.. seealso::

   :ref:`specification-uris`
     Use of URIs in |project|.

This :term:`transport` uses the ``ros`` URI schema.

.. _specification-ros-nameservice-options:

Options
-------

The following :ref:`configuration` options are accepted::

  Name        Type   Comment
  + transport
  +-- ros
  +---- host  string Hostname on which the ROS master runs
  +---- port  uint16 Port on which the ROS master listens

Implementations
---------------

=========== ===============================================
Language    File(s)
=========== ===============================================
C++         *not implemented yet*
Java        *not implemented yet*
Python      *not implemented yet*
Common Lisp |repository_versioned_ros_cl| src/transport/ros
=========== ===============================================

Bus Semantics
=============

TODO

Limitations
===========

TODO
