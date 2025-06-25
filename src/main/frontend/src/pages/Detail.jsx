import React from "react";
import { getApiUrl } from "../config/api";
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
    <div className="work-detail">
      <div className="detail-header">
        <h3>작업 상세 정보</h3>
        <button className="close-detail-btn" onClick={onClose}>
          ✕
        </button>
      </div>
      <div className="detail-content">
        <div className="detail-info">
          <div className="info-group">
            <label>작업 번호:</label>
            <span>{work.id}</span>
          </div>
          <div className="info-group">
            <label>작업일자:</label>
            <span>{work.workDate}</span>
          </div>
          <div className="info-group">
            <label>작업자:</label>
            <span>{work.worker}</span>
          </div>
          <div className="info-group">
            <label>상태:</label>
            <span className={`status-badge ${getStatusColor(work.status)}`}>
              {work.status}
            </span>
          </div>
          <div className="info-group full-width">
            <label>주소:</label>
            <span>{work.address}</span>
          </div>
          <div className="info-group full-width">
            <label>작업설명:</label>
            <span>{work.description}</span>
          </div>
        </div>
        <div className="detail-images">
          <div className="image-section">
            <h4>전경 이미지</h4>
            {work.frontImage ? (
              <img
                src={`${getApiUrl("")}${work.frontImage}`}
                alt="전경"
                className="detail-image"
                onError={(e) => (e.target.style.display = "none")}
              />
            ) : (
              <div className="no-image-placeholder">이미지 없음</div>
            )}
          </div>
          <div className="image-section">
            <h4>작업전 이미지</h4>
            {work.beforeImage ? (
              <img
                src={`${getApiUrl("")}${work.beforeImage}`}
                alt="작업전"
                className="detail-image"
                onError={(e) => (e.target.style.display = "none")}
              />
            ) : (
              <div className="no-image-placeholder">이미지 없음</div>
            )}
          </div>
          <div className="image-section">
            <h4>작업후 이미지</h4>
            {work.afterImage ? (
              <img
                src={`${getApiUrl("")}${work.afterImage}`}
                alt="작업후"
                className="detail-image"
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
