.. _specification-scope:

=======
 Scope
=======

Scopes designate :term:`channel` instances on the unified
bus. :term:`Channel` instances are themselves hierarchical, hence
scopes also reflect this structure.

Scope Strings
=============

There is a string-based notation for scopes based on UNIX/URL
paths. For example::

  /a/b/c/

This scope designates the :term:`channel` ``/a/b/c/`` which is a
sub-:term:`channel` of the :term:`channels <channel>` designated by::

  /a/b/
  /a/
  /

``/`` is sometimes called "root-scope".

Generally, a scope string is valid if it matches the regular
expression :regexp:`/([-_a-zA-Z0-9]+/)*`.

.. note::

   For convenience, the final ``/`` in scope strings may be omitted
   when specifying scopes in user interfaces. However, when scope
   strings are used as keys in associative arrays or in network
   protocols, scope strings have to be normalized such that they
   contain the terminating ``/``.

.. important::

   Scope strings are currently case-sensitive, but this may change in
   future releases. We recommend using all-lowercase scope strings.

.. _specification-scope-reserved:

Reserved Scopes
===============

The scope ``/__rsb/`` and its :term:`subscopes <subscope>` are
reserved for implementation purposes and should not be used for
user-level communication.

Implementations
===============

=========== =======================================================
Language    File(s)
=========== =======================================================
C++         |repository_versioned_cpp| at ``src/rsb/Scope.{h,cpp}``
Java        :download:`/../rsb-java/src/rsb/Scope.java`
Python      :download:`/../rsb-python/rsb/__init__.py`
Common Lisp :download:`/../rsb-cl/src/scope.lisp`
=========== =======================================================
