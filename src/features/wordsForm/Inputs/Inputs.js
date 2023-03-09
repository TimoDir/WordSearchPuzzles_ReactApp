// Thes tow component who display the input 5 by 5 for screen wider than 750px and 3 by 3 for screen smaller.

export const InputComputerScreen = ({size}) =>{
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
    return <div className="ComputerScreen">{finalInput}</div>;
};

export const InputPhoneScreen = ({size}) =>{
    // We manage the required input and the unrequired one.
    let requiredNum;
    const finalInput = [];

    // helper function who push the input inside our result array by getting the number of required input and the size of the puzzle.
    const finalInputConstructor = (requiredNum) =>{
        let unRequiredNum = size - (requiredNum);
        for (let i = 1; i <= requiredNum; i++) {
            if((i-1)%3 === 0 ){
                finalInput.push(<br/>)
            };
            finalInput.push(<input key={'Req'+i} type="text" id="word" minLength={3} maxLength={size-1} required/>);
        };
        finalInput.push('*')
        for (let i = 1; i <= unRequiredNum; i++) {
            if(i === 1 || (i-1)%3 === 0){
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
    return <div className="PhoneScreen">{finalInput}</div>;
};