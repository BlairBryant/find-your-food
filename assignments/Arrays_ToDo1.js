const pushFront = (arr, item) => {
    return [item, ...arr]
}

const popFront = (arr) => {
    const lastItem = arr[arr.length-1]
    arr[arr.length-1] = arr[0]
    arr[0] = lastItem
    return arr.pop()
}

const insertAt = (arr, i, item) => {
    arr[i] = item
    return arr
}

const removeAt = (arr, i) => {
    const temp = arr[arr.length-1]
    arr[arr.length-1] = arr[i]
    arr[i] = temp
    return arr.pop()
}

const swapPairs = (arr) => {
    for (let i = 0; i < arr.length; i+=2) {
        if (i !== arr.length-1) {
            const temp = arr[i]
            arr[i] = arr[i+1]
            arr[i+1] = temp
        }
    }
    return arr
}

const removeDuplicates = (arr) => {
    let hash = {}
    for (let i = 0; i < arr.length; i++) {
        if (!hash[arr[i]]) {
            hash[arr[i]] = 1
        }
    }
    return Object.keys(hash)
}