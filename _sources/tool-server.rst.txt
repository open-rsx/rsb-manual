.. _tool-server:

========
 Server
========

.. program:: server

Synopsis
========

:samp:`rsb server {[OPTIONS]} {URI}*`

Description
===========

Run a server which accepts and services |project| :ref:`socket
<specification-socket>` :term:`transport` clients according to
:samp:`{URI}s` until terminated.

The :ref:`usual commandline options <common-options>` are
accepted.

Examples
========

* .. code-block:: sh

     $ rsb server


  In the above example, unless the |project| :ref:`configuration` is
  non-default, the :program:`server` command accepts :ref:`socket
  <specification-socket>` connections on the default port.

* .. code-block:: sh

     $ rsb server 'socket://localhost:0?portfile=/tmp/port.txt'

  In the above example, the :program:`server` command accepts
  :ref:`socket <specification-socket>` connections on an available
  port which is written into the file :file:`/tmp/port.txt` after it
  has been chosen.

  .. note::

     Note the use of single quotes (``'``) to prevent the shell from
     interpreting syntactically relevant characters in the URI.

Implementations
===============

======================= ============= ===============================
Implementation Language Project       Repository Link
======================= ============= ===============================
Common Lisp             rsb-tools-cl  |repository_versioned_tools_cl|
======================= ============= ===============================
