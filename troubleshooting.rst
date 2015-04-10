.. _troubleshooting:

===============
Troubleshooting
===============

.. seealso::

   :ref:`support`
     If this page doesn't help

.. _troubleshooting-reporting-bugs:

Reporting Bugs
==============

Problem *(applies to all implementations)*

  I'm pretty sure I have found a bug in |project|. What can I do about
  it?

Solution

  First of all, it is entirely possible that you found a bug. We
  appreciate bug reports and encourage you to report all (suspected)
  bugs you see, even if you are not entirely certain. Bug reports
  about things that turn out to not actually be bugs are expected and
  not a problem. However, to save yourself and us time and effort, we
  ask you to keep the following things in mind when reporting bugs.

  Check whether the problem is known: go to `new issue`_ and try to
  find a description of the problem in the "Issues" list. If there is
  none, create a new issue (see below), otherwise edit and extend the
  existing issue as necessary.

  Include the following information in your bug report:

    Platform

      Mainly operating system and processor architecture. For example,
      "Ubuntu Precise on x86_64" is a very helpful description.

    Programs and Programming Languages

      In which programming language did you write the failing program?
      If multiple programs are expected to communicate, briefly
      describe the whole setup.

    |project| Version

      Describe which |project| version you are using and how you
      obtained it (e.g. installed Debian packages, compiled from
      source, etc.).

    What did you do?

      Describe what your code does (and include the code, if possible)
      and/or which programs you started. If you use a |project|
      configuration file or environment variables, please describe
      those as well.

    What did you expect to happen?

      For example: "I expected the :term:`listener` to receive the
      :term:`event` sent by the :term:`informer`".

    What happened instead?

      For example: "The :term:`listener` did not receive any
      :term:`events <event>`" or "The program crashed with the
      following backtrace" (include error messages and/or backtraces
      whenever possible).

  Creating the Report as a `new issue`_:

  * In the "Subject" field, try do give a brief description of the
    specific problem. That is, if you can, write "In C++,
    :term:`informer` crashes when trying to send std::string data"
    instead of "|project| crashes".

  * Put the information mentioned above into the "Description" field
    and select the value of the "Category" field according to the
    program and/or programming language.

  * Please try to report bugs in the correct project. We understand
    that this may be hard to figure out and a bug report in the
    "wrong" project is definitely better than no bug report at all.

.. _troubleshooting-spread-does-not-work:

Spread Does not Work
====================

Problem *(applies to C++, Python)*

  Communication over :term:`Spread` does not work
  anymore. :term:`Spread` settings are ignored.

Solution

  #. :term:`Spread` :term:`plugin` *(applies to C++)*

     .. seealso::

        :ref:`specification-plugin`
          Specification of |project| plugins

     Starting with version 0.9, the C++ implementation does no longer
     include the :term:`Spread`-based :term:`transport` in the
     |project| core. Instead, the :term:`transport` is available as a
     :term:`plugin` which has to be loaded explicitly. This can, for
     example, be done by including the following fragment in one of
     the |project| :ref:`configuration files <configuration>`
     |system_config_file|, |user_config_file| or |pwd_config_file|:

     .. code-block:: ini

        [plugins.cpp]
        load = rsbspread

  #. :ref:`Configuration`

     Starting with version 0.7, |project| uses a :term:`transport`
     that implements a :ref:`custom TCP-based protocol
     <specification-socket>` to facilitate the easy use of the
     framework without dependencies on 3rd party libraries. In order
     to restore the previous behavior of using the :term:`Spread`
     :term:`transport`, the configuration needs to be changed.

     This can be changed in three ways:

     #. Globally for all |project| programs (or running under a
        particular UNIX user)

        Create or modify a |project| :ref:`configuration file
        <configuration>` |system_config_file| or |user_config_file| to
        contain the following lines:

        .. code-block:: ini
           :linenos:

           [transport.spread]
           enabled = 1
           [transport.socket]
           enabled = 0

        Lines 3 and 4 can be omitted to enable both :term:`transports
        <transport>` in parallel.

        .. note::

           On windows it might be necessary to also set ``host =
           localhost`` and ``port = 4803`` explicitly in the
           :term:`Spread` :term:`transport` section.

     #. Locally for the current directory

        Create a |project| :ref:`configuration file <configuration>`
        |pwd_config_file| with the same contents as described above.

     #. For the current shell

        Set and export :envvar:`RSB_TRANSPORT_SPREAD_ENABLED` and
        :envvar:`RSB_TRANSPORT_SOCKET_ENABLED` :ref:`environment
        variables <common-environment-variables>` as follows:

        .. code-block:: sh

           $ export RSB_TRANSPORT_SPREAD_ENABLED=1
           $ export RSB_TRANSPORT_SOCKET_ENABLED=0

