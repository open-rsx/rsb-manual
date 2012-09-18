.. _inter-transport-communication:

===============================
 Inter-transport Communication
===============================

Inter-:term:`transport` communication becomes necessary, when
:term:`participants <participant>` want to communicate that are
connected to the unified bus using different :term:`transport`
mechanisms.

.. note::

   This description assumes that you have the :term:`Spread` :term:`transport`
   enabled and the TCP-based transport disabled. You can achieve this e.g.
   by changing your global configuration file to:

   .. code-block:: ini

      [transport.spread]
      enabled = 1
      [transport.socket]
      enabled = 0

   Without this configuration the TCP-based transport would be used instead
   of :term:`Spread` but all other remarks would still be valid.

Inter-Transport Setup
=====================

.. digraph:: interTransport

   resolution=60

   subgraph clusterInprocessAndSpread {
     label="inprocess-and-spread : Process"

     l1 [label="Listener", shape=box, style=filled, fillcolor="#c0ffc0"]
     sic1 [label="Spread In Connector", shape=octagon, style=filled, fillcolor="#ffc0c0"]
     iic1 [label="Inprocess In Connector", shape=octagon, style=filled, fillcolor="#ffc0c0"]

     sic1 -> l1
     iic1 -> l1

     i1 [label="Informer", shape=box, style=filled, fillcolor="#c0ffc0"]
     soc1 [label="Spread Out Connector", shape=octagon, style=filled, fillcolor="#ffc0c0"]
     ioc1 [label="Inprocess Out Connector", shape=octagon, style=filled, fillcolor="#ffc0c0"]

     i1 -> soc1
     i1 -> ioc1

     ib [label="Inprocess Bus", shape=ellipse, style=filled, fillcolor="#c0c0ff"]

     ib -> iic1
     ioc1 -> ib
   }

   subgraph clusterSpreadOnly {
     label="spread-only : Process"

     l2 [label="Listener", shape=box, style=filled, fillcolor="#c0ffc0"]
     sic2 [label="Spread In Connector", shape=octagon, style=filled, fillcolor="#ffc0c0"]

     sic2 -> l2
   }

   sb [label="Spread Bus", shape=ellipse, style=filled, fillcolor="#c0c0ff"]

   sb -> sic1
   soc1 -> sb
   sb -> sic2

This page describes how to setup :term:`participants <participant>` for
inter-:term:`transport` communication using following scenario which
is illustrated in the above figure:

:term:`Participants <participant>` reside in two separate processes

* One process is an instance of the program
  :program:`inprocess-and-spread` (source:
  :download:`inprocess-and-spread.cpp
  </../rsb-cpp/examples/inter_transport/inprocessAndSpread.cpp>`)

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
  :program:`spread-only` (source: :download:`spread-only.cpp
  </../rsb-cpp/examples/inter_transport/spreadOnly.cpp>`)

  * There is one :term:`listener` in the process. It has a single
    :term:`connector` for the :term:`Spread` :term:`transport`.

.. note::

   With this setup, the :term:`listener` in the :program:`inprocess-and-spread`
   process will currently receive all events twice.

There are two ways to attach multiple :term:`transports <transport>` to
:term:`participants <participant>`:

#. Via :ref:`configuration options <configuration>` (config file,
   environment variables, etc.)
#. Programmatically

These two alternatives are described below.

Via Configuration Options
-------------------------

When configured via the configuration mechanism, the
multi-:term:`transport` setup will have a global effect in the
following sense: it will affect all :term:`participants <participant>` in all
processes which are not explicitly instantiated with a different set
of :term:`connectors <connector>`.

In addition to the :term:`Spread` :term:`transport` which is
(currently) enabled by default, other :term:`transports <transport>` can be
enabled globally using a configuration file fragment like this:

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

  The example programs :download:`inprocess-and-spread.cpp
  </../rsb-cpp/examples/inter_transport/inprocessAndSpread.cpp>` and
  :download:`spread-only.cpp
  </../rsb-cpp/examples/inter_transport/spreadOnly.cpp>` implement the
  inter-:term:`transport` setup described above by modifying the
  default :term:`participant` configuration in the
  :program:`inprocess-and-spread` process to include the
  :term:`inprocess` :term:`transport`.

Locally for a Participant

  In order to use a prepared :cpp:class:`rsb::ParticipantConfig`
  object only locally instead of installing it as a global default, it
  can be passed to the following methods:

  * :cpp:member:`rsb::Factory::createReader`
  * :cpp:member:`rsb::Factory::createListener`
  * :cpp:member:`rsb::Factory::createInformer`

  .. note::

     In each of these cases, the modified configuration options will
     only effect the :term:`participant` created by the method call.
