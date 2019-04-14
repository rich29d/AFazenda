function loadListPerson() {
  request("../fazenda.json", resp => {
    let maxPositive = 0;
    let maxNegative = 0;

    if (Array.isArray(resp.data) && resp.data.length > 0) {
      resp.data.sort((p1, p2) => {
        if (p1.positive > p2.positive) return -1;

        if (p1.positive < p2.positive) return 1;

        return 0;
      });

      for (const i in resp.data) {
        const person = resp.data[i];

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

    const listEl = document.querySelector(".List__Body");
    listEl.style.display = "inline-block";
  });
}

window.onload = loadListPerson;
