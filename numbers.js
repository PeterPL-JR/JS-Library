/** Convert decimal number to roman */
function decToRoman(dec) {
}
/** Convert roman number to decimal */
function romToDecimal(rom) {
}

/** Convert decimal number to binary */
function decToBinary(dec) {
    let numbers = [];
    
    while(dec != 0) {
        numbers.unshift(dec % 2);
        dec = parseInt(dec / 2);
    }
    let bin = "";
    for(let number of numbers) {
        bin += number;
    }
    return bin;
}
/** Convert binary number to decimal */
function binToDecimal(bin) {
    let dec = 0;

    for(let i = 0; i < bin.length; i++) {
        let weight = Math.pow(2, i);
        
        let binNum = bin[bin.length - i - 1];
        dec += binNum * weight;
    }
    return dec;
}

/** Convert binary number to hexadecimal */
function binToHex(bin) {
    let modulo = bin.length % 4;
    if(modulo != 0) {
        for(let i = 0; i < 4 - modulo; i++) {
            bin = "0" + bin;
        }
    }

    let numbers = [];
    for(let i = 0; i < bin.length / 4; i++) {
        let binPart = bin.substr(i * 4, 4);
        let number = 0;

        for(let j = 0; j < 4; j++) {
            let weight = Math.pow(2, j);

            let binNum = binPart[4 - j - 1];
            number += binNum * weight;
        }
        numbers.push(number);
    }

    let hex = "";
    const LETTERS = ["A","B","C","D","E","F"];

    for(let number of numbers) {
        hex += (number < 10) ? number : LETTERS[number - 10];
    }
    return hex;
}
/** Convert hexadecimal number to binary */
function hexToBinary(hex) {
    let bin = "";
    const LETTERS = ["A","B","C","D","E","F"];

    for(let ch of hex) {
        let letterIndex = LETTERS.indexOf(ch);
        let number = (letterIndex == -1) ? ch : (letterIndex + 10);

        let binPart = decToBinary(number);
        if(binPart.length < 4) {
            for(let i = 0; i < 4 - binPart.length; i++) {
                binPart = "0" + binPart;
            }
        }
        bin += binPart;
    }
    return bin;
}

/** Convert decimal number to hexadecimal */
function decToHex(dec) {
    return binToHex(decToBinary(dec));
}

/** Convert hexadecimal number to decimal */
function hexToDec(hex) {
    return binToDecimal(hexToBinary(hex));
}