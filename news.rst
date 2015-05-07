.. _news:

======
 News
======

|project| 0.13
==============

Changes

* Java

  * The filter API has been refactored to match the API of the other
    language implementations. While `AbstractFilter` still provides the
    old API for client code, it has been deprecated in favor of directly
    implementing the much simplified `Filter` interface and client code
    should be updated.
  * `InterruptedExceptions` are now handled correctly (ie. not swallowed) and
    properly exposed to method callers, who are the ones who need to handle
    them. This changes the API slightly.
  * `RemoteServer` exposes the standard `java.util.concurrent.Future` interface
    instead of a custom implementation class. This ensures compatibility with
    standard interfaces, prevents accidental exception hiding (as happened with
    `InterruptedException`) and prevents clients from illegally completing a
    `Future` instance. As a consequence, the `get` method with just a long
    value as a timeout in milliseconds is not available anymore, because it is
    not contained in the default `Future` interface. However, always having an
    explicit `TimeUnit` makes things much clearer. This change breaks the API
    and client code needs to be updated.

|project| 0.12
==============

Changes

* Specification

  * A "display name" field has been added to the :term:`introspection`
    protocol and a corresponding :ref:`configuration option
    <specification-config>` ``introspection.displayname`` has been
    added. Users can specify this configuration property for individual
    processes (e.g. via environment variables) to provide a custom name
    for the process, which is then e.g. shown by the :ref:`introspection
    tool <tool-introspect>`.

* All languages

  * `spread`_ connections are now shared between :term:`informers
    <informer>`, which reduces the number of open connections to the
    :term:`spread daemon`.

* C++

  * The implementation now uses `Boost.Signals2
    <http://www.boost.org/doc/libs/1_57_0/doc/html/signals2.html>`_
    instead of the deprecated version 1. This changes the external API
    for :term:`participant` hooks, which is rarely used externally. In
    case you have used these hooks, you need to migrate to the new
    signals namespaces and type names.

  * ``LocalServer::Callback`` implementations to reuse existing functions or
    methods have been added.

  * Several methods and types that have long been deprecated have been
    removed, including the method :cpp:method:`Factory::getInstance`.

* Java

  * Several minor issues in the socket :term:`transport` implementation
    have been fixed.

* Common Lisp

  * The ``rsb:with-listener``, ``rsb:with-reader``,
    ``rsb:with-informer``,
    ``rsb.patterns.request-reply:with-local-server`` and
    ``rsb.patterns.request-reply:with-remote-server`` macros have been
    replaced by ``rsb:with-active-participant`` and
    ``rsb:with-participant``.
  * Similarly, the ``rsb:make-listener``, ``rsb:make-reader``,
    ``rsb:make-informer``,
    ``rsb.patterns.request-reply:make-local-server`` and
    ``rsb.patterns.request-reply:make-remote-server`` functions have
    been replaced by ``rsb:make-participant``.

* Common Lisp Tools

  * All tools now use sub-command-based commandline syntax like
    :program:`git`, :program:`svn` and other modern commandline
    tools. The previous symbolic-link-based invocation will continue
    to work for a transition period. Example of the new syntax:

    .. code-block:: sh

       rsb-toolscl0.12 logger --style monitor socket:

  * The :ref:`tool-send` and :ref:`tool-call` tools now accept
    :term:`payloads <payload>` specified using the `Google protocol
    buffers`_ debug text format.

  * A new experimental :ref:`tool-web` tool which serves information
    about an |project| system via HTTP has been added.

    .. warning::

       Experimental - use with care.

|project| 0.11
==============

.. note::

   Starting with this release, the :ref:`request-reply communication
   pattern <specification-request-reply>` uses a new protocol. As a
   result, request-reply communication is not be possible between
   earlier versions and this version of |project|.

.. note::

   Although never "officially" supported, the |python| implementation
   previously allowed constructing :term:`participants <participant>`
   by using the constructors of the respective classes. This is now
   explicitly unsupported. :py:func:`rsb.createListener` etc. have to
   be used instead.

This |project| release is available in the following forms:

* Source archives
* Pre-compiled self-installing archives or executable binaries
* Debian packages for different |ubuntu| versions (currently C++ and
  Common Lisp implementations only)
* Pypi packages for the |python| implementation
* Maven package for the Java implementation

These can be downloaded from the `0.11 jobs continuous integration
server <https://ci.cor-lab.org/view/rsb-0.11>`_ or `repository
server`_ respectively.  :ref:`Installation instructions <install>` and
links for downloading can be found in the |project| :ref:`manual
<rsb>`.

