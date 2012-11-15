cmake_minimum_required(VERSION 2.8)

# Options.
find_program(SPHINX_BUILD NAMES sphinx-build2 sphinx-build)
set(SPHINX_OPTIONS ""
    CACHE STRING
    "Options to pass to the sphinx-build program.")

set(DOCUMENTATION_ROOT_DIR "http://docs.cor-lab.org"
    CACHE STRING
    "The directory or URL corresponding to the root of all documentation.")

set(REPOSITORY_BASE_URL "https://code.cor-lab.org/git/rsb.git"
    CACHE STRINGS
    "URL of the RSB repository base")

# Configure sphinx configuration file.
set(REPOSITORIES cpp java python protocol cl matlab tools-cpp tools-cl tutorials talks manual integrationtest)
set(REPOSITORY_REPLACES)
set(REPOSITORY_VERSIONED_REPLACES)
foreach(REPOSITORY ${REPOSITORIES})
    string(REPLACE "-" "_" REPOSITORY_UNDERSCORED ${REPOSITORY})

    set(REPOSITORY_REPLACES "${REPOSITORY_REPLACES}

.. |repository_${REPOSITORY_UNDERSCORED}| replace::
   ${REPOSITORY_BASE_URL}.${REPOSITORY}")

    set(REPOSITORY_VERSIONED_REPLACES "${REPOSITORY_VERSIONED_REPLACES}

.. |repository_versioned_${REPOSITORY_UNDERSCORED}| replace::
   \"{version}\" branch of ${REPOSITORY_BASE_URL}.${REPOSITORY}")
endforeach()

configure_file(conf.py.in
               "${CMAKE_BINARY_DIR}/conf.py"
               @ONLY)

# Configure sphinx template files.
configure_file(_templates/links.html.in
               "${CMAKE_BINARY_DIR}/_templates/links.html"
               @ONLY)
configure_file(_templates/layout.html.in
               "${CMAKE_BINARY_DIR}/_templates/layout.html"
               @ONLY)

# Add targets for generating HTML, LaTeX, PDF and man output.
foreach(KIND html latex man)
    set(ALL)
    if(KIND STREQUAL "html")
        set(ALL ALL)
    endif()
    add_custom_target(${KIND} ${ALL}
                      ${SPHINX_BUILD} ${SPHINX_OPTIONS} -b ${KIND} -c "${CMAKE_BINARY_DIR}"
                                      ${CMAKE_SOURCE_DIR} "${CMAKE_BINARY_DIR}/${KIND}")
endforeach()

add_custom_target(pdf
                  make all-pdf
                  WORKING_DIRECTORY "${CMAKE_BINARY_DIR}/latex"
                  DEPENDS           latex)

install(DIRECTORY "${CMAKE_BINARY_DIR}/html"
        DESTINATION "share/doc/rsb-manual/")
