import { useLocation, useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { useRecoilState } from 'recoil';
import { activeInfoState } from '../../recoilState/recoil';

import '../../css/noticeDetail.css';

import axios from '../../axios/axiosInstance';

import * as DOMPurify from 'dompurify';

const BoardDetailBody = () => {
  const { bid } = useParams();
  const navigate = useNavigate();

  const [postDetail, setPostDetail] = useState({});
  const [commentInfo, setCommentInfo] = useState('');
  const [isReload, setIsReload] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeInfo, setActiveInfo] = useRecoilState(activeInfoState);

  const imgObj = {
    comment: require('../../imgs/notice/notail-comment.png'),
    notailLike: require('../../imgs/notice/notail-like.png'),
    notice: require('../../imgs/notice/notice-main.png'),
    home: require('../../imgs/notice/가정통신문main.png'),
    hire: require('../../imgs/notice/채용안내main.png'),
    defaultProfile: require('../../imgs/default-profile-img-2.png'),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { status, data, message } = await axios.get('/posts/detail/' + bid);
        setPostDetail(data.post_info_response);
        setCommentList(data.post_comment_responses);
        setLoading(false);
        window.scrollTo(0, 400);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [isReload]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const enrollComment = async () => {
    let { status, data, message } = await axios.post('/comments', {
      post_id: bid,
      comment: commentInfo,
    });
    setCommentInfo('');
    setIsReload(!isReload);
  };

  const entering = (e) => {
    if (e.key == 'Enter') {
      enrollComment();
    }
  };

  const inputComment = (e) => {
    setCommentInfo(e.target.value);
  };

  const goPage = (url) => {
    setIsReload(!isReload);
    navigate(url);
  }

  return (
    <>
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
                <h3>
                  {postDetail && postDetail?.date_time && postDetail?.date_time.split('T')[0]}
                </h3>
              </li>
            </ul>
          </div>
        </div>

        {/* 제목,본문 영역 */}
        <div className="notail-content-section">
          <div className="notail-content">
            <h2>{postDetail && postDetail.title}</h2>
            <p>
              {postDetail && (
                <div
                  style={{
                    width: '60vw',
                    whiteSpace: 'normal',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(String(postDetail?.content)),
                  }}
                />
              )}
            </p>
          </div>
        </div>

        {/* 댓글영역 */}
        <div className="notail-comment-section">
          <div className="notail-comment-state">
            <p>댓글 ({commentList.length})</p>
          </div>
          <div className="notail-write-area">
            <div className="notail-write-profile-img">
              <img src={imgObj.defaultProfile}></img>
            </div>
            <div className="notail-write-comment-input">
              <input
                type="text"
                id="commentInput"
                placeholder="댓글을 입력하세요"
                value={commentInfo}
                onChange={(e) => inputComment(e)}
                onKeyDown={(e) => entering(e)}
              ></input>
            </div>
            <div className="notail-write-comment-register-btn">
              <button onClick={() => enrollComment()}>작성</button>
            </div>
          </div>

          {/* 댓글리스트 */}
          <div className="notail-comment-list">
            {/* 댓글시작 */}
            {commentList.map((item) => (
              <>
                {/* 댓글하나 시작 */}
                <div className="notail-comment-list-item">
                  <div className="notail-comment-list-item-profile">
                    <img src={imgObj.defaultProfile}></img>
                  </div>

                  {/* 댓글 중 중간 영역 */}
                  <div className="notail-comment-list-item-main-area">
                    {/* 댓글이름 */}
                    <div className="notail-comment-item-name">
                      <h3>{item.name}</h3>
                    </div>

                    {/* 댓글본문 */}
                    <div className="notail-comment-item-content">
                      <p>{item.comment}</p>
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
              </>
            ))}
            {/* 댓글끝 */}
            {/* {result} */}
          </div>
        </div>

        {/* 이전글 다음글 영역 */}
        <div className="notail-prev-next-btn-section">
          <div className="notail-prev-btn">
            <ul onClick={() => goPage(`/detail/${activeInfo.activePage}/${postDetail.prev.no}`)}>
              {
                postDetail.prev ?
                <>
                  <li>{ postDetail.prev.no }</li>
                  <li>{ postDetail.prev.title }</li>
                  <li>
                    {
                      postDetail &&postDetail.prev &&
                      postDetail.prev.date_time.split('T')[0]
                    }
                  </li>
                </>
                  
                // 글 없을 때 문구노출
                : 
                <>
                  <li>
                    이전 글 없습니다.
                  </li>
                </> 
              }
            </ul>
          </div>

          <div className="notail-next-btn">
            <ul onClick={() => goPage(`/detail/${activeInfo.activePage}/${postDetail.next.no}`)}>
              {
                postDetail.next ?
                <>
                  <li>{ postDetail.next.no }</li>
                  <li>{ postDetail.next.title }</li>
                  <li>
                    {
                      postDetail && postDetail.next &&
                      postDetail.next.date_time.split('T')[0]
                    }
                  </li>
                </>
                  
                // 글 없을 때 문구노출
                : 
                <>
                  <li>
                    다음 글 없습니다.
                  </li>
                </> 
              }
            </ul>
          </div>
        </div>

        {/* 목록버튼 */}
        <div className="notail-golist-btn">
          <button onClick={() => navigate(`/board/${activeInfo.activePage}`)}>목록</button>
        </div>
      </div>
    </>
  );
};

export default BoardDetailBody;
