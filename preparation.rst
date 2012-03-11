.. _preparation:

=============
 Preparation
=============

Installing |project|
====================

There are currently two ways to install the |version| version of
|project|:

* Binary downloads (only for :ref:`tools <tools>`)
* Debian packages
* From source

Binary Downloads of |project| Tools
-----------------------------------

#. Download the ``tools`` binary from the appropriate location:

   * `Linux i686 <https://ci.cor-lab.de/job/rsb-tools-cl-0.6/label=ubuntu_lucid_32bit/>`_
   * `Linux x86_64 <https://ci.cor-lab.de/job/rsb-tools-cl-0.6/label=ubuntu_lucid_64bit/>`_
   * `MacOS x86_64 <https://ci.cor-lab.de/job/rsb-tools-cl-0.6/label=MAC_OS_lion_64bit/>`_

#. After the download, the ``tools`` file has to be made executable in
   most cases. This can be done for example by executing

   .. code-block:: sh

     chmod +x bag

   in the download directory.

#. The various ``tools-*`` tools are provided as `symbolic links
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

   TODO

Debian Packages
---------------

Debian packages for several versions of |ubuntu| are available from
the `CoR-Lab package repository
<http://packages.cor-lab.de/ubuntu/dists/>`_. The following repository
source line has to be added to ``/etc/apt/sources.list``::

  deb http://packages.cor-lab.de/ubuntu/ RELEASENAME testing

where :samp:`RELEASENAME` is the appropriate Ubuntu release name.

.. warning::

   This installation method only works with |ubuntu|.

.. note::

   More information can be found `here
   <https://support.cor-lab.org/projects/ciserver/wiki/RepositoryUsage>`_.

Running the Examples
====================

TODO

.. _troubleshooting:

Troubleshooting
===============

#. Problem

     Calling any of the :ref:`tools <tools>`, the following happens:

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
     library search path or set ``LD_LIBRARY_PATH`` appropriately.
