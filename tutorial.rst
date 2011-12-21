Tutorial
********

Getting Started
===============

Installing RSB
--------------

SVN URLs for Implementations of RSB

=========== =============================
C++         |repository-versioned|/cpp
Java        |repository-versioned|/java
Python      |repository-versioned|/python
Common Lisp |repository-versioned|/cl
=========== =============================
Matlab      |repository-versioned|/matlab
=========== =============================

Debian repository server::

  deb http://packages.cor-lab.de/ubuntu/ RELEASENAME testing

Running the Examples
--------------------

Basic Communication
===================

Creating an Informer and Sending Data
-------------------------------------

.. literalinclude:: /../python/core/examples/informer.py
   :language: python
   :lines:    18-
   :linenos:

Creating a Listener and Receiving Data
--------------------------------------

.. literalinclude:: /../python/core/examples/listener.py
   :language: python
   :lines:    18-
   :linenos:

RPC Communication
-----------------

.. literalinclude:: /../python/core/examples/client.py
   :language: python
   :lines:    18-
   :linenos:
.. literalinclude:: /../python/core/examples/server.py
   :language: python
   :lines:    18-
   :linenos:

.. literalinclude:: /../cl/cl-rsb/examples/client.lisp
   :language: cl
   :lines:    22-
   :linenos:
.. literalinclude:: /../cl/cl-rsb/examples/server.lisp
   :language: cl
   :lines:    22-
   :linenos:

Extension Points
================

Writing Converters
------------------

Writing Connectors
------------------

Writing Event Processing Strategies
-----------------------------------
