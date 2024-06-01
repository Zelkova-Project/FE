import React from "react";
import "../css/noticeDetail.css";

const NoticeDetailPage = ({ handlerRouting }) => {
  let result = [];
  let a = (
    <div className="notail-comment-list-item">
      <div className="notail-comment-list-item-profile">
        <img src="notice/notail-comment.png"></img>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
          <img src="notice/notail-like.png"></img>
        </div>
        <div className="notail-comment-like-count">
          <p>1,234</p>
        </div>
      </div>
    </div>
  );

  result.push(a);
  result.push(a);
  result.push(a);

  return (
    <div className="notail-container">
      {/* 제목, 날짜영역 */}
      <div className="notail-subtit-section">
        <div className="notail-subtit">
          <ul className="notail-subtit-ul">
            <li>
              <h3>공지사항 제목</h3>
            </li>
            <li>
              <h3>2000.11.11</h3>
            </li>
          </ul>
        </div>
      </div>

      {/* 제목,본문 영역 */}
      <div className="notail-content-section">
        <div className="notail-content">
          <h2>공지사항 제목</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur. Aliquam ullamcorper sit
            euismod volutpat etiam orci. Ac ultricies sit in tincidunt sem
            tempus ac cursus. In ut ac dolor viverra orci. Quis mattis elementum
            ornare et pretium cras sit volutpat feugiat. Elit feugiat elementum
            sit viverra et mauris eget in purus. Amet platea quis arcu
            pellentesque varius viverra accumsan aliquam. Sem diam at pharetra
            non. Enim pellentesque molestie congue ut aenean semper. Morbi cum
            quis phasellus arcu vitae. Enim velit libero mattis massa sapien
            penatibus sit purus molestie. Et dui sed imperdiet ullamcorper sit
            eget sapien. Commodo felis est id enim erat hac. Augue interdum
            nulla nisl proin vel diam. Duis volutpat vel lobortis sed sit
            dignissim posuere justo id. Sed at lorem aenean lacus tortor. Amet
            tristique etiam aenean neque mollis eget odio elit. Semper nisl ut
            diam lectus. Eu varius consectetur condimentum etiam purus odio.
            Mollis vestibulum suscipit vulputate mus non nibh. Urna auctor orci
            gravida quam sed risus quis morbi. Vulputate diam massa enim
            potenti. Diam auctor lorem pellentesque duis mi arcu tempor elit.
            Volutpat tincidunt tempus vitae magna consequat enim amet. Augue
            interdum nulla nisl proin vel diam. Duis volutpat vel lobortis sed
            sit dignissim posuere justo id. Sed at lorem aenean lacus tortor.
            Amet tristique etiam aenean neque mollis eget odio elit. Semper nisl
            ut diam lectus. Eu varius consectetur condimentum etiam purus odio.
            Mollis vestibulum suscipit vulputate mus non nibh. Urna auctor orci
            gravida quam sed risus quis morbi. Vulputate diam massa enim
            potenti. Diam auctor lorem pellentesque duis mi arcu tempor elit.
            Volutpat tincidunt tempus vitae magna consequat enim amet.
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
            <img src="notice/notail-comment.png"></img>
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
              <img src="notice/notail-comment.png"></img>
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi
                  ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.
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
                <img src="notice/notail-like.png"></img>
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
        <button>목록</button>
      </div>
    </div>
  );
};

export default NoticeDetailPage;
