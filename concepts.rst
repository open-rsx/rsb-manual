==========
 Concepts
==========

.. seealso::

   [Wienke2011-AMC]_
     For a concise introduction to the basic concepts of |project| in
     publication form

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

.. _event:

Event
=====

.. seealso::

   :ref:`specification-event`
     Detailed technical specification of :term:`events <event>`

An :term:`event` is the basic unit of exchanged data in
|project|. Hence, all information required to fully specify and trace
the condition it represents need to be present in the
:term:`event`. To fulfill these requirements, our :term:`event` model
consists of the following components:

Payload

  The payload of an :term:`event` is a user-defined object of the
  respective programming language which contains the major information
  specifying the condition the :term:`event` represents.

  It can be of an arbitrary domain type which reduces the framework
  lock-in by means of an early transition from framework types to
  domain objects for technical realization.

ID

  A unique ID for each :term:`event` in an |project|-based system to
  make :term:`events <event>` addressable and foster traceability.

Meta Data

  Each :term:`event` is supplemented by meta data.

  It consist of the :term:`event` the ID of the sending
  :term:`participant` and several timestamps that

  * specify timing information relevant to the condition represented
    by the :term:`event` (user-extensible).

  * make the the processing of the :term:`event` within |project|
    traceable.

  Besides these framework-supplied items, a key-value store for
  string-based additional meta data items is available for the
  client and user-defined timestamps can be added.

Causal Vector

  This vector allows to represent the causing :term:`events <event>`
  of a given :term:`event`, as proposed in [Luckham2001PEI]_.  It
  facilitates automatic system analysis and debugging.

Destination :term:`Scope`

  Specifies the recipients of the event notification by restricting
  the visibility of :term:`event` notifications [Muehl2006-DEB]_.

  The next section explains this concept in greater detail.

.. _scope:

Scope
=====

.. seealso::

   :ref:`specification-scope`
     Detailed technical specification of :term:`scopes <scope>`

|project| forms a logically unified bus across different
:term:`transport` mechanisms. Different :term:`participants
<participant>` connect to this bus.  :term:`Informers <informer>` send
:term:`events <event>`, whereas :term:`listeners <listener>` receive
:term:`events <event>`. From a logical perspective, no point-to-point
connections are established.

In order to structure the communication via the bus – or stated
differently, restrict the visibility of :term:`events <event>` for
:term:`participants <participant>` – |project| utilizes a hierarchical
channelization scheme. This scheme is best explained by its
declarative representation as a :term:`scope`, which is represented in
|project| with a hierarchical notation compatible with the path
component of URIs [RFC2396-URI]_.  E.g. sending an :term:`event` with
destination :term:`scope` ``/robot/camera/left/`` will make this
:term:`event` visible in the :term:`channels <channel>` represented by
:term:`scopes <scope>` ``/robot/camera/left/``, ``/robot/camera/``,
``/robot/``, and ``/``. Consequently, ``/`` represents a
:term:`channel` where all :term:`events <event>` of the system are
visible. Each :term:`participant` is associated to one
:term:`channel`, but multiple :term:`participants <participant>` can
participate in the same :term:`channel` (m : n semantics).

The chosen hierarchical :term:`channel` layout provides benefits for
logging purposes and provides a first-class means of the framework to
structure the data space, e.g. with :term:`subscopes <subscope>` for
different services. However, it also increases the chance that a
:term:`listener` receives unexpected data, because a new
:term:`informer` appeared on a :term:`subscope` of the
:term:`listener’s <listener>` :term:`scope`. |project|’s
:term:`filter` mechanism allows clients to efficiently specify which
:term:`events <event>` they want to receive.

.. _filter:

Filter
======

TODO

.. _types:

Types
=====

|project| is concerned with two kinds of types:

* :term:`wire schemas <wire schema>` which describe data being
  exchanged through :term:`transport mechanisms <transport mechanism>`

* :term:`data types <data type>` which are restricted to individual
  clients, depend on the respective programming languages and describe
  domain objects before they get passed to |project| or after they
  have been obtained from |project|

Mapping between Wire Schema and Programming Language Types
----------------------------------------------------------

This section documents the mapping between :term:`wire schemas <wire
schema>`, designators of which are included in |project|
:term:`notifications <notification>`, and corresponding programming
language types. The values that are actually contained in
:term:`notifications <notification>` are called "String Designators"
of :term:`wire schemas <wire schema>` here.

