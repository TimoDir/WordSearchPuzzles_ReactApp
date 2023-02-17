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