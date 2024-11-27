import {
  Document,
  Page,
  View,
  StyleSheet,
  PDFViewer,
  Text,
  Image,
} from "@react-pdf/renderer";
import { Prescription } from "../../shared/types/prescription";
import { formatDate } from "../../shared/helper";
import RiscoImg from "../../assets/img/risco.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    width: "100%",
  },
  section: {
    margin: 20,
    padding: 20,
    flexGrow: 1,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 9,
    marginBottom: 32,
  },
  nomeMedico: {
    fontSize: 8,
  },
  dadosMedico: {
    fontSize: 7,
    display: "flex",
  },
});

type PdfProps = {
  prescription: Prescription;
  special?: boolean;
};

const PrescriptionPdf = ({ prescription, special }: PdfProps) => {
  return (
    <PDFViewer width={"100%"} height={"480px"}>
      <Document>
        <Page size="A5" style={styles.page}>
          <View style={styles.section}>
            <View
              style={{
                marginHorizontal: "auto",
                marginTop: "50px",
                fontSize: "12px",
                minWidth: "100%",
              }}
            >
              <View style={{display: "flex", justifyContent: "space-between", flexDirection: "row", fontSize: 14}}>
                <Text>{!special && prescription.patient.full_name}</Text>
                <Text>{formatDate(prescription.date)}</Text>
              </View>
              {special ? (
                <View style={{marginTop: "50px"}}>
                  <Text>Solicito autorizar: {prescription.patient.full_name}</Text>
                  <Text>
                    comprar {prescription.amount} de {prescription.medication}
                  </Text>
                  {prescription.how_to_use && (
                    <Text>Modo de uso: {prescription.how_to_use}</Text>
                  )}
                </View>) : (
                <View style={{marginTop: "50px"}}>
                  <Text>
                    {prescription.amount}
                  </Text>
                  <Text>
                    {prescription.medication}
                  </Text>
                  {prescription.how_to_use && (
                    <Text>Modo de uso: {prescription.how_to_use}</Text>
                  )}
                </View>)}
                <Image src={RiscoImg} style={{width: "200px", marginHorizontal: "auto", marginTop: "32px"}} />
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PrescriptionPdf;
