.. _logger:
.. _tool-logger:

========
 Logger
========

.. program:: logger

Synopsis
========

:samp:`rsb logger {[OPTIONS]} {URI*}`

Description
===========

The logger participates in the :term:`channels <channel>` designated
by :samp:`{URI}`\ s (see :ref:`uri-schema`) using one or more
:term:`transports <transport>` and displays all :term:`events <event>`
published on the :term:`channels <channel>` using a configurable
style.

The usual :ref:`commandline options <common-options>`,
:ref:`IDL-related options <idl-options>` and :ref:`environment
variables <common-environment-variables>` are accepted. Specialized
commandline options:

.. option:: --filter SPEC, -f SPEC

   Specify a :term:`filter` that received :term:`events <event>` have
   to match in order to be processed rather than discarded. This
   option can be supplied multiple times in which case :term:`events
   <event>` have to match all specified :term:`filters <filter>`. Each
   :samp:`{SPEC}` has to be of one of the forms::

     KIND
     KIND SINGLE-VALUE
     KIND KEY1 VALUE1 KEY2 VALUE2 ...

   where keys and values depend on :samp:`{KIND}` and may be mandatory
   in some cases. Examples (note that the single quotes have to be
   included only when used within a shell)

   .. code-block:: sh

      --filter 'origin "EAEE2B00-AF4B-11E0-8930-001AA0342D7D"'
      --filter 'regex ".*foo[0-9]+"'
      --filter 'regex :regex ".*foo[0-9]+"' (equivalent)
      -f 'xpath :xpath "node()/@foo" :fallback-policy :do-not-match'

   .. tip::

      Use the :option:`common --help-for` ``filter`` or
      :option:`common --help-for` ``all`` options to display the full
      help text for this item.

.. option:: --style SPEC, -s SPEC

   Specify a formatting style that should be used to print
   :term:`events <event>`. :samp:`{SPEC}` has to be of the form::

     KIND KEY1 VALUE1 KEY2 VALUE2 ...

   where keys and values are optional and depend on
   :samp:`{KIND}`. Examples (note that the single quotes have to be
   included only when used within a shell)

   .. code-block:: sh

     --style detailed
     -s compact
     --style 'compact :separator "|"'
     --style 'columns :columns (:now (:scope :width 12) :id :newline)'

   .. tip::

      Use the :option:`common --help-for` ``styles`` or
      :option:`common --help-for` ``all`` options to display the full
      help text for this item.

      Use :option:`common --help-for` ``columns`` and
      :option:`common --help-for` ``quantities`` for explanations of
      the ``:columns`` argument and quantity columns used in the
      ``columns`` and ``statistics`` styles.

.. option:: --max-queued-events POSITIVE-INTEGER

   Specify the maximum number of :term:`events <event>` that may be
   kept in a queue in case processing (usually printing) cannot keep
   up with the rate of incoming :term:`events <event>`.

   This queue can smooth over bursts of :term:`events <event>`, but if
   the sustained rate of incoming :term:`events <event>` is above the
   maximum processing speed, it will overflow and an error will be
   signaled. The behavior in this case can be controlled via
   :option:`common --on-error`.

.. option:: --stop-after NUMBER-OF-EVENTS

   Terminate after the specified number of :term:`events <event>` have
   been processed.

Examples
========

* .. code-block:: sh

     $ logger --style detailed /
     Event
       Scope  /
       Id     ac5f449c-4aa1-4b03-a9e2-3fac7d38e651
       Type   bytearray
       Origin ab6e3a17-e11f-4c89-8c07-606a009e8439
     Timestamps
       Create  2011-Jul-03 12:51:11.802849+??:??
       Send    2011-Jul-03 12:51:11.802950+??:??
       Receive 2011-Jul-03 12:51:11.810332+??:??
       Deliver 2011-Jul-03 12:51:11.810572+??:??
     Payload (bytearray, length 100000)
       0x0000 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
       0x0017 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
       0x002e 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
       0x0045 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ...
     -------------------------------------------------------------------------------
     Event
       Scope  /
       Id     3fd721ef-6e7c-4e81-bd5f-ff215b2b965f
       Type   std::string
       Origin 8e07e02a-0dee-44a2-8926-cc65c0285410
     Timestamps
       Create  2011-Jul-03 12:51:20.102403+??:??
       Send    2011-Jul-03 12:51:20.102482+??:??
       Receive 2011-Jul-03 12:51:20.105319+??:??
       Deliver 2011-Jul-03 12:51:20.105404+??:??
     Payload (std::string, length 3)
       foo
     -------------------------------------------------------------------------------

  In the above example, the C++ version of the :program:`logger` is
  instructed to participate in the :term:`channel` designated by the
  root :term:`scope` ``/``. This means that the :program:`logger` will
  display all :term:`events <event>` which are receivable using its
  configured :term:`transports <transport>`. In this example, the
  configured :term:`transports <transport>` depend on the |project|
  :ref:`configuration file and environment variables <configuration>`.

* .. code-block:: sh

     $ ls ~/projects/talk-rsb-data/code/*.proto
     /homes/jmoringe/projects/talk-rsb-data/code/Image.proto
     $ rsb logger --style detailed                                     \
                  --load-idl ~/projects/talk-rsb/data/code/Image.proto \
                  spread:
     Event
       Scope : /
       Id    : 89064E22-C503-44DA-9C65-9385C29D09A1
       Type  : T
       Origin: ABB03F86-655A-42EE-9D5B-26D34C922A3A
     Timestamps
       Create : 2011-07-16T00:28:52.123994+02:00
       Send   : 2011-07-16T00:28:52.124095+02:00
       Receive: 2011-07-16T00:28:52.235294+02:00
       Deliver: 2011-07-16T00:28:52.243197+02:00
     Payload (RUNNING.EXAMPLE:IMAGE)
       #<IMAGE {1005B10C81}>
         Meta-Data: #<META-DATA {10063AF2B1}>
                      Key  : "foo"
                      Value: "bar"
         Width    : 20
         Height   : 30
         Depths   : 20
                    10
         Data     : 01 02 03 04
     -------------------------------------------------------------------------------

  In the above example, the Common Lisp version of the
  :program:`logger` is used to display protocol buffer :term:`event`
  :term:`payloads <payload>`. This only works, if the
  :program:`logger` is provided with the protocol buffer IDL
  definitions of the :term:`event` :term:`payloads <payload>` it
  should display (in this example: the ``running.example.Image``
  message from the slides used in this meeting). These definitions can
  either be textual definitions, typically found in ``.proto`` files
  (as in this example), or compiled, binary descriptions (not shown).

* .. code-block:: sh

     $ rsb logger --idl-path "rst/trunk/rst/proto/sandbox/"   \
                  --idl-path "rst/trunk/rst/proto/stable/"    \
                  --load-idl 'rst/trunk/rst/proto/**/*.proto' \
                  --style detailed                            \
                  spread:

  Here is another example which loads all definitions contained in the
  `Robotics Systems Types <https://code.cor-lab.org/projects/rst>`_
  repository.

  .. note::

     The :option:`common --idl-path` option for import resolution and
     wildcards are used to load all definitions at once.

     Loading all definitions takes a few seconds.

Implementations
===============

======================= ============= ================================
Implementation Language Project       Repository Link
======================= ============= ================================
C++                     rsb-tools-cpp |repository_versioned_tools_cpp|
Common Lisp             rsb-tools-cl  |repository_versioned_tools_cl|
======================= ============= ================================
