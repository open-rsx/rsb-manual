cmake_minimum_required(VERSION 2.8)

# Project meta-data.

project("rsb-manual")

set(RSB_MANUAL_VERSION_MAJOR "0")
set(RSB_MANUAL_VERSION_MINOR "11")
set(RSB_MANUAL_VERSION_PATCH "0")
set(RSB_MANUAL_VERSION       "${RSB_MANUAL_VERSION_MAJOR}.${RSB_MANUAL_VERSION_MINOR}.${RSB_MANUAL_VERSION_PATCH}")
set(VERSION_SUFFIX "${RSB_MANUAL_VERSION_MAJOR}.${RSB_MANUAL_VERSION_MINOR}")

# Options.

find_program(SPHINX_BUILD NAMES sphinx-build2 sphinx-build)
set(SPHINX_OPTIONS ""
    CACHE STRING
    "Options to pass to the sphinx-build program.")

set(DOCUMENTATION_ROOT_DIR "http://docs.cor-lab.org"
    CACHE STRING
    "The directory or URL corresponding to the root of all documentation.")

set(REPOSITORY_BASE_URL "https://code.cor-lab.org/git/rsb.git"
    CACHE STRING
    "URL of the RSB repository base")

set(CPP_API_DIR "${DOCUMENTATION_ROOT_DIR}/rsb-cpp-api/trunk/html"
    CACHE STRINGS
    "URL of the cpp API documentation.")
set(JAVA_API_DIR "${DOCUMENTATION_ROOT_DIR}/rsb-java-api/trunk/html"
    CACHE STRINGS
    "URL of the java API documentation.")
set(PYTHON_API_DIR "${DOCUMENTATION_ROOT_DIR}/rsb-python-api/trunk/html"
    CACHE STRINGS
    "URL of the python API documentation.")

# Configure sphinx configuration file.
set(REPOSITORIES protocol
                 cpp    spread-cpp        yarp-cpp tools-cpp
                 java
                 python
                 cl                ros-cl yarp-cl  tools-cl
                 matlab
                 integrationtest
                 manual tutorials talks)
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
        DESTINATION "share/doc/${CMAKE_PROJECT_NAME}${VERSION_SUFFIX}")
