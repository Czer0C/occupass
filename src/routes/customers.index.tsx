import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link, stripSearchParams, useRouter } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';

import { ChevronLeft, ChevronRight, CopyAll } from '@mui/icons-material';
import * as React from 'react';
import { z } from 'zod';
import FreeSoloCreateOption from '../components/Creatable';
import { CustomersDict } from '../enum';
import { Customer } from '../type';

interface ResponseApi {
    offset: number;
    total: number;
    results: Customer[];
}

const defaultValues = {
    ids: [],
    companyName: '',
    contactName: '',
    contactTitle: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
    fax: '',
    skip: 0,
    take: 10,
    orderBy: [],
    orderByDesc: [],
};

const customerSearchSchema = z.object({
    ids: z.array(z.string()).default(defaultValues.ids),
    companyName: z.string().default(defaultValues.companyName),
    contactName: z.string().default(defaultValues.contactName),
    contactTitle: z.string().default(defaultValues.contactTitle),
    address: z.string().default(defaultValues.address),
    city: z.string().default(defaultValues.city),
    postalCode: z.string().default(defaultValues.postalCode),
    country: z.string().default(defaultValues.country),
    phone: z.string().default(defaultValues.phone),
    fax: z.string().default(defaultValues.fax),
    skip: z.number().default(0),
    take: z.number().default(10),
    orderBy: z.array(z.string()).default(defaultValues.orderBy),
    orderByDesc: z.array(z.string()).default(defaultValues.orderByDesc),
});

export const Route = createFileRoute('/customers/')({
    component: CustomersComponent,
    validateSearch: zodValidator(customerSearchSchema),
    search: {
        middlewares: [stripSearchParams(defaultValues)],
    },
});

const API_HOST = 'https://uitestapi.occupass.com';

const API_BASE = `${API_HOST}/query/customers`;

enum FilterFields {
    id = 'id',
    companyName = 'companyName',
    contactName = 'contactName',
    contactTitle = 'contactTitle',
    address = 'address',
    city = 'city',
    postalCode = 'postalCode',
    country = 'country',
    phone = 'phone',
    fax = 'fax',
}

const optionsFields = Object.values(FilterFields).map((field) => ({
    value: field,
    label: CustomersDict[field as keyof typeof CustomersDict],
}));

function CustomersComponent() {
    return (
        <div className="p-4 rounded-lg m-4 bg-white">
            <h2 className="text-2xl font-bold mb-4 text-slate-500">Customers</h2>

            <FilterZone />

            <br />

            <CusomterTable />
        </div>
    );
}

