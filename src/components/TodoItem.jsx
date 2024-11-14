import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo, editTodo } from '../features/todoSlice.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faEdit, faSave, faCheck, faSquare } from "@fortawesome/free-solid-svg-icons";
import '../styles/TodoItem.scss';
import '../utils/formatDate'
import formatDate from "../utils/formatDate.js";

function TodoItem({ todo }) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(todo.text);
    const [editedDescription, setEditedDescription] = useState(todo.description || '');
    const [editedStartDate, setEditedStartDate] = useState(todo.startDate || '');
    const [editedEndDate, setEditedEndDate] = useState(todo.endDate || '');


    // Функция для сохранения изменений
    const handleSave = () => {
        if (!todo.completed) {
            const updatedTodo = {
                id: todo.id,
                text: editedText,
                description: editedDescription,
                startDate: editedStartDate,
                endDate: editedEndDate
            };
            dispatch(editTodo(updatedTodo)); // Диспатчим обновленные данные
            setIsEditing(false); // Выход из режима редактирования
        }
    };


    return (
        <li className="todo-item">
            {/* Кнопка для переключения состояния выполнения */}
            <button
                className="status"
                title={todo.completed ? 'Не выполнено' : 'Выполнено'}
                onClick={() => dispatch(toggleTodo(todo.id))}
            >
                {todo.completed ? (
                    <FontAwesomeIcon icon={faCheck} />
                ) : (
                    <FontAwesomeIcon icon={faSquare} />
                )}
            </button>

            {isEditing && !todo.completed ? (
                // В режиме редактирования показываем поля для текста, описания и дат
                <div>
                    <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        autoFocus
                    />
                    <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        placeholder="Описание задачи"
                    />
                    <input
                        type="date"
                        value={editedStartDate}
                        onChange={(e) => setEditedStartDate(e.target.value)}
                    />
                    <input
                        type="date"
                        value={editedEndDate}
                        onChange={(e) => setEditedEndDate(e.target.value)}
                    />
                </div>
            ) : (
                // В обычном режиме отображаем текст, описание и даты
                <div>
                <span
                    className={todo.completed ? 'completed' : ''}
                    onClick={() => dispatch(toggleTodo(todo.id))}
                >
                    {todo.text}
                </span>
                    {todo.description && <p>{todo.description}</p>}
                    {todo.startDate && <p>Начало: {formatDate(todo.startDate)}</p>}
                    {todo.endDate && <p>Конец: {formatDate(todo.endDate)}</p>}
                </div>
            )}

            <div className="buttons">
                {/* Кнопка для редактирования или сохранения */}
                {!todo.completed && (
                    <button
                        className={isEditing ? 'save' : 'edit'}
                        title={isEditing ? 'Сохранить' : 'Редактировать'}
                        onClick={() => {
                            if (isEditing) {
                                handleSave(); // Сохраняем изменения
                            } else {
                                setIsEditing(true); // Включаем режим редактирования
                            }
                        }}
                    >
                        {isEditing ? (
                            <FontAwesomeIcon icon={faSave} />
                        ) : (
                            <FontAwesomeIcon icon={faEdit} />
                        )}
                    </button>
                )}

                {/* Кнопка для удаления */}
                <button className="delete" onClick={() => {
                    if (window.confirm('Вы действительно хотите удалить задачу?')) {
                        dispatch(removeTodo(todo.id));
                    }
                }} title="Удалить">
                    <FontAwesomeIcon icon={faDeleteLeft} />
                </button>
            </div>
        </li>
    );

}

export default TodoItem;
