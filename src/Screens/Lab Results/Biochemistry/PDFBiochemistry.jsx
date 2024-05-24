import React from "react";
import logo from "../../../components/Image/ZMCLogo-2.png";
import {
  Text,
  Page,
  Document,
  StyleSheet,
  View,
  Image,
} from "@react-pdf/renderer";

const PDFBiochemistry = ({ text }) => {
  console.log("labNo", text);
  const MyPage = ({ children }) => (
    <Page style={styles.page}>
      <Image src={logo} style={styles.Image} />
      <View style={styles.content}>{children}</View>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  );

  return (
    <Document>
      <MyPage>
        <View>
          <Text fixed style={styles.headC1}>
            Patient Details
          </Text>
        </View>
        <View style={styles.head}>
          {/* Patient Details */}
          <View style={styles.headCNew}>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, { fontWeight: "bold" }]}>
                Patient Name: {text.otherDetails[0].mrData[0].patientName}
              </Text>
              <Text fixed style={[styles.font, styles.ml1]}>
                Gender: Male
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={styles.font}>
                Contact: 03111011484
              </Text>
              <Text fixed style={[styles.font, styles.ml2]}>
                Consultant: Dr. Naushad Baig
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={styles.font}>
                Party: The Soorty Enterprises
              </Text>
              <Text fixed style={[styles.font, styles.ml3]}>
                Lab No: 000005
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={styles.font}>
                Booking Data & Time: 23/02/2024 13:41:56
              </Text>
              <Text fixed style={[styles.font, styles.ml4]}>
                Patient Type: Cash
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={styles.font}>
                Reporting Date & Time: 23/02/2024 13:41:56
              </Text>
              <Text fixed style={[styles.font, styles.ml5]}>
                Age: 23Y
              </Text>
            </View>
          </View>
        </View>
        {/* Department */}
        <Text style={styles.depHead}>Department Of Biochemistry</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.test]}>Test Name</Text>
          <Text style={[styles.test2]}>Unit</Text>
          <Text style={[styles.test]}>Normal Ranges</Text>
        </View>
        <Text style={styles.testHeading}>ICT MALARIA</Text>
        <View style={styles.tableData}>
          <Text style={[styles.test]}>ICT MALARIA</Text>
          <Text style={[styles.test2]}>%%%</Text>
          <Text style={[styles.test]}>(10 - 12) to (13 - 20)</Text>
        </View>
      </MyPage>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  Image: {
    height: "50",
    width: "300",
  },
  pageNumber: {
    left: 0,
    right: 0,
    bottom: 30,
    position: "absolute",
  },
  head: {
    border: "1px solid black",
    marginTop: "2",
    padding: "2",
  },
  headC1: {
    border: "1px solid black",
    color: "white",
    backgroundColor: "#454545",
    textAlign: "center",
    padding: "2",
    marginTop: "3",
  },
  headC2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "3",
    marginTop: "3",
    textAlign: "left",
  },
  headCNew: {
    marginVertical: "2",
  },
  font: {
    fontSize: 10,
  },
  ml1: {
    marginRight: "100",
  },
  ml2: {
    marginRight: "30",
  },
  ml3: {
    marginRight: "90",
  },
  ml4: {
    marginRight: "78",
  },
  ml5: {
    marginRight: "120",
  },

  depHead: {
    border: "1px solid black",
    padding: "2",
    textAlign: "center",
    marginTop: "5",
    color: "white",
    backgroundColor: "#454545",
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#454545",
    color: "white",
    marginTop: "5",
    padding: "4",
    fontSize: "12",
    alignItems: "center",
  },
  test: {
    width: "40%",
    textAlign: "center",
  },
  test2: {
    width: "20%",
    textAlign: "center",
  },
  testHeading: {
    fontSize: "15",
    textDecoration: "underline",
    fontWeight: "bold",
    marginVertical: "4",
    paddingLeft: "3",
  },
  tableData: {
    display: "flex",
    flexDirection: "row",
    marginTop: "5",
    padding: "4",
    fontSize: "12",
    alignItems: "center",
  },
});

export default PDFBiochemistry;