.. _troubleshooting-configuring-the-tcp-based-transport:

Configuring the TCP-based Transport
===================================

Problem *(applies to C++,Common Lisp,Python)*

  How can I :ref:`configure <configuration>` the TCP-based
  :term:`transport`?

Solution

  The TCP-based :term:`transport` can be :ref:`configured
  <configuration>` locally or globally by placing the following
  content in |system_config_file|, |user_config_file| or
  |pwd_config_file|:

  .. code-block:: ini

     [transport.socket]
     enabled = 1
     host    = HOSTNAME
     port    = 4444
     server  = auto

  :samp:`{HOSTNAME}` can be ``localhost`` (if all processes are
  going to run on the same node), a hostname or an IP address.

  .. note::

     The above configuration uses ``server = auto`` which causes the
     initial |project| process to create the specified server and
     subsequent processes to connect to that server, see
     :envvar:`RSB_TRANSPORT_SOCKET_SERVER`.

.. _troubleshooting-linker-errors-at-runtime:

Linker Errors at Runtime
========================

Problem *(applies to C++)*

  I compiled and installed successfully, but |project|
  binaries/libraries produce linker errors at runtime.

Solution

  The C++ implementation of |project| is built without fixed `rpath
  <http://en.wikipedia.org/wiki/Rpath>`_ by default. As a result,
  installed |project| binaries and libraries do not contain
  information regarding the location of their dependencies. This
  potentially causes runtime linking to fail because the
  dependencies cannot be located.

  There are two possible solutions:

  #. Building and installing |project| with fixed rpath

     This can be achieved by configuring |project| with

     .. code-block:: sh

        $ cmake -DCMAKE_INSTALL_RPATH_USE_LINK_PATH=TRUE

     This instructs `CMake`_ to set the rpath of installed
     libraries and executables to the values used for building
     them. Normally the rpath is stripped at installation time.

  #. Use of the :envvar:`LD_LIBRARY_PATH` environment variable

     When the value of :envvar:`LD_LIBRARY_PATH` contains the
     directory/directories into which |project| (and its
     dependencies) have been installed, these dependencies can be
     located at runtime. :envvar:`LD_LIBRARY_PATH` can be set, for
     example, like this:

     .. code-block:: sh

        $ export LD_LIBRARY_PATH=PREFIX/lib

     where :samp:`{PREFIX}` is the prefix directory into which
     |project| and its dependencies have been installed.

     .. warning::

        This workaround is not permanent and has to be repeated for
        each new shell that should be able to execute |project|
        binaries or |project|-based programs.

.. _troubleshooting-spread-warning-in-tools:

Spread Warning in Tools
=======================

Problem *(applies to Common Lisp)*

  When I start any of the :ref:`tools`, the following happens:

  .. code-block:: sh

     $ logger socket://localhost:7777
     WARNING:
       Failed to load Spread library: Unable to load any of the alternatives:
       ("libspread-without-signal-blocking.so" "libspread.so" "libspread.so.2"
        "libspread.so.2.0" "libspread.so.1").
       Did you set LD_LIBRARY_PATH?
       Spread transport will now be disabled.
     [execution continues, but Spread transport does not work]

Solution

  Place one of the mentioned :term:`Spread` libraries (typically
  :file:`libspread.so.2.0`) on the system library search path or
  set :envvar:`LD_LIBRARY_PATH` appropriately.

