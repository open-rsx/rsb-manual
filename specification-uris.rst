.. _specification-uris:

======
 URIs
======

Generic URIs
============

Syntax::

  rsb:[PATH][#FRAGMENT]

Components of the URL are interpreted as follows:

* :samp:`{SCHEME}`   -> has to be ``rsb``
* :samp:`{PATH}`     -> A :term:`scope` which designates a one of the following things

  * A :term:`channel`
  * A :term:`participant`

    * A :term:`service` (which is-a :term:`participant`)
* :samp:`{FRAGMENT}` ->

  * Not allowed when designating a :term:`channel`
  * ID of a :term:`participant` otherwise

This may resolve to:

* :term:`Service` and/or :term:`Participant`

  * If there is only one of these entities this is enough for
    resolving it
  * If multiple entities reside on the :term:`scope`, a
    single instance can be selected using their ID::

      rsb:/hierarchical/service/definition/further/to/participant#UniqueIDOfParticipant[UUID]
* Nothing

These generic URIs require a global naming service.

Transport-specific URLs
=======================

Syntax::

  [SCHEME:][//HOST][:PORT][PATH][?QUERY][#FRAGMENT]
  transport://<location.transport.specific[:PORT]>/hierarchical/service/definition/further/to/participant

Components of the URL are interpreted as follows:

* :samp:`{SCHEME}`   -> :term:`transport` name (e.g spread)
* :samp:`{HOST}`     -> Transport-specific "host" option (e.g. host that runs the daemon for Spread :term:`transport`)
* :samp:`{PORT}`     -> Transport-specific "port" option (e.g. port on which daemon listens for Spread :term:`transport`)
* :samp:`{PATH}`     -> A :term:`scope` which designates one of the following things

  * A :term:`channel`
  * A :term:`participant`

    * A :term:`service` (which is-a :term:`participant`)
* :samp:`{QUERY}`    -> "freestyle" transport-specific options
* :samp:`{FRAGMENT}` ->

  * Not allowed when designating a :term:`channel`
  * ID of a :term:`participant` otherwise

Examples
========

The following examples demonstrate generic URIs:

  ``rsb:``
    The :term:`channel` designated by the :term:`scope` ``/``.

  ``rsb:/``
    The :term:`channel` designated by the :term:`scope` ``/``.

  ``rsb:/foo/bar``
    The :term:`channel` designated by the :term:`scope` ``/foo/bar``.

  ``rsb:/foo/bar#10838319-09A4-4D15-BD59-5E054CDB4403``
    The :term:`participant` with ID
    ``10838319-09A4-4D15-BD59-5E054CDB4403``.

The following example demonstrate how to specify bus connections when
creating :term:`participant` s:

  `` ``
    Participate in :term:`channel` with :term:`scope` ``/`` using the
    default :term:`transport` configuration.

  ``spread:``
    Participate in :term:`channel` with :term:`scope` ``/`` using the
    :term:`Spread` :term:`transport` with its default configuration.

  ``inprocess:``
    Participate in :term:`channel` with :term:`scope` ``/`` using the
    in-process :term:`transport` with its default configuration.

  ``spread://localhost:5555``
    Participate in :term:`channel` with :term:`scope` ``/`` via the
    :term:`Spread` daemon running on localhost and listening on port
    5555.

  ``inprocess://someotherhost``
    Syntactically correct, but does not make sense.

  ``spread:/foo/bar``
    Participate in :term:`channel` with :term:`scope` ``/foo/bar``
    using the default :term:`transport` configuration.

  ``spread:?maxfragmentsize=10000``
    Participate in :term:`channel` with :term:`scope` ``/`` using the
    :term:`Spread` :term:`transport` with default host and port and a
    maximum event fragment size of 10000 bytes.

  ``spread:?maxfragmentsize=10000&tcpnodelay=yes``
    Likewise, but in addition with tcpnodelay option set to ``yes``.

Implementations
===============

=========== ====================================
Language    File(s)
=========== ====================================
C++         *not yet implemented*
Java        *not yet implemented*
Python      *not yet implemented*
Common Lisp :download:`/../rsb-cl/src/uris.lisp`
=========== ====================================
