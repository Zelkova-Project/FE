import React, { useState, useEffect, useMemo } from 'react';
import useAxiosInsance from '@/common/axios/axiosInstance';

import Section from '@/pc/components/Section';
import Table from '@/pc/components/Table';

import { useNavigate } from 'react-router';
import { activeInfoState, userInfoState } from '@/common/recoilState/recoil';
import { useRecoilValue } from 'recoil';

import subTitMap from '@/pc/components/common/data/subtitData';

const BoardList = ({ boardList }) => {
  const axios = useAxiosInsance();
  const activeInfo = useRecoilValue(activeInfoState);
  const userInfo = useRecoilValue(userInfoState);
  const navigate = useNavigate();

  const imgObj = {
    arrowRight: require('@/common/imgs/notice/arrow-right.png'),
  };

  const [subtit, setActiveSubtit] = useState('');
  const [activeSearchFlag, setActiveSearchFlag] = useState(-1);
  const [activePageNum, setActivePageNum] = useState(1);
  const [pageInfo, setPageInfo] = useState([]);
  const [pageList, setPageList] = useState([]);
  const [postList, setPostList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchOption, setSearchOption] = useState('title');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setSearchKeyword('');
  }, [activeInfo.activeIdx, activeInfo.activePage]);

  // 페이지 전환시 연속동작을 막음. 키워드 초기화
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchPostList();
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [activePageNum, activeSearchFlag, activeInfo.activeIdx, activeInfo.activePage]);

  // 페이지 전환시. 메인사진에 노출할 페이지명 변경
  useEffect(() => {
    let _subtit = subTitMap[activeInfo.activePage][activeInfo.activePage];
    setActiveSubtit(_subtit);
  }, [activeInfo.activeIdx]);

  // 광클 prevent
  const getPostListByKeyword = (e) => {
    if (e.key == 'Enter' || e == 'click') {
      setProcessing(true);
      setActiveSearchFlag(activeSearchFlag * -1);
    }
  }
  
  // 검색리스트 조회
  const fetchPostList = async () => {
    let subtitle = subTitMap[activeInfo.activePage][activeInfo.activeIdx];

    let { status, data, message } = await axios.get(
      `/board/list?page=${activePageNum}&size=10&keyword=${searchKeyword}&searchOption=${searchOption}&category=${subtitle}`,
    );
    const filtered = data.dtoList.filter(item => !item.del); // soft delete로 인해 한번 걸러야함
    setPostList(filtered);
    setPageList(data.pageNumList);

    setPageInfo({
      prev: data.prev,
      next: data.next,
      totalCount: data.totalCount,
      prevPage: data.prevPage,
      nextPage: data.nextPage,
      totalPage: data.totalPage,
      current: data.current
    });
      
    if (status != 200) {
      console.error('Error fetching data:', error);
      return;
    }

    setTimeout(() => {
      setProcessing(false);
    }, 1000);
  }

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
              value={searchKeyword}
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
  const makePagingDom = useMemo(() => {
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
  }, [pageList]);

  const goWrite = () => {
    if (Object.keys(userInfo).length == 0) {
      alert('회원만 글쓰기 가능합니다.');
      return;
    }

    navigate('/write');
  };

  const goNextPage = () => {
    if (pageInfo.next) {
      setActivePageNum(pageList.at(-1) + 1);
    }
  }

  const goPrevPage = () => {
    if (pageInfo.prev) {
      setActivePageNum(pageList.at(0) - 1);
    }
  }

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
                {
                  pageInfo.prev && 
                  <ul>
                    {/* <li>
                      <img src={imgObj.arrowRight} onClick={goPrevPage}></img>
                      <img className="all-left-btn" src={imgObj.arrowRight}></img>
                    </li> */}
                    <li>
                      <img src={imgObj.arrowRight} onClick={goPrevPage}></img>
                    </li>
                  </ul>
                }
              </div>
            </div>

            {/* 페이지버튼 */}
            {/* 1 2 3 4 5 6 7 8 9 10 */}
            <div className="page-btns-center">
              <ul>{makePagingDom}</ul>
            </div>

            {/* 오른쪽버튼 */}
            <div className="page-btns-right dja-center">
              <div className="page-all-right">
                {
                  pageInfo.next && 
                  <ul>
                    <li>
                      <img src={imgObj.arrowRight} onClick={goNextPage}></img>
                    </li>
                    {/* <li>
                      <img src={imgObj.arrowRight}></img>
                      <img className="all-right-btn" src={imgObj.arrowRight}></img>
                    </li> */}
                  </ul>
                }
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








