import type { ReactElement } from "react";

//Module ICons

import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

// SubModule icons

// Students & Staff

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

// Purchases and Sales

import MenuBookIcon from '@mui/icons-material/MenuBook';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentIcon from '@mui/icons-material/Payment';
import AssignmentIcon from '@mui/icons-material/Assignment';

// Configurations

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SavingsIcon from '@mui/icons-material/Savings';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GradeIcon from '@mui/icons-material/Grade';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
// AttachMoney for Costs
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CategoryIcon from '@mui/icons-material/Category';
import WorkIcon from '@mui/icons-material/Work';

// E-Billing

// ReceiptLong for Gestion de Series
import GavelIcon from '@mui/icons-material/Gavel';
// PictureAsPdf for Reportes

// Incomes and Expenses

// AttachMoney for Gestión económica
// PaymentIcon for Pagos y Deudas
// ReceiptLong for Boletas y Recibos
// PictureAsPdf for Reportes
// Assignment for Cuadre Nro Recibos Pension

// Lunches

import RestaurantIcon from '@mui/icons-material/Restaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
// AttachMoney for Gestión Económica
import DescriptionIcon from '@mui/icons-material/Description';

export type Module = {
    id: number,
    name: string,
    path: string,
    permissions?: string [],
    children?: Module [],
    icon: ReactElement
};

