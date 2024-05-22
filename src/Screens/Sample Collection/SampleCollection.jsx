import React, { useEffect, useState } from "react";
import CollectionTable from "../../components/Table/CollectionTable";
import axios from "axios";
import { useSelector } from "react-redux";
import Button from "../../components/Buttons/Button";
import { SuccessAlert } from "../../components/Alert/Alerts";

const SampleCollection = () => {
  const [data, setData] = useState([]);
  const [CB, setCB] = useState(false);
  const url = useSelector((state) => state.url);

  useEffect(() => {
    const bookedTests = async () => {
      try {
        const res = await axios.get(`${url}/bookedtests`);
        setData(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    bookedTests(); // Fetch data on initial render
  }, [CB]);

  const CheckChildData = async (item) => {
    try {
      console.log("item", item);
      const updateSampleCollection = await axios.put(
        `${url}/updatestatus?_id=${item[0]?.doc_id}&test_id=${item[0]._id}&status=${item[0]?.tagType}`
      );
      console.log(updateSampleCollection);
      setCB(!CB);
      SuccessAlert({ text: "Sample Collected Successfully.", timer: 800 });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadData = () => {
    setCB(!CB); // Trigger re-fetching data by toggling CB
  };

  return (
    <div>
      <h1 className="text-center font-bold underline text-4xl p-4">
        SAMPLE COLLECTION
      </h1>
      <div className="flex justify-center p-2">
        <Button onClick={handleLoadData} title={"LOAD DATA"} />
      </div>
      <div>
        <CollectionTable data1={data} childData={CheckChildData} />
      </div>
    </div>
  );
};

export default SampleCollection;
