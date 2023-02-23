import { describe, expect, test } from '@jest/globals';
import { gridCreator, wordPlacement, searchWordGeneration } from '../src/js/Puzzle';

describe("Test all the function that compose the searchWordGeneration function", () =>{
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
                });
            });
        });
    });
    
    describe('wordPlacement function', () =>{
        
        const wordList = ['cat', 'dog', 'tall'];
        const size = 5;
        const wordUper = ['CAT', 'DOG', 'TALL'];
        const direction = ['vertical', 'horizontal', 'inverseVertical', 'inverseHorizontal', 'diagonalUpRigth', 'diagonalUpLeft', 'diagonalDownRigth', 'diagonalDownLeft'];
        const posPossibility = [0, 1, 2, 3, 4];
        const result = wordPlacement(wordList, size);

        test('It should return an array of object for each word in the wordList parameter:', () =>{
            expect(result).toHaveLength(wordList.length);
        });
        test('Each object in the Array must have key of word, direction, position', () =>{
            result.forEach(word =>{
                expect(word).toHaveProperty('word');
                expect(word).toHaveProperty('direction');
                expect(word).toHaveProperty('position');
            });
        });
        test('the key value of word must be a word of our wordList but in uppercase', () =>{
            result.forEach(word =>{
                expect(wordUper.includes(word.word)).toBeTruthy();
            });
        });
        test('the key value of direction must be a one of the direction inside our direction arr', () =>{
            result.forEach(word =>{
                expect(direction.includes(word.direction)).toBeTruthy();
            });
        });
        test('the key value of position must have 2 key value line and column and to have a value between 0 and size-1', () =>{
            result.forEach(word =>{
                word.position.forEach(position =>{
                    expect(position).toHaveProperty('line');
                    expect(posPossibility.includes(position.line)).toBeTruthy();
                    expect(position).toHaveProperty('column');
                    expect(posPossibility.includes(position.column)).toBeTruthy();
                });
            });
        });
    });
    
    describe("searchWordGeneration function", () =>{
        
        const wordList = ['cat', 'dog', 'tall'];
        const size = 5;
        const result = searchWordGeneration(wordList, size);
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
                });
            });
        });
    });
});