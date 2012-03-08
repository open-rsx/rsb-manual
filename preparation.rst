.. _preparation:

=============
 Preparation
=============

Installing |project|
====================

There are currently two ways to install the |version| version of
|project|:

* Binary downloads (only for :ref:`tools <tools>`)
* Debian packages
* From source

Binary Downloads of |project| Tools
-----------------------------------

#. Download the ``tools`` binary from the appropriate location:

   * `Linux i686 <https://ci.cor-lab.de/job/rsb-tools-cl-0.6/label=ubuntu_lucid_32bit/>`_
   * `Linux x86_64 <https://ci.cor-lab.de/job/rsb-tools-cl-0.6/label=ubuntu_lucid_64bit/>`_
   * `MacOS x86_64 <https://ci.cor-lab.de/job/rsb-tools-cl-0.6/label=MAC_OS_lion_64bit/>`_

#. After the download, the ``tools`` file has to be made executable in
   most cases. This can be done for example by executing

   .. code-block:: sh

     chmod +x bag

   in the download directory.

#. The various ``tools-*`` tools are provided as `symbolic links
   <http://en.wikipedia.org/wiki/Symbolic_link>`_ to the single
   ``tools`` binary. When invoked, it prints a list of these links and
   instructions on how to create them.

   The links can be created as follows:

   .. code-block:: sh

      $ for alias in info logger call ; do ln -s tools ${alias} ; done

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

TODO
