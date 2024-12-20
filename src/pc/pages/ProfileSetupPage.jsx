import Nav from '@/pc/components/Nav';
import Footer from '@/pc/components/Footer';
import style from '@/pc/css/profileSetup.module.css';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userInfoState } from '@/common/recoilState/recoil';
import { useNavigate } from 'react-router';
import { transferWebp } from '@/common/utils/fileUtil';
import useAxiosInsance from '@/common/axios/axiosInstance';

const ProfileSetupPage = () => {
  const navigate = useNavigate();
  const axios = useAxiosInsance();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [activitySelected, setActivitySelected] = useState(false); // 활동공개 창
  const [activitySelectVal, setActivitySelectVal] = useState('공개'); // 프로필 활동공개 값
  const [fileImgSelected, setFileImgSelected] = useState(null); // 프로필 이미지 변경
  const [profileName, setProfileName] = useState(''); // 프로필 이름 값
  const [profileEmail, setProfileEmail] = useState(''); // 프로필 이메일 값
  const [profileFamily, setProfileFamily] = useState(''); // 프로필 보호가족 값
  const [profileIntroduce, setProfileIntroduce] = useState(''); // 프로필 소개글 값
  const [profileImageName, setProfileImageName] = useState(''); // 프로필 이미지 값
  const [imageUrl, setImageUrl] = useState(''); // 프로필 prefix 경로 값

  useEffect(() => {
    axios.get("/profile/getProfile").then(({status, data}) => {
      if (status != 200) console.error("error !! ", this);

      const imageName = data?.profileImageName || '';
      setProfileImageName(imageName);
    })

    const SERVER_URL = process.env.NODE_ENV == 'development' ? 'http://localhost:8080/api' : '/api';
    setImageUrl(SERVER_URL + "/image/view/");
  }, []);

  // 이미지 업로드 단계 (2 - 부분)
  const uploadWebp = async (file) => {
    const formData = new FormData();

    formData.append('files', file, 'image.webp');
    
    const { isError, status, data: webpName }= await axios.post('/image/webp/', formData);
    
    if (isError) {
      console.error('### uploadSingleWebp');
      return;
    }

    return webpName;
  }
  // 이미지 업로드 단계 (1 - 전체)
  const fileImg = async (event) => {
    const file = event.target.files[0];
    const fileName = file?.name || '프로필사진';

    const blobData = await transferWebp(file, true);
    const webpName = await uploadWebp(blobData);

    setProfileImageName(webpName[0]);
  };

  // 이미지 업로드 (3 - post 정보저장)
  const goSaveProfileImage = async () => {
    const param = {
      profileImageName
    }
    const res = await axios.post('/profile/saveProfileImage', param);
    if (res.status != 200) console.error('error : ', this);
  }

  const profileRegister = () => {
    // if (profileIntroduce === '' || profileIntroduce === null) {
    //   document.getElementById('profile-introduce').style.border = '1px solid #ff8888';
    //   return false;
    // } else {
    //   document.getElementById('profile-introduce').style.border = '1px solid #f2f2f2';
    // }
    const 저장원해 = confirm('정말 저장하시겠습니까?');
    
    if (저장원해) {
      goSaveProfileImage();
      navigate('/profile');
    } 

  };
  return (
    <div>
      <Nav />
      <div className={style['container']}>
        <img className={style['main-img']} src={'main-section.png'} alt="main-section"></img>
        <div className={style['wrap']}>
          <div className={style['profile-info-wrap']}>
            <input
              id={'profile-update'}
              className={style['profile-update']}
              type={'file'}
              accept={'image/*'}
              onChange={(e) => fileImg(e)}
            />
            <label htmlFor={'profile-update'} className={style['profile-img-btn']} />
            <label>
              <div className={style['profile-my-img']}>
                {fileImgSelected === null ? (
                  <img
                    className={style['default-profile-img']}
                    src={profileImageName ? imageUrl + profileImageName : '/default-profile-img.png'}
                    alt={'프로필 사진 변경'}
                    title={'프로필 사진 변경'}
                  />
                ) : (
                  <img
                    className={style['default-profile-img']}
                    src={fileImgSelected}
                    alt={'프로필 사진'}
                    title={'프로필 사진'}
                  />
                )}
                <div className={style['profile-setup']}>
                  <img src={'setup.png'} alt={'설정'} />
                </div>
              </div>
              <div className={style['profile-info-title']}>
                <div className={style['name']}>성한결</div>
                <div className={style['protect']}>성혜리 보호자</div>
                <span className={style['intro']}>자기소개 메세지</span>
              </div>
            </label>
            <div className={style['profile-info-input']}>
              <div className={style['profile-info-item1']}>
                <div className={style['profile-info-introduce']}>
                  <span>소개글 작성</span>
                  <div>
                    <textarea
                      className={style['introduce']}
                      id={'profile-introduce'}
                      onChange={(e) => setProfileIntroduce(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className={style['profile-btn']}>
              <button className={style['profile-cancel']} onClick={() => navigate(-1)}>
                취소
              </button>
              <button className={style['profile-register']} onClick={profileRegister}>
                등록
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileSetupPage;

