import React, { useState } from "react";
import Button from "../../components/Buttons/Button";
import moment from "moment";
import axios from "axios";
import { ErrorAlert } from "../../components/Alert/Alerts";
import { useSelector } from "react-redux";
import Input from "../../components/Inputs/Input";
import { pdf } from "@react-pdf/renderer";
import { v4 as uuidv4 } from "uuid";
import PDFBiochemistry from "../Lab Results/Biochemistry/PDFBiochemistry";

const LabReport = () => {
  const [loader, setLoader] = useState(false);
  const [labNo, setLabNo] = useState("");
  const [labData, setLabData] = useState([]);
  const [labData1, setLabData1] = useState([]);
  const [detailsData, setDetailsData] = useState([]);
  const [myId, setMyId] = useState("");

  const url = useSelector((state) => state.url);
  const labWise = async () => {
    try {
      const response = await axios.get(`${url}/result?labNo=${labNo}`);
      const result = Object.assign({}, ...response.data.data);
      setLabData(result);
      setLabData1([{ text: "CarryOn" }]);
      console.log(result);
    } catch (error) {
      console.log("Error", error);
      ErrorAlert({ text: error.response.data.message });
      setLabData1([]);
    }
  };

  const handleButtonClick = async () => {
    // Generate a unique key to force re-render
    console.log("lab data ", labData.otherDetails);
    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(
      <PDFBiochemistry key={key} text={labData} />
    ).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
  };

  return (
    <div>
      <h1 className="text-2xl text-center underline font-bold my-3">
        Lab Report
      </h1>
      <div className="flex justify-between space-x-5">
        {/* input details */}
        <div className="border-2 p-8 w-1/2">
          <div>
            {/* input */}
            <div className="flex items-center space-x-3">
              <p>Lab No.</p>
              <Input
                type={"number"}
                onChange={(e) => setLabNo(e.target.value)}
                placeholder={"Enter Lab No."}
              />
              <Button title={"Enter"} onClick={labWise} />
              <div
                class={` ${loader === true ? "spinner-border" : ""}`}
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            {/* PAtient Details */}*{" "}
            {labData1.length > 0 && (
              <div className="p-3">
                <p>
                  Patient Name: {labData.otherDetails[0].mrData[0].patientName}
                </p>
                <p>Age: {labData.otherDetails[0].mrData[0].age}</p>
                <p>MR No. {labData.otherDetails[0].mrData[0].mrNo}</p>
                <p>Gender: {labData.otherDetails[0].mrData[0].gender}</p>
                <p>
                  Date:{" "}
                  {moment(labData.otherDetails[0].createdDate).format(
                    "DD:MM:YYYY HH:mm:ss"
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="border-2 w-1/2">
          <h1 className="text-center text-2xl my-3 underline">Test Details</h1>
          <p className="text-center">
            {labData1.length > 0 &&
              `Test Name: ${labData.otherDetails[0].test[0].name}`}
          </p>
          <div className="flex justify-center">
            <Button title={"Print"} onClick={handleButtonClick} />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabReport;
