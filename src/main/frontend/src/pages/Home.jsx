import React, { useState, useEffect } from "react";
import { getApiUrl, API_ENDPOINTS } from "../config/api";
import New from "./New";
import Detail from "./Detail";
import "./Home.css";

const Home = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      setLoading(true);
      const response = await fetch(getApiUrl(API_ENDPOINTS.WORKS.GET_ALL));
      if (!response.ok) {
        throw new Error("작업 데이터를 가져오는데 실패했습니다.");
      }
      const data = await response.json();
      setWorks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWork = async (id) => {
    if (window.confirm("정말로 이 작업을 삭제하시겠습니까?")) {
      try {
        const response = await fetch(
          getApiUrl(API_ENDPOINTS.WORKS.DELETE(id)),
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setWorks(works.filter((work) => work.id !== id));
          if (selectedWork && selectedWork.id === id) {
            setSelectedWork(null);
          }
          alert("작업이 삭제되었습니다.");
        } else {
          alert("삭제에 실패했습니다.");
        }
      } catch (err) {
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleRowClick = (work) => {
    if (selectedWork && selectedWork.id === work.id) {
      setSelectedWork(null); // 같은 행을 다시 클릭하면 닫기
    } else {
      setSelectedWork(work); // 다른 행을 클릭하면 해당 행 열기
    }
  };

  const handleWorkAdded = (newWork) => {
    setWorks([newWork, ...works]);
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const handleDetailClose = () => {
    setSelectedWork(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "완료":
        return "status-completed";
      case "진행중":
        return "status-progress";
      case "대기":
        return "status-waiting";
      default:
        return "status-default";
    }
  };

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading">데이터를 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-container">
        <div className="error">오류: {error}</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <h1>맨홀 추락방지시설 작업 리스트</h1>

      <div className="actions">
        <button className="add-work-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "취소" : "새 작업 추가"}
        </button>
      </div>

      {showForm && (
        <New onWorkAdded={handleWorkAdded} onCancel={handleFormCancel} />
      )}

      <div className="works-table-container">
        <table className="works-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>작업일자</th>
              <th>전경</th>
              <th>작업전</th>
              <th>작업후</th>
              <th>작업</th>
            </tr>
          </thead>
          <colgroup>
            <col width={"45px"} />
            <col width={"100px"} />
            <col />
            <col />
            <col />
            <col width={"75px"} />
          </colgroup>
          <tbody>
            {works.map((work) => (
              <React.Fragment key={work.id}>
                <tr
                  className={`work-row ${
                    selectedWork && selectedWork.id === work.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleRowClick(work)}
                  height={"100px"}
                >
                  <td rowSpan={2}>{work.id}</td>
                  <td rowSpan={2}>{work.workDate}</td>
                  {/* <td>{work.worker}</td> */}
                  {/* <td className="description-cell">{work.description}</td> */}
                  <td className="nPad">
                    {work.frontImage ? (
                      <img
                        src={`${getApiUrl("")}${work.frontImage}`}
                        alt="전경"
                        className="work-image"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    ) : (
                      <span className="no-image">없음</span>
                    )}
                  </td>
                  <td className="nPad">
                    {work.beforeImage ? (
                      <img
                        src={`${getApiUrl("")}${work.beforeImage}`}
                        alt="작업전"
                        className="work-image"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    ) : (
                      <span className="no-image">없음</span>
                    )}
                  </td>
                  <td className="nPad">
                    {work.afterImage ? (
                      <img
                        src={`${getApiUrl("")}${work.afterImage}`}
                        alt="작업후"
                        className="work-image"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    ) : (
                      <span className="no-image">없음</span>
                    )}
                  </td>
                  {/* <td rowSpan={2}>
                    <span
                      className={`status-badge ${getStatusColor(work.status)}`}
                    >
                      {work.status}
                    </span>
                  </td> */}
                  <td rowSpan={2}>
                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteWork(work.id);
                      }}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
                <tr>
                  <td
                    className="address-cell tl"
                    colSpan={3}
                    onClick={() => handleRowClick(work)}
                  >
                    {work.address}
                  </td>
                </tr>
                {selectedWork && selectedWork.id === work.id && (
                  <tr className="detail-row">
                    <td colSpan="10">
                      <Detail work={work} onClose={handleDetailClose} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {works.length === 0 && (
          <div className="no-data">등록된 작업이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default Home;
