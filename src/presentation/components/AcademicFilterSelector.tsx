import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useListFilterContext } from "react-admin";
import { FILTER_DOWNSTREAM } from "../hooks/academicCascade";
import { useAcademicFilterData } from "../hooks/useAcademicFilterData";

const AcademicFilterSelector = () => {
    const { filterValues, setFilters, displayedFilters } = useListFilterContext();

    const schoolYearId = filterValues.schoolYearId ?? "";
    const levelId = filterValues.levelId ?? "";
    const gradeId = filterValues.gradeId ?? "";
    const shiftId = filterValues.shiftId ?? "";

    const { schoolYears, levels, grades, shifts, sections } = useAcademicFilterData(
        schoolYearId, levelId, gradeId, shiftId
    );

    const apply = (field: string, value: string) => {
        const next = { ...filterValues, [field]: value !== "" ? value : undefined };
        FILTER_DOWNSTREAM[field]?.forEach((f) => delete next[f]);
        setFilters(next, displayedFilters);
    };

    return (
        <>
            <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Año Escolar</InputLabel>
                <Select
                    value={schoolYearId}
                    label="Año Escolar"
                    onChange={(e) => apply("schoolYearId", e.target.value)}
                >
                    <MenuItem value=""><em>Todos</em></MenuItem>
                    {schoolYears.map((sy) => (
                        <MenuItem key={sy.id} value={sy.id}>{sy.year}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Nivel</InputLabel>
                <Select
                    value={levelId}
                    label="Nivel"
                    onChange={(e) => apply("levelId", e.target.value)}
                >
                    <MenuItem value=""><em>Todos</em></MenuItem>
                    {levels.map((lv) => (
                        <MenuItem key={lv.id} value={lv.id}>{lv.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {levelId && (
                <FormControl size="small" sx={{ minWidth: 160 }}>
                    <InputLabel>Grado</InputLabel>
                    <Select
                        value={gradeId}
                        label="Grado"
                        onChange={(e) => apply("gradeId", e.target.value)}
                    >
                        <MenuItem value=""><em>Todos</em></MenuItem>
                        {grades.map((g) => (
                            <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            {gradeId && (
                <FormControl size="small" sx={{ minWidth: 160 }}>
                    <InputLabel>Turno</InputLabel>
                    <Select
                        value={shiftId}
                        label="Turno"
                        onChange={(e) => apply("shiftId", e.target.value)}
                    >
                        <MenuItem value=""><em>Todos</em></MenuItem>
                        {shifts.map((sh) => (
                            <MenuItem key={sh.id} value={sh.id}>{sh.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            {shiftId && (
                <FormControl size="small" sx={{ minWidth: 160 }}>
                    <InputLabel>Sección</InputLabel>
                    <Select
                        value={filterValues.sectionId ?? ""}
                        label="Sección"
                        onChange={(e) => apply("sectionId", e.target.value)}
                    >
                        <MenuItem value=""><em>Todas</em></MenuItem>
                        {sections.map((sec) => (
                            <MenuItem key={sec.id} value={sec.id}>{sec.section}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </>
    );
};

export default AcademicFilterSelector;
