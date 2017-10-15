/**
 * 打乱数组
 * @param min
 * @param max
 * @returns {number}
 */

// 获取从最大到最小数之间的随机数 包括最大或者最小数
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
    let _arr = arr.slice()
    for (let i = 0; i < _arr.length; i++) {
        let j = getRandomInt(0, i)
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t
    }
    return _arr
}
