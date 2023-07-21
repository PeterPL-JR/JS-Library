/** Convert decimal number to roman */
function decToRoman(dec) {
    if(dec == 0 || dec >= 4000) return;
    let rom = "";

    const SIMPLE_NUMBERS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
    const DEC_NUMBERS = ["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
    const HUN_NUMBERS = ["C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];

    let decStr = dec + "";
    for(let i = 0; i < decStr.length; i++) {
        let n = decStr[decStr.length - i - 1];
        if(n == 0) continue;

        if(i == 0) rom = SIMPLE_NUMBERS[n - 1];
        if(i == 1) rom = DEC_NUMBERS[n - 1] + rom;
        if(i == 2) rom = HUN_NUMBERS[n - 1] + rom;
        if(i == 3) {
            for(let j = 1; j <= n; j++) {
                rom = "M" + rom;
            }
        }
    }
    return rom;
}
/** Convert roman number to decimal */
function romToDecimal(rom) {
    let dec = 0;

    const SIMPLE_NUMBERS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
    const DEC_NUMBERS = ["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
    const HUN_NUMBERS = ["C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];

    while(rom[0] == "M") {
        dec += 1000;
        rom = rom.substr(1);
    }

    let i = 0;
    while(rom.length != 0) {
        let factor = Math.pow(10, i);
        
        if(i == 0) var chars = SIMPLE_NUMBERS;
        if(i == 1) var chars = DEC_NUMBERS;
        if(i == 2) var chars = HUN_NUMBERS;

        let found = false;
        for(let j = chars.length - 1; j >= 0; j--) {
            if(j == 4) continue;

            let lastIndex = rom.indexOf(chars[j]);
            if(lastIndex != -1) {
                dec += (j + 1) * factor;
                rom = rom.substr(0, rom.length - chars[j].length);
                found = true;
                break;
            }
        }
        if(!found) {
            let last = rom[rom.length - 1];

            let condV = i == 0 && last == "V";
            let condL = i == 1 && last == "L";
            let condD = i == 2 && last == "D";

            if(condV) dec += 5;
            if(condL) dec += 50;
            if(condD) dec += 500;
            
            if(condV || condL || condD) {
                rom = rom.substr(0, rom.length - 1);
            }
        }
        i++;
    }
    return dec;
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

/** Convert binary number to octal */
function binToOct(bin) {
    let modulo = bin.length % 3;
    if(modulo != 0) {
        for(let i = 0; i < 3 - modulo; i++) {
            bin = "0" + bin;
        }
    }

    let numbers = [];
    for(let i = 0; i < bin.length / 3; i++) {
        let binPart = bin.substr(i * 3, 3);
        let number = 0;

        for(let j = 0; j < 3; j++) {
            let weight = Math.pow(2, j);

            let binNum = binPart[3 - j - 1];
            number += binNum * weight;
        }
        numbers.push(number);
    }

    let oct = "";
    for(let number of numbers) {
        oct += number + "";
    }
    return oct;
}
/** Convert octal number to binary */
function octToBinary(oct) {
    let bin = "";

    for(let ch of oct) {
        let binPart = decToBinary(ch);
        if(binPart.length < 3) {
            for(let i = 0; i < 3 - binPart.length; i++) {
                binPart = "0" + binPart;
            }
        }
        bin += binPart;
    }
    return bin;
}

/** Convert decimal number to octal */
function decToOct(dec) {
    return binToOct(decToBinary(dec));
}

/** Convert octal number to decimal */
function octToDec(oct) {
    return binToDecimal(octToBinary(oct));
}