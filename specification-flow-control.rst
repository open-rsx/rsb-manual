.. _specification-flow-control:

==============
 Flow Control
==============

Overview
========

In the context of |project|, refers to controlling flows of
:term:`events <event>` between :term:`participants <participant>`
according to certain criteria. Examples of exerting control include
queuing or dropping :term:`events <event>` or slowing down
:term:`sources <source>`. Examples of flow control criteria include
congestion on the :term:`transport` layer, computational load in
:term:`sinks <sink>` or metrics on :term:`event` queues.

.. digraph:: flow

   node [shape=rectangle];

   subgraph cluster_source {
     label="source";

     source_queue [label="queue"];
   }

   subgraph cluster_sink_1 {
     label="sink 1";

     sink_1_queue [label="queue"];
   }

   subgraph cluster_sink_2 {
     label="sink 2";

     sink_2_queue [label="queue"];
   }

   inflight [label="in-flight"];

   source_queue -> inflight;
   inflight -> sink_1_queue;
   inflight -> sink_2_queue;


The :term:`flow control` communication pattern consists of two roles:

``Source``

  TODO

``Sink``

  TODO

.. _specification-flow-control-conditions:

Conditions
==========

This section lists conditions which can occur in a
:term:`flow-controlled <flow control>` configuration of :term:`sink`
and :term:`source` :term:`participants <participant>`.

source-high-watermark

  :term:`Event <event>`-queue in :term:`source` has reached high
  watermark. That is, the number of queued :term:`events <event>` has
  risen above a threshold corresponding to the queue being "almost
  full".

  This happens when client code submits :term:`events <event>` faster
  than the TODO :term:`transport` layer can process them.

source-low-watermark

  :term:`Event <event>`-queue in :term:`source` has reached low
  watermark. That is, the number of queued :term:`events <event>` has
  fallen below a threshold corresponding to the queue being "almost
  empty".

  TODO is this problematic?

  Corresponds to recovery from source-high-watermark condition.

sink-high-watermark

  :term:`Event <event>`-queue in :term:`sink` has reached low
  watermark. That is, the number of queued :term:`events <event>` has
  risen above a threshold corresponding to the queue being "almost
  full".

  This happens when client code processes :term:`events <event>`
  slower than the TODO :term:`transport` layer delivers them.

sink-low-watermark

  :term:`Event <event>`-queue in :term:`sink` has reached low
  watermark. That is, the number of queued :term:`events <event>` has
  fallen below a threshold corresponding to the queue being "almost
  empty".

  TODO is this problematic?

  Corresponds to recovery from sink-high-watermark condition.

.. _specification-flow-control-policies:

Policies
========

This section lists policies which can be used in response to the
sink-high-watermark condition :ref:`mentioned above
<specification-flow-control-conditions>`.

suspend :term:`source`

  Suspend the :term:`source` until **all** :term:`sinks <sink>` have
  caught up.

drop :term:`events <event>` in :term:`source`

  Drop :term:`events <event>` in the :term:`source`
  :term:`participant` until **all** :term:`sinks <sink>` have caught
  up.

drop :term:`events <event>` in :term:`sink`

  Drop :term:`events <event>` in **one** :term:`sink` until **it** has
  caught up.

Protocol
========

TODO make a |-replacement

:ref:`Reserved <specification-scope-reserved>` :term:`scope`
``/__rsb/dataflow``

Implementations
===============

=========== ========================================================
Language    File(s)
=========== ========================================================
C++         *not implemented yet*
Java        *not implemented yet*
Python      *not implemented yet*
Common Lisp |repository_versioned_cl| at ``src/patterns/data-flow/``
=========== ========================================================
