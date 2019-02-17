// Function constructor
/*
var jhon = {
    name: 'Jhon',
    yearOfBirth: 1990,
    job: 'teacher'
};

var Person = function(name,yearOfBirth,job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person.prototype.calculateAge = function() {
    console.log(2016-this.yearOfBirth)
};
Person.prototype.lastName = 'Izhak';

var jhon = new Person('Jhon','1990', 'developer');
var jane = new Person("Jane", 1969, 'designer');
var mark = new Person("Jane", 1948, 'retired');

jhon.calculateAge();
jane.calculateAge();
mark.calculateAge();
console.log(jhon.lastName)
*/

// Object.create
/*
var personProto = {
    calculateAge: function() {
        console.log(2016 - this.yearOfBirth)
    }
};

var jhon = Object.create(personProto);
jhon.name = 'Jhon';
jhon.yearOfBirth = 1990;
jhon.job = 'teacher';

jane = Object.create(personProto, {
    name: {value: 'Jane'},
    yearOfBirth: {value: 1992},
    job: {value:'teacher'}
})
*/


// Callbacks Function
/*
var years = [1961, 1987, 1990, 1910];

function yearsCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]))
    };
    return arrRes;
};
function ageCalc(el) {
    return 2018 - el;
};

var ages = yearsCalc(years, ageCalc)
console.log(ages)
*/

// Functions returning Functions
/*
function interviewQuestion(job) {
    if (job === 'designer') {
        return function (name) {
            console.log(name + ', can you explain what UX design is?');
        }
    } else if (job === 'teacher') {
        return function (name) {
            console.log('What subject do you teach? ' + name + '?');
        }
    }
    else {
        return function (name) {
            console.log('Hello '+name+' What do you do?');
        }
    }
}

var teacherQ = interviewQuestion('teacher');
teacherQ('Oz');
interviewQuestion('shit')('Lior');
*/

////////////////////////////////////////////
// Closures

function interviewQ(job) {
    return function(name) {
        if(job === 'designer') {
            console.log('Hi '+name+' ,What is UX?');
        }
        else {
            console.log('Hi '+name+' ,What do you do?');
        }
    }
}
var designerInterview = interviewQ('designer');
designerInterview('Lior');

