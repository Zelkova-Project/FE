import Section from "../components/Section";
import Table from "../components/Table";
import React, { useState } from "react";

const NoticeBoardPage = ({handlerRouting}) => {
  const [activeIdx, setActiveIdx] = useState(1);
  const activeHandler = (idx) => {
    setActiveIdx(idx);
  };

  return (
    <Section>
      <div className="notice-outer-container">
        <div className="notice-flexitem">
          <h5 className="notice-subtit">공지사항</h5>
        </div>

        <div className="notice-flexitem flexCenter">
          <div className="notice-search-area">
            <select>
              <option>제목</option>
              <option>내용</option>
              {/* <option>1</option> */}
            </select>

            <input placeholder="검색어를 입력해주세요" />

            <button onClick={() => handlerRouting('write') }>검색</button>
          </div>
        </div>

        <div className="notice-flexitem">
          <Table handlerRouting={handlerRouting}/>
        </div>

        <div
          className="notice-flexitem"
          style={{ marginTop: "40px", marginBottom: "40px" }}
        >
          <div className="page-btns-container">
            {/* 왼쪽버튼 */}
            <div className="page-btns-left dja-center">
              <div className="page-all-left">
                <ul>
                  <li>
                    <img src="notice/arrow-right.png"></img>
                    <img
                      className="all-left-btn"
                      src="notice/arrow-right.png"
                    ></img>
                  </li>
                  <li>
                    <img src="notice/arrow-right.png"></img>
                  </li>
                </ul>
              </div>
            </div>

            {/* 페이지버튼 */}
            <div className="page-btns-center">
              <ul>
                <li
                  onClick={() => setActiveIdx(1)}
                  className={activeIdx == 1 ? "active" : ""}
                >
                  1
                </li>
                <li
                  onClick={() => setActiveIdx(2)}
                  className={activeIdx == 2 ? "active" : ""}
                >
                  2
                </li>
                <li
                  onClick={() => setActiveIdx(3)}
                  className={activeIdx == 3 ? "active" : ""}
                >
                  3
                </li>
                <li
                  onClick={() => setActiveIdx(4)}
                  className={activeIdx == 4 ? "active" : ""}
                >
                  4
                </li>
                <li
                  onClick={() => setActiveIdx(5)}
                  className={activeIdx == 5 ? "active" : ""}
                >
                  5
                </li>
                <li
                  onClick={() => setActiveIdx(6)}
                  className={activeIdx == 6 ? "active" : ""}
                >
                  6
                </li>
                <li
                  onClick={() => setActiveIdx(7)}
                  className={activeIdx == 7 ? "active" : ""}
                >
                  7
                </li>
                <li
                  onClick={() => setActiveIdx(8)}
                  className={activeIdx == 8 ? "active" : ""}
                >
                  8
                </li>
                <li
                  onClick={() => setActiveIdx(9)}
                  className={activeIdx == 9 ? "active" : ""}
                >
                  9
                </li>
                <li
                  onClick={() => setActiveIdx(10)}
                  className={activeIdx == 10 ? "active" : ""}
                >
                  10
                </li>
              </ul>
            </div>

            {/* 오른쪽버튼 */}
            <div className="page-btns-right dja-center">
              <div className="page-all-right">
                <ul>
                  <li>
                    <img src="notice/arrow-right.png"></img>
                    <img
                      className="all-right-btn"
                      src="notice/arrow-right.png"
                    ></img>
                  </li>
                  <li>
                    <img src="notice/arrow-right.png"></img>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default NoticeBoardPage;
