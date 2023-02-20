import { describe, expect, test } from '@jest/globals';
import { gridCreator, wordPlacement } from './Puzzle';

describe("Test all the function that compose the puzzle function", () =>{
    describe("gridCreator function", () =>{
        const size = 6;
        const result = gridCreator(size);
        const character = 'ACBDEFGHIJKLMNOPQRSTUVWXYZ';
        test("With the size parametre the function should give us an array of array. they length must match the size parameter.", function(){
            expect(result).toHaveLength(size);
            result.forEach(lineArray =>{
                expect(lineArray).toHaveLength(size);
            });
        });
        test("The lineArray inside the main array must be fill with uppercase character [A-Z] elements", ()=>{
            result.forEach(lineArray =>{
                lineArray.forEach(element =>{
                    expect(character.includes(element)).toBeTruthy();
                })
            })
        })
    });
    describe('wordPlacement function', () =>{
        const wordList = ['cat', 'dog', 'tall'];
        const gridArr = new Array(6).fill(new Array(6).fill('A'));
        const direction = ['vertical', 'horizontal', 'inverseVertical', 'inverseHorizontal', 'diagonalUpRigth', 'diagonalUpLeft', 'diagonalDownRigth', 'diagonalDownLeft'];
        const posPossibility = [0, 1, 2, 3, 4, 5];
        const result = wordPlacement(wordList, gridArr)
        test('It should return an array of object for each word in the wordList parameter:', () =>{
            expect(result).toHaveLength(wordList.length);
        });
        test('Each object in the Array must have key of word, direction, position', () =>{
            result.forEach(word =>{
                expect(word).toHaveProperty('word');
                expect(word).toHaveProperty('direction');
                expect(word).toHaveProperty('position');
            });
        })
    })
});