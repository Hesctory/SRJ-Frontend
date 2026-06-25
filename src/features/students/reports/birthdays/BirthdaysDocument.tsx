import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

export type BirthdayStudent = {
  id: number;
  documentNumber: string;
  fullName: string;
  level: string;
  gradeYear: string;
  section: string;
  shift: string;
  /** ISO-ish date string from the API (e.g. "2015-03-21" or full ISO). */
  birthDate: string;
};

export type BirthdayReportContext = {
  schoolYear?: string;
  level?: string;
  grade?: string;
  shift?: string;
  section?: string;
};

const MONTHS_ES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

/** Format an ISO-ish date as "D de Mes" in Spanish (e.g. "6 de Abril"),
 *  reading day/month straight from the string to avoid the timezone drift a
 *  bare `new Date("YYYY-MM-DD")` would introduce. Falls back to Date parsing. */
export const formatBirthday = (value?: string): string => {
  if (!value) return "—";
  let day: number;
  let monthIndex: number;
  const iso = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) {
    monthIndex = Number(iso[2]) - 1;
    day = Number(iso[3]);
  } else {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "—";
    monthIndex = d.getMonth();
    day = d.getDate();
  }
  const month = MONTHS_ES[monthIndex];
  return month ? `${day} de ${month}` : "—";
};

const formatContext = (ctx: BirthdayReportContext): string => {
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
  colDni: { width: "12%" },
  colFullName: { width: "39%" },
  colAcademic: { width: "22%" },
  colBirthday: { width: "22%" },
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
  students: BirthdayStudent[];
  context: BirthdayReportContext;
}

export const BirthdaysDocument = ({ students, context }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.schoolName}>SRJ — Sistema de Gestión Escolar</Text>
        <Text style={styles.reportTitle}>Reporte de Cumpleaños</Text>
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
            <Text style={[styles.headCell, styles.colDni]}>DNI</Text>
            <Text style={[styles.headCell, styles.colFullName]}>
              Apellidos y Nombres
            </Text>
            <Text style={[styles.headCell, styles.colAcademic]}>Académico</Text>
            <Text style={[styles.headCell, styles.colBirthday]}>
              Cumpleaños
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
              <Text style={[styles.cell, styles.colDni]}>
                {student.documentNumber}
              </Text>
              <Text style={[styles.cell, styles.colFullName]}>
                {student.fullName}
              </Text>
              <Text style={[styles.cell, styles.colAcademic]}>
                {student.gradeYear}° {student.section}, {student.level}
              </Text>
              <Text style={[styles.cell, styles.colBirthday]}>
                {formatBirthday(student.birthDate)}
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
