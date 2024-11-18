import '@/pc/css/table.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { activeInfoState } from '@/common/recoilState/recoil';
import { useRecoilState } from 'recoil';

const Table = ({ postList }) => {
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
            <td>{postList[idx].category}</td>
            <td>{postList[idx].title}</td>
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
    if (!postList) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="table-conatiner">
      <table className="common-table">
        <thead>
          <tr className="common-table-tr1" key={'head'}>
            <th key={'no'}>No</th>
            <th key={'category'}>Category</th>
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

