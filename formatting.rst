.. _formatting:

======================
 Formatting of Events
======================

In several contexts, it is necessary to format |project| :term:`event`
s or their :term:`payload` s as text or in some other way. For this
purpose, |project| provides a flexible and extensible :term:`event`
formatting facility. This facility is used in the following programs
(among others):

* :ref:`logger`
* :ref:`call`

The following sections discuss some builtin :term:`event` formatting
strategies:

.. _column-formatter:

Column Formatter
================

The column-based :term:`event` formatter prints one line of output
consisting of a configurable arrangement of columns for each
:term:`event`. Columns can print immediate properties of :term:`event`
s or other quantities derived from one or more :term:`event` s.

Example options

.. code-block:: sh

   --style 'columns'
   --style 'columns :columns (TODO)'

Example output::

  Now            │Origin  │Scope                 │Data                  │Data size
  04:39:19.294971│84EAE0A4│/audio/card0/         │#(10 214 20 40 73 0 2…│    2,662
  04:39:19.338584│451F7428│/nao/odometry/        │#(10 27 9 0 0 0 0 192…│       67

.. note::

   Configuring this formatter is only possible in the Common Lisp
   implementation of the :ref:`logger` and :ref:`call` programs.

.. _statistics-formatter:

Statistics Formatter
====================

This formatter periodically displays statistics regarding recently
received :term:`event` s.

Example options

.. code-block:: sh

   --style 'statistics'
   --style 'statistics :columns ((quantity :quantity TODO)'

Example output::

  Now            │Rate        │Throughput   │Latency         │Size
  04:42:07.313554│       4.064│       40.653│   0.001 ± 0.000│     10.000 ± 13.115
  04:42:08.313439│       4.001│       40.011│   0.001 ± 0.000│     10.000 ± 13.115

.. _monitor-formatter:

Monitor Formatter
=================

This formatter groups received :term:`event` s according to a
criterion such as :term:`scope` and periodically prints `columns
<column-formatter>`_ or `statistics <statistics-formatter>`_ for each
group.

Example options

.. code-block:: sh

   --style 'monitor'
   --style 'monitor/scope'
   --style 'monitor/size'

Example output::

  RSB Scope Monitor
  2012-Feb-10 15:56:32.969599

   Latency        | Rate   |
  854872987616.60 ±285429.78|   10 Hz| /
  854872987616.60 ±285429.78|   10 Hz| /lwr/
  854873086119.00 ±50498.88|    2 Hz| /lwr/cmd/
  854873136124.00 ±   0.00|    1 Hz| /lwr/cmd/a5/
  854873036114.00 ±   0.00|    1 Hz| /lwr/cmd/e1/
  854872962991.00 ±313015.88|    8 Hz| /lwr/status/
  854873234940.00 ±   0.00|    1 Hz| /lwr/status/a1/
  854873334863.00 ±   0.00|    1 Hz| /lwr/status/a2/
  854872639939.00 ±   0.00|    1 Hz| /lwr/status/a3/
  854872739765.00 ±   0.00|    1 Hz| /lwr/status/a4/
  854872839811.00 ±   0.00|    1 Hz| /lwr/status/a5/
  854872939873.00 ±   0.00|    1 Hz| /lwr/status/a6/
  854872987368.50 ±447346.21|    2 Hz| /lwr/status/e1/

.. _timeline-formatter:

Timeline Formatter
==================

This formatter groups received :term:`event` s according to a
criterion such as :term:`scope` and constructs a "timeline" over a
configurable period of time for each group. These "timelines" are then
rendered periodically with :term:`event` s appearing as small or large
dots or lines depending on their :term:`payload` sizes and
frequencies.

Example options

.. code-block:: sh

   --style 'timeline/scope'
   --style 'timeline/origin'

Example output::

  Scope                            │↓ now       ↓ -2.9 s    ↓ -5.9 s    ↓ -8.8 s
  /audio/card0/                    │            ▪               ▪ ▪▪     ▪╍▪╍
  /audio/card1/                    │            ╍        ▪ ▪     ▪        ▪╍╍▪
  /nao/audio/all/                  │             ◾              ◾         ◾
  /nao/odometry/                   │                                       ·
  /nao/vision/top/                 │                                   ◾ ◾
  /vicon/data/                     │              ·           · ··        ·╌╌ ·

.. note::

   This formatter is only available in the Common Lisp implementation.

.. _programmable-formatter:

Programmable Event Formatter
============================

The programmable :term:`event` formatter is one of the most flexible
formatters since its output is produced by executing arbitrary code
fragments.

.. note::

   This formatter is only available in the Common Lisp implementation.

Syntax
------

The two kinds of syntax, `templates`_ and `scripts`_, both have access
to properties to the :term:`event` being formatted and, optionally,
other information. In both cases, the :term:`event` and its properties
can be accessed via special variables such as ``event``, ``data`` or
``create`` (which refers to the ``create`` timestamp of the
:term:`event`).

