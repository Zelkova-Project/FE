import Section from '@/pc/components/Section';
import '@/pc/css/guideComponents.css';

const Guide2 = () => {

  const 사업명리스트 = [
    { 사업명: '교육재활', 프로그램명: '일상생활훈련 / 요리교실 / 원예교실 / 볼링교실 / 안전교육' },
    { 사업명: '특화사업', 프로그램명: '1:1 멘토링 프로그램' },
    { 사업명: '사회적응훈련', 프로그램명: '지역사회문화시설이용 / 1박 자립훈련 나들이/현장학습 / 캠프' },
    { 사업명: '특활사업', 프로그램명: '명절행사 / 부모간담회 / 송년행사 / 가족여행' },
    { 사업명: '의료재활사업', 프로그램명: '구강관리교육 / 약물관리교육 / 건강검진' },
    { 사업명: '이용자관리사업', 프로그램명: '이용자발달평가 / 이용인개별화(IRP) / 사례관리 / 욕구 및만족도 조사 /  상담사업' },
    { 사업명: '기타사업', 프로그램명: '운영위원회 / 부모간담회 / 소방훈련 / 직원워크샵 / 이용인 자치회의' },
  ]

  const imgObj = {
    시설안내sub1: require('@/common/imgs/guide/시설안내sub1.jpg'),
    시설안내sub2: require('@/common/imgs/guide/시설안내sub2.jpg'),
    시설안내sub3: require('@/common/imgs/guide/시설안내sub3.jpg'),
    시설안내sub4: require('@/common/imgs/guide/시설안내sub4.jpg')
  };

  return (
    <div>
      <Section>
        <div>
          <h5 className="guide-subtit">느티나무마을의 시설</h5>
        </div>
        <div className="guide2-container">
          <div className="guide2-innerContainer">
            <div className="guide2-flexItem">
              <img src={imgObj.시설안내sub1} className={"guide2-1img"} />
              <div className="guide2-innerFlexItem">
                <h2>시설 소개</h2>
                <p>
                  느티나무 마을은 포근하고 넓은 마음으로 쉼을 주는 느티나무와 같이 장애인 이용자들에게 사랑과 쉼을 주는 즐거운 집이 되기 위해 만들어졌습니다.<br />
                  가정에서 일시적으로 생활이 어려운 장애인에게 일정기간 동안 휴식, 요양, 보호를 위한 거주 공간 및 일상생활 서비스를 제공하여 가족 구성원이 안심하고 사회, 경제적 활동을 영위할 수
                  있도록 월-토요일 12시까지 24시간 운영하는 시설입니다.
                </p>
              </div>
            </div>
          </div>
          <div className="guide2-innerContainer">
            <div className="guide2-flexItem">
              <div className="guide2-innerFlexItem">
                <h2>개요</h2>
                <p>
                  가. 시 설 명 : 느티나무 마을(장애인단기보호시설)<br />
                  나. 설립주체 : 대한예수교장로회 하남교회<br />
                  다. 이 사 장 : 방성일 담임목사<br />
                  라. 개 관 일 : 2011년 8월 1일<br />
                  마. 소 재 지 : 경기도 하남시 덕풍동로 53<br />
                  바. 연 락 처 : 031)796-0005<br />
                </p>
              </div>
            </div>
          </div>
          <div className="guide2-innerContainer">
            <div className="guide2-flexItem">
              <div className="guide2-innerFlexItem">
                <h2>미션</h2>
                <p>
                  하나님의 사랑안에 지역사회와 함께 장애인이 즐겁고 행복한 미래 만들기
                </p>
              </div>
            </div>
          </div>
          <div className="guide2-innerContainer">
            <div className="guide2-flexItem">
              <div className="guide2-innerFlexItem">
                <h2>핵심 가치</h2>
                <p>
                  <div className={'guide-sub1'}><span>안전</span> 장애인이 안전하고 쾌적한 환경을 조성하겠습니다.</div>
                  <div className={'guide-sub2'}><span>함께</span> 지역사회와 장애인이 함께 하도록 최선을 다하겠습니다.</div>
                  <div className={'guide-sub3'}><span>존중</span> 장애인의 존엄성을 존중하겠습니다,</div>
                </p>
              </div>
            </div>
          </div>
          <div className="guide2-innerContainer">
            <div className="guide2-flexItem">
              <div className="guide2-innerFlexItem">
                <h2>시설 현황</h2>
                <p>
                  <div>가. 직원현황 : 총 7명 -  시설장(1명), 팀장(1명), 사회재활교사(4명), 조리원(1명)</div>
                  <div>나. 이용자 정원 : 12명</div>
                  <div>다. 시설안내 : 남 ․ 여자 숙소(샤워실, 화장실), 거실, 탕비실,  주방, 사무실, 물품보관소</div>
                </p>
              </div>
              <img src={imgObj.시설안내sub2} className={"guide2-2img"} />
            </div>
          </div>
          <div className="guide2-innerContainer">
            <div className="guide2-flexItem">
              <div className="guide2-innerFlexItem">
                <h2>실내모습</h2>
                <img src={imgObj.시설안내sub3} className={"guide2-3img"} />
              </div>
            </div>
          </div>
          <div className="guide2-innerContainer">
            <div className="guide2-flexItem">
              <div className="guide2-innerFlexItem">
                <h2>프로그램</h2>
                <table className="guide-table1">
                  <thead>
                    <tr>
                      <th scope="col" >
                        사업명
                      </th>
                      <th scope="col" colSpan="2">
                        프로그램명
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      사업명리스트.map(사업 => (
                        <tr>
                          <td>{사업.사업명}</td>
                          <td>{사업.프로그램명}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Guide2;
