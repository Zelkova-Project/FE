import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Section from '../components/Section';
import style from '../css/profile.module.css';
import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
    const [boardReport, setBoardReport] = useState(false)
    const imgObj = {
        board: require('../imgs/notice/notice-main.png'),
    };
    const reportBtn =() => {
        setBoardReport(!boardReport);
    }
  return (
    <div>
        <Nav/>
            <div className={style['container']}>
                <img className={style["main-img"]} src={'main-section.png'} alt="main-section"></img>
                <div className={style['wrap']}>
                    <div className={style['profile-info']}>
                        <label>
                            <div className={style['profile-my-img']}></div>
                            <div className={style['profile-name']}>
                                <div className={style['name']}>성한결</div>
                                <div className={style['protect']}>성혜리 보호자</div>
                                <span className={style['intro']}>자기소개 메세지</span>
                            </div>
                            <div className={style['profile-follow']}>
                                <label>
                                    <span className={style['follow']}>
                                        <span>1,234</span>
                                        <span>팔로우</span>
                                    </span>
                                    <span className={style['follower']}>
                                        <span>1,234</span>
                                        <span>팔로워</span>
                                    </span>
                                    <button className={style['follow-btn']}>팔로우</button>
                                </label>
                                </div>
                        </label>
                    </div> {/*profile-info*/}
                    <div className={style['profile-board']}>
                        <label>
                            <div className={style['profile-board-img']}></div>
                            <div className={style['profile-board-name']}>
                                <span className={style['name']}>성한결</span>
                            </div>
                        </label>
                        <div className={style['profile-board-list-img']}>
                            <div className={style['profile-board-img-report']} onClick={reportBtn}>신고</div>
                            {boardReport ?
                                <div className={style['report-open']}>
                                    <span>글 신고하기</span>
                                </div> : null
                            }
                            <img src={imgObj.board} alt={'board-img'}/>
                        </div>
                        <div className={style['profile-board-icon']}>
                            <span>댓글</span>
                            <span>하트</span>
                        </div>
                        <div className={style['profile-board-content']}>
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                        </div>
                        <div className={style['profile-board-date']}>
                            <span>2024.12.13 목요일</span>
                        </div>
                    </div>
                </div>
            </div>
        <Footer/>
    </div>
  );
};

export default ProfilePage;
