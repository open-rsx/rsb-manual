.. _tool-web:

=====
 Web
=====

.. program:: web

Synopsis
========

:samp:`rsb web {[OPTIONS]} {URI*}`

Description
===========

Serve via HTTP information about the |project| system reachable via
the :term:`transports <transport>` designated by :samp:`{URI}`\ s
(zero or more URIs).

When no URIs are supplied, the default :term:`transport` configuration
is used.

The usual :ref:`commandline options <common-options>` and
:ref:`environment variables <common-environment-variables>` are
accepted. Specialized commandline options:

.. option:: --address ADDRESS

   Address on which the HTTP server should listen.

.. option:: --port PORT

   Port on which the HTTP server should listen.

.. option:: --static-directory DIRECTORY

   Directory from which static content such as HTML pages and CSS
   files should be read.

.. option:: --response-timeout SECONDS

   Time in seconds to wait for responses to :term:`introspection`
   requests.

   In most systems, all replies should arrive within a few
   milliseconds. However, circumstances like heavily loaded system,
   degraded system performance or extreme communication latency may
   required larger values.

.. seealso::

   :ref:`uri-schema`
      For details regarding the URI syntax of :samp:`{URI}` for
      specifying :term:`transport` and :term:`scope`.

   :ref:`common-options`
      The usual commandline options are accepted.

.. _tool-web-endpoints:

Provided HTTP endpoints
=======================

* :samp:`http://{ADDRESS}:{PORT}/static`

  Contents of the directory specified via :option:`--static-directory`
  is made available here.

* :samp:`http://{ADDRESS}:{PORT}/introspection/json`

  A JSON-serialization of a snapshot of the :term:`introspection` data
  for the system or systems specified via :samp:`{URI}`\s can be
  obtained here.

Examples
========

* .. code-block:: sh

     $ rsb web

  In the above example, the :program:`web` command is used to collect
  information about the |project| system or systems that can be
  contacted via the currently configured :term:`transports
  <transport>`. The information is served via HTTP, with the server
  listening on the default address and port,
  i.e. http://localhost:4444.

* .. code-block:: sh

     $ rsb web socket: spread://somehost

  Gather information via two :term:`transports <transport>`: the
  socket :term:`transport` and the :term:`Spread`
  :term:`transport`. The gathered information is merged as if all
  collected processes and :term:`participants <participant>` were
  participant in a single |project| bus.

Implementations
===============

======================= ============= ===============================
Implementation Language Project       Repository Link
======================= ============= ===============================
Common Lisp             rsb-tools-cl  |repository_versioned_tools_cl|
======================= ============= ===============================
