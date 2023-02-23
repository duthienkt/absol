export function feetToMeter(ft) {
    return ft / 3.28084;
}

export function meterToFeet(mt) {
    return mt * 3.28084;
}

export function meterToInch(mt) {
    return mt * 39.3701;
}

export function mileToMeter(ml) {
    return ml * 1609.34;
}


export function meterToMile(ml) {
    return ml / 1609.34;
}

export function meterToYard(mt) {
    return mt * 1.09361
}


export function yardToMeter(yd) {
    return yd / 1.09361;
}

export function pointToDot(p) {
    return p * 72 / 96;
}


export function dotToPoint(d) {
    return d * 96 / 72;
}


export function pxToCentimeter(px) {

}

export function centimeterToPx(cm) {
    return meterToInch(cm / 100) * 96;
}


export var PAGE_SIZE_IN_DOT = {
    a0: [2383.94, 3370.39],
    a1: [1683.78, 2383.94],
    a2: [1190.55, 1683.78],
    a3: [841.89, 1190.55],
    a4: [595.28, 841.89],

    a5: [419.53, 595.28],
    a6: [297.64, 419.53],
    a7: [209.76, 297.64],
    a8: [147.4, 209.76],
    a9: [104.88, 147.4],
    a10: [73.7, 104.88],
    b0: [2834.65, 4008.19],
    b1: [2004.09, 2834.65],
    b2: [1417.32, 2004.09],
    b3: [1000.63, 1417.32],
    b4: [708.66, 1000.63],
    b5: [498.9, 708.66],
    b6: [354.33, 498.9],
    b7: [249.45, 354.33],
    b8: [175.75, 249.45],
    b9: [124.72, 175.75],
    b10: [87.87, 124.72],
    c0: [2599.37, 3676.54],
    c1: [1836.85, 2599.37],
    c2: [1298.27, 1836.85],
    c3: [918.43, 1298.27],
    c4: [649.13, 918.43],
    c5: [459.21, 649.13],
    c6: [323.15, 459.21],
    c7: [229.61, 323.15],
    c8: [161.57, 229.61],
    c9: [113.39, 161.57],
    c10: [79.37, 113.39],
    dl: [311.81, 623.62],
    letter: [612, 792],
    "government-letter": [576, 756],
    legal: [612, 1008],
    "junior-legal": [576, 360],
    ledger: [1224, 792],
    tabloid: [792, 1224],
    "credit-card": [153, 243]
};


export var PAGE_SIZE_IN_POINT = Object.keys(PAGE_SIZE_IN_DOT).reduce((ac, key) => {
    ac[key] = PAGE_SIZE_IN_DOT[key].map(d => dotToPoint(d));
    return ac;
}, {});