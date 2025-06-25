import { useState, useEffect } from "react";
import { getApiUrl, API_ENDPOINTS } from "../config/api";
import "./Profile.css";

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(getApiUrl(API_ENDPOINTS.USERS.GET_ALL));
      if (!response.ok) {
        throw new Error("사용자 데이터를 가져오는데 실패했습니다.");
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("정말로 이 사용자를 삭제하시겠습니까?")) {
      try {
        const response = await fetch(
          getApiUrl(API_ENDPOINTS.USERS.DELETE(id)),
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setUsers(users.filter((user) => user.id !== id));
          alert("사용자가 삭제되었습니다.");
        } else {
          alert("삭제에 실패했습니다.");
        }
      } catch (err) {
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(getApiUrl(API_ENDPOINTS.USERS.CREATE), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newUser = await response.json();
        setUsers([...users, newUser]);
        setFormData({ name: "", email: "", password: "" });
        setShowForm(false);
        alert("사용자가 추가되었습니다.");
      } else {
        alert("사용자 추가에 실패했습니다.");
      }
    } catch (err) {
      alert("사용자 추가 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">데이터를 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error">오류: {error}</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>사용자 관리</h1>

      <div className="actions">
        <button className="add-user-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "취소" : "새 사용자 추가"}
        </button>
      </div>

      {showForm && (
        <div className="user-form-container">
          <form onSubmit={handleSubmit} className="user-form">
            <h3>새 사용자 추가</h3>
            <div className="form-group">
              <label htmlFor="name">이름:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                minLength="2"
                maxLength="50"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">이메일:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">비밀번호:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength="6"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                추가
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                취소
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>이름</th>
              <th>이메일</th>
              <th>권한</th>
              <th>생성일</th>
              <th>수정일</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>{new Date(user.updatedAt).toLocaleString()}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="no-data">등록된 사용자가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
