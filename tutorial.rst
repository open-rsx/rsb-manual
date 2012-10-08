.. _tutorial:

==========
 Tutorial
==========

This section assumes a functional |project| installation for at least
one programming language.

.. seealso::

   :ref:`install`
     Installing |project| from source or using a package manager.

   :ref:`troubleshooting`
     Solving common problems.

The goal of this tutorial is teaching you how to accomplish some basic
tasks using |project|:

* :ref:`Basic Communication <tutorial-basic>`

  * :ref:`Sending <tutorial-send>` and :ref:`receiving data
    <tutorial-receive>`
  * Making :ref:`Remote Procedure Calls <tutorial-rpc>`
* :ref:`Building a simple chat system <tutorial-chat>` using the above
  techniques

.. note::

   Depending on your |project| configuration, the following examples
   may require a running :term:`Spread daemon` for successful
   execution.

.. _tutorial-basic:

Basic Communication
===================

The essential form of communication in |project| consists in sending
and receiving :term:`event` s.

.. _tutorial-send:

Sending Data
------------

To send data in |project|, in the simplest case, an :term:`informer`
has to be created for the desired destination :term:`scope` and the
data then has to be passed to it.

.. container:: sending-data-multi

   .. container:: sending-data-python

      .. literalinclude:: /../rsb-python/examples/informer.py
         :language:    python
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

   .. container:: sending-data-cpp:

      .. literalinclude:: /../rsb-cpp/examples/informer/informer.cpp
         :language:    cpp
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

   .. container:: sending-data-java

      .. literalinclude:: /../rsb-java/examples/InformerExample.java
         :language:    java
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

   .. container:: sending-data-cl:

      .. literalinclude:: /../rsb-cl/examples/informer.lisp
         :language:    cl
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

.. _tutorial-receive:

Receiving Data
--------------

Receiving data can be performed in two different ways in |project|:

:ref:`Synchronous <tutorial-receive-sync>`

  Wait until :term:`event` s are received.

:ref:`Asynchronous <tutorial-receive-async>`

  Continue execution and execute a callback function (called
  :term:`handler` in |project|) when :term:`event` s are received.

The following two sections explains the two ways of receiving data.

.. _tutorial-receive-sync:

Receiving Data Synchronously
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
----------------------

.. _tutorial-rpc-client:

Client
~~~~~~

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
~~~~~~

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

.. _tutorial-chat:

A Chat System
=============

In this tutorial, we will build a simple, distributed chat system
based on |project|.

The initial goal of :ref:`the first part <tutorial-chat-1>` is having
a chat client which sends and receives text messages to and from other
clients without the need for a server. A session could look like this:

.. code-block:: sh

   $ rsb-chat-client
   > hi, anyone listening?
   other-user: hi, i thought, i was the only one :)
   > /quit
   $

As an extension, in the :ref:`second part <tutorial-chat-2>` the chat
program should be able to send and receive avatar images to and from
other chat clients.

.. _tutorial-chat-1:

Part 1: Send and Receiving Text Messages
----------------------------------------

The distributed chat system can be organized by assigning a
:term:`scope` or the form :samp:`/chat/text/{NICKNAME}` to each
participating nickname. This allows receiving messages from a
particular sender by listening on :samp:`/chat/text/{NICKNAME}` and
receiving all messages by listening on the :term:`superscope`
``/chat/text/``.

Implementation-wise, sending and receiving textual chat messages,
requires an :term:`informer` and a :term:`listener` on the respective
appropriate :term:`scope`:

* The :term:`informer` publishes messages on
  :samp:`/chat/text/{NICKNAME}`
* The :term:`listener` receives **all** messages on
  ``/chat/text/``.

  .. note::

     This includes one's own published messages, so these have to be
     filtered out to prevent an "echo" effect.

.. container:: chat-1-multi

   .. container:: chat-1-python

      .. literalinclude:: /../rsb-tutorials/chat-1/python/solution/chat1.py
         :language:    python
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

      :download:`Download this example </../rsb-tutorials/chat-1/python/solution/chat1.py>`

   .. container:: chat-1-cpp

      .. literalinclude:: /../rsb-tutorials/chat-1/cpp/solution/src/chat-1.cpp
         :language:    c++
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

      :download:`Download this example </../rsb-tutorials/chat-1/cpp/solution/src/chat-1.cpp>`

   .. container:: chat-1-java

      .. literalinclude:: /../rsb-tutorials/chat-1/java/solution/src/chat1/Chat1.java
         :language:    java
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

      :download:`Download this example </../rsb-tutorials/chat-1/java/solution/src/chat1/Chat1.java>`

   .. container:: chat-1-cl

      .. literalinclude:: /../rsb-tutorials/chat-1/cl/solution/chat.lisp
         :language:    cl
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

      :download:`Download this example </../rsb-tutorials/chat-1/cl/solution/chat.lisp>`

.. _tutorial-chat-2:

Part 2: Avatar Images
---------------------

Avatar images are exchanged between participants of the distributed
chat via |project|'s RPC mechanism. In order to implement this, each
chat program

* creates a :term:`local server` providing the avatar image of the
  participant via a method ``get`` method under the :term:`scope`
  :samp:`/chat/avatar/{NICKNAME}`.
* creates a :term:`remote server` s for downloading avatar images from
  other participants by calling the methods mentioned above.

.. container:: chat-2-multi

   .. container:: chat-2-python

      .. literalinclude:: /../rsb-tutorials/chat-2/python/solution/chat2.py
         :language:    python
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

      :download:`Download this example </../rsb-tutorials/chat-2/python/solution/chat2.py>`

   .. container:: chat-2-cpp

      .. literalinclude:: /../rsb-tutorials/chat-2/cpp/solution/src/chat.cpp
         :language:    c++
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

      :download:`Download this example </../rsb-tutorials/chat-2/cpp/solution/src/chat.cpp>`

   .. container:: chat-2-java

      .. literalinclude:: /../rsb-tutorials/chat-2/java/solution/src/chat2/AvatarServer.java
         :language:    java
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

      :download:`Download this example </../rsb-tutorials/chat-2/java/solution/src/chat2/AvatarServer.java>`

   .. container:: chat-2-cl

      .. literalinclude:: /../rsb-tutorials/chat-2/cl/solution/avatar.lisp
         :language:    cl
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

      :download:`Download this example </../rsb-tutorials/chat-2/cl/solution/avatar.lisp>`

Extension Points
================

Writing Converters
------------------

Writing Filters
---------------

Writing Connectors
------------------

Writing Event Processing Strategies
-----------------------------------
