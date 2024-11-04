import {
  Document,
  Page,
  View,
  StyleSheet,
  PDFViewer,
  Text,
} from "@react-pdf/renderer";
import { Prescription } from "../../shared/types/prescription";

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

type PdfProps = {
  prescription: Prescription;
  special?: boolean;
};

const PrescriptionPdf = ({ prescription, special }: PdfProps) => {
  return (
    <PDFViewer width={"100%"} height={"480px"}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            {special && (
              <>
                <Text style={styles.title}>
                  RECEITUÁRIO DE CONTROLE ESPECIAL
                </Text>

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
                    <Text>
                      Rua Alvares Machado, 44/305 - Fone: (51) 3330-4577
                    </Text>
                    <Text>{prescription.date}</Text>
                  </View>
                </View>
              </>
            )}
            <View style={{ marginHorizontal: "auto", marginTop: "100px" }}>
              <Text>Solicito autorizar: {prescription.patient.full_name}</Text>
              <Text>
                comprar {prescription.amount} de {prescription.medication}
              </Text>
              <Text>Modo de uso: {prescription.how_to_use}</Text>
            </View>

            {special && (
              <>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: "150px",
                    fontSize: 10,
                  }}
                >
                  <View>
                    <Text style={{ marginBottom: 16 }}>
                      IDENTIFICAÇÃO DO COMPRADOR
                    </Text>
                    <Text style={{ marginBottom: 8 }}>Nome:</Text>
                    <Text style={{ marginBottom: 8 }}>Identidade:</Text>
                    <Text style={{ marginBottom: 8 }}>Órgão Expedidor:</Text>
                    <Text style={{ marginBottom: 8 }}>Endereço:</Text>
                    <Text style={{ marginBottom: 8 }}>Cidade:</Text>
                    <Text style={{ marginBottom: 8 }}>Telefone:</Text>
                    <Text style={{ marginBottom: 8 }}>Uf:</Text>
                  </View>

                  <View>
                    <Text style={{ marginBottom: 16 }}>
                      IDENTIFICAÇÃO DO FORNECEDOR
                    </Text>
                    <Text style={{ marginBottom: 16 }}>
                      Data: ____/____/____
                    </Text>
                    <Text>____________________________________</Text>
                    <Text>Assinatura do farmacêutico</Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PrescriptionPdf;
