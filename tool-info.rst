.. _info:
.. _tool-info:

======
 Info
======

.. program:: info

Synopsis
========

:samp:`rsb info {[OPTIONS]}`

Description
===========

The |project| information query tool can be used to display
information regarding

* |project| library version
* effective configuration
* available :term:`connectors <connector>`
* available :term:`converters <converter>`
* available :term:`filters <filter>`
* available :term:`plugins <plugin>`

The :ref:`usual commandline options <common-options>` are
accepted. Specialized commandline options:

.. option:: --configuration

   Display the current default configuration.

.. option:: --transports

   Display list of available :term:`transports <transport>`.

.. option:: --converters

   Display list of available :term:`converters <converter>`.

.. option:: --filters

   Display list of available :term:`filters <filter>`.

   .. Note::

      Only available in the Common Lisp implementation.

.. option:: --plugins

   Display :term:`plugin` search path and list of available
   :term:`plugins <plugin>`.

   .. Note::

      Only available in the C++ implementation.

.. option:: --participants

   Display list of available :term:`participant` classes.

   .. Note::

      Only available in the Common Lisp implementation.

.. option:: --verbose

   Display all available information.

Examples
========

* .. code-block:: sh

     $ rsb-info
     Version: |release|, build 1911 (DATE 2011-06-30 15:14:46 +0200 (Thu, 30 Jun 2011)), abi 2

  Version only example.
* .. code-block:: sh

     $ rsb-info --verbose
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

  Verbose mode example.

Implementations
===============

======================= ============= ===========================================
Implementation Language Project       Repository Link
======================= ============= ===========================================
C++                     rsb-cpp       |repository_versioned_cpp| at ``apps/info``
Common Lisp             rsb-tools-cl  |repository_versioned_tools_cl|
======================= ============= ===========================================
