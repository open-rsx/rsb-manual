.. _install-java:

================================================
 Installing the Java Implementation of |project|
================================================

Prerequisites
=============

Supported Java Version
----------------------

* Oracle Java Platform, Standard Edition 6

Other Java platform SDKs may be applicable but are currently untested.

Required Dependencies
---------------------

* `Google Protocol Buffers`_

  * |ubuntu| (Lucid) packages (``libprotobuf-dev``,
    ``protobuf-compiler``) are ok

* `Apache Ant`_

* :term:`Spread daemon`

  * Version 4.0 or newer to utilize the :term:`Spread`
    :term:`transport`
  * The |ubuntu| (Lucid) package does **not** work (since it contains
    the outdated version 3)

* `CMake`_, version 2.8 or newer for |project| protocol compilation

Optional Dependencies
---------------------

Building without these is possible, but some features will be missing.

* `Javadoc`_

.. note::

  The Java implementation of |project| depends on |project|'s language
  independent network protocol specification. This specification is
  maintained in the |project| protocol sub-project. This project and
  its transitive dependencies (except Spread) should already be
  installed on your system if you followed the :ref:`C++ installation
  guidelines <install-cpp>` . If the C++ implementation of |project|
  is already installed, you can skip the section `Installation of
  Dependencies on Debian-based Systems`_ and proceed to the
  `Installation of RSBJava`_ section.


Installation of Dependencies on Debian-based Systems
----------------------------------------------------

.. code-block:: sh

   $ sudo apt-get install libprotobuf-dev protobuf-compiler build-essential cmake

Installation of Dependencies on MacOS using Homebrew
----------------------------------------------------

For installing |project| and its dependencies from source on Darwin,
we recommend to use `Homebrew <http://mxcl.github.com/homebrew/>`_, an
easy-to-use package manager for MacOS.

.. code-block:: sh

   $ brew install cmake protobuf

Installation of the Spread Toolkit
----------------------------------

To install :term:`Spread`, source archives are available after
registration for download at |spread_tarball|. Installation of
:term:`Spread` is straightforward on MacOS and Linux as it has no
external dependencies and comes with a standard configuration script.

.. note::

   In the following sections, :samp:`{PREFIX}` specifies the target
   directory of the installation.

.. code-block:: sh

   $ tar xzf spread-src-4.1.0.tar.gz
   $ cd spread-src-4.1.0
   $ ./configure --prefix=PREFIX
   $ make
   $ make install

Installation of RSC and RSBProtocol
-----------------------------------

#. Obtain the source code:

   RSC
     https://code.cor-lab.org/svn/rsc/trunk/rsc

   |project| Protocol
     |repository_versioned|/protocol

#. Build and install RSC Library

   .. code-block:: sh

      $ cd rsc/build
      $ cmake -DCMAKE_INSTALL_PREFIX=PREFIX \
              ..
      $ make
      $ make install

#. Install |project| Protocol Definitions

   .. code-block:: sh

      $ cd protocol/build
      $ cmake -DCMAKE_INSTALL_PREFIX=PREFIX \
              ..
      $ make
      $ make install

   .. note::

      These protocol definitions are shared across programming
      languages.


Installation of RSBJava
=======================

#. Checkout |project| and its immediate dependencies from the
   Subversion repository

   |repository_versioned|/java/core

#. Invoke :program:`ant` supplying build properties on the commandline
   or via file:`build.properties` (see below)

   The following properties are used to configure the build:

   ==================  =================================================================================  ====================================
   Ant Property        Meaning
   Example
   ==================  =================================================================================  ====================================
   ``env.prefix``      Location into which |project| should be installed                                  :file:`/vol/cit/share`
   ``pbuf.protoc``     Location of protocol buffer compiler (:program:`protoc` or :program:`protoc.exe`)  :file:`/usr/bin/protoc`
   ``pbuf.protopath``  Location of |project| protocol IDL files (see TODO)                                :file:`/vol/cit/share/rsbprotocol`
   ``pbuf.lib``        Location of Java protocol buffer runtime library                                   :file:`/usr/share/java/protobuf.jar`
   ``spread.daemon``   Location of :term:`Spread daemon` executable                                       :file:`/vol/cit/sbin/spread`
   ==================  =================================================================================  ====================================

   All properties can be supplied on the :program:`ant` commandline
   using the :samp:`-D{NAME}={VALUE}` syntax or by creating a
   :file:`build.properties` file containing lines of the form
   :samp:`{NAME} = {VALUE}`.

   An exemplary ``ant dist`` command, which builds the |project| jar
   library, may look as follows:

   .. code-block:: sh

      $ ant -Dpbuf.protoc=/usr/bin/protoc               \
            -Dpbuf.protopath=/vol/cit/share/rsbprotocol \
            -Dpbuf.lib=/usr/share/java/protobuf.jar     \
            -Dspread.daemon=/vol/cit/sbin/spread        \
            dist

   The equivalent :file:`build.properties` file looks like this:

   .. code-block:: ini

      pbuf.protoc = /usr/bin/protoc
      pbuf.protopath = /vol/cit/share/rsbprotocol
      pbuf.lib = /usr/share/java/protobuf.jar
      spread.daemon = /vol/cit/sbin/spread

   In the presence of this file, the :program:`ant` command reduces to
   ``ant dist``.

