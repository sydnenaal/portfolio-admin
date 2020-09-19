export class IterableObject {
  constructor(object) {
    this.object = { ...object };
  }

  map(callback) {
    if (!Object.keys(this.object)) {
      return {};
    }

    if (!callback) {
      const message = "callback is undefined";

      throw new Error(message);
    }

    let newObject = {};

    for (let i in this.object) {
      const params = {
        key: i,
        value: this.object[i],
        object: this.object,
      };

      newObject[i] = callback(params);
    }

    return { ...newObject };
  }

  forEach(callback) {
    if (!Object.keys(this.object)) {
      return {};
    }

    if (!callback) {
      const message = "callback is undefined";

      throw new Error(message);
    }

    for (let i in this.object) {
      const params = {
        key: i,
        value: this.object[i],
        object: this.object,
      };

      callback(params);
    }
  }

  get keys() {
    return Object.keys(this.object);
  }

  get values() {
    return Object.values(this.object);
  }
}

const object = { a: 1, b: 1, c: 3 };
const iterable = new IterableObject(object);

console.log(
  iterable.map(({ key, value }) => {
    return value + 1;
  })
);

console.log(
  iterable.forEach(({ key, value }) => {
    console.log(key);
  })
);
