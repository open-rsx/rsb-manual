.. _tutorial-basic:

=====================
 Basic Communication
=====================

The essential form of communication in |project| consists in
:term:`participants <participant>` sending and receiving :term:`events
<event>`. The following sections explain:

* :ref:`Sending events <tutorial-send>` and the :term:`informer`
  :term:`participant`
* :ref:`Receiving events <tutorial-receive>`

  * :ref:`Receiving events synchronously <tutorial-receive-sync>` and
    the :term:`reader` :term:`participant`
  * :ref:`Receiving events asynchronously <tutorial-receive-async>`
    and the :term:`listener` :term:`participant`
* :ref:`tutorial-rpc`

  * :ref:`Calling provided methods <tutorial-rpc-client>` and the
    :term:`remote server` :term:`participant`
  * :ref:`Providing methods <tutorial-rpc-server>` and the
    :term:`local server` :term:`participant`

.. _tutorial-send:

Sending Data
============

To send data in |project|, in the simplest case, an :term:`informer`
has to be created for the desired destination :term:`scope` and the
data then has to be passed to it.

.. container:: sending-data-multi

   .. container:: sending-data-python

      A :py:class:`rsb.Informer` object is created by calling
      :py:func:`rsb.createInformer` with

      * the desired :term:`scope` (which can be specified as :ref:`str
        <typesseq>` object, for example, a string literal)
      * a :term:`data type` (which can be :py:class:`object` to allow
        any kind of data)

      Once the :term:`informer` has been created, data is published by
      calling :py:meth:`rsb.Informer.publishData`.

      .. note::

         The :ref:`context manager protocol <python:typecontextmanager>`
         implementation of |project| takes care of correctly deactivating the
         :term:`informer` at the end of the :keyword:`with`
         statement. In case you are not using a :keyword:`with` statement,
         the :py:class:`rsb.Informer` object has to be deactivated
         using its :py:meth:`rsb.Informer.deactivate` method at the end of use.

      .. literalinclude:: /../rsb-python/examples/informer.py
         :language:        python
         :start-after:     mark-start::body
         :end-before:      mark-end::body
         :emphasize-lines: 10,13
         :linenos:

      :download:`Download this example </../rsb-python/examples/informer.py>`

   .. container:: sending-data-cpp:

      A :cpp:class:`rsb::Informer` object is created by calling
      obtaining the |project| factory via
      :cpp:member:`rsb::Factory::getInstance` and then calling its
      :cpp:member:`rsb::Factory::createInformer` method with

      * the desired :term:`scope` (which can be specified as
        :cpp:class:`std::string` object, for example, a string
        literal)
      * a :term:`data type` (which can be :cpp:class:`rsb::AnyType` to
        allow any kind of data)

      Once the :term:`informer` has been created, data is published by
      calling :cpp:member:`rsb::Informer::publish`.

      .. literalinclude:: /../rsb-cpp/examples/informer/informer.cpp
         :language:        cpp
         :start-after:     mark-start::body
         :end-before:      mark-end::body
         :emphasize-lines: 13,17,18,24,27
         :linenos:

      :download:`Download this example </../rsb-cpp/examples/informer/informer.cpp>`

   .. container:: sending-data-java

      A ``rsb.Informer`` object is created by obtaining the |project|
      factory via ``rsb.Factory.getInstance`` and then calling its
      ``rsb.Factory.createInformer`` method with the desired
      :term:`scope` (which can be specified as a string literal). The
      generic parameter of the ``rsb.Informer`` class determines the
      :term:`data type` of the :term:`informer`.

      The ``rsb.Informer`` has to activated before and deactivated
      after use via the ``rsb.Informer.activate`` and
      ``rsb.Informer.deactivate`` methods.

      Once the :term:`informer` has been created and activated, data
      is published by calling ``rsb.Informer.send``.

      .. literalinclude:: /../rsb-java/examples/InformerExample.java
         :language:        java
         :start-after:     mark-start::body
         :end-before:      mark-end::body
         :emphasize-lines: 12,15,19,23
         :linenos:

      :download:`Download this example </../rsb-java/examples/InformerExample.java>`

   .. container:: sending-data-cl

      The macro ``rsb:with-informer`` can be used to create an
      :term:`informer` for a particular :term:`scope` and :term:`data
      type` (which can be ``cl:t``). The method ``rsb:send`` can then
      be used to send data. ``rsb:with-informer`` takes care of
      destroying the :term:`informer` after use.

      .. literalinclude:: /../rsb-cl/examples/informer.lisp
         :language:    cl
         :start-after: mark-start::with-informer
         :end-before:  mark-end::with-informer
         :linenos:

      Alternatively, ``rsb:make-informer`` can be used to obtain an
      :term:`informer` without automatic destruction:

      .. literalinclude:: /../rsb-cl/examples/informer.lisp
         :language:    cl
         :start-after: mark-start::variable
         :end-before:  mark-end::variable
         :linenos:

      :download:`Download this example </../rsb-cl/examples/informer.lisp>`

