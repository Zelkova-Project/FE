import PageLayout from '@/pc/components/common/PageLayout';
import BoardDetailBody from './BoardDetailBody';

import '@/pc/css/main.css';
import '@/pc/css/guide.css';
import '@/pc/css/nav.css';
import '@/pc/css/notice.css';
import '@/common/fonts/font.css';

import React, { useState, useEffect } from 'react';
import { activeInfoState } from '@/common/recoilState/recoil';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router';
import axios from '@/common/axios/axiosInstance';

const BoardDetailPage = () => {
  const { pathname } = useLocation();

  const [activeInfo, setActiveInfo] = useRecoilState(activeInfoState);
  const [detailComponent, setDetailComponent] = useState('');
  const [boardName, setBoardName] = useState('');

  useEffect(() => {
    // 가장 첫 idx는 바어았어서 '_'로 처리
    const [_, __, 카테고리, 게시글아이디] = pathname.split('/');

    setBoardName(카테고리);
    console.log('카테고리 ', 카테고리);
    console.log('boardName ', boardName);
    return () => {
      setBoardName('');
      setActiveInfo({
        ...activeInfo,
        activeIdx: 0,
      });
    };
  }, [pathname]);

  return <PageLayout pageName={activeInfo.activePage} bodySlot={<BoardDetailBody />}></PageLayout>;
};

export default BoardDetailPage;
