cmake_minimum_required(VERSION 2.8)

SET(SPHINX_BUILD_NAME "sphinx-build" CACHE STRING "name of the sphinx-build program to use")

find_program(RSB_MANUAL_SPHINX_BUILD ${SPHINX_BUILD_NAME})
set(RSB_MANUAL_SPHINX_OPTIONS ""
    CACHE STRING
    "Options to pass to the sphinx-build program.")

configure_file(Makefile.sphinx.in Makefile.sphinx @ONLY)
configure_file(conf.py.in         conf.py         @ONLY)

install(DIRECTORY _build/html
        DESTINATION "share/doc/rsb-manual/")