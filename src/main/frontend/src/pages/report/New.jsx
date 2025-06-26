import React, { useState } from "react";
import { getApiUrl, API_ENDPOINTS, getCorsConfig } from "../../config/api";
import "./New.css";

const New = ({ onWorkAdded, onCancel }) => {
  const [formData, setFormData] = useState({
    workDate: "",
    address: "",
    worker: "",
    description: "",
    status: "진행중",
    frontImage: "",
    beforeImage: "",
    afterImage: "",
  });
  const [tempFiles, setTempFiles] = useState({
    frontImage: null,
    beforeImage: null,
    afterImage: null,
  });
  const [previewImages, setPreviewImages] = useState({
    frontImage: null,
    beforeImage: null,
    afterImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e, imageType) => {
    const file = e.target.files[0];
    if (file) {
      // 미리보기 이미지 생성
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImages((prev) => ({
          ...prev,
          [imageType]: e.target.result,
        }));
      };
      reader.readAsDataURL(file);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(getApiUrl(API_ENDPOINTS.UPLOAD.TEMP), {
          method: "POST",
          body: formData,
          ...getCorsConfig(),
        });

        if (response.ok) {
          const filename = await response.text();
          setTempFiles((prev) => ({
            ...prev,
            [imageType]: filename,
          }));
          alert(`${imageType} 이미지가 임시 저장되었습니다.`);
        } else {
          alert("파일 업로드에 실패했습니다.");
        }
      } catch (err) {
        alert("파일 업로드 중 오류가 발생했습니다.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 임시 파일들을 upload 폴더로 이동
      const finalImageUrls = {};

      for (const [imageType, filename] of Object.entries(tempFiles)) {
        if (filename) {
          const moveResponse = await fetch(
            getApiUrl(API_ENDPOINTS.UPLOAD.MOVE),
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: `filename=${filename}`,
              ...getCorsConfig(),
            }
          );

          if (moveResponse.ok) {
            const imageUrl = await moveResponse.text();
            finalImageUrls[imageType] = imageUrl;
          } else {
            alert(`${imageType} 파일 이동에 실패했습니다.`);
            return;
          }
        }
      }

      // 작업 데이터 생성
      const workData = {
        ...formData,
        frontImage: finalImageUrls.frontImage || "",
        beforeImage: finalImageUrls.beforeImage || "",
        afterImage: finalImageUrls.afterImage || "",
      };

      const response = await fetch(getApiUrl(API_ENDPOINTS.WORKS.CREATE), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workData),
      });

      if (response.ok) {
        const newWork = await response.json();
        onWorkAdded(newWork);
        resetForm();
        alert("작업이 추가되었습니다.");
      } else {
        alert("작업 추가에 실패했습니다.");
      }
    } catch (err) {
      alert("작업 추가 중 오류가 발생했습니다.");
    }
  };

  const resetForm = () => {
    setFormData({
      workDate: "",
      address: "",
      worker: "",
      description: "",
      status: "진행중",
      frontImage: "",
      beforeImage: "",
      afterImage: "",
    });
    setTempFiles({
      frontImage: null,
      beforeImage: null,
      afterImage: null,
    });
    setPreviewImages({
      frontImage: null,
      beforeImage: null,
      afterImage: null,
    });
  };

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  return (
    <div className="new-work-container">
      <form onSubmit={handleSubmit} className="work-form">
        <div className="form-header">
          <h3>새 작업 추가</h3>
          <button type="button" className="close-btn" onClick={handleCancel}>
            ✕
          </button>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="workDate">작업일자:</label>
            <input
              type="date"
              id="workDate"
              name="workDate"
              value={formData.workDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="worker">작업자:</label>
            <input
              type="text"
              id="worker"
              name="worker"
              value={formData.worker}
              onChange={handleInputChange}
              required
              maxLength="100"
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">상태:</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="대기">대기</option>
              <option value="진행중">진행중</option>
              <option value="완료">완료</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="address">주소:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              maxLength="500"
              placeholder="작업 장소의 상세 주소를 입력하세요"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="description">작업설명:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="4"
              placeholder="작업 내용을 상세히 입력하세요"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="frontImage">전경 이미지:</label>
            <input
              type="file"
              id="frontImage"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "frontImage")}
            />
            {tempFiles.frontImage && (
              <div className="file-info">
                임시 저장됨: {tempFiles.frontImage}
              </div>
            )}
            {previewImages.frontImage && (
              <div className="image-preview">
                <img
                  src={previewImages.frontImage}
                  alt="전경 미리보기"
                  className="preview-image"
                />
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="beforeImage">작업전 이미지:</label>
            <input
              type="file"
              id="beforeImage"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "beforeImage")}
            />
            {tempFiles.beforeImage && (
              <div className="file-info">
                임시 저장됨: {tempFiles.beforeImage}
              </div>
            )}
            {previewImages.beforeImage && (
              <div className="image-preview">
                <img
                  src={previewImages.beforeImage}
                  alt="작업전 미리보기"
                  className="preview-image"
                />
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="afterImage">작업후 이미지:</label>
            <input
              type="file"
              id="afterImage"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "afterImage")}
            />
            {tempFiles.afterImage && (
              <div className="file-info">
                임시 저장됨: {tempFiles.afterImage}
              </div>
            )}
            {previewImages.afterImage && (
              <div className="image-preview">
                <img
                  src={previewImages.afterImage}
                  alt="작업후 미리보기"
                  className="preview-image"
                />
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            추가
          </button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default New;
