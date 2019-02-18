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
/*
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
*/

////////////////////////////////////
// Bind, call and apply
/*
var jhon = {
    name:"Jhon",
    job: "designer",
    presentestion: function(style, timeOfDay) {
        if(style === 'formal') {
            console.log('I\'m ' + this.name + ' ,I\'m ' + this.job + '. Have a good ' + timeOfDay + '.');
        }
        else {
            console.log('Whattshappp??:) my name is ' + this.name + ' ,I\'m ' + this.job + '. Have a Great ' + timeOfDay + ' my Man:).');
        }
    }
};
var emily = {
    name:"Emily",
    job: "teacher"
}
console.log(jhon);
// jhon.presentestion('formal', 'mornings');
// jhon.presentestion.call(emily,'formal','afternoon');

var formalState = jhon.presentestion.bind(emily,'formal','night');

emily.hara = jhon.presentestion.bind(emily);

emily.hara('formal', 'fucking Morning')

var years = [1961, 1987, 1990, 1910, 2005];

function yearsCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]))
    };
    return arrRes;
};
function ageCalc(el) {
    return 2018 - el;
}
function isFullAge(limit,el) {
    debugger;
    return el >= limit;
};
var ages = yearsCalc(years, ageCalc)
var fullJapan = yearsCalc(ages, isFullAge.bind(this, 20))
console.log(fullJapan)
*/


//////////////////////////////////////////////////
// A/Q CHALLANGE;

(function () {
        function Question(question, answers, correct) {
            this.question = question;
            this.answers = answers;
            this.correct = correct;
        };
        Question.prototype.displayQ = function () {
            console.log(this.question);
            for (var i = 0; i < this.answers.length; i++) {
                console.log(i + ': ' + this.answers[i])

            };
        }
        Question.prototype.checkAnswer = function (answer,callback) {
            var oz;
            console.log('================')
            if (answer === this.correct) {
                console.log('Correct Answer');
                oz = callback(true);
            } else {
                console.log('Wrong Answer');
                oz = callback(false);
            }
            this.displayScore(oz);
        }
        Question.prototype.displayScore = function(score) {
            console.log('---------------- \n your current Score is '+ score);
            
        }

        questions = [
            new Question('what is my name?', ['Oz', 'Dane', 'Alexy', 'Omer'], 0),
            new Question('Most Beautiful?', ['Mor', 'Hen', 'Ronit', 'Lior'], 3),
            new Question('Best software Language in the World', ['Java', 'Python', 'Javascript', 'PHP'], 2)
        ]; 

        function score() {
            var sc = 0
            return function(correct) {
                if (correct) {
                    sc++
                }
                return sc;
            }
        }
        var keepScore = score();

        function nextQ() {   
            var n = Math.floor(Math.random() * questions.length);
    
                questions[n].displayQ();
                var answer = prompt('Please Answer the Question below. \n write exit to quit the Game');
                if (answer !== 'exit') {
                    questions[n].checkAnswer(parseInt(answer), keepScore);
                    nextQ();   
                }
                else {
                    alert('Thnak u for playing the Quiz Game, Hope u Enjoy:)');
                    
                }
        }
        nextQ();
    })();