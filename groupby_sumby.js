const sampleData = [
  { id: "1", quantity: 3 },
  { id: "2", quantity: 10 },
  { id: "3", quantity: 8 },
  { id: "2", quantity: 8 },
];

const groupBy = (list, key) => {
    if (!key) {
        throw Error("missing group by key")
    }
    return list.reduce((acc, item) => {
        let val = item[key];
        if (!acc[val]) {
            acc[val] = [];
        }
        acc[val].push(item);
        return acc;
    }, {})
}

const grouped = groupBy(sampleData, 'id')
console.log(grouped)
console.log(Object.keys(grouped).length === 3)
console.log(grouped["1"].length === 1)
console.log(grouped["2"].length === 2)
console.log(grouped["3"].length === 1)
// first item (and only) should have id 3 and quantity 8
console.log(grouped["3"][0]["quantity"] === 8)

const objmap = (obj, fn) => {
    return Object.keys(obj).reduce((acc, key) => {
        acc[key] = fn(obj[key]);
        return acc;
    }, {})
}

// sum all the lists inside of an object of type: object<list<object>>
const sumGroups = (groups) => {
    return objmap(groups, x => sumByKey(x, 'quantity'))
}

const sumByKey = (listOfObjects, key) => {
    if (!key) {
        throw Error("missing sum by key")
    }
    return listOfObjects.reduce((acc, item) => {
        return acc + item[key]
    }, 0)
}

const sumby = (list, keyToGroup, keyToSum) => {
    let grouped = groupBy(list, keyToGroup)
    let summed = sumGroups(grouped, keyToSum)
    return summed;
}

summed = sumby(sampleData, 'id', 'quantity')
console.log(summed)
console.log(summed["1"] === 3)
console.log(summed["2"] === 18)
console.log(summed["3"] === 8)