Changes

* :term:`Introspection`

  |project| now supports inspecting the :term:`participants
  <participant>`, processes and hosts comprising a running system.

* Specification

  * :term:`subscopes <subscope>` of ``/__rsb/`` are now :ref:`reserved
    <specification-scope-reserved>` for implementation purposes. The
    :ref:`tool-logger` will not display :term:`events <event>` on
    these :term:`scopes <scope>` by default.

  * An :ref:`introspection protocol <specification-introspection>`
    which works in terms of ordinary |project| :term:`events <event>`
    has been added.

  * :ref:`Request-reply communication pattern <specification-request-reply>`

    * The ``request`` and ``reply`` components have been removed from
      the :term:`scopes <scope>` of :term:`participants <participant>`
      implementing the communication protocol.

* C++

  * Support for sending :term:`introspection` information has been
    added as a :term:`plugin`.

  * The build system now provides the `CMake`_ variable
    ``RSB_SYSTEM_PLUGIN_DIRECTORY`` for downstream projects.
  * New :term:`filter` class :cpp:class:`rsb::filter::MethodFilter`
  * New :term:`filter` class :cpp:class:`rsb::filter::TypeFilter`
  * Tools based on and examples for the C++ implementation now use the
    RSC functions :cpp:func:`rsc::misc::waitForSignal` and
    :cpp:func:`rsc::misc::lastArrivedSignal` to terminate with proper
    cleanup of |project| objects.
  * The entry names for the enum `rsb::transport::Directions` have been
    prefixed with `DIRECTION_` in order to prevent clashes with
    preprocessor symbols.
  * It is now safe to maintain participants in static variables since
    all transports have been rewritten so that the unknown order of
    static destruction is not a problem anymore.

* Java

  * Support for sending :term:`introspection` information has been
    added as a package.

* Python

  * Support for sending :term:`introspection` information has been
    added as a package.

  * New :term:`filter` class :py:class:`rsb.filter.MethodFilter`

  * :py:func:`rsb.createServer` has been renamed to
    :py:func:`rsb.createLocalServer`. For backward compatibility, the
    former function has been retained as a deprecated alias for the
    latter.

* Common Lisp

  * Support for sending :term:`introspection` information has been
    added as part of the ``rsb-introspection`` system.

  * Support for receiving and aggregating :term:`introspection`
    information has been added as part of the ``rsb-introspection``
    system.

  * :term:`Participants <participant>` can be created generically
    using the generic function ``make-participant`` which is backed by
    a service-provider protocol for registering, instantiating and
    inspecting kinds of :term:`participants <participant>`.

  * Creation and state changes of :term:`participants <participant>`
    can now be monitored via ``*make-participant-hook*`` and
    ``*participant-state-change-hook*``.

  * The implementation of the :ref:`Request-reply pattern
    <specification-request-reply>` has moved from package
    ``rsb.patterns`` to package ``rsb.patterns.request-reply``.

* Common Lisp Tools

  * The new :ref:`tool-introspect` tool collects and displays
    :term:`introspection` information.

  * Some problems (e.g. starting the :ref:`tool-logger` with a
    :term:`scope` option or without URI scheme) in the :ref:`URI
    <specification-uris>` handling of the Common Lisp tools have been
    solved.

  * All column-based :term:`event` formatting styles now compute
    (mostly) optimal column widths dynamically instead of choosing
    from a set of predefined layouts.

  * The timeline view of the :ref:`tool-logger` can now handle
    :term:`events <event>` whose timestamps lie in the past or future.

  * The timestamp used to construct the timeline view of the
    :ref:`tool-logger` is now configurable.

  * A new :term:`event` formatting style ``monitor/timeline`` has been
    added.

  * Monitor and timeline views of the :ref:`tool-logger` now accept
    :samp:`:sort-column {COLUMN}` and :samp:`:sort-reverse? {BOOLEAN}`
    arguments.

  * Monitor and timeline views of the :ref:`tool-logger` can now
    remove entries after a configurable time of inactivity.

  * The :ref:`tool-logger` now accepts multiple URIs

As always, bugs, feature requests and enhancement proposals can be
reported in the `issue tracker`_.

.. note::

   For a more detailed list of fixed bugs, added features and other
   enhancements, see https://code.cor-lab.org/versions/41.

|project| 0.10
==============

