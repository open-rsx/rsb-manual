Tutorial
********

Getting Started
===============

Installing |project|
--------------------

There are currently two ways to install |project|:

* From source
* Debian Packages

From Source
^^^^^^^^^^^

SVN URLs for Implementations of |project|

=========== =============================
C++         |repository_versioned|/cpp
Java        |repository_versioned|/java
Python      |repository_versioned|/python
Common Lisp |repository_versioned|/cl
=========== =============================
Matlab      |repository_versioned|/matlab
=========== =============================

Debian Packages
^^^^^^^^^^^^^^^

Debian packages for several versions of Ubuntu Linux are available
from the `CoR-Lab package repository
<http://packages.cor-lab.de/ubuntu/dists/>`_. Repository source line::

  deb http://packages.cor-lab.de/ubuntu/ RELEASENAME testing

Usage instructions can be found in the `wiki
<https://support.cor-lab.org/projects/ciserver/wiki/RepositoryUsage>`_.

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

Writing Filters
---------------

Writing Connectors
------------------

Writing Event Processing Strategies
-----------------------------------
