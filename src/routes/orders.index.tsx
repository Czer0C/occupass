import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link, stripSearchParams, useRouter } from '@tanstack/react-router';
import { MaterialReactTable, type MRT_ColumnDef, type MRT_PaginationState } from 'material-react-table';
import { zodValidator } from '@tanstack/zod-adapter';

import * as React from 'react';

import FreeSoloCreateOption from '../components/Creatable';

import { Order } from '../type';
import { z } from 'zod';
import { ArrowBack, ArrowForward, CalendarMonth } from '@mui/icons-material';
import { formatDotNetDate } from '../utils';
import { InputAdornment } from '@mui/material';

const defaultValues = {
    ids: [],
    freight: '',
    orderDate: '',
    requiredDate: '',
    shippedDate: '',
    customerId: '',
    employeeId: '',
    shipVia: '',
    shipName: '',
    shipAddress: '',
    shipCity: '',
    shipPostalCode: '',
    shipCountry: '',
    skip: 0,
    take: 10,
    orderBy: [],
    orderByDesc: [],
};

const orderSearchSchema = z.object({
    ids: z.array(z.string()).default(defaultValues.ids),
    freight: z.string().default(defaultValues.freight),
    orderDate: z.string().default(defaultValues.orderDate),
    requiredDate: z.string().default(defaultValues.requiredDate),
    shippedDate: z.string().default(defaultValues.shippedDate),
    customerId: z.string().default(defaultValues.customerId),
    employeeId: z.string().default(defaultValues.employeeId),
    shipVia: z.string().default(defaultValues.shipVia),
    shipName: z.string().default(defaultValues.shipName),
    shipAddress: z.string().default(defaultValues.shipAddress),
    shipCity: z.string().default(defaultValues.shipCity),
    shipPostalCode: z.string().default(defaultValues.shipPostalCode),
    shipCountry: z.string().default(defaultValues.shipCountry),
    skip: z.number().default(0),
    take: z.number().default(10),
    orderBy: z.array(z.string()).default(defaultValues.orderBy),
    orderByDesc: z.array(z.string()).default(defaultValues.orderByDesc),
});

export const Route = createFileRoute('/orders/')({
    component: OrdersComponent,
    validateSearch: zodValidator(orderSearchSchema),
    search: {
        middlewares: [stripSearchParams(defaultValues)],
    },
});

const API_HOST = 'https://uitestapi.occupass.com';

const API_BASE = `${API_HOST}/query/orders`;

interface QueryResponse {
    offset: number;
    total: number;
    results: Order[];
    meta: Record<string, string>;
    responseStatus: {
        errorCode?: string;
        message?: string;
        stackTrace?: string;
        errors?: Array<{
            errorCode: string;
            fieldName: string;
            message: string;
            meta: Record<string, string>;
        }>;
        meta: Record<string, string>;
    };
}

// Define your columns
export const COLS_CONFIG_ORDERS: MRT_ColumnDef<Order>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        size: 100,
        enableColumnActions: false,
        enableSorting: false,
        Cell: ({ cell }) => (
            <Link className="text-sky-500 font-bold" to="/orders/$id" params={{ id: cell.getValue() as string }}>
                {cell.getValue() as string}
            </Link>
        ),
    },
    {
        accessorKey: 'customerId',
        header: 'Customer ID',
        size: 100,
        enableColumnActions: false,
        enableSorting: false,
    },
    {
        accessorKey: 'employeeId',
        header: 'Employee ID',
        size: 100,
        enableColumnActions: false,
        enableSorting: false,
    },
    {
        accessorKey: 'orderDate',
        header: 'Order Date',
        size: 100,
        enableColumnActions: false,
        enableSorting: false,
        Cell: ({ cell }) => formatDotNetDate(cell.getValue() as string),
    },
    {
        accessorKey: 'requiredDate',
        header: 'Required Date',
        size: 100,
        enableColumnActions: false,
        enableSorting: false,
        Cell: ({ cell }) => formatDotNetDate(cell.getValue() as string),
    },
    {
        accessorKey: 'shipVia',
        header: 'Ship Via',
        size: 100,
        enableColumnActions: false,
        enableSorting: false,
    },
    {
        accessorKey: 'shippedDate',
        header: 'Shipped Date',
        size: 100,
        enableColumnActions: false,
        enableSorting: false,
        Cell: ({ cell }) => formatDotNetDate(cell.getValue() as string),
    },
    {
        accessorKey: 'shipName',
        header: 'Ship Name',
        size: 100,
        enableColumnActions: false,
        enableSorting: false,
    },
    {
        accessorKey: 'shipCountry',
        header: 'Ship Country',
        size: 100,
        enableColumnActions: false,
        enableSorting: false,
    },
    {
        accessorKey: 'freight',
        header: 'Freight',
        size: 100,
        enableColumnActions: false,
        enableSorting: false,
    },
    {
        accessorKey: 'shipCity',
        header: 'Ship City',
        size: 100,
        enableColumnActions: false,
        enableSorting: false,
    },
    {
        accessorKey: 'shipPostalCode',
        header: 'Ship Postal Code',
        size: 100,
        enableColumnActions: false,
        enableSorting: false,
    },
    {
        accessorKey: 'shipAddress',
        header: 'Ship Address',
        size: 100,
        enableColumnActions: false,
        enableSorting: false,
    },
];

