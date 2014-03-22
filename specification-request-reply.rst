.. _specification-request-reply:

=============================
 Request-Reply Communication
=============================

Overview
========

The Request/Reply communication pattern consists of two roles:

  ``Server`` (or ``LocalServer``), :term:`local server`
  :term:`participant`

    This class is instantiated in the service-providing |project|
    process. Provided methods are registered by name and signature.

  ``RemoteServer``, :term:`remote server` :term:`participant`

    This class is instantiated in the service-using |project|
    process. Each ``RemoteServer`` instance has one or more
    corresponding ``Server`` instances, potentially in different
    processes, that provide the service in question. Client code calls
    methods on the ``RemoteServer`` instance which cause methods of a
    ``Service`` instance to be called and perform the requested task.

For example:

.. digraph:: rpc_example

   fontname=Arial
   fontsize=11
   node [fontsize=11,fontname=Arial]
   edge [fontsize=11,fontname=Arial]

   subgraph cluster_process1 {
     label="process 1";
     "remoteserver" [shape=rectangle];
   }
   subgraph cluster_process2 {
     label="process 2";
     "server" [shape=rectangle];
   }

   "remoteserver" -> "server" [label="request: call method foo"];
   "server" -> "remoteserver" [label="reply: for foo call"];

.. important::

   If a single service is provided by more than one server, requests
   will be processed in all servers, but the client will only receive
   one, arbitrarily selected, reply.

   Conversely, if service is not provided by any server, the request
   part of method calls is performed, but a reply is never
   received. This situation is indistinguishable from a server which
   takes an infinitely long time to process request and can therefore
   not be detected by the caller. However, timeouts can be used handle
   absent and slow servers uniformly.

``Server``
==========

Conceptually, the ``Server`` instance is the root of the following
object tree:

* ``Server``

  * :term:`Scope`: :samp:`{SERVER-SCOPE}`
  * Method

    * Name: :samp:`{METHOD-NAME}`
    * :term:`Scope` :samp:`{SERVER-SCOPE}/{METHOD-NAME}/`
    * Request :term:`listener`

      * :term:`Scope`: :samp:`{SERVER-SCOPE}/{METHOD-NAME}/`
      * :term:`Handler`: passes received events to client code for
        processing
    * Reply :term:`informer`

      * :term:`Scope`: :samp:`{SERVER-SCOPE}/{METHOD-NAME}/`
  * more methods

``RemoteServer``
================

Conceptually, the ``RemoteServer`` instance is the root of the
following object tree:

* ``RemoteServer``

  * :term:`Scope`: :samp:`{SERVER-SCOPE}`
  * Method

    * Name: :samp:`{METHOD-NAME}`
    * :term:`Scope` :samp:`{SERVER-SCOPE}/{METHOD-NAME}/`
    * Request :term:`informer`

      * :term:`Scope`: :samp:`{SERVER-SCOPE}/{METHOD-NAME}/`
    * Reply :term:`listener`

      * :term:`Scope`: :samp:`{SERVER-SCOPE}/{METHOD-NAME}/`
      * :term:`Handler`: processes received replies to ultimately
        return a result to the client code which initiated the call
    * A collection of in-progress method calls
  * more methods

Protocol
========

#. Client code calls a method on a ``RemoteServer`` instance
#. The request :term:`informer` of the method publishes a request
   :term:`event` containing

   * The argument of the method call as :term:`payload`
   * The value ``"REQUEST"`` in its :term:`method field`

#. A record containing the :term:`event id` of the request
   :term:`event` is created for the method call
#. The call blocks until a reply :term:`event` is received (see below)
#. The request :term:`listener` of the method in a corresponding
   ``Server`` instance receives the :term:`event`
#. The request :term:`event` is dispatched to a handler for processing
#. After processing, the reply :term:`informer` of the method in the
   ``Server`` sends a reply :term:`event` containing

   * The result of the processing as :term:`payload`, if the
     processing succeeded without errors
   * The textual description of the error as :term:`payload`, if an
     error occurred
   * A user-info item with key ``rsb:error?`` and an arbitrary value,
     if an error occurred
   * The value ``"REPLY"`` in its :term:`method field`
   * The :term:`event id` of the request :term:`event` in its
     :term:`causal vector`

#. The reply listener of the method in the ``RemoteServer`` receives
   the reply :term:`event`
#. The call record is located using the :term:`event id` stored in the
   :term:`causal vector` of the reply :term:`event`
#. The blocking call is notified and

   * returns the :term:`payload` of the reply :term:`event`, if a
     user-item with key ``rsb:error?`` is not present in the
     :term:`event`
   * signals an error, if a user-item with key ``rsb:error?`` is
     present in the :term:`event`

Examples
========

TODO: include examples or link to tutorial?

Implementations
===============

=========== ====================================================
Language    File(s)
=========== ====================================================
C++         |repository_versioned_cpp| at ``src/rsb/patterns/``
Java        |repository_versioned_java| at ``src/rsb/patterns/``
Python      |repository_versioned_python| at ``rsb/patterns/``
Common Lisp |repository_versioned_cl| at ``src/patterns/``
=========== ====================================================
