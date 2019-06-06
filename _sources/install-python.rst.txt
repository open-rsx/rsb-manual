.. _install-python:

=======================
 Python Implementation
=======================

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

Installation of Dependencies on Windows Systems
-----------------------------------------------

Install Microsoft Visual Studio. If you are planning to use the Python
implementation of |project|, only version 2008 currently works.

In order to install `Spread`_ a source-based installation is required.
The visual studio solution for `Spread`_ 4.2 is currently broken. Hence only
version 4.1 can be used.

In detail, perform the following steps:

#. Open :file:`spread.sln` in the ``win32`` folder of the spread archive with
   Visual Studio.
#. Set the active configuration to ``release``.
#. Build ``libspread`` and ``spread``. If you build the whole solution errors
   might appear. However, only the aforementioned artifacts are required.
#. Optionally, manually copy the generated ``.lib`` and ``.exe`` to an
   installation prefix.

Python can be installed using the binary installer. A 32 bit version is
recommended.

Installation
============

#. Clone |project| and its immediate dependencies from the `git`_
   repository

   RSC
     "|branch|" branch of https://code.cor-lab.de/git/rsc.git
   |project| Protocol
     |repository_versioned_protocol|
   |project| Python
     |repository_versioned_python|

#. Install RSC and the |project| protocol definitions as described
   :ref:`in the C++ installation instructions <install-cpp-rsb>`.

#. Create and edit :file:`setup.cfg`

   .. seealso::

      `Setuptools Documentation <http://docs.python.org/distutils/configfile.html>`_
        Documentation of the format of the :file:`setup.cfg` file

   Setuptools does not use command line arguments to configure
   projects. Instead a file called :file:`setup.cfg` in the project
   root is used.

   Add or replace ``protocolroot`` in section ``[proto]`` with the path
   to the |project| protocol files
   (e.g. :samp:`protocolroot={PREFIX}/share/rsbprotocol`). An
   exemplary :file:`setup.cfg` file could look like this:

   .. code-block:: ini

      # [existing content here]

      [proto]
      protocolroot=/your/prefix/share/rsbprotocol

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

#. Start building and installation

   .. parsed-literal::

      $ export PYTHONPATH=\ :samp:`{PREFIX}`/lib/python2.\ :samp:`{VERSION}`/site-packages # if you are install to /usr or /usr/local it must be dist-packages
      $ python setup.py build
      $ python setup.py install --prefix=\ :samp:`{PREFIX}`

Adding Support for Spread
=========================

Install :term:`Spread` as described in the :ref:`C++ installation
instructions <install-spread>`.

Installation of the Spread module for Python
--------------------------------------------

.. warning::

   The `Spread`_ Python version automatically installed by setuptools is not
   working.

#. Download sources from |spread_python_tarball|.
#. Extract the downloaded archive file and change to the
   :file:`SpreadModule-1.5spread4` directory
#. Edit :file:`setup.py` and set ``SPREAD_DIR`` to your installation
   prefix (e.g., :file:`/usr`, :file:`/your/prefix` or :file:`c:\\code\\spread`)

   .. note::

      On Windows it might also be necessary to change the following aspects of
      the :file:`setup.py`:

      .. code-block:: python

         include_dirs = [SPREAD_DIR + r"\include"],
         library_dirs = [SPREAD_DIR + r"\lib\win32"],
         libraries = ['libspread', 'wsock32'],
         # comment out
         #extra_link_args = ['/NODEFAULTLIB:libcmt'],

#. Build and install

   .. parsed-literal::

      $ python setup.py build_ext --rpath :samp:`{PREFIX}`/lib
      $ python setup.py install --prefix=\ :samp:`{PREFIX}`

   .. note::

      It might be that the ``--rpath`` option needs to be removed on Windows.

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
