import React, { useEffect, useState } from "react";
import Input from "../../../components/Inputs/Input";
import Button from "../../../components/Buttons/Button";
import axios from "axios";
import { useSelector } from "react-redux";
import { ErrorAlert, SuccessAlert } from "../../../components/Alert/Alerts";
import moment from "moment";

const Biochemistry = () => {
  const [labNo, setLabNo] = useState("");
  const [loader, setLoader] = useState(false);
  const [labData, setLabData] = useState([]);
  const [detailsData, setDetailsData] = useState([]);
  const [labEntry, setLabEntry] = useState("");
  const url = useSelector((state) => state.url);
  useEffect(() => {
    console.log("detailsData", detailsData);
  }, [detailsData]);

  const GetLabData = async () => {
    setLoader(true);
    setDetailsData([]);
    if (labNo === "") {
      console.log("Please Enter Lab Number!!!");
      setLoader(false);
      return;
    }
    try {
      const response = await axios.get(`${url}/labregwise?labNo=${labNo}`);
      console.log("response of lab data", response.data.data);
      setLabData(response.data.data);
      setLoader(false);
    } catch (error) {
      console.log("error of lab data", error);
      if (error.response)
        ErrorAlert({ text: error.response.data.message, timer: 1500 });

      setLoader(false);
    }
  };

  const testDetails = async (test_id, age) => {
    setDetailsData([]);
    try {
      const response = await axios.get(
        `${url}/getranges?test_id=${test_id}&age=${age}`
      );
      // console.log("response of test details", respon);
      setDetailsData(response.data.data);
    } catch (error) {
      console.log("error of test details data", error);
      ErrorAlert({ text: error.response.data.message, timer: 1000 });
    }
  };

  const resultEntry = async () => {
    setLoader(true);
    try {
      // Ensure detailsData is not empty
      if (!detailsData || detailsData.length === 0) {
        throw new Error(
          "Please search lab No and click on selected Test first."
        );
      }

      // Extract details from the first entry
      const { _id, testCode, testName, testRanges } = detailsData[0];

      // Make the POST request
      const createResultEntry = await axios.post(`${url}/resultentry`, {
        test_id: _id,
        testCode,
        testName,
        testRanges,
        testResult: labEntry,
        labNo,
      });
      setLoader(false);
      SuccessAlert({ text: "Data Created Successfully", timer: 1500 });
      // Log the result
      console.log("Result entry", createResultEntry);
    } catch (error) {
      console.log("Error in result entry", error);
      setLoader(false);
      if (error.response) {
        ErrorAlert({ text: error.response.data.message, timer: 1500 });
      } else {
        ErrorAlert({ text: error.message, timer: 1500 });
      }
    }
  };

  return (
    <div>
      <h1 className="text-center text-3xl p-4">Biochemistry Result</h1>
      <div className="border-2 p-6">
        {/* lab Details */}
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
                  onSubmit={GetLabData}
                />
                <Button title={"Enter"} onClick={GetLabData} />
                <div
                  class={` ${loader === true ? "spinner-border" : ""}`}
                  role="status"
                >
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              {/* PAtient Details */}
              {labData.length > 0 && (
                <div className="p-3">
                  <p>Patient Name: {labData[0].mrData[0].patientName}</p>
                  <p>Age: {labData[0].mrData[0].age}</p>
                  <p>MR No. {labData[0].mrData[0].mrNo}</p>
                  <p>Gender: {labData[0].mrData[0].gender}</p>
                  <p>
                    Date:{" "}
                    {moment(labData[0].createdDate).format(
                      "DD:MM:YYYY HH:mm:ss"
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* Tests Details */}
          <div className="border-2 p-8 w-1/2">
            <h3 className="text-center underline text-2xl">Tests</h3>
            {labData.length > 0 &&
              labData[0].test.map((items) => (
                <div className="flex space-x-3 p-1 ">
                  <p
                    className="text-red-600 underline cursor-pointer font-bold"
                    onClick={() =>
                      testDetails(items.test_id, labData[0].mrData[0].age)
                    }
                  >
                    Select
                  </p>
                  <p>{items?.code}</p>
                  <p>{items?.name}</p>
                </div>
              ))}
          </div>
        </div>
        {/* Result Entry */}

        <div className="border-2 p-4 mt-4">
          <h1 className="text-center underline font-bold text-2xl">
            Result Entry
          </h1>

          {detailsData.length > 0 &&
            detailsData[0].testRanges.map((items, index) => (
              <div className="flex justify-around flex-wrap mt-3 items-center">
                <p>{index + 1}</p>
                <p>{detailsData[0].testName}</p>
                <p>{items?.normalRanges}</p>
                <Input
                  placeholder={"Enter Result"}
                  onChange={(e) => setLabEntry(e.target.value)}
                />
              </div>
            ))}
          <div className="flex justify-center mt-4">
            <Button title={"Save Result"} onClick={resultEntry} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biochemistry;
