.. _specification-converters:

============
 Converters
============

Converter Selection
===================

When sending and receiving data via |project|, an appropriate instance
of a :term:`converter` needs to be selected by the |project|
implementation. This selection process is performed by an
implementation of a :term:`converter selection strategy`.

The default :term:`converter selection strategy` relies on the fact
that the selection can always be performed without ambiguities. These
ambiguities can arise in case multiple converters exist for the same
:term:`wire schema` or :term:`data type`. In such cases, when using
the default :term:`converter selection strategy`, the user has to
provide rules to disambiguate the different :term:`converters
<converter>` via the configuration mechanism.

.. note::

   Each :term:`transport` can use a different :term:`converter
   selection strategy`.

Disambiguation
==============

Potentially, multiple converters can exist that encoding to / decode
from the same :term:`wire schema` or :term:`data type`. For example,
there could be a common :term:`wire schema` to encode image data, but
different domain image types like OpenCV's or ICL's image classes. In
order to resolve these ambiguities when using the default
:term:`converter selection strategy` you can :ref:`configure
<specification-config-files>` your choice under the configuration
section :samp:`{TRANSPORT}.converter.{LANGUAGE}` as entries of the
form :samp:`{WIRE-SCHEMA} = {DATA-TYPE}`.

Using Custom Converter Selection Strategies
===========================================

Different implementations of :term:`converter selection strategy`
apart from the default implementation are shipped with |project| or
can be implemented by users. In order to use these implementations,
you need to adapt the :ref:`configuration` of the :term:`participant`
you are going to create.

.. container:: custom-converter-selection-strategies-multi

   .. container:: custom-converter-selection-strategies-cpp

      The default :cpp:class:`rsb::ParticipantConfig` will configure
      all transports using the default unambiguous converter selection
      strategy (implemented by
      :cpp:class:`rsb::converter::UnambiguousConverterMap`). In order
      to replace this default
      :cpp:class:`rsb::converter::ConverterSelectionStrategy` by a
      different one you need to modifying the ``converters`` option
      value of the respective :term:`transport` options in the
      :cpp:class:`rsb::ParticipantConfig` instance that you are going
      to pass to the factory method when creating a new
      :term:`participant`.
