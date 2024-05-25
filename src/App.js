import { useState } from "react";
import Sidebar from "./components/SideBar/Sidebar";
import Header from "./components/Header/Header";
import Test from "./Screens/TestScreen/Test";
import Group from "./Screens/Master/GroupScreen/Group";
import LabCharges from "./Screens/Lab Charges/LabCharges";
import DepartmentRemarks from "./Screens/Department Remarks/DepartmentRemarks";
import LabRegistration from "./Screens/Lab Registration/LabRegistration";
import SampleCollection from "./Screens/Sample Collection/SampleCollection";
import Biochemistry from "./Screens/Lab Results/Biochemistry/Biochemistry";
import PDFButton from "./components/ReactPDFLearning/PDFButton";
import LabReport from "./Screens/Lab Report/LabReport";

function App() {
  const [show, setShow] = useState(true);

  return (
    <div className="bg-slate-800">
      <Header
        onClick={() => {
          setShow(!show);
        }}
        icon={show ? "uil uil-bars" : "uil uil-times"}
      />
      <div className="main bg-slate-800">
        <div className={show ? "hidden" : "flex"}>
          <Sidebar />
        </div>
        <div className="container">
          {/* <Test /> */}
          {/* <Group /> */}
          {/* <LabCharges /> */}
          {/* <DepartmentRemarks /> */}
          {/* <LabRegistration /> */}
          {/* <SampleCollection /> */}
          {/* <Biochemistry /> */}
          <LabReport />
          {/* <PDFButton /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
