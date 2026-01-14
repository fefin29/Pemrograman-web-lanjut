var matchObj = /^(\d\d\d\d)-(\d\d)-(\d\d)$/.exec('2021-09-02');
var year = matchObj[1];
var month = matchObj[2];
var day = matchObj[3];

console.log(`year: ${year}, month: ${month}, day: ${day}`);

let [, _year, _month, _day] = matchObj;

console.log(`year: ${_year}, month: ${_month}, day: ${_day}`);

var obj = {foo: 123};

var propDesc = Object.getOwnPropertyDescriptor(obj, 'foo');
var writable = propDesc.writable;
var configurable = propDesc.configurable;

console.log(writable, configurable);

const {writable: _writable, configurable: _configurable} = propDesc;
console.log(_writable, _configurable);

if (typeof require !== 'undefined' && require.main === module) {
    // keep original logs when run directly
    console.log(`year: ${year}, month: ${month}, day: ${day}`);
    console.log(`year: ${_year}, month: ${_month}, day: ${_day}`);
    console.log(writable, configurable);
    console.log(_writable, _configurable);
}

module.exports = { year, month, day, _year, _month, _day, writable, configurable, _writable, _configurable };