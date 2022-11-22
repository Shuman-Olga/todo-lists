/**
 * Компонент Message
 * @param {*} props
 * @returns  сообщение
 */
function Messages(props) {
  return (
    <>
      {props.message && (
        <div className={props.successful ? 'alert alert-success' : 'alert alert-danger'}>
          <div>
            <div className="btn-close close-mes" onClick={props.handleClose}></div>
            <p className="text-message"> {props.message}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Messages;
