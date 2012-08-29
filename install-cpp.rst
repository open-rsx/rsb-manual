.. _install-cpp:

================================================
 Installing the C++ Implementation of |project|
================================================

Prerequisites
=============

Supported Operating Systems and Compilers
-----------------------------------------

* Linux (GCC 4.x)
* MacOS (GCC 4.x, LLVM/clang 3.1)
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


Installation of Dependencies on MacOS using Homebrew
----------------------------------------------------

For installing RSB and its dependencies from source on Darwin,
we recommend to use `Homebrew <http://mxcl.github.com/homebrew/>`_,
an easy-to-use package manager for MacOS.

.. code-block:: sh

   $ brew install cmake boost protobuf

Installation of the Spread Toolkit
----------------------------------

`The Spread Toolkit <http://www.spread.org/>`_, a group communication framework
for reliable multicast communication, is a powerful transport layer which is natively supported in RSB.
To install Spread, source archives are available after registration for download
`here <http://www.spread.org/download/spread-src-4.1.0.tar.gz>`_. Installation of the Spread Toolkit
is straightforward on MacOS and Linux as it has no external dependencies and comes with a standard
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

Installation of RSC, RSBProtocol and |project|
==============================================

#. Checkout |project| and its immediate dependencies from the
   Subversion repository

   RSC
     https://code.cor-lab.org/git/rsc.git
   |project| Protocol
     |repository_versioned|/rsb-protocol
   |project| C++
     |repository_versioned|/rsb-cpp


#. Build and install the |project| C++ core and its dependencies in
   the order given below:

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
