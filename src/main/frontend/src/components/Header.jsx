import "./Header.css";

const Header = ({ title, leftChild, rightChild, currentUser, onLogout }) => {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header className="Header">
      <div className="header_left">{leftChild}</div>
      <div className="header_center">{title}</div>
      <div className="header_right">
        {rightChild}
        {currentUser && (
          <div className="user-section">
            <div className="user-info">
              <span className="user-name">{currentUser.name}</span>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              로그아웃
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
