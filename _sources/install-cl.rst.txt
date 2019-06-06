.. _install-cl:

============================
 Common Lisp Implementation
============================

Prerequisites
=============

Supported Lisp Implementations
------------------------------

Currently, only  `SBCL`_ is supported.

Required Infrastructure
-----------------------

* `ASDF`_ is used for compilation, loading and dependency management.
* `Quicklisp`_ is recommended for installation of dependencies.

External Dependencies
---------------------

============================= ============================================================ ========================================================
System                        Required?                                                    Obtainable From
============================= ============================================================ ========================================================
alexandria                    yes                                                          Quicklisp
split-sequence                yes                                                          Quicklisp
iterate                       yes                                                          Quicklisp
let-plus                      yes                                                          Quicklisp
more-conditions               yes                                                          Quicklisp
bordeaux-threads              yes                                                          Quicklisp
lparallel                     yes                                                          Quicklisp
trivial-garbage               yes                                                          Quicklisp
closer-mop                    yes                                                          Quicklisp
cl-hooks                      yes                                                          Quicklisp
log4cl                        yes                                                          Quicklisp
nibbles                       yes                                                          Quicklisp
puri                          yes                                                          Quicklisp
uuid                          yes                                                          Quicklisp
local-time                    yes                                                          Quicklisp
utilities.print-items         yes                                                          Quicklisp
utilities.binary-dump         yes                                                          Quicklisp
cl-ppcre                      for Regexp filtering                                         Quicklisp
cxml-stp                      for XML :term:`payload`                                      Quicklisp
xpath                         for XPath filtering                                          Quicklisp
cl-protobuf                   for Socket and :term:`Spread` :term:`transports <transport>` https://github.com/scymtym/cl-protobuf
network.spread                for :term:`Spread` :term:`transport`                         https://github.com/scymtym/network.spread
architecture.builder-protocol for ``rsb-*-builder`` systems                                https://github.com/scymtym/architecture.builder-protocol
============================= ============================================================ ========================================================

.. note::

   The ``network.spread`` system requires the ``libspread`` library
   (which is written in C). For installing the library, see :ref:`C++
   installation instructions <install-cpp>`.

Installation
============

#. Checkout ``cl-rsb`` system from |repository_versioned_cl|

#. Install other additional systems:

   * ``cl-protobuf``
   * ``network.spread``
   * ``architecture.builder-protocol`` (optional)

   .. code-block:: sh

      cd "${quicklisp}/local-projects"
      git clone https://github.com/scymtym/cl-protobuf
      git clone https://github.com/scymtym/network.spread
      git clone https://github.com/scymtym/architecture.builder-protocol
      sbcl --load "${quicklisp}/setup.lisp" --eval '(ql:register-local-projects)' --quit

#. Load ``cl-rsb`` (and e.g. the :ref:`socket <specification-socket>`
   :term:`transport`) with `Quicklisp`_ to pull in remaining
   dependencies:

   .. code-block:: cl

      (ql:quickload '(:cl-rsb :rsb-transport-socket))
