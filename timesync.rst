.. _timesync:

==========
 Timesync
==========

.. program:: timesync

Synopsis
========

:samp:`rsb_timesync {[OPTIONS]}`

Description
===========

Synchronizes :term:`events <event>` on several :term:`scopes <scope>`
in an |project|-based system based on their timestamps.

Imagine e.g. a situation in which a vision algorithm produces some
features based on images and another algorithm extracts auditory
features from an audio stream. Both send their results as |project|
:term:`events <event>` but the :term:`events <event>` are not
temporally associated because they originate from separate sources (in
this case :term:`participants <participant>`). This becomes a problem
when a third module wants to process :term:`events <event>` from both
sources, synchronized by their timestamps.

This program can be configured to receive :term:`events <event>` from
both sources, synchronize them and emit an :term:`event` which
contains associated original :term:`events <event>`. This way modules
interested in multiple streams are freed from the task of
synchronizing :term:`events <event>`.

.. note::

   If the external program with network communication creates too much
   overhead, the algorithms can also be used inside C++ programs
   in form of a shared library.

.. option:: --outscope SCOPE

   Specifies the :term:`scope` on which synchronized :term:`events
   <event>` are emitted.

.. option:: --primscope SCOPE

   Specifies the a :term:`scope` which should be used for input
   :term:`events <event>`.  This option must appear one time as for
   some synchronization strategies one :term:`scope` has a special
   primary role compared to other :term:`scopes <scope>`.

.. option:: --supscope SCOPE

   Additional :term:`scopes <scope>` to use for input :term:`events
   <event>` to synchronize.

   .. note::

      Currently, there is no specified behavior of what should happen
      when an :term:`event` on a :term:`subscope` of a configured
      :term:`scope` arrives. Strategies may treat this as an error or
      continue processing as if the :term:`event` was received on the
      :term:`superscope` that was configured.

.. option:: --strategy NAME

   Valid names: ``approxt``, ``firstmatch``, ``timeframe``

   The strategy to use for synchronizing the :term:`events <event>`
   received on the primary and supplemental :term:`scopes
   <scope>`. For a description of available strategies refer to
   `Algorithms`_. There, additional options for each strategy are
   explained.

.. option:: --timestamp SPEC

   The timestamps to use for synchronizing. Possible values are

   * ``rsb::create``
   * ``rsb::send``
   * ``rsb::receive``
   * ``rsb::deliver``
   * Names of user timestamps

   Multiple timestamps can be specified separated by ',', e.g.::

     fooTime,rsb::create

   This specifies the priority to take timestamps with but allows
   missing user timestamps with the next item in the list as a
   fallback.

   Default: ``rsb::create``

Algorithms
==========

ApproximateTime

  Implements
  http://www.ros.org/wiki/message_filters/ApproximateTime. In brief,
  emits :term:`events <event>` where for each configured :term:`scope`
  exactly one :term:`event` is present. Minimizes distance between the
  earliest and the latest :term:`event` in each result :term:`event`
  while preserving some other conditions.

  .. option:: --approxt-qs SIZE

     The queue size to use, default is 2

FirstMatch

  Emits :term:`events <event>` where for each configured stream one
  :term:`event` is present by using the first received :term:`event`
  on each stream after each emitted result :term:`event`.

  .. warning::

     Only for testing purposes - Probably not usable at all.

TimeFrame

  Associates multiple :term:`events <event>` from subsidiary
  :term:`scopes <scope>` to one :term:`event` of the primary
  :term:`scope` by selecting all :term:`events <event>` from the
  subsidiary :term:`scope` that are close to the time of the primary
  :term:`event` (a delta needs to be specified). Currently, does not
  prevent that one subsidiary :term:`event` is present for several
  primary :term:`events <event>`.

  .. option:: --timeframe-timeframe TIME

     Allowed time frame to associate in microseconds in both
     directions of time.

     Default: 250000

  .. option:: --timeframe-buffer TIME

     Buffer time in microseconds. This is the time between now and
     ``rsb::create`` timestamp of the primary :term:`event` (or the
     timestamp selected via the command line option) which is waited
     until the :term:`event` is sent out with all synchronizable other
     :term:`events <event>`.

     Default: 500000

Implementations
===============

======================= ============= ================================
Implementation Language Project       Repository Link
======================= ============= ================================
C++                     rsb-tools-cpp |repository_versioned_tools_cpp|
======================= ============= ================================
