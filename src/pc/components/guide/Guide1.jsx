import Section from '@/pc/components/Section';

const Guide1 = () => {
  return (
    <div>
      <Section>
        <div>
          <h5 className="guide-subtit">이용안내</h5>
        </div>
        <div className="section-img-container">
          <ul>
            <li>
              <div className="img-subtit">
                <span>이용시간</span>
                <p>
                  주간 및 토요일 : 오전 9시~오후 6시 <br />
                  일요일 및 공휴일은 휴관입니다.
                </p>
              </div>
              <div className="img-container1 guide-img1 set2-setting">
                {/* <img src="middle-section.png" alt="main-section"></img> */}
              </div>
            </li>
            <li>
              <div className="img-subtit">
                <span>이용문의</span>
                <p>
                  사무실 031-796-0005
                  <br />
                  skan0005@naver.com
                </p>
              </div>
              <div className="img-container2 guide-img2 set2-setting">
                {/* <img src="middle-section2.png" alt="main-section"></img> */}
              </div>
            </li>
          </ul>
        </div>
      </Section>
      <Section>
        <div>
          <h5 className="subtit">이용금액</h5>
        </div>
        <div className="section-img-container">
          <table className="guide-table1">
            <thead>
              <tr>
                <th scope="col" colSpan="2">
                  이용시간
                </th>
                <th scope="col">이용료</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>주간</td>
                <td>오전 9:00 ~ 오후 18:00</td>
                <td>15,000원</td>
              </tr>
              <tr>
                <td>토요일</td>
                <td>오전 9:00 ~ 오후 18:00</td>
                <td>30,000원</td>
              </tr>
              <tr>
                <td>1일</td>
                <td>24시간</td>
                <td>20,000원</td>
              </tr>
              <tr>
                <td>1개월</td>
                <td>주간 및 야간</td>
                <td>180,000원</td>
              </tr>
              <tr>
                <td>1개월(거주)</td>
                <td>월-금 오전 09:00 ~ 오후 18:00</td>
                <td>250,000원</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
      <Section>
        <div>
          <h5 className="guide-subtit">이용절차</h5>
        </div>
        <div className="section-img-container">
          <table className="guide-table2">
            <tbody>
              <tr>
                <td>
                  <strong className="guide-table-img guide-process-img1">입소의뢰 및 접수</strong>
                </td>
              </tr>
              <tr>
                <td className="guide-td-hightlight">
                  <strong className="guide-table-img guide-process-img2">초기면접</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong className="guide-table-img guide-process-img3">입소판정</strong>
                </td>
              </tr>
              <tr>
                <td className="guide-td-hightlight">
                  <strong className="guide-table-img guide-process-img4">이용신청</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong className="guide-table-img guide-process-img5">이용</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
      <Section>
        <div>
          <h5 className="guide-subtit">입소구비서류</h5>
        </div>
        <div className="section-img-container">
          <table className="guide-table2">
            <tbody>
              <tr>
                <td>
                  <strong className="guide-table-img guide-process-img5">이용신청서 (시설)</strong>
                </td>
              </tr>
              <tr>
                <td className="guide-td-hightlight">
                  <strong className="guide-table-img guide-process-img5">
                    주민등록등본 1통, 장애인등록증 또는 카드 사본 1통
                  </strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong className="guide-table-img guide-process-img5">
                    기초생활수급권증명서(해당자) 사본 1통
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
};

export default Guide1;