.. _tutorial-receive:

Receiving Data
==============

Receiving data can be performed in two different ways in |project|:

:ref:`Synchronous <tutorial-receive-sync>`

  Wait until :term:`events <event>` are received.

:ref:`Asynchronous <tutorial-receive-async>`

  Continue execution and execute a callback function (called
  :term:`handler` in |project|) when :term:`events <event>` are
  received.

The following two sections explain the two ways of receiving data.

.. _tutorial-receive-sync:

Receiving Data Synchronously
----------------------------

To receive data synchronously, a :term:`reader` object has to be
created for the :term:`scope` from which :term:`events <event>` should
be received. Then, individual :term:`events <event>` have to be
retrieved explicitly from the :term:`reader` object, hence synchronous
receiving.

.. container:: receive-data-sync-multi

   .. container:: receive-data-sync-python

      .. note::

         Synchronous receiving of data is not currently implemented in
         Python.

   .. container:: receive-data-sync-cpp

      A :term:`reader` is created by obtaining the |project| factory
      via :cpp:member:`rsb::Factory::getInstance` (line 16) and then
      calling its :cpp:member:`rsb::Factory::createReader` method with
      the desired :term:`scope` (which can be specified as
      :cpp:class:`std::string` object, for example, a string literal,
      line 17).

      Once the :term:`reader` has been created, individual
      :term:`events <event>` are received by calling the
      :cpp:member:`rsb::Reader::read` method (line 21).

      .. literalinclude:: /../rsb-cpp/examples/reader/reader.cpp
         :language:        c++
         :start-after:     mark-start::body
         :end-before:      mark-end::body
         :linenos:
         :emphasize-lines: 16,17,21

      :download:`Download this example </../rsb-cpp/examples/reader/reader.cpp>`

   .. container:: receive-data-sync-java

      .. note::

         Synchronous receiving of data is not currently implemented in
         Java.

   .. container:: receive-data-sync-cl

      The macro ``rsb:with-reader`` can be used to create a
      :term:`reader` for a particular :term:`scope`. The method
      ``rsb:receive`` can then be used to receive individual
      :term:`events <event>` data. ``rsb:with-reader`` takes care of
      destroying the :term:`reader` after use.

      .. literalinclude:: /../rsb-cl/examples/reader.lisp
         :language:    cl
         :start-after: mark-start::with-reader
         :end-before:  mark-end::with-reader
         :linenos:

      Alternatively, ``rsb:make-reader`` can be used to obtain a
      :term:`reader` without automatic destruction:

      .. literalinclude:: /../rsb-cl/examples/reader.lisp
         :language:    cl
         :start-after: mark-start::variable
         :end-before:  mark-end::receive/block
         :linenos:

      :download:`Download this example </../rsb-cl/examples/reader.lisp>`

.. _tutorial-receive-async:

Receiving Data Asynchronously
-----------------------------

To receive data asynchronously, a :term:`listener` object has to be
created for the :term:`scope` from which :term:`events <event>` should
be received. Then, individual :term:`events <event>` are received
automatically and in parallel to the execution of the program. For
each received :term:`event`, a user-supplied callback function (a
:term:`handler` in |project| terminology) is executed to process the
:term:`event`.