Fundamental Types

  ======================= ================== =============== ============= ============== =========================================
  Wire Schema             String Designator  C++             Python        Java           Common Lisp
  ======================= ================== =============== ============= ============== =========================================
  No value                ``"void"``         ``void``        ``None``      ``null``       ``nil``
  Double precision float  ``"double"``       ``double``                    ``double``     ``double-float``
  Single precision float  ``"float"``        ``float``       ``float``     ``float``      ``single-float``
  32 bit signed integer   ``"int32"``        ``int32``                     ``int``        ``(signed-byte 32)``
  64 bit signed integer   ``"int64"``        ``int64``                     ``long``       ``(signed-byte 64)``
  32 bit unsigned integer ``"uint32"``       ``uint32``                    ``int``        ``(unsigned-byte 32)``
  64 bit unsigned integer ``"uint64"``       ``uint64``                    ``long``       ``(unsigned-byte 64)``
  bool                    ``"bool"``         ``bool``        ``bool``      ``boolean``    ``boolean``
  ASCII string            ``"ascii-string"`` ``std::string`` ``str``       ``String``     ``string``
  UTF-8 string            ``"utf-8-string"`` ``std::string`` ``unicode``   ``String``     ``string``
  Sequence of Bytes       ``"bytes"``        ``std::string``               ``ByteString`` ``(simple-array (unsigned-byte 8)  (*))``
  :term:`Scope`           ``"scope"``        ``rsb::Scope``  ``rsb.scope`` ``rsb.Scopes`` ``rsb:scope``
  ======================= ================== =============== ============= ============== =========================================

  .. note::

     This mapping is based on `the type mapping used by Google's
     protocol buffers
     <http://code.google.com/apis/protocolbuffers/docs/proto.html#scalar>`_.

  .. note::

     In C++, support for the ASCII string and UTF-8 string schemas is
     limited in the following ways:

     * When decoding data in either schema, invalid strings will be
       accepted without signaling an error.

     * In both schemas, string values are represented as
       ``std::string`` objects which know nothing about the respective
       encodings.

       * In particular, UTF-8 multi-byte sequences appear as multiple
         ``char`` s.

Structured Data

  TODO

Connector
=========

.. _uri-schema:

URIs
====

.. seealso::

   :ref:`specification-uris`
     Specification for handling of URIs in |project|.

URIs or URLs are used in the following situations

* Specifying how to connect to the bus (i.e. specifying a
  :term:`scope` and :term:`transport` configuration)

* Naming a thing on the bus

  * A :term:`channel`

    * Multiple :term:`participants <participant>`
    * A single :term:`participant`

.. _configuration:

Configuration
=============

.. seealso::

   :ref:`specification-config`
     Specification for the configuration of |project|.

Quality of Service
==================

For :term:`listeners <listener>`, any guarantee applies to the stream
of :term:`events <event>` received from the bus (not to the entire
processing of a given :term:`event`). In particular, it is possibly
that the effective guarantees are weaker than those specified for the
:term:`listener` (if the :term:`informer` has weaker guarantees than
the :term:`listener`).

For :term:`informer`, any guarantee applies to the submitting of
:term:`events <event>` to the bus. Guarantees at the receiving end may
effectively be weakened depending on the :term:`listener`
configuration.

.. note::

   In the following lists of guarantees, subsequent items include all
   guarantees given by preceding items.

Ordering
--------

Unordered

  :term:`Events <event>` are delivered in (potentially) arbitrary
  order.

Ordered

  Every :term:`listener` receives the :term:`events <event>` of one
  :term:`informer` in the order the :term:`informer` sent the
  :term:`events <event>`. No guarantees are given for :term:`events
  <event>` of multiple :term:`informers <informer>`.

Independently of the requested ordering, no relations are guaranteed
between :term:`events <event>` arriving at distinct :term:`listeners
<listener>`.

Reliability
-----------

Unreliable

  :term:`Events <event>` may be dropped and not be visible to a
  :term:`listener`.

Reliable

  :term:`Events <event>` are guaranteed to be delivered. An error is
  signaled when :term:`events <event>` cannot be delivered.

Threading
=========

:term:`Informers <informer>` are thread-safe.

:term:`Listener` are thread-safe. This implies:

* Adding/Removing :term:`filters <filter>` from arbitrary threads is
  allowed, but does not affect already registered :term:`handlers
  <handler>`.

  The changed :term:`filters <filter>` will be applied at some point
  in time, which may be much later than the method call.

* Adding/Removing :term:`handlers <handler>` from arbitrary threads is
  possible.

  Existing :term:`handlers <handler>` will not notice any effect with
  respect to the stream of incoming :term:`events <event>`.

  For the added/removed :term:`handler`, there is no guarantee that it
  will be called immediately / will not be called anymore when the
  add/remove method call returns. However, a flag can be set to
  achieve these guarantees.
