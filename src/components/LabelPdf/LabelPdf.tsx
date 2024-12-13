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
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    height: "25.4mm",
    marginBottom: 0,
  },
  column: {
    width: "101.6mm",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #fff",
  },
  label: {
    fontSize: 10,
    textAlign: "center",
    paddingHorizontal: 5,
  },
});

type LabelPdfProps = {
  etiquetas: Label[];
};

const LabelPdf = (props: LabelPdfProps) => {
  const etiquetasDivididas = [];
  for (let i = 0; i < props.etiquetas.length; i += 2) {
    etiquetasDivididas.push(props.etiquetas.slice(i, i + 2));
  }

  return (
    <PDFViewer width={"100%"} height={"480px"}>
      <Document>
        <Page size="LETTER" style={styles.page}>
          {etiquetasDivididas.map((linha, rowIndex) => (
            <View style={styles.row} key={`row-${rowIndex}`}>
              {linha.map((etiqueta, colIndex) => (
                <View style={styles.column} key={`col-${rowIndex}-${colIndex}`}>
                  <Text style={styles.label}>
                    {etiqueta.file_number} - {etiqueta.full_name}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default LabelPdf;
