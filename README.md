[![Build Status](https://travis-ci.org/open-rsx/rsb-manual?branch=master)](https://travis-ci.org/open-rsx/rsb-manual)

# Introduction

This repository contains the [Sphinx] based documentation of the [Robotics Service Bus](https://github.com/open-rsx) middleware.

**The rendered documentation can be found at <https://open-rsx.github.io/rsb-manual/>.**

# Dependencies

* [Sphinx]

For a complete build generating all API documentation, the compilation
dependencies of [rsc], [rsb-cpp], [rsb-python] need to be available, too

# Building

```shell
./build.sh
```

The HTML documentation will be generated to the `build` folder.

# Contributing

If you want to contribute to this project, please

* Submit your intended changes as coherent pull requests
* Rebase onto the master branch and squash any fixups and corrections

# Acknowledgments

The development of this software has been supported as follows:

* This research was funded by the EC 7th Framework Programme (FP7/2007-2013), in the TA2 (grant agreement ICT-2007-214 793) and HUMAVIPS (grant aggrement ICT-2009-247525) projects.
* The development of this software was supported by CoR-Lab, Research Institute for Cognition and Robotics Bielefeld University.
* This work was supported by the Cluster of Excellence Cognitive Interaction Technology ‘CITEC’ (EXC 277) at Bielefeld University, which is funded by the German Research Foundation (DFG).

[Sphinx]: http://www.sphinx-doc.org
[rsc]: https://github.com/open-rsx/rsc
[rsb-cpp]: https://github.com/open-rsx/rsb-cpp
[rsb-python]: https://github.com/open-rsx/rsb-python
