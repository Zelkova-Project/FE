import Section from '../Section';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CommunityBody = () => {
	const navigate = useNavigate();

	const imgObj = {
		arrowRight: require('../../imgs/notice/arrow-right.png'),
		communityImg1: require('../../imgs/community/community-example1.png'),
	};
	const [activeIdx, setActiveIdx] = useState(1);

	const makeCommunityGrid = () => {
		console.log('test');
		let comInfo = {
			img: imgObj.communityImg1,
			title: '타이틀',
			content: '짤막한 글 내용이 들어갈 예정입니다. 짤막한 글이라 함은 이쯤에서 말줄임표를...'
		}

		let dummyArr = [comInfo, comInfo, comInfo, comInfo];
		const result = [];
		for (let idx in dummyArr) {
			result.push(
				<div className='flex-item' key={idx}>
					<img src={dummyArr[idx].img}></img>
					<h3>{dummyArr[idx].title}</h3>
					<p>
						{dummyArr[idx].content}
					</p>
				</div>
			)
		}

		return result;
	}

	

	return (
		<Section>
			<div className="notice-outer-container">
				<div className="notice-flexitem">
					<h5 className="notice-subtit">커뮤니티</h5>
				</div>

				<div className="notice-flexitem flexCenter">
					<div className="notice-search-area">
						<select>
							<option>제목</option>
							<option>내용</option>
							{/* <option>1</option> */}
						</select>

						<input placeholder="검색어를 입력해주세요" />

						<button onClick={() => handlerRouting('write')}>검색</button>
					</div>
				</div>

				{/* 사진시작 */}
				<div className="community-body-flex">
					<div className='flex-row'>

						{/* 요소 for looping */}
						{makeCommunityGrid()}

					</div>
					<div className='flex-row'>

						{/* 요소 for looping */}
						{makeCommunityGrid()}

					</div>
					<div className='flex-row'>

						{/* 요소 for looping */}
						{makeCommunityGrid()}

					</div>
				</div>

				<div className="notice-flexitem" style={{ marginTop: '40px', marginBottom: '40px' }}>
					<div className="page-btns-container">
						{/* 왼쪽버튼 */}
						<div className="page-btns-left dja-center">
							<div className="page-all-left">
								<ul>
									<li>
										<img src={imgObj.arrowRight}></img>
										<img className="all-left-btn" src={imgObj.arrowRight}></img>
									</li>
									<li>
										<img src={imgObj.arrowRight}></img>
									</li>
								</ul>
							</div>
						</div>

						{/* 페이지버튼 */}
						<div className="page-btns-center">
							<ul>
								<li onClick={() => setActiveIdx(1)} className={activeIdx == 1 ? 'active' : ''}>
									1
								</li>
								<li onClick={() => setActiveIdx(2)} className={activeIdx == 2 ? 'active' : ''}>
									2
								</li>
								<li onClick={() => setActiveIdx(3)} className={activeIdx == 3 ? 'active' : ''}>
									3
								</li>
								<li onClick={() => setActiveIdx(4)} className={activeIdx == 4 ? 'active' : ''}>
									4
								</li>
								<li onClick={() => setActiveIdx(5)} className={activeIdx == 5 ? 'active' : ''}>
									5
								</li>
								<li onClick={() => setActiveIdx(6)} className={activeIdx == 6 ? 'active' : ''}>
									6
								</li>
								<li onClick={() => setActiveIdx(7)} className={activeIdx == 7 ? 'active' : ''}>
									7
								</li>
								<li onClick={() => setActiveIdx(8)} className={activeIdx == 8 ? 'active' : ''}>
									8
								</li>
								<li onClick={() => setActiveIdx(9)} className={activeIdx == 9 ? 'active' : ''}>
									9
								</li>
								<li onClick={() => setActiveIdx(10)} className={activeIdx == 10 ? 'active' : ''}>
									10
								</li>
							</ul>
						</div>

						{/* 오른쪽버튼 */}
						<div className="page-btns-right dja-center">
							<div className="page-all-right">
								<ul>
									<li>
										<img src={imgObj.arrowRight}></img>
										<img className="all-right-btn" src={imgObj.arrowRight}></img>
									</li>
									<li>
										<img src={imgObj.arrowRight}></img>
									</li>
								</ul>
							</div>
						</div>

						{/* 글쓰기버튼 */}
						<div className='page-btn-write'>
							<button onClick={() => navigate('/write')}>글쓰기</button>
						</div>

					</div>
				</div>
			</div>
		</Section>
	);
}

export default CommunityBody;