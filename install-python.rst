.. _install-python:

===================================================
 Installing the Python Implementation of |project|
===================================================

Supported Interpreters
======================

* Python 2.x

Dependencies
============

Required Dependencies

* Python development tools
* setuptools
* Python implementation of `Google protocol buffers`_

Optional Dependencies

* `Spread`_, Version 4.0 or newer
* :term:`Spread` Python module

Installation of Dependencies on Debian-based Systems
----------------------------------------------------

.. code-block:: sh

   $ sudo apt-get python-setuptools python-dev python-protobuf

Installation of Dependencies on MacOS using Homebrew
----------------------------------------------------

For installing |project| and its dependencies from source on Darwin,
we recommend to use `Homebrew`_, an easy-to-use package manager for
MacOS.

.. code-block:: sh

   $ brew install cmake boost protobuf


Installation
============

#. Clone |project| and its immediate dependencies from the `git`_
   repository

   RSC
     "|version|" branch of https://code.cor-lab.org/git/rsc.git
   |project| Protocol
     |repository_versioned| protocol
   |project| Python
     |repository_versioned| python

#. Install RSC and the |project| protocol definitions as described
   :ref:`in the C++ installation instructions <install-cpp-rsb>`.

#. Create and edit :file:`setup.cfg`

   .. seealso::

      `Setuptools Documentation <http://docs.python.org/distutils/configfile.html>`_
        Documentation of the format of the :file:`setup.cfg` file

   Setuptools does not use command line arguments to configure
   projects. Instead a file called :file:`setup.cfg` in the project
   root is used.

   Replace ``protocolroot`` in section ``[proto]`` with the path to
   the |project| protocol files
   (e.g. :samp:`protocolroot={PREFIX}/share/rsbprotocol`). An
   exemplary :file:`setup.cfg` file could look like this:

   .. code-block:: ini

      [proto]
      protocolroot=/your/prefix/share/rsbprotocol
      [test]
      spread=/your/prefix/sbin/spread
      [coverage]
      spread=/your/prefix/sbin/spread

   .. note::

      The following |project|-specific options are recognized:

      ``protoc`` in section ``[proto]``

        The `Google protocol buffers`_ :program:`protoc` compiler used
        to generate code from the |project| protocol description. If
        not specified :envvar:`PATH` is used.

      ``format`` in section ``[doc]``

        Either ``html`` or ``pdf`` for the API documentation
        generation.

      ``verbose`` in section ``[doc]``

        Bool flag to control verbose output of the generation tool
        :program:`epydoc`.

      ``spread`` in sections ``[coverage]`` and ``[test]``

        Path to the :term:`Spread daemon` used for coverage generation
        and unit testing. :envvar:`PATH` is used if not specified.

#. Start building and installation

   .. code-block:: sh

      $ export PYTHONPATH=$prefix/lib/python2.X/site-packages # if you are install to /usr or /usr/local it must be dist-packages
      $ python setup.py build
      $ python setup.py install --prefix=$prefix

Adding Support for Spread
=========================

Install :term:`Spread` as described in the :ref:`C++ installation
instructions <install-spread>`.

Installation of the Spread module for Python
--------------------------------------------

.. warning::

   The version automatically installed by setuptools is not working.

#. Download sources from |spread_python_tarball|.
#. Extract the downloaded archive file and change to the
   :file:`SpreadModule-1.5spread4` directory
#. Edit :file:`setup.py` and set ``SPREAD_DIR`` to your installation
   prefix (e.g., :file:`/usr` or :file:`/your/prefix`)
#. Build and install

   .. code-block:: sh

      $ python setup.py build_ext --rpath $(prefix)/lib
      $ python setup.py install --prefix=$(prefix)


Testing the Installation
========================

.. seealso::

   :ref:`python:tut-invoking`
     How to configure and start the Python interpreter.

The following statement should succeed in a :program:`python` shell:

.. code-block:: python

   import rsb

.. note::

   It may be necessary to set :envvar:`PYTHONPATH` to
   :samp:`{PREFIX}/lib/python2.X/site-packages` as in the installation
   step above.