.. note::

   Starting with this release, |ubuntu| lucid is no longer officially
   supported. At least for C++, the `CMake`_ scripts will most likely
   not work.

This |project| release is available in the following forms:

* Source archives
* Pre-compiled self-installing archives or executable binaries
* Debian packages for different |ubuntu| versions (currently C++ and
  Common Lisp implementations only)
* :term:`Homebrew` recipes
* Pypi packages for the |python| implementation
* Maven package for the Java implementation

These can be downloaded from the `0.10 jobs continuous integration
server <https://ci.cor-lab.org/view/rsb-0.10>`_ or `repository
server`_ respectively.  :ref:`Installation instructions <install>` and
links for downloading can be found in the |project| :ref:`manual
<rsb>`.

Changes

* C++

  * Special `CMake`_ -level support for finding custom installations
    of the Boost.UUID library has been dropped as this library is a
    standard part of Boost since some time now.

  * Incompatible API change: Moved ``EventQueuePushHandler`` and
    ``QueuePushHandler`` to ``util`` namespace

  * Improved logging, error messages and API for :term:`converter`
    selection, configuration and registration

  * :term:`Converter` registration is no longer necessary for the
    inprocess :term:`transport`

  * Zip archive for Windows

* Java

  * Added inprocess :term:`transport`

  * Fixed implementation of :term:`sequence number` generation

  * Some thread-safety and shutdown issues in the socket
    :term:`transport` have been fixed

  * Default :term:`participant` configuration is now available via
    ``getDefaulParticipantConfig``

  * Updated internal :term:`Spread` Java implementation to version 4.3.
    This still allows communication with all 4.x :term:`Spread` daemons.

* Python

  * :term:`Participants <participant>` now support the context manager
    protocol (``with`` statements)

  * The :term:`Configuration` file at :samp:`{PREFIX}/etc/rsb.conf` is now
    processed

* Common Lisp

  * Socket :term:`transport` now listens on all interfaces in server
    mode

  * Socket :term:`transport` now handles disconnected clients better
    while under load

  * Logging is now implemented using a more robust and more efficient
    implementation. The user-visible interface remains unchanged.

* Tools

  * The Common Lisp implementation of the tools now comes with scripts
    for analyzing some timing-related aspects of system. These scripts
    can be used by the :ref:`tool-logger` as well as the RSBag tools.

As always, bugs, feature requests and enhancement proposals can be
reported in the `issue tracker`_.

.. note::

   For a more detailed list of fixed bugs, added features and other
   enhancements, see https://code.cor-lab.org/versions/11.

|project| 0.9
=============

.. note::

   * In the C++ implementation, the :term:`Spread` :term:`transport`
     is now implemented as a :term:`plugin`. In case of problems, see
     :ref:`troubleshooting-spread-does-not-work`.

This |project| release is available in the following forms:

* Source archives
* Pre-compiled self-installing archives or executable binaries
* Debian packages for different |ubuntu| versions

  * Starting with this release, the development version of |project|
    is packaged in the "testing" repository of our Debian `repository
    server`_ (as opposed to the "main" repository). So you need to add
    this repository to your apt sources list in case you want to
    install the development version via Debian packages.

* :term:`Homebrew` recipes and pypi packages
* Maven package for rsb-java

These can be downloaded from the `0.9 jobs continuous integration
server <https://ci.cor-lab.org/view/rsb-0.9>`_ or `repository server`_
respectively.  :ref:`Installation instructions <install>` and links
for downloading can be found in the |project| :ref:`manual <rsb>`.

Changes

* Integration of the new RSC :term:`plugin` mechanism in the C++
  implementation for :term:`transports <transport>` and
  :term:`converters <converter>`

* Encapsulation of the :term:`spread` :term:`transport` into a
  separate :term:`plugin`

* Complete overhaul of the Java implementation to be in line with the
  remaining implementations

  * As a consequence, the public API has slightly changed, especially
    with respect to thrown exceptions

  * Implementation of the :ref:`socket <specification-socket>`
    :term:`transport`

* Fixes in all implementations of the :ref:`socket
  <specification-socket>` :term:`transport`

* The :ref:`RPC API <specification-request-reply>` now supports some
  method signatures that did not work previously

* Fixes for Windows compatibility

* Documentation improvements

As always, bugs, feature requests and enhancement proposals can be
reported in the `issue tracker`_.

.. note::

   For a more detailed list of fixed bugs, added features and other
   enhancements, see https://code.cor-lab.org/versions/12.

