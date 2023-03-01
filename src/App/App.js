import './App.css';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { WordsForm } from '../features/wordsForm/WordsForm';
import { SearchWordPuzzle } from '../features/searchWordPuzzle/SearchWordPuzzle';
import { action } from './store';
import SearchWordLogo from '../img/SearchWordLogo.png'


function App(props) {
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


  return (
    <div className="App">
      {/* Header + instruction */}
      <header>
        <img src={SearchWordLogo} alt='SearchWords Generator'/>
      </header>
      <h2>Instruction</h2>
      <p>Follow the various steps to customize your word search puzzle. Some of the steps are optional while others are required in order to generate the puzzle. 
        <br/>When you're finished, you can generate your puzzle. If you're not satisfied with the layout, 
        you can regenerate the puzzle and once you're happy with it, you can print the result and enjoy a paper version of your puzzle!
        <br/><br/>
        Happy Puzzling!
      </p>

      {/* Customization formular */}
      <h2>customizator:</h2>
      <form onSubmit={handleSubmit}>

        <h3>1- Title (optional)</h3>
        <p>Enter the title you would like for your puzzle. It can be a theme such as for example, Disney movies, Vegetables...</p>
        <label for="title">Title</label>
        <br/><input type="text" id="title" />
        
        <h3>2- Size (optional)</h3>
        <p>If you like to change the size of the grid, by default we had a 16 by 16 grid.
          <br/>We recommend that you keep the default size, but if you decide to go smaller, 
          please note that your words must be shorter than the minimum length of your grid.
        </p>
        <label for="size">Size : {selectSize}*{selectSize} </label>
        <br/><input type="range"  id="size" min="8" max="24" step="4" list='length' onChange={handleChange}/>
        <datalist id='length'>
          <option value="8" label='8'></option>
          <option value="16" label='16'></option>
          <option value="24" label='24'></option>
        </datalist>
        
        <WordsForm size={selectSize} />
        
        <br/>
        <p>When you're satisfied with your list of words, you can generate your puzzle by pressing this button: <input type="submit" value="Generate" />
        <br/>If you want a different layout, click on the Generate button again.
        </p>
      </form>
      
      {/* Puzzle */}
      <SearchWordPuzzle searchWord={selectSearchWord} />
    </div>
  );
}

export default App;
