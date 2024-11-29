import {
  Document,
  Page,
  View,
  StyleSheet,
  PDFViewer,
  Text,
} from "@react-pdf/renderer";
import { Label } from "../../shared/types/patient";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    width: "100%",
  },
  section: {
    margin: 20,
    padding: 20,
    flexGrow: 1,
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    paddingHorizontal: "10px",
  },
});

type LabelPdfProps = {
  etiquetas: Label[];
};

const LabelPdf = (props: LabelPdfProps) => (
  <PDFViewer width={"100%"} height={"480px"}>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.column}>
              {props.etiquetas
                ?.filter((_, index) => index % 2 === 0)
                .map((etiqueta) => (
                  <Text key={etiqueta.file_number} style={{ paddingVertical: "20px",  marginTop: "16px"}}>
                    {etiqueta.file_number} - {etiqueta.full_name}
                  </Text>
                ))}
            </View>
            <View style={styles.column}>
              {props.etiquetas
                ?.filter((_, index) => index % 2 !== 0)
                .map((etiqueta) => (
                  <Text key={etiqueta.file_number} style={{ paddingVertical: "20px",  marginTop: "16px"}}>
                    {etiqueta.file_number} - {etiqueta.full_name}
                  </Text>
                ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default LabelPdf;