.. _troubleshooting-missing-converters:

Missing Converters
==================

.. seealso::

  :ref:`tutorial-converters-register`
     Registering additional :term:`converters <converter>`

Problem *(applies to all implementations)*

  When a :term:`listener` in my component receives certain
  :term:`events <event>`, it crashes and complains about missing
  :term:`converters <converter>`. For example like this:

  .. parsed-literal::

     $ ./myconponent
     [...]
     terminate called after throwing an instance of '\ :cpp:class:`rsc::runtime::NoSuchObject`\ '
       what():  No :term:`converter` for :term:`wire-schema <wire schema>` or :term:`data-type <data type>` \`.rst.vision.Image'.
     Available :term:`converters <converter>`: {
       bool: \*rsb::converter::BoolConverter[wireType = std::string, wireSchema = bool, dataType = bool] at 0x9d0b80
       [...]
     }

Solution

  There can be several solutions to this problem.

  #. The :term:`listener` could receive unexpected :term:`events
     <event>`. This can be diagnosed using the :ref:`logger
     <logger>`. If the :term:`listener` does indeed receive unexpected
     :term:`events <event>`, the problem can be fixed by letting the
     offending :term:`informer` or the :term:`listener` itself operate
     on a different :term:`scope`.

  #. The :term:`converter` configuration could be wrong. If the
     :term:`listener` only receives expected :term:`events <event>`, it
     may be missing a suitable converter. This problem can be solved by
     registering a suitable :term:`converter`. Registering a
     :term:`converter` may be achieved by loading a :term:`plugin`.

  #. The :term:`converter` registration could happen after the
     :term:`listener` has already been created. In that case, the
     :term:`listener` would use the "old" set of :term:`converters
     <converter>`.

.. _troubleshooting-polymorphic-informers:

Polymorphic Informers
=====================

Problem *(applies to C++)*

  I thought it is possible, to send different :term:`data types <data
  type>` through the same :term:`informer`. However, I get this error
  (also using :cpp:class:`rsb::InformerBase`)

   .. parsed-literal::

      terminate called after throwing an instance of '\ :cpp:class:`std::invalid_argument`\ '
      what(): Specified :term:`event` type :samp:`{PAYLOAD-TYPE}` does not match :term:`informer` type :samp:`{INFORMER-TYPE}`.
      Aborted (core dumped)

  .. note::

     In the actual error message, :samp:`{PAYLOAD-TYPE}` and
     :samp:`{INFORMER-TYPE}` would be the :term:`data type` of the
     :term:`payload` attempted to send and the specified :term:`data
     type` of the :term:`informer` respectively.

Solution

  This can be achieved by specifying the pseudo-type
  :cpp:class:`rsb::AnyType` as the :term:`data type` of the created
  :term:`informer`:

  .. literalinclude:: /../rsb-cpp/examples/informer/anyInformer.cpp
     :language:        c++
     :lines:           49-57
     :emphasize-lines: 51-21
     :linenos:

.. note::

   In all other |project| implementations, this kind of
   :term:`informer` can be created by specifying a builtin supertype
   such as ``Object`` (Java), ``object`` (Python) or ``t`` (Common
   Lisp) as the :term:`data type` of the :term:`informer`.

.. _troubleshooting-compile-qt:

Compilation Errors in Combination with Qt
=========================================

Problem *(applies to C++)*

  Client code using |project| in combination with `Qt
  <http://qt-project.org/>`_ does not compile correctly. It seems that random
  errors appear in system header comparable to the following compiler output:

  .. parsed-literal::

        In file included from /usr/include/boost/signals/connection.hpp:13:0,
                         from /usr/include/boost/signals/signal_template.hpp:18,
                         from /usr/include/boost/signals/signal0.hpp:24,
                         from /usr/include/boost/signal.hpp:19,
                         from /vol/csra/releases/nightly/share/rsb0.11/../../include/rsb0.11/rsb/Factory.h:34,
                         from /vol/csra/jenkins/jobs/humavips-headtracking-trunk-toolkit-nightly/workspace/label/master/cxx/image_processing/image_processing/ip_RsbImageProvider.h:40,
                         from /vol/csra/jenkins/jobs/humavips-headtracking-trunk-toolkit-nightly/workspace/label/master/cxx/image_processing/src/ip_DisparityImageProcessor.cc:32:
        /usr/include/boost/signals/detail/signals_common.hpp:26:13: error: expected identifier before ‘protected’
        /usr/include/boost/signals/detail/signals_common.hpp:26:13: error: expected unqualified-id before ‘protected’
        In file included from /usr/include/boost/units/detail/utility.hpp:20:0,
                         from /usr/include/boost/exception/detail/type_info.hpp:19,
                         from /usr/include/boost/exception/detail/object_hex_dump.hpp:15,
                         from /usr/include/boost/exception/to_string_stub.hpp:16,
                         from /usr/include/boost/exception/info.hpp:16,
                         from /usr/include/boost/exception/detail/exception_ptr.hpp:20,
                         from /usr/include/boost/exception_ptr.hpp:9,
                         from /usr/include/boost/thread/future.hpp:14,
                         from /usr/include/boost/thread.hpp:24,
                         from /vol/csra/releases/nightly/share/rsc0.11/../../include/rsc0.11/rsc/patterns/Singleton.h:31,
                         from /vol/csra/releases/nightly/share/rsb0.11/../../include/rsb0.11/rsb/Factory.h:41,
                         from /vol/csra/jenkins/jobs/humavips-headtracking-trunk-toolkit-nightly/workspace/label/master/cxx/image_processing/image_processing/ip_RsbImageProvider.h:40,
                         from /vol/csra/jenkins/jobs/humavips-headtracking-trunk-toolkit-nightly/workspace/label/master/cxx/image_processing/src/ip_DisparityImageProcessor.cc:32:
        /usr/include/c++/4.6/cxxabi.h:47:37: error: expected ‘}’ before end of line
        /usr/include/c++/4.6/cxxabi.h:47:37: error: expected declaration before end of line

