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
    fontSize: 24,
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
          {props.etiquetas?.map((etiqueta) => (
            <Text style={{ paddingVertical: "8px" }}>
              {etiqueta.id} - {etiqueta.full_name}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default LabelPdf;
