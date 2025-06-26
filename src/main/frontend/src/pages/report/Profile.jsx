import { useState, useEffect } from "react";
import { getApiUrl, API_ENDPOINTS } from "../../config/api";
import Header from "../../components/Header";
import "./Profile.css";

const Profile = ({ currentUser, onLogout }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name"); // name, email
  const [roleFilter, setRoleFilter] = useState("ALL"); // ALL, USER, MANAGER, ADMIN
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER", // 기본값을 USER로 설정
  });

  // 사용 가능한 역할 목록
  const roleOptions = [
    { value: "USER", label: "일반 사용자" },
    { value: "MANAGER", label: "매니저" },
    { value: "ADMIN", label: "관리자" },
  ];

  // 검색 필드 옵션 (권한 제외)
  const searchFieldOptions = [
    { value: "name", label: "이름" },
    { value: "email", label: "이메일" },
  ];

  // 권한 필터 옵션
  const roleFilterOptions = [
    { value: "ALL", label: "모든 권한" },
    { value: "USER", label: "일반 사용자" },
    { value: "MANAGER", label: "매니저" },
    { value: "ADMIN", label: "관리자" },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  // 검색어, 검색 필드, 권한 필터가 변경될 때 필터링
  useEffect(() => {
    filterUsers();
  }, [searchTerm, searchField, roleFilter, users]);

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

  const filterUsers = () => {
    let filtered = users;

    // 텍스트 검색 필터링 (이름, 이메일)
    if (searchTerm.trim()) {
      filtered = filtered.filter((user) => {
        const term = searchTerm.toLowerCase();

        switch (searchField) {
          case "name":
            return user.name.toLowerCase().includes(term);
          case "email":
            return user.email.toLowerCase().includes(term);
          default:
            return true;
        }
      });
    }

    // 권한 필터링
    if (roleFilter !== "ALL") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("정말로 이 사용자를 삭제하시겠습니까?")) {
      try {
        const response = await fetch(getApiUrl(API_ENDPOINTS.USERS.DELETE(id)));
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
        setFormData({ name: "", email: "", password: "", role: "USER" });
        setShowForm(false);
        alert("사용자가 추가되었습니다.");
      } else {
        alert("사용자 추가에 실패했습니다.");
      }
    } catch (err) {
      alert("사용자 추가 중 오류가 발생했습니다.");
    }
  };

  // 역할 표시 함수
  const getRoleDisplayName = (role) => {
    const roleOption = roleOptions.find((option) => option.value === role);
    return roleOption ? roleOption.label : role;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchFieldChange = (e) => {
    setSearchField(e.target.value);
  };

  const handleRoleFilterChange = (e) => {
    setRoleFilter(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchField("name");
    setRoleFilter("ALL");
  };

  if (loading) {
    return (
      <div className="profile-container">
        <Header
          title="사용자 관리"
          currentUser={currentUser}
          onLogout={onLogout}
        />
        <div className="loading">데이터를 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <Header
          title="사용자 관리"
          currentUser={currentUser}
          onLogout={onLogout}
        />
        <div className="error">오류: {error}</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <Header
        title="사용자 관리"
        currentUser={currentUser}
        onLogout={onLogout}
      />

      {/* 검색 섹션 */}
      <div className="search-section">
        <div className="search-container">
          <div className="search-left">
            <div className="search-field-selector">
              <select
                value={searchField}
                onChange={handleSearchFieldChange}
                className="search-field-select"
              >
                {searchFieldOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="search-input-container">
              <input
                type="text"
                placeholder={`${
                  searchFieldOptions.find((opt) => opt.value === searchField)
                    ?.label
                }으로 검색...`}
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="clear-search-btn"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="role-filter-selector">
              <select
                value={roleFilter}
                onChange={handleRoleFilterChange}
                className="role-filter-select"
              >
                {roleFilterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            className="add-user-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "취소" : "새 사용자 추가"}
          </button>
        </div>
        <div className="search-info">
          총 {filteredUsers.length}명의 사용자가 검색되었습니다.
        </div>
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
            <div className="form-group">
              <label htmlFor="role">권한:</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
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
              {/* <th>생성일</th> */}
              {/* <th>수정일</th> */}
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`role-badge role-${user.role?.toLowerCase()}`}
                  >
                    {getRoleDisplayName(user.role)}
                  </span>
                </td>
                {/* <td>{new Date(user.createdAt).toLocaleString()}</td> */}
                {/* <td>{new Date(user.updatedAt).toLocaleString()}</td> */}
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
        {filteredUsers.length === 0 && (
          <div className="no-data">
            {searchTerm ? "검색 결과가 없습니다." : "등록된 사용자가 없습니다."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
