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
import moment from "moment/moment";

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
              <Text
                fixed
                style={[styles.font, { fontWeight: "bold" }, styles.wid]}
              >
                Patient Name: {text.otherDetails[0].mrData[0].patientName}
              </Text>
              <Text fixed style={[styles.font, styles.ml1, styles.wid1]}>
                Gender: {text.otherDetails[0].mrData[0].gender}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.wid]}>
                Contact: {text.otherDetails[0].mrData[0].cell}
              </Text>
              <Text fixed style={[styles.font, styles.ml2, styles.wid1]}>
                Consultant: {text.otherDetails[0].consultantName}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.wid]}>
                Party: {text.otherDetails[0].partyName}
              </Text>
              <Text fixed style={[styles.font, styles.ml3, styles.wid1]}>
                Lab No: {text.otherDetails[0].labNo}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.wid]}>
                Booking Data & Time:{" "}
                {moment(text.otherDetails[0].createdDate).format(
                  "DD:MM:YYYY HH:mm:ss"
                )}
              </Text>
              <Text fixed style={[styles.font, styles.ml4, styles.wid1]}>
                Patient Type: {text.otherDetails[0].receiptType}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.wid]}>
                Reporting Date & Time:{" "}
                {moment(text.resultTime).format("DD:MM:YYYY HH:mm:ss")}
              </Text>
              <Text fixed style={[styles.font, styles.ml5, styles.wid1]}>
                Age: {text.otherDetails[0].mrData[0].age}
              </Text>
            </View>
          </View>
        </View>
        {/* Department */}
        <Text style={styles.depHead}>Department Of Biochemistry</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.test]}>Test Name</Text>
          <Text style={[styles.test]}>Result</Text>
          <Text style={[styles.test2]}>Unit</Text>
          <Text style={[styles.test]}>Normal Ranges</Text>
        </View>
        <Text style={styles.testHeading}>
          {text.otherDetails[0].test[0].name}
        </Text>
        <View style={styles.tableData}>
          <Text style={[styles.test]}>{text.otherDetails[0].test[0].name}</Text>
          <Text style={[styles.test]}>{text.testResult}</Text>
          <Text style={[styles.test2]}>%%%</Text>
          <Text style={[styles.test]}>{text.testRanges[0].normalRanges}</Text>
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
    textAlign: "center",
    width: "100%",
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
    width: "30%",
    textAlign: "center",
  },
  test2: {
    width: "10%",
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
  wid: {
    width: "60%",
  },
  wid1: {
    width: "40%",
  },
});

export default PDFBiochemistry;
