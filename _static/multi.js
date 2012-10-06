// Make multiple variants of a sections dynamically switchable.
//
// A multi-variant section is created by using nested .. container::
// directives as follows:
// 
// .. container:: NAME-multi
// 
//    .. container:: NAME-python
// 
//       CONTENT
// 
//    .. container:: NAME-cpp
// 
//       CONTENT
// 
//    MORE-VARIANTS
// 
// The "multi" string is mandatory. NAME and the -python, -cpp,
// etc. suffixes are arbitrary.

function switchMulti(parent, all, switchTo) {
  jQuery.map(all, function (name) {
    node = $('.' + parent + '-multi').find('.' + name);
    if (name === switchTo) {
      node.slideDown();
    } else {
      node.slideUp();
    }
  })
}

$(document).ready(function () {
  jQuery.map($('*[class*="multi container"]'), function (parent) {
    //
    parentName = parent.className.replace(/^(.*)-multi container$/, '$1');

    all = jQuery.map($(parent).find('*[class*="container"]'), function (node) {
      clazz = node.className;
      return {'name':  clazz.replace(/^(.*) container$/, '$1'),
              'label': clazz.replace(/^.*-([^-].*) container$/, '$1') };
    })
    allNames = jQuery.map(all, function (nameAndLabel) { return nameAndLabel.name });

    code = jQuery.map(all, function (nameAndLabel) {
      return '<a href="javascript:switchMulti(\''
             + parentName + '\', ['
             + jQuery
               .map(allNames, function (name) { return '\'' + name + '\''})
               .join(', ')
             + '], \'' + nameAndLabel.name + '\')">' + nameAndLabel.label + '</a>';
    }).join('&nbsp;|&nbsp;');
    $(parent).prepend('<div class="switcher">Show ' + code + '</div>');

    parent.className += ' multi';
    switchMulti(parentName, allNames, allNames[0])
  })
})
