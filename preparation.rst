.. _preparation:

=============
 Preparation
=============

Installing |project|
====================

There are currently two ways to install the |version| version of
|project|:

* From source
* Debian packages

From Source
-----------

#. The whole source tree of |project| can be obtained from the
   repository located at |repository_versioned|. URLs of individual
   implementations:

   =========== =============================
   Language    Repository URL
   =========== =============================
   C++         |repository_versioned|/cpp
   Java        |repository_versioned|/java
   Python      |repository_versioned|/python
   Common Lisp |repository_versioned|/cl
   Matlab      |repository_versioned|/matlab
   =========== =============================

#. Build and install an implementation

   TODO

Debian Packages
---------------

Debian packages for several versions of |ubuntu| are available from
the `CoR-Lab package repository
<http://packages.cor-lab.de/ubuntu/dists/>`_. The following repository
source line has to be added to ``/etc/apt/sources.list``::

  deb http://packages.cor-lab.de/ubuntu/ RELEASENAME testing

where :samp:`RELEASENAME` is the appropriate Ubuntu release name.

.. warning::

   This installation method only works with |ubuntu|.

.. note::

   More information can be found `here
   <https://support.cor-lab.org/projects/ciserver/wiki/RepositoryUsage>`_.

Running the Examples
====================
