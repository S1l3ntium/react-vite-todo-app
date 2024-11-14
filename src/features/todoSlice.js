import { createSlice } from '@reduxjs/toolkit';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorageUtils';
import formatDate from "../utils/formatDate";

const initialState = {
    todos: loadFromLocalStorage(),
    filter: 'all',
    deletedTodos: []
};

const generateId = () => Date.now() + '_' + Math.random().toString(36).substr(2, 9);

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const { text, description, startDate, endDate } = action.payload;
            console.log('Adding todo:', { text, description, startDate, endDate });
            const newTodo = {
                id: generateId(),
                text,
                description,
                startDate: formatDate(startDate),
                endDate: formatDate(endDate),
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
            const { id, text, description, startDate, endDate } = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.text = text;
                todo.description = description;
                todo.startDate = startDate;
                todo.endDate = endDate;
                saveToLocalStorage(state.todos); // Сохраняем изменения в LocalStorage
            }
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        }
    }
});

export const { addTodo, toggleTodo, removeTodo, editTodo, setFilter } = todoSlice.actions;
export default todoSlice.reducer;
