const STORAGE_KEY = 'todos';

// Сохранение данных в localStorage
export const saveToLocalStorage = (todos) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

// Загрузка данных из localStorage
export const loadFromLocalStorage = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};
