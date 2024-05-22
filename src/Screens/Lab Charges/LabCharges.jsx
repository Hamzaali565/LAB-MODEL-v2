import React, { useEffect, useState } from "react";
import PaginationComponent from "../../components/Pagination/Pagination";
import PartiesPagination from "../../components/Pagination/Parties/PartiesPagination";
import axios from "axios";
import { useSelector } from "react-redux";
import Button from "../../components/Buttons/Button";

const LabCharges = () => {
  //   state variables
  const [tests, setTests] = useState([]);
  const [party, setParty] = useState("");
  const [party_id, setParty_id] = useState("");
  const [partyTests, setPartyTests] = useState([]);
  const [mainData, setMainData] = useState([]);

  // url
  const url = useSelector((state) => state.url);
  useEffect(() => {
    getTests();
  }, []);

  // Function to fetch lab charges data
  const CheckData = async (item) => {
    try {
      let response = await axios.get(
        `${url}/getlabcharges?party=${item.childName}&party_id=${item.childId}`
      );
      const newPartyTests = response.data.data[0].testsPrice;
      setParty(item.childName);
      setParty_id(item.childId);
      setPartyTests(newPartyTests);
      updateMainData(newPartyTests);
    } catch (error) {
      console.log("error", error);
      setParty(item.childName);
      setParty_id(item.childId);
      setMainData(tests);
    }
  };

  // Function to update mainData with filtered data
  const updateMainData = (newPartyTests) => {
    // Get array of _id values from newPartyTests
    let data2Ids = newPartyTests.map((item) => item._id);

    // Filter data array to remove objects with _id present in data2Ids
    let filteredData = [
      ...newPartyTests,
      ...tests.filter((item) => !data2Ids.includes(item._id)),
    ];

    setMainData(filteredData);
    console.log("filteredData", filteredData);
  };

  const getTests = async () => {
    try {
      let response = await axios.get(`${url}/gettest`);
      let newData = response.data.data.map(
        ({ category, department, reportDays, style, testType, __v, ...rest }) =>
          rest
      );
      setTests(newData);
      console.log("response at 36", newData);
    } catch (error) {
      console.log("error", error);
    }
  };
  const valChange = (e, item, key) => {
    // Create a new array with updated prices
    const updatedMainData = mainData.map((eachitem) => {
      if (eachitem._id === item._id) {
        // Return a new object with the updated price
        if (key === "price") {
          return { ...eachitem, price: +e };
        } else if (key === "status") {
          return { ...eachitem, status: e };
        }
      }
      // For other items, return them unchanged
      return eachitem;
    });

    // Update the state with the new array
    setMainData(updatedMainData);

    console.log("mainData", updatedMainData);
    console.log(e);
  };

  const sendData = async () => {
    console.log(party);
    console.log(party_id);
    console.log("main Data", mainData);
    try {
      const response = await axios.post(`${url}/labchargesnew`, {
        party,
        party_id,
        testsPrice: mainData,
      });
      console.log("res 83", response);
      setMainData([]);
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <div>
      {/* All Parties */}
      <div>
        <PartiesPagination sendToParent={CheckData} />
      </div>

      {/* ALL TEST */}
      <div className="border-2 p-2">
        <h1 className="text-2xl text-center font-bold">All Test</h1>
        {/* Table */}
        <div className="flex justify-center">
          <table className="bg-gray-950">
            <tr className="border-2 items-center">
              <th className="hidden md:flex">Test Code</th>
              <th width="200">Test Name</th>
              <th width="450">Test Price</th>
              <th width="100">Status</th>
            </tr>
            {mainData.map((items, index) => (
              <tr className="border-2 items-center">
                <th className="hidden md:flex">{items.testCode}</th>
                <th width="200">{items.testName}</th>
                <th width="450">
                  <input
                    type="number"
                    name=""
                    value={items.price ? items.price : 0}
                    id=""
                    className="my-1 w-32 bg-transparent border-2 rounded-md"
                    onChange={(e) => valChange(e.target.value, items, "price")}
                  />
                </th>
                <th width="100">
                  <input
                    type="checkbox"
                    checked={items.status === true ? true : false}
                    className="cursor-pointer"
                    name=""
                    id=""
                    onChange={(e) =>
                      valChange(e.target.checked, items, "status")
                    }
                  />
                </th>
              </tr>
            ))}
          </table>
        </div>
        {/* ........... */}
        <div className="flex justify-center m-5">
          <Button title={"Save"} onClick={sendData} />
        </div>
      </div>
    </div>
  );
};

export default LabCharges;
