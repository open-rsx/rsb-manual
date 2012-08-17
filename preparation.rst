.. _preparation:

=============
 Preparation
=============

.. _install:

Installing |project|
====================

Currently, the |version| version of |project| can be installed in the
following ways :

* Binary downloads (only for :ref:`tools <tools>`)
* Debian packages
* PyPi package (Python implementation)
* From source

Binary Downloads of |project| Tools
-----------------------------------

#. Download the |main_binary| binary from the appropriate location:

   * `Linux i686 <https://ci.cor-lab.de/job/rsb-tools-cl-trunk/label=ubuntu_lucid_32bit/>`_
   * `Linux x86_64 <https://ci.cor-lab.de/job/rsb-tools-cl-trunk/label=ubuntu_lucid_64bit/>`_
   * `MacOS x86_64 <https://ci.cor-lab.de/job/rsb-tools-cl-trunk/label=MAC_OS_lion_64bit/>`_
   * `Windows 7 i686 <https://ci.cor-lab.de/job/rsb-tools-cl-trunk-windows/label=192.168.100.120>`_

#. After the download, the |main_binary| file has to be made
   executable in most cases. This can be done for example by executing

   .. code-block:: sh

      $ chmod +x tools

   in the download directory.

#. The various tools are provided as `symbolic links
   <http://en.wikipedia.org/wiki/Symbolic_link>`_ to the single
   |main_binary| binary. When invoked, it prints a list of these links
   and offers to create them:

   .. code-block:: sh

      $ ./tools
      [...]
      Create missing links now [yes/no]? y
      Creating symbolic link info -> tools
      [...]

   .. note::

      The links can also be created as follows:

      Non-interactively

        .. code-block:: sh

           $ ./tools create-links

      Manually

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
   C++         |repository_versioned| cpp
   Java        |repository_versioned| java
   Python      |repository_versioned| python
   Common Lisp |repository_versioned| cl
   Matlab      |repository_versioned| matlab
   =========== =============================

#. Build and install an implementation

   .. toctree::
     :maxdepth: 1

     install-cpp
     install-cl
     install-java

Debian Packages
---------------

Debian packages for several versions of |ubuntu| are available from
the `CoR-Lab package repository
<http://packages.cor-lab.de/ubuntu/dists/>`_.

#. The following repository source line has to be added to
   :file:`/etc/apt/sources.list`::

     deb http://packages.cor-lab.de/ubuntu/ RELEASENAME testing

   where :samp:`{RELEASENAME}` is the appropriate Ubuntu release name.

#. After that, packages can be installed via

   .. code-block:: sh

      $ sudo apt-get install PACKAGES

   where :samp:`{PACKAGES}` is the appropriate subset of
   |package_names|.

.. note::

   This installation method only works with |ubuntu|. More information
   can be found `here
   <https://support.cor-lab.org/projects/ciserver/wiki/RepositoryUsage>`_.

PyPI Packages
-------------

For Python, platform-independent packages are pushed to the central
repository server and can be installed with :program:`pip` or
:program:`easy_install`.

.. note::

  :program:`pip` is the recommended way of installing Python packages
  since some time and preferred over :program:`easy_install`. On
  |ubuntu| systems, :program:`pip` can be installed via the package
  ``python-pip``.

.. note::

   The Python implementation of |project| is currently only available
   for Python 2.X. If the default Python version on your system is
   Python 3, ensure that you call the respective
   :program:`easy_install` or :program:`pip` version. These usually
   contain the Python version as a suffix to the name, e.g.:
   ``easy_install-2.7``.

#. The installation of the Python implementation of |project| requires
   the `Google Protocol Buffers`_ compiler (:program:`protoc`) on your
   system. Before starting the installation, install :program:`protoc`
   and ensure that this binary can be found from the :envvar:`PATH`
   environment variable.

#. Depending on whether :program:`pip` or :program:`easy_install` is
   used do one of the following

   .. code-block:: sh

      $ easy_install rsb-python

   .. code-block:: sh

      $ pip install rsb-python

   .. note::

      These commands will install rsb-python for the whole system and
      require root permissions. If you only want to install rsb-python
      for your local user, add the ``--user`` option to the call of
      :program:`easy_install` or ``pip install``.

#. If you plan to use the :term:`Spread` :term:`transport`, you need
   to additionally install the Python :term:`Spread` module which is
   available at: |spread_python_tarball|. The version of this module
   which is pushed to the PyPI is outdated and does not work with
   :term:`Spread` version 4. You need to compile this module on your
   own.

Running the Examples
====================

TODO
