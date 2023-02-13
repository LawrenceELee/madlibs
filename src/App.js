//import logo from './logo.svg'; //used by the default react sample webpage
import {useState, useReducer} from 'react';
import './App.css';

let madlib = "It was ___(FOOD)___ day at school, and ___(NAME)___ was super ___(ADJECTIVE)___ for lunch. But when she went outside to eat, a ___(NOUN)___ stole her ___(FOOD)___! ___(NAME)___ chased the ___(NOUN)___ all over school. She ___(VERB1)___, ___(VERB2)___, and ___(VERB3)___ through the playground. Then she tripped on her ___(NOUN)___ and the ___(NOUN)___ escaped! Luckily, ___(NAME)___’s friends were willing to share their ___(FOOD)___ with her.";

const formReducer = (state, event) => {
	return {
		...state,
		[event.name]: event.value
	}
}

const formToTemplateVar = {
	firstname: 'NAME',
	noun: 'NOUN',
	verb1: 'VERB1',
	verb2: 'VERB2',
	verb3: 'VERB3',
	adjective: 'ADJECTIVE',
	food: 'FOOD',
}

function replaceMadLibsElements(formHash) {
	let temp;
	for (const x in formHash) {
		temp = madlib.replaceAll(formToTemplateVar[x], formHash[x]);
		formToTemplateVar[x] = formHash[x];
		madlib = temp;
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
		replaceMadLibsElements(formData);
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
			<div className="madlibs">
      <header className="header">
				<h1>Mad Libs</h1>
			</header>

			<strong>
				{"Fill out this Mad Lib: "}
			</strong>

			<p>
				{madlib}
			</p>

			<form onSubmit={handleSubmit}>
				<fieldset>
					<label>
						<h3>Names:</h3>
						<p>First name: <input name="firstname" onChange={handleChange}/></p>
					</label>
				</fieldset>

				<fieldset>
					<label>
						<h3>Nouns:</h3>
						<p>Noun: <input name="noun" onChange={handleChange}/></p>
					</label>
				</fieldset>

				<fieldset>
					<label>
						<h3>Verbs:</h3>
						<p>Verb 1: <input name="verb1" onChange={handleChange}/></p>
						<p>Verb 2: <input name="verb2" onChange={handleChange}/></p>
						<p>Verb 3: <input name="verb3" onChange={handleChange}/></p>
					</label>
				</fieldset>

				<fieldset>
					<label>
						<h3>Adjectives:</h3>
						<p>Adjective: <input name="adjective" onChange={handleChange}/></p>
					</label>
				</fieldset>

				<fieldset>
					<label>
						<h3>Foods:</h3>
						<p>Food: <input name="food" onChange={handleChange}/></p>
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
