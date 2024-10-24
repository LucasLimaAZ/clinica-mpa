import {
  Document,
  Page,
  View,
  StyleSheet,
  PDFViewer,
  Text,
} from "@react-pdf/renderer";
import { ExamRequest } from "../../shared/types/exam-request";

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
    fontSize: 12,
    marginBottom: 32,
  },
  nomeMedico: {
    fontSize: 10,
  },
  dadosMedico: {
    fontSize: 9,
    display: "flex",
  },
});

const ExamRequestPdf = (examRequest: ExamRequest) => {
  return (
    <PDFViewer width={"100%"} height={"480px"}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>Requisição de exames:</Text>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={styles.nomeMedico}>
                <Text>Pedro Antônio Schmidt do Prado Lima</Text>
                <View style={styles.dadosMedico}>
                  <Text>Médico</Text>
                  <Text>CREMERS 13202 - CPF 389231140-49</Text>
                </View>
              </View>

              <View style={styles.nomeMedico}>
                <Text>Rua Alvares Machado, 44/305 - Fone: (51) 3330-4577</Text>
                <Text>{examRequest.date.toString()}</Text>
              </View>
            </View>

            <View style={{ marginHorizontal: "auto", marginTop: "100px" }}>
              <Text>
                Solicito exames para {examRequest.patient.full_name}:{" "}
              </Text>
              <Text>{examRequest.exams}</Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "150px",
                fontSize: 10,
              }}
            ></View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default ExamRequestPdf;
