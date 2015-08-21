.. _install-java:

=====================
 Java Implementation
=====================

Supported Java Version
======================

* Oracle Java Platform, Standard Edition 6

Other Java platform SDKs may be applicable but are currently untested.

Dependencies
============

Required Dependencies

* `Google Protocol Buffers`_

  * |ubuntu| packages (``libprotobuf-java``,
    ``protobuf-compiler``) are OK

* `Apache Ant`_ / `Maven`_

* :term:`Spread daemon`

  * Version 4.0 or newer to utilize the :term:`Spread`
    :term:`transport`
  * The |ubuntu| package does **not** work (since it
    contains the outdated version 3)

* `CMake`_, version 2.8 or newer for |project| protocol compilation

Optional Dependencies (building without these is possible, but some
features will be missing)

* `Javadoc`_

.. important::

   The Java implementation of |project| depends on |project|'s
   language independent network protocol specification. This
   specification is maintained in the |project| protocol
   sub-project. This project and its transitive dependencies should
   already be installed on your system if you followed the :ref:`C++
   installation guidelines <install-cpp>` . If the C++ implementation
   of |project| is already installed, you can skip the section
   `Installation of Dependencies on Debian-based Systems`_ and proceed
   to the `Installation of RSBJava`_ section.

Installation of Dependencies on Debian-based Systems
----------------------------------------------------

.. code-block:: sh

   $ sudo apt-get install libprotobuf-java protobuf-compiler build-essential cmake

Installation of Dependencies on MacOS using Homebrew
----------------------------------------------------

For installing |project| and its dependencies from source on Darwin,
we recommend to use `Homebrew`_, an easy-to-use package manager for
MacOS.

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

.. parsed-literal::

   $ tar xzf spread-src-4.1.0.tar.gz
   $ cd spread-src-4.1.0
   $ ./configure --prefix=\ :samp:`{PREFIX}`
   $ make
   $ make install

Installation of RSC and RSBProtocol
-----------------------------------

#. Obtain the source code:

   RSC
     "|branch|" branch of https://code.cor-lab.org/git/rsc.git

   |project| Protocol
     |repository_versioned_protocol|

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


Installation of RSBJava
=======================

#. Checkout |project| and its immediate dependencies from
   |repository_versioned_java|.

#. Run :file:`mvnprep.sh` which resides inside the repository root folder

.. code-block:: sh

   $ cd rsb.git.java
   $ ./mvnprep.sh

#. Invoke :program:`mvn` supplying build properties on the command-line

   The following properties are used to configure the build:

   ==================  =================================================================================  ====================================
   Maven Property        Meaning                                                                            Example
   ==================  =================================================================================  ====================================
   ``pbuf.protoc``     Location of protocol buffer compiler (:program:`protoc` or :program:`protoc.exe`)  :file:`/usr/bin/protoc`
   ``pbuf.protopath``  Location of |project| protocol IDL files (see TODO)                                :file:`/vol/cit/share/rsbprotocol`
   ``spread.daemon``   Location of :term:`Spread daemon` executable                                       :file:`/vol/cit/sbin/spread`
   ==================  =================================================================================  ====================================

   All properties can be supplied on the :program:`mvn` command-line
   using the :samp:`-D{NAME}={VALUE}` syntax.

   An exemplary ``mvn clean package`` command, which builds the |project| jar
   library, may look as follows:

   .. code-block:: sh

      $ mvn clean package                               \
            -Dpbuf.protoc=/usr/bin/protoc               \
            -Dpbuf.protopath=/vol/cit/share/rsbprotocol \
            -Dspread.daemon=/vol/cit/sbin/spread

#. Installation of Java archive

   To install |project| jars into the your user's maven repository (i.e.
   :file:`~/.m2`), use this command:

   .. code-block:: sh

      $ mvn clean install                               \
            -Dpbuf.protoc=/usr/bin/protoc               \
            -Dpbuf.protopath=/vol/cit/share/rsbprotocol \
            -Dspread.daemon=/vol/cit/sbin/spread

Testing the Maven Installation
==============================

The Java implementation of |project| comes with a set of unit tests,
which you may use to check the compiled code. Executing the test suite
is straightforward.  To do so, the following :program:`mvn` target
needs to be invoked (please note that a :term:`Spread daemon` is
automatically started by the :program:`mvn` script):

.. code-block:: sh

   $ mvn test                                        \
         -Dpbuf.protoc=/opt/local/bin/protoc         \
         -Dpbuf.protopath=/vol/cit/share/RSBProtocol \
         -Dspread.daemon=/vol/cit/sbin/spread


You should see a console output similar to the following (shortened
excerpt):

.. code-block:: sh

   $ mvn test                                        \
         -Dpbuf.protoc=/opt/local/bin/protoc         \
         -Dpbuf.protopath=/vol/cit/share/RSBProtocol \
         -Dspread.daemon=/vol/cit/sbin/spread

   [INFO] Scanning for projects...
   [INFO]
   [INFO] ------------------------------------------------------------------------
   [INFO] Building RSB 0.11-SNAPSHOT
   [INFO] ------------------------------------------------------------------------
   [INFO]
   .
   ..
   ...


   Results :

   Tests run: 175, Failures: 0, Errors: 0, Skipped: 0

   [INFO]
   [INFO] --- jacoco-maven-plugin:0.6.3.201306030806:report (post-unit-test) @ rsb ---
   [INFO] ------------------------------------------------------------------------
   [INFO] BUILD SUCCESS
   [INFO] ------------------------------------------------------------------------
   [INFO] Total time: 27.010s
   [INFO] Finished at: Wed Jan 29 19:59:08 CET 2014
   [INFO] Final Memory: 25M/193M
   [INFO] ------------------------------------------------------------------------
        [exec] Result: 143

If no failed test cases are reported, the Java implementation of
|project| is likely to work correctly on your machine.
