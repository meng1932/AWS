/*  Basic Types
***
diff between enum and array: enum has index ???
diff between array and tuple: tuple can have different types
*/
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
var user = new Student("Jane", "M.", "User");
console.log("User: ", user);
for (var i = 0; i < 10; i++) {
    setTimeout(function () {
        console.log(i);
    }, 100 * i);
}
for (var i = 0; i < 10; i++) {
    // capture the current state of 'i'
    // by invoking a function with its current value
    (function (i) {
        setTimeout(function () {
            console.log("new", i);
        }, 100 * i);
    })(i);
}
//没明白有啥区别
