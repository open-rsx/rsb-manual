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

Synchronizes events on several scopes in an RSB-based system based on
their timstamps.

Imaging e.g. a situation where a vision algorithm produces some features
based on imagesand another algorithm extracts auditory features from the
audio stream. Both send their results through RSB interfaces but the
result events are not intrinsically coupled because they originate from
separate streams. A third module wants to process both results but
synchronized by their timestamps.

This project provides a binary program which can be configured to receive
both streams, synchronize them with different algorithms, and emit an
event which contains all original events. This way modules interested in
multiple streams are freed from the task of synchronizing events manually.

Additionally, if the external program with network communication creates
too much overhead, the algorithms itself can also be used inside C++
programs because a shared library provide, too.

.. option:: --help

   Displays a help message.

.. option:: --outscope SCOPE

   Specifies the scope on which synchronized events are emitted.
   
.. option:: --primscope SCOPE

   Specifies the a scope which should be used for input events.
   This option must appear one time as for some synchronization
   strategies one scope has a special primary role compared to
   other scopes.
   
.. option:: --supscope SCOPE

   Additional scopes to use for input events to synchronize.
   
   .. note::
   
      Currently, there is no specified behavior of what should happen
      when an event on a sub-scope of a configured scope arrives. Strategies
      may treat this as an error or continue processing as if the event was
      received on the super-scope that was configured.
   
.. option:: --strategy NAME

   Valid names: ``approxt``, ``firstmatch``, ``timeframe``

   The strategy to use for synchronizing the events received on
   the primary and supplemental scopes. For a description of
   availabl strategies refer to `Algorithms`_. There, additional options
   for each strategy are explained.
   
.. option:: --timestamp SPEC

   The timestamps to use for synchronizing. Possible values are::
   
     rsb::create
     rsb::send
     rsb::receive
     rsb::deliver
     names of user timestamps
   
   Multiple timestamps can be specified separated by ',', e.g.::
   
     fooTime,rsb::create
     
   This specifies the priority to take timestamps with but allows
   missing user timestamps with the next item in the list as a
   fallback.
   
   Default: ``rsb::create``

Algorithms
==========

  ApproximateTime

    Implements http://www.ros.org/wiki/message_filters/ApproximateTime. In
    brief, emits events where for each configured scope exactly one event
    is present. Minimizes distance between the earliest and the latest
    event in each result event while preserving some other conditions.
    
    .. option:: --approxt-qs SIZE
    
       The queue size to use, default is 2

  FirstMatch

    Probably not usable at all. Emits events where for each configured
    stream one event is present by using the first received event on each
    stream after each emitted result event. Probably only for testing
    purposes.

  TimeFrame

    Associates multiple events from subsidiary scopes to one event of the
    primary scope by selecting all events from the subsidiary scope that
    are close to the time of the primary event (a delta needs to be
    specified). Currently, does not prevent that one subsidiary event is
    present for several primary events.
    
    .. option:: --timeframe-timeframe TIME
    
       Allowed time frame to associate in microseconds in both directions
       of time, default 250000.
       
    .. option:: --timeframe-buffer TIME
    
       Buffer time in microseconds. This is the time  between now and
       primary-event.create (or the selected timestamp via the command line
       option) which is waited until the event is sent out with all 
       synchronizable other events. Default: 500000

Implementations
===============

======================= ============= ====================================== ===============
Implementation Language Project       Repository Link                        Compiled Binary
======================= ============= ====================================== ===============
C++                     rsb-tools-cpp |repository_versioned|/cpp/tools       Artifacts of this Jenkins job
======================= ============= ====================================== ===============
