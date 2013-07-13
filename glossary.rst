.. _glossary:

==========
 Glossary
==========

.. glossary::

   causal vector

     A list of references to :term:`events <event>` (via their
     :term:`event ids <event id>`) which caused a given :term:`event`.

     See :ref:`event` for more.

   channel

     A communication domain :term:`participants <participant>` of
     which exchange :term:`events <event>` in a broadcast
     communication style. :term:`Channels <channel>` form a tree with
     respect to set-inclusion relations of their respective sets of
     :term:`participants <participant>`. :term:`Channels <channel>`
     are designated by :term:`scopes <scope>`.

   connector

     Implementation of one function, e.g. sending of
     :term:`notifications <notification>`, for a particular
     :term:`transport`.

   converter

     Mechanism that transforms :term:`event payloads <payload>` into
     data of a particular :term:`wire type` and vice-versa.

     See :term:`domain->wire converter` and :term:`wire->domain
     converter`.

   data type

     The type (programming language dependent) of :term:`event
     payload`.

     Example(C++,protocol buffers,spread): ``IplImage*`` for the example
     above

   domain->wire converter

     Mechanism that transforms :term:`event payloads <payload>` into
     data of the :term:`wire type` that has an interpretation
     w.r.t. the :term:`wire schema`. Uniquely identified by the triple

     1. domain type
     2. :term:`wire type`
     3. :term:`wire schema`

     Example(C++,protocol buffers,spread): ``AbstractConverter<std::string>?``

     See :ref:`types` for a list of well-known :term:`wire schema` <->
     :term:`data type` mappings.

   event

     For events in |project|, see :ref:`event`.

     See [Luckham2001PEI]_ for a general treatment.

   event id

     Unique identifier of an :ref:`event`.

     See :ref:`event` for more.

   filter

     A mechanism for selecting :term:`events <event>` which comply to
     some criterion from a set of :term:`events <event>`.

   informer

     A kind of :term:`participant` which publishes :term:`events
     <event>`.

   inprocess

     A kind of :term:`transport`, which delivers :term:`events
     <event>` within one process (i.e. no inter-process or network
     communication).

     See :ref:`specification-inprocess`.

   handler

     A piece of client code attached to a :term:`listener` which is
     called by |project| to process received :term:`events <event>`.

   homebrew

      A package manager simplifying the configuration, compilation and
      installation process for Unixoid software packages on
      MacOS X. Further information is available at:
      http://mxcl.github.com/homebrew/

   listener

     A kind of :term:`participant` which *asynchronously* receives
     :term:`events <event>`.

     See also :term:`reader`.

   local server

     A kind of :term:`participant` which provides methods that can be
     called by other :term:`participants <participant>`.

     See also :term:`remote server`.

   meta-data
   event meta-data

     In the context of |project|, meta-data refers pieces of data
     attached to :term:`events <event>` in addition to the
     :term:`payload`.

     See :ref:`specification-event-timestamps`,
     :ref:`specification-event-user-meta-data`,
     :ref:`specification-event-cause-vector`.

   method field

     A data field in |project| :term:`events <event>` which specifies
     the role of a given :term:`event` within a communication
     pattern. For example, the :ref:`request/reply communication
     pattern <specification-request-reply>` uses the values
     ``"REQUEST"`` and ``"REPLY"``.

     See :ref:`specification-event-method` for more.

   notification

     :term:`transport` -specific message that contains

     * :term:`event` meta-data
     * :term:`wire schema`
     * (wire type, wire schema) representation of payload Note: does not
       contain domain type of event payload

   participant

     Any entity that communicates via the bus is called a
     participant. Typical participants are :term:`listeners
     <listener>` which receive :term:`events <event>` and
     :term:`informers <informer>` which publish :term:`events
     <event>`.

   payload
   event payload

     Domain object (programming language dependent) that is associated
     with an :term:`event`.

     Example(C++,protocol buffers,spread): an object of type ``IplImage*``

   plugin

     A particular extension of |project|'s functionality, such as a
     :term:`transport` implementation or a :term:`converter`, packaged
     as runtime-loadable code.

     See :ref:`specification-plugin`.

   reader

     A kind of :term:`participant` which *synchronously* receives
     :term:`events <event>`.

     See also :term:`listener`.

   remote server

     A kind of :term:`participant` which is able to call methods
     provided by :term:`local servers <local server>`.

     See also :term:`local server`.

   scope

     Descriptor for a :term:`channel` of the unified bus. The
     :term:`channel` is itself hierarchical, hence the scope also
     reflects this structure.

     See :ref:`specification-scope`.

   sequence number

     A positive integer associated to each :term:`event` which
     indicates the order of all :term:`events <event>` published by a
     particular :term:`informer`.

     See :ref:`specification-sequence-number`.

   Spread

     The `Spread`_ group communication framework is one the
     :term:`transports <transport>` |project| can use. It is available
     as a :term:`plugin`.

   Spread daemon

     A network server used by :term:`Spread` to coordinate
     communication of clients and exchange data. Usually installed
     under the name :file:`{PREFIX}/sbin/spread`.

   subscope

     A given :term:`scope` has a potentially infinite number
     subscopes. All :term:`events <event>` visible in a subscope of a
     :term:`scope` are visible in the :term:`scope` itself.

     For example, ``/a/b`` is a subscope of the :term:`scope` ``/a``.

     See :term:`superscope`, :ref:`specification-scope`.

   superscope

     A given :term:`scope` has zero or more proper superscopes. Each
     superscope has the property that all :term:`events <event>`
     visible in the original :term:`scope` are also visible in the
     superscope.

     For example, ``/`` is a superscope of all :term:`scopes <scope>`
     and proper superscope of all :term:`scopes <scope>` except ``/``
     itself. ``/a/b`` is a proper superscope of ``/a/b/c``,
     ``/a/b/d``, ``/a/b/c/d``, etc but not ``/a`` or ``/a/c``.

     See :term:`subscope`, :ref:`specification-scope`.

   transport
   transport mechanism

     Mechanism for transporting :term:`notifications <notification>`
     from their origin to their destinations. Most transports
     correspond to a network protocol.

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
