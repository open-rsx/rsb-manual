.. _tutorial-writing-converters:

====================
 Writing Converters
====================

.. warning::

   This example has been written with simplicity in mind and should
   not be used as a blueprint for production code. In particular:

   * It does not handle machine Endianess properly
   * It does not handle machine word sizes properly
   * It leaks memory
   * It does not validate any data

.. note::

   In many practical cases, some of these problems (and much of the
   manual work) can be avoided by using an IDL-specification in
   combination with code generation and generic converters as
   described in the `google protocol buffers`_ documentation.

In |project|, :term:`converters <converter>` are used to serialize and
deserialize programming-language objects for transportation (e.g. over
a network connection). |project| comes with :term:`converters
<converter>` for the fundamental types listed :ref:`here
<types>`. However, in some use-cases it is necessary to use additional
:term:`converters <converter>` for domain-specific :term:`data types
<data type>` and/or serialization mechanisms.

This example demonstrates how to add such :term:`converters
<converter>` to |project| using the running example of a
:term:`converter` for a fictional ``SimpleImage`` :term:`data type`.

In order to implement a new converter, the following information is
required:

* To/from which :term:`wire type` will the :term:`converter`
  serialize/deserialize? In our example, the :term:`wire type` is an
  array of bytes (or more formally an array of octets) which is
  represented in C++ using :cpp:class:`std::string`.

* Which :term:`data type` or (:term:`data types <data type>`) will be
  handled by the :term:`converter`? The struct @SimpleImage@ in our
  example (please note that the :term:`data type` is identified using
  a string for comparison, not the class itself).

* What is the :term:`wire schema` of the :term:`converter`? In our
  example, we use the following ad-hoc :term:`wire schema`:

  Name

    ``simple-image``

  Binary layout

    One integer encoding the image width, one integer encoding the
    image height, width x height bytes for the image data.

.. container:: lang-multi

   .. container:: lang-python

      TODO

   .. container:: lang-cpp

      :cpp:class:`converter_tutorial::SimpleImage` Domain Class

        The domain :term:`data type`:

        .. literalinclude:: ../rsb-cpp/examples/custom_converter/SimpleImage.h
           :language:    cpp
           :start-after: mark-start::body
           :end-before:  mark-end::body
           :linenos:

      :cpp:class:`converter_tutorial::SimpleImageConverter` Class

        For the actual :term:`converter` implementation, four things
        are needed:

        #. The C++ representation of the :term:`wire type` has to be
           passed to the :cpp:class:`rsb::converter::Converter`
           interface as a template parameter.

        #. The :term:`wire schema` and :term:`data type` name have to
           be passed to the :cpp:class:`rsb::converter::Converter`
           constructor.

        #. The :cpp:member:`rsb::converter::Converter::serialize`
           method has to be implemented.

        #. The :cpp:member:`rsb::converter::Converter::deserialize`
           method has to be implemented.

        A naive and incomplete implementation can be found in the
        following listings:

        .. literalinclude:: ../rsb-cpp/examples/custom_converter/SimpleImageConverter.h
           :language:    cpp
           :start-after: mark-start::body
           :end-before:  mark-end::body
           :linenos:
        .. literalinclude:: ../rsb-cpp/examples/custom_converter/SimpleImageConverter.cpp
           :language:    cpp
           :start-after: mark-start::body
           :end-before:  mark-end::body
           :linenos:

      Using the Converter

        A simple program that demonstrates the use of our
        :cpp:class:`SimpleImageConverter` can be found in

        .. literalinclude:: ../rsb-cpp/examples/custom_converter/sender.cpp
           :language:    cpp
           :start-after: mark-start::body
           :end-before:  mark-end::body
           :linenos:

        A similar program in which the registration of the
        :term:`converter` is missing can be found in

        .. literalinclude:: ../rsb-cpp/examples/custom_converter/senderNoConverter.cpp
           :language:    cpp
           :start-after: mark-start::body
           :end-before:  mark-end::body
           :linenos:

        This second program serves the purpose of familiarizing you
        with the "missing-converter" error message, that you will
        encounter sooner or later ;)

   .. container:: lang-java

      TODO

   .. container:: lang-cl

      TODO
