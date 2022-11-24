import { useState } from "react";

function Form({ todos, setTodos }) {

	const [inputText, setInputText] = useState("");

	const onChangeForm = (e) => setInputText(e.target.value);


	const onSubmitForm = (e) => {
		e.preventDefault();

		if (inputText === "") {
			alert("Please add a ToDo");
			return false;
		}
		setTodos([
			...todos,
			{ text: inputText, completed: false, id: Math.random()*1000 }
		]);
		
		setInputText("");
	};


	return (
		<div className="header">
			<form onSubmit={onSubmitForm}>
				<input
                    value={inputText}
					className="new-todo"
					placeholder="What needs to be done?"
					autoFocus
					onChange={onChangeForm}
				></input>
			</form>
		</div>
	);
}

export default Form;