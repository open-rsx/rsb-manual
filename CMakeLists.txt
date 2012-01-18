cmake_minimum_required(VERSION 2.8)

find_program(RSB_MANUAL_SPHINX_BUILD "sphinx-build")
set(RSB_MANUAL_SPHINX_OPTIONS ""
    CACHE STRING
    "Options to pass to the sphinx-build program.")

configure_file(Makefile.sphinx.in Makefile.sphinx @ONLY)
configure_file(conf.py.in         conf.py         @ONLY)

install(DIRECTORY _build/html
        DESTINATION "share/doc/rsb-manual/")