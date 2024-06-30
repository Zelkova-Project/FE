import '../css/table.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from '../axios/axiosInstance';

import { activeInfoState } from '../recoilState/recoil';
import { useRecoilState } from 'recoil';

const Table = () => {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [activeInfo, setActiveInfo] = useRecoilState(activeInfoState);

  const tableComponent = () => {
    const makeTableTr = () => {
      const result = [];
      for (let idx in postList) {
        result.push(
          <tbody>
            <tr
              className="common-table-tr2"
              key={idx}
              onClick={() => navigate(`/detail/${activeInfo.activePage}/${postList[idx].no}`)}
            >
              <td>{postList[idx].no}</td>
              <td>{postList[idx].title}</td>
              <td>{postList[idx].date_time.split('T')[0]}</td>
            </tr>
          </tbody>,
        );
      }

      return result;
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          let { status, data, message } = await axios.get('/posts/board?page=0&size=10');
          setPostList(data.content);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    return makeTableTr();
  };

  return (
    <div className="table-conatiner">
      <table className="common-table">
        <thead>
          <tr className="common-table-tr1" key={'head'}>
            <th key={'no'}>No</th>
            <th key={'title'}>Title</th>
            <th key={'date'}>Date</th>
          </tr>
        </thead>
        {tableComponent()}
      </table>
    </div>
  );
};

export default Table;
