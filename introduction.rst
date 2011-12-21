Introduction
============

The Robotics Service Bus (RSB) is a message-oriented, event-driven
middleware aiming at scalable integration of robotics systems in
diverse environments. Being fundamentally a bus architecture, RSB
structures heterogeneous systems of service providers and consumers
using broadcast communication over a hierarchy of logically unified
channels instead of a large number of point-to-point
connections. Nevertheless RSB comes with a collection of communication
patterns and other tools for structuring communication, but does not
require a particular functional or decomposition style.

RSB is implemented as a flexible, lightweight toolkit. Based on
previous experiences, the design and implementation try to avoid
centralization and complicated dependency structures. Instead,
functionality is organized in layers with minimal, clearly stated
dependencies. The core library merely supplies the abstractions and
machinery for building communication systems subject to varying
requirements. This core is implemented in multiple programming
languages with implementations trying to be in the spirit of the
respective language as much as possible. As a result, RSB is not tied
to a particular network transport, serialization mechanism or
programming language. In addition, much effort is put into systematic
testing and continuous integration.

These conceptual and implementation properties hopefully allow RSB to
scale across a wider range of diverse functional requirements,
heterogeneous hardware platforms and varying reliability and timing
requirements than other robotics middlewares. Additionally, RSB's open
architecture and project structure and lightweight implementation
enable its use with small entry barriers and little framework lock-in.
