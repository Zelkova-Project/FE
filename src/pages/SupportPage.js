import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Section from '../components/Section';
import React, { useState } from 'react';
import NoticeBoardPage from './NoticeBoardPage';

import '../css/main.css';
import '../css/nav.css';
import '../css/notice.css';
import '../css/guide.css';

const SupportPage = () => {
	const imgObj = {
    main: require('../imgs/후원자원봉사main.png'),
  };
	const [navIdx, setNavIdx] = useState(0);
	const [activeSubtit, setActiveSubtit] = useState('후원의손길');
  const activeHandler = (idx) => {
		setNavIdx(idx);
		setActiveSubtit(['후원의손길', '자원봉사'][idx]);
  };
	return (
		<div className="main-container">
			<Nav />
			<Section>
				<div className="guide-img-container">
					<div className='img-title'>
            <h3>{activeSubtit}</h3>
          </div>
					<img className="main-img" src={imgObj.main} alt="main-section"></img>

					<div className="sub-nav-wrapper">
						<div className="sub-nav">
							<ul>
								<li>
									<span onClick={() => activeHandler(0)} className={navIdx == 0 ? 'active-support' : ''}>
										후원의손길
									</span>
								</li>
								<li>
									<span
										onClick={() => activeHandler(1)}
										className={navIdx == 1 ? 'active-support' : ''}
									>
										자원봉사
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</Section>

			<NoticeBoardPage activeSubtit={activeSubtit}/>

			<Footer />
		</div>
	)
}

export default SupportPage;