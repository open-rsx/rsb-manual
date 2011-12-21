Tools
*****

Introspection
=============

Version, Plugins and Configuration Query

The RSB information query tool can used to display information
regarding

* the RSB library version
* the set of registered connectors
* the set of available converters

======================= ============= ======================================
Implementation Language Project       Repository Link
======================= ============= ======================================
C++                     rsb-cpp       |repository-versioned|/cpp/core/apps
Common Lisp             cl-rsb-tools  |repository-versioned|/cl/cl-rsb-tools
======================= ============= ======================================

Example: version only::

  [jmoringe@azurit build]$ ./rsb_version
  Version: |release|, build 1911 (DATE 2011-06-30 15:14:46 +0200 (Thu, 30 Jun 2011)), abi 2

Example: verbose mode::

  [jmoringe@azurit build]$ ./rsb_version --verbose
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

Logger
======

The RSB logger participates in a channel using one or more transports
and displays all events published on the channel using a configurable
style.

======================= ============= ====================================== ===============
Implementation Language Project       Repository Link                        Compiled Binary
======================= ============= ====================================== ===============
C++                     rsb-cpp-tools |repository-versioned|/cpp/tools       Artifacts of this Jenkins job
Common Lisp             cl-rsb-tools  |repository-versioned|/cl/cl-rsb-tools Linux i686, Linux x86_64, MacOS x86_64
======================= ============= ====================================== ===============

Example:
In the following example, the C++ version of the logger is instructed to participate in the channel designated by the root scope /. This means that the logger will display all events which are receivable using its configured transports. In this example, the configured transports depend on the RSB configuration file and environment variables.::

  [jmoringe@azurit logger]$ ./rsblogger --format detailed /
  Event
    Scope  /
    Id     ac5f449c-4aa1-4b03-a9e2-3fac7d38e651
    Type   bytearray
    Origin ab6e3a17-e11f-4c89-8c07-606a009e8439
  Timestamps
    Create  2011-Jul-03 12:51:11.802849+??:??
    Send    2011-Jul-03 12:51:11.802950+??:??
    Receive 2011-Jul-03 12:51:11.810332+??:??
    Deliver 2011-Jul-03 12:51:11.810572+??:??
  Payload (bytearray, length 100000)
    0x0000 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
    0x0017 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
    0x002e 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
    0x0045 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ...
  -------------------------------------------------------------------------------
  Event
    Scope  /
    Id     3fd721ef-6e7c-4e81-bd5f-ff215b2b965f
    Type   std::string
    Origin 8e07e02a-0dee-44a2-8926-cc65c0285410
  Timestamps
    Create  2011-Jul-03 12:51:20.102403+??:??
    Send    2011-Jul-03 12:51:20.102482+??:??
    Receive 2011-Jul-03 12:51:20.105319+??:??
    Deliver 2011-Jul-03 12:51:20.105404+??:??
  Payload (std::string, length 3)
    foo
  -------------------------------------------------------------------------------

Example (inspection of protocol buffer event payloads):
In this example, the Common Lisp version of the RSB logger is used to
display protocol buffer event payloads. This only works, if the logger
is provided with the protocol buffer IDL definitions of the event
payloads it should display (in this example: the running.example.Image
message from the slides used in this meeting). These definitions can
either be textual definitions, typically found in .proto files (as in
this example), or compiled, binary descriptions (not shown).::

  $ ls ~/projects/talk-rsb-data/code/*.proto
  /homes/jmoringe/projects/talk-rsb-data/code/Image.proto
  $ ./logger-builtin-spread --style detailed                                     \
                            --load-idl ~/projects/talk-rsb/data/code/Image.proto \
                            spread:
  Event
    Scope : /
    Id    : 89064E22-C503-44DA-9C65-9385C29D09A1
    Type  : T
    Origin: ABB03F86-655A-42EE-9D5B-26D34C922A3A
  Timestamps
    Create : 2011-07-16T00:28:52.123994+02:00
    Send   : 2011-07-16T00:28:52.124095+02:00
    Receive: 2011-07-16T00:28:52.235294+02:00
    Deliver: 2011-07-16T00:28:52.243197+02:00
  Payload (RUNNING.EXAMPLE:IMAGE)
    #<IMAGE {1005B10C81}>
      Meta-Data: #<META-DATA {10063AF2B1}>
                   Key  : "foo"
                   Value: "bar"
      Width    : 20
      Height   : 30
      Depths   : 20
                 10
      Data     : 01 02 03 04
  -------------------------------------------------------------------------------


Here is another example which loads all definitions contained in the
Robotics Systems Types repository. Note the use of the ``--idl-path``
option for import resolution and the use of wildcards to load all
definitions at once. Also note that loading all definitions takes a
few seconds.::

  $ ./logger-builtin-spread --idl-path "~/code/cor-lab/rst/trunk/rst/proto/sandbox/"   \
                            --idl-path "~/code/cor-lab/rst/trunk/rst/proto/stable/"    \
                            --load-idl '~/code/cor-lab/rst/trunk/rst/proto/**/*.proto' \
                            --style detailed spread:

RPC Call
========

The call tool can be used to invoke methods of RSB RPC servers.

======================= ============= ====================================== ===============
Implementation Language Project       Repository Link                        Compiled Binary
======================= ============= ====================================== ===============
Common Lisp             cl-rsb-tools  |repository-versioned|/cl/cl-rsb-tools Linux i686, Linux x86_64, MacOS x86_64
======================= ============= ====================================== ===============

Example:

In this example, the call tool is used to invoke the terminate method
of the remote server at scope ``/control`` without an argument.::

  $ ./call 'spread:/mycomponent/control/status()'
  "running" # prints return value, if any
  $ ./call 'spread:/mycomponent/control/terminate()'
  $ # returns once the method call completes
