.. _tutorial-converters:

=========================================
 Sending and Receiving Custom Data Types
=========================================

.. seealso::

   :ref:`tutorial-writing-converters`
     Writing new :term:`converter` s instead of registering existing
     ones.

In principle, projects using |project| can exchange data of arbitrary
types. However, in order to send and receive custom :term:`data type`
s, |project| has to know how to serialize and deserialize data of
these types. This task is performed by
:term:`converter` s. :term:`Converter` s are maintained in a
repository at runtime. New :term:`converter` s can be registered to
add support for new :term:`data type` s.

Registering Converters
======================

To add a :term:`converter` to the repository, the :term:`converter`
object has to be created and the repository object has to be
obtained. The following example demonstrates this.

.. important::

   :term:`Converter` s have to be registered before
   :term:`participant` s are created. Otherwise, the
   :term:`participant` s can still be created, but do not use the
   desired :term:`converter` s.

.. container:: converter-registration-multi

   .. container:: converter-registration-python

      The function :py:func:`rsb.converter.registerGlobalConverter` is
      used to register new :term:`converter` s (line 26). After that,
      the value of :py:data:`rsb.__defaultParticipantConfig` has to be
      updated to pick up the newly registered :term:`converter` (line
      37).

      .. literalinclude:: /../rsb-python/examples/protobuf/registration.py
         :language:        python
         :start-after:     mark-start::body
         :end-before:      mark-end::body
         :emphasize-lines: 25,26
         :linenos:

      :download:`Download this example </../rsb-python/examples/protobuf/registration.py>`

   .. container:: converter-registration-cpp

      After creating a :term:`converter` object (lines 19 and 20), the
      template function
      :cpp:func:`rsb::converter::converterRepository` is used to
      obtain the :term:`converter` repository (line 21) and register
      the :term:`converter` object via the
      :cpp:member:`rsb::converter::Repository::registerConverter`
      method (line 21). The :cpp:class:`rsb::Factory` is obtained only
      after the :term:`converter` has been registered, so it can pick
      up the changed :term:`converter` set (line 25).

      .. literalinclude:: /../rsb-cpp/examples/protobuf_converter/registration.cpp
         :language:        c++
         :start-after:     mark-start::body
         :end-before:      mark-end::body
         :emphasize-lines: 19-21,25
         :linenos:

      :download:`Download this example </../rsb-cpp/examples/protobuf_converter/registration.cpp>`

   .. container:: converter-registration-java

      After creating the :term:`converter` object (lines 16 and 17),
      it is globally registered using the
      ``rsb.converter.ConverterRepository.addConverter`` method (line
      20). The repository is obtained by calling
      ``rsb.converter.DefaultConverterRepository.getDefaultConverterRepository``
      (line 20).

      .. literalinclude:: /../rsb-java/examples/tutorial/protobuf/RegistrationExample.java
         :language:        java
         :start-after:     mark-start::body
         :end-before:      mark-end::body
         :emphasize-lines: 16-17,20
         :linenos:

      :download:`Download this example </../rsb-java/examples/tutorial/protobuf/RegistrationExample.java>`

   .. container:: converter-registration-cl

      .. note::

         In Common Lisp, the mechanism is quite different; will be
         documented later.

      ..
         .. literalinclude:: /../rsb-cl/examples/protocol-buffers/sender.lisp
            :language:        cl
            :start-after:     mark-start::body
            :end-before:      mark-end::body
            :emphasize-lines: 1
            :linenos: