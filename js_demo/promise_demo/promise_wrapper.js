// setting a pending promise, which could be use later
function ReadyPromise (cb) {
  let ready, reject

  const readyPromise = new Promise((res, rej) => {
    ready = res
    reject = rej
  })

  if (cb()) {
    ready('fullfill')
    // do something
  } else {
    reject('reject')
  }

  return readyPromise
}

ReadyPromise(() => NaN !== NaN)
  .then(info => console.log(info))
  .catch(err => console.error(err))

