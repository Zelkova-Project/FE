import '../css/table.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from '../axios/axiosInstance';

const Table = ({ handlerRouting }) => {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const tableComponent = () => {
    const makeTableTr = () => {
      const result = [];
      for (let idx in postList) {
        result.push(
          <tr
            className="common-table-tr2"
            key={idx}
            onClick={() => navigate(`/noticeDetail/${postList[idx].no}`, { state: postList[idx] })}
          >
            <td>{postList[idx].no}</td>
            <td>{postList[idx].title}</td>
            <td>{postList[idx].date_time.split('T')[0]}</td>
          </tr>,
        );
      }

      return result;
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          let { status, data, message } = await axios.get('/posts?page=0&size=10');
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
        <tr className="common-table-tr1">
          <th>No</th>
          <th>Title</th>
          <th>Date</th>
        </tr>

        {tableComponent()}
      </table>
    </div>
  );
};

export default Table;
