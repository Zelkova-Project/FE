import axios from '../../axios/axiosInstance';

import ReactQuill from 'react-quill';

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { activeInfoState, userInfoState } from '../../recoilState/recoil';

import subTitMap from '../common/data/subtitData';

import Section from '../Section';

import '../../css/write.css';

const WriteBody = () => {
  const navigate = useNavigate();
  const [activeInfo, setActiveInfo] = useRecoilState(activeInfoState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const [subtit, setSubtit] = useState('');
  const [writeInfo, setWriteInfo] = useState({});

  // quil 시작
  const [value, setValue] = useState('1234');

  const modules = {
    toolbar: {
      container: [['image'], [{ header: [1, 2, 3, 4, 5, false] }], ['bold', 'underline']],
    },
  };

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          console.log('이미지 >>> ', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
  };
  // quil 끝

  const [postInfo, setPostInfo] = useState({
    category: 'BOARD',
    visibility: 'PUBLIC',
    title: '테스트 제목',
    content: '테스트 내용',
  });

  const getDate = (date) => {
    let year = date.getFullYear() + '';
    let month = date.getMonth() + 1 + '';

    if (month < 10) month = '0' + month;

    let day = date.getDate() + '';

    if (day < 10) day = '0' + day;
    return year + '-' + month + '-' + day;
  };

  useEffect(() => {
    setWriteInfo({
      ...writeInfo,
      modifyDate: getDate(new Date()),
      writeDate: getDate(new Date()),
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    let subtitle = subTitMap[activeInfo.activePage][activeInfo.activeIdx];
    setSubtit(subtitle);
  }, [activeInfo.activeIdx]);

  const getBoard = async () => {
    let { status, data, message } = await axios.get('/posts/board?page=0&size=10');
    if (status != 200 && status != 201) {
      alert(message);
      return;
    }
    let postList = data.content;
    navigate(`/detail/${activeInfo.activePage}/${postList[0].no}`);
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

  const setContent = (e) => {
    setPostInfo({
      ...postInfo,
      content: e,
    });
  };

  return (
    <>
      {/* 글쓰기영역시작 */}
      <Section>
        <div className="write-outer-container">
          <div className="write-flexitem">
            <h5 className="write-subtit">{subtit} 등록 및 수정</h5>
          </div>
          <div className="write-flexItem">
            <h3>제목</h3>
            <input onChange={(e) => setPostInfo({ ...postInfo, title: e.target.value })}></input>
          </div>
          <div className="write-flexItem">
            <div className="write-flexSub">
              <h3>작성자</h3>
              <input value={userInfo} readOnly></input>
            </div>
            <div className="write-flexSub ml-40">
              <h3>작성일</h3>
              <input readOnly value={writeInfo.writeDate}></input>
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
              <input readOnly value={writeInfo.modifyDate}></input>
            </div>
          </div>

          <div className="write-flexItem mt-50">
            <div className="write-textArea">
              <h3>내용작성</h3>
              <ReactQuill
                style={{
                  width: '1080px',
                  height: '400px',
                  border: '1px solid #F2F2F2',
                  borderRadius: '8px',
                }}
                onChange={(e) => setContent(e)}
                modules={modules}
              />
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
              <button onClick={() => imageHandler()}>파일1 추가</button>
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
    </>
  );
};

export default WriteBody;
