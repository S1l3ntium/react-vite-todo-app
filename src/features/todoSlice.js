import { createSlice } from '@reduxjs/toolkit';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorageUtils';

// Инициализация начального состояния
const initialState = {
    todos: loadFromLocalStorage(), // Загружаем данные из localStorage при запуске
    filter: 'all'
};

// Функция для генерации уникального id (можно заменить на более сложную, если потребуется)
const generateId = () => Date.now() + '_' + Math.random().toString(36).substr(2, 9);

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            // Создаем новый объект todo
            const newTodo = {
                id: generateId(),
                text: action.payload,
                completed: false
            };
            state.todos.push(newTodo); // Добавляем новый todo в массив
            saveToLocalStorage(state.todos);
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
                saveToLocalStorage(state.todos); // Сохраняем изменения
            }
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload); // Удаляем по id
            saveToLocalStorage(state.todos);
        },
        editTodo: (state, action) => {
            const { id, text } = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.text = text;
                saveToLocalStorage(state.todos); // Сохраняем изменения
            }
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        }
    }
});

export const { addTodo, toggleTodo, removeTodo, editTodo, setFilter } = todoSlice.actions;
export default todoSlice.reducer;
