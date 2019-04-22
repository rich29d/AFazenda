(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var template = require('./templates');

var _require = require('./util'),
    request = _require.request,
    getPercentage = _require.getPercentage,
    append = _require.append;

function loadListPerson() {
  request("../fazenda.json", function (resp) {
    if (Array.isArray(resp.data) && resp.data.length > 0) {
      resp.data.sort(function (p1, p2) {
        if (p1.positive > p2.positive) return -1;
        if (p1.positive < p2.positive) return 1;
        return 0;
      });

      for (var i in resp.data) {
        var person = resp.data[i];
        var maxVotes = (+person.positive || 0) + (+person.negative || 0);
        resp.data[i].percPositive = getPercentage(person.positive, maxVotes);
        resp.data[i].percNegative = getPercentage(person.negative, maxVotes);
        person.position = +i + 1;
        append(".List__Body", template.person(person));
      }
    } else {
      append(".List__Body", template.empty());
    }

    var listEl = document.querySelector(".List__Body");
    listEl.style.display = "inline-block";
  });
}

window.onload = loadListPerson;

},{"./templates":2,"./util":3}],2:[function(require,module,exports){
"use strict";

var template = {
  person: function person(_person) {
    return "\n      <div\n        class='Person Flex'\n        style='animation-delay: .".concat(_person.position, "s'\n      >\n        <div class='Person__Photo'>\n          <div\n            class='Person__Image'\n            style='background-image: url(").concat(_person.picture, ")'\n            title='").concat(_person.name, "'\n          >\n            <div class='Person__Position Bold'>\n              ").concat(_person.position, "\n            </div>\n          </div>\n        </div>\n  \n        <div class='Flex'>\n          <div class='Person__Text'>\n            <div class='Person__Text--name'>\n              ").concat(_person.name, "\n            </div>\n  \n            <div class='Person__Text--description'>\n              ").concat(_person.description, "\n            </div>\n  \n            <div class='Tooltip Flex Bold Grow'>\n                <div class='Tooltip__Percentage'>\n                  <span>GOSTAM</span>\n                  ").concat(_person.percPositive, "%\n                </div>\n  \n                <div class='Tooltip__Percentage'>\n                  <span>N\xC3O GOSTAM</span>\n                  ").concat(_person.percNegative, "%\n                </div>\n              </div>\n          </div>\n        </div>\n      </div>\n    ");
  },
  empty: function empty() {
    return "\n      <div class='Empty'>\n        <div class='Empty__Title'>\n          Puxa!\n        </div>\n\n        <div class='Empty__Text'>\n          Nossos participantes n\xE3o foram encontrados,\n          acho que devem estar em algum desafio semanal,\n          tente novamente mais tarde!\n        </div>\n      </div>\n    ";
  }
};
module.exports = template;

},{}],3:[function(require,module,exports){
"use strict";

function append(className) {
  var html = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var listEl = document.querySelector(className);
  listEl && listEl.insertAdjacentHTML("beforeend", html);
}

function request(url, callback) {
  var ajax = new XMLHttpRequest();
  ajax.open("GET", url, true);
  ajax.send();

  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4 && ajax.status == 200) {
      var data = JSON.parse(this.responseText);
      callback && callback(data);
      return data;
    }
  };
}

function getPercentage(value1, value2) {
  var percentage = value1 ? 100 / value2 * value1 : 0;
  return percentage.toFixed(0);
}

module.exports = {
  append: append,
  request: request,
  getPercentage: getPercentage
};

},{}]},{},[1]);
