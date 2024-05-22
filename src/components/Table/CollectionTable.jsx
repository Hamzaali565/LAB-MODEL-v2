import moment from "moment";
import React, { useEffect, useState } from "react";

const CollectionTable = ({ data1, childData }) => {
  const [clickedData, setClickData] = useState([]);
  useEffect(() => {
    // console.log("updatedData", clickedData);
    childData(clickedData);
  }, [clickedData]);
  const saperateTest = data1.flatMap(
    ({ labNo, createdDate, partyName, mrData, _id, test }) => {
      return test.map((testItems) => ({
        ...testItems,
        labNo,
        createdDate: moment(createdDate).format("DD-MM-YYYY HH:mm:ss"),
        partyName,
        doc_id: _id,
        age: mrData[0].age,
        patientName: mrData[0].patientName,
        mrNo: mrData[0].mrNo,
        gender: mrData[0].gender,
      }));
    }
  );
  const seprateTrue = (check, id) => {
    // console.log("check", check);
    if (check === false) {
      setClickData(clickedData.filter((item) => item._id !== id));
      return;
    }
    const clickedObj = saperateTest.find((obj) => obj?._id === id);
    clickedObj.tagType = check;
    setClickData([clickedObj]);
  };

  console.log("saperateTest", saperateTest);

  return (
    <div>
      <table style={{ width: "100%", border: "solid" }}>
        <tr>
          <th style={{ border: "solid" }}>Select</th>
          <th style={{ border: "solid" }}>Lab No.</th>
          <th style={{ border: "solid" }}>Lab Date</th>
          <th style={{ border: "solid" }}>MR No.</th>
          <th style={{ border: "solid" }}>ER / ADM No.</th>
          <th style={{ border: "solid" }}>Ward Name</th>
          <th style={{ border: "solid" }}>Test Name</th>
          <th style={{ border: "solid" }}>Patient Name</th>
          <th style={{ border: "solid" }}>Lab Type</th>
          <th style={{ border: "solid" }}>Gender</th>
          <th style={{ border: "solid" }}>Age</th>
          <th style={{ border: "solid" }}>Party</th>
        </tr>
        {saperateTest &&
          saperateTest.map((item, i) => (
            <tr>
              <td style={{ border: "solid" }}>
                <input
                  type="checkbox"
                  className="flex m-auto"
                  checked={
                    clickedData.length > 0
                      ? item._id === clickedData[0]._id
                        ? true
                        : false
                      : false
                  }
                  onClick={(e) => {
                    seprateTrue(e.target.checked, item?._id);
                  }}
                />
              </td>
              <td style={{ border: "solid", textAlign: "center" }}>
                {item?.labNo}
              </td>
              <td style={{ border: "solid", textAlign: "center" }}>
                {item.createdDate}
              </td>
              <td style={{ border: "solid", textAlign: "center" }}>
                {item.mrNo}
              </td>
              <td style={{ border: "solid", textAlign: "center" }}>
                {item?.admNo ? item?.admNo : "-"}
              </td>
              <td style={{ border: "solid", textAlign: "center" }}>
                {item?.ward ? item?.ward : "-"}
              </td>
              <td style={{ border: "solid", textAlign: "center" }}>
                {item?.name}
              </td>
              <td style={{ border: "solid", textAlign: "center" }}>
                {item.patientName}
              </td>
              <td style={{ border: "solid", textAlign: "center" }}>Cash</td>
              <td style={{ border: "solid", textAlign: "center" }}>
                {item?.gender}
              </td>
              <td style={{ border: "solid", textAlign: "center" }}>
                {item?.age}
              </td>
              <td style={{ border: "solid", textAlign: "center" }}>
                {item?.partyName}
              </td>
              {/* Add more cells here */}
            </tr>
          ))}
        {/* Add more rows here */}
      </table>
    </div>
  );
};

export default CollectionTable;
