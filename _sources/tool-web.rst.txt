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

.. option:: --document-root DIRECTORY

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

Provided HTTP Endpoints
=======================

For all ``/api/**`` endpoints, at least the content types
``text/html`` and ``application/json`` are supported.

If the ``Accept`` header indicates that the response content type
should be HTML, the response body is a HTML document containing a
human-readable description of the endpoint.

If the Accept header indicates that the response content type should
be JSON, the response body is of one of the forms

.. parsed-literal::

   {"data": :samp:`{DATA}`}
   {"error": :samp:`{DESCRIPTION}`}
   {"data": :samp:`{DATA}`, "error": :samp:`{DESCRIPTION}`}

i.e. at least one of the ``"data"`` and ``"error"`` properties is
present. Both can be present if an error occurs while streaming the
body of an initially successful response.

The following endpoints are provided:

:samp:`http://{ADDRESS}:{PORT}/`

  Either the contents of the directory specified via the
  :option:`--document-root` option or built-in resource files are made
  available here.

:samp:`http://{ADDRESS}:{PORT}/api/introspection/snapshot`

  A JSON-serialization of a snapshot of the :term:`introspection` data
  for the system or systems specified via :samp:`{URI}`\s can be
  obtained here.

:samp:`http://{ADDRESS}:{PORT}/api/introspection/search`

  Query the :term:`introspection` database using XPath, receive
  JSON-serialized results.

  Return an atomic result for expressions not evaluating to node
  sets and an array of matches otherwise. An atomic result can be a
  number or string. For example, the result of the query::

    count(//@foo)

  is a number. A match can be an attribute match or an element match.

  Accepted query parameters:

  * ``query [required]``

    The (non-empty) query string. One of the following things:

    * An XPath expression.

    * One or more words: match any node (element, attribute, text)
      containing all words.

  * ``start: non-negative-integer [optional]``

    Index of first node in match sequence that should be returned.

  * ``limit: positive-integer [optional]``

    Number of nodes from the match sequence that should be returned.

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
