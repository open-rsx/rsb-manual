#!/bin/bash

set -e
set -x

javasphinx-apidoc -u \
    -o api/java upstream/rsb-java/rsb-java/src/main/java/rsb \
    -t 'Java API Documentation'

# prepare RSC such that CMake modules can be used in rsb-cpp for generating
# doxygen
(
cd upstream/rsc
mkdir -p build
cd build
cmake ..
)
(
cd upstream/rsb-cpp
mkdir -p build
cd build
cmake -DCMAKE_PREFIX_PATH=$(pwd)/../../rsc/build ..
sed -i'' 's/GENERATE_XML .*= NO/GENERATE_XML = YES/' Doxyfile
make doc
)

sphinx-build -a . build
