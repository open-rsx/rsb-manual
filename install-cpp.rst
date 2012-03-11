.. _install-cpp:

================================================
 Installing the C++ Implementation of |project|
================================================

Prerequisites
=============

Supported Operating Systems and Compilers
-----------------------------------------

* Linux (GCC 4.x)
* MacOS (GCC 4.x)
* Windows (MS Visual Studio 9 2008)
* Windows (MS Visual Studio 10 20??)

Other combinations may be possible but are currently untested.

Required Dependencies
-------------------------

* `Boost`_, Version 1.38 or newer
* `Boost.UUID`_

  * Header-only library
  * Included in `Boost`_ since version 1.42
  * Headers from this version can be used with all older versions of
    `Boost`_
* `Google Protocol Buffers`_

  * |ubuntu| (Lucid) packages (``libprotobuf-dev``,
    ``protobuf-compiler``) are ok
* `Spread`_, Version 4.0 or newer

  * The |ubuntu| (Lucid) package does **not** work (since it contains
    the outdated version 3)
* `CMake`_, Version 2.8 or newer

Optional Dependencies
---------------------

Building without these is possible, but some features will be missing.

* `Doxygen`_ for generation of API documentation
* `Lcov`_ for code coverage analysis
* `cppcheck`_ for static code analysis

Installation of Dependencies on Debian-based Systems
----------------------------------------------------

.. code-block:: sh

   $ sudo apt-get install libprotobuf-dev protobuf-compiler build-essential libboost-dev

Installation of RSC, RSBProtocol and |project|
==============================================

#. Checkout |project| and its immediate dependencies from the
   Subversion repository

   RSC
     https://code.cor-lab.org/svn/rsc/trunk/rsc
   |project| Protocol
     |repository_versioned|/protocol
   |project| C++
     |repository_versioned|/cpp/core


#. Build and install the |project| C++ core and its dependencies in
   the order given below:

   .. note::

      In the following commands, :samp:`{prefix}` specifies the target
      directory of the installation.

   #. Build and install RSC Library

      .. code-block:: sh

         $ cd rsc/build
         $ cmake -DCMAKE_INSTALL_PREFIX=$prefix \
                 ..
         $ make
         $ make install
   #. Install |project| Protocol Definitions

      .. code-block:: sh

         $ cd protocol/build
         $ cmake -DCMAKE_INSTALL_PREFIX=$prefix \
                 ..
         $ make
         $ make install

      .. note::

         These protocol definitions are shared across programming
         languages.

   #. Build and install |project| C++ Core

      .. code-block:: sh

         $ cd core/build
         $ cmake -DCMAKE_INSTALL_PREFIX=$prefix \
                 -DRSC_DIR=$prefix/share/rsc    \
                 ..
         $ make
         $ make install

   .. important::

      The commands above only work, if all projects are installed into
      a common prefix (i.e. :samp:`{$prefix}`). Otherwise, locations of
      required dependencies have to be specified explicitly. For
      example:

      .. code-block:: sh

         $ cmake -DCMAKE_INSTALL_PREFIX=/opt/rsb                          \
                 -DRSC_DIR=/opt/rsc/share/rsc                             \
                 -DRSB_PROTOCOL_DIR=/opt/rsb-prototcol/share/rsb-protocol
                 ..
