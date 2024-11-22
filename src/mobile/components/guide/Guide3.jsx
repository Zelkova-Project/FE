import '@/pc/css/guideComponents.css';
import Section from '@/pc/components/Section';
import Kakao from '@/pc/components/Kakao';

const Guide3 = () => {
  return (
    <div>
      <Section>
        <div>
          <h5 className="guide-subtit">오시는 길</h5>
        </div>
      </Section>

      <Section isLast={true}>
        <div className="kakao-map-container" style={{ background: '#FDFCF8' }}>
          <Kakao />
          <div className="guide">
            <ul>
              <li>
                <h4>오시는 길</h4>
              </li>
              <li>
                <div className="juso">
                  <h4>주소</h4>
                  <p>경기도 하남시 덕풍동로 53 (12936)</p>
                </div>
              </li>
              <li>
                <div className="tel">
                  <h4>전화번호</h4>
                  <p>031-796-0005</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Guide3;

