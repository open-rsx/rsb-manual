Concepts
********

Scope
=====

Event
=====

An event is the basic unit of exchanged data in RSB. Hence, all
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
    A unique ID for each event in an RSB-based system to make events
    addressable and foster traceability.
Meta Data
    Each event is supplemented by meta data.

    It consist of the event sender's ID and several timestamps that

    * specify timing information relevant to the condition represented
      by the event (user-extensible)
    * make the the processing of the event within RSB traceable.

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
