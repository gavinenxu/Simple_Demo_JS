import './style/style.scss'

(function() {
    if (!('fetch' in window)) require('whatwg-fetch')
    let spinner = document.createElement('div')
    spinner.classList.add('spinner')
    let arr = Array.from({length:3}).map(el => el = document.createElement('div'))
    arr.forEach(div => { spinner.appendChild(div)})
    document.body.appendChild(spinner)
}())

const myHeaders = new Headers({
    'Content-Type': 'image/png',
    'X-Custom-Header': 'hello world'
});
const option = {
    method: 'get',
    mode: 'cors',
}
const imageList = [
    'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-694540.jpg',
    'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-683782.jpg',
    'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-700426.jpg',
    'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-699958.jpg',
    'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-699897.jpg',
    'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-699791.jpg',
]

const validateResp = function (resp) {
    if (!resp.ok) throw Error(resp.statusText)
    return resp
}
const getBlob = function (resp) {
    return resp.blob()
}
const setImgFromBlob = function (blob) {
    console.log('blob')
    let img = document.createElement('img')
    let imgUrl = URL.createObjectURL(blob)
    img.src = imgUrl
    return img
}
const fetchImg = function (url, option) {
    return fetch(url, option)
            .then(validateResp)
            .then(getBlob)
            .then(setImgFromBlob)
}

const appendImg = function (node, refNode) {
    console.log('append img')
    refNode.parentNode.insertBefore(node, refNode);  
}

const addTextToPage = function (text) {
    let node = document.createElement('div')
    node.innerHTML = `${text}`
    document.body.appendChild(node)
}

const spinner = document.getElementsByClassName('spinner')[0]
// imageList.forEach(url => {
//     fetchImg(url, option)
//         .then((imgNode) => { appendImg(imgNode, spinner) })
// })

// version 1
const v1 = () => {
    Promise.resolve().then(() => {
        // can't use cb here, cause it will execute cb once, then execute thenable
        return  imageList.reduce((sequence, url) => {
            return sequence.then(() => {
                return fetchImg(url, option)
            }).then((imgNode) => {
                appendImg(imgNode, spinner)
            })
        }, Promise.resolve())
    }).then(() => {
        addTextToPage('All done')
    }).catch((err) => {
        addTextToPage('broken: ' + err)
    }).finally(() => {
        document.querySelector('.spinner').style.display = 'none'
    })
}

// version 2
const v2 = () => {
    Promise.resolve().then(() => {
        return Promise.all(imageList.map((url) => fetchImg(url, option)))
    }).then((imgNodes) => {
        imgNodes.forEach(node => {
            appendImg(node, spinner)
        })
        addTextToPage('All done')
    }).catch((err) => {
        addTextToPage('broken: ' + err)
    }).finally(() => {
        document.querySelector('.spinner').style.display = 'none'
    })
}

// version 3
const v3 = () => {
    Promise.resolve().then(() => {
        return imageList.map((url) => fetchImg(url, option))
            .reduce((sequence, curPromise) => {
                return sequence.then(() => curPromise)
                    .then((imgNode) => { appendImg(imgNode, spinner) })
            }, Promise.resolve())
    }).then(() => {
        addTextToPage('All done')
    }).catch((err) => {
        addTextToPage('broken: ' + err)
    }).finally(() => {
        document.querySelector('.spinner').style.display = 'none'
    })
}

// v1()
// v2()
v3()