.. _install-cl:

========================================================
 Installing the Common Lisp Implementation of |project|
========================================================

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

==================== ========================= ===============
System               Required                  Obtainable From
==================== ========================= ===============
alexandria           yes                       Quicklisp
split-sequence       yes                       Quicklisp
iterate              yes                       Quicklisp
metabang-bind        yes                       Quicklisp
bordeaux-threads     yes                       Quicklisp
closer-mop           yes                       Quicklisp
log5                 yes                       Quicklisp
puri                 yes                       Quicklisp
uuid                 yes                       Quicklisp
local-time           yes                       Quicklisp
cl-hooks             yes                       https://launchpad.net/cl-hooks
cl-dynamic-classes   yes                       |repository_versioned_cl| at ``cl-dynamic-classes``
cl-ppcre             for Regexp filtering      Quicklisp
cxml-stp             for XML event data        Quicklisp
xpath                for XPath event filtering Quicklisp
cl-protobuf          for Spread transport      |repository_versioned_cl| at ``cl-protobuf``
cl-spread            for Spread transport      |repository_versioned_cl| at ``cl-spread``
-- libspread         for Spread transport      See :ref:`C++ installation instructions <install-cpp>`
==================== ========================= ===============

Installation
============

#. Checkout ``cl-rsb`` system from |repository_versioned_cl|


#. Install other required systems:

   * ``cl-hooks``

     .. code-block:: sh

        bzr branch lp:cl-hooks

   * ``cl-dynamic-classes``
   * ``cl-protobuf``
   * ``cl-spread``

#. Load ``cl-rsb`` with `Quicklisp`_ to pull in remaining dependencies

   .. code-block:: cl

      (ql:quickload :cl-rsb)
