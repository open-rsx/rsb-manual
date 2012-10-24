.. _news:

======
 News
======

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
* :ref:`send <send>` tool

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

* The C++ :ref:`logger <logger>` now has a "monitor mode"
* The C++ :ref:`logger <logger>` can now print :term:`event`
  collections
* The Common Lisp :ref:`logger <logger>` adjusts its display to the
  width of the containing terminal
* The Common Lisp :ref:`logger <logger>` can now print :term:`event`
  collections

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
improvements and the integration of :term:`causal vector` s. Moreover,
complete compatibility for MSVC 2010 is now ensured and MacOS
compatibility has been improved. In the process, about 60 issues have
been created and subsequently resolved.

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

* :term:`Causal vector` s have been added to the network
  protocol. They allow to tag which :term:`event` or :term:`event` s
  caused a given :term:`event`.
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

* The C++ :ref:`logger <logger>` now displays :term:`causal vector` s.
* The Common Lisp :ref:`logger <logger>` now displays :term:`causal
  vector` s.
* The Common Lisp :ref:`logger <logger>` now displays configurable
  statistics.
* The Common Lisp :ref:`logger <logger>` now allows configuring the
  columns in the "compact" formatting style.
* The :ref:`call <call>` tool for performing RPCs from the commandline
  has been added.

C++

* Support for :term:`causal vector` s has been added.
* The client API for creation and configuration of :term:`participant`
  s and :term:`event` s has been simplified.
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

* Support for :term:`causal vector` s has been added.
* ``OriginFilter`` has been added.

Python

* Support for :term:`causal vector` s has been added.
* ``OriginFilter`` has been added.

Common Lisp

* Support for :term:`causal vector` s has been added.

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

* The eagerly computed, mandatory unique id field of :term:`event` s
  is now lazily computed from a static id and a :term:`sequence
  number`. :term:`Event` s can be transmitted without computing
  the id. This change saves 12 bytes in each :term:`notification` sent
  over the wire. (Thanks: Stefan Herbrechtsmeier)
* Incompatible wire format versions can now be detected by means of a
  trick which does not incur any runtime overhead in space or
  time. This enabled removal of the ``version`` field in
  :term:`notification` s, saving four bytes in each notification sent
  over the wire.
* The method field of :term:`event` s is now fully specified and used
  in request/reply communication.

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
