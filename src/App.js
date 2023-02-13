//import logo from './logo.svg'; //used by the default react sample webpage
import {useState, useReducer} from 'react';
import './App.css';

let madlib = "Hello, ";
		//"It was ___(FOOD)___ day at school, and ___(NAME)___ was super ___(ADJECTIVE)___ for lunch. But when she went outside to eat, a ___(NOUN)___ stole her ___(FOOD)___! ___(NAME)___ chased the ___(NOUN)___ all over school. She ___(VERB1)___, ___(VERB2)___, and ___(VERB3)___ through the playground. Then she tripped on her ___(NOUN)___ and the ___(NOUN)___ escaped! Luckily, ___(NAME)___’s friends were willing to share their ___(FOOD)___ with her.";

const formReducer = (state, event) => {
	return {
		...state,
		[event.name]: event.value
	}
}

function App() {

	const [formData, setFormData] = useReducer(formReducer, {});

	//simulate the delay from fetaching/submitting to an API
	const [submitting, setSubmitting] = useState(false);

	//prevent the default reload functionality of submit button
	const handleSubmit = event => {
		event.preventDefault();

		setSubmitting(true);
		//simulate 3 seconds delay from fetching from API
		setTimeout(() => {
			setSubmitting(false);
		}, 3000);

		/*
		//test this function to see if submit button works
		alert("You have submitted the Mad Lib!");
		*/
	}

	const handleChange = event => {
		setFormData({
			name: event.target.name,
			value: event.target.value,
		});
	}

	return (
			<div className="everything">
			<h1>Mad Libs</h1>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<label>
						<p>First Name:</p>
						<input name="firstname" onChange={handleChange}/>
					</label>
				</fieldset>
				<button type="submit">Create Mad Lib!</button>
			</form>

			{/*conditionally display message when submitting*/}
			<p>{submitting && 
				<div> Submitting Mad Lib...
				<p>
				You submitted:
				<ul>
					{Object.entries(formData).map(([name, value]) => (
						<li key={name}><strong>{name}</strong>:{value.toString()}</li>
					))}
				</ul>
				</p>
				</div>}</p>
			</div>
	);
	/*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
	*/
}

export default App;
