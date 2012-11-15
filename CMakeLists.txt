cmake_minimum_required(VERSION 2.8)

set(SPHINX_BUILD_NAME "sphinx-build"
    CACHE STRING "name of the sphinx-build program to use")

find_program(SPHINX_BUILD ${SPHINX_BUILD_NAME})
set(SPHINX_OPTIONS ""
    CACHE STRING
    "Options to pass to the sphinx-build program.")

set(DOCUMENTATION_ROOT_DIR "http://docs.cor-lab.org"
    CACHE STRING
    "The directory or URL corresponding to the root of all documentation.")

set(CPP_API_DIR "${DOCUMENTATION_ROOT_DIR}/rsb-cpp-api/0.7/html"
    CACHE STRINGS
    "URL of the cpp API documentation.")
set(JAVA_API_DIR "${DOCUMENTATION_ROOT_DIR}/rsb-java-api/0.7/html"
    CACHE STRINGS
    "URL of the java API documentation.")
set(PYTHON_API_DIR "${DOCUMENTATION_ROOT_DIR}/rsb-python-api/0.7/html"
    CACHE STRINGS
    "URL of the python API documentation.")

configure_file(conf.py.in
               "${CMAKE_BINARY_DIR}/conf.py"
               @ONLY)
configure_file(_templates/rsblinks.html.in
               "${CMAKE_BINARY_DIR}/_templates/rsblinks.html"
               @ONLY)
configure_file(_templates/layout.html.in
               "${CMAKE_BINARY_DIR}/_templates/layout.html"
               @ONLY)

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

install(DIRECTORY _build/html
        DESTINATION "share/doc/rsb-manual/")