interface Filter {
    freight: string;
    orderBy?: string[];
    orderByDesc?: string[];
    include?: string;
    fields?: string;
    ids?: string[];
}

interface Pagination {
    pageIndex: number;
    pageSize: number;
}

enum FilterFields {
    id = 'id',
    customerId = 'customerId',
    employeeId = 'employeeId',
    orderDate = 'orderDate',
    requiredDate = 'requiredDate',
    shippedDate = 'shippedDate',
    shipVia = 'shipVia',
    freight = 'freight',
    shipName = 'shipName',
    shipCountry = 'shipCountry',
    shipCity = 'shipCity',
    shipPostalCode = 'shipPostalCode',
    shipAddress = 'shipAddress',
}

const DEFAULT_FILTER: Filter = {
    include: 'total',
    orderBy: [],
    orderByDesc: [],
    freight: '',
    ids: [],
};

const optionsFields = Object.values(FilterFields).map((field) => ({
    value: field,
    label: field,
}));

function OrdersComponent() {
    return (
        <div className="p-4 rounded-lg m-4 bg-white">
            <h2 className="text-2xl font-bold mb-4 text-slate-500">Orders</h2>

            <FilterZone />

            <br />

            <OrderTable />
        </div>
    );
}

function FilterZone() {
    const {
        ids,
        freight,
        orderDate,
        requiredDate,
        shippedDate,
        customerId,
        employeeId,
        shipVia,
        shipName,
        shipAddress,
        shipCity,
        shipPostalCode,
        shipCountry,
        orderBy,
        orderByDesc,
    } = Route.useSearch();

    const router = useRouter();

    const [idStr, setIdStr] = React.useState(ids);
    const [freightStr, setFreightStr] = React.useState(freight);
    const [orderDateStr, setOrderDateStr] = React.useState(orderDate);
    const [requiredDateStr, setRequiredDateStr] = React.useState(requiredDate);
    const [shippedDateStr, setShippedDateStr] = React.useState(shippedDate);
    const [customerIdStr, setCustomerIdStr] = React.useState(customerId);
    const [employeeIdStr, setEmployeeIdStr] = React.useState(employeeId);
    const [shipViaStr, setShipViaStr] = React.useState(shipVia);
    const [shipNameStr, setShipNameStr] = React.useState(shipName);
    const [shipAddressStr, setShipAddressStr] = React.useState(shipAddress);
    const [shipCityStr, setShipCityStr] = React.useState(shipCity);
    const [shipPostalCodeStr, setShipPostalCodeStr] = React.useState(shipPostalCode);
    const [shipCountryStr, setShipCountryStr] = React.useState(shipCountry);
    const [orderByStr, setOrderByStr] = React.useState(orderBy);
    const [orderByDescStr, setOrderByDescStr] = React.useState(orderByDesc);

    const searchParams = {
        ids: idStr,
        freight: freightStr,
        orderDate: orderDateStr,
        requiredDate: requiredDateStr,
        shippedDate: shippedDateStr,
        customerId: customerIdStr,
        employeeId: employeeIdStr,
        shipVia: shipViaStr,
        shipName: shipNameStr,
        shipAddress: shipAddressStr,
        shipCity: shipCityStr,
        shipPostalCode: shipPostalCodeStr,
        shipCountry: shipCountryStr,
        orderBy: orderByStr,
        orderByDesc: orderByDescStr,
    };

    const handleReset = () => {
        setIdStr(defaultValues.ids);
        setFreightStr(defaultValues.freight);
        setOrderDateStr(defaultValues.orderDate);
        setRequiredDateStr(defaultValues.requiredDate);
        setShippedDateStr(defaultValues.shippedDate);
        setCustomerIdStr(defaultValues.customerId);
        setEmployeeIdStr(defaultValues.employeeId);
        setShipViaStr(defaultValues.shipVia);
        setShipNameStr(defaultValues.shipName);
        setShipAddressStr(defaultValues.shipAddress);
        setShipCityStr(defaultValues.shipCity);
        setShipPostalCodeStr(defaultValues.shipPostalCode);
        setShipCountryStr(defaultValues.shipCountry);
        setOrderByStr(defaultValues.orderBy);
        setOrderByDescStr(defaultValues.orderByDesc);
        router.navigate({ to: '/orders', search: defaultValues });
    };

    const canReset = Object.values(searchParams).some(
        (value) => (typeof value === 'string' && value !== '') || (typeof value === 'object' && value.length > 0),
    );

    return (
        <div className="grid grid-cols-2 w-full gap-4 text-black">
            <FreeSoloCreateOption
                label="IDs"
                onChange={(e) => {
                    const parsedString = e
                        .map((i: any) =>
                            typeof i === 'string' ? i : typeof i === 'object' && i.value ? i.value : null,
                        )
                        .filter((k: any) => !!k);

                    setIdStr(parsedString);
                }}
                value={idStr}
            />

            <TextField
                label="Freight"
                onChange={(e) => {
                    setFreightStr(e.target.value);
                }}
                value={freightStr}
                type="number"
            />

            <TextField
                label="Order Date"
                onChange={(e) => {
                    setOrderDateStr(e.target.value);
                }}
                value={orderDateStr}
                type="date"
                InputLabelProps={{ shrink: true }}
                sx={{ bgcolor: '#abb6f3', '>*': { color: 'black', fill: 'black' } }}
            />

            <TextField
                label="Required Date"
                onChange={(e) => {
                    setRequiredDateStr(e.target.value);
                }}
                value={requiredDateStr}
                type="date"
                InputLabelProps={{ shrink: true }}
                sx={{ bgcolor: '#abb6f3' }}
            />

            <TextField
                label="Shipped Date"
                onChange={(e) => {
                    setShippedDateStr(e.target.value);
                }}
                value={shippedDateStr}
                type="date"
                InputLabelProps={{ shrink: true }}
                sx={{ bgcolor: '#abb6f3', '>*': { color: 'black', fill: 'black' } }}
            />

            <TextField
                label="Customer ID"
                onChange={(e) => {
                    setCustomerIdStr(e.target.value);
                }}
                value={customerIdStr}
            />

            <TextField
                label="Employee ID"
                onChange={(e) => {
                    setEmployeeIdStr(e.target.value);
                }}
                value={employeeIdStr}
                type="number"
            />

            <TextField
                label="Ship Via"
                onChange={(e) => {
                    setShipViaStr(e.target.value);
                }}
                value={shipViaStr}
                type="number"
            />

            <TextField
                label="Ship Name"
                onChange={(e) => {
                    setShipNameStr(e.target.value);
                }}
                value={shipNameStr}
            />

            <TextField
                label="Ship Address"
                onChange={(e) => {
                    setShipAddressStr(e.target.value);
                }}
                value={shipAddressStr}
            />

            <TextField
                label="Ship City"
                onChange={(e) => {
                    setShipCityStr(e.target.value);
                }}
                value={shipCityStr}
            />

            <TextField
                label="Ship Postal Code"
                onChange={(e) => {
                    setShipPostalCodeStr(e.target.value);
                }}
                value={shipPostalCodeStr}
            />

            <TextField
                label="Ship Country"
                onChange={(e) => {
                    setShipCountryStr(e.target.value);
                }}
                value={shipCountryStr}
            />

            <Autocomplete
                disableCloseOnSelect
                filterSelectedOptions
                isOptionEqualToValue={(option, value) => option?.value === value?.value}
                renderInput={(params) => <TextField {...params} label="Order By" />}
                multiple
                options={optionsFields}
                onChange={(e, value) => {
                    setOrderByStr(value.map((v) => v.value));
                }}
                value={orderByStr.map((v) => ({ value: v, label: v }))}
            />

            <Autocomplete
                disableCloseOnSelect
                filterSelectedOptions
                isOptionEqualToValue={(option, value) => option?.value === value?.value}
                renderInput={(params) => <TextField {...params} label="Order By Desc" />}
                multiple
                options={optionsFields}
                onChange={(e, value) => {
                    setOrderByDescStr(value.map((v) => v.value));
                }}
                value={orderByDescStr.map((v) => ({ value: v, label: v }))}
            />

            <div className="col-span-2">
                <Link to="/orders" search={searchParams}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Search</button>
                </Link>

                {canReset && (
                    <button onClick={handleReset} className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">
                        Reset
                    </button>
                )}
            </div>
        </div>
    );
}

