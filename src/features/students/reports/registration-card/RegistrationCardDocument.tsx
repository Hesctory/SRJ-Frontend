import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

// --- Types ---

type Parent = {
  paternalLastName?: string;
  maternalLastName?: string;
  firstName?: string;
  dni?: string;
  phone?: string;
  email?: string;
  educationLevel?: string;
  occupation?: string;
  maritalStatus?: string;
};

type Guardian = {
  relationship?: string;
  paternalLastName?: string;
  maternalLastName?: string;
  firstName?: string;
  dni?: string;
  phone?: string;
  email?: string;
};

type Fees = {
  registrationFee?: number;
  registrationDiscount?: number;
  enrollmentFee?: number;
  enrollmentDiscount?: number;
  tuition?: number;
  tuitionDiscount?: number;
};

export type RegistrationCardStudent = {
  id: number;
  enrollmentCode?: string;
  enrollmentDate?: string;
  schoolYear?: string;
  level?: string;
  grade?: string;
  section?: string;
  shift?: string;
  paternalLastName?: string;
  maternalLastName?: string;
  firstName?: string;
  birthDate?: string;
  birthPlace?: string;
  birthCountry?: string;
  gender?: string;
  religion?: string;
  dni?: string;
  siblings?: string | number;
  siblingPosition?: string | number;
  disability?: string;
  previousSchool?: string;
  address?: string;
  district?: string;
  mother?: Parent;
  father?: Parent;
  guardian?: Guardian;
  fees?: Fees;
};

export type RegistrationCardContext = {
  schoolYear?: string;
  level?: string;
  grade?: string;
  shift?: string;
  section?: string;
};

// --- Styles ---

const BORDER = 0.5;
const BORDER_COLOR = "#999999";
const HEADER_BG = "#e8e8e8";

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 32,
    paddingVertical: 28,
    fontSize: 8.5,
    fontFamily: "Helvetica",
  },
  pageTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  infoCell: {
    flex: 1,
    borderWidth: BORDER,
    borderColor: BORDER_COLOR,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    marginTop: 8,
    marginBottom: 2,
  },
  row: {
    flexDirection: "row",
  },
  th: {
    borderWidth: BORDER,
    borderColor: BORDER_COLOR,
    backgroundColor: HEADER_BG,
    paddingHorizontal: 4,
    paddingVertical: 4,
    fontFamily: "Helvetica-Bold",
    minWidth: 0,
  },
  td: {
    borderWidth: BORDER,
    borderColor: BORDER_COLOR,
    paddingHorizontal: 4,
    paddingVertical: 4,
    minWidth: 0,
  },
  observationBox: {
    borderWidth: BORDER,
    borderColor: BORDER_COLOR,
    flexGrow: 1,
    minHeight: 50,
    marginTop: 8,
    paddingHorizontal: 4,
    paddingTop: 3,
  },
  signaturesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 60,
    marginBottom: 8,
  },
  signatureBlock: {
    alignItems: "center",
  },
  signatureLine: {
    borderTopWidth: 0.5,
    borderColor: "#444444",
    width: 130,
    marginBottom: 3,
  },
  signatureText: {
    fontSize: 8.5,
    textAlign: "center",
  },
});

// --- Helpers ---

const str = (v: unknown): string => (v != null ? String(v) : "");
const fullName = (...parts: (string | undefined)[]) =>
  parts.filter(Boolean).join(" ");

interface CellProps {
  span?: number;
  header?: boolean;
  children?: string | number | null;
}

const Cell = ({ span = 1, header = false, children }: CellProps) => (
  <Text style={[header ? styles.th : styles.td, { flex: span }]}>
    {str(children)}
  </Text>
);

const Row = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.row}>{children}</View>
);

// --- Reusable parent table (mother / father) ---

