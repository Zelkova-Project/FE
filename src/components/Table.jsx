import '../css/table.css';
import { useNavigate } from 'react-router-dom';

const Table = ({ handlerRouting }) => {
  const navigate = useNavigate();

  const tableElement = [
    {
      no: '10',
      title: 'Lorem ipsum dolor sit amet consectetur.',
      data: '2000.00.00',
    },
    {
      no: '10',
      title: 'Lorem ipsum dolor sit amet consectetur.',
      data: '2000.00.00',
    },
    {
      no: '10',
      title: 'Lorem ipsum dolor sit amet consectetur.',
      data: '2000.00.00',
    },
  ];

  const goDetailNotice = () => {
    handlerRouting('detail');
  };

  const makeTableTr = () => {
    const result = [];
    for (let idx in tableElement) {
      result.push(
        <tr className="common-table-tr2" key={idx} onClick={goDetailNotice}>
          <td>{tableElement[idx].no}</td>
          <td>{tableElement[idx].title}</td>
          <td>{tableElement[idx].content}</td>
        </tr>,
      );
    }

    return result;
  };

  return (
    <div className="table-conatiner">
      <table className="common-table">
        <tr className="common-table-tr1">
          <th>No</th>
          <th>Title</th>
          <th>Date</th>
        </tr>

        {makeTableTr()}

        {/* <tr className="common-table-tr2">
          <td>10</td>
          <td>Lorem ipsum dolor sit amet consectetur.</td>
          <td>2000.00.00</td>
        </tr>
        <tr className="common-table-tr2">
          <td>10</td>
          <td>Lorem ipsum dolor sit amet consectetur.</td>
          <td>2000.00.00</td>
        </tr> */}
      </table>
    </div>
  );
};

export default Table;
