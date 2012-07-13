.. _preparation:

=============
 Preparation
=============

.. _install:

Installing |project|
====================

There are currently 3 ways to install the |version| version of
|project|:

* Binary downloads (only for :ref:`tools <tools>`)
* Debian packages
* PyPi package (python)
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

      chmod +x tools

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
   C++         |repository_versioned|/cpp
   Java        |repository_versioned|/java
   Python      |repository_versioned|/python
   Common Lisp |repository_versioned|/cl
   Matlab      |repository_versioned|/matlab
   =========== =============================

#. Build and install an implementation

   .. toctree::
     :maxdepth: 1

     install-cpp
     install-cl

Debian Packages
---------------

Debian packages for several versions of |ubuntu| are available from
the `CoR-Lab package repository
<http://packages.cor-lab.de/ubuntu/dists/>`_.

#. The following repository source line has to be added to
   ``/etc/apt/sources.list``::

     deb http://packages.cor-lab.de/ubuntu/ RELEASENAME testing

   where :samp:`RELEASENAME` is the appropriate Ubuntu release name.

#. After that, packages can be installed via

   .. code-block:: sh

      $ sudo apt-get install rsb|version| rsb-tools-cpp|version| rsb-tools-cl|version|

.. warning::

   This installation method only works with |ubuntu|.

.. note::

   More information can be found `here
   <https://support.cor-lab.org/projects/ciserver/wiki/RepositoryUsage>`_.

PyPI Packages
-------------

For python, platform-unspecific packages are pushed to the central repository
server and can hence be installed with ``pip`` or ``easy_install``.

.. note::

  The installation of rsb-python requires the `Google Protocol Buffers <http://code.google.com/p/protobuf/>`_ compiler (``protoc``)
  on your system. Before starting the installation of rsb-python, install ``protoc``
  and ensure that this binary can be found from the ``PATH`` environment variable.

.. note::

  ``pip`` is the recommended way of installing Python packages since some time and
  perferred over ``easy_install``. On Ubuntu system ``pip`` can be install from the
  package ``python-pip``.

Depending on the availability of ``pip`` or ``easy_install`` do one ofthe following to
install rsb-python:

.. code-block:: sh
  
  easy_install rsb-python
  
.. code-block:: sh

  pip install rsb-python
  
.. note::
  
  These commands will install rsb-python for the whole system and require root
  permissions. If you only want to install rsb-python for your local user, add
  the ``--user`` option to the call of ``easy_install`` or ``pip install``.
  
.. note::

  rsb-python is currently only available for Python 2.X. If your linux distribution
  already contains Python 3, ensure that you call the respective ``easy_install``
  or ``pip`` version. These usually contain the Python version as a suffix to the
  name, e.g.: ``easy_install-2.7``.
  
.. note::

  If you plan to use the spread transport, you need to additionally install the python
  spread module which is available at: http://www.spread.org/files/SpreadModule-1.5spread4.tgz
  The version of this module which is pushed to the PyPI is outdated and does not work
  with spread version 4. You need to compile this module on your own.
   
Running the Examples
====================

TODO

.. _troubleshooting:

Troubleshooting
===============

#. Problem *(applies to C++, Python)*

     Communication over spread does not work anymore. Spread settings are ignored.

   Solution

     Starting with version 0.7, |project| uses a :term:`transport`
     that implements a custom TPC-based protocol to facilitate
     the easy use of the framework without dependencies on 3rd party
     libraries. In order to use to the old spread transport the
     configuration needs to be changed.

     This can be changed in three ways:

     #. Globally for all |project| programs (or running under a
        particular UNIX user)

        Create or modify a |project| :ref:`configuration file
        <configuration>` |system_config_file| or |user_config_file| to
        contain the following lines:

        .. code-block:: ini
           :linenos:

           [transport.spread]
           enabled = 1
           [transport.socket]
           enabled = 0

        Lines 3 and 4 can be omitted to enable both :term:`transports`
        in parallel.

     #. Locally for the current directory

        Create a |project| :ref:`configuration file <configuration>`
        |pwd_config_file| with the same contents as described above.

     #. For the current shell

        Set and export :ref:`environment variables
        <common-environment-variables>` as follows:

        .. code-block:: sh

           $ export RSB_TRANSPORT_SPREAD_ENABLED=1
           $ export RSB_TRANSPORT_SOCKET_ENABLED=0

#. Problem *(applies to C++,Common Lisp)*

     How can I configure the TCP-based transport?

   Solution

     The TCP-based transport can be configured locally or globally by
     placing the following content in |system_config_file|,
     |user_config_file| or |pwd_config_file|:

     .. code-block:: ini

        [transport.socket]
        enabled = 1
        host    = HOSTNAME
        port    = 4444
        server  = auto

     :samp:`{HOST}` can be ``localhost`` (if all processes are going
     to run on the same node), a host name of an IP address.

     .. note::

        The above configuration uses ``server = auto`` which causes
        the initial |project| process to create the specified server
        and subsequent processes to connect to that server.
           
#. Problem *(applies to C++)*

     I compiled and installed successfully, but |project|
     binaries/libraries produce linker errors at runtime.

   Solution

     The C++ implementation of |project| is built without fixed `rpath
     <http://en.wikipedia.org/wiki/Rpath>`_ by default. As a result,
     installed |project| binaries and libraries do not contain
     information regarding the location of their dependencies. This
     potentially causes runtime linking to fail because the
     dependencies cannot be located.

     There are two possible solutions:

     #. Building and installing |project| with fixed rpath

        This can be achieved by configuring |project| with

        .. code-block:: sh

           $ cmake -DCMAKE_INSTALL_RPATH_USE_LINK_PATH=TRUE

        This instructs `CMake`_ to set the rpath of installed
        libraries and executables to the values used for building
        them. Normally the rpath is stripped at installation time.

     #. Use of the :envvar:`LD_LIBRARY_PATH` environment variable

        When the value of :envvar:`LD_LIBRARY_PATH` contains the
        directory/directories into which |project| (and its
        dependencies) have been installed, these dependencies can be
        located at runtime. :envvar:`LD_LIBRARY_PATH` can be set, for
        example, like this:

        .. code-block:: sh

           $ export LD_LIBRARY_PATH=PREFIX/lib

        where :samp:`{PREFIX}` is the prefix directory into which
        |project| and its dependencies have been installed.

        .. warning::

           This workaround is not permanent and has to be repeated for
           each new shell that should be able to execute |project|
           binaries or |project|-based programs.

#. Problem *(applies to Common Lisp)*

     When I start any of the :ref:`tools <tools>`, the following
     happens:

     .. code-block:: sh

        $ logger socket://localhost:7777
        WARNING:
          Failed to load Spread library: Unable to load any of the alternatives:
          ("libspread-without-signal-blocking.so" "libspread.so" "libspread.so.2"
           "libspread.so.2.0" "libspread.so.1").
          Did you set LD_LIBRARY_PATH?
          Spread transport will now be disabled.
        [execution continues, but Spread transport does not work]

   Solution

     Place one of the mentioned :term:`Spread` libraries on the system
     library search path or set :envvar:`LD_LIBRARY_PATH`
     appropriately.