export const modules: Module[] = [
    {
        id: 1,
        name: "Estudiantes",
        path: "/students",
        permissions: [],
        icon: <SchoolIcon />,
        children: [
            {
                id: 11,
                name: "Gestión de estudiantes",
                path: "/students",
                permissions: [],
                icon: <PersonAddIcon />
            },
            {
                id: 12,
                name: "Reportes",
                path: "/students/reports",
                permissions: [],
                icon: <PictureAsPdfIcon />
            }
        ]
    },
    {
        id: 2,
        name: "Staff",
        path: "/staff",
        permissions: [],
        icon: <GroupIcon />,
        children: [
            {
                id: 21,
                name: "Gestión de Staff",
                path: "/staff",
                permissions: [],
                icon: <PersonAddIcon />
            },
            {
                id: 22,
                name: "Reportes",
                path: "/staff/reports",
                permissions: [],
                icon: <PictureAsPdfIcon />
            }
        ]
    },
    {
        id: 3,
        name: "Compras y Ventas",
        path: "/purchases-sales",
        permissions: [],
        icon: <ShoppingCartIcon />,
        children: [
            {
                id: 31,
                name: "Editoriales",
                path: "/publishers",
                permissions: [],
                icon: <MenuBookIcon />
            },
            {
                id: 32,
                name: "Productos",
                path: "/products",
                permissions: [],
                icon: <InventoryIcon />
            },
            {
                id: 33,
                name: "Gestión económica",
                path: "/purchases-sales/economic-management",
                permissions: [],
                icon: <AttachMoneyIcon />
            },
            {
                id: 34,
                name: "Pagos",
                path: "/purchases-sales/payment-tracking",
                permissions: [],
                icon: <PaymentIcon />
            },
            {
                id: 35,
                name: "Cuadre de Pagos",
                path: "/purchases-sales/pension-vouchers-reconciliation",
                permissions: [],
                icon: <AssignmentIcon />
            },
            {
                id: 36,
                name: "Reportes",
                path: "/purchases-sales/reports",
                permissions: [],
                icon: <PictureAsPdfIcon />
            }
        ]
    },
    {
        id: 4,
        name: "Configuraciones",
        path: "/configurations",
        permissions: [],
        icon: <SettingsIcon />,
        children: [
            {
                id: 41,
                name: "Años escolares",
                path: "/school-years",
                permissions: [],
                icon: <CalendarTodayIcon />
            },
            {
                id: 42,
                name: "Planes contables",
                path: "/accounting-plans",
                permissions: [],
                icon: <SavingsIcon />
            },
            {
                id: 43,
                name: "Entidades Legales",
                path: "/legal-entities",
                permissions: [],
                icon: <CorporateFareIcon />
            },
            {
                id: 44,
                name: "Niveles",
                path: "/levels",
                permissions: [],
                icon: <AccountTreeIcon />
            },
            {
                id: 45,
                name: "Grados",
                path: "/grades",
                permissions: [],
                icon: <GradeIcon />
            },
            {
                id: 46,
                name: "Oferta de Grados",
                path: "/grade-offerings",
                permissions: [],
                icon: <ViewModuleIcon />
            },
            {
                id: 47,
                name: "Costos",
                path: "/costs",
                permissions: [],
                icon: <AttachMoneyIcon />
            },
            {
                id: 48,
                name: "Aulas",
                path: "/classrooms",
                permissions: [],
                icon: <MeetingRoomIcon />
            },
            {
                id: 49,
                name: "Areas de Trabajo",
                path: "/work-areas",
                permissions: [],
                icon: <CategoryIcon />
            },
            {
                id: 410,
                name: "Cargos de Trabajo",
                path: "/work-positions",
                permissions: [],
                icon: <WorkIcon />
            }
        ]
    },
    {
        id: 5,
        name: "Facturación Electrónica",
        path: "/e-billing",
        permissions: [],
        icon: <ReceiptLongIcon />,
        children: [
            {
                id: 51,
                name: "Gestión de Series",
                path: "/debit-credit-series",
                permissions: [],
                icon: <ReceiptLongIcon />
            },
            {
                id: 52,
                name: "SUNAT",
                path: "/e-billing/sunat-summary",
                permissions: [],
                icon: <GavelIcon />
            },
            {
                id: 53,
                name: "Reportes",
                path: "/e-billing/reports",
                permissions: [],
                icon: <PictureAsPdfIcon />
            }
        ]
    },
    {
        id: 6,
        name: "Ingresos y Egresos",
        path: "/incomes-expenses",
        permissions: [],
        icon: <AccountBalanceIcon />,
        children: [
            {
                id: 61,
                name: "Gestión económica",
                path: "/incomes-expenses/economic-management",
                permissions: [],
                icon: <AttachMoneyIcon />
            },
            {
                id: 62,
                name: "Pagos y Deudas",
                path: "/incomes-expenses/payments-debts",
                permissions: [],
                icon: <PaymentIcon />
            },
            {
                id: 63,
                name: "Boletas y Recibos",
                path: "/incomes-expenses/vouchers-receipts",
                permissions: [],
                icon: <ReceiptLongIcon />
            },
            {
                id: 64,
                name: "Reportes",
                path: "/incomes-expenses/reports",
                permissions: [],
                icon: <PictureAsPdfIcon />
            },
            {
                id: 65,
                name: "Cuadre Nro Recibos Pension",
                path: "/incomes-expenses/pension-receipts-reconciliation",
                permissions: [],
                icon: <AssignmentIcon />
            }
        ]
    },
    {
        id: 7,
        name: "Loncheras",
        path: "/lunches",
        permissions: [],
        icon: <LunchDiningIcon />,
        children: [
            {
                id: 71,
                name: "Categorías",
                path: "/categories",
                permissions: [],
                icon: <RestaurantIcon />
            },
            {
                id: 72,
                name: "Loncheras",
                path: "/lunches",
                permissions: [],
                icon: <FastfoodIcon />
            },
            {
                id: 73,
                name: "Asignación",
                path: "/lunches/assignment",
                permissions: [],
                icon: <ListIcon />
            },
            {
                id: 74,
                name: "Consultas",
                path: "/lunches/queries",
                permissions: [],
                icon: <SearchIcon />
            },
            {
                id: 75,
                name: "Reportes",
                path: "/lunches/reports",
                permissions: [],
                icon: <PictureAsPdfIcon />
            },
            {
                id: 76,
                name: "Gestión Económica",
                path: "/lunches/economic-management",
                permissions: [],
                icon: <AttachMoneyIcon />
            },
            {
                id: 77,
                name: "Rendiciones",
                path: "/lunches/renditions",
                permissions: [],
                icon: <DescriptionIcon />
            }
        ]
    },
    {
        id: 8,
        name: "Caja Diaria",
        path: "/daily-cash",
        permissions: [],
        icon: <PointOfSaleIcon />,
        children: []
    }
];
