Introspection
-------------

.. program:: info

Synopsis
^^^^^^^^

:samp:`info {[OPTIONS]}`

Description
^^^^^^^^^^^

The |project| information query tool can be used to display
information regarding

* |project| library version
* effective configuration
* available :term:`connectors`
* available :term:`converters`
* available :term:`filters`

The :ref:`usual commandline options <common-options>` are
accepted. Specialized commandline options:

.. option:: --configuration

   Display the current default configuration.

.. option:: --connectors

   Display list of available :term:`connectors`.

.. option:: --converters

   Display list of available :term:`converters`.

.. option:: --filters

   Display list of available :term:`filters`.

   .. Note::

      Only available in the Common Lisp implementation.

.. option:: --verbose

   Display all available information.

Examples
^^^^^^^^

Version only example: ::

  $ ./rsb-info
  Version: |release|, build 1911 (DATE 2011-06-30 15:14:46 +0200 (Thu, 30 Jun 2011)), abi 2

Verbose mode example::

  $ ./rsb-info --verbose
  Version: |release|, build 1911 (DATE 2011-06-30 15:14:46 +0200 (Thu, 30 Jun 2011)), abi 2

  Connectors
  ConnectorFactory<rsb::transport::InPushConnector>[
      ConnectorInfo[inprocess, schemas = {inprocess}, options = {enabled}]
      ConnectorInfo[spread, schemas = {spread}, options = {host, port, enabled}]
  ]
  ConnectorFactory<rsb::transport::OutConnector>[
      ConnectorInfo[inprocess, schemas = {inprocess}, options = {enabled}]
      ConnectorInfo[spread, schemas = {spread}, options = {host, maxfragmentsize, port, enabled}]
  ]

  Converters
  Repository<std::string>[
      .*               <-> bytearray       : rsb::converter::ByteArrayConverter[wireType = std::string, wireSchema = .*, dataType = bytearray]
      bool             <-> bool            : rsb::converter::BoolConverter[wireType = std::string, wireSchema = bool, dataType = bool]
      uint64           <-> unsigned long   : rsb::converter::Uint64Converter[wireType = std::string, wireSchema = uint64, dataType = unsigned long]
      utf-8-string     <-> std::string     : rsb::converter::StringConverter[wireType = std::string, wireSchema = utf-8-string, dataType = std::string]
      void             <-> void            : rsb::converter::VoidConverter[wireType = std::string, wireSchema = void, dataType = void]
  ]

Implementations
^^^^^^^^^^^^^^^

======================= ============= ======================================
Implementation Language Project       Repository Link
======================= ============= ======================================
C++                     rsb-cpp       |repository_versioned|/cpp/core/apps
Common Lisp             cl-rsb-tools  |repository_versioned|/cl/cl-rsb-tools
======================= ============= ======================================
