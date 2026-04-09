import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { ProvinceData } from "../../infrastructure/dtos/provinceData";
import { ProvinceRepositoryImpl } from "../../repository/implementations/ProvinceRepositoryImpl";

const provinceRepo = new ProvinceRepositoryImpl();

export const useFormProvince = () => {
    const departmentId = useWatch({ name: "departmentId" });
    const [provinces, setProvinces] = useState<ProvinceData[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!departmentId) {
            setProvinces([]);
            return;
        }
        setLoading(true);
        provinceRepo
            .getAll({ departmentId })
            .then(setProvinces)
            .finally(() => setLoading(false));
    }, [departmentId]);

    return { provinces, loading };
};
