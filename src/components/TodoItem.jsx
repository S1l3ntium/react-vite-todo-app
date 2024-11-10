import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo, editTodo } from '../features/todoSlice.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faEdit, faSave, faCheck, faSquare } from "@fortawesome/free-solid-svg-icons";
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
            {/* Кнопка для переключения состояния выполнения */}
            <button
                className="status"
                title={todo.completed ? 'Не выполнено' : 'Выполнено'}
                onClick={() => dispatch(toggleTodo(todo.id))}
            >
                {todo.completed ? (
                    <><FontAwesomeIcon icon={faCheck} /></>
                ) : (
                    <><FontAwesomeIcon icon={faSquare} /></>
                )}
            </button>
            {isEditing && !todo.completed ? (
                // Если в режиме редактирования и задача не завершена, показываем input
                <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
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
            <div className="buttons">
                {/* Кнопка для редактирования или сохранения */}
                {!todo.completed && (
                    <button
                        className={isEditing ? 'save' : 'edit'}
                        title={isEditing ? 'Сохранить' : 'Редактировать'}
                        onClick={() => {
                            if (isEditing) {
                                handleSave();
                            } else {
                                setIsEditing(true);
                            }
                        }}
                    >
                        {isEditing ? (
                            <><FontAwesomeIcon icon={faSave} /></>
                        ) : (
                            <><FontAwesomeIcon icon={faEdit} /></>
                        )}
                    </button>
                )}

                {/* Кнопка для удаления */}
                <button className="delete" onClick={() => dispatch(removeTodo(todo.id))} title="Удалить">
                    <FontAwesomeIcon icon={faDeleteLeft} />
                </button>
            </div>
        </li>
    );
}

export default TodoItem;
