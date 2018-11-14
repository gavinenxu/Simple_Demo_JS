// accept a generator function 
function runner (gen) {
  var it = gen()

  function run (arg) {
    // first arg set undefined, it's because the generator shortcoming
    var res = it.next(arg)

    if (res.done) {
      return res.value
    } else {
      // put the value to the promise chain, then give it to it.next
      return Promise.resolve(res.value).then(run)
    }
  }
  return run()
}

function getData(number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let random = Number(number) * Math.random() * 10 
      resolve(~~random)
    }, 1000);
  })
}

runner(function * gen() {
  var res1 = yield getData(20)
  console.log(res1)
  var res2 = yield getData(res1)
  console.log(res2)
  var res3 = yield getData(res2)
  console.log(res3)
})