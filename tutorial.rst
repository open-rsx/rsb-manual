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

.. literalinclude:: /../rsb-python/examples/informer.py
   :language: python
   :lines:    24-
   :linenos:

Receiving Data
--------------

.. literalinclude:: /../rsb-python/examples/listener.py
   :language: python
   :lines:    24-
   :linenos:

RPC
---

.. literalinclude:: /../rsb-python/examples/client.py
   :language: python
   :lines:    24-
   :linenos:
.. literalinclude:: /../rsb-python/examples/server.py
   :language: python
   :lines:    24-
   :linenos:

.. literalinclude:: /../rsb-cl/examples/client.lisp
   :language: cl
   :lines:    25-
   :linenos:
.. literalinclude:: /../rsb-cl/examples/server.lisp
   :language: cl
   :lines:    25-
   :linenos:

A Chat System
=============

Chat 1
------

.. literalinclude:: /../rsb-tutorials/chat-1/python/solution/chat1.py
   :lines:    19-
   :language: python
   :linenos:
.. literalinclude:: /../rsb-tutorials/chat-1/cl/solution/chat.lisp
   :lines:    20-
   :language: cl
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