|project| 0.7
=============

.. note::

   * Only the :ref:`TCP-socket transport <specification-socket>` is
     now enabled by default.

     For :term:`transport` configuration issues see
     :ref:`troubleshooting`.

   * |project| and related projects are now maintained in a `git`_
     repository. See https://code.cor-lab.org/news/21 for more
     information.

     The git URL is |repository|. To obtain |project| with all
     submodules, use the following command:

     .. code-block:: sh

        $ git clone --recursive https://code.cor-lab.org/git/rsb.git

This |project| release is available in the following forms:

* Source archives
* Pre-compiled self-installing archives or executable binaries
* Debian packages for different |ubuntu| versions
* Prototypical homebrew recipes and pypi packages (new)

These can be downloaded from the `0.7 jobs continuous integration
server <https://ci.cor-lab.org/view/rsb-0.7>`_ or `repository server`_
respectively.  :ref:`Installation instructions <install>` and links
for downloading can be found in the |project| :ref:`manual <rsb>`.

Changes

* The :ref:`TCP-socket transport <specification-socket>` is now fully
  implemented in C++, Python and Common Lisp and used by default
  there.
* Error recovery, robustness and features of |project|
* End-user documentation
* Packaging and deployment
* :ref:`send <tool-send>` tool

As always, bugs, feature requests and enhancement proposals can be
reported in the `issue tracker`_.

.. note::

   For a more detailed list of fixed bugs, added features and other
   enhancements, see https://code.cor-lab.org/versions/22.

|project| 0.6
=============

.. note::

   |project| clients using the 0.6 version cannot generally
   communicate with clients using a previous |project| version.

This |project| release is available in the following forms:

* Source archives
* Pre-compiled self-installing archives or executable binaries
* Debian packages for different |ubuntu| versions

These can be downloaded from the `0.6 jobs continuous integration
server <https://ci.cor-lab.de/view/rsb-0.6>`_ or `repository server`_
respectively.

As always, bugs, feature requests and enhancement proposals can be
reported in the `issue tracker`_.

General Changes

* All core components have been relicensed to `LGPLv3`_.
* Sub-projects have been cleaned up.
* Manuals have been created and can be accessed at
  |documentation_root|/rsb-manual/0.6/html. For a list of all
  documentation, see |documentation_root|.
* |project| programs now process |system_config_file| if such a file
  exists.

Tools

* The C++ :ref:`logger <tool-logger>` now has a "monitor mode"
* The C++ :ref:`logger <tool-logger>` can now print :term:`event`
  collections
* The Common Lisp :ref:`logger <tool-logger>` adjusts its display to
  the width of the containing terminal
* The Common Lisp :ref:`logger <tool-logger>` can now print
  :term:`event` collections

.. note::

   For a more detailed list of fixed bugs, added features and other
   enhancements, see
   https://code.cor-lab.org/projects/rsb/versions/25.

|project| 0.5
=============

.. note::

   * |project| clients using the 0.5 version of |project| cannot
     generally communicate with clients using a previous |project|
     version.

   * The :term:`Spread` :term:`transport` is no longer active by
     default (see below).

   * The API is in some parts not backwards-compatible.

The development activities in this cycle focused primarily on API
improvements and the integration of :term:`causal vectors <causal
vector>`. Moreover, complete compatibility for MSVC 2010 is now
ensured and MacOS compatibility has been improved. In the process,
about 60 issues have been created and subsequently resolved.

This |project| release is available in the following forms:

* Source archives
* Pre-compiled self-installing archives
* Debian packages for different |ubuntu| versions (new)

These can be downloaded from the `0.5 jobs continuous integration
server <https://ci.cor-lab.org/view/rsb-0.5>`_ or `repository server`_
respectively.

As always, bugs, feature requests and enhancement proposals can be
reported in the `issue tracker`_.

General Changes

* A tutorial is now included in the |project| source tree:
  "0.5" branch of |repository_tutorials|
* Several introductory talks are now included in the |project| source tree:
  "0.5" branch of |repository_talks|
* "RSB-related build jobs":https://ci.cor-lab.de/view/rsb-0.5 on the
  continuous integration sever have been reorganized.
* Simple benchmarking tools are available in the ``rsbench`` project.
* The ``#rsb`` IRC channel on the freenode network can now be used for
  additional support and discussion.
* :ref:`Installation instructions <install>` have been improved.

Network Protocol and Configuration

