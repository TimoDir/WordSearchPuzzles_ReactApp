import { describe, expect, test } from '@jest/globals';
import { gridCreator } from './Puzzle';

describe("Test all the function that compose the puzzle function", () =>{
    // test of the gridCreator function
    describe("gridCreator function", () =>{
        //define parametre of the test
        const size = 16;
        const result = gridCreator(size);
        const character = 'ACBDEFGHIJKLMNOPQRSTUVWXYZ';
        test("With the size parametre the function should give us an array of array. they length must match the size parameter.", function(){
            expect(size).toStrictEqual(result.length);
            result.forEach(lineArray =>{
                // we look inside the main array each array must be the same size
                expect(lineArray.length).toStrictEqual(size);
            });
        });
        test("The lineArray inside the main array must be fill with uppercase character [A-Z] elements", ()=>{
            result.forEach(lineArray =>{
                lineArray.forEach(element =>{
                    // we look inside the main array and now inside each element of the LineArray they must be an uppercase letter
                    expect(character.includes(element)).toBeTruthy();
                })
            })
        })
    });
});