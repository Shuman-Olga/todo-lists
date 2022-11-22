import logo from '../assets/img/todo.png';
/**
 * Компонент Header
 * @returns -шапка сайта
 */
function Header() {
  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
    </div>
  );
}
export default Header;
