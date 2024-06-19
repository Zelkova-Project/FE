import Section from '../components/Section';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import '../css/write.css';
import axios from '../axios/axiosInstance';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {subtitState, navIdxState} from '../recoilState/recoil';
import {useRecoilState} from 'recoil';

const WritePage = () => {
  window.scrollTo(0, 0);

  const navigate = useNavigate();
  const [subtit, setSubtit] = useRecoilState(subtitState); 
  const [navIdx, setNavIdx] = useRecoilState(navIdxState); 

  const [postInfo, setPostInfo] = useState({
    category: 'BOARD',
    visibility: 'PUBLIC',
    title: '테스트 제목',
    content: '테스트 내용',
  });

  const imgObj = {
    notice: require('../imgs/notice/notice-main.png'),
    home: require('../imgs/notice/가정통신문main.png'),
    hire: require('../imgs/notice/채용안내main.png')
  };

  const getMainImg = () => {
    const imgList = [imgObj.notice, imgObj.home, imgObj.hire];
    return imgList[navIdx];
  };

  const noticeTitleList = ['공지사항', '가정통신문', '채용안내'];

  const activeHandler = (idx) => {
    setNavIdx(idx);
    setSubtit(noticeTitleList[idx]);
  };

  const getBoard = async () => {
    let { status, data, message } = await axios.get('/posts?page=0&size=10');
    if (status != 200 && status != 201) {
      alert(message);
      return;
    }
    let postList = data.content;

    navigate('/noticeDetail/' + postList[0].no);
  };

  const goWrite = async () => {
    let param = new FormData();
    param.append('title', postInfo.title);
    param.append('content', postInfo.content);
    param.append('category', 'BOARD');
    param.append('visibility', 'PUBLIC');

    let { status } = await axios.post('/posts', param);

    console.log(status);
    getBoard();
  };

  return (
    <div className="main-container">
      <Nav />
      <Section>
        <div className="guide-img-container">
          <div className="img-title">
            <h3>{subtit}</h3>
          </div>
          <img className="main-img" src={getMainImg()} alt="main-section"></img>

          <div className="sub-nav-wrapper">
            <div className="sub-nav">
              <ul>
                <li>
                  <span onClick={() => activeHandler(0)} className={navIdx == 0 ? 'active' : ''}>
                    공지사항
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => activeHandler(1)}
                    className={navIdx == 1 ? 'active-wide' : ''}
                  >
                    가정통신문
                  </span>
                </li>
                <li>
                  <span onClick={() => activeHandler(2)} className={navIdx == 2 ? 'active' : ''}>
                    채용안내
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* 글쓰기영역시작 */}
      <Section>
        <div className="write-outer-container">
          <div className="write-flexitem">
            <h5 className="write-subtit">{ subtit } 등록 및 수정</h5>
          </div>
          <div className="write-flexItem">
            <h3>제목</h3>
            <input onChange={(e) => setPostInfo({ ...postInfo, title: e.target.value })}></input>
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
              <textarea
                cols="40"
                rows="40"
                onChange={(e) => setPostInfo({ ...postInfo, content: e.target.value })}
              ></textarea>
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
              <button onClick={() => navigate(-1)}>취소</button>
              <button>삭제</button>
              <button onClick={() => goWrite()}>등록</button>
            </div>
          </div>
        </div>
      </Section>
      {/* 글쓰기영역끝 */}

      <Footer />
    </div>
  );
};

export default WritePage;
