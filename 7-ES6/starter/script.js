// MAP 
/*
const question = new Map;
question.set('quest', 'Where are you From?');
question.set(1, 'jorden');
question.set(2, 'Israel');
question.set(3, 'Bulgaria');
question.set('correct', 2);
question.set(true, 'You Right!:D');
question.set(false, 'You Wrong:(');

console.log(question.entries())
console.log(question.get('quest'))

for (const [key,value] of question.entries()) {
    if (typeof(key) === 'number') {
        console.log(`${key}: ${value}`)
    }
}

const oz = parseInt(prompt('answer'));
console.log(question.get(question.get('correct') === oz));
*/

// CLASSES / SUBCLASSES
/*
class Person6 {
    constructor(name, job, yearOfBirth) {
        this.name        = name;
        this.job         = job;
        this.yearOfBirth = yearOfBirth;
    }
    calcAge() {
        var now = new Date().getFullYear();
        this.age = now - this.yearOfBirth;
        console.dir(this);
    }
}
let jhon = new Person6('Jhon', 'Developer', 1990);
jhon.calcAge();
console.log(jhon);
*/

/*
// INHERIT BETWEEN CLASSES ES5
var Person5 = function(name, job, yearOfBirth) {
    this.name = name;
    this.job = job;
    this.yearOfBirth = yearOfBirth;
}
Person5.prototype.clacAge = function() {
    this.age = new Date().getFullYear() - this.yearOfBirth;
}

var Attlete5 = function(name,job,yearOfBirth,oplympics,medals) {
    Person5.call(this, name, job, yearOfBirth);
    this.oplympics = oplympics;
    this.medals = medals;
}
Attlete5.prototype = Object.create(Person5.prototype);

var jhon = new Attlete5('Jhon', 'swimmer', 1990, 2, 10);
jhon.clacAge();
console.log(jhon);
*/

// INHERIT BETWEEN CLASSES ES5
/*
class Person6 {
    constructor(name, job, yearOfBirth) {
        this.name        = name;
        this.job         = job;
        this.yearOfBirth = yearOfBirth;
    }
    calcAge() {
        var now = new Date().getFullYear();
        this.age = now - this.yearOfBirth;
        console.dir(this);
    }
}
// INHERIT BETWEEN CLASSES ES6
class Attlete6 extends Person6 {
    constructor(name ,job, yearOfBirth, medals) {
        super(name, job, yearOfBirth);
        this.medals = medals;
    }

    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }
}

const jhon = new Attlete6('Jhon', 'Swimmer', 1990, 11);

console.log(jhon);
*/


//////////////////////////////////
// CHALLENGE 8


// super class

class SuperClass {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    };
};

// Street SUBCLASS
class Street extends SuperClass {
    constructor(name,buildYear,length,size=3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    };

    classifyStreet() {
        const classification = new Map();
        classification.set(1, 'Tiny');
        classification.set(2, 'Small');
        classification.set(3, 'Normal');
        classification.set(4, 'Big');
        classification.set(5, 'Huge');

        console.log(`${this.name}, build in ${this.buildYear}, is a ${classification.get(this.size)} street.`)
    }
};

// PARK SUBCLASS
class Park extends SuperClass {
    constructor(name,buildYear,parkArea,treeNum) {
        super(name, buildYear);
        this.parkArea = parkArea;
        this.treeNum = treeNum;
    };
    calcDensityTree() {
        const density = this.treeNum / this.parkArea;
        console.log(`${this.name} has a tree density of ${density} trees per square KM. `);
    }

};


const allParks = [
    new Park('Green Park', 1999, 0.2, 350),
    new Park('Nataional Park', 1896, 4.3, 2433),
    new Park('Purple Park', 2005, 1.5, 998)
]
console.log(allParks)

const allStreet = [
    new Street('Ocean Street', 1980, 5, 5),
    new Street('Evergreen Street',2000, 3),
    new Street('Sunset Street', 1975, 2, 1),
    new Street('4th Street', 2012, 3, 4)
]

function calc(arr) {
    const sum = arr.reduce((prev,cur,index) => prev + cur,0)
    return [sum,sum / arr.length];
}

function reportParks(p) {
console.log('------Parks-Report-------');

    // Density
    p.forEach(el => el.calcDensityTree());

    // Average
    const ages = p.map(el => new Date().getFullYear() - el.buildYear);
    [totalAge, avgAge] = calc(ages);
    console.log(`Our ${p.length} parks have an average of ${avgAge.toFixed(0)} years`)

    // more than 1000 trees in park
    const i = p.map(el => el.treeNum).findIndex(el => el >= 1000);
    console.log(`${p[i].name} has more trees than the other Parks`)
}

function reportStreets(s) {
    console.log('------Streets-Report-------');
    const [totalLength, avgLength] = calc(s.map(el => el.length));
    console.log(`Our ${s.length} Sreets have total langth of ${totalLength} km, with an avarege of ${avgLength} km per Street`)
    // CLASSIFY SIZES
    s.forEach(el => el.classifyStreet())
}

reportParks(allParks);
reportStreets(allStreet)

































