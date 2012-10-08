.. _tutorial-basic:

=====================
 Basic Communication
=====================

The essential form of communication in |project| consists in sending
and receiving :term:`event` s.

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

      After use, the :py:class:`rsb.Informer` object has to be
      deactivated using its `:py:meth:`rsb.Informer.deactivate`
      method.

      .. literalinclude:: /../rsb-python/examples/informer.py
         :language:        python
         :start-after:     mark-start::body
         :end-before:      mark-end::body
         :emphasize-lines: 10,13,16
         :linenos:

      :download:`Download this example </../rsb-python/examples/informer.py>`

   .. container:: sending-data-cpp:

      A :cpp:class:`rsb::Informer` object is created by calling
      obtaining the |project| factory via
      :cpp:member:`rsb::Factory::getInstance` and then calling its
      :cpp:member:`rsb::Factory::createInformer` with

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

      A ``rsb.Informer`` object is created by calling obtaining the
      |project| factory via ``rsb.Factory.getInstance`` and then
      calling its ``rsb.Factory.createInformer`` with the desired
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

   .. container:: sending-data-cl:

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

  Wait until :term:`event` s are received.

:ref:`Asynchronous <tutorial-receive-async>`

  Continue execution and execute a callback function (called
  :term:`handler` in |project|) when :term:`event` s are received.

The following two sections explains the two ways of receiving data.

.. _tutorial-receive-sync:

Receiving Data Synchronously
----------------------------

To receive data synchronously, a :term:`reader` object has to be
created for the :term:`scope` from which :term:`event` s should be
received. Then, individual :term:`event` s have to be retrieved
explicitly from the :term:`reader` object, hence synchronous
receiving.

.. container:: receive-data-sync-multi

   .. container:: receive-data-sync-python

      .. note::

         Synchronous receiving of data is not currently implemented in
         Python.

   .. container:: receive-data-cpp

      .. literalinclude:: /../rsb-cpp/examples/reader/reader.cpp
         :language:    c++
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

      :download:`Download this example </../rsb-cpp/examples/reader/reader.cpp>`

   .. container:: receive-data-java

      .. note::

         Synchronous receiving of data is not currently implemented in
         Java.

   .. container:: receive-data-cl

      ``with-reader``

      .. literalinclude:: /../rsb-cl/examples/reader.lisp
         :language:    cl
         :start-after: mark-start::with-reader
         :end-before:  mark-end::with-reader
         :linenos:

      Alternatively

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
created for the :term:`scope` from which :term:`event` s should be
received. Then, individual :term:`event` s are received automatically
and in parallel to the execution of the program. For each received
:term:`event`, a user-supplied callback function (a :term:`handler` in
|project| terminology) is executed to process the :term:`event`.

.. container:: receive-data-async-multi

   .. container:: receive-data-async-python

      .. literalinclude:: /../rsb-python/examples/listener.py
         :language:    python
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

      :download:`Download this example </../rsb-python/examples/listener.py>`

   .. container:: receive-data-async-cpp

      .. literalinclude:: /../rsb-cpp/examples/listener/listener.cpp
         :language:    c++
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

      :download:`Download this example </../rsb-cpp/examples/listener/listener.cpp>`

   .. container:: receive-data-async-java

      .. literalinclude:: /../rsb-java/examples/EventListenerExample.java
         :language:    java
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

      :download:`Download this example </../rsb-java/examples/EventListenerExample.java>`

   .. container:: receive-data-async-cl

      ``with-listener`` ``with-handler``

      .. literalinclude:: /../rsb-cl/examples/listener.lisp
         :language:    cl
         :start-after: mark-start::with-listener
         :end-before:  mark-end::with-listener
         :linenos:

      Alternatively

      .. literalinclude:: /../rsb-cl/examples/listener.lisp
         :language:    cl
         :start-after: mark-start::variable
         :end-before:  mark-end::variable
         :linenos:

      :download:`Download this example </../rsb-cl/examples/listener.lisp>`

.. _tutorial-rpc:

Remote Procedure Calls
======================

.. _tutorial-rpc-client:

Client
------

The RPC client calls methods provided by one or more RPC servers. In
|project|, such an RPC client is implemented as a :term:`remote
server` object which is similar to other :term:`participant` s . Such
an object has to be created in order to perform method calls.

After the :term:`remote server` object has been created, a method can
be called by supplying its name as string and, optionally, the
parameter (there are only one or zero parameters). Methods can be
called in blocking and non-blocking way:

* When called in a **blocking** way, the method call returns only
  after the server has processed the request and returned a result.
* When called in a **non-blocking** way, the method call returns
  immediately and the result can be obtained later, when the server
  completes its processing.

.. container:: rpc-client-multi

   .. container:: rpc-client-python

      .. literalinclude:: /../rsb-python/examples/client.py
         :language:    python
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

      :download:`Download this example </../rsb-python/examples/client.py>`

   .. container:: rpc-client-cpp

      .. literalinclude:: /../rsb-cpp/examples/server/client.cpp
         :language:    c++
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

      :download:`Download this example </../rsb-cpp/examples/server/client.cpp>`

   .. container:: rpc-client-java

      .. literalinclude:: /../rsb-java/examples/ClientExample.java
         :language:    java
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

      :download:`Download this example </../rsb-java/examples/ClientExample.java>`

   .. container:: rpc-client-cl

      ``rsb.patterns:with-remote-server``

      .. literalinclude:: /../rsb-cl/examples/client.lisp
         :language:    cl
         :start-after: mark-start::with-remote-server
         :end-before:  mark-end::with-remote-server
         :linenos:

      Alternatively

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
server` objects which are similar to other :term:`participant` s. To
provide such methods a :term:`local server` object has be created.

After the :term:`local server` object has been created, methods have
to be registered, supplying the desired method name as a string and a
callback function which implements the desired behavior of the method.

.. container:: rpc-server-multi

   .. container:: rpc-server-python

      .. literalinclude:: /../rsb-python/examples/server.py
         :language:    python
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

      :download:`Download this example </../rsb-python/examples/server.py>`

   .. container:: rpc-server-cpp

      .. literalinclude:: /../rsb-cpp/examples/server/server.cpp
         :language:    c++
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

      :download:`Download this example </../rsb-cpp/examples/server/server.cpp>`

   .. container:: rpc-server-java

      .. literalinclude:: /../rsb-java/examples/ServerExample.java
         :language:    java
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

      :download:`Download this example </../rsb-java/examples/ServerExample.java>`

   .. container:: rpc-server-cl

      .. literalinclude:: /../rsb-cl/examples/server.lisp
         :language:    cl
         :start-after: mark-start::with-local-server
         :end-before:  mark-end::with-local-server
         :linenos:

      .. literalinclude:: /../rsb-cl/examples/server.lisp
         :language:    cl
         :start-after: mark-start::setf-method
         :end-before:  mark-end::setf-method
         :linenos:

      Alternatively

      .. literalinclude:: /../rsb-cl/examples/server.lisp
         :language:    cl
         :start-after: mark-start::variable
         :end-before:  mark-end::variable
         :linenos:

      :download:`Download this example </../rsb-cl/examples/server.lisp>`
