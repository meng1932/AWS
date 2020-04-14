/*  Basic Types 
***
diff between enum and array: enum has index ???
diff between array and tuple: tuple can have different types
*/

interface Person {
  firstName: string;
  lastName: string;
}

class Student {
  fullName: string;
  constructor(
    public firstName: string,
    public middleInitial: string,
    public lastName: string
  ) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

let user = new Student("Jane", "M.", "User");

console.log("User: ", user);

for (var i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100 * i);
}

for (var i = 0; i < 10; i++) {
  // capture the current state of 'i'
  // by invoking a function with its current value
  // use an IIFE - an Immediately Invoked Function Expression
  (function(i) {
    setTimeout(function() {
      console.log("new", i);
    }, 100 * i);
  })(i);

  
}

//let vs const 
//deconstructing, array can also be deconstruct. also tupple and object 

//readonly and const
//publicprivate, and protected modifiers
//The protected modifier acts much like the private modifier with the exception that members declared protected can also be accessed within deriving classes.
//Accessors

//abstract class 
//class and interface diff.
