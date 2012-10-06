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

Basic Communication
===================

Sending Data
------------

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

Receiving Data
--------------

.. container:: receiving-data-multi

   .. container:: receiving-data-python

      .. literalinclude:: /../rsb-python/examples/listener.py
         :language:    python
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

   .. container:: receiving-data-cpp

      .. literalinclude:: /../rsb-cpp/examples/listener/listener.cpp
         :language:    c++
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

   .. container:: receiving-data-java

      .. literalinclude:: /../rsb-java/examples/EventListenerExample.java
         :language:    java
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

   .. container:: receiving-data-cl

      .. literalinclude:: /../rsb-cl/examples/listener.lisp
         :language:    cl
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

Remote Procedure Calls
----------------------

.. container:: rpc-multi

   .. container:: rpc-python

      .. literalinclude:: /../rsb-python/examples/client.py
         :language:    python
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:
      .. literalinclude:: /../rsb-python/examples/server.py
         :language:    python
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

   .. container:: rpc-cpp

      .. literalinclude:: /../rsb-cpp/examples/server/client.cpp
         :language:    c++
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:
      .. literalinclude:: /../rsb-cpp/examples/server/server.cpp
         :language:    c++
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

   .. container:: rpc-java

      .. literalinclude:: /../rsb-java/examples/ClientExample.java
         :language:    java
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:
      .. literalinclude:: /../rsb-java/examples/ServerExample.java
         :language:    java
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

   .. container:: rpc-cl

      .. literalinclude:: /../rsb-cl/examples/client.lisp
         :language:    cl
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:
      .. literalinclude:: /../rsb-cl/examples/server.lisp
         :language:    cl
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

A Chat System
=============

Part 1: Send and Receiving Messages
-----------------------------------

.. container:: chat-1-multi

   .. container:: chat-1-python

      .. literalinclude:: /../rsb-tutorials/chat-1/python/solution/chat1.py
         :language:    python
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

   .. container:: chat-1-cpp

      .. literalinclude:: /../rsb-tutorials/chat-1/cpp/solution/src/chat-1.cpp
         :language:    c++
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

   .. container:: chat-1-java

      .. literalinclude:: /../rsb-tutorials/chat-1/java/solution/src/chat1/Chat1.java
         :language:    java
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

   .. container:: chat-1-cl

      .. literalinclude:: /../rsb-tutorials/chat-1/cl/solution/chat.lisp
         :language:    cl
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

Part 2: Avatar Images
---------------------

.. container:: chat-2-multi

   .. container:: chat-2-python

      .. literalinclude:: /../rsb-tutorials/chat-2/python/solution/chat2.py
         :language:    python
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

   .. container:: chat-2-cpp

      .. literalinclude:: /../rsb-tutorials/chat-2/cpp/solution/src/chat.cpp
         :language:    c++
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

   .. container:: chat-2-java

      .. literalinclude:: /../rsb-tutorials/chat-2/java/solution/src/chat2/AvatarServer.java
         :language:    java
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:

   .. container:: chat-2-cl

      .. literalinclude:: /../rsb-tutorials/chat-2/cl/solution/avatar.lisp
         :language:    cl
         :start-after: mark-start::body
         :end-before:  mark-end::body
         :linenos:


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
