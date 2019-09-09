import React from 'react'

const Todo = ({t, i, toggleDone}) => {

	const unfinished = {textDecoration: "line-through", color: 'red'}

	return (
		<li 
			key={i} 
			style={t.completed ? unfinished : null}
			onClick={() => toggleDone(t.id)}
		>
			{t.task}
		</li>
	)
}

class TodoList extends React.Component {
	constructor(){
		super()
		this.state = {
			input: '',
			todos: []
		}
	}

	handleInput = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	addTodo = event => {
		event.preventDefault()
		const { input, todos } = this.state;
		const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
		const todo = {id: id, task: input, completed: false };
		this.setState({
			todos: [...todos, todo],
			input: ''
		})
	}

	toggleDone = (id) => {
		const { todos } = this.state
		const newTodos = todos.map(t => {
			if (t.id === id) t.completed = !t.completed
			return t
		})
		this.setState({
			todos: newTodos
		})
	}

	removeCompleted = event => {
		event.preventDefault()
		const { todos } = this.state
		const notComplete = todos.filter(t => {
			return t.completed === false
		})
		this.setState({
			todos: notComplete
		})
	}

	render(){
		const { todos, input } = this.state
		return (
			<div>
				<h1>A Todo List!</h1>
				<ul>
					{todos.map((t, i) => {
						return <Todo t={t} i={i} toggleDone={this.toggleDone}/>
					})}
				</ul>
				<form>
					<input
						name="input"
						type="text"
						placeHolder="add todo"
						value={input}
						onChange={this.handleInput} 
					/><br /><br />
					<button onClick={this.addTodo}>Submit</button>
					<button onClick={this.removeCompleted}>Remove Completed</button>
				</form>
			</div>
		)
	}
}

export default TodoList;
