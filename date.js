// Date module.  

// To use our own module do something like this...
// const dateModule = require(__dirname + "/date.js")
// call a function like this dateModule.CurrentDate();

module.exports.CurrentDate = CurrentDate;
function CurrentDate () {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('en-US', options);
}

//Note this way it shorter. The anonymous function defined is set to the date.js module 
// and can be called as such CurrentDay();
module.exports.CurrentDay = function  () {
    const today = new Date();
    const options = { weekday: 'long' };
    return today.toLocaleDateString('en-US', options);
}

