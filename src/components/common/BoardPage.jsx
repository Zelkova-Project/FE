import React, { useState, useEffect } from 'react';
import { activeInfoState } from '../../recoilState/recoil';
import { useRecoilValue } from 'recoil';
import PageLayout from '../../components/common/PageLayout';
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router';

const BoardPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [boardName, setBoardName] = useState('');

  const activeInfo = useRecoilValue(activeInfoState);

  const imgObj = {
    이용안내: require('../../imgs/guide/이용안내.png'),
    시설안내: require('../../imgs/guide/시설안내main.png'),
    오시는길: require('../../imgs/guide/오시는길main.png'),
    조직도: require('../../imgs/notice/채용안내main.png'),
  };

  useEffect(() => {
    // 가장 첫 idx는 바어았어서 '_'로 처리
    const [_, 공통경로, 진입게시글타입] = pathname.split('/');
    setBoardName(진입게시글타입);
  }, []);

  return (
    <>
      {
        boardName && <PageLayout pageName={boardName} imgObj={imgObj}/>
      }
    </>

  );
};

export default BoardPage;
