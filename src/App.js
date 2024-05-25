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
import LabReport from "./Screens/Lab Report/LabReport";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [show, setShow] = useState(true);

  return (
    <Router>
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
            <Routes>
              <Route path="/test" element={<Test />} />
              <Route path="/group" element={<Group />} />
              <Route path="/party-wise-lab-charges" element={<LabCharges />} />
              <Route
                path="/department-wise-remarks"
                element={<DepartmentRemarks />}
              />
              <Route path="/test-booking" element={<LabRegistration />} />
              <Route path="/sample-collection" element={<SampleCollection />} />
              <Route path="/biochemistry" element={<Biochemistry />} />
              <Route path="/lab-report" element={<LabReport />} />
              {/* Add other routes here */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
