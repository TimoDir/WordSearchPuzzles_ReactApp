export function SearchWordPuzzle({searchWord, title}){
    let index = -1;
    return(
        <div className="PrintSearchWord">
            <div className="Puzzle">
                <div>
                    {title ? <h1>{title}</h1>: <div className="EmptyBoxPuzzle"></div>}
                    <table>
                        {searchWord.wordInfo.length > 1 &&
                        searchWord.puzzle.map(line =>{
                            index = -1;
                            return (
                            <tr key={line.join('')}>
                                {line.map(letter =>{
                                    index++;
                                    return(<td key={searchWord.puzzle.indexOf(line)+letter+index}>{letter}</td>)
                                })}
                            </tr>
                            )
                        })}
                    </table>
                </div>
                <div>
                    <div className="EmptyBoxPuzzle"></div>
                    <ul>
                        {searchWord.wordInfo.length > 1 &&
                        searchWord.wordInfo.map(Info =>{
                                index++
                                return <li key={Info.word+index}>{Info.word}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}