.. container:: receive-data-async-multi

   .. container:: receive-data-async-python

      A :py:class:`rsb.Listener` object is created by calling
      :py:func:`rsb.createListener` with the desired :term:`scope`
      (which can be specified as :ref:`str <typesseq>` object, for
      example, a string literal, line 16)

      Once the :term:`listener` has been created, :term:`handlers
      <handler>` can be added by calling
      :py:meth:`rsb.Listener.addHandler` (line 20). Any
      :py:func:`callable` can be used as a :term:`handler`.

      .. note::

         The :ref:`context manager protocol <python:typecontextmanager>`
         implementation of |project| takes care of correctly deactivating the
         :term:`listener` at the end of the :keyword:`with`
         statement. In case you are not using a :keyword:`with` statement,
         the :py:class:`rsb.Listener` object has to be deactivated
         using its :py:meth:`rsb.Listener.deactivate` method at the end of use.

      .. literalinclude:: /../rsb-python/examples/listener.py
         :language:        python
         :start-after:     mark-start::body
         :end-before:      mark-end::body
         :linenos:
         :emphasize-lines: 16,20

      :download:`Download this example </../rsb-python/examples/listener.py>`

   .. container:: receive-data-async-cpp

      A :term:`listener` is created by obtaining the |project| factory
      via :cpp:member:`rsb::Factory::getInstance` (line 19) and then
      calling its :cpp:member:`rsb::Factory::createListener` method
      with the desired :term:`scope` (which can be specified as
      :cpp:class:`std::string` object, for example, a string literal,
      line 27).

      Once the :term:`listener` has been created, individual
      :term:`handlers <handler>` can be added by calling the
      :cpp:member:`rsb::Listener::addHandler` method (line 36). In
      general, :term:`handlers <handler>` are objects which implement
      the :cpp:class:`rsb::Handler` interface. However, there are
      specialized :term:`handlers <handler>` such as
      :cpp:class:`rsb::DataFunctionHandler` which allow using
      different things such as ordinary functions as :term:`handlers
      <handler>`.

      .. literalinclude:: /../rsb-cpp/examples/listener/listener.cpp
         :language:        c++
         :start-after:     mark-start::body
         :end-before:      mark-end::body
         :linenos:
         :emphasize-lines: 19,27,36

      :download:`Download this example </../rsb-cpp/examples/listener/listener.cpp>`

   .. container:: receive-data-async-java

      A ``rsb.Listener`` object is created by obtaining the |project|
      factory via ``rsb.Factory.getInstance`` (line 18) and then
      calling its ``rsb.Factory.createListener`` method with the
      desired :term:`scope` (which can be specified as a string
      literal, line 23).

      The ``rsb.Listener`` has to activated before and deactivated
      after use via the ``rsb.Listener.activate`` (line 24) and
      ``rsb.Listener.deactivate`` (line 37) methods.

      Once the :term:`listener` has been created and activated,
      :term:`handlers <handler>` can be added by calling the
      ``rsb.Listener.addHandler`` method (line 29). Objects
      implementing the ``rsb.Handler`` interface can be used as
      :term:`handlers <handler>`.

      .. literalinclude:: /../rsb-java/examples/EventListenerExample.java
         :language:        java
         :start-after:     mark-start::body
         :end-before:      mark-end::body
         :linenos:
         :emphasize-lines: 18,23,24,29,37

      :download:`Download this example </../rsb-java/examples/EventListenerExample.java>`

   .. container:: receive-data-async-cl

      The macro ``rsb:with-listener`` can be used to create a
      :term:`listener` for a particular :term:`scope`. Inside the
      lexical scope of ``rsb:with-listener`` (or for :term:`listeners
      <listener>` created differently), the macro ``rsb:with-handler``
      can be used to add a :term:`handler` to the
      :term:`listener`. While the body of ``rsb:with-handler``
      executes, :term:`events <event>` are handled by the supplied
      code.

      .. literalinclude:: /../rsb-cl/examples/listener.lisp
         :language:    cl
         :start-after: mark-start::with-listener
         :end-before:  mark-end::with-listener
         :linenos:

      Alternatively, ``rsb:make-listener`` can be used to obtain a
      :term:`listener` without automatic destruction:

      .. literalinclude:: /../rsb-cl/examples/listener.lisp
         :language:    cl
         :start-after: mark-start::variable
         :end-before:  mark-end::variable
         :linenos:

      :download:`Download this example </../rsb-cl/examples/listener.lisp>`

.. _tutorial-rpc:

Remote Procedure Calls
======================

.. seealso::

   :ref:`specification-request-reply`
     For a detailed description of the underlying implementation.

Remote procedure calls (RPCs) execute methods of objects located in
different processes, and potentially different computers, than the
calling entity. Some things are easier to implement using RPCs than
using :term:`events <event>`. However, using RPCs generally makes a
system less flexible and often more error-prone. |project| includes
means for providing and using a simple form of remote procedure calls.

The following two sections describe

* the :ref:`client perspective <tutorial-rpc-client>` (calling remote
  methods)
* and the :ref:`server perspective <tutorial-rpc-server>` (providing
  remote methods).

