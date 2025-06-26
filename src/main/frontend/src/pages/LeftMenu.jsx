import { Link, useLocation } from "react-router-dom";
import HNLogo from "../assets/HN_logo.png";
import "./LeftMenu.css";

const LeftMenu = () => {
  const location = useLocation();

  return (
    <div className="left-menu">
      {/* 회사 로고 */}
      <div className="logo-section">
        <img src={HNLogo} alt="HN Logo" className="company-logo" />
      </div>

      <nav className="menu-nav">
        <ul className="menu-list">
          <li className="menu-item">
            <Link
              to="/"
              className={`menu-link ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <span className="menu-icon">📊</span>
              <span className="menu-text">보고서</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              to="/profile"
              className={`menu-link ${
                location.pathname === "/profile" ? "active" : ""
              }`}
            >
              <span className="menu-icon">👤</span>
              <span className="menu-text">사용자</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LeftMenu;
