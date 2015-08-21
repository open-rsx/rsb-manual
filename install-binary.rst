======================================
Installation of Pre-Generated Packages
======================================

.. _install-debian:

Debian Packages
===============

Debian packages for several versions of |ubuntu| are available from
the CoR-Lab `repository server`_.

#. The following repository source line has to be added to
   :file:`/etc/apt/sources.list`

   ..
      edit-on-version-bump
      replace "main testing" with "main" in the released version

   .. parsed-literal::

      deb http://packages.cor-lab.de/ubuntu/ :samp:`{RELEASENAME}` main testing

   where :samp:`{RELEASENAME}` is one of |debian_versions|.

   .. note::

      In case you add this line using a graphical package manager, some of these
      tools also propose to add a second line for source packages starting with
      ``deb-src``. As we do not provide source packages, this line should not be
      added or needs to be removed manually.

   .. note::

      To prevent verification errors you also need to add our package server key
      to your system. Please follow the instructions available at
      http://packages.cor-lab.org.

#. After that, packages can be installed via

   .. parsed-literal::

      $ sudo apt-get install |debian_package_names|

   The above command installs the C++ and Common Lisp implementations
   of |project|. Of course, it also possible to only install a subset
   of the above packages.

   .. note::

      Support for the :term:`Spread` :term:`transport` is no longer
      automatically installed with |project|. Support for
      :term:`Spread` can be installed by executing

      .. parsed-literal::

         $ sudo apt-get install |debian_package_names_spread|

.. note::

   This installation method only works with |ubuntu|. More information
   can be found `here
   <https://support.cor-lab.org/projects/ciserver/wiki/RepositoryUsage>`_.

.. _install-pypi:

Python PyPI Packages
====================

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

      $ easy_install "rsb-python<=\ :samp:`{VERSION}`\ .99999"

   .. parsed-literal::

      $ pip install "rsb-python<=\ :samp:`{VERSION}`\ .99999"

   where :samp:`{VERSION}` needs to be replaced with |version|.

   .. note::

      Development versions of |project| are not deployed on PyPI. These
      commands will revert to the latest stable version.

#. If you plan to use the :term:`Spread` :term:`transport`, you need
   to additionally install the Python :term:`Spread` module which is
   available at: |spread_python_tarball|. The version of this module
   which is pushed to the PyPI is outdated and does not work with
   :term:`Spread` version 4. You need to compile this module on your
   own.

.. _install-homebrew:

Mac Homebrew
============

|project| uses :term:`homebrew` for installation on MacOS. For further
information on the ideas behind homebrew please check `this blog post
<http://blog.engineyard.com/2010/homebrew-os-xs-missing-package-manager>`_.
To install |project| from source on MaxOS the following steps are
required:

.. note::

   As precondition `XCode <http://developer.apple.com/xcode/>`_ needs
   to installed. This can be easily achieved through the MacOS X App
   Store. A further requirement for installing Unixoid software
   components are the XCode Command Line Tools. They can be installed
   from within XCode (:menuselection:`XCode --> Preferences -->
   Downloads`) and install ``Command Line Tools``.

#. Bootstrapping :term:`homebrew` itself:

   Installing :term:`homebrew` on MacOS is simple as that:

   .. code-block:: sh

      $ ruby -e "$(curl -fsSkL raw.github.com/mxcl/homebrew/go)"

   .. note::

      After the installation, you can run the following command to
      check if :term:`homebrew` was installed correctly:

      .. code-block:: sh

         $ brew doctor

#. Install the C++ implementation of |project| (core library and
   tools) with :term:`homebrew`:

   .. code-block:: sh

      $ brew tap corlab/homebrew-formulas
      $ brew install rsb-tools-cpp

   .. note::

      After the installation, you can run the following command to
      check if |project| was installed correctly:

      .. code-block:: sh

         $ rsb_version

.. note::

   If the formula conflicts with one from ``mxcl/master`` or another
   tap, you can :samp:`brew install
   corlab/homebrew-formulas/{FORMULA}`.

   You can also install via URL:

   .. code-block:: sh

      $ brew install https://raw.github.com/corlab/homebrew-formulas/master/rsb.rb

.. note::

   For MacOS X 10.8 users: on mountain lion, X11 is not provided
   anymore. For the core library of |project|, X11 is not needed, but
   many downstream projects require it. So, if you need to install
   XQuartz you can get it from
   http://xquartz.macosforge.org/landing/. This is recommended (but
   not necessary) also on earlier MacOS versions as XQuartz is more
   robust and up-to-date than the system-provided X11.