Solution

  This compilation error is caused by the fact that |project| uses
  `Boost.Signals <http://www.boost.org/doc/libs/1_56_0/doc/html/signals.html>`_
  which is known to conflict with Qt's signal mechanism in certain
  configurations (`an explanation is given here
  <http://www.boost.org/doc/libs/1_56_0/doc/html/signals/s04.html#idp428010544>`_).
  In order to resolve this issue, two solutions exist:

  #. Reorder includes so that |project| headers always appear before Qt
     headers. This might sometimes work, but is hard to achieve in other
     projects.

  #. Compile your program with `-DQT_NO_KEYWORDS`. This prevents that Qt
     defines `signals` and `slots` as preprocessor macros, which is the
     cause for the compilation error. Your Qt headers that define signals then
     need to used `Q_SIGNALS` and `Q_SLOTS` instead now.

.. _troubleshooting-multiple-rpc-arguments:

Multiple Arguments in RPC Calls
===============================

.. seealso::

   :ref:`tutorial-rpc`
     Examples about using remote procedure calls

   :ref:`specification-request-reply`
     Specification of remote procedure calls

Problem *(applies to all implementations)*

  I would like to :ref:`call an RPC method <tutorial-rpc-client>` with
  two :term:`payloads <payload>`. |project| seems to only support a
  single argument in RPC calls, so what is the most elegant way to do
  this?

Solution

  Currently, |project| only supports a single :term:`payload` for each
  :term:`event`. Since RPC calls are implemented in terms of
  :term:`events <event>`, the same limitation applies. As a
  consequence, multiple arguments for a method call have to be
  collected into a single :term:`payload`.

  Assuming `Google Protocol Buffers`_ are used and the method in
  question should have the signature ``add(ComplexNumber,
  ComplexNumber)``, a definition like the following could be used:

  .. code-block:: protobuf

     message AdditionRequest {

         required ComplexNumber x = 1;
         required ComplexNumber y = 2;

     }

  For Python, the code implementing this method would then be

  .. code-block:: python

     def add(request):
       result = ComplexNumber()
       result.real = request.x.real + request.y.real
       result.imag = request.x.imag + request.y.imag
       return result
     server.addMethod('add', add)

