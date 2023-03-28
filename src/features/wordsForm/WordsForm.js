import * as React from "react";
import { InputComputerScreen, InputPhoneScreen} from "./Inputs/Inputs";

export function WordsForm({ size }){
    // Handeling the WordForm display of input word 
    ////////////////////////////////////////
    // looking at the current size of the window to select the initial state
    const initialInputWordState = window.matchMedia('(max-width: 750px)').matches ? <InputPhoneScreen size={size} /> : <InputComputerScreen size={size} />;
    // creation of the state
    const [inputWord, setInputWord] = React.useState(initialInputWordState);
    // depending of the size of the window we display the phone or computer input. 
    const HandelingInput = (screenSize) =>{
        if(screenSize){
        return setInputWord(<InputPhoneScreen size={size} />);
        } else return setInputWord(<InputComputerScreen size={size} />);
    };
    // Handle that manage the state with the resizing of the window
    const handleResize = () =>{
        let screenSize = window.matchMedia('(max-width: 750px)').matches;
        return HandelingInput(screenSize);
    };
    // Event Listener who triger our function while resizing the window
    window.addEventListener('resize', handleResize);
    // Updating the input display depending when the size change using useEffect
    React.useEffect(() => {
        handleResize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size])

    // Handeling the WordForm display of input word 
    ////////////////////////////////////////
    const remcomandation = (size) =>{
        // the switch logic will render an interactive sentence influenced by the size of the puzzle
        switch(size){
            case 8:
            case 12:
            case 16:
                return (`5* - ${size} words.`);
            case 20:
            case 24:
                return (`10* - ${size} words.`);
            default:
                throw new Error("something went wrong with the state of size.");
        }
    }


    return (
        <>
        <div className="inputWords">
            <label for="word"><h3>3- Words*</h3></label>
            <p>
                <br/>For your puzzle size {size}x{size} we recommande beetween {remcomandation(size)}
                <br/>Your words must be {size-1} letters or fewer. Any special characters or spaces will be removed.
            </p>
            <div>{inputWord}</div>           
        </div>
        <br/>
        </>
    );
}