.. _install-binary-java:

Java
====

Pre-compiled JAR Download
-------------------------

..
   edit-on-version-bump:
   Change URL

Archives containing pre-built JAR-files of the Java implementation and
required dependencies can be `downloaded
<https://ci.cor-lab.org/view/rsx-trunk/job/rsb-java-trunk/label=ubuntu_trusty_64bit/lastSuccessfulBuild/artifact/.archive/rsb-java.zip>`_
from the continuous integration server.

After downloading the archive, several JAR-files can be extracted from
it. These files have to be placed on the Java classpath. Afterwards,
the Java implementation of |project| should be usable in any Java
program.

.. _install-binary-java-maven:

Maven Artifacts from the CITEC Repository
-----------------------------------------

|project| java is also deployed to the CITEC `Maven`_ repository at
https://mvn.cit-ec.de/. In order to use the version deployed there,
include the following fragments in the :file:`pom.xml` of your project.

..
   edit-on-version-bump:
   Change version of dependency to something like [0.7,0.8-SNAPSHOT) and
   update to new master version

#. In the dependencies section:

   .. code-block:: xml

      <dependencies>
          <dependency>
              <groupId>rsb</groupId>
              <artifactId>rsb</artifactId>
              <version>0.13-SNAPSHOT</version>
          </dependency>
      </dependencies>

#. In the repositories section:

   .. code-block:: xml

      <repositories>
          <repository>
              <id>citec-releases</id>
              <name>CITEC Maven Repository Server</name>
              <url>https://mvn.cit-ec.de/nexus/content/repositories/releases/</url>
              <layout>default</layout>
              <releases>
                  <enabled>true</enabled>
              </releases>
          </repository>
          <repository>
              <id>citec-snapshots</id>
              <name>CITEC Maven Repository Server</name>
              <url>https://mvn.cit-ec.de/nexus/content/repositories/snapshots/</url>
              <layout>default</layout>
              <snapshots>
                  <enabled>true</enabled>
              </snapshots>
          </repository>
      </repositories>

 .. _install-binary-download:

Binary Downloads of Tools
=========================

#. Download the |main_binary| binary from the appropriate location:

   ..
      edit-on-version-bump:
      adapt URLs

   * `Linux i686 <https://ci.cor-lab.de/job/rsb-tools-cl-trunk/label=ubuntu_trusty_32bit/>`_
   * `Linux x86_64 <https://ci.cor-lab.de/job/rsb-tools-cl-trunk/label=ubuntu_trusty_64bit/>`_
   * `MacOS x86_64 <https://ci.cor-lab.de/job/rsb-tools-cl-trunk-macos/label=MAC_OS_mavericks_64bit/>`_

#. After the download, the |main_binary| file has to be made
   executable in most cases. This can be done for example by executing

   .. code-block:: sh

      $ chmod +x rsb

   in the download directory.

Pre-Compiled Windows Archive
============================

As compiling cross-platform C++ code on Windows can easily become a nightmare,
we provide a ZIP archive with |project| for C++ as well as all other
RSX-related software pre-compiled for Windows in 32 bit mode using different
Visual Studio versions.

..
   edit-on-version-bump:
   Change URL of CI server job

#. Download the artifact for your Visual Studio version

   In order to install the complete collection of RSX C++ software, you first
   need to know the numeric version of the Visual Studio version you want to
   work with. E.g. Visual Studio 2010 corresponds to version 100 and Visual
   Studio 2012 corresponds to numeric version 110. As soon as you know this you
   can select the appropriate configuration from this CI server job:
   https://ci.cor-lab.org/job/rsx-trunk-windows-package/ (by
   clicking on the appropriate version name). After selecting the
   configuration, download the latest successful artifact (a zip file).

#. Extract the archive

   Extract the archive to your desired target destination on your hard drive.

You end up with a folder containing one subfolder for each RSX project and all
dependencies like the boost libraries.

Executing Programs Against the Archive
--------------------------------------

In order to execute programs that use software provided in the archive you need
to extend the Windows ``PATH`` environment variable to point to all folders in
the archive structure that contain DLL files. Otherwise you will receiving
missing DLL warnings when trying to execute programs.

Please ensure that you do not have other Boost version etc. in your ``PATH``
than the ones provided in the archive.

Compiling Against the Archive
-----------------------------

Windows is very picky about mixing different runtime libraries. All software
provided in the archive is compiled in multi-threaded debug mode. Your client
software should be compiled with exactly these settings to prevent
unpredictable errors.
