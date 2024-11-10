import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todoSlice.js';
import '../styles/TodoForm.scss';

function TodoForm() {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            dispatch(addTodo(text));
            setText('');
        }
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Напишите текст задачи..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button type="submit">Создать задачу</button>
        </form>
    );
}

export default TodoForm;