.. _tutorial-rpc-client:

Client
------

The RPC client calls methods provided by one or more RPC servers. In
|project|, such an RPC client is implemented as a :term:`remote
server` object which is similar to other :term:`participants
<participant>`. Such an object has to be created in order to perform
method calls.

After the :term:`remote server` object has been created, a method can
be called by supplying its name as string and, optionally, the
parameter (there are only one or zero parameters). Methods can be
called in blocking and non-blocking way:

* When called in a **blocking** way, the method call returns only
  after the server has processed the request and returned a result.
* When called in a **non-blocking** way, the method call returns
  immediately and the result can be obtained later, when the server
  completes its processing.

.. important::

   When a non-existent method is called (for example, because the name
   of the method has been misspelled), nothing happens: blocking calls
   block forever and non-blocking calls never provide a result.

   Conversely, if a method is provided by multiple servers, all
   servers process the request but only one reply is returned to the
   caller. It is unspecified, which reply is received by the caller,
   in such a situation.

.. container:: rpc-client-multi

   .. container:: rpc-client-python

      A :py:class:`rsb.patterns.RemoteServer` object is created by
      calling :py:meth:`rsb.Factory.createRemoteServer` with the
      :term:`scope` on which the service is provided (line 12). Remote
      methods can then be called on the
      :py:class:`rsb.patterns.RemoteServer` object as if they were
      ordinary Python methods using the function call syntax
      :samp:`{OBJECT}.{METHOD}({ARGUMENTS})` (see line
      17). Asynchronous calls can be made by using the syntax
      :samp:`{OBJECT}.{METHOD}.async({ARGUMENTS})` (see line 20).

      .. note::

         The :ref:`context manager protocol <python:typecontextmanager>`
         implementation of |project| takes care of correctly deactivating the
         :term:`remote server` at the end of the :keyword:`with`
         statement. In case you are not using a :keyword:`with` statement,
         the :py:class:`rsb.patterns.RemoteServer` object has to be deactivated
         using its :py:meth:`rsb.patterns.RemoteServer.deactivate` method at
         the end of use.

      .. literalinclude:: /../rsb-python/examples/client.py
         :language:        python
         :start-after:     mark-start::body
         :end-before:      mark-end::body
         :emphasize-lines: 12,17,20
         :linenos:

      :download:`Download this example </../rsb-python/examples/client.py>`

   .. container:: rpc-client-cpp

      A :cpp:class:`rsb::patterns::RemoteServer` object is created by
      calling :cpp:member:`rsb::Factory::createRemoteServer` with the
      :term:`scope` on which the service is provided (lines 12 and
      13). Remote methods can then be called using the
      :cpp:member:`rsb::patterns::RemoteServer::call` method (see
      line 21) and the
      :cpp:member:`rsb::patterns::RemoteServer::callAsync` method. The
      expected return type is specified as a template argument to the
      function call while the argument type is derived from the
      supplied argument.

      .. literalinclude:: /../rsb-cpp/examples/server/client.cpp
         :language:        c++
         :start-after:     mark-start::body
         :end-before:      mark-end::body
         :emphasize-lines: 12,13,21
         :linenos:

      :download:`Download this example </../rsb-cpp/examples/server/client.cpp>`

   .. container:: rpc-client-java

      A ``rsb.patterns.RemoteServer`` object is created by calling
      ``rsb.Factory.createRemoteServer`` with the :term:`scope` on
      which the service is provided (line 16). Remote methods can then
      be called using the ``rsb.patterns.RemoteServer.call`` method
      (see line 21) and the ``rsb.patterns.RemoteServer.callAsync``
      method.

      .. literalinclude:: /../rsb-java/examples/ClientExample.java
         :language:        java
         :start-after:     mark-start::body
         :end-before:      mark-end::body
         :emphasize-lines: 16,21
         :linenos:

      :download:`Download this example </../rsb-java/examples/ClientExample.java>`

   .. container:: rpc-client-cl

      A :term:`remote server` can be created and managed with the
      ``rsb.patterns:with-remote-server`` macro. The
      ``rsb.patterns:call`` method can be used on the :term:`remote
      server` object to call remote methods. The method name and the
      argument of the call have to be passed as the second and third
      argument respectively.

      .. literalinclude:: /../rsb-cl/examples/client.lisp
         :language:    cl
         :start-after: mark-start::with-remote-server
         :end-before:  mark-end::with-remote-server
         :linenos:

      Alternatively, ``rsb:make-remote-server`` can be used to obtain
      a :term:`remote server` without automatic destruction:

      .. literalinclude:: /../rsb-cl/examples/client.lisp
         :language:    cl
         :start-after: mark-start::variable
         :end-before:  mark-end::variable
         :linenos:

      :download:`Download this example </../rsb-cl/examples/client.lisp>`

