import style from '../css/memberFind.module.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from "react-modal";
import axios from '../axios/axiosInstance';
import React, {useEffect, useState} from 'react';

const MemberFindPage = () => {

    const navigate = useNavigate();

    const [idSelected, setIdSelected] = useState(false); //아이디 찾기 - 통신사 메뉴창
    const [idSelectVal, setIdSelectVal] = useState(''); // 아이디 찾기 - 통신사 값
    const [findSelect, setFindSelect] = useState(false); // false : 아이디 찾기, true : 비밀번호 찾기
    const [idVerifyMessage, setIdVerifyMessage ] = useState(''); // 아이디 찾기 - 인증번호 발송 메세지
    const [idFailVerifyMessage, setIdFailVerifyMessage ] = useState(''); // 아이디 찾기 - 인증번호 전송버튼 오류시
    const [idFailVerifyNumMessage, setIdFailVerifyNumMessage ] = useState(''); // 아이디 찾기 - 인증번호 확인 오류시
    const [idVerifyBtn, setIdVerifyBtn ] = useState(false); // 아이디 찾기 - 인증번호 전송버튼 클릭체크
    const [idVerifyNumBtn, setIdVerifyNumBtn ] = useState(false); // 아이디 찾기 - 인증번호 확인 클릭체크

    const [pwSelected, setPwSelected] = useState(false); // 비밀번호 찾기 - 통신사 메뉴창
    const [pwSelectVal, setPwSelectVal] = useState(''); // 비밀번호 찾기 - 통신사 값
    const [pwIdFailMessage, setPwIdFailMessage ] = useState(''); // 비밀번호 찾기 - 아이디 빈칸시
    const [pwVerifyMessage, setPwVerifyMessage ] = useState(''); // 아이디 찾기 - 인증번호 발송 메세지
    const [pwFailVerifyMessage, setPwFailVerifyMessage ] = useState(''); // 비밀번호 찾기 - 인증번호 전송버튼 오류시
    const [pwFailVerifyNumMessage, setPwFailVerifyNumMessage ] = useState(''); // 비밀번호 찾기 - 인증번호 확인 오류시
    const [pwVerifyBtn, setPwVerifyBtn ] = useState(false); // 비밀번호 찾기 - 인증번호 전송버튼 클릭체크
    const [pwVerifyNumBtn, setPwVerifyNumBtn ] = useState(false); // 비밀번호 찾기 - 인증번호 확인 클릭체크

    const [idFindModalOpen, setIdFindModalOpen] = useState(false); // 아이디 찾기 모달
    const [pwFindModalOpen, setPwFindModalOpen] = useState(false); // 비밀번호 찾기 모달

    const [idFindInfo, setIdFindInfo] = useState({
        name : '',
        agency : '',
        birth : '',
        phone : '',
        verify : '',
    });
    const [pwFindInfo, setPwFindInfo] = useState({
        id : '',
        name : '',
        phone : '',
        agency : '',
        birth : '',
        verify : '',
    });

    const imgObj = {
        googleLogin: require('../imgs/login/구글로그인.png'),
        kakaoLogin: require('../imgs/login/카카오로그인.png'),
        kakaoLoginIcon: require('../imgs/login/카카오로그인아이콘.png'),
        select : require('../imgs/join/select.png'),
    };

    // 리뷰쓰기 Modal1 스타일
    const idModalStyle = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: "100",
        },
        content: {
            width: "380px",
            height: "200px",
            margin: 'auto',
            WebkitOverflowScrolling: 'touch',
            background: '#fff',
            borderRadius: '10px',
            outline: 'none',
            padding: '20px',
            overflow: 'auto',
            zIndex: "102",
        },
    };

    const idSelectValue = (index) => {
        setIdSelectVal(index)
        setIdSelected(!idSelected)
        setIdFindInfo({...idFindInfo, agency: index.value});

    }
    const birthLengthChk = (e) => { // 아이디 찾기 - 생일 8자리제한
        if (e.target.value.length <= 8) {
            setIdFindInfo({...idFindInfo, birth: e.target.value});
        }
    };
    const pwBirthLengthChk = (e) => { // 비밀번호 찾기 - 생일 8자리제한
        if (e.target.value.length <= 8) {
            setPwFindInfo({...pwFindInfo, birth: e.target.value});
        }
    };
    const idVerifyLengthChk = (e) => { // 아이디 찾기 - 인증번호 4자리제한
        if (e.target.value.length <= 4) {
            setIdFindInfo({...idFindInfo, verify: e.target.value});
        }
    };
    const pwVerifyLengthChk = (e) => { // 비밀번호 찾기 - 인증번호 8자리제한
        if (e.target.value.length <= 4) {
            setPwFindInfo({...pwFindInfo, verify: e.target.value});
        }
    };
    const idVerifyTransmissionBtn = () => {
        if(idFindInfo.phone === ''){
            setIdFailVerifyMessage('가입된 전화번호가 아닙니다. 다시 입력해 주세요.')
            setIdVerifyMessage(null);
            return false;
        }else {
            setIdVerifyMessage('인증번호가 오지 않나요?');
            setIdFailVerifyMessage(null);
            setIdVerifyBtn(true)
        }
    }
    const idVerifyConfirmBtn = () => {
        if(idFindInfo.verify === ''){ // 인증번호칸이 빈칸일 경우 + 인증번호가 틀릴시
            setIdFailVerifyNumMessage('인증번호가 맞지 않습니다. 다시 입력해 주세요.')
            return false;
        }else{
            setIdFailVerifyNumMessage(null)
            setIdFailVerifyMessage(null);
            setIdVerifyNumBtn(true)
        }
        // 인증번호가 맞을지
        /*setIdFailVerifyNumMessage(null)
        setIdFailVerifyMessage(null);
        setIdVerifyNumBtn(true)
        */

    }

    const goIdFind = () => {
        if(idFindInfo.name === '') {
            document.getElementById('id-name').focus();
            return false;
        }
        if(idFindInfo.birth === '') {
            document.getElementById('id-birth').focus();
            return false;
        }
        if(idFindInfo.agency === '') {
            document.getElementById('id-agency').focus();
            return false;
        }
        if(idVerifyBtn === false || idVerifyNumBtn === false) {
            setIdFailVerifyNumMessage('인증번호가 맞지 않습니다. 다시 입력해 주세요.')
            return false;
        }else if(idVerifyBtn === true && idVerifyNumBtn === true){
            setIdFindModalOpen(true)
        }
    }
    const modalClose = () => {
        setIdFindModalOpen(false)
        setPwFindModalOpen(false)
    }
    const modalLogin = () => {
        navigate('/login')
    }


    const pwSelectValue = (index) => {
        setPwSelectVal(index)
        setPwSelected(!pwSelected)
        setPwFindInfo({...pwFindInfo, agency: index.value});

    }
    const pwVerifyTransmissionBtn = () => {
        if(pwFindInfo.phone === ''){
            setPwFailVerifyMessage('가입된 전화번호가 아닙니다. 다시 입력해 주세요.')
            setPwVerifyMessage(null);
            return false;
        }else {
            setPwVerifyMessage('인증번호가 오지 않나요?');
            setPwFailVerifyMessage(null);
            setPwVerifyBtn(true)
        }
    }
    const pwVerifyConfirmBtn = () => {
        if(pwFindInfo.verify === ''){ // 인증번호칸이 빈칸일 경우 + 인증번호가 틀릴시
            setPwFailVerifyNumMessage('인증번호가 맞지 않습니다. 다시 입력해 주세요.')
            return false;
        }else{
            setPwFailVerifyNumMessage(null)
            setPwFailVerifyMessage(null);
            setPwVerifyNumBtn(true)
        }
        // 인증번호가 맞을지
        /*setIdFailVerifyNumMessage(null)
        setIdFailVerifyMessage(null);
        setIdVerifyNumBtn(true)
        */

    }
    const goPwFind = () => {

        if(pwFindInfo.id === '') {
            setPwIdFailMessage('가입된 아이디가 아닙니다. 다시 입력해 주세요.');
            document.getElementById('pw-id').focus();
            return false;
        }else {
            setPwIdFailMessage(null)
        }
        if(pwFindInfo.name === '') {
            document.getElementById('pw-name').focus();
            return false;
        }
        if(pwFindInfo.birth === '') {
            document.getElementById('pw-birth').focus();
            return false;
        }
        if(pwFindInfo.agency === '') {
            document.getElementById('pw-agency').focus();
            return false;
        }
        if(pwVerifyBtn === false || pwVerifyNumBtn === false) {
            setPwFailVerifyNumMessage('인증번호가 맞지 않습니다. 다시 입력해 주세요.')
            return false;
        }else if(pwVerifyBtn === true && pwVerifyNumBtn === true){
            setPwFindModalOpen(true)
        }
    }
    return(
        <div className={style['container']}>
            <Nav/>
            {!findSelect ?
                // 아이디 찾기
                <div className={style['wrap']}>
                    <div className={style['main-title']}>
                        <div className={style['title-id-find1']}>아이디 찾기</div>
                        <div className={style['title-pw-find1']} onClick={() => setFindSelect(true)}>비밀번호 찾기</div>
                    </div>
                    <div className={style['find-form']}>
                        <div className={style['sub-title']}>가입하신 전화번호를 입력해주세요.</div>
                        <div className={style['find-item']}>
                            <div className={style['find-sub-item']}>
                                <input type={'text'} placeholder={'이름'} id={'id-name'} autoComplete={'off'} value={idFindInfo.name} onChange={e => setIdFindInfo({...idFindInfo, name: e.target.value})}/>
                            </div>
                        </div>
                        <div className={style['find-item']}>
                            <div className={style['find-sub-item']}>
                                <input type={'number'} placeholder={'생년월일(YYYYMMDD)'} id={'id-birth'} autoComplete={'off'} value={idFindInfo.birth} onChange={(e) => birthLengthChk(e)} maxLength={8}/>
                            </div>
                        </div>
                        <div className={style["find-item"]}>
                            <div className={style["find-sub-item"]}>
                                <input type={'text'} placeholder={'통신사 선택'} value={idSelectVal} id={'id-agency'} autoComplete={'off'}
                                       className={style['find-select']}
                                       onClick={() => {
                                           setIdSelected(!idSelected);
                                       }}>
                                </input>
                                <img src={imgObj.select} alt={'select'} className={style['find-select-img']}
                                     onClick={() => {
                                         setIdSelected(!idSelected);
                                     }}/>
                                {idSelected ?
                                    <ul className={style['find-option']}>
                                        <li className={style['option']} onClick={() => idSelectValue('SKT')}>SKT</li>
                                        <li className={style['option']} onClick={() => idSelectValue('KT')}>KT</li>
                                        <li className={style['option']} onClick={() => idSelectValue('LG U+')}>LG U+</li>
                                        <li className={style['option']} onClick={() => idSelectValue('SKT 알뜰폰')}>SKT 알뜰폰</li>
                                        <li className={style['option']} onClick={() => idSelectValue('KT 알뜰폰')}>KT 알뜰폰</li>
                                        <li className={style['option']} onClick={() => idSelectValue('LG U+ 알뜰폰')}>LG U+ 알뜰폰</li>
                                    </ul> : null
                                }
                            </div>
                        </div>
                        <div className={style['find-item1']}>
                            <div className={style['find-sub-item2']}>
                                <input type={'text'} placeholder={'전화번호 입력'} autoComplete={'off'} value={idFindInfo.phone} onChange={e => setIdFindInfo({...idFindInfo, phone: e.target.value})}/>
                                <button className={style['find-button']} onClick={idVerifyTransmissionBtn}>인증번호 전송</button>
                            </div>
                        </div>
                        <div className={style['find-item1']}>
                            <div className={style['find-sub-item2']}>
                                <input type={'number'} placeholder={'인증번호 4자리 입력'} autoComplete={'off'} onChange={(e) => idVerifyLengthChk(e)} maxLength={4}
                                       value={idFindInfo.verify}/>
                                <button className={style['find-button']} onClick={idVerifyConfirmBtn}>확인</button>
                            </div>
                        </div>
                    </div>
                    <span className={style['id-verify-message']}>{idVerifyMessage}</span>
                    <span className={style['id-fail-verify-message']}>{idFailVerifyMessage}</span>
                    <span className={style['id-fail-verify-num-message']}>{idFailVerifyNumMessage}</span>

                    <div className={style["find-btn-wrap"]}>
                        <button className={style["find-btn"]} onClick={() => goIdFind()}>확인</button>
                    </div>
                <Modal isOpen={idFindModalOpen} ariaHideApp={false} style={idModalStyle}>
                    <div className={style['modal-wrap']}>
                        <div className={style['modal-title']}>아이디 찾기</div>
                        <div className={style['modal-text1']}>성한결 님의 아이디는 </div>
                        <div className={style['modal-text2']}><span>test11</span> 입니다.</div>
                        <div className={style['modal-button-wrap']}>
                            <button className={style['modal-close']} onClick={modalClose}>닫기</button>
                            <button className={style['modal-login']} onClick={modalLogin}>로그인</button>
                        </div>
                    </div>
                </Modal>
                </div>
                :
                // 비밀번호 찾기
                <div className={style['wrap']}>
                    <div className={style['main-title']}>
                        <div className={style['title-id-find2']} onClick={() => setFindSelect(false)}>아이디 찾기</div>
                        <div className={style['title-pw-find2']}>비밀번호 찾기</div>
                    </div>
                    <div className={style['find-form']}>
                        <div className={style['sub-title']}>가입하신 아이디, 전화번호를 입력해주세요.</div>
                        <div className={style['find-item']}>
                            <div className={style['find-sub-item']}>
                                <input type={'text'} placeholder={'아이디'} autoComplete={'off'} id={'pw-id'}
                                       value={pwFindInfo.id}
                                       onChange={e => setPwFindInfo({...pwFindInfo, id: e.target.value})}/>
                            </div>
                            <span className={style['fail-message']}>{pwIdFailMessage}</span>
                        </div>
                        <div className={style['find-item']}>
                            <div className={style['find-sub-item']}>
                                <input type={'text'} placeholder={'이름'} id={'pw-name'} autoComplete={'off'}
                                       className={style['find-name']} value={pwFindInfo.name}
                                       onChange={e => setPwFindInfo({...pwFindInfo, name: e.target.value})}/>
                            </div>
                        </div>
                        <div className={style['find-item']}>
                            <div className={style['find-sub-item']}>
                                <input type={'number'} placeholder={'생년월일(YYYYMMDD)'} id={'pw-birth'}
                                       autoComplete={'off'} value={pwFindInfo.birth}
                                       onChange={(e) => pwBirthLengthChk(e)} maxLength={8}/>
                            </div>
                        </div>
                        <div className={style["find-item"]}>
                            <div className={style["find-sub-item"]}>
                                <input type={'text'} placeholder={'통신사 선택'} value={pwSelectVal} autoComplete={'off'}
                                       className={style['find-select']} id={'pw-agency'}
                                       onClick={() => {
                                           setPwSelected(!pwSelected);
                                       }}>
                                </input>
                                <img src={imgObj.select} alt={'select'} className={style['find-select-img']}
                                     onClick={() => {
                                         setPwSelected(!pwSelected);
                                     }}/>
                                {pwSelected ?
                                    <ul className={style['find-option']}>
                                        <li className={style['option']} onClick={() => pwSelectValue('SKT')}>SKT</li>
                                        <li className={style['option']} onClick={() => pwSelectValue('KT')}>KT</li>
                                        <li className={style['option']} onClick={() => pwSelectValue('LG U+')}>LG U+
                                        </li>
                                        <li className={style['option']} onClick={() => pwSelectValue('SKT 알뜰폰')}>SKT
                                            알뜰폰
                                        </li>
                                        <li className={style['option']} onClick={() => pwSelectValue('KT 알뜰폰')}>KT 알뜰폰
                                        </li>
                                        <li className={style['option']} onClick={() => pwSelectValue('LG U+ 알뜰폰')}>LG U+
                                            알뜰폰
                                        </li>
                                    </ul> : null
                                }
                            </div>
                        </div>
                        <div className={style['find-item1']}>
                            <div className={style['find-sub-item2']}>
                                <input type={'text'} placeholder={'전화번호 입력'} autoComplete={'off'}
                                       value={pwFindInfo.phone}
                                       onChange={e => setPwFindInfo({...pwFindInfo, phone: e.target.value})}/>
                                <button className={style['find-button']} onClick={pwVerifyTransmissionBtn}>인증번호 전송
                                </button>
                            </div>
                        </div>
                        <div className={style['find-item1']}>
                            <div className={style['find-sub-item2']}>
                                <input type={'number'} placeholder={'인증번호 4자리 입력'} autoComplete={'off'}
                                       onChange={(e) => pwVerifyLengthChk(e)} maxLength={4}
                                       value={pwFindInfo.verify}/>
                                <button className={style['find-button']} onClick={pwVerifyConfirmBtn}>확인</button>
                            </div>
                        </div>
                    </div>
                    <span className={style['id-verify-message']}>{pwVerifyMessage}</span>
                    <span className={style['id-fail-verify-message']}>{pwFailVerifyMessage}</span>
                    <span className={style['id-fail-verify-num-message']}>{pwFailVerifyNumMessage}</span>
                    <div className={style["find-btn-wrap"]}>
                        <button className={style["find-btn"]} onClick={goPwFind}>확인</button>
                    </div>
                    <Modal isOpen={pwFindModalOpen} ariaHideApp={false} style={idModalStyle}>
                        <div className={style['modal-wrap']}>
                            <div className={style['modal-title']}>비밀번호 찾기</div>
                            <div className={style['modal-text1']}>성한결 님의 비밀번호는 </div>
                            <div className={style['modal-text2']}><span>test11</span> 입니다.</div>
                            <div className={style['modal-button-wrap']}>
                                <button className={style['modal-close']} onClick={modalClose}>닫기</button>
                                <button className={style['modal-login']} onClick={modalLogin}>로그인</button>
                            </div>
                        </div>
                    </Modal>
                </div>
            }

            <div className={style['other-find-form']}>
                <div className={style["other-find"]}>
                    <p>다른 방법으로 로그인</p>
                </div>

                <div className={style["social-find"]}>
                <div>
                            <img src={imgObj.kakaoLoginIcon}/>
                        </div>
                        <div>
                            <img src={imgObj.googleLogin}/>
                        </div>
                    </div>

                    <div className={style['find-options']}>
                        <ul className={style['options-ul']}>
                            <li onClick={() => navigate('/join')}>회원가입</li>
                            <li>아이디 / 비밀번호 찾기</li>
                            <li onClick={() => navigate('/chat')}>문의하기</li>
                        </ul>
                    </div>
                </div>
            <div style={{marginBottom: '100px'}}/>
            <Footer/>
        </div>

    );
};
export default MemberFindPage;


