import '@/pc/css/guideComponents.css';
import Section from '@/pc/components/Section';

const Guide4 = () => {
  const imgObj = {
    조직도선: require('@/common/imgs/조직도선.png'),
  };

  return (
    <div>
      <Section>
        <div>
          <h5 className="guide-subtit">느티나무마을 조직도</h5>
        </div>
      </Section>

      <Section>
        <div className="organi-container">
          {/* 한줄 하남교회*/}
          <div className="organi-tr head-tr" style={{}}>
            <div className="organi-td head1-td">
              <div className="organi-td head2-td">
                <div className="oragani-td head3-td">
                  <span className="organi-name1">법인국</span>
                  <span className="organi-name2">하남교회</span>
                </div>
              </div>
            </div>
          </div>

          {/* 한줄 운영위원회*/}
          <div className="organi-tr simple-tr">
            <div className="organi-td simple-td">
              <span>운영위원회</span>
            </div>
          </div>

          {/* 한줄 이아론 */}
          <div className="organi-tr simple-tr ml-type1">
            <div className="organi-td simple-td">
              <span>이아론 시설장</span>
            </div>
          </div>

          {/* 한줄 송미자 */}
          <div className="organi-tr simple-tr ml-type2">
            <div className="organi-td simple-td">
              <span>송미자 행정팀장</span>
            </div>
          </div>

          {/* 한줄 선임,생활,조리 */}
          <div className="organi-tr simple-tr ml-type3">
            <div className="organi-td depart-td">
              <span>선임생활지도원</span>
            </div>
            <div className="organi-td depart-td">
              <span>생활지도원</span>
            </div>
            <div className="organi-td depart-td">
              <span>조리원</span>
            </div>
          </div>

          {/* 한줄 선임,생활,조리 멤버1 */}
          <div className="organi-tr simple-tr ml-type3 ml-type4">
            <div className="organi-td simple-td">
              <span>김은경</span>
            </div>
            <div className="organi-td simple-td">
              <span>천우진</span>
            </div>
            <div className="organi-td simple-td">
              <span>서정비</span>
            </div>
          </div>

          {/* 한줄 선임,생활,조리 멤버2 */}
          <div className="organi-tr simple-tr ml-type3 ml-type5">
            <div className="organi-td simple-td">
              <span>윤형일</span>
            </div>
          </div>

          {/* 한줄 선임,생활,조리 멤버2 */}
          <div className="organi-tr simple-tr ml-type3 ml-type5">
            <div className="organi-td simple-td">
              <span>하정석</span>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Guide4;

