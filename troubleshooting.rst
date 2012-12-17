.. _troubleshooting:

=================
 Troubleshooting
=================

.. _troubleshooting-spread-does-not-work:

Spread Does not Work
====================

Problem *(applies to C++, Python)*

  Communication over :term:`Spread` does not work
  anymore. :term:`Spread` settings are ignored.

Solution

  Starting with version 0.7, |project| uses a :term:`transport`
  that implements a :ref:`custom TPC-based protocol
  <specification-socket>` to facilitate the easy use of the
  framework without dependencies on 3rd party libraries. In order
  to restore the previous behavior of using the :term:`Spread`
  :term:`transport`, the configuration needs to be changed.

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

     Lines 3 and 4 can be omitted to enable both :term:`transport`
     s in parallel.

  #. Locally for the current directory

     Create a |project| :ref:`configuration file <configuration>`
     |pwd_config_file| with the same contents as described above.

  #. For the current shell

     Set and export :envvar:`RSB_TRANSPORT_SPREAD_ENABLED` and
     :envvar:`RSB_TRANSPORT_SOCKET_ENABLED` :ref:`environment
     variables <common-environment-variables>` as follows:

     .. code-block:: sh

        $ export RSB_TRANSPORT_SPREAD_ENABLED=1
        $ export RSB_TRANSPORT_SOCKET_ENABLED=0

.. _troubleshooting-configuring-the-tcp-based-transport:

Configuring the TCP-based Transport
===================================

Problem *(applies to C++,Common Lisp,Python)*

  How can I :ref:`configure <configuration>` the TCP-based
  :term:`transport`?

Solution

  The TCP-based :term:`transport` can be :ref:`configured
  <configuration>` locally or globally by placing the following
  content in |system_config_file|, |user_config_file| or
  |pwd_config_file|:

  .. code-block:: ini

     [transport.socket]
     enabled = 1
     host    = HOSTNAME
     port    = 4444
     server  = auto

  :samp:`{HOSTNAME}` can be ``localhost`` (if all processes are
  going to run on the same node), a hostname or an IP address.

  .. note::

     The above configuration uses ``server = auto`` which causes
     the initial |project| process to create the specified server
     and subsequent processes to connect to that server.

.. _troubleshooting-linker-errors-at-runtime:

Linker Errors at Runtime
========================

Problem *(applies to C++)*

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

.. _troubleshooting-spread-warning-in-tools:

Spread Warning in Tools
=======================

Problem *(applies to Common Lisp)*

  When I start any of the :ref:`tools`, the following happens:

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

  Place one of the mentioned :term:`Spread` libraries (typically
  :file:`libspread.so.2.0`) on the system library search path or
  set :envvar:`LD_LIBRARY_PATH` appropriately.

.. _troubleshooting-missing-converters:

Missing Converters
==================

.. seealso::

  :ref:`tutorial-converters-register`
     Registering additional :term:`converters <converter>`

Problem *(applies to all implementations)*

  When a :term:`listener` in my component receives certain
  :term:`events <event>`, it crashes and complains about missing
  :term:`converters <converter>`. For example like this:

  .. parsed-literal::

     $ ./myconponent
     [...]
     terminate called after throwing an instance of '\ :cpp:class:`rsc::runtime::NoSuchObject`\ '
       what():  No :term:`converter` for :term:`wire-schema <wire schema>` or :term:`data-type <data type>` \`.rst.vision.Image'.
     Available :term:`converters <converter>`: {
       bool: \*rsb::converter::BoolConverter[wireType = std::string, wireSchema = bool, dataType = bool] at 0x9d0b80
       [...]
     }

Solution

  There can be several solutions to this problem.

  #. The :term:`listener` could receive unexpected :term:`events
     <event>`. This can be diagnosed using the :ref:`logger
     <logger>`. If the :term:`listener` does indeed receive unexpected
     :term:`events <event>`, the problem can be fixed by letting the
     offending :term:`informer` or the :term:`listener` itself operate
     on a different :term:`scope`.

  #. The :term:`converter` configuration could be wrong. If the
     :term:`listener` only receives expected :term:`events <event>`, it
     may be missing a suitable converter. This problem can be solved by
     registering a suitable :term:`converter`.

  #. The :term:`converter` registration could happen after the
     :term:`listener` has already been created. In that case, the
     :term:`listener` would use the "old" set of :term:`converters
     <converter>`.

.. _troubleshooting-polymorphic-informers:

Polymorphic Informers
=====================

Problem *(applies to C++)*

  I thought it is possible, to send different :term:`data types <data
  type>` through the same :term:`informer`. However, I get this error
  (also using :cpp:class:`rsb::InformerBase`)

   .. parsed-literal::

      terminate called after throwing an instance of '\ :cpp:class:`std::invalid_argument`\ '
      what(): Specified :term:`event` type :samp:`{PAYLOAD-TYPE}` does not match :term:`informer` type :samp:`{INFORMER-TYPE}`.
      Aborted (core dumped)

  .. note::

     In the actual error message, :samp:`{PAYLOAD-TYPE}` and
     :samp:`{INFORMER-TYPE}` would be the :term:`data type` of the
     :term:`payload` attempted to send and the specified :term:`data
     type` of the :term:`informer` respectively.

Solution

  This can be achieved by specifying the pseudo-type
  :cpp:class:`rsb::AnyType` as the :term:`data type` of the created
  :term:`informer`:

  .. literalinclude:: /../rsb-cpp/examples/informer/anyInformer.cpp
     :language:        c++
     :lines:           49-57
     :emphasize-lines: 51-21
     :linenos:

.. note::

   In all other |project| implementations, this kind of
   :term:`informer` can be created by specifying a builtin supertype
   such as ``Object`` (Java), ``object`` (Python) or ``t`` (Common
   Lisp) as the :term:`data type` of the :term:`informer`.
