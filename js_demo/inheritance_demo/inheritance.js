const assert = require('assert')

// prototype pattern
function Foo (name, id) {
  this.name = name
  this.id = id
}

Foo.prototype.identify = function () {
  return `${this.name} is ${this.id}`
}

function Bar (name, id, unique) {
  this.name = name
  this.id = id
  this.unique = unique
}

// create newly obj, links  the newly created obj to the Foo.prototype
// Bar.prototype = new Foo()
// put it before the Bar.prototype 
Bar.prototype = Object.create(Foo.prototype)

Bar.prototype.speak = function () {
  return `${this.identify()}: ${this.unique}`
}

// use new keyword, create foo object, create Foo.prototype obj, links Foo to the newly created obj
// link foo.__proto__ dunder prototype to Foo.prototype, 
// return passed-in obj as the return object
var foo = new Foo("Foo", 0)

var bar = new Bar("Bar", 1, "child property")

assert.equal(foo.identify(), 'Foo is 0')
assert.equal(bar.identify(), 'Bar is 1')
assert.equal(bar.speak(), 'Bar is 1: child property')


// class pattern
class FooC {
  constructor (name, id) {
    this.name = name
    this.id = id
  }

  identify () {
    return `${this.name} is ${this.id}`
  }
}

class BarC extends FooC {
  constructor (name, id, unique) {
    super(name, id)
    this.unique = unique
  }
  speak () {
    return `${this.identify()}: ${this.unique}`
  }
}

var fooc = new FooC('FooC', 0)
var barc = new BarC('BarC', 1, 'child property')

assert.equal(fooc.identify(), 'FooC is 0')
assert.equal(barc.speak(), 'BarC is 1: child property')
