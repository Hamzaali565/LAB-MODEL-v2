import React, { useState } from "react";
import Button from "../../../components/Buttons/Button";
import LabledDropDown from "../../../components/Inputs/LabledDropDown";
import LabelInput from "../../../components/Inputs/LabelInput";
import Pagination from "../../../components/Pagination/Pagination";
import Pagination2 from "../../../components/Pagination/Pagination";
import { ErrorAlert, SuccessAlert } from "../../../components/Alert/Alerts";
import axios from "axios";
import { useSelector } from "react-redux";

const Group = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [status, setStatus] = useState(null);
  const [resetFlag, setResetFlag] = useState(false);
  const [preview, setPreview] = useState([]);
  const [metaData, setMetaData] = useState([
    { groupName: "", id: "1" },
    { reportDays: "", id: "3" },
  ]);
  const url = useSelector((state) => state.url);

  const optionsTatus = [
    { value: "Active ", label: "Active " },
    { value: "DeActive", label: "DeActive" },
  ];
  const options = [
    { value: "Biochemistry", label: "Biochemistry" },
    { value: "Haematology", label: "Haematology" },
    { value: "Serology", label: "Serology" },
    { value: "Cytology", label: "Cytology" },
    { value: "Microbiology", label: "Microbiology" },
    { value: "Parasitology", label: "Parasitology" },
    { value: "Clinical Pathology", label: "Clinical Pathology" },
  ];

  const handleChange = (newSelectedOption) => {
    setSelectedOption(newSelectedOption);
    console.log("Selected Option", selectedOption);
  };
  const handleReset = () => {
    setResetFlag((prevFlag) => !prevFlag);
    setSelectedOption(null);
    setStatus(null);
    setMetaData([
      { groupName: "", id: "1" },
      { reportDays: "", id: "3" },
    ]);
    setPreview([]);
    // setResetFlag(!resetFlag);
    // Reset the selected value
    console.log("Selected Option Reset", selectedOption);
  };
  const receiveFromChild = async (item) => {
    // Do something with the data received from the child
    for (const items of preview) {
      if (items._id === item._id) {
        ErrorAlert({ text: "Item Already Selected", timer: "1000" });
        console.log("Item Already Selected");
        return;
      }
    }
    setPreview((prevData) => {
      const newIndex = prevData.length; // Calculate the new index
      const updatedItem = { ...item, serialNo: newIndex + 1 }; // Add index to item
      return [...prevData, updatedItem]; // Add the item with index
    });

    console.log("Data received from child:", preview);
  };
  const delItem = (_id) => {
    setPreview(preview.filter((item) => item._id !== _id));
  };
  const handleCheck = (value, item, data) => {
    const targetObject = preview.find((obj) => obj._id === item._id);
    if (data === "underline") {
      targetObject.underline = value;
      console.log("value", preview);
      return;
    }
    if (data === "bold") {
      targetObject.bold = value;
      console.log("value", preview);
      return;
    }
    if (data === "italic") {
      targetObject.italic = value;
      console.log("value", preview);
      return;
    }
  };

  const inpChange = (value, id, name) => {
    setMetaData((prevMetaData) =>
      prevMetaData.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
    console.log(metaData);
  };
  const save = async () => {
    const param1 = ["groupName", "reportDays"];
    for (const param of param1) {
      console.log("at line 102");
      for (const item of metaData) {
        if (item[param] === "") {
          // setErrorMessage(``);
          ErrorAlert({ text: `${param} is required.`, timer: 1000 });
          console.log("at line 103");
          return;
        }
      }
    }
    if (!selectedOption)
      return ErrorAlert({ text: `Department is required`, timer: 1000 });
    if (!status) return ErrorAlert({ text: `Status is required`, timer: 1000 });
    if (preview.length <= 0)
      return ErrorAlert({ text: `Please Select the Tests.`, timer: 1000 });
    console.log("...loading");
    try {
      let response = await axios.post(`${url}/labgroup`, {
        groupName: metaData[0].groupName,
        department: selectedOption.label,
        reportDays: metaData[1].reportDays,
        status: status.label === "Active" ? true : false,
        groupDetails: preview,
      });
      SuccessAlert({ text: response.data.message, timer: 2000 });
      handleReset();
      console.log("...loaded");
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_BAD_REQUEST") {
        ErrorAlert({
          text: error.response.data.message,
          timer: 3000,
        });
      } else {
        ErrorAlert({
          text: "Check Your internet connection",
          timer: 3000,
        });
      }
    }
  };
  return (
    <div className="">
      {/* Group Information */}
      <div className="border-2 ">
        <h1 className="text-2xl flex justify-center">Group Detail</h1>
        <div className="lg:flex flex-wrap ">
          <LabelInput
            label="Group Code"
            placeholder={"Group Code"}
            type={"text"}
            disabled

            //  value={value}
          />
          <LabelInput
            label="Group Name"
            placeholder={"Group Name"}
            type={"text"}
            onChange={(e) => {
              inpChange(e.target.value, "1", "groupName");
            }}
            value={metaData[0].groupName}
          />
          <LabledDropDown
            options={options}
            selectedOption={selectedOption}
            value={selectedOption}
            onChange={handleChange}
            label="Department"
          />

          <LabelInput
            label="Repor Days"
            placeholder={"Report Days"}
            type={"text"}
            onChange={(e) => {
              inpChange(e.target.value, "3", "reportDays");
            }}
            value={metaData[1].reportDays}
          />
          <LabledDropDown
            options={optionsTatus}
            selectedOption={status}
            value={status}
            onChange={(e) => {
              setStatus(e);
            }}
            label="Status"
          />
        </div>
      </div>

      {/* Tests for Group */}
      {selectedOption && (
        <div>
          <h1 className="text-2xl flex justify-center">Tests For Group</h1>
          <div></div>
          <Pagination2
            department={selectedOption ? selectedOption.value : ""}
            sendToParent={receiveFromChild}
            datag={"khaliKerdo"}
            resetFlag={resetFlag}
          />
          {/* test to be shown */}
          <div className="flex flex-col items-center">
            <h1 className="flex justify-center lg:text-2xl my-2">
              Test To Be Shown
            </h1>
            <table className="bg-gray-950">
              <tr className="border-2 items-center">
                <th className="hidden md:flex">S.No</th>
                <th width="400">Test Name</th>
                <th width="200">Test Type</th>
                <th width="100">Bold</th>
                <th width="100">Italic</th>
                <th width="100">Underline</th>
                <th width="100">Remove</th>
              </tr>

              {preview &&
                preview.map((items, index) => (
                  <tr
                    className="border-2 items-center bg-slate-500 "
                    key={index}
                  >
                    <th className="hidden md:flex">{index + 1}</th>
                    <th width="400">{items.testName}</th>
                    <th width="200">{items.category}</th>
                    <th width="100" className="">
                      <input
                        type="checkbox"
                        className="cursor-pointer"
                        onChange={(e) =>
                          handleCheck(e.target.checked, items, "bold")
                        }
                      />
                    </th>
                    <th width="100" className="">
                      <input
                        type="checkbox"
                        className="cursor-pointer"
                        onChange={(e) =>
                          handleCheck(e.target.checked, items, "italic")
                        }
                      />
                    </th>
                    <th width="100" className="">
                      <input
                        type="checkbox"
                        className="cursor-pointer"
                        onChange={(e) =>
                          handleCheck(e.target.checked, items, "underline")
                        }
                      />
                    </th>
                    <th
                      width="100"
                      className="text-red-700 cursor-pointer hover:scale-"
                      onClick={() => {
                        delItem(items._id);
                      }}
                    >
                      X
                    </th>
                  </tr>
                ))}
            </table>
          </div>
        </div>
      )}
      {selectedOption && (
        <div className="flex justify-center space-x-3 my-4">
          <Button onClick={save} title={"Save"} />
          <Button onClick={handleReset} title={"Reset"} />
        </div>
      )}
    </div>
  );
};

export default Group;
