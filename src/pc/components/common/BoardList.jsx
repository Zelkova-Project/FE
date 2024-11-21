import React, { useState, useEffect } from 'react';
import axios from '@/common/axios/axiosInstance';

import Section from '@/pc/components/Section';
import Table from '@/pc/components/Table';

import { useNavigate } from 'react-router-dom';
import { activeInfoState, userInfoState } from '@/common/recoilState/recoil';
import { useRecoilValue } from 'recoil';

import subTitMap from '@/pc/components/common/data/subtitData';

const BoardList = ({ boardList }) => {
  const activeInfo = useRecoilValue(activeInfoState);
  const userInfo = useRecoilValue(userInfoState);
  const navigate = useNavigate();

  const imgObj = {
    arrowRight: require('@/common/imgs/notice/arrow-right.png'),
  };

  const [subtit, setActiveSubtit] = useState('');
  const [activeSearchFlag, setActiveSearchFlag] = useState(-1);
  const [activePageNum, setActivePageNum] = useState(1);
  const [pageList, setPageList] = useState([]);
  const [postList, setPostList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchOption, setSearchOption] = useState('title');
  const [processing, setProcessing] = useState(false);

  const getPostListByKeyword = (e) => {
    if (e.key == 'Enter' || e == 'click') {
      setProcessing(true);
      setActiveSearchFlag(activeSearchFlag * -1);
    }
  }
  
  const fetchPostList = async () => {
    try {
      let { status, data, message } = await axios.get(
        `/board/list?page=${activePageNum}&size=10&keyword=${searchKeyword}&searchOption=${searchOption}`,
      );
      const filtered = data.dtoList.filter(item => !item.del); // soft delete로 인해 한번 걸러야함
      setPostList(filtered);
      setPageList(data.pageNumList);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setTimeout(() => {
      setProcessing(false);
    }, 1000);
  }

  useEffect(() => {
    fetchPostList();
  }, [activePageNum, activeSearchFlag]);

  // 검색영역 돔 그리기
  const makeSearchingDom = () => {
    return (
      <>
        <div className="notice-flexitem">
          <h5 className="notice-subtit">{subtit}</h5>
        </div>

        <div className="notice-flexitem flexCenter">
          <div className="notice-search-area">
            <select onChange={(e) => {setSearchOption(e.target.value)}}>
              <option value="title">제목</option>
              <option value="content">내용</option>
            </select>

            <input 
              placeholder="검색어를 입력해주세요" 
              onKeyDown={getPostListByKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              disabled={processing}
            />

            <button onClick={() => getPostListByKeyword('click')}>검색</button>
          </div>
        </div>
      </>
    );
  };

  // 글리스트 영역 돔 그리기
  const makeListDom = () => {
    return (
      <>
        <div className="notice-flexitem">
          <Table postList={postList} />
        </div>
      </>
    );
  };

  // 페이징 영역 돔 그리기
  const makePagingDom = () => {
    let result = [];
    result = pageList.map((item, idx) => {
      return (
        <li
          onClick={() => setActivePageNum(item)}
          className={activePageNum == item ? 'active' : ''}
          key={idx}
        >
          {item}
        </li>
      );
    });

    return result;
  };

  const goWrite = () => {
    if (Object.keys(userInfo).length == 0) {
      alert('회원만 글쓰기 가능합니다.');
      return;
    }

    navigate('/write');
  };

  useEffect(() => {
    let _subtit = subTitMap[activeInfo.activePage][activeInfo.activePage];
    setActiveSubtit(_subtit);
  }, [activeInfo.activeIdx]);

  return (
    <Section>
      <div className="notice-outer-container">
        {/* 검색영역 시작 */}
        {makeSearchingDom()}
        {/* 검색영역 끝 */}

        {/* 글리스트시작 */}
        {makeListDom()}
        {/* 글리스트끝 */}

        <div className="notice-flexitem" style={{ marginTop: '40px', marginBottom: '40px' }}>
          <div className="page-btns-container">
            {/* 왼쪽버튼 */}
            <div className="page-btns-left dja-center">
              <div className="page-all-left">
                <ul>
                  <li>
                    <img src={imgObj.arrowRight}></img>
                    <img className="all-left-btn" src={imgObj.arrowRight}></img>
                  </li>
                  <li>
                    <img src={imgObj.arrowRight}></img>
                  </li>
                </ul>
              </div>
            </div>

            {/* 페이지버튼 */}
            {/* 1 2 3 4 5 6 7 8 9 10 */}
            <div className="page-btns-center">
              <ul>{makePagingDom()}</ul>
            </div>

            {/* 오른쪽버튼 */}
            <div className="page-btns-right dja-center">
              <div className="page-all-right">
                <ul>
                  <li>
                    <img src={imgObj.arrowRight}></img>
                  </li>
                  <li>
                    <img src={imgObj.arrowRight}></img>
                    <img className="all-right-btn" src={imgObj.arrowRight}></img>
                  </li>
                </ul>
              </div>
            </div>

            {/* 글쓰기버튼 */}
            <div className="page-btn-write">
              <button onClick={goWrite}>글쓰기</button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default BoardList;


