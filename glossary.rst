.. _glossary:

==========
 Glossary
==========

.. glossary::

   event

     See :ref:`event`.

   event payload

     Domain object (programming language dependent) that is associated
     with an event.

     Example(C++,protocol buffers,spread): an object of type ``IplImage*``

   data type

     the type (programming language dependent) of event payload.

     Example(C++,protocol buffers,spread): ``IplImage*`` for the example
     above

   wire type

     Container type (programming language dependent?) of serialized
     representation of event payload (specific for a port type)

     Examples

     * C++,protocol buffers,spread: unsigned char*
     * Java,xmpp: XMPP message as DOM tree

   wire schema

     Layout/structure of serialized representation of event payload

     Example(C++,protocol buffers,spread): specified by ``ImageMessage``
     protocol buffer descriptor

   domain->wire converter

     Mechanism that transforms event payloads into data of the wire type
     that has an interpretation w.r.t. the wire schema. Uniquely
     identified by the triple

     1. domain type
     2. wire type
     3. wire schema

     Example(C++,protocol buffers,spread): ``AbstractConverter<std::string>?``

     See :ref:`type` s for a list of well-known wire schema <-> data
     type mappings.

   wire->domain converter

     Similar

   notification

     :term:`transport` -specific message that contains

     * event meta-data
     * wire schema
     * (wire type, wire schema) representation of payload Note: does not
       contain domain type of event payload

   participant

     Any entity that communicates via the bus is called a
     participant. Typical participants are :term:`listener` s which receive
     :term:`event` s and :term:`informer` s which publish
     :term:`event` s.

   listener

     A kind of :term:`participant` which (asynchronously) receives
     :term:`event` s.

   informer

     A kind of :term:`participant` which publishes :term:`event` s.

   scope

     Descriptor for a channel of the unified bus. The channel is itself
     hierarchical, hence the scope also reflects this structure. There is
     a string-based notation for scopes: ``/parent/sub/subsubscope/``. A
     scope is valid if it matches the given regular expression:
     ``/([a-zA-Z0-9]+/)*``

   channel

     A communication domain participants of which exchange events in a
     broadcast communication style. Channels form a tree with respect
     to set-inclusion relations of their respective sets of
     participants. Channels are designated by scopes.

   transport

     TODO

   Spread

     The `Spread`_ group communication framework is one the
     :term:`transport` s |project| can use.

   Spread daemon

     A network server used by :term:`Spread` to coordinate
     communication of clients and exchange data. Usually installed
     under the name :samp:`{PREFIX}/sbin/spread`.
