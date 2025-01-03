import { useLocation, useParams } from 'react-router';
import { useNavigate } from 'react-router';
import React, { useState, useEffect } from 'react';

import { useRecoilState } from 'recoil';
import { activeInfoState, userInfoState } from '@/common/recoilState/recoil';

import '@/pc/css/noticeDetail.css';

import useAxiosInsance from '@/common/axios/axiosInstance';

import DOMPurify from 'dompurify';
import { getCookie } from '../../../common/utils/loginUtil';

const BoardDetailBody = () => {
  const axios = useAxiosInsance();
  const { bno } = useParams();
  const navigate = useNavigate();

  const SERVER_URL = process.env.NODE_ENV == 'development' ? 'http://localhost:8080/api' : '/api';

  const [postDetail, setPostDetail] = useState({});
  const [commentInfo, setCommentInfo] = useState('');
  const [isShowFile, setIsShowFile] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeInfo, setActiveInfo] = useRecoilState(activeInfoState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [commentLikedUserList, setCommentLikedUserList] = useState([]);

  const imgObj = {
    comment: require('@/common/imgs/notice/notail-comment.png'),
    notailLike: require('@/common/imgs/notice/notail-like.png'),
    notice: require('@/common/imgs/notice/notice-main.png'),
    home: require('@/common/imgs/notice/가정통신문main.png'),
    hire: require('@/common/imgs/notice/채용안내main.png'),
    defaultProfile: require('@/common/imgs/default-profile-img-2.png'),
  };

  const getLikedUserList = async () => {
    return await axios.get('/comment/likedUserList/' + bno);
  }

  const getCommentList = async () => {
    return await axios.get('/comment/' + bno);
  }

  const manipulateCommentInfo = async ([likedInfo, commentInfo]) => {
    console.log('likedInfo ', likedInfo);
    console.log('commentInfo ', commentInfo);
    let likedList = likedInfo?.data ?? [];
    let commentList = commentInfo.data ?? [];

    commentList = commentList.map((item, idx) => {
      return {
        ...item,
      }
    });

    setCommentList(commentList);
    setCommentLikedUserList(likedList);
  }

  const fetchData = async () => {
    try {
      let { status, data, message } = await axios.get('/board/' + bno);
      setPostDetail(data);

      const res = await Promise.all([
        getLikedUserList(),
        getCommentList()
      ]);

      await manipulateCommentInfo(res);

      setLoading(false);
      window.scrollTo(0, 400);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isReload]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const enrollComment = async () => {
    if (!commentInfo || commentInfo.trim() == '') {
      alert('댓글을 입력해주세요!');
      return;
    }
    const nowtime = new Date();
    const year = nowtime.getFullYear();
    let month = nowtime.getMonth() + 1;
    let date = nowtime.getDate();

    month = month < 10 ? '0' + month : month;
    date = date < 10? '0' + date : date;
    
    console.log('axios >>>> ', axios)

    let { status, data, message } = await axios.post('/comment/', {
      bno: bno,
      content: commentInfo,
      dueDate: `${year}-${month}-${date}`,
      writer: userInfo.nickname
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
  };

  const goDownload = (fileName) => {
    downloadPDF(fileName);
  }

  const downloadPDF = (fileName) => {
    fetch(`${SERVER_URL}/files/download/${fileName}`)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName); // Set the file name
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch(error => console.error('Error downloading PDF:', error));
  };

  const deleteBoard = async () => {
    const 게시글삭제원해 = confirm("정말 게시글을 삭제하시겠습니까?");

    if (!게시글삭제원해) {
      return;
    }

    const res = await axios.delete(`/board/${postDetail.bno}`);
    alert("삭제되었습니다!");

    navigate(`/board/${activeInfo.activePage}`);
  }

  const likeComment = async (cInfo) => {
    if (!userInfo?.accessToken) {
      alert("로그인 후 가능합니다");
      return;
    }

    await axios.put(`/comment/like/${cInfo.cno}`);

    const {data: list, message, error} = await getLikedUserList();

    if (error) {
      alert(message);
      return;
    }

    setCommentLikedUserList(list);
  }
  
  const isActiveLiked = (idx) => {
    if (isNaN(idx)) return false;
    return commentLikedUserList[idx].includes(userInfo.email);
  }

   const getLikedCounts = (idx) => {
     return commentLikedUserList[idx] && commentLikedUserList[idx].length;
   }

   const delComment= async (cno) => {
    const 삭제원해 = confirm('댓글을 정말 삭제하시겠습니까? ');
    if (!삭제원해) return;


    const res = await axios.delete(`/comment/${cno}`);
    if (res.data?.result) {
      alert(res.data?.result);
    }

    fetchData();
   }

   const CommentItem = ({item, idx}) => {
    return (
      <>
        {/* 댓글하나 시작 */}
        <div className="notail-comment-list-item" key={`${idx}-comment`}>
          <div className="notail-comment-list-item-profile">
            <img src={imgObj.defaultProfile}></img>
          </div>

          {/* 댓글 중 중간 영역 */}
          <div className="notail-comment-list-item-main-area">
            {/* 댓글이름 */}
            <div className="notail-comment-item-name">
              <h3>{item.writer}</h3>
            </div>

            {/* 댓글본문 */}
            <div className="notail-comment-item-content">
              <p>{item.content}</p>
            </div>

            {/* 날짜,신고하기,답글달기 */}
            <div className="notail-comment-item-details">
              <p>{item.dueDate}</p>
              {
                (userInfo?.nickname || '') == item.writer ?
                <>
                  <p>수정하기</p>
                  <p onClick={() => delComment(item.cno)}>삭제하기</p>
                </>
                : ''
              }
              
            </div>
          </div>

          <div className="notail-comment-like">
            <div className="notail-comment-like-icon" onClick={() => likeComment(item)}>
              <button className={`notail-comment-like-btn ${isActiveLiked(idx) ? 'like' : 'nolike'}`}/>
            </div>
            <div className="notail-comment-like-count">
              <p style={{textAlign:'center'}}>{getLikedCounts(idx)}</p>
            </div>
          </div>
        </div>
      </>
    )
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
                <h3 className='textellipsis'>
                  {postDetail && postDetail.title}
                </h3>
              </li>
              <li>
                <div>
                  <span>
                    {postDetail?.dueDate !=null && postDetail.dueDate}
                  </span>
                  <span>
                    {postDetail.writer !=null && postDetail.writer == undefined ? '느티나무유저' : postDetail.writer}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 제목,본문 영역 */}
        <div className="notail-content-section">
          <div className="notail-content">
            <h2 className='textellipsis'>
              {postDetail && postDetail.title}
            </h2>
            {
              postDetail?.uploadFileNames != null && postDetail.uploadFileNames.length > 0 && (
                <div className='notail-files'>
                  <span onClick={() => setIsShowFile(!isShowFile)}>첨부파일 모아보기</span>
                  {
                    isShowFile && 
                    (
                      <div className="notail-files-list">
                        <ul>
                          {
                            postDetail.uploadFileNames.map((fileName, idx) => (
                              <li key={fileName + idx}>
                                {/* <button onClick={() => downloadPDF(fileName)}>{fileName}</button> */}
                                <span onClick={() => goDownload(fileName)}>{fileName}</span>
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    )
                  }
                </div>
              )
            }
            
            <p>
              {postDetail && (
                <div
                  style={{
                    whiteSpace: 'normal',
                  }}
                  id="editor"
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
            {/* 임시주석 */}
            {/* <p>댓글 ({commentList.length})</p> */}
            <p>댓글 {commentList.length}</p>
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
                autoComplete={'off'}
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
            {commentList.map((item, idx) => (
              <CommentItem key={item.cno} item={item} idx={idx}/>
            ))}
            {/* 댓글끝 */}
            {/* {result} */}
          </div>
        </div>

        {/* 이전글 다음글 영역 */}
        {/* <div className="notail-prev-next-btn-section">
          <div className="notail-prev-btn">
            <ul onClick={() => goPage(`/detail/${activeInfo.activePage}/${postDetail.prev.no}`)}>
              {postDetail.prev ? (
                <>
                  <li>{postDetail.prev.no}</li>
                  <li>{postDetail.prev.title}</li>
                  <li>
                    {postDetail && postDetail.prev && postDetail.prev.date_time.split('T')[0]}
                  </li>
                </>
              ) : (
                // 글 없을 때 문구노출
                <>
                  <li>이전 글 없습니다.</li>
                </>
              )}
            </ul>
          </div>

          <div className="notail-next-btn">
            <ul onClick={() => goPage(`/detail/${activeInfo.activePage}/${postDetail.next.no}`)}>
              {postDetail.next ? (
                <>
                  <li>{postDetail.next.no}</li>
                  <li>{postDetail.next.title}</li>
                  <li>
                    {postDetail && postDetail.next && postDetail.next.date_time.split('T')[0]}
                  </li>
                </>
              ) : (
                // 글 없을 때 문구노출
                <>
                  <li>다음 글 없습니다.</li>
                </>
              )}
            </ul>
          </div>
        </div> */}

        {/* 목록버튼 */}
        <div className="notail-golist-btn">
          {
            userInfo.nickname == postDetail.writer && (
              <button className='delBtn' onClick={() => deleteBoard()}>삭제</button>
            )
          }
          <button className="listBtn" onClick={() => navigate(`/board/${activeInfo.activePage}`)}>목록</button>
        </div>
      </div>
    </>
  );
};

export default BoardDetailBody;









