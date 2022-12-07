import { MILLIS_PER_DAY } from "../Time/datetime";


export function ADD(a, b) {
    var type_a = typeof a;
    var type_b = typeof b;
    if (type_a === "number" && type_b === "number") {
        return a + b;
    }
    if (type_a === "undefined" && type_b === "undefined")
        return undefined;
    if (type_a === 'string' && type_b === 'string') {
        return a + b;
    }
    if (a instanceof Date) {
        if (type_b === 'number') {
            return new Date(a.getTime() + MILLIS_PER_DAY * b);
        }
    }
    console.error("Can not add: ", a, b);
    return NaN;
}


export function SUB(a, b) {
    var type_a = typeof a;
    var type_b = typeof b;
    if (type_a === "number" && type_b === "number") {
        return a - b;
    }
    if (type_a === "undefined" && type_b === "undefined")
        return undefined;
    if (a instanceof Date) {
        if (type_b === 'number') {
            return new Date(a.getTime() - MILLIS_PER_DAY * b);
        }
    }
    console.error("Can not sub: ", a, b);
    return NaN;
}


export function MUL(a, b) {
    var type_a = typeof a;
    var type_b = typeof b;
    if (type_a === "number" && type_b === "number") {
        return a * b;
    }
    if (type_a === "undefined" && type_b === "undefined")
        return undefined;
    if (type_a === "string" && type_b === "number") {
        return a.repeat(b);
    }
    console.error("Can not mul: ", a, b);
    return NaN;
}


export function DIV(a, b) {
    var type_a = typeof a;
    var type_b = typeof b;
    if (type_a === "number" && type_b === "number") {
        return a / b;
    }
    if (type_a === "undefined" && type_b === "undefined")
        return undefined;
    console.error("Can not div: ", a, b);
    return NaN;
}

export function MOD(x, m){
    return x%m;
}


export function NEGATIVE(x) {
    return -x;
}

export function POSITIVE(x) {
    return x;
}

export function NOT(x) {
    return !x;
}




export function LESS_THAN(a, b) {
    if (a instanceof Date) a = a.getTime();
    if (b instanceof Date) b = b.getTime();
    return (a < b);
}

export function MORE_THAN(a, b) {
    if (a instanceof Date) a = a.getTime();
    if (b instanceof Date) b = b.getTime();
    return (a > b);
}

export function EQUAL(a, b){
    if (a instanceof Date) a = a.getTime();
    if (b instanceof Date) b = b.getTime();
    return (a === b);
}

export function LESS_AND_EQUAL(a, b){
    if (a instanceof Date) a = a.getTime();
    if (b instanceof Date) b = b.getTime();
    return (a <= b);
}

export function MORE_AND_EQUAL(a, b){
    if (a instanceof Date) a = a.getTime();
    if (b instanceof Date) b = b.getTime();
    return (a >= b);
}
