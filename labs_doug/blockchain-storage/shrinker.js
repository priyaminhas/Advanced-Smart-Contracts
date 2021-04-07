const fs = require('fs');

if (process.argv.length < 5) {
    console.error("Super file shrinker v1.0.0");
    console.error("    node shrinker.js shrink <input-file> <output-file>");
    console.error("    node shrinker.js unshrink <input-file> <output-file>");
    process.exit(1);
}

let mode = process.argv[2];
let inputFile = process.argv[3];
let outputFile = process.argv[4];

let inputBytes = Array.prototype.slice.call(fs.readFileSync(inputFile));
let outputBytes;

if (mode === 'shrink') outputBytes = shrink(inputBytes);
else if (mode === 'unshrink') outputBytes = unshrink(inputBytes);
else throw("Unknown mode: " + mode);

fs.writeFileSync(outputFile, Buffer.from(outputBytes));


////////// Your code: //////////
function shrink(input) {
    console.log(`File size before shrink: ${input.length}`);
    let output = [];
    input = encodeInput(input);
    // EDIT ME
    let n = input.length;
    let count = 1;
   for(let i =0 ; i < n ; i++){
       
        if(input[i] !== input[i-1] || count >= 255){
            if(count > 1){
                output = output.concat([149, count, input[i-1]]);
            }else{
                output.push(input[i-1]);
            }
            count = 1;
        }
        else{
            count++;
        }
    }
    if (count > 1) {
        output = output.concat([149, count, input[input.length - 1]]);
    } else {
        output.push(input[input.length - 1]);
    }
    console.log(`File size after shrink: ${output.length}`);
    return output;
}

function unshrink(input) {
    console.log(`File size before unshrink ${input.length}`);
    let output = [];
    // EDIT ME
    let n = input.length;
    for(let i =0 ; i < n ; i += 2){
        if (input[i] === 149) {
            let dummyArr = new Array(input[i + 1]);
            dummyArr = dummyArr.fill(input[i + 2]);
            output = output.concat(dummyArr);
            i++;
        } else {
            output.push(input[i]);
            i--;
        }
    }
    output = decodeInput(output);

    console.log(`File size after unshrink ${output.length}`);
    return output;
}

function encodeInput(input){
    let encodedOutput = [input[0]];
    for (let i = 1; i < input.length; i++) {
        encodedOutput[i] = input[i] - input[i - 1];
    }
    return encodedOutput;
}
function decodeInput(input){
    for (let i = 1; i < input.length; i++) {
        if (input[i] >= 150) {
            input[i] = -(256 - input[i]);
        }
        input[i] = input[i] + input[i - 1];
    }
    return input;
}