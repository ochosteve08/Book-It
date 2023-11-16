// const { object } = require("joi");
import  {createServer, request} from 'http'

function num(a, b) {
  let arr3 = [];
  let arr5 = [];
  let arr = [];
  let arr15 = [];
  for (let i = a; i <= b; i++) {
    if (i % 15 === 0) {
      arr15.push(i);
    } else if (i % 3 === 0) {
      arr3.push(i);
    } else if (i % 5 === 0) {
      arr5.push(i);
    } else {
      arr.push(i);
    }
  }
  return {
    Fizz: arr3,
    Buzz: arr5,
    FizzBuzz: arr15,
    None: arr,
  };
}
let variance = num(1, 100);

console.log(Object.keys(variance));

// square of a function
function Sqrs(base, exponents) {
  let result = 1;
  for (let count = 0; count < exponents; count++) {
    result *= base;
  }
  return result;
}
// console.log(Sqrs(2,10));

const halve = function (n) {
  return n / 2;
};
let n = 10;
// console.log(halve(100));
// → 50
// console.log(n);
// → 10

const future = () => {
  return "You'll never have flying cars";
};

// console.log("The future says:", future());

function power(base, exponent) {
  if (exponent == 0) {
    return 1;
  } else {
    return base * power(base, exponent - 1);
  }
}
// console.log(power(2, 3));
// → 8

// console.log("steve".toUpperCase())

let sentence = "Secretarybirds specialize in stomping";
let words = sentence.split(" ");
console.log(words);
console.log(words.toString());
console.log(words.join(', '));
// console.log("words".repeat(2).split(' '))
console.log(Math.floor(Math.random() * 2 * Math.PI));

// destructuring array
const rand = ['school:{"mivara"}', "age:[1,2,3]"];
const [school, age] = rand;
console.log(school);
console.log(age);

// JSON
let string = JSON.stringify({ squirrel: false, events: ["weekend"] });
// console.log(string)

// sum of numbers within a range and incremental
function sumRange(a, b, c) {
  let summation = 0;
  let arr = [];
  for (let i = a; i <= b; i += c) {
    summation += i;
    arr.push(i);
  }
  return arr;
  return summation;
}
console.log(sumRange(1, 10, 1.5));

// reverse an array
function revArr(arr) {
  let arry = [];
  // console.log(arry)
  for (let i = arr.length - 1; 0 <= i; i--) {
    arry.push(arr[i]);
  }
  return arry;
}
// console.log(revArr([1,2,3,4,5]))

// object oriented programming
class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    return `this ${this.type} rabbit says ${line}`;
  }
}
let killerRabbit = new Rabbit("killer");

console.log(killerRabbit.speak("killing is sweet"));
console.log(killerRabbit);


let ages =new Map()
ages.set("paul",22)
ages.set("steve",14) //setter
console.log(ages.has("paul")) //has
console.log(ages.get("steve")) //getter


class Temperature {
  constructor(celcius) {
    this.celcius =celcius
  }
  get Fahrenheit() {
    return this.celcius * 1.8+32
  }
  set Fahrenheit(value){
    this.celcius = (value - 32)/1.8
  }
}

let temp = new Temperature(100)
// console.log(temp.Fahrenheit)
temp.Fahrenheit = 280
// console.log(temp.celcius);

// \d any-digit
// console.log(/\d/.test("in 1992"))  //true  
const dateCheck = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/
const dateCheck2 = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
// console.log(dateCheck.test('20-10-2023 10:44'))
// console.log(dateCheck2.test("20-10-2023 10:44"));


const fifteen = Promise.resolve(15)

fifteen.then((tea)=> console.log(`got ${tea}`))


// http: hypertext transfer protocol
// eloquentjavascript.net/18_http.html
// a TCP connection is opened on port 80 to search for this 
// address 'eloquentjavascript.net' on the associated server
// the information sent is the request. so we have req.method(/GET),
// req.path, req.url and req.headers



// NODEJS

let server = createServer((request,response)=>{

})
server.listen(8000, ()=>{
    console.log('listening on port:8000')
})