Templates
~~~~~~~~~

Templates are literal strings with embedded variables or code
fragments. The style, which is called ``programmable/template``,
supports two ways of supplying the template:

Template String

  .. code-block:: sh

     --style 'programmable/template :template "TEMPLATE-STRING"'

Template File

  .. code-block:: sh

     --style 'programmable/template :template #p"TEMPLATE-PATHNAME"'

  .. note::

     The ``#p`` is necessary to make :samp:`{TEMPLATE-PATHNAME}`
     identifiable as the name of a file instead of a template script.

:samp:`{TEMPLATE-STRING}` and the contents of
:samp:`{TEMPLATE-PATHNAME}` consist of literal parts and embedded
variables and/or code fragments. Example

.. code-block:: sh

   --style 'programmable/template :template "The data (or \"payload\") of the event which was created at ${create} is: ${data}"'

.. warning::

   Double quotes (``"``) have to be backslash-escaped (i.e. ``\"``) in
   the text parts of :samp:`{TEMPLATE-STRING}` and in the contents of
   the file designated by :samp:`{TEMPLATE-PATHNAME}`.

Scripts
~~~~~~~

In this context, scripts are pieces of code that produce the desired
format output by writing to a stream. This style, which is called
``programmable/script``, supports two ways of supplying the script:

Script String

  .. code-block:: sh

     --style 'programmable/script :script "SCRIPT-STRING"'

Script File

  .. code-block:: sh

     --style 'programmable/script :script #p"SCRIPT-PATHNAME"'

  .. note::

     The ``#p`` is necessary to make :samp:`{SCRIPT-PATHNAME}`
     identifiable as the name of a file instead of a literal script.

:samp:`{SCRIPT-STRING}` and the contents of :samp:`{SCRIPT-PATHNAME}`
are ordinary code fragments which can refer to the special variables
mentioned above. Example:

.. code-block:: sh

   --style 'programmable/script :script "(format stream \"~A~%\" event)"'

Examples
--------

Timestamp and textual data

  .. code-block:: sh

    --style 'programmable/template :template "${create-unix-nsec} ${data}\\n${data}"'

Complex processing

  .. code-block:: cl

    (let ((scope (rsb:event-scope event)))
      (if (rsb:scope= scope "/")
          "skipped"
          (rsb:scope-string (rsb:event-scope event))))

Very complex processing

  .. code-block:: cl

     UNIX nanoseconds  ${create-unix-nsec}
     UNIX microseconds ${(floor create-unix-nsec 1000)}
     UNIX milliseconds ${(floor create-unix-nsec 1000000)}
     UNIX seconds      ${(floor create-unix)}
     Human readable    ${create}

     All Subjects:
     @{(map 'list (compose #'prin1-to-string #'rst.devices.mocap:vicon/subject-name)
            (rst.devices.mocap:vicon-subject data))}

     All non-zero subjects:
     @{(map 'list (compose #'prin1-to-string #'rst.devices.mocap:vicon/subject-name)
            (remove-if #'zerop
                        (rst.devices.mocap:vicon-subject data)
                        :key (compose #'rst.math:vec3ddouble-x
                                      #'rst.devices.mocap:vicon/segment-translation
                                     (alexandria:rcurry #'elt 0)
                                     #'rst.devices.mocap:vicon/subject-segments)))}

     Found Vicon Subject \"Klappe oben\":
     ${(let ((s (find "Klappe oben" (rst.devices.mocap:vicon-subject data)
                                          :key  #'rst.devices.mocap:vicon/subject-name
                                          :test #'string=)))
         (with-output-to-string (stream)
           (rsb.formatting:format-payload s :raw stream :max-lines 100)))}
     ${(make-string 80 :initial-element #\-)}\n

Exporting PNG Images
~~~~~~~~~~~~~~~~~~~~

The following code block should be stored in a file, for example
``my-script.lisp``.

.. code-block:: cl

   ;; Directory into which output images should be written. Note trailing `/'.
   (let ((output-directory "/tmp/pics/"))

     (ensure-directories-exist output-directory)

     (format *standard-output* "Processing frame ~A~%" create-unix-nsec)

     (let ((filename (merge-pathnames
                      (format nil "~A.~A" (floor create-unix-nsec 1000) "png")
                      output-directory)))
       (alexandria:with-output-to-file (stream filename
                                               :if-exists         :overwrite
                                               :if-does-not-exist :create
                                               :element-type      '(unsigned-byte 8))
         (rsb.formatting:format-payload image t stream))))

The above script would be used as follows:

.. code-block:: sh

   --style 'programmable/script :script #p"my-script.lisp"'

.. note::

   This example assumes TODO
