export function SearchWordPuzzle({searchWord}){
    return(
        <>
        <table>
            {searchWord.puzzle.map(line =>{
                return (
                <tr>
                    {line.map(letter =>{
                        return(
                            <td>{letter}</td>
                        )
                    })}
                </tr>
                )
            })}
        </table>
        </>
    )
}