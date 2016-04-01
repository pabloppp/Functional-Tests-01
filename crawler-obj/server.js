var cObj = require('./crawlerObj');

var object = {
	foo: "bar",
	sub: {
		foo: "bar2"
	},
	titles: [
		{title: "the big", type: "title"},
		{title: "a big story", type: "subtitle"},
		{title: "about life", type: "subtitle"},
		{title: "about life", type: "overview", extra: {foo: "bar"}}
	]
}

//OBJ 

var superObject = new cObj(object);

console.log( superObject.get("foo") );
console.log( superObject.get("sub") );
console.log( superObject.get("sub.foo") );
console.log( superObject.get("fuck"));

										 
console.log( superObject.extractFromArray(
	"titles",  //array attribute from object
	"title,type", //attrobutes to extract
	{"type":"title,subtitle"} //conditions for extraction
));