* :term:`Causal vectors <causal vector>` have been added to the
  network protocol. They allow to tag which :term:`event` or
  :term:`events <event>` caused a given :term:`event`.
* The default :term:`transport` configuration has been changed:

  * The inprocess :term:`transport` is now enabled by default
  * The :term:`Spread` :term:`transport` is now disabled by default
    and has to be enabled explicitly when network communication is
    desired. This can e.g. be done by adding the user configuration
    file :file:`~/.config/rsb.conf` with the following content:

    .. code-block:: ini

       [transport.spread]
       enabled = 1

       [transport.inprocess]
       enabled = 0

Tools

* The C++ :ref:`logger <tool-logger>` now displays :term:`causal
  vectors <causal vector>`.
* The Common Lisp :ref:`logger <tool-logger>` now displays
  :term:`causal vectors <causal vector>`.
* The Common Lisp :ref:`logger <tool-logger>` now displays
  configurable statistics.
* The Common Lisp :ref:`logger <tool-logger>` now allows configuring
  the columns in the "compact" formatting style.
* The :ref:`call <tool-call>` tool for performing RPCs from the
  commandline has been added.

C++

* Support for :term:`causal vectors <causal vector>` has been added.
* The client API for creation and configuration of :term:`participants
  <participant>` and :term:`events <event>` has been simplified.
* Convenience functions for participant creation without the factory
  have been added. (Suggested by: Robert Haschke)
* ``OriginFilter`` has been added.
* Compilation time has been reduced. (Suggested by: Matthias Rolf)
* A name-clash with a Qt macro has been resolved (Reported by:
  Matthias Rolf)
* :term:`Event` dispatching now allows multiple threading strategies.
* Performance Improvements
  * Caching of :term:`Spread` group names
  * ``<``-comparison of ``EventId`` s

Java

* Support for :term:`causal vectors <causal vector>` has been added.
* ``OriginFilter`` has been added.

Python

* Support for :term:`causal vectors <causal vector>` has been added.
* ``OriginFilter`` has been added.

Common Lisp

* Support for :term:`causal vectors <causal vector>` has been added.

.. note::

   For a more detailed list of fixed bugs, added features and other
   enhancements, see
   https://code.cor-lab.org/projects/rsb/versions/21.

|project| 0.4
=============

.. note::

   |project| clients using the 0.4 version of |project| cannot
   communicate with clients using a previous |project| version.

The development activities in this cycle focused primarily on
extending and optimizing the wire format and improving the usability
of and support for protocol buffer message objects as event
payloads. In the process, more than 30 issues have been created and
subsequently resolved.

* Downloadable source archives of this version are available in the
  `Files section <https://code.cor-lab.org/projects/rsb/files>`_ of
  the Redmine project.
* pre-compiled archives of |project| can be found as artifacts on the
  `continuous integration server`_.

As always, bugs, feature requests and enhancement proposals can be
reported in the `issue tracker`_.

Network Protocol for :term:`Spread`-based Communication

* The eagerly computed, mandatory unique id field of :term:`events
  <event>` is now lazily computed from a static id and a
  :term:`sequence number`. :term:`Events <event>` can be transmitted
  without computing the id. This change saves 12 bytes in each
  :term:`notification` sent over the wire. (Thanks: Stefan
  Herbrechtsmeier)
* Incompatible wire format versions can now be detected by means of a
  trick which does not incur any runtime overhead in space or
  time. This enabled removal of the ``version`` field in
  :term:`notifications <notification>`, saving four bytes in each
  notification sent over the wire.
* The method field of :term:`events <event>` is now fully specified
  and used in request/reply communication.

C++

* In addition to blocking request/reply invocation, a future-based
  asynchronous interface is now available.
* Several performance problems related to :term:`scope` and
  :term:`event` construction have been fixed. (Thanks: Matthias Rolf,
  Arne Nordmann)

Java

* Request/reply communication with blocking and asynchronous
  invocation modes has been implemented.
* A :term:`converter` registration and selection mechanism and a
  generic :term:`converter` for `Google protocol buffers`_ data holder
  classes have been added.

Python

* Request/reply communication with blocking and asynchronous
  invocation modes has been implemented.
* A :term:`converter` for `Google protocol buffers`_ data holder
  classes has been added.

Common Lisp

* Request/reply communication with blocking and asynchronous
  invocation modes has been implemented.

.. note::

   For a more detailed list of fixed bugs, added features and other
   enhancements, see
   https://code.cor-lab.org/projects/rsb/versions/17.
