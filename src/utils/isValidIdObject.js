import ObjectID from "bson-objectid";

export default function isValidIdObject(item) {
    return ObjectID.isValid(item) && new ObjectID(item) !== item
}

