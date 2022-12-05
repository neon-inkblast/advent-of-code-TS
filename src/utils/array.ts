export function splitOnEmpty<T>(arr:T[]): T[][]{ 
    return splitOnX(arr, "")
}

export function splitOnX<T>(arr:T[], token:string): T[][]{ 
    const newArr:T[][] = [];
    let tempArr:T[] = [];
    arr.forEach(x => {
        if (x === token) {
            newArr.push(tempArr);
            tempArr = [];
        } else {
            tempArr.push(x);
        }
    })
    if (tempArr.length > 0) {
        newArr.push(tempArr);
    }
    return newArr;
}
