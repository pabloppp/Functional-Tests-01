# CRAWLER OBJECT

[DEMO](http://cdn.rawgit.com/pabloppp/Modular-Tests-01/master/crawler-obj/index.html)

This NodeJS module allows the creation of a **crawler object**.
In the constructor you must pass a javascript array or asociative array (or basically anything with attributes).

The crawler object allows you then to fetch any atribute or nested atribute & if the nested attribute doesn't exist returns null instead of throwing error.


```javascript
var cObj = require('./crawlerObj');
var object = {foo:'bar', second:{foo:'bar2'}};

var superObject = new cObj(object);

superObject.get("foo"); //returns 'bar'
superObject.get("second"); //returns {foo:'bar'}
superObject.get("second.foo"); //returns 'bar2'
superObject.get("second.missing"); //returns null
```

The crawler object also allows you to extract attributes from an array.
`superObject.extractFromArray(array_attr, extracted_attrs, filters)`
**array_attr**: string with the name of the attribute that is an array.
**extracted_attrs**: list of the attributes that you want to extract, separated by commas.
**filters**: Associative array containing a set of key/value pairs, the key is the attribute to filter and the value is the filter value (accepts multiple values separated by commas).

```javascript
var object = {
	searchme:[
		{name: "one", other:"bar1"},
		{name: "one", other:"bar2"},
		{name: "two", other:"bar1", other2:"hi"},
		{name: "three", other:"bar3", other2:"hi"},
	]
}
var superObject = new cObj(object);

superObject.extractFromArray('searchme', 'name'); 
//returns ["one","one","two","three"];

superObject.extractFromArray('searchme', 'name,other2', {'other': 'bar1'}); 
//returns [["one", null],["two", "hi"]];
```

THAT'S ALL FOR NOW!


