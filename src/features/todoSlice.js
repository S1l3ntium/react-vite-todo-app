import { createSlice } from '@reduxjs/toolkit';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorageUtils';

const initialState = {
    todos: loadFromLocalStorage(),
    filter: 'all'
};

const generateId = () => Date.now() + '_' + Math.random().toString(36).substr(2, 9);

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: generateId(),
                text: action.payload,
                completed: false
            };
            state.todos.push(newTodo);
            saveToLocalStorage(state.todos);
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
                saveToLocalStorage(state.todos);
            }
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
            saveToLocalStorage(state.todos);
        },
        editTodo: (state, action) => {
            const { id, text } = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.text = text;
                saveToLocalStorage(state.todos);
            }
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        }
    }
});

export const { addTodo, toggleTodo, removeTodo, editTodo, setFilter } = todoSlice.actions;
export default todoSlice.reducer;
