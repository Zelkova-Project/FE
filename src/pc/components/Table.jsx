import '@/pc/css/table.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from '@/common/axios/axiosInstance';

import { activeInfoState } from '@/common/recoilState/recoil';
import { useRecoilState } from 'recoil';

const Table = ({ activePageNum }) => {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [activeInfo, setActiveInfo] = useRecoilState(activeInfoState);

  const tableComponent = () => {
    const makeTableTr = () => {
      const result = [];
      for (let idx in postList) {
        result.push(
          <tr
            className="common-table-tr2"
            key={idx}
            onClick={() => navigate(`/detail/${activeInfo.activePage}/${postList[idx].bno}`)}
          >
            <td>{postList[idx].bno}</td>
            <td>공지사항</td>
            <td>{postList[idx].title}</td>
            {/* 임시주석 */}
            {/* <td>{postList[idx].date_time.split('T')[0]}</td> */}
            <td>
              {
                postList[idx].dueDate != null ? postList[idx].dueDate : '2024-10-14'
              }
            </td>
          </tr>,
        );
      }
      return result;
    };

    if (loading) {
      return (
        <tr>
          <td>Loading...</td>
        </tr>
      );
    }

    return makeTableTr();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { status, data, message } = await axios.get(
          `/board/list?page=${activePageNum}&size=10`,
        );
        const filtered = data.dtoList.filter(item => !item.del); // soft delete로 인해 한번 걸러야함
        setPostList(filtered);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [activePageNum]);

  return (
    <div className="table-conatiner">
      <table className="common-table">
        <thead>
          <tr className="common-table-tr1" key={'head'}>
            <th key={'no'}>No</th>
            <th key={'category'}>구분</th>
            <th key={'title'}>Title</th>
            <th key={'date'}>Date</th>
          </tr>
        </thead>
        <tbody>{tableComponent()}</tbody>
      </table>
    </div>
  );
};

export default Table;

