import React, { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import PdfLearning from "./PdfLearning";
import { v4 as uuidv4 } from "uuid";

const PDFButton = () => {
  const [text, setText] = useState([
    { text: "Hamza Ali Chishti 123", date: "20/12/2024" },
  ]);
  const handleButtonClick = async () => {
    // Generate a unique key to force re-render
    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(<PdfLearning key={key} text={text} />).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
  };

  return (
    <div>
      <button onClick={handleButtonClick}>View PDF</button>
    </div>
  );
};

export default PDFButton;
