.. _tutorial-chat:

===============
 A Chat System
===============

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
========================================

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
=====================

Avatar images are exchanged between participants of the distributed
chat via |project|'s RPC mechanism. In order to implement this, each
chat program

* creates a :term:`local server` providing the avatar image of the
  participant via a method ``get`` method under the :term:`scope`
  :samp:`/chat/avatar/{NICKNAME}`.
* creates a :term:`remote server` for downloading avatar images from
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
