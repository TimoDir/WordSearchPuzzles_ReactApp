import './App.css';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useReactToPrint} from 'react-to-print';
import { WordsForm } from '../features/wordsForm/WordsForm';
import { SearchWordPuzzle } from '../features/searchWordPuzzle/SearchWordPuzzle';
import { action } from './store';
import SearchWordLogo from '../img/SearchWordLogo.png'


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
        <img src={SearchWordLogo} alt='SearchWords Generator'/>
        <div className='HeaderLine'></div>
      </header>
      <div className='Formular'>
        <div className='Instruction'>
          <h4>Instructions :</h4>
          <ul>
            <li>All required information is noted by an <span>*</span></li>
            <li>Our recommended size is a 16 by 16 grid.</li>
            <li>When you add words, spécial character and space will be remove after generation of the puzzle.</li>
            <li>The length of your word depend of the size of your puzzle.</li>
            <li>When you complet the formular clic the generate button to create your puzzle.</li>
            <li>You can regenerate the puzzle by clicking to generate button again.</li>
            <li>You can Print your search word puzzle by clicking the print button.</li>
          </ul>
          <p>Happy Puzzling!</p>
        </div>

        {/* Customization formular */}
        <form onSubmit={handleSubmit}>

          <label for="title"><h3>1- Title</h3></label>
          <input type="text" id="title" />
          
          <label for="size"><h3>2- Size</h3></label>
          <p>Size : {selectSize}*{selectSize}</p>
          <input type="range"  id="size" min="8" max="24" step="4" list='length' onChange={handleChange}/>
          <datalist id='length'>
            <option value="8" label='8'></option>
            <option value="16" label='16'></option>
            <option value="24" label='24'></option>
          </datalist>

          <WordsForm size={selectSize} />
        
          <br/>
          <input type="submit" value="Generate" />
          <p>
            If you want a different layout, click on the Generate button again.
          </p>
        </form>
      </div>
      
      {/* Puzzle */}
      <SearchWordPuzzle ref={componentRef} searchWord={selectSearchWord} title={selectTitle} size={selectSize}/>
      {selectSearchWord.wordInfo.length > 1 &&
      <button className='PrintButton' onClick={handlePrint}>Print</button>
      }
      
    </div>
  );
}

export default App;
