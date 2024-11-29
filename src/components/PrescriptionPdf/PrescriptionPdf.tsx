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
    fontSize: 6,
    marginBottom: 32,
  },
  nomeMedico: {
    fontSize: 5,
  },
  dadosMedico: {
    fontSize: 4,
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
        <Page size="A7" style={styles.page}>
          <View style={styles.section}>
            <View
              style={{
                marginHorizontal: "auto",
                marginTop: "20px",
                fontSize: "8px",
                minWidth: "100%",
              }}
            >
              <View style={{display: "flex", justifyContent: "space-between", flexDirection: "row", fontSize: 8}}>
                <Text>{!special && prescription.patient.full_name}</Text>
                <Text>{formatDate(prescription.date)}</Text>
              </View>
              {special ? (
                <View style={{marginTop: "30px"}}>
                  <Text>Solicito autorizar: {prescription.patient.full_name}</Text>
                  <Text>
                    comprar {prescription.amount} de {prescription.medication}
                  </Text>
                  {prescription.how_to_use && (
                    <Text>{prescription.how_to_use}</Text>
                  )}
                </View>) : (
                <View style={{marginTop: "50px"}}>
                  <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Text>
                      {prescription.medication}
                    </Text>
                    <Text>
                      {prescription.amount}
                    </Text>
                  </View>
                  {prescription.how_to_use && (
                    <Text>{prescription.how_to_use}</Text>
                  )}
                </View>)}
                <Image src={RiscoImg} style={{width: "70px", marginHorizontal: "auto", marginTop: "32px"}} />
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PrescriptionPdf;
