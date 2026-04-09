import { SelectInput, useDataProvider } from 'react-admin';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { gradeData } from '../../infrastructure/dtos/gradeData';

const CascadeGradeInput = () => {
    const dataProvider = useDataProvider();
    const level = useWatch({ name: 'levelId' });
    const [choices, setChoices] = useState<gradeData[]>([]);

    useEffect(() => {
        if (level) {
            dataProvider.getList<gradeData>('grades', {
                filter: { levelId: level },
                pagination: { page: 1, perPage: 100 },
                sort: { field: 'name', order: 'ASC' },
            }).then(( {data} ) => {
                setChoices(data);
            });
        } else {
            setChoices([]);
        }
    }, [level]);

    return (
        <SelectInput source="gradeId" choices={choices} />
    );
};

export default CascadeGradeInput;