.. RSB Manual documentation master file, created by
   sphinx-quickstart on Mon Dec 19 14:54:53 2011.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

.. _rsb:

Welcome to the |project| Manual! (for version |version|)
========================================================

The Robotics Service Bus (|project|) is a message-oriented,
event-driven middleware aiming at scalable integration of robotics
systems in diverse environments. Being fundamentally a bus
architecture, |project| structures heterogeneous systems of service
providers and consumers using broadcast communication over a hierarchy
of logically unified channels instead of a large number of
point-to-point connections. Nevertheless |project| comes with a
collection of communication patterns and other tools for structuring
communication, but does not require a particular functional or
decomposition style.

|project| is implemented as a flexible, lightweight toolkit. Based on
previous experiences, the design and implementation try to avoid
centralization and complicated dependency structures. Instead,
functionality is organized in layers with minimal, clearly stated
dependencies. The core library merely supplies the abstractions and
machinery for building communication systems subject to varying
requirements. This core is implemented in multiple programming
languages with implementations trying to be in the spirit of the
respective language as much as possible. As a result, |project| is not
tied to a particular network transport, serialization mechanism or
programming language. In addition, much effort is put into systematic
testing and continuous integration.

These conceptual and implementation properties hopefully allow
|project| to scale across a wider range of diverse functional
requirements, heterogeneous hardware platforms and varying reliability
and timing requirements than other robotics middlewares. Additionally,
|project|'s open architecture and project structure and lightweight
implementation enable its use with small entry barriers and little
framework lock-in.

Contents:

.. toctree::
   :maxdepth: 2

   concepts
   tutorial
   tools

.. toctree::
   :hidden:

   glossary

Indices and tables
==================

* :ref:`genindex`
* :ref:`glossary`
* :ref:`search`
