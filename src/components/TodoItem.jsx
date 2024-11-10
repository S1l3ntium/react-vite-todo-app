import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo, editTodo } from '../features/todoSlice.js';
import '../styles/TodoItem.scss';

function TodoItem({ todo }) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(todo.text);

    // Функция для сохранения изменений
    const handleSave = () => {
        if (!todo.completed) { // Проверка, чтобы не сохранять изменения для завершённых задач
            dispatch(editTodo({ id: todo.id, text: editedText }));
            setIsEditing(false); // Выходим из режима редактирования
        }
    };

    return (
        <li className="todo-item">
            {isEditing && !todo.completed ? (
                // Если в режиме редактирования и задача не завершена, показываем input
                <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onBlur={handleSave} // Сохраняем при потере фокуса
                    autoFocus // Автоматически фокусируем на input при редактировании
                />
            ) : (
                // Если не в режиме редактирования или задача завершена, показываем текст задачи
                <span
                    className={todo.completed ? 'completed' : ''}
                    onClick={() => dispatch(toggleTodo(todo.id))}
                >
                    {todo.text}
                </span>
            )}
            <div>
                <button onClick={() => dispatch(toggleTodo(todo.id))}>
                    {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                    onClick={() => {
                        if (!todo.completed) { // Проверка, можно ли редактировать
                            if (isEditing) {
                                handleSave();
                            } else {
                                setIsEditing(true);
                            }
                        }
                    }}
                    disabled={todo.completed} // Отключаем кнопку, если задача завершена
                >
                    {isEditing ? 'Save' : 'Edit'}
                </button>
                <button onClick={() => dispatch(removeTodo(todo.id))}>
                    Delete
                </button>
            </div>
        </li>
    );
}

export default TodoItem;
