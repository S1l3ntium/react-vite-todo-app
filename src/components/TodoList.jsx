import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import '../styles/TodoList.scss';

function TodoList() {
    const todos = useSelector(state => state.todos.todos);
    const filter = useSelector(state => state.todos.filter);

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'incomplete') return !todo.completed;
        return true;
    });

    return (
        <ul>
            {filteredTodos.map(todo => (

                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
}

export default TodoList;
