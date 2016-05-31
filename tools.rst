.. _tools:

=======
 Tools
=======

.. toctree::
   :hidden:

   tool-info
   tool-logger
   tool-introspect
   tool-send
   tool-call
   tool-timesync
   tool-bridge
   tool-server
   tool-web
   common-command-line-options

.. seealso::

   :ref:`common`
     For a description of common options accepted by more than one program.

The following tools are available:

* :ref:`info <tool-info>`

  Inspection of version and configuration information.

* :ref:`logger <tool-logger>`

  Console-based realtime logging of :term:`events <event>`.

* :ref:`introspect <tool-introspect>`

  Console-based :term:`introspection` of running |project| systems.

* :ref:`send <tool-send>`

  Commandline-based sending of :term:`events <event>`.

* :ref:`call <tool-call>`

  Commandline-based calling of RPC server methods.

* :ref:`timesync <tool-timesync>`

  Synchronization of :term:`events <event>` on different :term:`scopes
  <scope>` based on timestamps.

* :ref:`bridge <tool-bridge>`

  Forwarding of :term:`events <event>` from one |project| bus to
  another.

* :ref:`server <tool-server>`

  A standalone server for the |project| :ref:`socket
  <specification-socket>` :term:`transport`.

* :ref:`web <tool-web>`

  Web-based interface to information about a running |project| system
  such as :term:`introspection`. Also provides multiple
  :ref:`HTTP-endpoints <tool-web-endpoints>` for retrieving the
  information programatically.