.. _troubleshooting-no-handler-for-logger:

A Message about no Handlers being found appears
===============================================

Problem *(applies to Python)*

  When I import the :py:mod:`rst` or :py:mod:`rstsandbox` module, a
  message like::

    No handlers could be found for logger "rstsandbox"

  appears. Am I doing something wrong?

Solution

  Everything is fine. The output is produced by Python's
  :py:mod:`logging` module when logging has not been
  configured. |project| uses this module to log messages.

  If you find these messages annoying, add the following code fragment
  to your program:

  .. code-block:: python

     import logging
     logging.basicConfig(level = logging.WARNING)

  See :py:func:`logging.basicConfig` for more configuration options.

.. _troubleshooting-tcp-transport-java-bind:

Java Programs using the Socket Transport do not communicate with other Languages
================================================================================

Problem *(applies to Java)*

  :term:`Events <event>` sent from a Java |project| process using the
  socket :term:`transport` are not received by |project| processes
  written in other languages or vice versa.

Solution

  The Java runtime sometime prefers bind sockets to IPv6 addresses
  even if IPv4 addresses are specified. This seems to be an internal
  behavior of the Java runtime. Other |project| implementations use
  IPv4 addresses by default. As a consequence, Java operates on IPv6
  and the other languages on IPv4 and connections cannot be
  established. To force Java to use IPv4, specify the following JVM
  property (e.g. on the commandline) for |project| Java programs:

  .. parsed-literal::

     -Djava.net.preferIPv4Stack=true

.. _troubleshooting-socket-auto-mode-multiple-machines:

I cannot make the Socket Transport with "auto" Mode work across multiple Machines
=================================================================================

Problem *(applies to all implementations)*

  I want to connect processes on two or more machines and use the
  "auto" mode of the socket :term:`transport` with a
  :ref:`configuration <configuration>` like this:

  .. code-block:: ini

     [transport.socket]
     hostname = SOMEHOST
     server = auto

  where :samp:`{SOMEHOST}` is the name of one of the hosts or
  ``localhost``. If I start my processes in a particular order,
  communication sometimes works, but generally I only get failed
  connection attempts.

Solution

  The "auto" mode of the :ref:`socket <specification-socket>`
  :term:`transport` is intended to be used with simple setups confined
  to a single computer. It can be used to make such setups "just
  work". For other setups, it is only usable with severe restrictions
  and should probably be avoided.

  If you want to connect processes across multiple machines:

  * Consider switching to the :term:`Spread` :term:`transport` if you
    want to connect very many processes or restart all processes
    arbitrarily.

  * If you want to use the :ref:`socket <specification-socket>`
    :term:`transport`

    #. Determine one particular process that should always act as the
       server. This can also be an additional process like the
       :ref:`tool-logger`. Note that this choice can impact the
       performance of your setup very much.

       * :ref:`Configure <configuration>` this (and only this) process
         to act as server (for example using the environment variable
         :envvar:`RSB_TRANSPORT_SOCKET_SERVER`).

       * Leave this process running all the time.

    #. Configure all other processes to act as clients, for example
       with this :ref:`configuration <configuration>` snippet

       .. code-block:: ini

          [transport.socket]
          hostname = THE-SERVER-HOST
          server = 0

    #. You can add client processes or restart them arbitrarily and
       also share the above configuration among all client processes.



.. _troubleshooting-number-of-spread-daemons:

How many Spread Daemons do I need?
==================================

Problem *(applies to all implementations)*

  I want to have multiple processes communicate using the
  :term:`Spread` :term:`transport`. Do I need this :term:`Spread
  daemon` and if so, how many instances do I have to start and on
  which machines? I heard that running multiple :term:`Spread daemons
  <spread daemon>` can even cause severe network problems.

