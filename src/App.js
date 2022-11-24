import { useState, useEffect } from "react";
import Form from "./components/Form";
import "./App.css";
import ToDoList from "./components/ToDoList";
import Footer from "./components/Footer";

function App() {
	const [todos, setTodos] = useState([
		{
			completed: true,
			text: "Learn JavaScript",
			id: 1
		},
		{
			completed: false,
			text: "Learn React",
			id: 2
		},
		{
			completed: false,
			text: "Have a life!",
			id: 3
		}
	]);
	const [status, setStatus] = useState("");
	const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, [])



	useEffect(() => {
		const filterHandler = () => {
      
			switch (status) {
				case "completed":
					setFilteredTodos(todos.filter((todo) => todo.completed === true));
					break;
				case "active":
					setFilteredTodos(todos.filter((todo) => todo.completed === false));
					break;
				default:
					setFilteredTodos(todos);
					break;
			}
		};
		filterHandler();
    saveLocalTodos();
	}, [todos, status]);


    // Local Storage
    const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  
    const getLocalTodos = () => {
      if (localStorage.getItem("todos") === null) {
        localStorage.setItem("todos", JSON.stringify([]))
      } else {
        setTodos(JSON.parse(localStorage.getItem("todos")))
      }
    }


	return (
		<div className="todoapp">
			<header className="header">
				<h1>todos</h1>
				<Form todos={todos} setTodos={setTodos} />
			</header>
			<div className="main">
				<ul className="todo-list">
					{filteredTodos.map((todo) => {
						return (
							<ToDoList
								status={status}
								key={todo.id}
								todo={todo}
								text={todo.text}
								todos={todos}
								setTodos={setTodos}
							/>
						);
					})}
				</ul>
			</div>
			<div className="footer">
				<Footer
					status={status}
					setStatus={setStatus}
					todos={todos}
					setTodos={setTodos}
				/>
			</div>
		</div>
	);
}

export default App;