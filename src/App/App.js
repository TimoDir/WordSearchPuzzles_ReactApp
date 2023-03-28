/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useReactToPrint} from 'react-to-print';
import { WordsForm } from '../features/wordsForm/WordsForm';
import { SearchWordPuzzle } from '../features/searchWordPuzzle/SearchWordPuzzle';
import { action } from './store';
import SearchWordLogo from '../img/SearchWordLogo.png';


function App(props) {

  // State querry & handeling
  ////////////////////////////////////////
  const selectTitle = useSelector(state => state.title);
  const selectSize = useSelector(state => state.size);
  const selectWordInfo = useSelector(state => state.searchWord.wordInfo)
  const selectSearchWord = useSelector(state => state.searchWord);
  const dispatch = useDispatch();

  const handleChange = event => {
    // parseInt will transform the string we recieved by an integer value
    dispatch(action.setSize(parseInt(event.target.value)));
  };

  const handleSubmit = (event) => {
    // the prevent Default will prevent all my page to refresh when submit the form (just the form will refreshe)
    event.preventDefault();
    dispatch(action.setTitle(event.target.title.value))
    const wordList = []
    event.target.word.forEach(word => {
      if(word.value){
          wordList.push(word.value.normalize('NFD').replace(/[^a-zA-Z]/g, '').replace(/[\u0300-\u036f]/g, '').toUpperCase())
        }
    });
    
    dispatch(action.createWordInfo(wordList, selectSize));
  };

  const handlePuzzleGenerate = () =>{
    dispatch(action.puzzleGenerate(selectWordInfo, selectSize));
  };

  React.useEffect(()=>{
    handlePuzzleGenerate();
  }, [selectWordInfo]);

  // Handeling the interactivity
  ////////////////////////////////////////
  const [display, setDisplay] = React.useState('none')
  const displayInstruction = () =>{
    if(display === "none"){
      return setDisplay("block");
    } else return setDisplay("none");
  };

  // Handeling the printing component SearchWordPuzzle with React-to-Print
  ////////////////////////////////////////

  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="App">
      {/* Header + instruction */}
      <header>
        <div className='headerContent'>
          <img src={SearchWordLogo} alt='SearchWords Generator'/>
          <button onClick={displayInstruction}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 96 960 960">
              <path d="M477.028 810Q493 810 504 798.972q11-11.028 11-27T503.972 745q-11.028-11-27-11T450 745.028q-11 11.028-11 27T450.028 799q11.028 11 27 11ZM444 662h57q0-31 10-50.5t34.721-44.221Q579 534 592 508.5t13-53.5q0-53-34-84t-91.523-31q-51.866 0-88.171 24.5Q355 389 338 432l53 22q14-28 36.2-42.5Q449.4 397 479 397q32 0 50.5 16t18.5 44.098Q548 477 537 495.5T500 539q-37 35-46.5 60t-9.5 63ZM180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm0-600v600-600Z"/>
            </svg>
          </button>
        </div>
        <div className='HeaderLine'></div>
      </header>
      <div className='Formular'>
        <div className='Instruction' style={{display : display}} >
          <button onClick={displayInstruction}>X</button>
          <h4>Instructions :</h4>
          <ul>
            <li>All the necessary information is indicated by an *</li>
            <li>We recommend that you use a 16X16 grid</li>
            <li>When you add words, special characters and spaces will be removed upon puzzle generation</li>
            <li>When you complete the form, click Generate to create your puzzle</li>
            <li>You can print your search word puzzle by clicking Print</li>
          </ul>
          <p>Happy Puzzling!</p>
        </div>

        {/* Customization formular */}
        <form onSubmit={handleSubmit}>

          <label for="title"><h3>1- Title</h3></label>
          <input type="text" id="title" />
          
          <label for="size"><h3>2- Size</h3></label>
          <p>Size : {selectSize}*{selectSize}</p>
          <input className='Range' type="range"  id="size" min="8" max="24" step="4" list='length' onChange={handleChange}/>
          <datalist id='length'>
            <option value="8" label='8'></option>
            <option value="16" label='16'></option>
            <option value="24" label='24'></option>
          </datalist>

          <WordsForm size={selectSize} />
        
          <br/>
          <input className='Button' type="submit" value="Generate" />
          <p>
            If you want a different layout, click on the Generate button again.
          </p>
        </form>
      </div>
      
      {/* Puzzle */}
      <SearchWordPuzzle ref={componentRef} searchWord={selectSearchWord} title={selectTitle} size={selectSize}/>
      {selectSearchWord.wordInfo.length > 1 &&
      (<div className='Formular'>
        <button className='Button' onClick={handlePrint}>Print</button>
      </div>)
      }
      
    </div>
  );
}

export default App;
