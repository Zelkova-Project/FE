import '@/pc/css/guide.css';
import Guide1 from '@/pc/components/guide/Guide1';
import Guide2 from '@/pc/components/guide/Guide2';
import Guide3 from '@/pc/components/guide/Guide3';
import Guide4 from '@/pc/components/guide/Guide4';
import React, { useState, useEffect } from 'react';
import { activeInfoState } from '@/common/recoilState/recoil';
import { useRecoilValue } from 'recoil';
import PageLayout from '@/pc/components/common/PageLayout';

const Guide = () => {
  const activeInfo = useRecoilValue(activeInfoState);

  let comp = [<Guide1 />, <Guide2 />, <Guide3 />, <Guide4 />];
  const [slot, setSlot] = useState('');

  const imgObj = {
    이용안내: require('@/common/imgs/guide/이용안내.png'),
    시설안내: require('@/common/imgs/guide/시설안내main.png'),
    오시는길: require('@/common/imgs/guide/오시는길main.png'),
    조직도: require('@/common/imgs/notice/채용안내main.png'),
  };

  useEffect(() => {
    setSlot(comp[activeInfo.activeIdx]);
  }, [activeInfo.activeIdx]);

  return <PageLayout pageName={'guide'} imgObj={imgObj} bodySlot={slot} />;
};

export default Guide;
