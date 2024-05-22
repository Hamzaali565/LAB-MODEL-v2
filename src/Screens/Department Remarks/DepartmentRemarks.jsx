import React, { useState } from "react";
import TestPagination from "../../components/Pagination/Testss/TestPagination";
import RemarksPagination from "../../components/Pagination/Remarks/RemarksPagination";
import LabelInput from "../../components/Inputs/LabelInput";
import Button from "../../components/Buttons/Button";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const DepartmentRemarks = () => {
  const [data, setData] = useState([]);
  const url = useSelector((state) => state.url);
  const [rerender, setRerender] = useState(false);
  const checkData = (item) => {
    setData([]);
    console.log(item);
    let { category, reportDays, style, testType, _id, __v, ...rest } = item;
    setData(rest);
  };

  useEffect(() => {
    console.log("item", data);
  }, [data]);
  // let c = d2.map(({ _id, ...rest }) => rest);
  const updateArray = (e) => {
    setData({ ...data, remarks: e });
    console.log(data);
  };
  const sendData = async () => {
    console.log(data);
    try {
      let response = await axios.post(`${url}/testRemarks`, {
        department: data.department,
        testCode: data.testCode,
        remarks: data.remarks,
        testName: data.testName,
        remarkCode: !data.remarkCode ? "" : data.remarkCode,
      });
      console.log(response);
      setRerender(!rerender);
      setData({
        remarkCode: "",
        department: "",
        testCode: "",
        testName: "",
        remarks: "",
      });
    } catch (error) {
      console.log(data.remarks);
      console.log(error);
    }
  };
  return (
    <div>
      <h1>DEPARTMENT WISE REMARKS</h1>
      <div>
        <RemarksPagination sendToParent={checkData} rerender={rerender} />
      </div>
      <div className="mt-3">
        <TestPagination sendToParent={checkData} />
      </div>
      {/* other informatiom */}
      <div className="border-2 mt-2 p-2">
        <h1 className="text-center underline"> Addition Of Remarks</h1>
        <div>
          <LabelInput
            label="Remark Code"
            value={data.remarkCode}
            disabled={true}
          />
          <LabelInput label="Test Code" value={data.testCode} disabled={true} />
          <LabelInput label="Test Name" value={data.testName} disabled={true} />
          <LabelInput
            label="Department"
            value={data.department}
            disabled={true}
          />
          <LabelInput
            label="Remarks"
            value={data.remarks}
            onChange={(e) => updateArray(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <Button title={"Save"} onClick={sendData} />
        </div>
      </div>
    </div>
  );
};

export default DepartmentRemarks;
