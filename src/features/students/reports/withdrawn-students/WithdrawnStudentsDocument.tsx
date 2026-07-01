import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

export type WithdrawnStudent = {
  id: number;
  enrollmentCode: string;
  fullName: string;
  level: string;
  gradeYear: string;
  section: string;
  shift: string;
  enrollmentDate: string;
  withdrawalDate: string;
};

export type WithdrawnReportContext = {
  schoolYear?: string;
  level?: string;
  grade?: string;
  shift?: string;
  section?: string;
};

/** Grade · shift · section · level collapsed into one column, skipping blanks. */
export const formatAcademic = (s: WithdrawnStudent): string => {
  const parts = [
    s.gradeYear != null && s.gradeYear !== "" ? `${s.gradeYear}°` : null,
    s.shift,
    s.section,
    s.level,
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(" · ") : "—";
};

/** Read "YYYY-MM-DD" straight from the string to avoid the timezone drift a
 *  bare `new Date("YYYY-MM-DD")` introduces; fall back to Date parsing. */
export const formatDate = (value?: string): string => {
  if (!value) return "—";
  const iso = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return `${iso[3]}/${iso[2]}/${iso[1]}`;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString("es-PE");
};

const formatContext = (ctx: WithdrawnReportContext): string => {
  const parts = [
    ctx.schoolYear && `Año: ${ctx.schoolYear}`,
    ctx.level && `Nivel: ${ctx.level}`,
    ctx.grade && `Grado: ${ctx.grade}`,
    ctx.shift && `Turno: ${ctx.shift}`,
    ctx.section && `Sección: ${ctx.section}`,
  ].filter(Boolean);
  return parts.length > 0 ? parts.join("  ·  ") : "Todos los estudiantes";
};

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
    marginBottom: 4,
  },
  reportSubtitle: {
    fontSize: 9,
    textAlign: "center",
    color: "#555555",
  },
  table: {
    marginTop: 16,
  },
  tableHead: {
    flexDirection: "row",
    backgroundColor: "#1a1a2e",
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
  colIndex: { width: "5%" },
  colCode: { width: "12%" },
  colFullName: { width: "33%" },
  colAcademic: { width: "22%" },
  colEnrollDate: { width: "14%" },
  colWithdrawDate: { width: "14%" },
  headCell: {
    color: "#ffffff",
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
  },
  cell: {
    fontSize: 9,
    color: "#222222",
  },
  emptyMessage: {
    marginTop: 24,
    fontSize: 10,
    textAlign: "center",
    color: "#888888",
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

interface Props {
  students: WithdrawnStudent[];
  context: WithdrawnReportContext;
}

export const WithdrawnStudentsDocument = ({ students, context }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.schoolName}>SRJ — Sistema de Gestión Escolar</Text>
        <Text style={styles.reportTitle}>Reporte de Estudiantes Retirados</Text>
        <Text style={styles.reportSubtitle}>{formatContext(context)}</Text>
      </View>

      {students.length === 0 ? (
        <Text style={styles.emptyMessage}>
          No se encontraron estudiantes con los filtros aplicados.
        </Text>
      ) : (
        <View style={styles.table}>
          <View style={styles.tableHead}>
            <Text style={[styles.headCell, styles.colIndex]}>#</Text>
            <Text style={[styles.headCell, styles.colCode]}>Código</Text>
            <Text style={[styles.headCell, styles.colFullName]}>
              Apellidos y Nombres
            </Text>
            <Text style={[styles.headCell, styles.colAcademic]}>Académico</Text>
            <Text style={[styles.headCell, styles.colEnrollDate]}>
              F. Matrícula
            </Text>
            <Text style={[styles.headCell, styles.colWithdrawDate]}>
              F. Retiro
            </Text>
          </View>

          {students.map((student, index) => (
            <View
              key={student.id}
              style={[
                styles.tableRow,
                index % 2 !== 0 ? styles.tableRowAlt : {},
              ]}
              wrap={false}
            >
              <Text style={[styles.cell, styles.colIndex]}>{index + 1}</Text>
              <Text style={[styles.cell, styles.colCode]}>
                {student.enrollmentCode}
              </Text>
              <Text style={[styles.cell, styles.colFullName]}>
                {student.fullName}
              </Text>
              <Text style={[styles.cell, styles.colAcademic]}>
                {formatAcademic(student)}
              </Text>
              <Text style={[styles.cell, styles.colEnrollDate]}>
                {formatDate(student.enrollmentDate)}
              </Text>
              <Text style={[styles.cell, styles.colWithdrawDate]}>
                {formatDate(student.withdrawalDate)}
              </Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.footer} fixed>
        <Text style={styles.footerText}>
          Total: {students.length} estudiante(s)
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
