import axios from '../axios/axiosInstance';
import React, { useEffect, useState } from 'react';

import { navIdxState, activeInfoState } from '../recoilState/recoil';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import '../css/write.css';

import PageLayout from '../components/common/PageLayout';
import WriteBody from '../components/write/WriteBody';

const WritePage = () => {
  const navigate = useNavigate();
  const [navIdx, setNavIdx] = useRecoilState(navIdxState);

  const [activeInfo, setActiveInfo] = useRecoilState(activeInfoState);

  const [postInfo, setPostInfo] = useState({
    category: 'BOARD',
    visibility: 'PUBLIC',
    title: '테스트 제목',
    content: '테스트 내용',
  });

  const imgObj = {
    notice: require('../imgs/notice/notice-main.png'),
    home: require('../imgs/notice/가정통신문main.png'),
    hire: require('../imgs/notice/채용안내main.png'),
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getMainImg = () => {
    const imgList = [imgObj.notice, imgObj.home, imgObj.hire];
    return imgList[navIdx];
  };

  const noticeTitleList = ['공지사항', '가정통신문', '채용안내'];

  const activeHandler = idx => {
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
    // <div className="main-container">
    //   <Nav />
    //   <Section>
    //     <div className="guide-img-container">
    //       <div className="img-title">
    //         {/* <h3>{subtit}</h3> */}
    //       </div>
    //       <img className="main-img" src={getMainImg()} alt="main-section"></img>

    //       <div className="sub-nav-wrapper">
    //         <div className="sub-nav">
    //           <ul>
    //             <li>
    //               <span onClick={() => activeHandler(0)} className={navIdx == 0 ? 'active' : ''}>
    //                 공지사항
    //               </span>
    //             </li>
    //             <li>
    //               <span
    //                 onClick={() => activeHandler(1)}
    //                 className={navIdx == 1 ? 'active-wide' : ''}
    //               >
    //                 가정통신문
    //               </span>
    //             </li>
    //             <li>
    //               <span onClick={() => activeHandler(2)} className={navIdx == 2 ? 'active' : ''}>
    //                 채용안내
    //               </span>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //   </Section>
    <>
      {/* 글쓰기영역시작 */}
      <PageLayout pageName={activeInfo.activePage} bodySlot={<WriteBody />} />
      {/* 글쓰기영역끝 */}
    </>

    // <Footer />
    // </div>
  );
};

export default WritePage;
