import useAxiosInsance from '@/common/axios/axiosInstance';
import React, { useEffect, useState } from 'react';

import { navIdxState, activeInfoState } from '@/common/recoilState/recoil';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router';

import '@/pc/css/write.css';

import PageLayout from '@/pc/components/common/PageLayout';
import WriteBody from '@/pc/components/write/WriteBody';

const WritePage = () => {
  const axios = useAxiosInsance();
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
    notice: require('@/common/imgs/notice/notice-main.png'),
    home: require('@/common/imgs/notice/가정통신문main.png'),
    hire: require('@/common/imgs/notice/채용안내main.png'),
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    let { status, data, message } = await axios.get('/posts/board?page=0&size=10');
    if (status != 200 && status != 201) {
      alert(message);
      return;
    }
    let postList = data.content;
    navigate(`/detail/${activeInfo.pageName}/${postList[0].no}`);
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
    <>
      {/* 글쓰기영역시작 */}
      <PageLayout pageName={activeInfo.activePage} bodySlot={<WriteBody />} />
      {/* 글쓰기영역끝 */}
    </>
  );
};

export default WritePage;