function OrderTable() {
    const [sorting, setSorting] = React.useState();

    const { data, isLoading } = useOrders();

    const search = Route.useSearch();

    const list = data?.results || [];

    const columns = COLS_CONFIG_ORDERS;

    return (
        <MaterialReactTable
            enableTopToolbar={false}
            data={list}
            columns={columns}
            state={{
                isLoading,
                pagination: {
                    pageIndex: search.skip,
                    pageSize: search.take,
                },
            }}
            enableColumnFilters={false}
            muiTableContainerProps={{ sx: { maxHeight: '600px' } }}
            initialState={{
                density: 'compact',
                pagination: {
                    pageIndex: search.skip,
                    pageSize: search.take,
                },
            }}
            manualFiltering
            manualSorting
            manualPagination
            rowCount={data?.total ?? 0}
            onSortingChange={(p) => {
                console.log(p);
            }}
            enablePagination={false}
            renderBottomToolbar={() => <PaginationZone />}
        />
    );
}

function PaginationZone() {
    const { data, isLoading } = useOrders();

    const search = Route.useSearch();

    const router = useRouter();

    return (
        <div className="flex gap-4 items-center p-4">
            <button
                disabled={search.skip === 0}
                className="bg-sky-500 text-white px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-50"
                onClick={() => {
                    router.navigate({ to: '/orders', search: { ...search, skip: search.skip - search.take } });
                }}
            >
                <ArrowBack />
                Previous
            </button>
            <button
                className="bg-sky-500 text-white px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-50"
                disabled={search.skip + search.take >= (data?.total ?? 0)}
                onClick={() => {
                    router.navigate({ to: '/orders', search: { ...search, skip: search.skip + search.take } });
                }}
            >
                Next
                <ArrowForward />
            </button>
            <select
                className="bg-slate-500 text-white px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-50"
                onChange={(e) => {
                    router.navigate({ to: '/orders', search: { ...search, take: parseInt(e.target.value) } });
                }}
            >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
            <span>
                {search.skip} - {search.take}
            </span>
        </div>
    );
}

function useOrders() {
    const search = Route.useSearch();

    const params = Object.keys(search)
        .filter(
            (key) =>
                (key !== 'ids' && !!search[key as keyof typeof search]) ||
                (key === 'ids' && (search[key as keyof typeof search] as string[]).length > 0),
        )
        .reduce<Record<string, unknown>>((acc, key) => {
            acc[key] = search[key as keyof typeof search];
            return acc;
        }, {});

    const url = `${API_BASE}?include=total&${new URLSearchParams(params as Record<string, string>).toString()}`;

    const { data, isLoading } = useQuery<QueryResponse>({
        queryKey: ['orders', params],
        queryFn: () =>
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((res) => res.json()),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    return { data, isLoading };
}
