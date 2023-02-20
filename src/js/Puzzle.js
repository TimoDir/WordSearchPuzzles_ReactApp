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


const gameGrid6 = gridCreator(5);
const wordList = ['cat', 'dog', 'tall']

export function wordPlacement(wordList, gameGrid){
    const direction = ['vertical', 'horizontal', 'inverseVertical', 'inverseHorizontal', 'diagonalUpRigth', 'diagonalUpLeft', 'diagonalDownRigth', 'diagonalDownLeft'];
    const wordInfo = [];
    for (let i = 0; i < wordList.length; i++) {
        wordInfo[i] = {
            word: wordList[i].toUpperCase(), 
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
                line = Math.floor(Math.random()*(gameGrid.length-1));
                column = randomMinMax(0, (gameGrid.length - wInfo.word.length));
                for (let i = 0; i < wInfo.word.length; i++) {
                    wInfo.position[i] = {
                        line: line,
                        column: column + i,
                    }
                };                
                break;
            case 'horizontal' :
                line = randomMinMax(0, (gameGrid.length - wInfo.word.length));
                column = Math.floor(Math.random()*(gameGrid.length-1));
                for (let i = 0; i < wInfo.word.length; i++) {
                    wInfo.position[i] = {
                        line: line + i,
                        column: column,
                    }
                };                
                break;
            case 'inverseVertical' :
                line = Math.floor(Math.random()*(gameGrid.length-1));
                column = randomMinMax((gameGrid.length - wInfo.word.length), (gameGrid.length -1));
                for (let i = 0; i < wInfo.word.length; i++) {
                    wInfo.position[i] = {
                        line: line,
                        column: column - i,
                    }
                };                
                break;
            case 'inverseHorizontal' :
                line = randomMinMax((gameGrid.length - wInfo.word.length), gameGrid.length -1);
                column = Math.floor(Math.random()*(gameGrid.length-1));
                for (let i = 0; i < wInfo.word.length; i++) {
                    wInfo.position[i] = {
                        line: line -i,
                        column: column,
                    }
                };                
                break;
            case  'diagonalDownRigth':
                line = randomMinMax(0, (gameGrid.length - wInfo.word.length));
                column = randomMinMax(0, (gameGrid.length - wInfo.word.length));
                for (let i = 0; i < wInfo.word.length; i++) {
                    wInfo.position[i] = {
                        line: line +i,
                        column: column+i,
                    }
                };                
                break;
            case 'diagonalDownLeft' :
                line = randomMinMax(0, (gameGrid.length - wInfo.word.length));
                column = randomMinMax((gameGrid.length - wInfo.word.length), (gameGrid.length-1));
                for (let i = 0; i < wInfo.word.length; i++) {
                    wInfo.position[i] = {
                        line: line +i,
                        column: column-i,
                    }
                };                
                break;
            case 'diagonalUpRigth' :
                line = randomMinMax((gameGrid.length - wInfo.word.length), (gameGrid.length -1));
                column = randomMinMax(0, (gameGrid.length - wInfo.word.length));
                for (let i = 0; i < wInfo.word.length; i++) {
                    wInfo.position[i] = {
                        line: line -i,
                        column: column+i,
                    }
                };                
                break;
            case 'diagonalUpLeft' :
                line = randomMinMax((gameGrid.length - wInfo.word.length), (gameGrid.length - 1));
                column = randomMinMax((gameGrid.length - wInfo.word.length), (gameGrid.length - 1));
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

    while(conflict){
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

        conflict = stillConflict;
    }

    return wordInfo;
};



wordPlacement(wordList, gameGrid6);