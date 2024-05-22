import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Button from "../Buttons/Button";
import Input from "../Inputs/Input";

// let data = [
//   { name: "hamza" },
//   { name: "khan" },
//   { name: "hamas" },
//   { name: "kaza" },
//   { name: "maksalmza" },
//   { name: "das;dk;a" },
//   { name: "dk;alsdk" },
//   { name: "dk;alsdk" },
//   { name: "dk;alsdk" },
//   { name: "dk;alsdk" },
//   { name: "dk;alsdk" },
//   { name: "dk;alsdk" },
//   { name: "dk;alsdk" },
//   { name: "dk;alsdk" },
//   { name: "dk;alsdk" },
//   { name: "dk;alsdk" },
//   { name: "dk;alsdk" },
//   { name: "kjmcas" },
//   { name: "111" },
//   { name: "132321" },
//   { name: "03141546532" },
//   { name: "hamza" },
//   { name: "hamza" },
//   { name: "hamza" },
//   { name: "hamza" },
//   { name: "hamza" },
//   { name: "hamza" },
//   { name: "hamza" },
//   { name: "hamza" },
//   { name: "hamza" },
//   { name: "hamza" },
//   { name: "hamza" },
//   { name: "hamza" },
//   { name: "hamza" },
//   { name: "hamza" },
//   { name: "hamza" },
//   { name: "hamza" },
//   { name: "hamza" },
//   { name: "hamza" },
//   { name: "hamza" },
//   { name: "hamza" },
//   { name: "hamza" },
//   { name: "hamza" },
//   { name: "hamza" },
//   { name: "hamza" },
//   { name: "hamza" },
// ];

const PaginationComponent = ({ department, sendToParent, resetFlag }) => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const url = useSelector((state) => state.url);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${url}/gettest?department=${department}`
      );
      console.log(response);
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
      <div className="flex justify-center my-2">
        <Input
          placeholder={"Search Test"}
          onChange={(e) => {
            vector(e);
          }}
        />
      </div>
      <div>
        {/* First Div */}
        <div className="border-2 mx-2 flex text-sm justify-around bg-black">
          <p className="hidden md:flex">S.No</p>
          <p className="hidden md:flex">Test Code</p>
          <p className="">Test Name</p>
          <p className="">Test Type</p>
        </div>

        {/* Second Div */}
        {data &&
          currentPageData.map((item, index) => (
            <div
              key={index}
              className="border-2 mx-2 flex text-sm justify-around cursor-pointer hover:scale-x-105 bg-gray-600"
              onClick={() => handleClick(item)}
            >
              <p className="hidden md:flex">{index + 1}</p>
              <p className="hidden md:flex">{item.testCode}</p>
              <p className="">{item.testName}</p>
              <p className="">{item.category}</p>
            </div>
          ))}
      </div>
      <Stack spacing={2} className="flex self-center my-3 ">
        <Pagination
          count={totalPages}
          page={pageNumber + 1}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
      <div className="flex justify-center my-3">
        <Button onClick={getData} title={"Load Tests"} />
      </div>
    </div>
  );
};

export default PaginationComponent;
