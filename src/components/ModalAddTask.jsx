import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import TasksDataService from '../services/TaskService';
import Messages from './Messages';
import { UploadFile } from '../services/uploadFile';
/**
 * Модальное окно
 * @param {*} props
 *  current - выбранная задача
 *  handleClose -закрытие окна
 * @returns
 */
function ModalAddTask(props) {
  /**
   * инициализция обьекта
   */
  const initialTaskState = {
    title: '',
    description: '',
    date: dayjs().format('YYYY-MM-DD'),
    status: false,
    file: '',
  };

  const [message, setMessage] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [task, setTask] = useState(initialTaskState);
  const [file, setFile] = useState('');

  useEffect(() => {
    if (props.current.id) {
      setTask(props.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.current]);

  /**
   * Закрытие модального окна
   */
  const handleClose = () => {
    props.handleClose();
    setMessage('');
    setSuccessful(false);
    setTask(initialTaskState);
  };
  /**
   * Обработчик изменения формы
   * @param {*} e событие
   */
  const onChangeTask = (e) => {
    const target = e.target;
    if (target.type === 'file') {
      setFile(e.target.files[0]);
    }
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setTask({ ...task, [name]: value });
  };
  /**
   * Обработчик отправки формы
   * @param {*} e событие
   */
  const handleSubmit = async (e) => {
    setMessage('');
    setSuccessful(false);
    e.preventDefault();

    try {
      if (file) {
        UploadFile(file);
      }
      if (task.id) {
        await TasksDataService.update(task.id, task);
        setSuccessful(true);
        setMessage('Обнавлено');
      } else {
        await TasksDataService.create(task);
        setSuccessful(true);
        setMessage('Задача создана');
      }
    } catch (err) {
      setSuccessful(false);
      setMessage(err || 'Упс, что-то пошло не так');
    }
    setTimeout(() => {
      handleClose();
    }, 1000);
  };

  return !props.show ? null : (
    <div className="modal">
      <div className="modal-content">
        {!successful && (
          <div className="modal-body">
            <form>
              <div className="form-header">
                <h4 className="form-title">Новая задача</h4>
                <div className="btn-close" onClick={handleClose}></div>
              </div>
              <div className="form-body">
                <div className="block-status">
                  <div>
                    <label className="form-label ">
                      <input
                        type="date"
                        value={task.date}
                        onChange={onChangeTask}
                        name="date"
                        className="modal-input cursor"
                      />
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="check"
                      checked={task.status}
                      onChange={onChangeTask}
                      name="status"
                    />
                    <label className="checkbox-label" htmlFor="check">
                      <span></span>
                    </label>
                  </div>
                </div>
                <div className="label-wrap">
                  <label className="form-label">
                    Заголовок
                    <input
                      type="text"
                      value={task.title}
                      onChange={onChangeTask}
                      name="title"
                      className="modal-input"
                    />
                  </label>
                </div>
                <div className="label-wrap">
                  <label className="form-label">
                    Описание
                    <textarea
                      type="text"
                      value={task.description}
                      onChange={onChangeTask}
                      name="description"
                      className="modal-input"
                    />
                  </label>
                </div>
                <div className="label-wrap">
                  <label className="form-label">
                    Прикрепить файл
                    <input
                      type="file"
                      // value={task.file}
                      onChange={onChangeTask}
                      name="file"
                      className="modal-input"
                    />
                  </label>
                </div>
              </div>
              <div className="form-footer">
                <button onClick={handleSubmit} className="btn-save">
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        )}
        <Messages message={message} successful={successful} handleClose={handleClose} />
      </div>
    </div>
  );
}
export default ModalAddTask;
