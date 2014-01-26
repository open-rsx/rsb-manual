.. _install-cl:

============================
 Common Lisp Implementation
============================

Prerequisites
=============

Supported Lisp Implementations
------------------------------

Currently, only recent versions (e.g. 1.0.55 or newer) of `SBCL`_ are
fully supported.

Required Infrastructure
-----------------------

* `ASDF`_ is used for compilation, loading and dependency management
* `Quicklisp`_ is used for installation of dependencies

External Dependencies
---------------------

==================== ==================================== ======================================================
System               Required?                            Obtainable From
==================== ==================================== ======================================================
alexandria           yes                                  Quicklisp
split-sequence       yes                                  Quicklisp
iterate              yes                                  Quicklisp
let-plus             yes                                  Quicklisp
more-conditions      yes                                  Quicklisp
bordeaux-threads     yes                                  Quicklisp
lparallel            yes                                  Quicklisp
trivial-garbage      yes                                  Quicklisp
closer-mop           yes                                  Quicklisp
cl-hooks             yes                                  Quicklisp
cl-dynamic-classes   yes                                  -
log4cl               yes                                  Quicklisp
nibbles              yes                                  Quicklisp
puri                 yes                                  Quicklisp
uuid                 yes                                  Quicklisp
local-time           yes                                  Quicklisp
cl-ppcre             for Regexp filtering                 Quicklisp
cxml-stp             for XML :term:`payload`              Quicklisp
xpath                for XPath filtering                  Quicklisp
cl-protobuf          for :term:`Spread` :term:`transport` -
network.spread       for :term:`Spread` :term:`transport` http://github.com/scymtym/network.spread
-- libspread         for :term:`Spread` :term:`transport` See :ref:`C++ installation instructions <install-cpp>`
==================== ==================================== ======================================================

Installation
============

#. Checkout ``cl-rsb`` system from |repository_versioned_cl|


#. Install other required systems:

   * ``cl-dynamic-classes``
   * ``cl-protobuf``
   * ``network.spread``

#. Load ``cl-rsb`` with `Quicklisp`_ to pull in remaining dependencies

   .. code-block:: cl

      (ql:quickload :cl-rsb)
