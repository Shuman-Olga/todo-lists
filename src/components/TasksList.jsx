import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import ModalAddTask from './ModalAddTask';
import { activeClassName } from '../js/activeClassName';
import TasksDataService from '../services/TaskService';
import Messages from './Messages';
/**
 * Компонент TaskList
 * @returns список задач
 */
function TasksLists() {
  const [tasks, setTasks] = useState([]);
  const [current, setCurrent] = useState([]);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [successful, setSuccessful] = useState(true);

  useEffect(() => {
    getTasks();
  }, []);
  /**
   * Получаем список задач
   */
  const getTasks = async () => {
    try {
      const allTasks = await TasksDataService.getAll();
      let items = [];
      allTasks.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setTasks(items);
    } catch (err) {
      console.log(err);
      setSuccessful(false);
      setMessage(err || 'Упс, что-то пошло не так');
    }
  };
  /**
   * Удаление задачи
   * @param {*} id - id task
   */
  const deleteTask = async (id) => {
    console.log(id);
    try {
      await TasksDataService.delete(id);
      getTasks();
      setMessage('Задача удалена');
    } catch (err) {
      console.log(err);
      setSuccessful(false);
      setMessage(err || 'Нет такой задачи');
    }
  };
  /**
   * Изменить задачу
   * @param {*} id id task
   */
  const editTask = async (id) => {
    try {
      const currentTask = await TasksDataService.get(id);
      setCurrent(Object.assign(currentTask.data(), { id: id }));
      setShow(true);
    } catch (err) {
      console.log(err);
      setSuccessful(false);
      setMessage(err || 'Нет такой задачи');
    }
  };
  /**
   *
   * Закрытие и открытие модального окна
   */
  const handleShow = () => setShow(true);
  const handleClose = () => {
    getTasks();
    setShow(false);
    setCurrent([]);
    setMessage('');
  };
  /**
   * Обработчик изменения  checkbox
   * @param {*} e событие
   * @param {*} task - task
   */
  const onChangeTask = async (e, task) => {
    const data = {
      status: e.target.checked,
    };
    try {
      await TasksDataService.update(task.id, data);
      getTasks();
    } catch (err) {
      console.log(err);
      setSuccessful(false);
      setMessage(err || 'Нет такой задачи');
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="btn-add-message">
          <div className="button primary new" onClick={handleShow}>
            Новая задача
          </div>
          <Messages message={message} handleClose={handleClose} successful={successful} />
        </div>
        <ModalAddTask current={current} show={show} handleClose={handleClose} />

        <div className="tasklist-wrap">
          <h3>Список задач</h3>
          {tasks &&
            tasks.map((task, index) => (
              <div
                key={index}
                id={index}
                className={'task-block' + activeClassName(task.status, task.date)}
              >
                <div className="block-check">
                  <input
                    type="checkbox"
                    id={`check${index}`}
                    checked={task.status}
                    onChange={(e) => onChangeTask(e, task)}
                    name="status"
                  />
                  <label className="checkbox-label" htmlFor={`check${index}`}>
                    <span></span>
                  </label>
                </div>
                <h4>{task.title}</h4>
                <div className="block-desc">{task.description}</div>
                <div>{dayjs(task.date).format('DD.MM.YYYY')}</div>
                <div>
                  <div className="button inlineIcon edit" onClick={() => editTask(task.id)}></div>
                  <div
                    className="button inlineIcon delete"
                    onClick={() => deleteTask(task.id)}
                  ></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
export default TasksLists;
