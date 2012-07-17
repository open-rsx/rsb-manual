==========
 Concepts
==========

The Robotics Service Bus (|project|) is a message-oriented,
event-driven middleware aiming at scalable integration of robotics
systems in diverse environments. Being fundamentally a bus
architecture, |project| structures heterogeneous systems of service
providers and consumers using broadcast communication over a hierarchy
of logically unified channels instead of a large number of
point-to-point connections. Nevertheless |project| comes with a
collection of communication patterns and other tools for structuring
communication, but does not require a particular functional or
decomposition style.

|project| is implemented as a flexible, lightweight toolkit. Based on
previous experiences, the design and implementation try to avoid
centralization and complicated dependency structures. Instead,
functionality is organized in layers with minimal, clearly stated
dependencies. The core library merely supplies the abstractions and
machinery for building communication systems subject to varying
requirements. This core is implemented in multiple programming
languages with implementations trying to be in the spirit of the
respective language as much as possible. As a result, |project| is not
tied to a particular network transport, serialization mechanism or
programming language. In addition, much effort is put into systematic
testing and continuous integration.

These conceptual and implementation properties hopefully allow
|project| to scale across a wider range of diverse functional
requirements, heterogeneous hardware platforms and varying reliability
and timing requirements than other robotics middlewares. Additionally,
|project|'s open architecture and project structure and lightweight
implementation enable its use with small entry barriers and little
framework lock-in.


Scope
=====

.. _event:

Event
=====

An event is the basic unit of exchanged data in |project|. Hence, all
information required to fully specify and trace the condition it
represents need to be present in the event. To fulfill these
requirements, our event model consists of the following components:

Payload
    The payload of an event is a user-defined object of the respective
    programming language which contains the major information
    specifying the condition the event represents.

    It can be of an arbitrary domain type which reduces the framework
    lock-in by means of an early transition from framework types to
    domain objects for technical realization.
ID
    A unique ID for each event in an |project|-based system to make events
    addressable and foster traceability.
Meta Data
    Each event is supplemented by meta data.

    It consist of the event sender's ID and several timestamps that

    * specify timing information relevant to the condition represented
      by the event (user-extensible)
    * make the the processing of the event within |project| traceable.

    Besides these framework-supplied items, a key-value store for
    string-based additional meta data items is available for the
    client and user-defined timestamps can be added.
Causal Vector
    This vector allows to represent the causing events of a given
    event, as proposed in [Luckham2001PEI]_.  It facilitates
    automatic system analysis and debugging.
Destination Scope
    Specifies the recipients of the event notification by restricting
    the visibility of event notifications [Muehl2006-DEB]_.

Filter
======

Connector
=========

.. _uri-schema:

URIs
====

.. seealso::

   :ref:`specification-uris`
     Specification for handling of URI in |project|.

URIs or URLs are used in the following situations

* Specifying how to connect to the bus (i.e. specifying a
  :term:`scope` and :term:`transport` configuration)
* Naming a thing on the bus

  * A :term:`channel`

    * Multiple :term:`participants`
    * A single :term:`participant`
  * A :term:`service`

.. _configuration:

Configuration
=============
