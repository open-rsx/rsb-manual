.. _specification:

===============
 Specification
===============

Concepts:

.. toctree::
   :maxdepth: 1

   specification-scope
   specification-event
   specification-uris

.. _specification-transports:

Transports
==========

There are two kinds of :term:`transport` implementations in |project|:

#. :term:`Transport` implementations which use a |project|-specific
   communication protocol. These can be employed in |project|-only
   systems and selected based on their functional and non-functional
   properties. The following :term:`transport` implementations fall
   into this category:

   .. toctree::
      :maxdepth: 1

      specification-inprocess
      specification-spread
      specification-socket

#. :term:`Transport` implementations allowing |project| clients to
   communicate with components which are based on other
   middlewares. This category consists of the following
   :term:`transport` implementations:

   .. toctree::
      :maxdepth: 1

      specification-zmq

Other :term:`transport`-related topics:

.. toctree::
   :maxdepth: 1

   specification-multiple-transports

Higher-Level Communication Patterns
===================================

.. toctree::
   :maxdepth: 1

   specification-request-reply
