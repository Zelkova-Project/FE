import React, { useState, useEffect } from 'react';
import { activeInfoState } from '@/common/recoilState/recoil';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router';
import { useLocation, useParams } from 'react-router';

import PageLayout from '@/pc/components/common/PageLayout';
import BoardList from '@/pc/components/common/BoardList';
import CommunityBody from '@/pc/components/community/CommunityBody';

import '@/pc/css/main.css';
import '@/pc/css/guide.css';
import '@/pc/css/nav.css';
import '@/pc/css/notice.css';
import '@/common/fonts/font.css';

const BoardPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [boardName, setBoardName] = useState('');
  const [boardListData, setBoardListData] = useState([]);

  const [activeInfo, setActiveInfo] = useRecoilState(activeInfoState);

  useEffect(() => {
    // 가장 첫 idx는 바어았어서 '_'로 처리
    const [_, 공통경로, 진입게시글타입] = pathname.split('/');
    setBoardName(진입게시글타입);
    return () => {
      setBoardName('');
      setActiveInfo({
        ...activeInfo,
        activeIdx: 0,
      });
    };
  }, [pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // let { status, data, message } = await axios.get('/posts/board?page=0&size=10');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {boardName &&
        (boardName == 'community' ? (
          <PageLayout pageName={boardName} bodySlot={<CommunityBody />} />
        ) : (
          <PageLayout pageName={boardName} bodySlot={<BoardList boardList={boardListData} />} />
        ))}
    </>
  );
};

export default BoardPage;

