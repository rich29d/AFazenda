(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function loadListPerson() {
  request("../fazenda.json", resp => {
    let maxPositive = 0;
    let maxNegative = 0;

    if (Array.isArray(resp.data) && resp.data.length > 0) {
      resp.data.sort((p1, p2) => {
        if (p1.positive > p2.positive)
          return -1
  
        if (p1.positive < p2.positive)
          return 1
  
        return 0
      })
  
      for (const person of resp.data) {
        maxPositive += +person.positive || 0;
        maxNegative += +person.negative || 0;
      }
  
      for (const i in resp.data) {
        const person = resp.data[i];
  
        person.percPositive = getPercentage(person.positive, maxPositive);
        person.percNegative = getPercentage(person.negative, maxNegative);
        person.position = +i + 1;
  
        append(".List__Body", template.person(person));
      }
    } else {
      append(".List__Body", template.empty());
    }

    const listEl = document.querySelector('.List__Body');
    listEl.style.display = 'inline-block';
  });
}

window.onload = loadListPerson;

var template = {
  person: function (person) {
    return `
      <div
        class='Person Flex'
        style='animation-delay: .${person.position}s'
      >
        <div class='Person__Photo'>
          <div
            class='Person__Image'
            style='background-image: url(${person.picture})'
            title='${person.name}'
          >
            <div class='Person__Position Bold'>
              ${person.position}
            </div>
          </div>
        </div>
  
        <div class='Flex'>
          <div class='Person__Text'>
            <div class='Person__Text--name'>
              ${person.name}
            </div>
  
            <div class='Person__Text--description'>
              ${person.description}
            </div>
  
            <div class='Tooltip Flex Bold Grow'>
                <div class='Tooltip__Percentage'>
                  <span>GOSTAM</span>
                  ${person.percPositive}%
                </div>
  
                <div class='Tooltip__Percentage'>
                  <span>NÃO GOSTAM</span>
                  ${person.percNegative}%
                </div>
              </div>
          </div>
        </div>
      </div>
    `;
  },

  empty: function() {
    return `
      <div class='Empty'>
        <div class='Empty__Title'>
          Puxa!
        </div>

        <div class='Empty__Text'>
          Nossos participantes não foram encontrados,
          acho que devem estar em algum desafio semanal,
          tente novamente mais tarde!
        </div>
      </div>
    `
  }
}


function append(className, html = "") {
  const listEl = document.querySelector(className);
  listEl && listEl.insertAdjacentHTML("beforeend", html);
}

function request(url, callback) {
  const ajax = new XMLHttpRequest();

  ajax.open("GET", url, true);

  ajax.send();

  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4 && ajax.status == 200) {
      const data = JSON.parse(this.responseText);

      callback && callback(data);
    }
  };
}

function getPercentage(value1, value2) {
    const percentage = value1 ? 100 / value2 * value1 : 0;

    return percentage.toFixed(0);
}
},{}]},{},[1])