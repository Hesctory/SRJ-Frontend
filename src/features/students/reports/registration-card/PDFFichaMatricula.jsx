// components/StyleComponents/pdfPreviewer/PDFFichaMatricula.jsx
import React from "react";

export default function PDFFichaMatricula({ alumno }) {
  const { Datos, Madre, Padre, Apoderado, Matricula } = alumno;

  const td = "border border-gray-400 px-2 py-1 text-xs";
  const th =
    "bg-gray-200 border border-gray-400 px-2 py-1 text-xs font-semibold bg-gray-100";
  const title = "font-bold text-sm mb-1";

  return (
    <div className="p-6 text-black font-sans text-xs bg-white">
      {/* HEADER */}
      <div className="text-center font-bold text-base mb-2">
        FICHA DE MATRÍCULA
      </div>

      <div className="grid grid-cols-3 gap-2 mb-2">
        <div className={td}>Fecha Matrícula: {Datos.fechaMatricula}</div>
        <div className={td}>Hora:</div>
        <div className={td}>Año: 2025</div>
      </div>

      <div className="grid grid-cols-4 gap-1 mb-3">
        <div className={td}>Grado: {Datos.grado}</div>
        <div className={td}>Nivel: {Datos.nivel}</div>
        <div className={td}>Sección: {Datos.seccion}</div>
        <div className={td}>Código: {Datos.codigoMatricula}</div>
      </div>

      {/* I. DATOS DEL ALUMNO */}
      <div className={title}>I. Datos Alumno/a</div>
      <table className="w-full border-collapse mb-3">
        <tbody>
          <tr>
            <td className={th}>Apellido Paterno</td>
            <td className={td}>{Datos.apellidoPaterno}</td>
            <td className={th}>Apellido Materno</td>
            <td className={td}>{Datos.apellidoMaterno}</td>
            <td className={th}>Nombres</td>
            <td className={td}>{Datos.nombres}</td>
          </tr>
          <tr>
            <td className={th}>Fecha Nac.</td>
            <td className={td}>{Datos.fechaNacimiento}</td>
            <td className={th}>Lugar Nac.</td>
            <td className={td}>{Datos.lugarNacimiento}</td>
            <td className={th}>País</td>
            <td className={td}>{Datos.paisNacimiento}</td>
          </tr>
          <tr>
            <td className={th}>Sexo</td>
            <td className={td}>{Datos.sexo}</td>
            <td className={th}>Religión</td>
            <td className={td}>{Datos.religion}</td>
            <td className={th}>DNI</td>
            <td className={td}>{Datos.dni}</td>
          </tr>
          <tr>
            <td className={th}>N° Hermanos</td>
            <td className={td}>{Datos.hermanos}</td>
            <td className={th}>Lugar que ocupa</td>
            <td className={td}>{Datos.lugarQueOcupa}</td>
            <td className={th}>Discapacidad</td>
            <td className={td}>{Datos.discapacidad}</td>
          </tr>
          <tr>
            <td className={th}>Colegio Procedencia</td>
            <td className={td} colSpan={5}>
              {Datos.colegioProcedencia}
            </td>
          </tr>
          <tr>
            <td className={th}>Dirección</td>
            <td className={td} colSpan={3}>
              {Datos.direccion}
            </td>
            <td className={th}>Distrito</td>
            <td className={td}>{Datos.distrito}</td>
          </tr>
        </tbody>
      </table>

      {/* II + III */}
      <div className="grid grid-cols-1 gap-3">
        <div>
          <div className={title}>II. Datos de la Madre</div>
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className={th}>Apellidos</td>
                <td className={td} colSpan={3}>
                  {Madre.apellidoPaterno} {Madre.apellidoMaterno}
                </td>
                <td className={th}>Nombres</td>
                <td className={td}>{Madre.nombres}</td>
              </tr>
              <tr>
                <td className={th}>DNI</td>
                <td className={td}>{Madre.dni}</td>
                <td className={th}>Celular</td>
                <td className={td}>{Madre.celular}</td>
                <td className={th}>Email</td>
                <td className={td}>{Madre.email}</td>
              </tr>
              <tr>
                <td className={th}>Grado Instr.</td>
                <td className={td}>{Madre.gradoInstruccion}</td>
                <td className={th}>Ocupación</td>
                <td className={td}>{Madre.ocupacion}</td>
                <td className={th}>Estado Civil</td>
                <td className={td}>{Madre.estadoCivil}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <div className={title}>II. Datos del Padre</div>
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className={th}>Apellidos</td>
                <td className={td} colSpan={3}>
                  {Padre.apellidoPaterno} {Padre.apellidoMaterno}
                </td>
                <td className={th}>Nombres</td>
                <td className={td}>{Padre.nombres}</td>
              </tr>
              <tr>
                <td className={th}>DNI</td>
                <td className={td}>{Padre.dni}</td>
                <td className={th}>Celular</td>
                <td className={td}>{Padre.celular}</td>
                <td className={th}>Email</td>
                <td className={td}>{Padre.email}</td>
              </tr>
              <tr>
                <td className={th}>Grado Instr.</td>
                <td className={td}>{Padre.gradoInstruccion}</td>
                <td className={th}>Ocupación</td>
                <td className={td}>{Padre.ocupacion}</td>
                <td className={th}>Estado Civil</td>
                <td className={td}>{Padre.estadoCivil}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* IV. APODERADO */}
      <div className={`${title} mt-3`}>
        IV. Datos del Apoderado – Tipo Parentesco: {Apoderado.parentesco}
      </div>

      <table className="w-full border-collapse mb-3">
        <tbody>
          <tr>
            <td className={th}>Apellidos</td>
            <td className={td} colSpan={3}>
              {Apoderado.apellidoPaterno} {Apoderado.apellidoMaterno}
            </td>
            <td className={th}>Nombres</td>
            <td className={td}>{Apoderado.nombres}</td>
          </tr>
          <tr>
            <td className={th}>DNI</td>
            <td className={td}>{Apoderado.dni}</td>
            <td className={th}>Celular</td>
            <td className={td}>{Apoderado.celular}</td>
            <td className={th}>Email</td>
            <td className={td}>{Apoderado.email}</td>
          </tr>
        </tbody>
      </table>

      {/* V. MATRÍCULA + DOCUMENTOS */}
      <div className="grid grid-cols-2 gap-4">
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className={th}>Tipo</th>
              <th className={th}>Monto</th>
              <th className={th}>Descuento</th>
              <th className={th}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={td}>Inscripción</td>
              <td className={td}>{Matricula.inscripcion}</td>
              <td className={td}>{Matricula.descuentoInscripcion}</td>
              <td className={td}>{Matricula.inscripcion}</td>
            </tr>
            <tr>
              <td className={td}>Matrícula</td>
              <td className={td}>{Matricula.matricula}</td>
              <td className={td}>{Matricula.descuentoMatricula}</td>
              <td className={td}>{Matricula.matricula}</td>
            </tr>
            <tr>
              <td className={td}>Pensión</td>
              <td className={td}>{Matricula.pension}</td>
              <td className={td}>{Matricula.descuentoPension}</td>
              <td className={td}>{Matricula.pension}</td>
            </tr>
          </tbody>
        </table>

        {/* DOCUMENTOS (VACÍO A PROPÓSITO) */}
        <table className="border-collapse w-full">
          <tbody>
            {[
              "Ficha de Matrícula",
              "Certificado de Estudios",
              "Certificado de Conducta",
              "Copia DNI Alumno",
              "Copia DNI Apoderado",
              "Partida de Nacimiento",
              "Libreta de Notas",
              "Resolución de Traslado",
              "Fotos",
            ].map((doc) => (
              <tr key={doc}>
                <td className={td}>{doc}</td>
                <td className={td}></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* OBSERVACIÓN + FIRMAS */}
      <div className="mt-4">
        <div className="border border-gray-400 h-16 mb-6">
          <div className="text-xs px-2 pt-1">OBSERVACIÓN</div>
        </div>

        <div className="flex justify-between">
          <div className="text-center">
            <div className="border-t border-black w-40 mb-1"></div>
            V°B°
          </div>
          <div className="text-center">
            <div className="border-t border-black w-40 mb-1"></div>
            Firma Apoderado
            <br />
            DNI:
          </div>
        </div>
      </div>
    </div>
  );
}

// Versión con PDFLayout integrado
export function PDFFichaMatriculaPage({
  alumno,
  title = "FICHA DE MATRÍCULA",
  subtitle = "",
  showMargins = false,
  pageSize = "A4",
}) {
  return (
    <div
      className={`${showMargins ? "border border-dashed border-gray-300" : ""} p-8`}
    >
      {/* Opcional: Incluir PDFHeader si se necesita */}
      {(title || subtitle) && (
        <div className="mb-4 text-center">
          {title && <h1 className="text-lg font-bold">{title}</h1>}
          {subtitle && <h2 className="text-sm text-gray-600">{subtitle}</h2>}
        </div>
      )}

      <PDFFichaMatricula alumno={alumno} />
    </div>
  );
}
