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


const gameGrid6 = gridCreator(6);
const wordList = ['cat', 'dog', 'tall']

export function wordPlacement(wordList, gameGrid){
    const direction = ['vertical', 'horizontal', 'inverseVertical', 'inverseHorizontal', 'diagonalUpRigth', 'diagonalUpLeft', 'diagonalDownRigth', 'diagonalDownLeft'];
    const wordInfo = [];
    for (let i = 0; i < wordList.length; i++) {
        wordInfo[i] = {
            word: wordList[i].toUpperCase(), 
            direction : direction[Math.floor(Math.random()* direction.length)],
            position: [],
        };
    };

    const placement = (wInfo) =>{
        const randomMinMax = (min, max) => Math.floor(Math.random()*(max - min +1)+ min);
        let line;
        let column;
        switch (wInfo.direction){
            case 'vertical':
                line = Math.floor(Math.random()*gameGrid.length-1);
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
                column = Math.floor(Math.random()*gameGrid.length-1);
                for (let i = 0; i < wInfo.word.length; i++) {
                    wInfo.position[i] = {
                        line: line + i,
                        column: column,
                    }
                };                
                break;
            case 'inverseVertical' :
                line = Math.floor(Math.random()*gameGrid.length-1);
                column = randomMinMax((gameGrid.length - wInfo.word.length + 1), gameGrid.length -1);
                for (let i = 0; i < wInfo.word.length; i++) {
                    wInfo.position[i] = {
                        line: line,
                        column: column - i,
                    }
                };                
                break;
            case 'inverseHorizontal' :
                line = randomMinMax((gameGrid.length - wInfo.word.length + 1), gameGrid.length -1);
                column = Math.floor(Math.random()*gameGrid.length-1);
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
                column = randomMinMax((gameGrid.length - wInfo.word.length + 1), gameGrid.length-1);
                for (let i = 0; i < wInfo.word.length; i++) {
                    wInfo.position[i] = {
                        line: line +i,
                        column: column-i,
                    }
                };                
                break;
            case 'diagonalUpRigth' :
                line = randomMinMax((gameGrid.length - wInfo.word.length + 1), gameGrid.length -1);
                column = randomMinMax(0, (gameGrid.length - wInfo.word.length));
                for (let i = 0; i < wInfo.word.length; i++) {
                    wInfo.position[i] = {
                        line: line -i,
                        column: column+i,
                    }
                };                
                break;
            case 'diagonalUpLeft' :
                line = randomMinMax((gameGrid.length - wInfo.word.length + 1), gameGrid.length - 1);
                column = randomMinMax((gameGrid.length - wInfo.word.length + 1), gameGrid.length - 1);
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

    

    console.log(wordInfo)

    return wordInfo;
};

wordPlacement(wordList, gameGrid6);