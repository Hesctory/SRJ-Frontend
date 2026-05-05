import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

interface Student {
  id: number;
  studentCode: number;
  dni: string;
  fullName: string;
  level: string;
  grade: string;
  section: string;
}

interface EnrolledStudentsReportProps {
  students: Student[];
  schoolYear: string;
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    paddingVertical: 32,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#333333",
    paddingBottom: 10,
  },
  schoolName: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 4,
  },
  reportTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 2,
  },
  reportSubtitle: {
    fontSize: 10,
    textAlign: "center",
    color: "#555555",
  },
  table: {
    marginTop: 16,
  },
  tableHead: {
    flexDirection: "row",
    backgroundColor: "#1a1a2e",
    color: "#ffffff",
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    paddingVertical: 5,
    paddingHorizontal: 4,
  },
  tableRowAlt: {
    backgroundColor: "#f5f5f5",
  },
  colIndex: { width: "6%" },
  colCode: { width: "12%" },
  colDni: { width: "12%" },
  colFullName: { width: "40%" },
  colLevel: { width: "14%" },
  colGrade: { width: "10%" },
  colSection: { width: "6%" },
  headCell: {
    color: "#ffffff",
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
  },
  cell: {
    fontSize: 9,
    color: "#222222",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 8,
    color: "#888888",
  },
});

export const EnrolledStudentsReport = ({
  students,
  schoolYear,
}: EnrolledStudentsReportProps) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.schoolName}>SRJ — Sistema de Gestión Escolar</Text>
        <Text style={styles.reportTitle}>
          Reporte de Estudiantes Matriculados
        </Text>
        <Text style={styles.reportSubtitle}>Año Escolar: {schoolYear}</Text>
      </View>

      {/* Table */}
      <View style={styles.table}>
        {/* Head */}
        <View style={styles.tableHead}>
          <Text style={[styles.headCell, styles.colIndex]}>#</Text>
          <Text style={[styles.headCell, styles.colCode]}>Código</Text>
          <Text style={[styles.headCell, styles.colDni]}>DNI</Text>
          <Text style={[styles.headCell, styles.colFullName]}>
            Apellidos y Nombres
          </Text>
          <Text style={[styles.headCell, styles.colLevel]}>Nivel</Text>
          <Text style={[styles.headCell, styles.colGrade]}>Grado</Text>
          <Text style={[styles.headCell, styles.colSection]}>Sec.</Text>
        </View>

        {/* Rows */}
        {students.map((student, index) => (
          <View
            key={student.id}
            style={[styles.tableRow, index % 2 !== 0 ? styles.tableRowAlt : {}]}
          >
            <Text style={[styles.cell, styles.colIndex]}>{index + 1}</Text>
            <Text style={[styles.cell, styles.colCode]}>
              {student.studentCode}
            </Text>
            <Text style={[styles.cell, styles.colDni]}>{student.dni}</Text>
            <Text style={[styles.cell, styles.colFullName]}>
              {student.fullName}
            </Text>
            <Text style={[styles.cell, styles.colLevel]}>{student.level}</Text>
            <Text style={[styles.cell, styles.colGrade]}>{student.grade}</Text>
            <Text style={[styles.cell, styles.colSection]}>
              {student.section}
            </Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer} fixed>
        <Text style={styles.footerText}>
          Total de estudiantes: {students.length}
        </Text>
        <Text
          style={styles.footerText}
          render={({ pageNumber, totalPages }) =>
            `Página ${pageNumber} de ${totalPages}`
          }
        />
      </View>
    </Page>
  </Document>
);
