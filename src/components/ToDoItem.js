import React from "react";

class ToDoItem extends React.Component {
    render() {
        const completedStyle = {
            fontStyle: "italic",
            color: "#cdcdcd",
            textDecoration: "line-through"
        }

        return (
            <div className="todo-item">
                <input data-id={this.props.task.id} type="checkbox" checked={this.props.task.completed} onChange={this.props.handleChange}/>
                <p style={this.props.task.completed ? completedStyle : null}>{this.props.task.text}</p>
                {this.props.task.completed ? <button style={{marginLeft: "auto"}}data-id={this.props.task.id} onClick={this.props.deleteTask}>Delete</button> : null}
            </div>
        );
    }
}

export default ToDoItem;