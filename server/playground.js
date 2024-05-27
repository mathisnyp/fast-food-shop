import _ from "lodash"


const objectOne = {
    firstname: "Paul",
    lastname: "Lustig",
    phone: "123",
}
const objectTwo = {
    firstname: undefined,
    phone: "567"
}

const mergedObject = {...objectOne, ...objectTwo}

console.log(mergedObject)