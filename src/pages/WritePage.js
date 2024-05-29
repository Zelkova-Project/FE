import Section from "../components/Section";
import "../css/write.css";

const WritePage = () => {
  return (
    <Section>
      <div className="write-outer-container">
        <div className="write-flexitem">
          <h5 className="write-subtit">공지사항 등록 및 수정</h5>
        </div>
        <div className="write-flexItem">
          <h3>제목</h3>
          <input></input>
        </div>
        <div className="write-flexItem">
          <div className="write-flexSub">
            <h3>작성자</h3>
            <input></input>
          </div>
          <div className="write-flexSub ml-40">
            <h3>작성일</h3>
            <input readOnly value="2024-05-30"></input>
          </div>
        </div>

        <div className="write-flexItem">
          <div className="write-flexSub">
            <h3>게시 여부</h3>
            <select>
              <option>공개</option>
              <option>비공개</option>
            </select>
          </div>
          <div className="write-flexSub ml-40">
            <h3>수정일</h3>
            <input readOnly value="2024-05-30"></input>
          </div>
        </div>

        <div className="write-flexItem mt-50">
          <div className="write-textArea">
            <h3>내용작성</h3>
            <textarea cols="40" rows="40"></textarea>
          </div>
        </div>

        <div className="write-flexItem mt-50">
          <div className="write-flexSub">
            <h3>첨부파일</h3>
          </div>

          <div className="write-file-list ml-40">
            <ul>
              <li>
                <h3>선택된 파일명</h3>
              </li>
              <li>
                <h3>선택된 파일명</h3>
              </li>
            </ul>
          </div>

          <div className="write-file-btns ml-20">
            <button>파일 삭제</button>
            <button>파일 추가</button>
          </div>
        </div>

        <div className="write-flexItem dja-center mt-50 mb-50">
          <div className="write-submit-btns">
            <button>취소</button>
            <button>삭제</button>
            <button>등록</button>
          </div>
        </div>
        
      </div>
    </Section>
  );
};

export default WritePage;
