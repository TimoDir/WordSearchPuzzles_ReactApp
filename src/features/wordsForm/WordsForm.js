export function WordsForm({ size }){
    // helper function who will set the number of input avaiable in comparaison with the size of our puzzle.
    const requiredWord = (size) =>{
        // We manage the required input and the unrequired one.
        let requiredNum;
        const finalInput = [];

        // helper function who push the input inside our result array by getting the number of required input and the size of the puzzle.
        const finalInputConstructor = (requiredNum) =>{
            let unRequiredNum = size - (requiredNum);
            for (let i = 1; i <= requiredNum; i++) {
                if((i-1)%5 === 0 ){
                    finalInput.push(<br/>)
                };
                finalInput.push(<input key={'Req'+i} type="text" id="word" minLength={3} maxLength={size-1} required/>);
            };
            finalInput.push('*')
            for (let i = 1; i <= unRequiredNum; i++) {
                if(i === 1 || (i-1)%5 === 0){
                    finalInput.push(<br/>)
                };
                finalInput.push(<input key={'UnReq'+(i+requiredNum)} type="text" id="word" minLength={3} maxLength={size-1}/>);
            };
        };
        // this switch logic will determine the required input needed and call our helper function.
        switch(size){
            case 8:
            case 12:
            case 16:
                requiredNum = 5;
                finalInputConstructor(requiredNum);
                break;
            case 20:
            case 24:
                requiredNum = 10;
                finalInputConstructor(requiredNum);
                break;
            default:
                throw new Error("something went wrong with the state of size.");
        };
        return finalInput;
    };

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
            {requiredWord(size)}
        </div>
        <br/>
        </>
    );
}