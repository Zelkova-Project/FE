import Section from '@/pc/components/Section';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { userInfoState } from '@/common/recoilState/recoil';
import { useRecoilState } from 'recoil';
import useAxiosInsance from '@/common/axios/axiosInstance';

const CommunityBody = () => {
  const axios = useAxiosInsance();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const imgObj = {
    arrowRight: require('@/common/imgs/notice/arrow-right.png'),
    communityImg1: require('@/common/imgs/community/community-example1.png'),
  };
  const [activePageNum, setActivePageNum] = useState(1);
  const [postList, setPostList] = useState([]);
  const [pageNumList, setPageNumList] = useState([]);
  const isAdmin = userInfo.loginId == 'admin';
  const [searchOption, setSearchOption] = useState('title');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [processing, setProcessing] = useState(false);
  const [activeSearchFlag, setActiveSearchFlag] = useState(-1);


  const makeCommunityGrid = () => {
    let comInfo = {
      img: imgObj.communityImg1,
      title: '타이틀',
      content: '짤막한 글 내용이 들어갈 예정입니다. 짤막한 글이라 함은 이쯤에서 말줄임표를...',
    };

    const result = [];
    for (let idx in postList) {
      result.push(
        <div className="flex-item" key={idx}>
          <div className='thumb-wrapper' onClick={() => navigate(`/noticeDetail/${1}`)}>
            <img src={postList[idx].thumbImageName}></img>
          </div>
          <h3>{postList[idx].title}</h3>
          <h3>{postList[idx].writer}</h3>
          <h3>{postList[idx].dueDate}</h3>
        </div>
      );
    }

    return result;
  };

  const getPostListByKeyword = (e) => {
    if (e.key == 'Enter' || e == 'click') {
      setProcessing(true);
      setActiveSearchFlag(activeSearchFlag * -1);
    }
  }

  const fetchPostList = async () => {
    try {
      let { status, data, message } = await axios.get(
        `/board/list?page=${activePageNum}&size=9&keyword=${searchKeyword}&searchOption=${searchOption}&category=커뮤니티`,
      );
      const serverURL = process.env.NODE_ENV == 'development' ? 'http://localhost:8080/api' : '/api';

      let filtered = data.dtoList.filter(item => !item.del); // soft delete로 인해 한번 걸러야함

      filtered = filtered.map(post => {
        if (!post.thumbImageName) {
          post.thumbImageName = imgObj.communityImg1;
        } else {
          post.thumbImageName =`${serverURL}/image/view/${post.thumbImageName}`;
        }
        return post;
      });

      setPageNumList(data.pageNumList);
      setPostList(filtered);
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

  return (
    <Section>
      <div className="notice-outer-container">
        <div className="notice-flexitem">
          <h5 className="notice-subtit">커뮤니티</h5>
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

        {/* 사진시작 */}
        <div className="community-body-flex">
          <div className="flex-row">
            {/* 요소 for looping */}
            {makeCommunityGrid()}
          </div>
        </div>

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
            <div className="page-btns-center">
              <ul>
                {
                  pageNumList.map((item, index) => (
                    <li 
                      key={index}
                      className={item == activePageNum ? 'active' : ''}
                      onClick={() => setActivePageNum(item)}
                    >
                      {item}
                    </li>    
                  ))
                }
              </ul>
            </div>

            {/* 오른쪽버튼 */}
            <div className="page-btns-right dja-center">
              <div className="page-all-right">
                <ul>
                  <li>
                    <img src={imgObj.arrowRight}></img>
                    <img className="all-right-btn" src={imgObj.arrowRight}></img>
                  </li>
                  <li>
                    <img src={imgObj.arrowRight}></img>
                  </li>
                </ul>
              </div>
            </div>

            {/* 글쓰기버튼 */}
            <div className="page-btn-write">
              <button onClick={() => navigate('/write')}>글쓰기</button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CommunityBody;




