import ReactQuill from 'react-quill';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../css/latterwrite.module.css';
import Section from '../components/Section';

const LatterWrite = () => {
  const navigate = useNavigate();

  const [writeDateInfo, setWriteDateInfo] = useState({}); // 작성일, 수정일 날짜
  const [activitySelected, setActivitySelected] = useState(false); // 활동공개 창
  const [activitySelectVal, setActivitySelectVal] = useState('공개'); // 활동공개 값
  const [writerFileName, setWriterFileName] = useState(''); // 활동공개 값

  const getDate = (date) => {
    let year = date.getFullYear() + '';
    let month = date.getMonth() + 1 + '';

    if (month < 10) month = '0' + month;

    let day = date.getDate() + '';

    if (day < 10) day = '0' + day;
    return year + '-' + month + '-' + day;
  };
  useEffect(() => {
    setWriteDateInfo({
      ...writeDateInfo,
      modifyDate: getDate(new Date()),
      writeDate: getDate(new Date()),
    });
    console.log('writerFileName : ', writerFileName);
  }, []);
  const activitySelectValue = (index) => {
    setActivitySelectVal(index);
    setActivitySelected(!activitySelected);
  };
  const onWriteFileName = (e) => {
    const originFileName = e.target.value;
    let fileName = originFileName.split('/').pop().split('\\').pop();
    setWriterFileName(fileName);
  };
  return (
    <>
      {/* 글쓰기영역시작 */}
      <Section>
        <div className={style['container']}>
          <div className={style['write-item']}>
            <h5 className={style['write-tit']}>후기 작성</h5>
          </div>
          <div className={style['write-item']}>
            <label>
              <h3>제목</h3>
              <input type={'text'}></input>
            </label>
          </div>
          <div className={style['write-item']}>
            <div className={style['write-txt']}>
              <label>
                <h3>작성자</h3>
                <input type={'text'}></input>
              </label>
            </div>
            <div className={[style['write-txt'], style['ml-40']].join(' ')}>
              <label>
                <h3>작성일</h3>
                <input readOnly value={writeDateInfo.writeDate}></input>
              </label>
            </div>
          </div>

          <div className={style['write-item']}>
            <div className={style['write-txt']}>
              <label>
                <h3>게시 여부</h3>
                <input
                  type={'text'}
                  placeholder={'공개'}
                  value={activitySelectVal}
                  autoComplete={'off'}
                  className={style['activity-select']}
                  onClick={() => {
                    setActivitySelected(!activitySelected);
                  }}
                />
                <img
                  src={'/select.png'}
                  alt={'select'}
                  className={style['activity-select-img']}
                  onClick={() => {
                    setActivitySelected(!activitySelected);
                  }}
                />
                {activitySelected ? (
                  <ul className={style['activity-option']}>
                    <li className={style['option']} onClick={() => activitySelectValue('공개')}>
                      공개
                    </li>
                    <li className={style['option']} onClick={() => activitySelectValue('비공개')}>
                      비공개
                    </li>
                  </ul>
                ) : null}
              </label>
            </div>
            <div className={[style['write-txt'], style['ml-40']].join(' ')}>
              <label>
                <h3>수정일</h3>
                <input readOnly value={writeDateInfo.modifyDate}></input>
              </label>
            </div>
          </div>
          <div className={[style['write-item'], style['ml-50']].join(' ')}>
            <div className={style['write-textArea']}>
              <h3>내용 작성</h3>
              <ReactQuill
                style={{
                  width: '1080px',
                  height: '400px',
                  border: '1px solid #F2F2F2',
                  borderRadius: '8px',
                }}
              />
            </div>
          </div>
          <div className={[style['write-item'], style['mt-90']].join(' ')}>
            <div className={style['write-txt']}>
              <h3>첨부파일</h3>
            </div>

            <div className={[style['write-file-list'], style['ml-10']].join(' ')}>
              <ul>
                <li>{writerFileName ? <h3>{writerFileName}</h3> : <h3>선택된 파일명</h3>}</li>
                <li>
                  <h3>선택된 파일명</h3>
                </li>
              </ul>
            </div>

            <div className={[style['write-file-btn'], style['ml-20']].join(' ')}>
              <button onClick={() => setWriterFileName(null)}>파일 삭제</button>
              <input
                type={'file'}
                id={'file-name'}
                className={style['write-file']}
                onChange={(e) => onWriteFileName(e)}
                accept={'image/*'}
              />
              <label htmlFor={'file-name'} id={'file-name1'} className={style['file-name']}>
                파일 추가
              </label>
            </div>
          </div>

          <div className={[style['write-item'], style['write-btn-wrap']].join(' ')}>
            <div className={style['write-submit-btn']}>
              <button onClick={() => navigate(-1)}>취소</button>
              <button>삭제</button>
              <button>등록</button>
            </div>
          </div>
        </div>
      </Section>
      {/* 글쓰기영역끝 */}
    </>
  );
};

export default LatterWrite;