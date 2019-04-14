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