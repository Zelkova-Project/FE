import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import '../css/noticeDetail.css';
import Footer from '../components/Footer';
import Section from '../components/Section';
import Nav from '../components/Nav';
import { atom, useRecoilState } from 'recoil';
import {subtitState, navIdxState} from '../recoilState/recoil';
import '../css/main.css';
import '../css/guide.css';
import '../css/nav.css';
import '../css/notice.css';
import '../fonts/font.css';
import axios from '../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';

const NoticeDetailPage = () => {
  const navigate = useNavigate();
  const {id} = useParams();

  // state, hooks 영역
  const { state } = useLocation();
  const [subtit, setSubtit] = useRecoilState(subtitState); 
  const [navIdx, setNavIdx] = useRecoilState(navIdxState); 

  const activeHandler = (idx) => {
    setNavIdx(idx);
    setSubtit(noticeTitleList[idx]);
  };
  const noticeTitleList = ['공지사항', '가정통신문', '채용안내'];
  const imgObj = {
    comment: require('../imgs/notice/notail-comment.png'),
    notailLike: require('../imgs/notice/notail-like.png'),
    notice: require('../imgs/notice/notice-main.png'),
    home: require('../imgs/notice/가정통신문main.png'),
    hire: require('../imgs/notice/채용안내main.png')
  };

  const getMainImg = () => {
    const imgList = [imgObj.notice, imgObj.home, imgObj.hire];
    return imgList[navIdx];
  };

  let result = [];

  let 댓글 = (
    <div className="notail-comment-list-item">
      <div className="notail-comment-list-item-profile">
        <img src={imgObj.comment}></img>
      </div>

      {/* 댓글 중 중간 영역 */}
      <div className="notail-comment-list-item-main-area">
        {/* 댓글이름 */}
        <div className="notail-comment-item-name">
          <h3>성한결</h3>
        </div>

        {/* 댓글본문 */}
        <div className="notail-comment-item-content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* 날짜,신고하기,답글달기 */}
        <div className="notail-comment-item-details">
          <p>2024.12.13 목요일</p>
          <p>신고하기</p>
          <p>답글달기</p>
        </div>
      </div>

      <div className="notail-comment-like">
        <div className="notail-comment-like-icon">
          <img src={imgObj.notailLike}></img>
        </div>
        <div className="notail-comment-like-count">
          <p>1,234</p>
        </div>
      </div>
    </div>
  );

  result.push(댓글);
  result.push(댓글);
  result.push(댓글);
  
  // state, hooks 영역끝

  const [postDetail, setPostDetail] = useState({});
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        let { status, data, message } = await axios.get('/posts/' + id);
        setPostDetail(data.post_info_response);          
        
        setLoading(false); 
      } catch (error) {
        setLoading(false); 
      }
    };

    fetchData(); 
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="main-container">
      <Nav />
      <Section>
        <div className="guide-img-container">
          <div className="img-title">
            <h3>{subtit}</h3>
          </div>
          <img className="main-img" src={getMainImg()} alt="main-section"></img>

          <div className="sub-nav-wrapper">
            <div className="sub-nav">
              <ul>
                <li>
                  <span onClick={() => activeHandler(0)} className={navIdx == 0 ? 'active' : ''}>
                    공지사항
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => activeHandler(1)}
                    className={navIdx == 1 ? 'active-wide' : ''}
                  >
                    가정통신문
                  </span>
                </li>
                <li>
                  <span onClick={() => activeHandler(2)} className={navIdx == 2 ? 'active' : ''}>
                    채용안내
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* 디테일 영역 */}
      <div className="notail-container">
        {/* 제목, 날짜영역 */}
        <div className="notail-subtit-section">
          <div className="notail-subtit">
            <ul className="notail-subtit-ul">
              <li>
                <h3>{postDetail && postDetail.title}</h3>
              </li>
              <li>
                <h3>{postDetail && postDetail?.date_time && postDetail?.date_time.split('T')[0]}</h3>
              </li>
            </ul>
          </div>
        </div>

        {/* 제목,본문 영역 */}
        <div className="notail-content-section">
          <div className="notail-content">
            <h2>{postDetail && postDetail.title}</h2>
            <p>
              {postDetail && postDetail.content}
            </p>
          </div>
        </div>

        {/* 댓글영역 */}
        <div className="notail-comment-section">
          <div className="notail-comment-state">
            <p>댓글 (128)</p>
          </div>
          <div className="notail-write-area">
            <div className="notail-write-profile-img">
              <img src={imgObj.comment}></img>
            </div>
            <div className="notail-write-comment-input">
              <input type="text" placeholder="댓글을 입력하세요"></input>
            </div>
            <div className="notail-write-comment-register-btn">
              <button>작성</button>
            </div>
          </div>

          {/* 댓글리스트 */}
          <div className="notail-comment-list">
            {/* 댓글하나 시작 */}
            <div className="notail-comment-list-item">
              <div className="notail-comment-list-item-profile">
                <img src={imgObj.comment}></img>
              </div>

              {/* 댓글 중 중간 영역 */}
              <div className="notail-comment-list-item-main-area">
                {/* 댓글이름 */}
                <div className="notail-comment-item-name">
                  <h3>성한결</h3>
                </div>

                {/* 댓글본문 */}
                <div className="notail-comment-item-content">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>

                {/* 날짜,신고하기,답글달기 */}
                <div className="notail-comment-item-details">
                  <p>2024.12.13 목요일</p>
                  <p>신고하기</p>
                  <p>답글달기</p>
                </div>
              </div>

              <div className="notail-comment-like">
                <div className="notail-comment-like-icon">
                  <img src={imgObj.notailLike}></img>
                </div>
                <div className="notail-comment-like-count">
                  <p>1,234</p>
                </div>
              </div>
            </div>
            {result}
          </div>
        </div>

        {/* 이전글 다음글 영역 */}
        <div className="notail-prev-next-btn-section">
          <div className="notail-prev-btn">
            <ul>
              <li>10</li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>2000.00.00</li>
            </ul>
          </div>
          <div className="notail-next-btn">
            <ul>
              <li>10</li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>2000.00.00</li>
            </ul>
          </div>
        </div>

        {/* 목록버튼 */}
        <div className="notail-golist-btn">
          <button onClick={() => navigate('/notice')}>목록</button>
        </div>
      </div>
      {/* 디테일 영역 */}
      <Footer />
    </div>
  );
};

export default NoticeDetailPage;
