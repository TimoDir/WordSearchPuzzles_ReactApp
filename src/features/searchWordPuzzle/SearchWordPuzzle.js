export function SearchWordPuzzle({searchWord}){
    let index = -1;
    return(
        <>
        <table>
            {searchWord.wordInfo.length > 1 &&
            searchWord.puzzle.map(line =>{
                index = -1;
                return (
                <tr key={line.join('')}>
                    {line.map(letter =>{
                        index++;
                        return(
                            <td key={searchWord.puzzle.indexOf(line)+letter+index}>{letter}</td>
                        )
                    })}
                </tr>
                )
            })}
        </table>
        <aside>
            <ul>
                {searchWord.wordInfo.length > 1 &&
                searchWord.wordInfo.map(Info =>{
                        index++
                        return <li key={Info.word+index}>{Info.word}</li>
                    })
                }
            </ul>
        </aside>
        </>
    )
}