const template = require('./templates');
const { request, getPercentage, append } = require('./util');

function loadListPerson() {
  request("../fazenda.json", resp => {
    if (Array.isArray(resp.data) && resp.data.length > 0) {
      resp.data.sort((p1, p2) => {
        if (p1.positive > p2.positive) return -1;

        if (p1.positive < p2.positive) return 1;

        return 0;
      });

      for (const i in resp.data) {
        const person = resp.data[i];
        const maxVotes = (+person.positive || 0) + (+person.negative || 0);

        resp.data[i].percPositive = getPercentage(person.positive, maxVotes);
        resp.data[i].percNegative = getPercentage(person.negative, maxVotes);
        person.position = +i + 1;

        append(".List__Body", template.person(person));
      }
    } else {
      append(".List__Body", template.empty());
    }

    const listEl = document.querySelector(".List__Body");
    listEl.style.display = "inline-block";
  });
}

window.onload = loadListPerson;
