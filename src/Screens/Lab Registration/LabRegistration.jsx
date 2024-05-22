import React, { useEffect, useState } from "react";
import MrPagination from "../../components/Pagination/MR No/MrPagination";
import LabelInput from "../../components/Inputs/LabelInput";
import Auto from "../../components/AutoComplete/Auto";
import axios from "axios";
import { useSelector } from "react-redux";
import Button from "../../components/Buttons/Button";
import { ErrorAlert, SuccessAlert } from "../../components/Alert/Alerts";
import "jspdf-autotable";
import jsPDF from "jspdf";
import moment from "moment/moment";

const LabRegistration = () => {
  const [mrDara, setMrData] = useState([]);
  const [data, setData] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [consultant, setConsultant] = useState([]);
  const [party, setParty] = useState([]);
  const [recieptType, setRecieptType] = useState([]);
  const [location, setLocation] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [testDetails, setTestDetails] = useState([]);
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [referalNo, setreferalNo] = useState("");
  const [reset, setReset] = useState(false);
  const [returnData, setReturnData] = useState([]);

  const url = useSelector((state) => state.url);
  useEffect(() => {
    PrintToThermal();
  }, [returnData]);
  useEffect(() => {
    // Calculate total price whenever testDetails changes
    const totalPrice = testDetails.reduce((total, currentItem) => {
      return total + currentItem.price;
    }, 0);
    setAmount(totalPrice);
  }, [testDetails]);

  const Check = (item) => {
    setMrData(item);
    console.log(item);
  };

  const message = async (message) => {
    console.log("at line no. 19", message);
    setReset(false);
    // // console.log("at line no. 19", message);
    try {
      let response = await axios.get(`${url}/vectorconsultant?name=${message}`);
      console.log(response);
      setData(response.data.data);
    } catch (error) {
      console.log("error at 24", error);
      setData(null);
    }
  };
  const message2 = async (message) => {
    console.log("at line no. 19", message);
    setReset(false);
    setParty([]);
    setTestDetails([]);
    // console.log("at line no. 19", message);
    try {
      let response = await axios.get(`${url}/vectorparty?name=${message}`);
      console.log(response.data.data);
      let searchTerm = message.toLowerCase();
      // const flattenedArray = response.data.data.flatMap((item) => item.childs);
      const flattenedArray = response.data.data;
      let d = flattenedArray.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
      console.log("data at 45", flattenedArray);
      setData(d);
    } catch (error) {
      console.log("error at 24", error);
      setData(null);
    }
  };
  const checkClick = (message, item) => {
    if (message === "party") {
      setParty(item);
      return;
    }
    if (message === "consultant") {
      setConsultant(item);
      return;
    }
    if (message === "test") {
      try {
        console.log("Before updating testDetails:", testDetails);
        let data = {
          name: item.name,
          price: item.price,
          code: item.code,
          test_id: item._id,
        };

        const updateTestDetails = () => {
          setTestDetails([...testDetails, data]);
        };
        setIsValidName(!isValidName);
        // Call the function to update testDetails
        updateTestDetails();

        const totalPrice = testDetails.reduce((total, currentItem) => {
          return total + currentItem.price;
        }, 0);
        setAmount(totalPrice);
        console.log("Amount", amount, totalPrice);
      } catch (error) {
        console.log(error);
      }
      return;
    }
    if (message === "payment") {
      setRecieptType(item);
      return;
    }
    if (message === "location") {
      setLocation(item);
      console.log("location", location);
      return;
    }
  };

  const message3 = async (message) => {
    console.log("at line no. 60", message);
    if (party.length === 0)
      return ErrorAlert({ text: "Please Select Party Name!!!", timer: 1000 });
    setReset(false);
    try {
      let response = await axios.get(
        `${url}/vectorlabcharges?name=${message}&party=${party.name}&_id=${party._id}`
      );
      console.log(response.data.data);
      let searchTerm = message.toLowerCase();
      // const flattenedArray = response.data.data.flatMap((item) => item.childs);
      const flattenedArray = response.data.data;
      let d = flattenedArray.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
      console.log("data at 45", flattenedArray);
      setData(d);
    } catch (error) {
      console.log("error at 24", error);
      setData(null);
    }
  };

  const message4 = async (message) => {
    console.log("at line no. 120", message);
    // // console.log("at line no. 19", message);
    setReset(false);
    try {
      let response = await axios.get(`${url}/paymentreciept?name=${message}`);
      console.log("at line 122", response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log("error at 24", error);
      setData(null);
    }
  };

  const message5 = async (message) => {
    console.log("at line no. 19", message);
    // // console.log("at line no. 19", message);
    setReset(false);
    try {
      let response = await axios.get(`${url}/cashlocation?name=${message}`);
      console.log("at line 131", response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log("error at 24", error);
      setData(null);
    }
  };

  const delLine = async (id) => {
    const filteredDetails = testDetails.filter((item, index) => index !== id);
    setTestDetails(filteredDetails);
    console.log(testDetails, id);
  };
  const CheckDetails = () => {
    console.log("13245", testDetails);
    if (mrDara.length == 0) {
      ErrorAlert({ text: "Please Select MR No.", timer: 2000 });
      return;
    }
    if (consultant.length == 0) {
      ErrorAlert({ text: "Please Select Consultant Name.", timer: 2000 });
      return;
    }
    if (testDetails.length == 0) {
      ErrorAlert({ text: "Please Select Tests From List,", timer: 2000 });
      return;
    }
    if (recieptType.length == 0) {
      ErrorAlert({ text: "Please Select Reciept Type", timer: 2000 });
      return;
    }
    if (location.length == 0) {
      ErrorAlert({ text: "Please Select Receipt Location", timer: 2000 });
      return;
    }
    handleSubmit();
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${url}/labregistration`, {
        mrData: [mrDara],
        consultantName: consultant.name,
        consultantCode: consultant.code,
        remarks,
        partyName: party.name,
        partyCode: party.accountCode,
        shiftNo: `0001`,
        test: testDetails,
        createdUser: "Hamza",
        receiptType: recieptType.name,
        receiptLocation: location.name,
        bankName,
        referalNo,
        totalAmount: amount,
      });

      // Set the returnData state with the response data
      setReturnData(response.data.data);

      // Show success alert
      SuccessAlert({ text: "Data Saved Successfully", timer: 2000 });

      // Clear the form fields and state
      Empty();
      // callThermal(response.data.data);
    } catch (error) {
      console.log("Error:", error);
      ErrorAlert({ text: error.response.data.message });
    }
  };

  const Empty = () => {
    try {
      setMrData([]);
      setData(null);
      setRemarks("");
      setConsultant([]);
      setParty([]);
      setRecieptType([]);
      setLocation([]);
      setTestDetails([]);
      setAmount("");
      setAmount("");
      setBankName("");
      setreferalNo("");
      setIsValidName(!isValidName);
    } catch (error) {
      console.log(error);
    }
  };

  const PrintToThermal = () => {
    const printData = [
      { name: "Hamza" },
      { fatherName: "Farooq" },
      { age: 24 },
      { address: [{ street: "Street Name" }, { city: "City Name" }] },
    ];
    console.log(returnData);
    if (returnData.length <= 0) return;

    // Create a new jsPDF instance with custom dimensions for 4-inch paper
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: [4, 13], // 4 inches wide, 13 inches tall
    });

    // Define the starting y-coordinate for the text
    let startY = 0.5;

    // Function to add text and handle page breaks
    const addText = (text, x, y) => {
      const lineHeight = 0.3; // Adjust as needed
      const pageHeight = doc.internal.pageSize.height - 0.5; // Adjust for margins
      const startX = x || 0.3;
      const startY = y || 0.5;

      let cursorY = startY;

      const lines = doc.splitTextToSize(text, 3.5); // Max width for text

      lines.forEach((line) => {
        if (cursorY + lineHeight > pageHeight) {
          doc.addPage();
          cursorY = 0.5; // Reset cursor to top of new page
        }

        doc.text(line, startX, cursorY);
        cursorY += lineHeight;
      });
    };

    doc.setFontSize(15);
    doc.text("Zubaida Medical Center", 0.9, 0.5); // Adjust x and y coordinates as needed

    // Draw a border around the "PATIENT DATA" section
    doc.setDrawColor(0); // Set the border color to black
    doc.setLineWidth(0.01); // Set the border width
    doc.rect(0.25, 0.6, 3.5, 0.5); // Draw a rectangle around the "PATIENT DATA" section

    doc.text("PATIENT DATA", 1.2, 0.94);
    doc.setFontSize(12);
    if (printData[0].name) {
      doc.text(
        `Name:  ${returnData.mrData[0].patientName} ${returnData.mrData[0].fatherName}`,
        0.3,
        1.6
      );
    }

    doc.text(`age:    ${returnData.mrData[0].age}`, 0.3, 1.9);

    doc.text(`Cell:    ${returnData.mrData[0].cell}`, 0.3, 2.2);
    doc.text(`Mr No.:    ${returnData.mrData[0].mrNo}`, 0.3, 2.5);
    doc.text(`Lab No:    ${returnData.labNo}`, 0.3, 2.8);
    doc.text(`Consultant:    ${returnData.consultantName}`, 0.3, 3.1);
    doc.text(`Party Name:    ${returnData.partyName}`, 0.3, 3.4);
    doc.text(`Receipt Type:    ${returnData.receiptType}`, 0.3, 3.7);
    doc.text(`Location:    ${returnData.receiptLocation}`, 0.3, 4);
    doc.text(`Remarks:    ${returnData.remarks}`, 0.3, 4.3);
    doc.text(`Created User:    ${returnData.createdUser}`, 0.3, 4.6);
    doc.text(
      `Created Date:    ${moment(returnData.createdDate).format(
        "DD/MM/YYYY HH:mm:ss"
      )}`,
      0.3,
      4.9
    );

    // Test Info
    doc.setDrawColor(0); // Set the border color to black
    doc.setLineWidth(0.01); // Set the border width
    doc.rect(0.25, 5.1, 3.5, 0.5); // Draw a rectangle around the "PATIENT DATA" section

    doc.setFontSize(15);
    doc.text("TESTS INFO", 1.4, 5.4);
    doc.setFontSize(10);
    doc.text("TESTS NAME", 0.3, 5.9);
    doc.text("QTY", 2.2, 5.9);
    doc.text("RATE", 2.7, 5.9);
    doc.text("AMOUNT", 3.2, 5.9);

    let total = 0; // Initialize total price
    console.log("Test Data:", returnData.test);
    const maxNameWidth = returnData.test.reduce((max, item) => {
      const width = doc.getStringUnitWidth(item.name) * 10;
      return Math.max(max, width);
    }, 0);

    // Print each item in the printData array
    // Print each item in the printData array
    returnData.test.forEach((item, index) => {
      const y = 6.2 + index * 0.3; // Adjust the starting y-coordinate for each item
      const testName =
        item.name.length > 25
          ? `${item.name.slice(0, 25)}\n${item.name.slice(25)}`
          : item.name;
      doc.text(`${testName}`, 0.2, y);
      doc.text(`-`, 2.3, y, { align: "center" });
      doc.text(`-`, 2.8, y, { align: "center" });
      doc.text(`${item.price}`, 3.4, y, { align: "center" });
      // Add the price of the current item to the total
      total += item.price || 0;
    });

    // Print the total after printing all the test items
    // Print the total after printing all the test items
    let totalY = 6.2 + returnData.test.length * 0.3;
    doc.text(`Total: ${total.toFixed(2)}`, 2.2, totalY); // Adjust the coordinates as needed

    // Check if there's enough space on the current page for the message
    const remainingSpace = doc.internal.pageSize.height - (totalY + 0.3); // 0.3 is the height of the message
    if (remainingSpace < 0) {
      // If there's not enough space, add a new page
      doc.addPage();
      totalY = 0.5; // Reset the Y coordinate to the top of the page
    }

    // Print "Get well soon" message at the end of the page
    doc.setFontSize(20);
    doc.text(
      "___________________________",
      0,
      doc.internal.pageSize.height - 0.7
    );
    doc.text("Get well soon!", 1.2, doc.internal.pageSize.height - 0.3);

    // Convert the PDF to a data URL
    const dataUri = doc.output("datauristring");

    // Open a new tab with the PDF content
    const newTab = window.open();
    newTab.document.write(
      "<iframe width='100%' height='100%' src='" + dataUri + "'></iframe>"
    );

    // Wait for the PDF to fully load before printing
    newTab.onload = () => {
      newTab.focus();
      newTab.print();
    };
    setReturnData([]);
  };
  const showError = () => {
    ErrorAlert({ text: "No Data To Print !!!", timer: 1500 });
  };
  return (
    <div className="flex">
      {/* Other Data */}

      <div className="border-2 w-full h-auto">
        <h1 className="font-bold text-center underline my-2">
          TEST REGISTRATION
        </h1>
        {/* inputs */}
        <div className="">
          <LabelInput
            label="Mr No."
            placeholder={"Mr No."}
            disabled
            value={mrDara.length == 0 ? "" : mrDara?.mrNo}
          />
          <LabelInput
            label="Patient Name"
            placeholder={"Patient Name"}
            value={mrDara.length == 0 ? "" : mrDara?.patientName}
            disabled
          />
          <LabelInput
            label={"Gender"}
            placeholder={"Gender"}
            disabled
            value={mrDara.length == 0 ? "" : mrDara?.gender}
          />

          <LabelInput
            label={"Marital Status"}
            placeholder={"Marital Status"}
            disabled
            value={mrDara.length == 0 ? "" : mrDara?.maritalStatus}
          />
          <LabelInput
            label={"Age"}
            placeholder={"Age"}
            disabled
            value={mrDara.length == 0 ? "" : mrDara?.age}
          />
          <LabelInput
            label={"Cell No."}
            placeholder={"Cell No."}
            disabled
            value={mrDara.length == 0 ? "" : mrDara?.cell}
          />
          <LabelInput
            label={"Address"}
            placeholder={"Address"}
            disabled
            value={mrDara.length == 0 ? "" : mrDara?.address}
          />
          <Auto
            data={data}
            placeholder={"Consultant Name"}
            label={"Consultant Name"}
            onChange={message}
            onClick={(a) => checkClick("consultant", a)}
          />
          <LabelInput
            label={"Remarks"}
            placeholder={"Remarks"}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
          <Auto
            data={data}
            label={"Party Name"}
            placeholder={"Party Name"}
            onChange={message2}
            onClick={(a) => checkClick("party", a)}
          />
          <Auto
            data={data}
            label={"Test Name"}
            placeholder={"Test Name"}
            onChange={message3}
            onClick={(a) => checkClick("test", a)}
            isChecked={isChecked}
          />
          <Auto
            data={data}
            label={"Receipt Type"}
            placeholder={"Receipt Type"}
            onChange={message4}
            onClick={(a) => checkClick("payment", a)}
          />
          <Auto
            data={data}
            label={"Receipt Location"}
            placeholder={"Receipt Location"}
            onChange={message5}
            onClick={(a) => checkClick("location", a)}
          />

          <LabelInput
            label={"Bank Name"}
            placeholder={"Bank Name"}
            disabled={
              recieptType.length !== 0 && recieptType.name === "Cash" // Condition to disable input
            }
            onChange={(e) => setBankName(e.target.value)}
          />
          <LabelInput
            label={"Ref. No."}
            placeholder={"Ref. No."}
            type={"number"}
            onChange={(e) => setreferalNo(e.target.value)}
          />
          <LabelInput
            label={"Amount"}
            placeholder={"Amount"}
            disabled={true}
            value={amount}
          />
        </div>
      </div>

      {/* MR Pagination */}
      <div className="border-2 w-full p-2">
        {/* MR No. */}
        <div>
          <MrPagination sendToParent={Check} />
        </div>
        {/* Tests */}
        <div className="my-2 py-2 border-2">
          <h1 className="font-bold text-center underline my-2">TEST DETAILS</h1>
          {/*  */}
          {testDetails &&
            testDetails.map((items, index) => (
              <div key={index} className="flex justify-between px-20 mt-3">
                <input
                  type="text"
                  name=""
                  id=""
                  value={items.name}
                  disabled={true}
                />
                <div className="border-2 w-16 text-white text-center">
                  {items.price}
                </div>
                <div className="flex space-x-2">
                  <div
                    className="border-2 cursor-pointer"
                    onClick={() => delLine(index)}
                  >
                    DEL
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className=" flex  justify-center items-center space-x-2">
          <div>Total Amount: </div>
          <div>{amount}</div>
        </div>

        <div className="flex justify-around mt-28">
          <Button title={"Save"} onClick={CheckDetails} />
          <Button
            title={"Print"}
            onClick={returnData.length <= 0 ? showError : PrintToThermal}
          />
          <Button title={"Delete"} />
        </div>
      </div>
    </div>
  );
};

export default LabRegistration;

/* <PartyWiseTestPagination length={7} /> */