const ParentTable = ({ data = {} }: { data?: Parent }) => (
  <>
    <Row>
      <Cell header>Apellidos</Cell>
      <Cell span={3}>
        {fullName(data.paternalLastName, data.maternalLastName)}
      </Cell>
      <Cell header>Nombres</Cell>
      <Cell>{data.firstName}</Cell>
    </Row>
    <Row>
      <Cell header>DNI</Cell>
      <Cell>{data.dni}</Cell>
      <Cell header>Celular</Cell>
      <Cell>{data.phone}</Cell>
      <Cell header>Email</Cell>
      <Cell>{data.email}</Cell>
    </Row>
    <Row>
      <Cell header>Grado Instr.</Cell>
      <Cell>{data.educationLevel}</Cell>
      <Cell header>Ocupación</Cell>
      <Cell>{data.occupation}</Cell>
      <Cell header>Estado Civil</Cell>
      <Cell>{data.maritalStatus}</Cell>
    </Row>
  </>
);

// --- Document checklist ---

const REQUIRED_DOCS = [
  "Ficha de Matrícula",
  "Certificado de Estudios",
  "Certificado de Conducta",
  "Copia DNI Alumno",
  "Copia DNI Apoderado",
  "Partida de Nacimiento",
  "Libreta de Notas",
  "Resolución de Traslado",
  "Fotos",
];

// --- Per-student page ---

