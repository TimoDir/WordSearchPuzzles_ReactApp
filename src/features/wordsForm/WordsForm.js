import { InputComputerScreen, InputPhoneScreen} from "./Inputs/Inputs";

export function WordsForm({ size }){
    // check at the size (width) at the screen if more than 750px return false
    var screenSize = window.matchMedia('screen and (max-width: 750px)').matches;

    const HandelingInput = () =>{
        // depending of the size we display the phone or computer input. 
        if(screenSize){
            return <InputPhoneScreen size={size} />;
        } else return <InputComputerScreen size={size} />
    };
    
    // return the inputs depending of the defaults size of the screen
    var Inputs = HandelingInput();

    // Handle that manage the resizing of the window
    const handleResize = () =>{
        console.log(window.matchMedia('screen and (max-width: 750px)').matches);
        screenSize = window.matchMedia('screen and (max-width: 750px)').matches;
        Inputs = HandelingInput();
    };
    
    // The addEventListener with the parameter "resize" will triger the handeling to adjust the inupts depending of the new size of the Window
    window.addEventListener("resize", handleResize);

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
                <br/>For your puzzle size {size}*{size} we recommande beetween {remcomandation(size)}
                <br/>Your words must be {size-1} letters or fewer. Any special characters or spaces will be removed.
            </p>
            <div style={{display:"block",}} className="CheckScreenSize"></div>
            {Inputs}
            
        </div>
        <br/>
        </>
    );
}