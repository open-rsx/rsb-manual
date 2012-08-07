.. _specification-scope:

Scope
=====

Scopes designate :term:`channel` instances on the unified bus. :term:`Channel` instances
are themselves hierarchical, hence scopes also reflect this
structure.

There is a string-based notation for scopes:
``/parent/sub/subsubscope/``. A scope is valid if it matches the
regular expression: ``/([a-zA-Z0-9]+/)*``.
