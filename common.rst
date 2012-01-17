.. _common-options:

Common Commandline Options
==========================

.. program:: common

The following commandline options are accepted by all tools:

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

.. option:: --trace SPEC, -t SPEC

   Trace specified things. This option can be supplied multiple times
   to trace multiple things. Each occurrence takes an individual
   :samp:`{SPEC}` which has to have one of the following forms:

   * ``"PACKAGE"`` (note the double quotes and uppercase): trace all
     functions in the package named :samp:`{PACKAGE}`.
   * ``FUNCTION-NAME`` (note: no quotes, actual case of the function
     name): trace the named function.

   .. note::

      Only available in the Common Lisp implementation.

.. option:: --debug, -d

   Enable debugging. This does the following things:

   * Set the log level such that debug output is emitted
   * Enable printing backtraces instead of just condition reports in
     case of unhandled error conditions.

   .. note::

      Only available in the Common Lisp implementation.

.. option:: --swank

   Start a `swank <http://common-lisp.net/project/slime/>`_
   listener. Swank will print the port it listens on. In addition, a
   file named ``./swank-port.txt`` containing the port number is
   written.

   .. note::

      Only available in the Common Lisp implementation.
