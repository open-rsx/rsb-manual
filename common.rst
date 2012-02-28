.. _common:

========
 Common
========

.. _common-options:

Common Commandline Options
==========================

.. program:: common

Unless stated otherwise, the following commandline options are
accepted by all tools:

.. option:: --version

   Print version information and exit.

.. option:: --help, -h

   Print this help and exit.

.. option:: --help-for THING

   Print help for :samp:`{THING}` and exit. This option can be
   specified multiple times.

   .. note::

      Only available in the Common Lisp implementation.

.. option:: --log-level LEVEL

   Controls the amount of generated log output. Allowed values for
   :samp:`{LEVEL}`: ``off``, ``trace``, ``info``, ``warn`` and
   ``error``. Default log level is ``warn``.

   .. note::

      Only available in the Common Lisp implementation.

.. option:: --trace SPEC

   Trace specified things. This option can be supplied multiple times
   to trace multiple things. Each occurrence takes an individual
   :samp:`{SPEC}` which has to have one of the following forms:

   * ``"PACKAGE"`` (note the double quotes and uppercase): trace all
     functions in the package named :samp:`{PACKAGE}`.
   * ``FUNCTION-NAME`` (note: no quotes, actual case of the function
     name): trace the named function.

   .. note::

      Only available in the Common Lisp implementation.

.. option:: --debug

   Enable debugging. This does the following things:

   * Set the log level such that debug output is emitted
   * Enable printing backtraces instead of just condition reports in
     case of unhandled error conditions
   * Optionally, application-specific debugging

   .. note::

      Only available in the Common Lisp implementation.

.. option:: --swank

   Start a `swank <http://common-lisp.net/project/slime/>`_
   listener. Swank will print the port it listens on. In addition, a
   file named ``./swank-port.txt`` containing the port number is
   written.

   .. note::

      Only available in the Common Lisp implementation.

.. _common-environment-variables:

Common Environment Variables
============================

.. envvar:: RSB_TRANSPORT_INPROCESS_ENABLED

   ``1``: enable in-process :term:`transport` in this process; ``0``:
   disabled in-process :term:`transport` in this process.

.. envvar:: RSB_TRANSPORT_SPREAD_ENABLED

   ``1``: enable :term:`Spread` :term:`transport` in this process;
   ``0``: disabled :term:`Spread` :term:`transport` in this process.

.. envvar:: RSB_TRANSPORT_SPREAD_HOST

   Name or IP-address of the machine running the :term:`Spread
   daemon`.

.. envvar:: RSB_TRANSPORT_SPREAD_PORT

   Port on which the :term:`Spread daemon` listens.

.. envvar:: RSB_TRANSPORT_SOCKET_ENABLED

   ``1``: enable TCP-socket-based :term:`transport` in this process; ``0``:
   disabled TCP-socket-based :term:`transport` in this process.

.. envvar:: RSB_TRANSPORT_SOCKET_HOST

   Name or IP-address of the machine running the |project|
   TCP-socket-based server component.

.. envvar:: RSB_TRANSPORT_SOCKET_PORT

   Port on which the Socket daemon listens.

.. envvar:: RSB_TRANSPORT_SOCKET_SERVER

   ``1``: this process should act the |project| TCP-socket-based
   server component; ``0``: this process should connect to the
   TCP-socket-based server; ``auto``: this process should try to
   determine whether there already is a TCP-socket-based server for
   the configured host-port combination and act as a server or client
   accordingly.
