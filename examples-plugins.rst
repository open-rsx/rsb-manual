.. _tutorial-plugins:

=================
 Writing Plugins
=================

.. seealso::

   :ref:`specification-plugin`
     :term:`Plugin` specification

.. container:: lang-multi

   .. container:: lang-cpp

      In the C++ implementation of |project|, a :term:`plugin` is a
      dynamically loadable library which defines the two symbols

      #. :c:func:`rsc_plugin_init`
      #. :c:func:`rsc_plugin_shutdown`

      .. note::

         The macros :c:macro:`RSC_PLUGIN_INIT_SYMBOL` and
         :c:macro:`RSC_PLUGIN_SHUTDOWN_SYMBOL` should be used to
         define functions on the aforementioned symbols.

      Any library can be made into an |project| :term:`plugin` by
      adding a file, usually called :file:`Plugin.cc`, defining these
      two symbols. The :file:`Plugin.cc` file of a minimal |project|
      :term:`plugin` looks like this:

      .. literalinclude:: /../rsb-cpp/examples/plugin/Plugin.cpp
         :language:    c++
         :linenos:
         :start-after: mark-start::body
         :end-before:  mark-end::body

   .. container:: lang-python

      .. warning::
 
         This section is work in progress.

      In the Python implementation of |project|, a :term:`plugin` is a
      :ref:`module <python:modules>` defining functions

      #. :py:func:`rsbPluginInit`
      #. :py:func:`rsbPluginShutdown`

      Any :ref:`module <python:modules>` can be made into an |project|
      :term:`plugin` by adding these two functions. A a minimal
      |project| :term:`plugin` looks like this:

      .. literalinclude:: /../rsb-python/examples/plugin/__init__.py
         :language:    python
         :linenos:
         :start-after: mark-start::body
         :end-before:  mark-end::body

   .. container:: lang-java

      .. warning::
 
         This section is work in progress.

      In the Java implementation of |project|, a :term:`plugin` is a TODO

      .. literalinclude:: /../rsb-java/examples/plugin/Plugin.java
         :language:    java
         :linenos:
         :start-after: mark-start::body
         :end-before:  mark-end::body

   .. container:: lang-cl

      .. warning::
 
         This section is work in progress.

      In the Common Lisp implementation of |project|, a :term:`plugin`
      is a TODO

      .. literalinclude:: /../rsb-cl/examples/plugin.lisp
         :language:    cl
         :linenos:
         :start-after: mark-start::body
         :end-before:  mark-end::body
