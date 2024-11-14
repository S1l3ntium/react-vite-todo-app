import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todoSlice.js';
import '../styles/TodoForm.scss';

function TodoForm() {
    const [text, setText] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            dispatch(addTodo({
                text,
                description,
                startDate,
                endDate
            }));
            setText('');
            setDescription('');
            setStartDate('');
            setEndDate('');
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
            <textarea
                placeholder="Описание задачи..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            <button type="submit">Создать задачу</button>
        </form>
    );
}

export default TodoForm;