Solution

  First of all, :term:`Spread daemons <spread daemon>` really can
  cause severe network problems when configured incorrectly. We
  therefore recommend to always start with a single :term:`Spread
  daemon` using the default configuration unless a different setup is
  absolutely necessary. Beyond this simple advice, unfortunately,
  there are several different possibilities for setting up one or more
  :term:`Spread daemons <spread daemon>`. In any case, you always need
  at least one :term:`Spread daemon`.

  If all processes run on a single machine, you can start a single
  :term:`Spread daemon` using the default configuration like this:

  .. parsed-literal::

     $ :samp:`{SPREAD_INSTALL_PREFIX}/sbin/spread` -n localhost

  This is a simple and safe configuration and should already cover
  many simple setups.

  If multiple computers are involved, a single :term:`Spread daemon`
  with the above configuration may still be sufficient since it can be
  contacted by clients on remote hosts (see
  :envvar:`RSB_TRANSPORT_SPREAD_HOST`). However, this configuration
  may not achieve the best performance the :term:`Spread` framework is
  capable of. If you need better performance and thus more
  sophisticated configurations, consult the :term:`Spread`
  documentation or write to the |project| `mailing list
  <https://lists.techfak.uni-bielefeld.de/cor-lab/mailman/listinfo/rsb>`_.

.. _troubleshooting-cleanup:

Participants (or something else) are not cleaned up
===================================================

Problem *(applies to all implementations)*

  I have the impression that |project| does not properly clean up all
  :term:`participants <participant>` (or maybe some other objects)
  when my program terminates or crashes. Sometimes, my program even
  hangs instead of terminating.

Solution

  |project| tries to clean up all created :term:`participants
  <participant>` when a program terminates or crashes but this needs
  some support from the client program (and even then, not all
  languages support guaranteed cleanup e.g. in case of certain
  crashes).

  The following idioms can be used to allow |project| to clean up
  properly:

  .. container:: cleanup-multi

    .. container:: cleanup-cpp

       .. warning::

          The following idiom may hinder debugging because catching
          all exceptions prevents debuggers like :program:`gdb` from
          seeing them. As a result, getting a backtrace most likely
          requires disabling the ``try``/``catch`` block and
          recompiling the program.

       Avoid uncaught exceptions at the toplevel. This can be done by
       catching exceptions in :c:func:`main`:

       .. code-block:: cpp

          #include <unistd.h>

          #include <stdexcept>
          #include <iostream>

          // ...

          int main() {
              try {
                  rsb::ListenerPtr listener = rsb::getFactory().createListener("/");

                  // Code using LISTENER goes here.

              } catch (const std::exception& e) {
                  std::cerr << "Uncaught exception at toplevel: " << e.what() << std::endl;
                  return EXIT_FAILURE;
              }
              return EXIT_SUCCESS;
          }

    .. container:: cleanup-python

       .. seealso::
          :ref:`tutorial-send`
            Python section of the basic tutorial

       The :ref:`context manager protocol <python:typecontextmanager>`
       should be used to ensure cleanup:

       .. code-block:: python

          with rsb.createListener('/') as listener:
              # Code using LISTENER goes here
              pass

       For multiple :term:`participants <participant>` use:

       .. code-block:: python

          with rsb.createListener('/') as listener, rsb.createInformer('/') as informer:
              # Code using LISTENER and INFORMER goes here
              pass

    .. container:: cleanup-java

       Make sure that the ``deactivate`` method of :term:`participant`
       objects is called:

       .. code-block:: java

          rsb.Listener listener;
          try {
              listener = rsb.Factory.getInstance().createListener("/");
              listener.activate();

              // Code using LISTENER goes here.

          } finally {
              if (listener != null) {
                  try {
                      listener.deactivate();
                  } catch (Exception e) {
                      e.printStackTrace();
                  }
              }
          }

    .. container:: cleanup-cl

       Automatic cleanup is ensured when using the
       ``rsb:with-active-participant``, ``rsb:with-participant``,
       etc. macros:

       .. code-block:: cl

          (rsb:with-participant (listener :listener "/")
            ;; Code using LISTENER goes here.
            )
