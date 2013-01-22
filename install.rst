.. _install:

======================
 Installing |project|
======================

Currently, the |version| version of |project| can be installed in the
following ways :

* :ref:`From source <install-from-source>`
* :ref:`Debian packages <install-debian>`
* :ref:`PyPi package (Python implementation) <install-pypi>`
* :ref:`Homebrew (C++ implementation) <install-homebrew>`
* Binary downloads

  * :ref:`Binary download for Java implementation (JAR files)
    <install-binary-java>`
  * :ref:`Binary download <install-binary-download>` of :ref:`tools
    <tools>`

.. _install-from-source:

From Source
===========

.. note::

   In case you are unfamiliar with the git version control system, have a look at our short :ref:`GIT primer <git-primer>`.

#. The whole source tree of |project| can be obtained from the
   repository located at |repository_versioned|. URLs of individual
   implementations:

   =========== =============================
   Language    Repository URL
   =========== =============================
   C++         |repository_versioned_cpp|
   Java        |repository_versioned_java|
   Python      |repository_versioned_python|
   Common Lisp |repository_versioned_cl|
   Matlab      |repository_versioned_matlab|
   =========== =============================

#. Build and install an implementation

   .. toctree::
     :maxdepth: 1

     install-cpp
     install-cl
     install-java
     install-python

.. _install-debian:

Debian Packages
===============

Debian packages for several versions of |ubuntu| are available from
the `CoR-Lab package repository
<http://packages.cor-lab.de/ubuntu/dists/>`_.

#. The following repository source line has to be added to
   :file:`/etc/apt/sources.list`

   .. parsed-literal::

      deb http://packages.cor-lab.de/ubuntu/ :samp:`{RELEASENAME}` main

   where :samp:`{RELEASENAME}` is one of |debian_versions|.

#. After that, packages can be installed via

   .. parsed-literal::

      $ sudo apt-get install |debian_package_names|

   Of course, it also possible to only install a subset of the above
   packages.

.. note::

   This installation method only works with |ubuntu|. More information
   can be found `here
   <https://support.cor-lab.org/projects/ciserver/wiki/RepositoryUsage>`_.

.. _install-pypi:

PyPI Packages
=============

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

   To install :program:`protoc` we recommend to use Debian packages on
   |ubuntu| and `Homebrew`_ on MacOS. The respective installation
   commands are:

   .. code-block:: sh

      $ sudo apt-get install protobuf-compiler

   .. code-block:: sh

      $ brew install protobuf

#. The installation of the Python implementation of |project| requires
   the `Google Protocol Buffers`_ module on your system. Depending on
   whether :program:`pip` or :program:`easy_install` is used, do one
   of the following:

   .. code-block:: sh

      $ easy_install protobuf

   .. code-block:: sh

      $ pip install protobuf

   .. note::

      These commands will install protobuf for the whole system and
      require root permissions. If you only want to install protobuf
      for your local user, add the ``--user`` option to the call of
      :program:`easy_install` or ``pip install``. The same applies for
      the subsequently described installation of rsb-python itself.

#. The rsb-python module can be installed by using one of the
   following functions:

   .. parsed-literal::

      $ easy_install "rsb-python<|version|"

   .. parsed-literal::

      $ pip install "rsb-python<|version|"

   .. note::

      These commands will currently install rsb-python in version 0.7 as
      this is at the time of writing the stable version. This will be
      changed once the backport of this rst file was done.

#. If you plan to use the :term:`Spread` :term:`transport`, you need
   to additionally install the Python :term:`Spread` module which is
   available at: |spread_python_tarball|. The version of this module
   which is pushed to the PyPI is outdated and does not work with
   :term:`Spread` version 4. You need to compile this module on your
   own.

.. _install-homebrew:

Homebrew
========

|project| uses :term:`homebrew` for installation on MacOS. Homebrew is a package manager 
simplifying the configuration, compilation and installation process for 
Unixoid software packages on Mac OS X. For futher information on the 
ideas behind homebrew please check `this blog post <http://blog.engineyard.com/2010/homebrew-os-xs-missing-package-manager>`_. 
To install RSB from source on Max OS the following steps are required:

.. note::

   As precondition `XCode <http://developer.apple.com/xcode/>`_ needs to installed. This can be esaily achieved through the MacOS X App Store. 
   A further requirement for installing Unixoid software components are the XCode Command Line Tools. They can be installed from within 
   XCode (:menuselection:`XCode --> Preferences --> Downloads`) and install ``Command Line Tools``.
 
#. Bootstrapping :term:`homebrew` itself:

   Installing :term:`homebrew` on MacOS is simple as that:
   
   .. code-block:: sh
   
      $ ruby -e "$(curl -fsSkL raw.github.com/mxcl/homebrew/go)"

   .. note::
   
      After the installation, you can run the following command to check if homebrew was correctly installed:
   
      .. code-block:: sh
         
         brew doctor

#. Install RSB-C++ (core library and tools) with :term:`homebrew`:

   .. code-block:: sh

      $ brew tap swrede/homebrew-formulas
      $ brew install rsb rsb-tools

   .. note::
   
      After the installation, you can run the following command to check if |project| was correctly installed:
   
      .. code-block:: sh
         
         $ rsb_version

.. note:: 
   
   If the formula conflicts with one from ``mxcl/master`` or another tap,
   you can ``brew install swrede/homebrew-formulas/<formula>``.

   You can also install via URL:

   .. code-block:: sh

      $ brew install https://raw.github.com/swrede/homebrew-formulae/master/rsb.rb

.. note::

   For MacOS X 10.8 users: on mountain lion X11 is not provided anymore. For the core library of |project|, X11 is not needed but by many downstream
   projects. So, if you need to install XQuartz you can get it from http://xquartz.macosforge.org/landing/. This is recommended (but not neccessary)
   also on earlier MacOS versions as XQuartz is more robust and up-to-date than the system-provided X11.   

.. _install-binary-java:

Binary Downloads for Java
=========================

Archives containing pre-built JAR-files of the Java implementation and
required dependencies can be `downloaded
<https://ci.cor-lab.de/job/rsb-java-trunk/lastSuccessfulBuild/artifact/rsb-java.zip>`_
from the continuous integration server.

After downloading the archive, several JAR-files can be extracted from
it. These files have to be placed on the Java classpath. Afterwards,
the Java implementation of |project| should be usable in any Java
program.

.. _install-binary-download:

Binary Downloads of Tools
=========================

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

           $ for alias in info logger call send ; do ln -s tools ${alias} ; done
