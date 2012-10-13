.. _tutorial:

==========
 Examples
==========

This section assumes a functional |project| installation for at least
one programming language.

.. seealso::

   :ref:`install`
     Installing |project| from source or using a package manager.

   :ref:`troubleshooting`
     Solving common problems.

The goal of this section is teaching you how to accomplish some basic
and some more advanced tasks using |project|. It is organize into the
following parts:

.. toctree::
   :hidden:
   :maxdepth: 1

   examples-basic
   examples-chat
   examples-converters
   examples-extension-points

#. :ref:`Basic Communication <tutorial-basic>`

   This first part teaches the basic communication patterns provided
   by |project|:

   * :ref:`Sending <tutorial-send>` and
     :ref:`receiving data <tutorial-receive>`
   * Making :ref:`Remote Procedure Calls <tutorial-rpc>`

#. :ref:`Building a simple chat system <tutorial-chat>`

   This part is concerned with designing and building a slightly more
   complex system applying the techniques of the first part.

#. :ref:`Sending and Receiving Custom Data Types
   <tutorial-converters>`

   This part demonstrates sending and receiving of custom
   (non-builtin) :term:`data type` s using |project| :term:`converter`
   s.

#. :ref:`Extending |project| <tutorial-extension-points>`

   This final part switches from the user to the developer perspective
   and shows how new capabilities can be added to |project|.

.. note::

   Depending on your |project| configuration, the following examples
   may require a running :term:`Spread daemon` for successful
   execution.
