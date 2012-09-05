.. _glossary:

==========
 Glossary
==========

.. glossary::

   causal vector

     A list of references to :term:`event` s (via their :term:`event
     id` s) which caused a given :term:`event`.

     See :ref:`event` for more.

   channel

     A communication domain :term:`participant` s of which exchange
     events in a broadcast communication style. :term:`Channel` s form
     a tree with respect to set-inclusion relations of their
     respective sets of :term:`participant` s. :term:`Channel` s are
     designated by :term:`scope` s.

   connector

     Implementation of one function, e.g. sending of
     :term:`notification` s, for a particular :term:`transport`.

   converter

     Mechanism that transforms :term:`event payload` s into data of
     a particular :term:`wire type` and vice-versa.

     See :term:`domain->wire converter` and :term:`wire->domain
     converter`.

   data type

     The type (programming language dependent) of :term:`event
     payload`.

     Example(C++,protocol buffers,spread): ``IplImage*`` for the example
     above

   domain->wire converter

     Mechanism that transforms :term:`event payload` s into data of
     the wire type that has an interpretation w.r.t. the :term:`wire
     schema`. Uniquely identified by the triple

     1. domain type
     2. wire type
     3. wire schema

     Example(C++,protocol buffers,spread): ``AbstractConverter<std::string>?``

     See :ref:`types` for a list of well-known :term:`wire schema` <->
     data type mappings.

   event

     For events in |project|, see :ref:`event`.

     See [Luckham2001PEI]_ for a general treatment.

   event id

     Unique identifier of an :ref:`event`.

     See :ref:`event` for more.

   filter

     A mechanism for selecting :term:`event` s which comply to some
     criterion from a set of :term:`event` s.

   informer

     A kind of :term:`participant` which publishes :term:`event` s.

   handler

     A piece of client code attached to a :term:`listener` which is
     called by |project| to process received :term:`event` s.

   listener

     A kind of :term:`participant` which (asynchronously) receives
     :term:`event` s.

   method field

     A data field in |project| :term:`event` s which specifies the
     role of a given :term:`event` within a communication pattern. For
     example, the :ref:`request/reply communication pattern
     <specification-request-reply>` uses the values ``REQUEST`` and
     ``REPLY``.

     See :ref:`event` for more.

   notification

     :term:`transport` -specific message that contains

     * :term:`event` meta-data
     * :term:`wire schema`
     * (wire type, wire schema) representation of payload Note: does not
       contain domain type of event payload

   participant

     Any entity that communicates via the bus is called a
     participant. Typical participants are :term:`listener` s which receive
     :term:`event` s and :term:`informer` s which publish
     :term:`event` s.

   payload
   event payload

     Domain object (programming language dependent) that is associated
     with an :term:`event`.

     Example(C++,protocol buffers,spread): an object of type ``IplImage*``

   scope

     Descriptor for a :term:`channel` of the unified bus. The
     :term:`channel` is itself hierarchical, hence the scope also
     reflects this structure. There is a string-based notation for
     scopes: ``/parent/sub/subsubscope/``. A scope is valid if it
     matches the given regular expression: :regexp:`/([a-zA-Z0-9]+/)*`

   service

     TODO

   sequence number

     A positive integer associated to each :term:`event` which
     indicates the order of all :term:`event` s published by a
     particular :term:`informer`.

     See :ref:`specification-sequence-number`.

   Spread

     The `Spread`_ group communication framework is one the
     :term:`transport` s |project| can use.

   Spread daemon

     A network server used by :term:`Spread` to coordinate
     communication of clients and exchange data. Usually installed
     under the name :samp:`{PREFIX}/sbin/spread`.

   transport
   transport mechanism

     Mechanism for transporting :term:`notification` s from their
     origin to their destinations. Most transports correspond to a
     network protocol.

     See :ref:`specification-transports`.

   wire schema

     Layout/structure of serialized representation of :term:`event
     payload`.

     Example(C++,protocol buffers,spread): specified by
     ``ImageMessage`` protocol buffer descriptor

   wire type

     Container type (programming language dependent?) of serialized
     representation of :term:`event payload` (specific for a port
     type).

     Examples

     * C++,protocol buffers,spread: unsigned char*
     * Java,xmpp: XMPP message as DOM tree

   wire->domain converter

     See :term:`domain->wire converter`.
