import React from "react";

export class SearchWordPuzzle extends React.PureComponent{
    constructor(){
        super();
        this.index = -1;
    };

    render(){
    return(
        <div className="PrintSearchWord">
            <div className="Puzzle">
                <div>
                    {this.props.title ? <h1>{this.props.title}</h1>: <div className="EmptyBoxPuzzle"></div>}
                    <table>
                        {this.props.searchWord.wordInfo.length > 1 &&
                        this.props.searchWord.puzzle.map(line =>{
                            let index = this.index;
                            return (
                            <tr key={line.join('')}>
                                {line.map(letter =>{
                                    index++;
                                    return(<td key={this.props.searchWord.puzzle.indexOf(line)+letter+index}>{letter}</td>)
                                })}
                            </tr>
                            )
                        })}
                    </table>
                </div>
                <div>
                    <div className="EmptyBoxPuzzle"></div>
                    <ul>
                        {this.props.searchWord.wordInfo.length > 1 &&
                        this.props.searchWord.wordInfo.map(Info =>{
                                let index = this.index;
                                return <li key={Info.word+index}>{Info.word}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )}
}