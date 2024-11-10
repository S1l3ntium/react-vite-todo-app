import React from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import FilterButtons from './FilterButtons';
import '../styles/App.scss';

function App() {
    return (
        <div className="App">
            <h1>To-Do List</h1>
            <TodoForm />
            <FilterButtons />
            <TodoList />
        </div>
    );
}

export default App;
