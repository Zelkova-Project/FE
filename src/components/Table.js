import "../css/table.css";

const Table = () => {
  return (
    <div className="table-conatiner">
      <table className="common-table">
        <tr className="common-table-tr1">
          <th>No</th>
          <th>Title</th>
          <th>Date</th>
        </tr>
        <tr className="common-table-tr2">
          <td>10</td>
          <td>Lorem ipsum dolor sit amet consectetur.</td>
          <td>2000.00.00</td>
        </tr>
        <tr className="common-table-tr2">
          <td>10</td>
          <td>Lorem ipsum dolor sit amet consectetur.</td>
          <td>2000.00.00</td>
        </tr>
      </table>
    </div>
  );
};

export default Table;
