var obj = {
    foo: function () {
        console.log('foo');
    },
    bar: function () {
        this.foo();
    },
}

obj.bar();

let obj2 = {
    foo() {
        console.log('foo');
    },
    bar() {
        this.foo();
    },
}

obj2.bar();

if (typeof require !== 'undefined' && require.main === module) {
    obj.bar();
    obj2.bar();
}

module.exports = { obj, obj2 };