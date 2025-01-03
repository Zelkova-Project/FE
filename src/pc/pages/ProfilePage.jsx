import Nav from '@/pc/components/Nav';
import Footer from '@/pc/components/Footer';
import style from '@/pc/css/profile.module.css';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router';
import useAxiosInsance from '@/common/axios/axiosInstance';

const ProfilePage = () => {
  const navigate = useNavigate();
  const axios = useAxiosInsance();


  const [boardReport, setBoardReport] = useState(false);
  const [reportCheckModal, setReportCheckModal] = useState(false); // 신고하기 모달
  const [reportCauseModal, setReportCauseModal] = useState(false); // 신고사유 모달
  const [reportFinishModal, setReportFinishModal] = useState(false); // 신고완료 모달
  const [followModal, setFollowModal] = useState(false); // 팔로우 모달
  const [followerModal, setFollowerModal] = useState(false); // 팔로워 모달
  const [reportCategory, setReportCategory] = useState('');
  const [reportCategoryText, setReportCategoryText] = useState('');
  const [commentWriteTxt, setCommentWriteTxt] = useState('');
  const [profileImageName, setProfileImageName] = useState(''); // 프로필 이미지 값
  const [imageUrl, setImageUrl] = useState(''); // 프로필 prefix 경로 값

  const [reportAccept, setReportAccept] = useState('');

  const [follow, setFollow] = useState(false);
  const [boardFavorite, setBoardFavorite] = useState(false);
  const [commentFavorite, setCommentFavorite] = useState(false);
  const imgObj = {
    board: require('@/common/imgs/notice/notice-main.png'),
  };
  const reportBtn = () => {
    setBoardReport(!boardReport);
  };

  const followModalStyle = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      zIndex: '100',
    },
    content: {
      width: '380px',
      height: '560px',
      margin: 'auto',
      WebkitOverflowScrolling: 'touch',
      background: '#fff',
      borderRadius: '20px',
      outline: 'none',
      padding: '25px 30px 15px 30px',
      overflow: 'auto',
    },
  };
  const followerModalStyle = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      zIndex: '100',
    },
    content: {
      width: '380px',
      height: '560px',
      margin: 'auto',
      WebkitOverflowScrolling: 'touch',
      background: '#fff',
      borderRadius: '20px',
      outline: 'none',
      padding: '25px 30px 15px 30px',
      overflow: 'auto',
    },
  };

  const reportCheckModalStyle = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      zIndex: '100',
    },
    content: {
      width: '320px',
      height: '180px',
      margin: 'auto',
      WebkitOverflowScrolling: 'touch',
      background: '#fff',
      borderRadius: '10px',
      outline: 'none',
      padding: '20px',
      overflow: 'auto',
    },
  };
  const reportCauseModalStyle = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      zIndex: '100',
    },
    content: {
      width: '380px',
      height: '460px',
      margin: 'auto',
      WebkitOverflowScrolling: 'touch',
      background: '#fff',
      borderRadius: '20px',
      outline: 'none',
      padding: '25px 30px 15px 30px',
      overflow: 'auto',
    },
  };
  const reportFinishModalStyle = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      zIndex: '100',
    },
    content: {
      width: '320px',
      height: '180px',
      margin: 'auto',
      WebkitOverflowScrolling: 'touch',
      background: '#fff',
      borderRadius: '20px',
      outline: 'none',
      padding: '25px 30px 15px 30px',
      overflow: 'auto',
    },
  };
  
  useEffect(() => {
    axios.get("/profile/getProfile").then(({status, data}) => {
      if (status != 200) console.error("error !! ", this);

      const imageName = data?.profileImageName || '';
      setProfileImageName(imageName);

      const SERVER_URL = process.env.NODE_ENV == 'development' ? 'http://localhost:8080/api' : '/api';
      setImageUrl(SERVER_URL + "/image/view/");
    })
  }, []);

  const goReportCheck = () => {
    setBoardReport(false);
    setReportCauseModal(true);
  };
  const goReportCancel = () => {
    setBoardReport(false);
    setReportCheckModal(false);
  };
  const reportChoice = (e) => {
    if (
      e.target.value === '비방 및 욕설' ||
      e.target.value === '증오심 표현' ||
      e.target.value === '성적 수치심을 일으키는 표현'
    ) {
      setReportCategory(e.target.value);
      setReportCategoryText('');
    } else {
      setReportCategory(null);
      setReportCategoryText(e.target.value);
    }
  };
  const goReportCauseCancel = () => {
    setReportCauseModal(false);
    setReportCheckModal(false);
  };
  const goReportCause = () => {
    setReportFinishModal(true);
  };
  const goReportFinish = () => {
    location.reload();
  };
  const unFollow = () => {
    setFollow(!follow);
  };
  const Follow = () => {
    setFollow(!follow);
  };
  const followCancel = () => {
    setFollowModal(false);
  };
  const followRegster = () => {
    setFollowModal(false);
  };
  const followerCancel = () => {
    setFollowerModal(false);
  };
  const followerRegster = () => {
    setFollowerModal(false);
  };
  const commentWrite = () => {
    if (commentWriteTxt === '' || commentWriteTxt === null) {
      document.getElementById('commentWriteTxt').style.border = '1px solid #ff8888';
      setTimeout(function () {
        document.getElementById('commentWriteTxt').style.border = '1px solid #f2f2f2';
      }, 3000);
      return false;
    } else {
      document.getElementById('commentWriteTxt').style.border = '1px solid #f2f2f2';
    }
  };
  return (
    <div>
      <Nav />
      <div className={style['container']}>
        <img className={style['main-img']} src={'main-section.png'} alt="main-section"></img>
        <div className={style['wrap']}>
          <div className={style['profile-info']}>
            <label>
              <div className={style['profile-my-img']}>
                <img
                  className={style['default-profile-img']}
                  src={profileImageName ? imageUrl + profileImageName : '/default-profile-img.png'}
                  alt={'프로필사진'}
                />
                <div className={style['profile-setup']}>
                  <img src={'setup.png'} alt={'설정'} onClick={() => navigate('/profileSetup')} />
                </div>
              </div>
              <div className={style['profile-name']}>
                <div className={style['name']}>성한결</div>
                <div className={style['protect']}>성혜리 보호자</div>
                <span className={style['intro']}>자기소개 메세지</span>
              </div>
              <div className={style['profile-follow']}>
                <span className={style['follow']} onClick={() => setFollowModal(true)}>
                  <span>1,234명</span>
                  <span>친구</span>
                </span>
                <span className={style['follower']} onClick={() => setFollowerModal(true)}>
                  <span>1,234명</span>
                  <span>친한 친구</span>
                </span>
              </div>
            </label>
            <div className={style['follow-btn-wrap']}>
              {follow ? (
                <button className={style['unfollow-btn']} onClick={() => unFollow()}>
                  친구
                </button>
              ) : (
                <button className={style['follow-btn']} onClick={() => Follow()}>
                  친구 맺기
                </button>
              )}
            </div>
          </div>
          <Modal isOpen={followModal} ariaHideApp={false} style={followModalStyle}>
            <div className={style['follow-modal-wrap']}>
              <div className={style['follow-modal-title']}>
                <span className={style['title']}>팔로우 리스트</span>
                <span className={style['close']}>
                  <img src={'/close.png'} alt={'닫기'} onClick={followCancel} />
                </span>
              </div>
              <div className={style['follow-modal-text']}>
                <label>
                  <img src={'/search.png'} alt={'찾기'} />
                  <input type={'text'} placeholder={'이름을 입력하세요.'} />
                </label>
              </div>
            </div>
            <div className={style['follow-modal-list']}>
              <div className={style['list']}>
                <label>
                  <div className={style['profile']}></div>
                  <span className={style['name']}>성한결</span>
                  <button className={style['button']}>팔로우</button>
                </label>
              </div>
              <div className={style['list']}>
                <label>
                  <div className={style['profile']}></div>
                  <span className={style['name']}>성한결</span>
                  <button className={style['button']}>채팅</button>
                </label>
              </div>
              <div className={style['list']}>
                <label>
                  <div className={style['profile']}></div>
                  <span className={style['name']}>성한결</span>
                  <button className={style['button']}>팔로우</button>
                </label>
              </div>
              <div className={style['list']}>
                <label>
                  <div className={style['profile']}></div>
                  <span className={style['name']}>성한결</span>
                  <button className={style['button']}>채팅</button>
                </label>
              </div>
              <div className={style['list']}>
                <label>
                  <div className={style['profile']}></div>
                  <span className={style['name']}>성한결</span>
                  <button className={style['button']}>팔로우</button>
                </label>
              </div>
              <div className={style['list']}>
                <label>
                  <div className={style['profile']}></div>
                  <span className={style['name']}>성한결</span>
                  <button className={style['button']}>채팅</button>
                </label>
              </div>
              <div className={style['list']}>
                <label>
                  <div className={style['profile']}></div>
                  <span className={style['name']}>성한결</span>
                  <button className={style['button']}>팔로우</button>
                </label>
              </div>
              <div className={style['list']}>
                <label>
                  <div className={style['profile']}></div>
                  <span className={style['name']}>성한결</span>
                  <button className={style['button']}>채팅</button>
                </label>
              </div>
            </div>
            <div className={style['follow-modal-button-wrap']}>
              <button className={style['follow-modal-close']} onClick={followCancel}>
                취소
              </button>
              <button className={style['follow-modal-report']} onClick={followRegster}>
                만들기
              </button>
            </div>
          </Modal>
          <Modal isOpen={followerModal} ariaHideApp={false} style={followerModalStyle}>
            <div className={style['follower-modal-wrap']}>
              <div className={style['follower-modal-title']}>
                <span className={style['title']}>팔로우 리스트</span>
                <span className={style['close']}>
                  <img src={'/close.png'} alt={'닫기'} onClick={followerCancel} />
                </span>
              </div>
              <div className={style['follower-modal-text']}>
                <label>
                  <img src={'/search.png'} alt={'찾기'} />
                  <input type={'text'} placeholder={'이름을 입력하세요.'} />
                </label>
              </div>
            </div>
            <div className={style['follower-modal-list']}>
              <div className={style['list']}>
                <label>
                  <div className={style['profile']}></div>
                  <span className={style['name']}>성한결</span>
                  <button className={style['button']}>팔로우</button>
                </label>
              </div>
              <div className={style['list']}>
                <label>
                  <div className={style['profile']}></div>
                  <span className={style['name']}>성한결</span>
                  <button className={style['button']}>채팅</button>
                </label>
              </div>
            </div>
            <div className={style['follower-modal-button-wrap']}>
              <button className={style['follower-modal-close']} onClick={followerCancel}>
                취소
              </button>
              <button className={style['follower-modal-report']} onClick={followerRegster}>
                만들기
              </button>
            </div>
          </Modal>
          {/*profile-info*/}
          <div className={style['profile-board']}>
            <label>
              <div className={style['profile-board-img']}></div>
              <div className={style['profile-board-name']}>
                <span className={style['name']}>성한결</span>
              </div>
            </label>
            <div className={style['profile-board-list-img']}>
              <div className={style['profile-board-img-report']}>
                <img
                  className={style['img1']}
                  src={'report-menu.png'}
                  onClick={reportBtn}
                  alt={'메뉴'}
                />
                {boardReport ? (
                  <div className={style['report-open']}>
                    <span
                      onClick={() => {
                        setReportCheckModal(true);
                        setBoardReport(false);
                      }}
                    >
                      글 신고하기
                    </span>
                  </div>
                ) : null}
              </div>
              <img src={imgObj.board} alt={'board-img'} />
            </div>
            <div className={style['profile-board-icon']}>
              <label>
                <span>
                  <img src={'comment.png'} alt={'댓글'} />
                </span>
                {!boardFavorite ? (
                  <span>
                    <img
                      src={'favoriteDefault.png'}
                      alt={'하트'}
                      onClick={() => setBoardFavorite(!boardFavorite)}
                    />
                  </span>
                ) : (
                  <span>
                    <img
                      src={'favorite.png'}
                      alt={'하트'}
                      onClick={() => setBoardFavorite(!boardFavorite)}
                    />
                  </span>
                )}
              </label>
            </div>
            <div className={style['profile-board-content']}>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum
                dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.
              </span>
            </div>
            <div className={style['profile-board-date']}>
              <span>2024.12.13 목요일</span>
            </div>
          </div>{' '}
          {/*profile-board*/}
          <Modal isOpen={reportCheckModal} ariaHideApp={false} style={reportCheckModalStyle}>
            <div className={style['report-modal-check-wrap']}>
              <div className={style['report-modal-check-title']}>신고하기</div>
              <div className={style['report-modal-check-text1']}>
                성한결 님을 신고하시겠습니까?{' '}
              </div>
              <div className={style['report-modal-check-text2']}>
                <span>신고는 철회할 수 없습니다.</span>
              </div>
              <div className={style['report-modal-check-button-wrap']}>
                <button className={style['report-modal-check-report']} onClick={goReportCheck}>
                  신고
                </button>
                <button className={style['report-modal-check-cancel']} onClick={goReportCancel}>
                  취소
                </button>
              </div>
            </div>
          </Modal>
          <Modal isOpen={reportCauseModal} ariaHideApp={false} style={reportCauseModalStyle}>
            <div className={style['report-modal-cause-wrap']}>
              <div className={style['report-modal-cause-title']}>
                <span className={style['title']}>신고 사유</span>
                <span className={style['close']}>
                  <img src={'/close.png'} alt={'닫기'} onClick={goReportCauseCancel} />
                </span>
              </div>
              <div className={style['report-modal-cause-text']}>
                <label>
                  <span className={style['text']}>비방 및 욕설</span>
                  <span>
                    <input
                      type="radio"
                      value={'비방 및 욕설'}
                      onChange={(e) => reportChoice(e)}
                      checked={reportCategory === '비방 및 욕설'}
                    />
                  </span>
                </label>
                <label>
                  <span className={style['text']}>증오심 표현</span>
                  <input
                    type="radio"
                    value={'증오심 표현'}
                    onChange={(e) => reportChoice(e)}
                    checked={reportCategory === '증오심 표현'}
                  />
                </label>
                <label>
                  <span className={style['text']}>성적 수치심을 일으키는 표현</span>
                  <input
                    type="radio"
                    value={'성적 수치심을 일으키는 표현'}
                    onChange={(e) => reportChoice(e)}
                    checked={reportCategory === '성적 수치심을 일으키는 표현'}
                  />
                </label>
                <div className={style['text-default']}>기타</div>
                <textarea
                  className={style['text-textarea']}
                  value={reportCategoryText}
                  onChange={(e) => reportChoice(e)}
                ></textarea>
              </div>

              <div className={style['report-modal-cause-button-wrap']}>
                <button className={style['report-modal-cause-close']} onClick={goReportCauseCancel}>
                  취소
                </button>
                <button className={style['report-modal-cause-report']} onClick={goReportCause}>
                  신고
                </button>
              </div>
            </div>
          </Modal>
          <Modal isOpen={reportFinishModal} ariaHideApp={false} style={reportFinishModalStyle}>
            <div className={style['report-modal-finish-wrap']}>
              <div className={style['report-modal-finish-title']}>신고하기</div>
              <div className={style['report-modal-finish-text1']}>신고가 완료되었습니다.</div>
              <div className={style['report-modal-finish-text1']}>
                상대방은 회원님이 신고한 것을 알 수 없습니다.
              </div>
              <div className={style['report-modal-finish-button-wrap']}>
                <button className={style['report-modal-finish-report']} onClick={goReportFinish}>
                  확인
                </button>
              </div>
            </div>
          </Modal>
          <div className={style['profile-comment']}>
            <div className={style['profile-comment-title']}>
              <span className={style['title']}>댓글 (128)</span>
            </div>
            <div className={style['profile-comment-insert']}>
              <label>
                <div className={style['profile-comment-img']}></div>
                <input
                  type={'text'}
                  placeholder={'댓글을 입력하세요.'}
                  id={'commentWriteTxt'}
                  onChange={(e) => setCommentWriteTxt(e.target.value)}
                />
                <button className={style['profile-comment-btn']} onClick={commentWrite}>
                  작성
                </button>
              </label>
            </div>
            <div className={style['profile-comment-list']}>
              <label>
                <div className={style['profile-comment-list-img']}></div>
                <div className={style['profile-comment-list-txt']}>
                  <div className={style['profile-comment-list-name']}>
                    <span>성한결</span>
                  </div>
                  <div className={style['profile-comment-list-content']}>
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                      consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                      commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </span>
                  </div>
                  <div className={style['profile-comment-list-date']}>
                    <span>2024.12.13 목요일</span>
                    <span>신고하기</span>
                    <span>답글하기</span>
                  </div>
                </div>
                <div className={style['profile-comment-list-like']}>
                  <div className={style['profile-comment-list-like-img']}>
                    {!commentFavorite ? (
                      <span>
                        <img
                          src={'favoriteDefault.png'}
                          alt={'하트'}
                          onClick={() => setCommentFavorite(!commentFavorite)}
                        />
                        1,234
                      </span>
                    ) : (
                      <span>
                        <img
                          src={'favorite.png'}
                          alt={'하트'}
                          onClick={() => setCommentFavorite(!commentFavorite)}
                        />
                        1,234
                      </span>
                    )}
                  </div>
                </div>
              </label>
            </div>
            <div className={style['profile-comment-list']}>
              <label>
                <div className={style['profile-comment-list-img']}></div>
                <div className={style['profile-comment-list-txt']}>
                  <div className={style['profile-comment-list-name']}>
                    <span>성한결</span>
                  </div>
                  <div className={style['profile-comment-list-content']}>
                    <span>짧은글짧은글짧은글짧은글짧은글짧은글짧은글</span>
                  </div>
                  <div className={style['profile-comment-list-date']}>
                    <span>2024.12.13 목요일</span>
                    <span>신고하기</span>
                    <span>답글하기</span>
                  </div>
                </div>
                <div className={style['profile-comment-list-like']}>
                  <div className={style['profile-comment-list-like-img']}>
                    {!commentFavorite ? (
                      <span>
                        <img
                          src={'favoriteDefault.png'}
                          alt={'하트'}
                          onClick={() => setCommentFavorite(!commentFavorite)}
                        />
                        1,234
                      </span>
                    ) : (
                      <span>
                        <img
                          src={'favorite.png'}
                          alt={'하트'}
                          onClick={() => setCommentFavorite(!commentFavorite)}
                        />
                        1,234
                      </span>
                    )}
                  </div>
                </div>
              </label>
            </div>
          </div>{' '}
          {/*profile-comment*/}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;

