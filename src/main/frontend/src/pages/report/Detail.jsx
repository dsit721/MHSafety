import React from "react";
import { getApiUrl } from "../../config/api";
import "./Detail.css";

const Detail = ({ work, onClose }) => {
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

  if (!work) {
    return null;
  }

  return (
    <div className="new-work-container">
      <div className="detail-form">
        <div className="form-header">
          <h3>
            작업 상세 정보 <span className="work-id-badge">#{work.id}</span>
          </h3>
          <button type="button" className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>작업일자:</label>
            <div>{work.workDate}</div>
          </div>
          <div className="form-group">
            <label>작업자:</label>
            <div>{work.worker}</div>
          </div>
          <div className="form-group">
            <label>상태:</label>
            <div className={`status-badge ${getStatusColor(work.status)}`}>
              {work.status}
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>주소:</label>
            <div>{work.address}</div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>작업설명:</label>
            <div>{work.description}</div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>전경 이미지</label>
            {work.frontImage ? (
              <img
                src={`${getApiUrl("")}${work.frontImage}`}
                alt="전경"
                className="preview-image"
                onError={(e) => (e.target.style.display = "none")}
              />
            ) : (
              <div className="no-image-placeholder">이미지 없음</div>
            )}
          </div>
          <div className="form-group">
            <label>작업전 이미지</label>
            {work.beforeImage ? (
              <img
                src={`${getApiUrl("")}${work.beforeImage}`}
                alt="작업전"
                className="preview-image"
                onError={(e) => (e.target.style.display = "none")}
              />
            ) : (
              <div className="no-image-placeholder">이미지 없음</div>
            )}
          </div>
          <div className="form-group">
            <label>작업후 이미지</label>
            {work.afterImage ? (
              <img
                src={`${getApiUrl("")}${work.afterImage}`}
                alt="작업후"
                className="preview-image"
                onError={(e) => (e.target.style.display = "none")}
              />
            ) : (
              <div className="no-image-placeholder">이미지 없음</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
