import React, { useEffect, useState } from "react";
import LabelInput from "../../components/Inputs/LabelInput";
import LabledDropDown from "../../components/Inputs/LabledDropDown";
import TextArea from "../../components/Inputs/TextArea";
import Button from "../../components/Buttons/Button";
import Swal from "sweetalert2";
import axios from "axios";
import { useSelector } from "react-redux";
import { ErrorAlert, SuccessAlert } from "../../components/Alert/Alerts";

const Test = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [testName, setTestName] = useState("");
  const [department, setDepartment] = useState("");
  const [category, setCategory] = useState("");
  const [reportDays, setReportDays] = useState("");
  const [testType, setTestType] = useState("");
  const [rangeInfo, setRangeInfo] = useState([
    {
      equipment: "",
      min: "",
      max: "",
      fromAge: "",
      toAge: "",
      unit: "",
      normalRanges: "",
      gender: "",
      ageType: "",
    },
  ]);
  const [previewInfo, setPreview] = useState([
    {
      equipment: "",
      min: "",
      max: "",
      fromAge: "",
      toAge: "",
      unit: "",
      normalRanges: "",
      gender: "",
      ageType: "",
    },
  ]);

  useEffect(() => {
    // console.log(rangeInfo);
  }, [rangeInfo]);
  const options = [
    { value: "Biochemistry", label: "Biochemistry" },
    { value: "Haematology", label: "Haematology" },
    { value: "Serology", label: "Serology" },
    { value: "Cytology", label: "Cytology" },
    { value: "Microbiology", label: "Microbiology" },
    { value: "Parasitology", label: "Parasitology" },
    { value: "Clinical Pathology", label: "Clinical Pathology" },
  ];
  const optionsCategory = [
    { value: "Heading", label: "Heading" },
    { value: "Parameter", label: "Parameter" },
    { value: "Test", label: "Test" },
  ];
  const optionsType = [
    { value: "Routine", label: "Routine" },
    { value: "Special", label: "Special" },
    { value: "Out Source", label: "Out Source" },
  ];
  const optionsEquip = [{ value: "Equipment", label: "Equipment" }];
  const optionsGender = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];
  const optionsAgeType = [
    { value: "Day(s)", label: "Day(s)" },
    { value: "Month(s)", label: "Month(s)" },
    { value: "Year(s)", label: "Year(s)" },
  ];

  const handleInputChange = (e, index, field, type) => {
    setErrorMessage("");
    let value;
    if (type === "select") {
      // Handle the case when the input is a dropdown/select
      value = e.value;
    } else {
      // Handle other cases (text input, number input, etc.)
      value = e.target.value;
    }
    setRangeInfo((prevRangeInfo) => {
      const updatedItems = [...prevRangeInfo];
      if (updatedItems[index]) {
        const newItem = { ...updatedItems[index], [field]: value };
        updatedItems[index] = newItem;
      }
      //   console.log(updatedItems);
      //   setPreview(rangeInfo);
      return updatedItems;
    });
  };

  const prev = () => {
    const { ageType, fromAge, toAge, gender } = rangeInfo[0];
    // Empty Fields Check
    const params = ["equipment", "gender", "fromAge", "toAge", "ageType"];
    for (const param of params) {
      if (rangeInfo[0][param] === "") {
        setErrorMessage(`${param} is required.`);
        console.log(errorMessage);
        return;
      }
    }
    // age Greaters Check
    if (toAge < fromAge) {
      setErrorMessage("From Age must be less than or equal To Age.");
    } else if (fromAge <= 0 || toAge <= 0) {
      setErrorMessage("From Age And To Age Must be greater than 1.");
    }
    // duplicate Check
    const duplicate = previewInfo.some(
      (item) =>
        item.gender === gender &&
        item.fromAge === fromAge &&
        item.toAge === toAge &&
        item.ageType === ageType
    );

    if (duplicate) {
      // Display your error message or take necessary action
      console.error("Duplicate entry found!");
      setErrorMessage("Gender With Same Age Group not Allowed Twise!");
      return;
    }
    // avoiding first empty index but failed
    if (Object.keys(previewInfo[0]).length === 0) {
      setPreview(rangeInfo);
    } else {
      setPreview([...previewInfo, ...rangeInfo]);
    }
  };
  const empty = () => {
    setRangeInfo([
      {
        equipment: "",
        min: "",
        max: "",
        fromAge: "",
        toAge: "",
        unit: "",
        normalRanges: "",
      },
    ]);
    setReportDays("");
    setCategory("");
    setDepartment("");
    setTestName("");
    setTestType("");
    setPreview([
      {
        equipment: "",
        min: "",
        max: "",
        fromAge: "",
        toAge: "",
        unit: "",
        normalRanges: "",
        gender: "",
        ageType: "",
      },
    ]);
  };
  const url = useSelector((state) => state.url);
  const sendData = async () => {
    try {
      let response = await axios.post(`${url}/labtest`, {
        testName,
        testType,
        category,
        department,
        reportDays,
        testRanges: previewInfo.filter((items) => items.equipment !== ""),
      });
      console.log("response", response);
      SuccessAlert({ text: response.data.message, timer: 2000 });
      empty();
    } catch (error) {
      console.log("Error", error);
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

      console.log("prevInfo", previewInfo);
    }
  };
  return (
    <div className="overflow-hidden">
      {/* test Information */}
      <div className="border-black border-2 mx-2">
        <h1 className="flex justify-center mt-2 underline font-bold">
          Test Information
        </h1>
        <div className="sm:flex flex-wrap">
          <LabelInput
            label={"Test Code"}
            disabled
            placeholder={"Test code"}
            value={"T-001"}
          />
          <LabelInput
            label={"Test Name"}
            placeholder={"Type Test Name"}
            value={testName}
            onChange={(e) => {
              setTestName(e.target.value);
            }}
          />
          <LabledDropDown
            options={options}
            label={"Department"}
            onChange={(e) => {
              setDepartment(e.value);
            }}
          />
          <LabledDropDown
            options={optionsCategory}
            label={"Category"}
            onChange={(e) => {
              setCategory(e.value);
            }}
          />
          <LabelInput
            label={"Report Days"}
            type={"number"}
            placeholder={"Type Days"}
            onChange={(e) => {
              setReportDays(e.target.value);
            }}
            value={reportDays}
          />
          <LabledDropDown
            options={optionsType}
            label={"Test Type"}
            onChange={(e) => {
              setTestType(e.value);
            }}
          />
        </div>
      </div>
      {/* Test Range Information */}
      <div className="border-black border-2 mx-2 mt-4">
        <h1 className="flex justify-center mt-2 underline font-bold">
          Test Ranges Information
        </h1>
        <div className="sm:flex flex-wrap">
          {rangeInfo.map((_, index) => (
            <React.Fragment key={index}>
              <LabledDropDown
                options={optionsEquip}
                label={"Equipment"}
                selectedOption={_.equipment === "" ? null : _.equipment}
                onChange={(selectedOption) =>
                  handleInputChange(
                    selectedOption,
                    index,
                    "equipment",
                    "select"
                  )
                }
              />
              <LabledDropDown
                options={optionsGender}
                label={"Gender"}
                onChange={(selectedOption) =>
                  handleInputChange(selectedOption, index, "gender", "select")
                }
              />
              <LabelInput
                label={"From Age"}
                type={"number"}
                value={rangeInfo[index].fromAge}
                placeholder={"From Age"}
                onChange={(e) => handleInputChange(e, index, "fromAge")}
              />
              <LabelInput
                label={"To Age"}
                type={"number"}
                placeholder={"To Age"}
                onChange={(e) => handleInputChange(e, index, "toAge")}
                value={rangeInfo[index].toAge}
              />
              <LabledDropDown
                options={optionsAgeType}
                label={"Age Type"}
                onChange={(selectedOption) =>
                  handleInputChange(selectedOption, index, "ageType", "select")
                }
              />
              <LabelInput
                label={"Min"}
                type={"number"}
                value={rangeInfo[index].min}
                placeholder={"Min"}
                onChange={(e) => handleInputChange(e, index, "min")}
              />
              <LabelInput
                label={"Max"}
                type={"number"}
                placeholder={"Max"}
                onChange={(e) => handleInputChange(e, index, "max")}
                value={rangeInfo[index].max}
              />
              <LabelInput
                label={"Unit"}
                type={"text"}
                placeholder={"Unit"}
                onChange={(e) => handleInputChange(e, index, "unit")}
                value={rangeInfo[index].unit}
              />
              <TextArea
                placeholder="Normal Ranges"
                label="normal Ranges"
                onChange={(e) => handleInputChange(e, index, "normalRanges")}
                value={rangeInfo[index].normalRanges}
              />
            </React.Fragment>
          ))}
        </div>

        <div className="flex justify-center mb-2">
          <Button onClick={prev} title={"Add"} />
          <Button onClick={sendData} title={"Adda"} />
        </div>
        {errorMessage && (
          <p className="flex justify-center font-bold text-red-600 text-xs md:text-sm">
            *{errorMessage}*
          </p>
        )}
      </div>
      {/* Preview */}
      <div className="border-2 border-black mx-2 mt-4">
        <h1 className="flex justify-center mt-2 underline font-bold">
          Ranges Preview
        </h1>
        {/* Header Preview */}
        <div className="border-4 py-2 m-2 flex ">
          <p className="w-24 font-bold hidden md:flex justify-center">S.No</p>
          <p className="w-30 font-bold hidden md:flex justify-center">
            Equipment
          </p>
          <p className="w-24 font-bold lg:flex justify-center">Gender</p>
          <p className="w-20 font-bold hidden md:flex justify-center">Min</p>
          <p className="w-20 font-bold hidden md:flex justify-center">Max</p>
          <p className="w-20 font-bold lg:flex justify-center">Unit</p>
          <p className="w-24 font-bold lg:flex justify-center">From Age</p>
          <p className="w-24 font-bold lg:flex justify-center">To Age</p>
          <p className="w-24 font-bold lg:flex justify-center">Age Type</p>
          <p className="font-bold md:w-72 lg:w-96 lg:flex justify-center">
            Normal Ranges
          </p>
        </div>
        {previewInfo &&
          previewInfo.map(
            (items, i) =>
              items.equipment && (
                <div className="border-2 m-2 flex " key={i}>
                  <p className="w-24 hidden lg:flex justify-center">{i}</p>
                  <p className="w-30 hidden lg:flex justify-center">
                    {items.equipment}
                  </p>
                  <p className="w-24 flex justify-center">{items.gender}</p>
                  <p className="w-20 hidden lg:flex justify-center">
                    {items.min}
                  </p>
                  <p className="w-20 hidden lg:flex justify-center">
                    {items.max}
                  </p>
                  <p className="w-20 flex justify-center">{items.unit}</p>
                  <p className="w-24 flex justify-center">{items.fromAge}</p>
                  <p className="w-24 flex justify-center">{items.toAge}</p>
                  <p className="w-24 flex justify-center">{items.ageType}</p>
                  <p className="md:w-72 lg:w-96 lg:flex justify-center">
                    {items.normalRanges.length > 0 ? "True" : "-"}
                  </p>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default Test;
