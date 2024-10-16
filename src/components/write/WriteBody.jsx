import axios from '../../axios/axiosInstance';

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
  
  const [fileNames, setFileNames] = useState([]);

  const editorRef = useRef(null);

  const [subtit, setSubtit] = useState('');
  const [writeInfo, setWriteInfo] = useState({});
  
  //custom editor 시작
  const saveContent = async () => {
    const isDev = process.env.NODE_ENV == 'development';
    
    const content = editorRef.current.innerHTML;
    const current = editorRef.current;

    let nickname = userInfo?.nickname || '홍길동';
    setPostInfo({...postInfo, content: current, writer: nickname});

    let param = new FormData();
    param.append('title', postInfo.title);
    param.append('content', content);
    param.append('writer', postInfo.writer);
    param.append('files', postInfo.files);

    let { status, data, message } = await axios.post('/board/', param);

    navigate(-1);
  };

  const base64ToBlob = (base64, mimeType) => {
    // Remove the data URL prefix (optional, depending on the input)
    let byteString = atob(base64.split(',')[1]);

    // Create an array for binary data
    let byteArray = new Uint8Array(byteString.length);

    // Populate the array with the byte data
    for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
    }

    // Convert the byteArray to a Blob
    return new Blob([byteArray], { type: mimeType });
}

  const uploadSingleImage = async (files) => {
    const { error, status, data: imageName }= await axios.post('/image/', files);
    if (error) {
      console.error('status >>> ', status);
      return;
    }

    return imageName;
  }

  const handleImageUpload = async (event) => {
    const fileName = event.target.files[0]?.name || '이미지';
    setFileNames([...fileNames, fileName]);

    const file = event.target.files[0];
    setPostInfo({...postInfo, files: file});
    uploadSingleImage(event.target.files).then((res) => {
      const [uploadedImageName] = res.imageNames || [];
      const baseURL = isDev ? 'http://localhost:8080/api' : '/api';
      const img = `<img src="${baseURL}/image/view/${uploadedImageName}" alt="Uploaded Image" style="max-width: 100%; height: auto;" />`;
      document.getElementById('editor').innerHTML += img; 
    })

    
    // if (file) {
    //     // 이미지만 등록하고 끝나고 이미지명 리턴받기
    //     const reader = new FileReader();
    //     reader.onloadend = async () => {
    //         // URL로 임시노출 후 파일서버에 직접 저장하고 imgName 받아서 저장해야함
    //         // let blobData = base64ToBlob(reader.result, 'image/png');
    //         // let url = URL.createObjectURL(blobData);
    //         console.log('...????');
    //     };
    //     reader.readAsDataURL(file);
    // }
  };

  const triggerImageUpload = () => {
    document.querySelector("#fileInput").click();
  }
  //custom editor 끝


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
    param.append('content', JSON.stringify(postInfo.content));
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
              <input value={userInfo?.nickname} readOnly></input>
            </div>
            <div className="write-flexSub ml-40">
              <h3>작성일</h3>
              {/* <input readOnly value={writeInfo.writeDate}></input> */}
              {/* 빈값 넘어와서 임시처리 */}
              <input readOnly value={'2024-10-14'}></input>
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
              {/* <input readOnly value={writeInfo.modifyDate}></input> */}
              {/* 빈값 넘어와서 임시처리 */}
              <input readOnly value={'2024-10-14'}></input>
            </div>
          </div>

          <div className="write-flexItem mt-50">
            <div className="write-textArea">
              <h3>내용작성</h3>
              <div
                ref={editorRef}
                className='write-body'
                contentEditable
                id="editor"
                style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    minHeight: '200px',
                }}
               />
            </div>
          </div>

          <div className="write-flexItem mt-50">
            <div className="write-flexSub">
              <h3>첨부파일</h3>
            </div>

            <div className="write-file-list ml-40">
              <ul>
                {
                  fileNames.length == 0 ?
                  <>
                    <li>
                      <h3>선택된 파일명</h3>
                    </li>
                  </> :
                  fileNames.map((item, idx) => (
                    <li key={item + idx}>
                      <h3>{item}</h3>
                    </li>
                  ))
                }
              </ul>
            </div>

            <div className="write-file-btns ml-20">
              <button>파일 삭제</button>
              <button onClick={triggerImageUpload}>파일 추가</button>
              <input type="file" id="fileInput" onChange={handleImageUpload} style={{display: 'none'}}/>
            </div>
          </div>

          <div className="write-flexItem dja-center mt-50 mb-50">
            <div className="write-submit-btns">
              <button onClick={() => navigate(-1)}>취소</button>
              <button>삭제</button>
              <button onClick={saveContent}>등록</button>
            </div>
          </div>
        </div>
      </Section>
      {/* 글쓰기영역끝 */}
    </>
  );
};

export default WriteBody;
