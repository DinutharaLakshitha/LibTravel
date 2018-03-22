var object1 = { name: "John" };
var object2 = { location: "San Jose" };
var merged_object = JSON.parse((JSON.stringify(object1) + JSON.stringify(object2)).replace(/}{/g, ","))
console.log(merged_object)