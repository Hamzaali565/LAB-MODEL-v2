import React from "react";
import { Text, Page, Document, StyleSheet, View } from "@react-pdf/renderer";

const PdfLearning = ({ text }) => {
  const MyPage = ({ children }) => (
    <Page style={styles.page}>
      <Text>{text[0].text}</Text>
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
        {text[0].date !== "" ? <Text fixed>{text[0].date}</Text> : null}
      </MyPage>
      <MyPage>
        <Text>
          <Text fixed>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor
            libero pariatur totam, fugit enim vitae. Non nesciunt alias quos
            dolor inventore odit molestiae vero saepe consectetur, laborum
            dolore cumque ratione? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Debitis illum, quasi vitae hic et voluptatem id voluptates
            repudiandae magnam labore ipsum provident quia incidunt dignissimos
            ad placeat. Rem, aperiam obcaecati! Laborum quos vitae obcaecati
            ullam error nesciunt labore? Earum eaque, fugit magni neque, quia
            voluptate in quas asperiores rerum inventore quam, obcaecati quidem
            soluta odit quisquam temporibus. Dicta, nemo ipsa. Illo ex
            distinctio animi reiciendis in dignissimos architecto nobis, enim
            reprehenderit quaerat voluptas nemo saepe quos molestiae
            perspiciatis possimus ipsam nam molestias, ducimus officiis repellat
            tenetur! Non eligendi iure nisi. Ea harum provident quia delectus
            enim? Laudantium dicta consequuntur dolores tenetur repellendus sint
            in itaque doloremque vero nulla rerum, ut, hic nisi consequatur eius
            similique excepturi possimus voluptatem eos quasi. Ea qui nesciunt
            soluta alias voluptate quisquam distinctio, tenetur laborum vitae
            molestias? Quaerat magni aspernatur maiores repellendus optio cum
            voluptatibus eius doloremque, dolorum, ut fuga eos totam numquam
            earum eligendi. Facilis mollitia deleniti assumenda et cum ab
            doloribus voluptas aspernatur nemo cumque tempore eos veniam
            molestias, pariatur optio, vel reiciendis. Maiores excepturi
            voluptatum magnam esse animi dolore possimus vitae delectus! Earum,
            tenetur voluptas dolore, sed animi, a eum quidem veniam reiciendis
            repudiandae commodi minima exercitationem sint ut! Minus esse,
            molestiae rem sed maxime amet repudiandae distinctio rerum ullam
            nostrum quae. Ipsa odio voluptatem molestias dolor, excepturi sequi
            praesentium dicta quis perferendis quod sunt voluptate! Accusantium
            debitis nam, cumque ab et aut tempore ad ipsam. Amet aspernatur
            sapiente obcaecati ea sunt.
          </Text>
        </Text>
      </MyPage>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  pageNumber: {
    left: 0,
    right: 0,
    bottom: 30,
    position: "absolute",
  },
});

export default PdfLearning;
