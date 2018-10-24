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
expression :regexp:`/([-_a-zA-Z0-9]+/)*`, i.e. scopes are
case-sensitive.

.. note::

   For convenience, the final ``/`` in scope strings may be omitted
   when specifying scopes in user interfaces. However, when scope
   strings are used as keys in associative arrays or in network
   protocols, scope strings have to be normalized such that they
   contain the terminating ``/``.

.. _specification-scope-reserved:

Reserved Scopes
===============

The scope ``/__rsb/`` and its :term:`subscopes <subscope>` are
reserved for implementation purposes and should not be used for
user-level communication.

.. _specification-scope-deriving:

Deriving Scopes from Strings
============================

When designing communication patterns based on |project|, it is
sometimes necessary to derive components of :term:`scopes <scope>`
from arbitrary strings. This section defines a procedure that should
be used when such a derivation is needed:

#. Replace any character of the input string that is not one of the
   allowed :term:`scope` component characters (i.e. ``[-_a-zA-Z0-9]``)
   with the ``_`` character.
#. The resulting string can be used as a component in a :term:`scope`.

.. note::

   Of course, this procedure does not necessarily produce distinct
   :term:`scope` components from distinct strings. This possibility of
   clashes has to be taken into account.

Implementations
===============

=========== ==============================================================
Language    File(s)
=========== ==============================================================
C++         |repository_versioned_cpp| at ``src/rsb/Scope.{h,cpp}``
Java        :download:`upstream/rsb-java/rsb-java/src/main/java/rsb/Scope.java`
Python      :download:`upstream/rsb-python/rsb/__init__.py`
Common Lisp :download:`upstream/rsb-cl/src/scope.lisp`
=========== ==============================================================
