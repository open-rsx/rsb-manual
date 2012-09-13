.. _common:

======================================================
 Common Commandline Options and Environment Variables
======================================================

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

      This option is only available in the Common Lisp implementation.

.. option:: --info-stream STREAM-NAME

   Stream to which information messages should be sent.  Allowed
   values for :samp:`{STREAM-NAME}`: ``stdout``, ``standard-output``,
   ``stderr``, ``error-output``, ``none``.  Default info stream is:
   ``error-output``

   .. note::

      This option is only available in the Common Lisp implementation.

.. option:: --log-level LEVEL

   Controls the amount of generated log output. Allowed values for
   :samp:`{LEVEL}`: ``off``, ``trace``, ``info``, ``warn`` and
   ``error``. Default log level is ``warn``.

   .. note::

      This option is only available in the Common Lisp implementation.

.. option:: --trace SPEC

   Trace specified things. This option can be supplied multiple times
   to trace multiple things. Each occurrence takes an individual
   :samp:`{SPEC}` which has to have one of the following forms:

   ``"PACKAGE"``

     Trace all functions in the package named :samp:`{PACKAGE}`.

     .. note::

        The double quotes and uppercase.

   ``FUNCTION-NAME``

     Trace the function named :samp:`{FUNCTION-NAME}`.

     .. note::

        No quotes, actual case of the function name.

   .. note::

      This option is only available in the Common Lisp implementation.

.. option:: --debug

   Enable debugging. This does the following things:

   * Set the log level such that debug output is emitted
   * Enable printing backtraces instead of just condition reports in
     case of unhandled error conditions
   * Optionally, application-specific debugging

   .. note::

      This option is only available in the Common Lisp implementation.

.. option:: --swank

   Start a `slime`_ listener. Swank will print the port it listens
   on. In addition, a file named :file:`./swank-port.txt` containing
   the port number is written.

   .. note::

      This option is only available in the Common Lisp implementation.

.. option:: --eval SEXP

   Evaluate :samp:`{SEXP}` as Lisp code. This option can be supplied
   multiple times. Code fragments are evaluated in the order in which
   they appear on the commandline.

   .. note::

      This option is only available in the Common Lisp implementation.

.. option:: --load FILE

   Load :samp:`{FILE}`. This option can be supplied multiple
   times. Files are loaded in the order in which they appear on the
   commandline.

   .. note::

      This option is only available in the Common Lisp implementation.

.. _error-options:

Error-handling-related Commandline Options
==========================================

.. option:: --on-error

   Specifies the high-level policy for handling errors. Possible
   policies are:

   abort

     Save and cleanup as much as possible, then terminate with
     unsuccessful result indication.

   continue

     Try to recover from errors and produce best-effort results.

     .. warning::

        This policy should only be used when the ongoing execution of
        some program is most important since it can lead to errors
        being overlooked.

   .. note::

      This option is only available in the Common Lisp implementation.

.. _idl-options:

IDL-related Commandline Options
===============================

.. option:: --idl-path DIRECTORIES, -I DIRECTORIES

   :samp:`{DIRECTORIES}` is a list of paths from which data
   definitions should be loaded. This option can be supplied multiple
   times.

   .. note::

      This option is only available in the Common Lisp implementation.

.. option:: --load-idl FILE-OR-GLOB-EXPRESSION, -l FILE-OR-GLOB-EXPRESSION

   Load data definition from :samp:`{FILE-OR-GLOB-EXPRESSION}`. If a
   glob expression is specified, in addition to the canonical globbing
   syntax, expressions of the form::

     SOMESTUFF/**/MORESTUFF

   can be used to search directories recursively. If the file
   designated by :samp:`{FILE-OR-GLOB-EXPRESSION}` depend on
   additional data definition files (i.e. contain ``import``
   statements), the list of directories supplied via the
   :option:`--idl-path` option is consulted to find these files. This
   option can be supplied multiple times.

   .. note::

      This option is only available in the Common Lisp implementation.

.. _common-environment-variables:

Common Environment Variables
============================

Plugins

  .. seealso::

     :ref:`specification-plugin`
        Details about :term:`plugins <plugin>`

  .. envvar:: RSB_PLUGINS_CPP_PATH

     A list of ``:``-separated directory names which should be
     searched to locate |project| :term:`plugins <plugin>`.

  .. envvar:: RSB_PLUGINS_CPP_LOAD

     A list of ``:``-separated :term:`plugin` names which should be
     loaded during |project| initialization.

  TODO other languages

In-process Transport

  .. seealso::

     :ref:`specification-inprocess`
        Details about the inprocess :term:`transport`

  .. envvar:: RSB_TRANSPORT_INPROCESS_ENABLED

     ``1``: Enable in-process :term:`transport` in this process;

     ``0``: Disable in-process :term:`transport` in this process.

Spread Transport

  .. seealso::

     :ref:`specification-spread`
        Details about the :term:`Spread` :term:`transport`

  .. envvar:: RSB_TRANSPORT_SPREAD_ENABLED

     ``1``: Enable :term:`Spread` :term:`transport` in this process.

     ``0``: Disable :term:`Spread` :term:`transport` in this process.

  .. envvar:: RSB_TRANSPORT_SPREAD_HOST

     Name or IP-address of the machine running the :term:`Spread
     daemon`.

     Allowed values: a hostname or IP-address.

  .. envvar:: RSB_TRANSPORT_SPREAD_PORT

     Port on which the :term:`Spread daemon` listens.

     Allowed values: a port number, i.e. an integer in the range [1,
     65535].

TCP-socket-based Transport

  .. seealso::

     :ref:`specification-socket`
        Details about the socket :term:`transport`

  .. envvar:: RSB_TRANSPORT_SOCKET_ENABLED

     ``1``: Enable TCP-socket-based :term:`transport` in this process.

     ``0``: Disable TCP-socket-based :term:`transport` in this
     process.

  .. envvar:: RSB_TRANSPORT_SOCKET_HOST

     Name or IP-address of the machine running the |project|
     TCP-socket-based server component.

     Allowed values: a hostname or IP-address.

  .. envvar:: RSB_TRANSPORT_SOCKET_PORT

     Port on which the |project| TCP-socket-based server component
     listens.

     Allowed values: a port number, i.e. an integer in the range [1,
     65535].

  .. envvar:: RSB_TRANSPORT_SOCKET_SERVER

     ``1``: This process should act the |project| TCP-socket-based
     server component.

     ``0``: This process should connect to the TCP-socket-based
     server.

     ``auto``: This process should try to determine whether there
     already is a TCP-socket-based server for the configured host-port
     combination and act as a server or client accordingly.
