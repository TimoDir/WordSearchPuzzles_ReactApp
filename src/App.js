import './App.css';

function App() {

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Title : " + event.target.title.value)
    console.log("Size : " + event.target.size.value)
    console.log("Word list:")
    event.target.word.forEach(word => {
      if(word.value){
        console.log(word.value)
      }
    });
  }

  return (
    <div className="App">
      {/* Header + instruction */}
      <header>
        <h1>Search Words Generator</h1>
      </header>
      <h2>Instruction</h2>
      <p>Follow the differents steps to customize your search words puzzle. Some of the steps are optional and some are required to generate the puzzle. 
        <br/>When your done you can generate your puzzle, if your not please with the layout you can regenerate the puzzle 
        and when your satisfied print the result to enjoy a paper version of your puzzle!
        <br/><br/>
        Happy Puzzling!
      </p>

      {/* Customization formular */}
      <h2>customizator:</h2>
      <form onSubmit={handleSubmit}>

        <h3>1- Title (optional)</h3>
        <p>Enter the title you like your puzzle. It can be the theme of your puzzle (exemple: Disney movies)</p>
        <label for="title">Title</label>
        <br/><input type="text" id="title" />
        
        <h3>2- Size (optional)</h3>
        <p>If you like to change the size of the grid, by default we had a 16 by 16 grid.
          <br/>We recommande you to keep this by default, if you want to take a smaller size keep in mind that your words must be less that the minimal length of your grid.
        </p>
        <label for="size">Size : 8*8 - 16*16 - 24*24</label> {/* Probably add interactivity with the size like a state size */}
        <br/><input type="range"  id="size" min="8" max="24" step="4" list='length'/>
        <datalist id='length'>
          <option value="8" label='8'></option>
          <option value="16" label='16'></option>
          <option value="24" label='24'></option>
        </datalist>
        
        <h3>3- Words (required)</h3>
        <p>Choose the number of words you want to hide inside the puzzle and write them: 
          <br/> First select the number of words you want. Here is some recommandation:
          - For your puzzle size 16*16 we recommande beetween 10 - 30 words. {/*interactivity we will be add with state*/}
        </p>
        <label for="word">Words</label>
        <br/><input type="text" id="word" required/><input type="text" id="word" required/><input type="text" id="word" required/><input type="text" id="word" required/><input type="text" id="word" required/> - 5 words 
        <br/><input type="text" id="word" required/><input type="text" id="word" required/><input type="text" id="word" required/><input type="text" id="word" required/><input type="text" id="word" required/> - 10 words (required)
        <br/><input type="text" id="word" /><input type="text" id="word" /><input type="text" id="word" /><input type="text" id="word" /><input type="text" id="word" /> - 15 words
        <br/><input type="text" id="word" /><input type="text" id="word" /><input type="text" id="word" /><input type="text" id="word" /><input type="text" id="word" /> - 20 words
        <br/><input type="text" id="word" /><input type="text" id="word" /><input type="text" id="word" /><input type="text" id="word" /><input type="text" id="word" /> - 25 words
        <br/><input type="text" id="word" /><input type="text" id="word" /><input type="text" id="word" /><input type="text" id="word" /><input type="text" id="word" /> - 30 words
        <br/><br/>
        <p>Once your satisfied with your list of words you can generate you puzzle by pressing this button: <input type="submit" value="Generate" />
        </p>
      </form>
      
      {/* Puzzle */}
      <div className='Puzzle'>

      </div>
    </div>
  );
}

export default App;
