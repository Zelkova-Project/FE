import style from '../css/idfind.module.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';

import axios from '../axios/axiosInstance';
import React, {useEffect, useState} from 'react';

const IdFindPage = () => {
    return(
        <div className={style['container']}>
            <Nav/>
            <div className={style['wrap']}>
                <div className={style['main-title']}>
                    <div className={style['title-id-find']}>아이디 찾기</div>
                    <div className={style['title-pw-find']}>비밀번호 찾기</div>
                </div>
                <div className={style['id-find-form']}>
                    <div className={style['sub-title']}>가입하신 전화번호를 입력해주세요.</div>
                    <div>
                        <input type={'text'}/>

                    </div>
                </div>
            </div>
            <Footer/>
        </div>

    );
};
export default IdFindPage;


