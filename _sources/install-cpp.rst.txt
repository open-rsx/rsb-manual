.. _install-cpp:

====================
 C++ Implementation
====================

Supported Operating Systems and Compilers
=========================================

* Linux (GCC 4.x)
* MacOS (GCC 4.x, LLVM/clang 3.1)
* Windows (MS Visual Studio 9 2008)
* Windows (MS Visual Studio 10 20??)

Other combinations may be possible but are currently untested.

Dependencies
============

Required Dependencies

* `Boost`_, Version 1.38 or newer
* `Boost.UUID`_

  * Header-only library
  * Included in `Boost`_ since version 1.42
  * Headers from this version can be used with all older versions of
    `Boost`_
* `Google Protocol Buffers`_

  * |ubuntu| (Lucid) packages (``libprotobuf-dev``,
    ``protobuf-compiler``) are ok
* `CMake`_, Version 2.8 or newer

Optional Dependencies (building without these is possible, but some
features will be missing)

* `Spread`_, Version 4.0 or newer

  * The |ubuntu| (Lucid) package does **not** work (since it contains
    the outdated version 3)
* `Doxygen`_ for generation of API documentation
* `Lcov`_ for code coverage analysis
* `cppcheck`_ for static code analysis

Installation of Dependencies on Debian-based Systems
----------------------------------------------------

.. code-block:: sh

   $ sudo apt-get install libprotobuf-dev protobuf-compiler build-essential libboost-dev


Installation of Dependencies on MacOS using Homebrew
----------------------------------------------------

For installing |project| and its dependencies from source on Darwin,
we recommend to use `Homebrew`_, an easy-to-use package manager for
MacOS.

.. code-block:: sh

   $ brew install cmake boost protobuf

.. _install-spread:

Installation of the Spread Toolkit
----------------------------------

:term:`Spread`, is a powerful transport layer which is natively
supported in |project|. To install :term:`Spread`, source archives are
available after registration for download
|spread_tarball|. Installation of Spread is straightforward on MacOS
and Linux as it has no external dependencies and comes with a standard
configuration script.

.. note::

    In the following sections, :samp:`{prefix}` specifies the target
    directory of the installation.

.. code-block:: sh

   $ tar xzf spread-src-4.1.0.tar.gz
   $ cd spread-src-4.1.0
   $ ./configure --prefix=$prefix
   $ make
   $ make install

.. _install-cpp-rsb:

Installation of RSC, RSBProtocol and |project|
==============================================

#. Clone |project| and its immediate dependencies from the `git`_
   repository

   RSC
     "|branch|" branch of https://code.cor-lab.de/git/rsc.git
   |project| Protocol
     |repository_versioned_protocol|
   |project| C++
     |repository_versioned_cpp|
   Optionally: |project| C++ :term:`Spread` plugin (in case you want to use the spread transport)
     |repository_versioned_spread_cpp|


#. Build and install the C++ implementation of |project| and its
   dependencies in the order given below:

   #. Build and install RSC Library

      .. parsed-literal::

         $ cd rsc
         $ mkdir -p build && cd build
         $ cmake -DCMAKE_INSTALL_PREFIX=\ :samp:`{PREFIX}` ..
         $ make install

   #. Install |project| Protocol Definitions

      .. parsed-literal::

         $ cd rsb.git.protocol
         $ mkdir -p build && cd build
         $ cmake -DCMAKE_INSTALL_PREFIX=\ :samp:`{PREFIX}` ..
         $ make install

      .. note::

         These protocol definitions are shared across programming
         languages.

   #. Build and install the C++ implementation of |project|

      .. code-block:: sh

         $ cd rsb.git.cpp
         $ mkdir -p build && cd build
         $ cmake -DCMAKE_INSTALL_PREFIX=$prefix ..
         $ make install

   #. Optionally, build and install the C++ :term:`Spread` plugin  of |project|

      .. code-block:: sh

         $ cd rsb.git.spread-cpp
         $ mkdir -p build && cd build
         $ cmake -DCMAKE_INSTALL_PREFIX=$prefix ..
         $ make install

   .. important::

      The commands above only work, if all projects are installed into
      a common prefix (i.e. :samp:`{PREFIX}`). Otherwise, locations of
      required dependencies have to be specified explicitly. For
      example:

      .. code-block:: sh

         $ cmake -DCMAKE_INSTALL_PREFIX=/opt/rsb                          \
                 -DRSC_DIR=/opt/rsc/share/rsc                             \
                 -DRSBProtocol_DIR=/opt/rsb-prototcol/share/rsb-protocol \
                 ..