function FilterZone() {
    const {
        ids,
        companyName,
        contactName,
        contactTitle,
        address,
        city,
        postalCode,
        country,
        phone,
        fax,
        orderBy,
        orderByDesc,
    } = Route.useSearch();

    const router = useRouter();

    const [idStr, setIdStr] = React.useState(ids);
    const [companyNameStr, setCompanyNameStr] = React.useState(companyName);
    const [contactNameStr, setContactNameStr] = React.useState(contactName);
    const [contactTitleStr, setContactTitleStr] = React.useState(contactTitle);
    const [addressStr, setAddressStr] = React.useState(address);
    const [cityStr, setCityStr] = React.useState(city);
    const [postalCodeStr, setPostalCodeStr] = React.useState(postalCode);
    const [countryStr, setCountryStr] = React.useState(country);
    const [phoneStr, setPhoneStr] = React.useState(phone);
    const [faxStr, setFaxStr] = React.useState(fax);

    const [orderByStr, setOrderByStr] = React.useState(orderBy);
    const [orderByDescStr, setOrderByDescStr] = React.useState(orderByDesc);

    const searchParams = {
        ids: idStr,
        companyName: companyNameStr,
        contactName: contactNameStr,
        contactTitle: contactTitleStr,
        address: addressStr,
        city: cityStr,
        postalCode: postalCodeStr,
        country: countryStr,
        phone: phoneStr,
        fax: faxStr,
        orderBy: orderByStr,
        orderByDesc: orderByDescStr,
    };

    const handleReset = () => {
        setIdStr(defaultValues.ids);
        setCompanyNameStr(defaultValues.companyName);
        setContactNameStr(defaultValues.contactName);
        setContactTitleStr(defaultValues.contactTitle);
        setAddressStr(defaultValues.address);
        setCityStr(defaultValues.city);
        setPostalCodeStr(defaultValues.postalCode);
        setCountryStr(defaultValues.country);
        setPhoneStr(defaultValues.phone);
        setFaxStr(defaultValues.fax);
        setOrderByStr(defaultValues.orderBy);
        setOrderByDescStr(defaultValues.orderByDesc);
        router.navigate({ to: '/customers', search: defaultValues });
    };

    const canReset = Object.values(searchParams).some(
        (value) => (typeof value === 'string' && value !== '') || (typeof value === 'object' && value.length > 0),
    );

    return (
        <div className="grid grid-cols-2 w-full gap-4">
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

            <Autocomplete
                disableCloseOnSelect
                filterSelectedOptions
                isOptionEqualToValue={(option, value) => option?.value === value?.value}
                renderInput={(params) => <TextField {...params} size="small" label="Order By" />}
                multiple
                options={optionsFields}
                onChange={(e, value) => {
                    setOrderByStr(value.map((v) => v.value));
                }}
                value={orderByStr.map((v) => ({ value: v, label: CustomersDict[v as keyof typeof CustomersDict] }))}
            />

            <Autocomplete
                disableCloseOnSelect
                filterSelectedOptions
                isOptionEqualToValue={(option, value) => option?.value === value?.value}
                renderInput={(params) => <TextField {...params} size="small" label="Order By Desc" />}
                multiple
                options={optionsFields}
                onChange={(e, value) => {
                    setOrderByDescStr(value.map((v) => v.value));
                }}
                value={orderByDescStr.map((v) => ({
                    value: v,
                    label: CustomersDict[v as keyof typeof CustomersDict],
                }))}
            />

            <TextField
                size="small"
                label="Company Name"
                onChange={(e) => {
                    setCompanyNameStr(e.target.value);
                }}
                value={companyNameStr}
            />

            <TextField
                size="small"
                label="Contact Name"
                onChange={(e) => {
                    setContactNameStr(e.target.value);
                }}
                value={contactNameStr}
            />

            <TextField
                size="small"
                label="Contact Title"
                onChange={(e) => {
                    setContactTitleStr(e.target.value);
                }}
                value={contactTitleStr}
            />

            <TextField
                size="small"
                label="Address"
                onChange={(e) => {
                    setAddressStr(e.target.value);
                }}
                value={addressStr}
            />

            <TextField
                size="small"
                label="City"
                onChange={(e) => {
                    setCityStr(e.target.value);
                }}
                value={cityStr}
            />

            <TextField
                size="small"
                label="Postal Code"
                onChange={(e) => {
                    setPostalCodeStr(e.target.value);
                }}
                value={postalCodeStr}
            />

            <TextField
                size="small"
                label="Country"
                onChange={(e) => {
                    setCountryStr(e.target.value);
                }}
                value={countryStr}
            />

            <TextField
                size="small"
                label="Phone"
                onChange={(e) => {
                    setPhoneStr(e.target.value);
                }}
                value={phoneStr}
            />

            <TextField
                size="small"
                label="Fax"
                onChange={(e) => {
                    setFaxStr(e.target.value);
                }}
                value={faxStr}
            />

            <div className="col-span-2">
                <Link to="/customers" search={searchParams}>
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

const COLS_CONFIG: MRT_ColumnDef<Customer>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        size: 125,
        enableColumnActions: false,
        enableSorting: false,
        Cell: ({ cell }) => {
            const id = cell.getValue();

            const url = `/customers/${id}`;

            return (
                <span className="grid grid-cols-2 items-center gap-2">
                    <Link className="text-sky-500 font-bold" to={url}>
                        {typeof id === 'string' ? id : 'N/A'}
                    </Link>

                    <CopyAll
                        className="cursor-pointer"
                        onClick={() => {
                            if (typeof navigator?.clipboard?.writeText === 'function') {
                                navigator.clipboard.writeText(id as string);
                            }
                        }}
                    />
                </span>
            );
        },
    },
    {
        accessorKey: 'companyName',
        header: 'Company Name',
        size: 200,
        enableColumnActions: false,
        enableSorting: false,
    },
    {
        accessorKey: 'contactName',
        header: 'Contact Name',
        size: 150,
        enableColumnActions: false,
        enableSorting: false,
    },
    {
        accessorKey: 'contactTitle',
        header: 'Contact Title',
        size: 150,
        enableColumnActions: false,
        enableSorting: false,
    },
    {
        accessorKey: 'address',
        header: 'Address',
        size: 200,
        enableColumnActions: false,
        enableSorting: false,
    },
    {
        accessorKey: 'city',
        header: 'City',
        size: 120,
        enableColumnActions: false,
        enableSorting: false,
    },
    {
        accessorKey: 'region',
        header: 'Region',
        size: 120,
        enableColumnActions: false,
        enableSorting: false,
    },
    {
        accessorKey: 'postalCode',
        header: 'Postal Code',
        size: 120,
        enableColumnActions: false,
        enableSorting: false,
    },
    {
        accessorKey: 'country',
        header: 'Country',
        size: 120,
        enableColumnActions: false,
        enableSorting: false,
    },
    {
        accessorKey: 'phone',
        header: 'Phone',
        size: 120,
        enableColumnActions: false,
        enableSorting: false,
    },
    {
        accessorKey: 'fax',
        header: 'Fax',
        size: 120,
        enableColumnActions: false,
        enableSorting: false,
    },
];

