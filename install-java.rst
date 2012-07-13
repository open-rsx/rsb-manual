.. _install-java:

================================================
 Installing the Java Implementation of |project|
================================================

Prerequisites
=============

Supported Java Version
----------------------

* Oracle Java Platform, Standard Edition 6

Other combinations may be possible but are currently untested.

Required Dependencies
-------------------------

* `Google Protocol Buffers`_

  * |ubuntu| (Lucid) packages (``libprotobuf-dev``,
    ``protobuf-compiler``) are ok
    
* `Apache Ant`_

* Daemon program of the `Spread`_ group communication system

  * Version 4.0 or newer to utilize the Spread transport
  * The |ubuntu| (Lucid) package does **not** work (since it contains
    the outdated version 3)
    
* `CMake`_, Version 2.8 or newer for RSB protocol compilation

Optional Dependencies
---------------------

Building without these is possible, but some features will be missing.

* `Javadoc`_

.. note::
  
  The Java implementation of RSB depends on RSB's language independent network protocol specification. This specification is 
  maintained in the RSB protocol sub-project of RSB. This and its transitive dependencies (except Spread) should already
  be installed on your system if followed the C++ installation guidelines. If RSB C++ is already installed on your system, 
  you may thus skip the following dependency installation section and proceed to the Installation of RSBJava section.
  

Installation of Dependencies on Debian-based Systems
----------------------------------------------------

.. code-block:: sh

   $ sudo apt-get install libprotobuf-dev protobuf-compiler build-essential cmake
   
Installation of Dependencies on MacOS using Homebrew
----------------------------------------------------

For installing RSB and its dependencies from source on Darwin, 
we recommend to use `Homebrew <http://mxcl.github.com/homebrew/>`_, 
an easy-to-use package manager for MacOS.

.. code-block:: sh

   $ brew install cmake protobuf

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

Installation of RSC and RSBProtocol
-----------------------------------

   RSC
     https://code.cor-lab.org/svn/rsc/trunk/rsc
   |project| Protocol
     |repository_versioned|/protocol


#. Build and install the RSC C++ library and the RSB Protocol library in
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


Installation of RSBJava
=======================

#. Checkout |project| and its immediate dependencies from the
   Subversion repository

   |project| C++
     |repository_versioned|/java/core

#. Invoke ``ant`` supplying build properties on the commandline or via ``build.properties`` (see below)

	The following properties are used to configure the build:
	
	==================  ===================================================================  ================================
	Ant Property        Meaning                                                              Example
	==================  ===================================================================  ================================
	``env.prefix``      Location into which RSB should be installed                          ``/vol/cit/share``
	``pbuf.protoc``     Location of protocol buffer compiler (``protoc`` or ``protoc.exe``)  ``/usr/bin/protoc``
	``pbuf.protopath``  Location of RSB protocol IDL files (see TODO)                        ``/vol/cit/share/rsbprotocol``
	``pbuf.lib``        Location of Java protocol buffer runtime library                     ``/usr/share/java/protobuf.jar``
	``spread.daemon``   Location of Spread Daemon Executable                                 ``/vol/cit/sbin/spread``
	==================  ===================================================================  ================================
	
	All properties can be supplied on the ``ant`` commandline using the ``-DNAME=VALUE`` syntax or by creating a ``build.properties`` file 
	containing lines of the form ``NAME = VALUE``.
	
	An exemplary ``ant dist`` command, which builds the RSB jar library, may look as follows:

	.. code-block:: sh
	
		$ ant -Dpbuf.protoc=/usr/bin/protoc -Dpbuf.protopath=/vol/cit/share/rsbprotocol -Dpbuf.lib=/usr/share/java/protobuf.jar -Dspread.daemon=/vol/cit/sbin/spread dist

	The equivalent ``build.properties`` file looks like this:

	.. code-block:: sh
	
		pbuf.protoc = /usr/bin/protoc
		pbuf.protopath = /vol/cit/share/rsbprotocol
		pbuf.lib = /usr/share/java/protobuf.jar
		spread.daemon = /vol/cit/sbin/spread

	In the presence of this file, the @ant@ command reduces to ``ant dist``.

#. Installation of Java archive

	To install RSB jars into the configured prefix (e.g., into ``${prefix}/share/java``), the following ``ant` command can be used:
	
	.. code-block:: sh
	
		$ ant install
		
Testing of the Installation
===========================

RSBJava comes with a set of unit tests, which you may use to check your freshly compiled RSBJava version. Executing the test suite is straightforward.
To do so, the following ``ant`` target needs to be invoked (please note that a spread daemon is automatically started by the ant script):

.. code-block:: sh

	$ ant test

You should see a console output similar to the following (shortened excerpt):

.. code-block:: sh

	ubi-1-165-178:RSBJava swrede$ ant -Dpbuf.protoc=/opt/local/bin/protoc -Dpbuf.protopath=/vol/cit/share/RSBProtocol -Dpbuf.lib=/opt/local/share/java/protobuf.jar -Dspread.daemon=/vol/cit/sbin/spread test
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

If no failed test cases are reported, RSBJava works correctly on your machine. 
