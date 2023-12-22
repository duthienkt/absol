import { formatDateTime, MILLIS_PER_DAY } from "../Time/datetime";
import SCOperatorExecutor from "./SCOperatorExecutor";


export function ADD(a, b) {
    var type_a = typeof a;
    var type_b = typeof b;
    if (type_a === "number") {
        if (type_b === "number" || type_b === 'string')
            return a + b;
    }
    if (type_a === "undefined" && type_b === "undefined")
        return undefined;
    if (type_a === 'string') {
        if (type_b === "string")
            return a + b;
        if (b instanceof Date) return a + formatDateTime(b, 'dd/MM/yyyy');
        if (type_b === "number") return a + b;
    }
    if (a instanceof Date) {
        if (type_b === 'number') {
            return new Date(a.getTime() + MILLIS_PER_DAY * b);
        }
        else if (type_b === 'string') {
            return formatDateTime(a, 'dd/MM/yyyy') + b;
        }
    }
    if (a.add && a.constructor === b.constructor) return a.add(b);

    console.error("Can not add: ", a, b);
    return NaN;
}

SCOperatorExecutor.addBinaryOperator('+', ADD);


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
    if (a.sub && a.constructor === b.constructor) return a.sub(b);

    console.error("Can not sub: ", a, b);
    return NaN;
}

SCOperatorExecutor.addBinaryOperator('-', SUB);


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

SCOperatorExecutor.addBinaryOperator('*', MUL);


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

SCOperatorExecutor.addBinaryOperator('/', DIV);


export function MOD(x, m) {
    return x % m;
}

SCOperatorExecutor.addBinaryOperator('%', MOD);


export function NEGATIVE(x) {
    return -x;
}

SCOperatorExecutor.addUnaryOperator('-', NEGATIVE);


export function POSITIVE(x) {
    return x;
}

SCOperatorExecutor.addUnaryOperator('+', POSITIVE);

export function NOT(x) {
    return !x;
}

SCOperatorExecutor.addUnaryOperator('!', NOT);


export function LESS_THAN(a, b) {
    if (a instanceof Date) a = a.getTime();
    if (b instanceof Date) b = b.getTime();
    return (a < b);
}

SCOperatorExecutor.addBinaryOperator('<', LESS_THAN);


export function MORE_THAN(a, b) {
    if (a instanceof Date) a = a.getTime();
    if (b instanceof Date) b = b.getTime();
    return (a > b);
}

SCOperatorExecutor.addBinaryOperator('>', MORE_THAN);


export function EQUAL(a, b) {
    if (a instanceof Date) a = a.getTime();
    if (b instanceof Date) b = b.getTime();
    return (a === b);
}

SCOperatorExecutor.addBinaryOperator('==', EQUAL);


export function LESS_AND_EQUAL(a, b) {
    if (a instanceof Date) a = a.getTime();
    if (b instanceof Date) b = b.getTime();
    return (a <= b);
}

SCOperatorExecutor.addBinaryOperator('<=', LESS_AND_EQUAL);


export function MORE_AND_EQUAL(a, b) {
    if (a instanceof Date) a = a.getTime();
    if (b instanceof Date) b = b.getTime();
    return (a >= b);
}

SCOperatorExecutor.addBinaryOperator('>=', MORE_AND_EQUAL);


export function NOT_EQUAL(a, b) {
    if (a instanceof Date) a = a.getTime();
    if (b instanceof Date) b = b.getTime();
    return (a != b);
}

SCOperatorExecutor.addBinaryOperator('!=', NOT_EQUAL);

export function AND(a, b) {
    return a && b;
}

SCOperatorExecutor.addBinaryOperator('&&', AND);

export function OR(a, b) {
    return a || b;
}

SCOperatorExecutor.addBinaryOperator('||', OR);

