import React from "react";
import ToDoItem from "./ToDoItem";
import toDoData from "./../todosData";

class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: toDoData,
            input: ""
        };
    }

    componentDidMount() {
        // Load To Do List from localStorage
        const todos = JSON.parse(localStorage.getItem("todos"));
        this.setState({
            todos: todos
        });
    }

    componentDidUpdate() {
        // Saves To Do List from localStorage 
        localStorage.setItem("todos", JSON.stringify(this.state.todos));
        console.log(localStorage.getItem("todos"));
    }

    render() {
        const todoItems = this.state.todos.map(item => <ToDoItem key={item.id} task={item} handleChange={this.handleChange} deleteTask={this.deleteTask}/>)
        return (
            <div className="todo-list">
                {todoItems}
                <div className="add-task">
                    <input type="text" placeholder="Add Task" onChange={this.handleInput} value={this.state.input}/>
                    <button style={{marginLeft: 10}}onClick={this.addTask}>Add</button>
                </div>
            </div>
        );
    }

    handleInput = (event) => {
        this.setState({
            input: event.target.value
        })
    }

    handleChange = (event) => {
        const id = parseInt(event.target.dataset.id);
        this.setState(state => {
            const todos = JSON.parse(JSON.stringify(state.todos));
            const indexArr = todos.map(obj => Object.values(obj)[0]);
            const index = indexArr.indexOf(id);
            todos[index].completed = !todos[index].completed;
            return {
                todos: todos
            };
        });
    }

    addTask = () => {
        // Do not add empty task
        if(!this.state.input) {
            return;
        }
        this.setState(state => {
            let todos = JSON.parse(JSON.stringify(state.todos));
            let id;
            if(todos.length === 0) {
                id = 1;
            } else {
                id = todos[todos.length - 1].id + 1;
            }
            todos.push({
                id: id,
                text: state.input,
                completed: false
            });
            console.log(todos);
            return {
                todos: todos,
                input: ""
            };
        });
    }

    deleteTask = (event) => {
        const id = parseInt(event.target.dataset.id);
        this.setState(state => {
            const todos = JSON.parse(JSON.stringify(state.todos));
            const indexArr = todos.map(obj => Object.values(obj)[0]);
            const index = indexArr.indexOf(id);
            todos.splice(index, 1);
            return {
                todos: todos
            };
        });
    }
}

export default MainContent;