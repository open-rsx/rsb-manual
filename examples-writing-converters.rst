.. _tutorial-writing-converters:

====================
 Writing Converters
====================

Basic Concept
=============

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

Using Protocol Buffer Types in Converters for Custom Domain Types
=================================================================

Imagine you have a custom domain type (in this example called ``FooBar``) in your software, which you want to use with |project|.
For being able to directly send and receive this type, you need a new :term:`converter`, which handles this type.
Moreover, the generated data to be sent over the wire should be compatible with a data type defined using `google protocol buffers`_ (e.g. from the :ref:`RST library <rst:rst>`).
For this example, we assume the protocol buffers type is called ``rst.foo.Bar``.
To implement a converter matching these assumptions, adapt the following explanations according to your actual data types:

.. container:: lang-multi

   .. container:: lang-python

      TODO

   .. container:: lang-cpp

      Create a header file called :file:`FooBarConverter.h` and fill it with the following contents:

      .. code-block:: cpp

         #include <rsb/converter/Converter.h>
         #include <rsb/converter/ProtocolBufferConverter.h>

         #include <rst/foo/Bar.pb.h>

         class FooBarConverter: public rsb::converter::Converter<std::string> {
         public:

             FooBarConverter();
             virtual ~FooBarConverter();

             std::string getWireSchema() const;

             std::string serialize(const rsb::AnnotatedData &data, std::string &wire);
             rsb::AnnotatedData deserialize(const std::string &wireType,
                     const std::string &wire);

         private:

             rsb::converter::ProtocolBufferConverter<rst::foo::Bar> converter;

         };

      Afterwards, create an implementation file called :file:`FooBarConverter.cpp` along the following lines:

      .. code-block:: cpp

         #include "FooBarConverter.h"

         #include <rsc/runtime/TypeStringTools.h>

         using namespace std;

         FooBarConverter::FooBarConverter() :
                 rsb::converter::Converter<string>("unused", RSB_TYPE_TAG(FooBar)) {
         }

         FooBarConverter::~FooBarConverter() {
         }

         string FooBarConverter::getWireSchema() const {
             return converter.getWireSchema();
         }

         string FooBarConverter::serialize(const rsb::AnnotatedData &data,
                 string &wire) {

             assert(data.first == this->getDataType());

             boost::shared_ptr<FooBar> source = boost::static_pointer_cast<FooBar>(data.second);
             boost::shared_ptr<rst::foo::Bar> dest(new rst::foo::Bar());

             // TODO 1: extract data from domain type and fill it into the protobuf message

             return converter.serialize(
                     rsb::AnnotatedData(rsc::runtime::typeName<rst::foo::Bar>(), dest),
                     wire);

         }

         rsb::AnnotatedData FooBarConverter::deserialize(
                 const std::string &wireType, const std::string &wire) {

             boost::shared_ptr<rst::foo::Bar> source =
                     boost::static_pointer_cast<rst::foo::Bar>(
                             converter.deserialize(wireType, wire).second);

             boost::shared_ptr<FooBar> dest(new FooBar);

             // TODO 2: Extract data from the protobuf message and fill it into your domain type

             return rsb::AnnotatedData(getDataType(), dest);

         }

      Your custom conversion logic of how to convert between the Protocol Buffer messages and your custom data types needs to be implemented at the two places indicated with ``TODO`` comments.
      The `google protocol buffers`_ documentation explains how to access the values from in the protocol buffer message.

      .. note::

         Please use a reasonable namespace for you actual converter.

   .. container:: lang-java

      TODO

   .. container:: lang-cl

      TODO
