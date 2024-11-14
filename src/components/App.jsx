import React from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import FilterButtons from './FilterButtons';
import { Provider } from 'react-redux';
import store from '../store/store';
import '../styles/App.scss';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <h1>To-Do List</h1>
                <TodoForm />
                <FilterButtons />
                <TodoList />
            </div>
        </Provider>
    );
}

export default App;