const StudentCard = ({
  student: s,
  generatedDate,
  generatedTime,
}: {
  student: RegistrationCardStudent;
  generatedDate: string;
  generatedTime: string;
}) => {
  const mother = s.mother ?? {};
  const father = s.father ?? {};
  const guardian = s.guardian ?? {};
  const fees = s.fees ?? {};

  return (
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <Text style={styles.pageTitle}>FICHA DE MATRÍCULA</Text>

      <View style={styles.infoRow}>
        <Text style={styles.infoCell}>Fecha: {generatedDate}</Text>
        <Text style={styles.infoCell}>Hora: {generatedTime}</Text>
        <Text style={styles.infoCell}>Año: {str(s.schoolYear)}</Text>
      </View>
      <View style={[styles.infoRow, { marginBottom: 6 }]}>
        <Text style={styles.infoCell}>Grado: {str(s.grade)}</Text>
        <Text style={styles.infoCell}>Nivel: {str(s.level)}</Text>
        <Text style={styles.infoCell}>Sección: {str(s.section)}</Text>
        <Text style={styles.infoCell}>Código: {str(s.enrollmentCode)}</Text>
      </View>

      {/* I. Student data */}
      <Text style={styles.sectionTitle}>I. Datos Alumno/a</Text>
      <Row>
        <Cell header>Apellido Paterno</Cell>
        <Cell>{s.paternalLastName}</Cell>
        <Cell header>Apellido Materno</Cell>
        <Cell>{s.maternalLastName}</Cell>
        <Cell header>Nombres</Cell>
        <Cell>{s.firstName}</Cell>
      </Row>
      <Row>
        <Cell header>Fecha Nac.</Cell>
        <Cell>{s.birthDate}</Cell>
        <Cell header>Lugar Nac.</Cell>
        <Cell>{s.birthPlace}</Cell>
        <Cell header>País</Cell>
        <Cell>{s.birthCountry}</Cell>
      </Row>
      <Row>
        <Cell header>Sexo</Cell>
        <Cell>{s.gender}</Cell>
        <Cell header>Religión</Cell>
        <Cell>{s.religion}</Cell>
        <Cell header>DNI</Cell>
        <Cell>{s.dni}</Cell>
      </Row>
      <Row>
        <Cell header>N° Hermanos</Cell>
        <Cell>{s.siblings}</Cell>
        <Cell header>Lugar que ocupa</Cell>
        <Cell>{s.siblingPosition}</Cell>
        <Cell header>Discapacidad</Cell>
        <Cell>{s.disability}</Cell>
      </Row>
      <Row>
        <Cell header>Colegio Procedencia</Cell>
        <Cell span={5}>{s.previousSchool}</Cell>
      </Row>
      <Row>
        <Cell header>Dirección</Cell>
        <Cell span={3}>{s.address}</Cell>
        <Cell header>Distrito</Cell>
        <Cell>{s.district}</Cell>
      </Row>

      {/* II. Mother */}
      <Text style={styles.sectionTitle}>II. Datos de la Madre</Text>
      <ParentTable data={mother} />

      {/* III. Father */}
      <Text style={styles.sectionTitle}>III. Datos del Padre</Text>
      <ParentTable data={father} />

      {/* IV. Guardian */}
      <Text style={styles.sectionTitle}>
        IV. Datos del Apoderado – Tipo Parentesco: {str(guardian.relationship)}
      </Text>
      <Row>
        <Cell header>Apellidos</Cell>
        <Cell span={3}>
          {fullName(guardian.paternalLastName, guardian.maternalLastName)}
        </Cell>
        <Cell header>Nombres</Cell>
        <Cell>{guardian.firstName}</Cell>
      </Row>
      <Row>
        <Cell header>DNI</Cell>
        <Cell>{guardian.dni}</Cell>
        <Cell header>Celular</Cell>
        <Cell>{guardian.phone}</Cell>
        <Cell header>Email</Cell>
        <Cell>{guardian.email}</Cell>
      </Row>

      {/* V. Fees + Document checklist */}
      <View style={{ flexDirection: "row", marginTop: 8 }}>
        <View style={{ flex: 1, marginRight: 3 }}>
          <Row>
            <Cell header>Tipo</Cell>
            <Cell header>Monto</Cell>
            <Cell header>Descuento</Cell>
            <Cell header>Total</Cell>
          </Row>
          <Row>
            <Cell>Inscripción</Cell>
            <Cell>{fees.registrationFee}</Cell>
            <Cell>{fees.registrationDiscount}</Cell>
            <Cell>{fees.registrationFee}</Cell>
          </Row>
          <Row>
            <Cell>Matrícula</Cell>
            <Cell>{fees.enrollmentFee}</Cell>
            <Cell>{fees.enrollmentDiscount}</Cell>
            <Cell>{fees.enrollmentFee}</Cell>
          </Row>
          <Row>
            <Cell>Pensión</Cell>
            <Cell>{fees.tuition}</Cell>
            <Cell>{fees.tuitionDiscount}</Cell>
            <Cell>{fees.tuition}</Cell>
          </Row>
        </View>

        <View style={{ flex: 1 }}>
          {REQUIRED_DOCS.map((doc) => (
            <Row key={doc}>
              <Cell span={3}>{doc}</Cell>
              <Cell> </Cell>
            </Row>
          ))}
        </View>
      </View>

      {/* Observation */}
      <View style={styles.observationBox}>
        <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 9 }}>
          OBSERVACIÓN
        </Text>
      </View>

      {/* Signatures */}
      <View style={styles.signaturesRow}>
        <View style={styles.signatureBlock}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>V°B°</Text>
        </View>
        <View style={styles.signatureBlock}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>Firma del apoderado</Text>
          <Text style={styles.signatureText}>DNI:</Text>
        </View>
      </View>
    </Page>
  );
};

// --- Document ---

interface Props {
  students: RegistrationCardStudent[];
  context: RegistrationCardContext;
}

export const RegistrationCardDocument = ({ students }: Props) => {
  const now = new Date();
  const generatedDate = now.toLocaleDateString("es-PE");
  const generatedTime = now.toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Document>
      {students.length === 0 ? (
        <Page size="A4" style={styles.page}>
          <Text
            style={{
              marginTop: 40,
              textAlign: "center",
              color: "#888888",
              fontSize: 9,
            }}
          >
            No se encontraron estudiantes con los filtros aplicados.
          </Text>
        </Page>
      ) : (
        students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            generatedDate={generatedDate}
            generatedTime={generatedTime}
          />
        ))
      )}
    </Document>
  );
};
