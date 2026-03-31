export type Module = {
    id: number,
    name: string,
    path: string,
    permissions?: string [],
    children?: Module []
};

export const modules: Module[] = [
    {
        id: 1,
        name: "Estudiantes",
        path: "/students",
        permissions: []
    },
    {
        id: 2,
        name: "Staff",
        path: "/staff",
        permissions: []
    },
    {
        id: 3,
        name: "Compras y Ventas",
        path: "/purchases-sales",
        permissions: []
    },
    {
        id: 4,
        name: "Configuraciones",
        path: "/configurations",
        permissions: []
    },
    {
        id: 5,
        name: "Facturación Electrónica",
        path: "/e-billing",
        permissions: []
    },
    {
        id: 6,
        name: "Ingresos y Egresos",
        path: "/incomes-expenses",
        permissions: []
    },
    {
        id: 7,
        name: "Loncheras",
        path: "/lunches",
        permissions: []
    },
    {
        id: 8,
        name: "Caja Diaria",
        path: "/daily-cash",
        permissions: []
    }
];