.. _tutorial-rpc-server:

Server
------

Methods which are callable via RPC are provided by :term:`local
server` objects which are similar to other :term:`participants
<participant>`. To provide such methods a :term:`local server` object
has be created.

After the :term:`local server` object has been created, methods have
to be registered, supplying the desired method name as a string and a
callback function which implements the desired behavior of the method.

.. container:: rpc-server-multi

   .. container:: rpc-server-python

      A :py:class:`rsb.patterns.LocalServer` object is created by
      calling :py:meth:`rsb.Factory.createLocalServer` with the
      :term:`scope` on which the service is provided (line
      12). Methods with their request and reply :term:`data types
      <data type>` and the :py:func:`callable` s implementing their
      behavior are registered using the
      :py:meth:`rsb.patterns.LocalServer.addMethod` method (line 21).

      .. note::

         The :ref:`context manager protocol <python:typecontextmanager>`
         implementation of |project| takes care of correctly deactivating the
         :term:`local server` at the end of the :keyword:`with`
         statement. In case you are not using a :keyword:`with` statement,
         the :py:class:`rsb.patterns.LocalServer` object has to be deactivated
         using its :py:meth:`rsb.patterns.LocalServer.deactivate` method at
         the end of use.

      .. literalinclude:: /../rsb-python/examples/server.py
         :language:        python
         :start-after:     mark-start::body
         :end-before:      mark-end::body
         :emphasize-lines: 12,17-18,21
         :linenos:

      :download:`Download this example </../rsb-python/examples/server.py>`

   .. container:: rpc-server-cpp

      A :cpp:class:`rsb::patterns::Server` object is created by
      calling :cpp:member:`rsb::Factory::createServer` with the
      :term:`scope` on which the server should provide its service
      (line 20). Methods and the callback objects implementing their
      behavior can be registered using the
      :cpp:member:`rsb::patterns::LocalServer::registerMethod` method
      (see line 23). Callback classes are derived from
      :cpp:class:`rsb::patterns::Server::Callback` (with template
      arguments specifying the request and reply :term:`data types
      <data type>`) and override the
      :cpp:member:`rsb::patterns::Server::Callback::call` method (see
      lines 8 to 14).

      .. literalinclude:: /../rsb-cpp/examples/server/server.cpp
         :language:    c++
         :start-after:     mark-start::body
         :end-before:      mark-end::body
         :emphasize-lines: 8-14,20,23
         :linenos:

      :download:`Download this example </../rsb-cpp/examples/server/server.cpp>`

   .. container:: rpc-server-java

      A ``rsb.patterns.LocalServer`` object is created by calling
      ``rsb.Factory.createLocalServer`` with the :term:`scope` on
      which server should provide its service (line 22). Methods are
      registered by calling the ``rsb.patterns.LocalServer.addMethod``
      method (see line 26) with a suitable callback object. The
      callback class supplies the behavior of server methods by
      overriding the ``rsb.patterns.EventCallback.invoke`` method (see
      lines 9 to 17).

      .. literalinclude:: /../rsb-java/examples/ServerExample.java
         :language:    java
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :emphasize-lines: 22,26,9-17
         :linenos:

      :download:`Download this example </../rsb-java/examples/ServerExample.java>`

   .. container:: rpc-server-cl

      A :term:`local server` can be created and managed with the
      ``rsb.patterns:with-local-server`` macro. The
      ``rsb.patterns:with-methods`` macro can be used to register
      methods and their implementations in the :term:`local server`.

      .. literalinclude:: /../rsb-cl/examples/server.lisp
         :language:    cl
         :start-after: mark-start::with-local-server
         :end-before:  mark-end::with-local-server
         :linenos:

      Alternatively, ``rsb.patterns:make-local-server`` can be used to
      obtain a :term:`local server` without automatic
      destruction. Similarly, methods can be added without the
      ``rsb.patterns:with-methods`` macro:

      .. literalinclude:: /../rsb-cl/examples/server.lisp
         :language:    cl
         :start-after: mark-start::variable
         :end-before:  mark-end::variable
         :linenos:

      :download:`Download this example </../rsb-cl/examples/server.lisp>`
