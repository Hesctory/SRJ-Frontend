import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { DistrictData } from "../../infrastructure/dtos/districtData";
import { DistrictRepositoryImpl } from "../../repository/implementations/DistrictRepositoryImpl";

const districtRepo = new DistrictRepositoryImpl();

export const useFormDistrict = () => {
    const provinceId = useWatch({ name: "provinceId" });
    const [districts, setDistricts] = useState<DistrictData[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!provinceId) {
            setDistricts([]);
            return;
        }
        setLoading(true);
        districtRepo
            .getAll({ provinceId })
            .then(setDistricts)
            .finally(() => setLoading(false));
    }, [provinceId]);

    return { districts, loading };
};
