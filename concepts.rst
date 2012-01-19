==========
 Concepts
==========

Scope
=====

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

URIs or URLs are used in the following situations

* Specifying how to connect to the bus (i.e. specifying a
  :term:`scope` and :term:`transport` configuration)
* Naming a thing on the bus

  * A :term:`channel`

    * Multiple :term:`participants`
    * A single :term:`participant`
  * A :term:`service`

Generic URIs
------------

Syntax::

  rsb:[PATH][#FRAGMENT]

Components of the URL are interpreted as follows:

* :samp:`{SCHEME}`   -> has to be "rsb"
* :samp:`{PATH}`     -> A :term:`scope` which designates a one of the
                  following things

  * A :term:`channel`
  * A :term:`participant`

    * A :term:`service` (which is-a :term:`participant`)
* :samp:`{FRAGMENT}` ->

  * Not allowed when designating a :term:`channel`
  * ID of a :term:`participant` otherwise

This may resolve to:

* :term:`Service` and/or :term:`Participant`

  * If there is only one of these entities this is enough for
    resolving it
  * If multiple entities reside on the :term:`scope`, a
    single instance can be selected using their UUID::

      rsb:/hierarchical/service/definition/further/to/participant#UniqueIDOfParticipant[UUID]
* Nothing

These generic URIs require a global naming service.

Examples::

  rsb:                                              -> The channel designated by the scope "/"
  rsb:/                                             -> The channel designated by the scope "/"
  rsb:/foo/bar                                      -> The channel designated by the scope "/foo/bar"
  rsb:/foo/bar#10838319-09A4-4D15-BD59-5E054CDB4403 -> The participant with UUID 10838319-09A4-4D15-BD59-5E054CDB4403

Transport-specific URLs
-----------------------

Syntax::

  [SCHEME:][//HOST][:PORT][PATH][?QUERY][#FRAGMENT]
  transport://<location.transport.specific[:PORT]>/hierarchical/service/definition/further/to/participant

Components of the URL are interpreted as follows:

* :samp:`{SCHEME}`   -> :term:`transport` name (e.g spread)
* :samp:`{HOST}`     -> Transport-specific "host" option (e.g. host that runs the daemon for Spread :term:`transport`)
* :samp:`{PORT}`     -> Transport-specific "port" option (e.g. port on which daemon listens for Spread :term:`transport`)
* :samp:`{PATH}`     -> A :term:`scope` which designates one of the following things

  * A :term:`channel`
  * A :term:`participant`

    * A :term:`service` (which is-a :term:`participant`)
* :samp:`{QUERY}`    -> "freestyle" transport-specific options
* :samp:`{FRAGMENT}` ->

  * Not allowed when designating a :term:`channel`
  * ID of a :term:`participant` otherwise

Examples for specifying bus connections when creating participants::

					       -> participate in channel
					       with scope "/" using the
					       default transport
					       configuration
  spread:                                      -> participate in channel
  with scope "/" using the Spread transport with its default
  configuration
  inprocess:                                   -> participate in channel
  with scope "/" using the in-process transport with its default
  configuration
  spread://localhost:5555                      -> participate in channel
  with scope "/" via the Spread daemon running on localhost and
  listening on port 5555
  inprocess://someotherhost                    -> syntactically correct,
  but does not make sense
  spread:/foo/bar                              -> participate in channel
  with scope "/foo/bar" using the default transport configuration
  spread:?maxfragmentsize=10000                -> participate in channel
  with scope "/" using the Spread transport with default host and port
  and a maximum event fragment size of 10000 bytes
  spread:?maxfragmentsize=10000&tcpnodelay=yes -> likewise, but with
  additional tcpnodelay set to "yes" option

.. Implementations
.. ---------------
..
.. =========== ==============================================
.. Language    File(s)
.. =========== ==============================================
.. C++         *not yet implemented*
.. Java        *not yet implemented*
.. Python      *not yet implemented*
.. Common Lisp |repository_versioned|/cl/cl-rsb/src/uris.lisp
.. =========== ==============================================

.. _configuration:

Configuration
=============
