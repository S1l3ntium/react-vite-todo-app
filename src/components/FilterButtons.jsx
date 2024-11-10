import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../features/todoSlice.js';

function FilterButtons() {
    const dispatch = useDispatch();
    const filter = useSelector(state => state.todos.filter);
    const todos = useSelector(state => state.todos.todos) || [];

    // Функции для подсчета количества задач по фильтрам
    const getFilteredTodosCount = (filter) => {
        if (!todos || todos.length === 0) return 0;
        switch (filter) {
            case 'completed':
                return todos.filter(todo => todo.completed).length;
            case 'incomplete':
                return todos.filter(todo => !todo.completed).length;
            default:
                return todos.length;
        }
    };

    return (
        <div className="buttons-filter">
            <button
                onClick={() => dispatch(setFilter('all'))}
                className={filter === 'all' ? 'active' : ''}
                disabled={filter === 'all'}
            >
                Все | {getFilteredTodosCount('all')}
            </button>
            <button
                className={filter === 'completed' ? 'active' : 'completed'}
                onClick={() => dispatch(setFilter('completed'))}
                disabled={filter === 'completed'}
            >
                Завершенные | {getFilteredTodosCount('completed')}
            </button>
            <button
                className={filter === 'incomplete' ? 'active' : 'incomplete'}
                onClick={() => dispatch(setFilter('incomplete'))}
                disabled={filter === 'incomplete'}
            >
                Незавершенные | {getFilteredTodosCount('incomplete')}
            </button>
        </div>
    );
}

export default FilterButtons;
