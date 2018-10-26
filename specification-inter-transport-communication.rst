.. _inter-transport-communication:

===============================
 Inter-transport Communication
===============================

Inter-:term:`transport` communication becomes necessary, when
:term:`participants <participant>` want to communicate that are
connected to the unified bus using different :term:`transport`
mechanisms.

.. note::

   This description describes the TCP-based :term:`transport` but also
   applies to the :term:`Spread` :term:`transport`.

Inter-Transport Setup
=====================

.. digraph:: interTransport

   resolution=60

   subgraph clusterInprocessAndSocket {
     label="inprocess-and-socket : Process"

     l1 [label="Listener", shape=box, style=filled, fillcolor="#c0ffc0"]
     sic1 [label="Socket In Connector", shape=octagon, style=filled, fillcolor="#ffc0c0"]
     iic1 [label="Inprocess In Connector", shape=octagon, style=filled, fillcolor="#ffc0c0"]

     sic1 -> l1
     iic1 -> l1

     i1 [label="Informer", shape=box, style=filled, fillcolor="#c0ffc0"]
     soc1 [label="Socket Out Connector", shape=octagon, style=filled, fillcolor="#ffc0c0"]
     ioc1 [label="Inprocess Out Connector", shape=octagon, style=filled, fillcolor="#ffc0c0"]

     i1 -> soc1
     i1 -> ioc1

     ib [label="Inprocess Bus", shape=ellipse, style=filled, fillcolor="#c0c0ff"]

     ib -> iic1
     ioc1 -> ib
   }

   subgraph clusterSocketOnly {
     label="socket-only : Process"

     l2 [label="Listener", shape=box, style=filled, fillcolor="#c0ffc0"]
     sic2 [label="Socket In Connector", shape=octagon, style=filled, fillcolor="#ffc0c0"]

     sic2 -> l2
   }

   sb [label="Socket Bus", shape=ellipse, style=filled, fillcolor="#c0c0ff"]

   sb -> sic1
   soc1 -> sb
   sb -> sic2

This page describes how to setup :term:`participants <participant>`
for inter-:term:`transport` communication using the following scenario
which is illustrated in the above figure:

:term:`Participants <participant>` reside in two separate processes

* One process is an instance of the program
  :program:`inprocess-and-socket` (source:
  :download:`inprocess-and-socket.cpp
  <upstream/rsb-cpp/examples/inter_transport/inprocess-and-socket.cpp>`)

  * There is one :term:`informer` in the process. It has two
    :term:`connectors <connector>`

    * One :term:`connector` for the :term:`Spread` :term:`transport`

    * One :term:`connector` for the :term:`inprocess`
      :term:`transport`

  * There is one :term:`listener` in the process. It has two
    :term:`connectors <connector>`

    * One :term:`connector` for the :term:`Spread` :term:`transport`

    * One :term:`connector` for the :term:`inprocess`
      :term:`transport`

* The other process is an instance of the program
  :program:`socket-only` (source: :download:`socket-only.cpp
  <upstream/rsb-cpp/examples/inter_transport/socket-only.cpp>`)

  * There is one :term:`listener` in the process. It has a single
    :term:`connector` for the :term:`Spread` :term:`transport`.

.. note::

   With this setup, the :term:`listener` in the
   :program:`inprocess-and-socket` process will currently receive all
   :term:`events <event>` twice.

There are two ways to attach multiple :term:`transports <transport>` to
:term:`participants <participant>`:

#. Via :ref:`configuration options <configuration>`
   (:ref:`configuration file <specification-config-files>`,
   :ref:`environment variables
   <specification-config-environment-variables>`, etc.)
#. Programmatically

These two alternatives are described below.

Via Configuration Options
-------------------------

When configured via the :ref:`configuration mechanism
<configuration>`, the multi-:term:`transport` setup will have a global
effect in the following sense: it will affect all :term:`participants
<participant>` in all processes which are not explicitly instantiated
with a different set of :term:`connectors <connector>`.

In addition to the :term:`Spread` :term:`transport` which is
(currently) enabled by default, other :term:`transports <transport>`
can be enabled globally using a :ref:`configuration file
<specification-config-files>` fragment like this:

.. code-block:: ini

   [transport.inprocess]
   enabled = 1

Programmatically (C++)
----------------------

The set of :term:`transports <transport>` used by individual
:term:`participants <participant>` or as a default by all newly created
:term:`participants <participant>` can be configured by modifying
:cpp:class:`rsb::ParticipantConfig::Transport` objects.
These objects contain, among other things, an option which
controls whether a particular :term:`transport` is enabled. A modified
:cpp:class:`rsb::ParticipantConfig` object can be used in two ways:

Globally for a Process

  The example programs :download:`inprocess-and-socket.cpp
  <upstream/rsb-cpp/examples/inter_transport/inprocess-and-socket.cpp>` and
  :download:`socket-only.cpp
  <upstream/rsb-cpp/examples/inter_transport/socket-only.cpp>` implement
  the inter-:term:`transport` setup described above by modifying the
  default :term:`participant` configuration in the
  :program:`inprocess-and-socket` process to include the
  :term:`inprocess` :term:`transport`.

Locally for a :term:`Participant`

  In order to use a prepared :cpp:class:`rsb::ParticipantConfig`
  object only locally instead of installing it as a global default, it
  can be passed to the following methods:

  * :cpp:member:`rsb::Factory::createReader`
  * :cpp:member:`rsb::Factory::createListener`
  * :cpp:member:`rsb::Factory::createInformer`

  .. note::

     In each of these cases, the modified configuration options will
     only effect the :term:`participant` created by the method call.
