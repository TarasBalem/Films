const userName = "Bill";
const isString = typeof userName === "string";
console.log(isString);

if (!("serviceWorker" in navigator)) {
  // you have an old browser
}

const greeting = "Hello";
console.log(`${greeting} world`);

[(1, 2, 3)].forEach(x => console.log(x));
