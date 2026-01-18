function Person(name) {
    this.name = name;
}

Person.prototype.describe = function () {
    return 'Person called ' + this.name;
};

class Person2 {
    constructor(name) {
        this.name = name;
    }

    describe() {
        return 'Person called ' + this.name;
    }
}

function Employee(name, title) {
    Person.call(this, name); // super(name)
    this.title = title;
}

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;
Employee.prototype.describe = function () {
    return Person.prototype.describe.call(this) // super.describe()
        + ' (' + this.title + ')';
};

class Employee2 extends Person2 {
    constructor(name, title) {
        super(name);
        this.title = title;
    }

    describe() {
        return super.describe() + ' (' + this.title + ')';
    }
}

if (typeof require !== 'undefined' && require.main === module) {
    console.log(new Person('zaf').describe());
    console.log(new Person2('zaf').describe());
    console.log(new Employee('zaf', 'tutor').describe());
    console.log(new Employee2('zaf', 'tutor').describe());
}

module.exports = { Person, Person2, Employee, Employee2 };