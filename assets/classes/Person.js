class Person {
  constructor() {}

  get id() {
    return this.id;
  }

  set id(id) {
    this.id = id;
  }

  get timestamp() {
    return this.timestamp;
  }

  set timestamp(timestamp) {
    this.timestamp = timestamp;
  }

  get name() {
    return this.name;
  }

  set name(name) {
    this.name = name;
  }

  get description() {
    return this.description;
  }

  set description(description) {
    this.description = description;
  }

  get picture() {
    return this.description;
  }

  set picture(picture) {
    this.picture = picture;
  }

  get positive() {
    return this.positive;
  }

  set positive(positive) {
    this.positive = +positive || 0;
  }

  get negative() {
    return this.negative;
  }

  set negative(negative) {
    this.negative = +negative || 0;
  }

  get percPositive() {
    return this.percPositive;
  }

  set percPositive(percPositive) {
    this.percPositive = +percPositive || 0;
  }

  get percNegative() {
    return this.percNegative;
  }

  set percNegative(percNegative) {
    this.percNegative = +percNegative || 0;
  }

  get position() {
    return this.position;
  }

  set position(position) {
    this.position = +position || 0;
  }
}

export { Person };