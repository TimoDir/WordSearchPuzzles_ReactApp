export function gridCreator (puzzleSize){
    const character = 'ACBDEFGHIJKLMNOPQRSTUVWXYZ';
    const gameGrid = [];

    for (let i = 0; i < puzzleSize; i++) {
        const newLine = []
        for (let y = 0; y < puzzleSize; y++) {
            newLine.push(character[Math.floor(Math.random()*character.length)]);
        }
        gameGrid.push(newLine);
    };

    return gameGrid;
};

export function wordPlacement(wordList, size){
    const direction = ['vertical', 'horizontal', 'inverseVertical', 'inverseHorizontal', 'diagonalUpRigth', 'diagonalUpLeft', 'diagonalDownRigth', 'diagonalDownLeft'];
    const wordInfo = [];
    for (let i = 0; i < wordList.length; i++) {
        wordInfo[i] = {
            word: wordList[i].normalize('NFD').replace(/[^a-zA-Z]/g, '').replace(/[\u0300-\u036f]/g, '').toUpperCase(), 
            direction : '',
            position: [],
        };
    };

    const placement = (wInfo) =>{
        const randomMinMax = (min, max) => Math.floor(Math.random()*(max - min +1)+ min);
        let line;
        let column;
        wInfo.direction = direction[Math.floor(Math.random()* direction.length)];
        switch (wInfo.direction){
            case 'vertical':
                line = Math.floor(Math.random()*(size-1));
                column = randomMinMax(0, (size - wInfo.word.length));
                for (let i = 0; i < wInfo.word.length; i++) {
                    wInfo.position[i] = {
                        line: line,
                        column: column + i,
                    }
                };                
                break;
            case 'horizontal' :
                line = randomMinMax(0, (size - wInfo.word.length));
                column = Math.floor(Math.random()*(size-1));
                for (let i = 0; i < wInfo.word.length; i++) {
                    wInfo.position[i] = {
                        line: line + i,
                        column: column,
                    }
                };                
                break;
            case 'inverseVertical' :
                line = Math.floor(Math.random()*(size-1));
                column = randomMinMax((wInfo.word.length - 1), (size-1));
                for (let i = 0; i < wInfo.word.length; i++) {
                    wInfo.position[i] = {
                        line: line,
                        column: column - i,
                    }
                };                
                break;
            case 'inverseHorizontal' :
                line = randomMinMax((wInfo.word.length - 1), (size-1));
                column = Math.floor(Math.random()*(size-1));
                for (let i = 0; i < wInfo.word.length; i++) {
                    wInfo.position[i] = {
                        line: line -i,
                        column: column,
                    }
                };                
                break;
            case  'diagonalDownRigth':
                line = randomMinMax(0, (size - wInfo.word.length));
                column = randomMinMax(0, (size - wInfo.word.length));
                for (let i = 0; i < wInfo.word.length; i++) {
                    wInfo.position[i] = {
                        line: line +i,
                        column: column+i,
                    }
                };                
                break;
            case 'diagonalDownLeft' :
                line = randomMinMax(0, (size - wInfo.word.length));
                column = randomMinMax((wInfo.word.length - 1), (size-1));
                for (let i = 0; i < wInfo.word.length; i++) {
                    wInfo.position[i] = {
                        line: line +i,
                        column: column-i,
                    }
                };                
                break;
            case 'diagonalUpRigth' :
                line = randomMinMax((wInfo.word.length - 1), (size-1));
                column = randomMinMax(0, (size - wInfo.word.length));
                for (let i = 0; i < wInfo.word.length; i++) {
                    wInfo.position[i] = {
                        line: line -i,
                        column: column+i,
                    }
                };                
                break;
            case 'diagonalUpLeft' :
                line = randomMinMax((wInfo.word.length - 1), (size-1));
                column = randomMinMax((wInfo.word.length - 1), (size-1));
                for (let i = 0; i < wInfo.word.length; i++) {
                    wInfo.position[i] = {
                        line: line -i,
                        column: column-i,
                    }
                };                
                break;
            default:
            return;
        }
    }

    for (let i = 0; i < wordInfo.length; i++) {
        placement(wordInfo[i])
    };


    // Looking if conflict inside the positionnement and the letter
    let conflict = true;
    let counter = 0;

    while(conflict){
        if(counter > (size * size * 500)){
            console.log('Placement to long remove one word of the list')
            wordInfo.splice(Math.floor(Math.random()*wordInfo.length), 1);
            for (let i = 0; i < wordInfo.length; i++) {
                placement(wordInfo[i])
            };
            counter = 0;
        }

        // set at the end conflict true or false
        let stillConflict = false;

        // loop inside the wordInfo array
        for (let i = 0; i < wordInfo.length; i++){ 
        // loop to comparate each word with all the next one
        for (let j = i+1; j < wordInfo.length; j++){
                // loop inside each letter position of the first loop comparaison
                for (let k = 0; k < wordInfo[i].position.length; k++) {
                // for each letter compare with the letter position of each other word 
                for (let l = 0; l < wordInfo[j].position.length; l++) {
                    // Look if the position are the same
                    if(wordInfo[i].position[k].line === wordInfo[j].position[l].line && 
                        wordInfo[i].position[k].column === wordInfo[j].position[l].column){
                        // If the direction of the word we check is the same we need to change it
                        if(wordInfo[i].direction === wordInfo[j].direction){
                            placement(wordInfo[i]);
                            stillConflict = true;
                        };
                        // If not I have to check if the letter are the same if yes there is no conflict else there is one
                        if(wordInfo[i].word[k] !== wordInfo[j].word[l]){
                            placement(wordInfo[i]);
                            stillConflict = true;
                        };
                    } 
                };};  
            };};
        counter++;
        conflict = stillConflict;
    }

    return wordInfo;
};


const size = 5;
const wordList = ['cat', 'dog', 'mice'];
const wordInfo = wordPlacement(wordList, size)


export function puzzleGeneration(wordInfo, size){
    const gridWithWord = gridCreator(size);
    for (let i = 0; i < wordInfo.length; i++) {
        for (let j = 0; j < wordInfo[i].position.length; j++) {
            gridWithWord[wordInfo[i].position[j].line][wordInfo[i].position[j].column] = wordInfo[i].word[j];
        }
    }
    return gridWithWord;
}

puzzleGeneration(wordInfo, size);