function CusomterTable() {
    const [sorting, setSorting] = React.useState([]);

    console.log(sorting);

    const { data, isLoading } = useCustomers();

    const search = Route.useSearch();

    const list = data?.results || [];

    const columns = COLS_CONFIG;

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
                sorting,
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
            // onSortingChange={setSorting}
            // enableMultiSort
            maxMultiSortColCount={5}
            enablePagination={false}
            renderBottomToolbar={() => <PaginationZone />}
        />
    );
}

function PaginationZone() {
    const [prevTotal, setPrevTotal] = React.useState(0);

    const { data, isLoading } = useCustomers();

    const search = Route.useSearch();

    const router = useRouter();

    React.useEffect(() => {
        if (data?.total) {
            setPrevTotal(data.total);
        }
    }, [data?.total]);

    const lastPage = Math.ceil((data?.total ?? 0) / search.take) - 1;

    return (
        <div className="flex gap-1 items-center p-4">
            <button
                disabled={isLoading}
                className="bg-sky-500 text-white px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-50"
                onClick={() => {
                    router.navigate({ to: '/customers', search: { ...search, skip: 0 } });
                }}
            >
                First
            </button>
            <button
                disabled={search.skip === 0 || isLoading}
                className="bg-sky-500 text-white px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-50"
                onClick={() => {
                    router.navigate({ to: '/customers', search: { ...search, skip: search.skip - search.take } });
                }}
            >
                <ChevronLeft />
            </button>
            <button
                className="bg-sky-500 text-white px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-50"
                disabled={search.skip + search.take >= (data?.total ?? 0) || isLoading}
                onClick={() => {
                    router.navigate({ to: '/customers', search: { ...search, skip: search.skip + search.take } });
                }}
            >
                <ChevronRight />
            </button>
            <button
                disabled={search.skip + search.take >= (data?.total ?? 0) || isLoading}
                className="bg-sky-500 text-white px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-50"
                onClick={() => {
                    router.navigate({ to: '/customers', search: { ...search, skip: lastPage * search.take } });
                }}
            >
                Last
            </button>

            <span className="ml-auto flex items-center gap-4">
                <select
                    disabled={isLoading}
                    className="bg-slate-500 text-white px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-50"
                    onChange={(e) => {
                        router.navigate({ to: '/customers', search: { ...search, take: parseInt(e.target.value) } });
                    }}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <span>
                    <b>{search.skip + 1}</b> - <b>{search.skip + search.take}</b> of <b>{prevTotal}</b>
                </span>
            </span>
        </div>
    );
}

function useCustomers() {
    const search = Route.useSearch();

    const params = Object.keys(search)
        .filter((key) => !!search[key as keyof typeof search])
        .reduce<Record<string, any>>((acc, key) => {
            acc[key] = search[key as keyof typeof search];
            return acc;
        }, {});

    const url = `${API_BASE}?include=total&${new URLSearchParams(params).toString()}`;

    const { data, isLoading } = useQuery<ResponseApi>({
        queryKey: ['customers', params],
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
        staleTime: Infinity,
    });

    return { data, isLoading };
}
