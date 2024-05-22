import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Button from "../../Buttons/Button";
import Input from "../../Inputs/Input";

const PartyWiseTestPagination = ({
  department,
  sendToParent,
  resetFlag,
  length,
}) => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(length ? length : 2);
  const url = useSelector((state) => state.url);

  const getData = async () => {
    try {
      const response = await axios.get(`${url}/gettest`);
      console.log("response", response);
      setData(response.data.data);
      setData2(response.data.data);
      setData3(response.data.data);
      setPageNumber(0);
      department = null;
    } catch (error) {
      console.log("department", url);

      department = null;
      console.log(error);
    }
  };

  useEffect(() => {
    if (resetFlag) {
      setData([]);
      currentPageData = [];
      console.log("currentPageData", currentPageData);
    } else {
      // Fetch data or update state as needed
      getData();
      console.log("currentPageData", currentPageData);
    }
  }, [resetFlag]);
  // Trigger the request when currentDepartment changes

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = pageNumber * itemsPerPage;
  const endIndex = Math.min((pageNumber + 1) * itemsPerPage, data.length);
  let currentPageData = data.slice(startIndex, endIndex);

  const handlePageChange = (event, newPageNumber) => {
    setPageNumber(newPageNumber - 1); // Adjusting for zero-based index
  };
  const filterNames = (input) => {
    console.log("lower Case", data3);
    let searchTerm = input.toLowerCase();
    let d = data3.filter((item) =>
      item.testName.toLowerCase().includes(searchTerm)
    );
    if (input.length <= 0) {
      setData(data2);
    } else {
      setData(d);
      setData3(data2);
      setPageNumber(0); // Reset pageNumber to 0 when performing a search
    }
    return d;
  };

  let searchResult = "";
  // console.log(searchResult);
  const vector = (e) => {
    // console.log(e.target.value);
    searchResult = filterNames(e.target.value);
  };
  const handleClick = (item) => {
    // Call the sendToParent callback with the clicked item
    sendToParent(item);
  };

  return (
    <div className="border-2 flex flex-col">
      {data.length > 0 && (
        <h1 className=" flex justify-center underline my-2">
          {department} Test List
        </h1>
      )}
      <div className="flex justify-center my-2 space-x-2">
        <Input
          placeholder={"Search Test"}
          onChange={(e) => {
            vector(e);
          }}
        />
        <Button onClick={getData} title={"Load Tests"} />
      </div>
      <div>
        {/* First Div */}
        <div className="flex justify-center">
          <table className="bg-gray-950">
            <tr className="border-2 items-center">
              <th className="hidden md:flex">Test Code</th>
              <th width="400">Test Name</th>
              <th width="400">Department</th>
            </tr>

            {/* Second Div */}
            {data &&
              currentPageData.map((item, index) => (
                <tr
                  className="border-2 items-center  mx-2 text-sm cursor-pointer hover:scale-x-105 bg-gray-600"
                  key={index}
                  onClick={() => handleClick(item)}
                >
                  <th className="hidden md:flex">{item.testCode}</th>
                  <th width="400">{item.testName}</th>
                  <th width="200">{item.department}</th>
                </tr>
              ))}
          </table>
        </div>
      </div>
      <Stack spacing={2} className="flex self-center my-3 ">
        <Pagination
          count={totalPages}
          page={pageNumber + 1}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default PartyWiseTestPagination;