#. Installation of Java archive

   To install |project| jars into the configured prefix (e.g., into
   :samp:`{PREFIX}/share/java`), the following :program:`ant` command
   can be used:

   .. code-block:: sh

      $ ant install

Testing the Installation
========================

The Java implementation of |project| comes with a set of unit tests,
which you may use to check the compiled code. Executing the test suite
is straightforward.  To do so, the following :program:`ant` target
needs to be invoked (please note that a :term:`Spread daemon` is
automatically started by the :program:`ant` script):

.. code-block:: sh

   $ ant test

You should see a console output similar to the following (shortened
excerpt):

.. code-block:: sh

   $ ant -Dpbuf.protoc=/opt/local/bin/protoc           \
         -Dpbuf.protopath=/vol/cit/share/RSBProtocol   \
         -Dpbuf.lib=/opt/local/share/java/protobuf.jar \
         -Dspread.daemon=/vol/cit/sbin/spread          \
         test
   Buildfile: /Users/swrede/Workspace/RSBJava/build.xml

   init:
        [echo] Using pbuf: /opt/local/share/java/protobuf.jar
        [echo] Test report dir: /Users/swrede/Workspace/RSBJava/testreports

   protocol:

   compile:
       [javac] /Users/swrede/Workspace/RSBJava/build.xml:105: warning: 'includeantruntime' was not set, defaulting to build.sysclasspath=last; set to false for repeatable builds
       [javac] Compiling 1 source file to /Users/swrede/Workspace/RSBJava/build/classes
       [javac] /Users/swrede/Workspace/RSBJava/build.xml:110: warning: 'includeantruntime' was not set, defaulting to build.sysclasspath=last; set to false for repeatable builds
       [javac] Compiling 1 source file to /Users/swrede/Workspace/RSBJava/build/examples

   test-compile:
       [javac] Compiling 25 source files to /Users/swrede/Workspace/RSBJava/build/test

   test:
       [junit] Running rsb.DefaultErrorHandlerTest
       [junit] Testsuite: rsb.DefaultErrorHandlerTest
       [junit] Tests run: 1, Failures: 0, Errors: 0, Time elapsed: 0,083 sec
       [junit] Tests run: 1, Failures: 0, Errors: 0, Time elapsed: 0,083 sec
       [junit] ------------- Standard Error -----------------
       [junit] 05.09.2011 11:12:38 rsb.DefaultErrorHandler warning
       [junit] SCHWERWIEGEND: A warning was reported to the ErrorHandler: java.lang.RuntimeException: test
       [junit] 05.09.2011 11:12:38 rsb.DefaultErrorHandler error
       [junit] SCHWERWIEGEND: An error was reported to the ErrorHandler: java.lang.RuntimeException: test
       [junit] ------------- ---------------- ---------------

   <output of more tests omitted>

       [junit] Running rsb.util.UUIDToolsTest
       [junit] Testsuite: rsb.util.UUIDToolsTest
       [junit] Tests run: 2, Failures: 0, Errors: 0, Time elapsed: 0,164 sec
       [junit] Tests run: 2, Failures: 0, Errors: 0, Time elapsed: 0,164 sec
       [junit]
       [junit] Testcase: testGetNameBasedUUID took 0,069 sec
       [junit] Testcase: testByteArrayConversion took 0,001 sec

   BUILD SUCCESSFUL
   Total time: 48 seconds

If no failed test cases are reported, the Java implementation of
|project| is likely to work correctly on your machine.
