.. _git-primer:

============
 GIT Primer
============

GIT is a distributed version control system.

* Comparable idea to SVN: preserve all revisions of source code
* Cowever: not a client-server architecture like SVN with a repository server and client-side working copies

Core concepts:

* Everyone has a full repository with all branches and revisions (cloned from a remote server)

  * Checkout -> clone

* Branches are fundamental to development

  * Well supported (especially merging)

* Support for compound repositories

  * Contents of one repository can be made available in the context of another one as a ``submodule``
  * Comparable to ``svn:externals``

Getting Source Code: Cloning a Repository
-----------------------------------------

For a simple repository:

.. code-block:: sh
	
   git clone https://code.cor-lab.org/git/rsc.git rsc

For a repository containing submodules:

.. code-block:: sh

   git clone --recursive https://code.cor-lab.org/git/rsb.git rsb

Getting the Correct Software Version in a Repository
----------------------------------------------------

A cloned repository contains all revisions of its software with all branches and
the user needs to select a branch he wants to have available at the moment. Therefore, he
needs to ``checkout`` the respective branch.

Listing available branches:

.. code-block:: sh

   git branch -a

For a simple repository (e.g. rsc):

.. code-block:: sh

   git checkout 0.7 # 0.7 being the branch name

For a repository containing submodules (e.g. rsb, rst) this can be done recursively:

.. code-block:: sh

   git submodule foreach git checkout 0.7
   git submodule foreach git pull --rebase

The additional pull step (see below) is necessary as the repository containing the submodules
points to a specific revision and not the latest one in each branch. Therefore, we need to get
the most recent changes in the branch.

General Tasks with GIT
----------------------

* Getting the latest changes from the server
   
  .. code-block:: sh
       
     git pull --rebase
     
  .. note::
  
     By using ``--rebase`` local commits (not yet pushed to the remote server) are applied
     again after fetching all revisions from the remote repository. Otherwise and intermediate
     branch would be created and merged back directly.

* Commiting changes

  .. code-block:: sh
     
     git add {files to commit}
     git commit
     
  .. warning::
     
     Committing in GIT is not comparable to committing in SVN. Eventhough your commit has
     created a new revision, this revision is only available in your local clone of the
     repository. You still need to push it back to the server. So do not forget the next
     step!

* Pushing local changes back to the remote repository

   .. code-block:: sh

     git push

