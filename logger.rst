Logger
------

.. program:: logger

Synopsis
^^^^^^^^

:samp:`logger {[OPTIONS]} {[URI]}`

Description
^^^^^^^^^^^

The :program:`logger` participates in the :term:`channel` designated
by :samp:`{URI}` using one or more :term:`transports` and displays all
:term:`events` published on the channel using a configurable style.

.. option:: --version

   Display version information.

.. option:: --help

   Display help.

.. option:: --help-for THING

   Display help for :samp:`{THING}`.

.. option:: --filter SPEC, -f

   Specify a :term:`filter` that received :term:`events` have to match
   in order to be processed rather than discarded. This option can be
   supplied multiple times in which case :term:`events` have to match
   all specified :term:`filters`. Each :samp:`{SPEC}` has to be of one
   of the forms::

     KIND | KIND SINGLE-VALUE | KIND KEY1 VALUE1 KEY2 VALUE2 ...

   where keys and values depend on :samp:`{KIND}` and may be mandatory
   in some cases. Examples (note that the single quotes have to be
   included only when used within a shell)::

     --filter 'origin "EAEE2B00-AF4B-11E0-8930-001AA0342D7D"'
     --filter 'regex ".*foo[0-9]+"'
     --filter 'regex :regex ".*foo[0-9]+"' (equivalent)
     -f 'xpath :xpath "node()/@foo" :fallback-policy :do-not-match'

   Use :option:`--help-for` to display the full help text for this
   item.

.. option:: --style SPEC, -s

   Specify a formatting style that should be used to print
   :term:`events`. :samp:`{SPEC}` has to be of the form::

     KIND KEY1 VALUE1 KEY2 VALUE2 ...

   where keys and values are optional and depend on
   :samp:`{KIND}`. Examples (note that the single quotes have to be
   included only when used within a shell)::

     --style detailed
     -s compact
     --style 'compact :separator "|"'
     --style 'columns :columns (:now (:scope :width 12) :id :newline)'

   .. Tip::

      See extended help, enable with :option:`--help-for` ``columns``,
      for an explanation of the ``:columns`` argument.

   Use the :option:`--help-for` ``styles`` or :option:`--help-for`
   ``columns`` or :option:`--help-for` ``quantities`` or
   :option:`--help-for` ``all`` options to display the full help text
   for this item.

.. option:: --idl-path DIRECTORIES, -I DIRECTORIES

   A list of paths from which data definitions should be loaded. This
   option can be supplied multiple times.

.. option:: --load-idl FILE-OR-GLOB-EXPRESSION, -l FILE-OR-GLOB-EXPRESSION

   Load data definition from :samp:`{FILE-OR-GLOB-EXPRESSION}`. If a
   glob expression is specified, in addition to the canonical globbing
   syntax, expressions of the form::

     SOMESTUFF/**/MORESTUFF

   can be used to search directories recursively. If the file
   designated by :samp:`{FILE-OR-GLOB-EXPRESSION}` depend on
   additional data definition files (i.e. contain ``import``
   statements), the list of directories supplied via the
   :option:`--idl-path` option is consulted to find these files. This
   option can be supplied multiple times.

Examples
^^^^^^^^

In the following example, the C++ version of the :program:`logger` is
instructed to participate in the :term:`channel` designated by the
root :term:`scope` ``/``. This means that the :program:`logger` will
display all :term:`events` which are receivable using its configured
:term:`transports`. In this example, the configured :term:`transports`
depend on the RSB configuration file and environment variables.::

  $ ./rsblogger --format detailed /
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

Inspection of protocol buffer :term:`event` :term:`payloads`: In this
example, the Common Lisp version of the :program:`logger` is used to
display protocol buffer :term:`event` :term:`payloads`. This only
works, if the :program:`logger` is provided with the protocol buffer
IDL definitions of the :term:`event` :term:`payloads` it should
display (in this example: the ``running.example.Image`` message from
the slides used in this meeting). These definitions can either be
textual definitions, typically found in .proto files (as in this
example), or compiled, binary descriptions (not shown).::

  $ ls ~/projects/talk-rsb-data/code/*.proto
  /homes/jmoringe/projects/talk-rsb-data/code/Image.proto
  $ ./logger-builtin-spread --style detailed                                     \
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


Here is another example which loads all definitions contained in the
`Robotics Systems Types <https://code.cor-lab.org/projects/rst>`_
repository. Note the use of the :option:`--idl-path` option for import
resolution and the use of wildcards to load all definitions at
once. Also note that loading all definitions takes a few seconds.::

  $ ./logger-builtin-spread --idl-path "~/code/cor-lab/rst/trunk/rst/proto/sandbox/"   \
                            --idl-path "~/code/cor-lab/rst/trunk/rst/proto/stable/"    \
                            --load-idl '~/code/cor-lab/rst/trunk/rst/proto/**/*.proto' \
                            --style detailed spread:

Implementations
---------------

======================= ============= ====================================== ===============
Implementation Language Project       Repository Link                        Compiled Binary
======================= ============= ====================================== ===============
C++                     rsb-cpp-tools |repository_versioned|/cpp/tools       Artifacts of this Jenkins job
Common Lisp             cl-rsb-tools  |repository_versioned|/cl/cl-rsb-tools Linux i686, Linux x86_64, MacOS x86_64
======================= ============= ====================================== ===============
