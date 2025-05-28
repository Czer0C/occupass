import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';

import * as React from 'react';
import FreeSoloCreateOption from '../components/Creatable';

export const Route = createFileRoute('/customers')({
    component: CustomersComponent,
});

const API_HOST = 'https://uitestapi.occupass.com';

const API_BASE = `${API_HOST}/query/customers`;

// Define the Customer type based on the API metadata
interface Customer {
    id: string;
    companyName: string;
    contactName: string;
    contactTitle: string;
    address: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    phone: string;
    fax: string;
}

interface QueryResponse {
    offset: number;
    total: number;
    results: Customer[];
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
const COLS_CONFIG: MRT_ColumnDef<Customer>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        size: 100,
        enableColumnActions: false,
        enableSorting: false,
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

interface Filter {
    ids: string[];
    countryStartsWith: string;
    orderBy?: string[];
    orderByDesc?: string[];
    include?: string;
    fields?: string;
}

interface Pagination {
    pageIndex: number;
    pageSize: number;
}

enum FilterFields {
    id = 'id',
    companyName = 'companyName',
    contactName = 'contactName',
    contactTitle = 'contactTitle',
    address = 'address',
    city = 'city',
    region = 'region',
    postalCode = 'postalCode',
    country = 'country',
    phone = 'phone',
    fax = 'fax',
}

const optionsFields = Object.values(FilterFields).map((field) => ({
    value: field,
    label: field,
}));

function CustomersComponent() {
    const [pagination, setPagination] = React.useState<Pagination>({
        pageIndex: 0,
        pageSize: 5,
    });

    const [fields, setFields] = React.useState<FilterFields[]>([]);

    const [filter, setFilter] = React.useState<Filter>({
        ids: [],
        countryStartsWith: '',
        include: 'total',
        orderBy: [],
        orderByDesc: [],
    });

    const body = React.useMemo(
        () => ({
            ...filter,
            skip: pagination.pageIndex * pagination.pageSize,
            take: pagination.pageSize,
            fields: fields.join(','),
            orderBy: filter.orderBy?.join(','),
            orderByDesc: filter.orderByDesc?.join(','),
        }),
        [filter, pagination, fields],
    );

    const { data, isLoading, isError, error, isFetching } = useQuery<QueryResponse>({
        queryKey: ['customers', body],
        queryFn: async () => {
            const response = await fetch(API_BASE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    });

    const list = data?.results ?? [];

    const columns = React.useMemo(() => {
        return COLS_CONFIG.filter(
            (col: MRT_ColumnDef<Customer>) => !fields.length || fields.includes(col.accessorKey as FilterFields),
        );
    }, [fields]);

    return (
        <div className="p-4 rounded-lg m-4 bg-white">
            <h2 className="text-2xl font-bold mb-4 text-slate-500">Customers</h2>

            <div className="flex flex-col gap-2 mb-4 items-center">
                <Autocomplete
                    multiple
                    onChange={(event, value) => setFields(value.map((option) => option.value))}
                    options={optionsFields}
                    getOptionLabel={(option) => option.label}
                    disableCloseOnSelect
                    fullWidth
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField {...params} fullWidth variant="standard" label="Fields" placeholder="Fields" />
                    )}
                />

                <FreeSoloCreateOption
                    label="IDs"
                    onChange={(newVals) => {
                        const parseString = newVals
                            .map((i: any) =>
                                typeof i === 'string' ? i : typeof i === 'object' && i.value ? i.value : null,
                            )
                            .filter((k: any) => !!k);

                        setFilter((prev) => ({
                            ...prev,
                            ids: parseString,
                        }));
                    }}
                />

                <Autocomplete
                    multiple
                    onChange={(event, value) =>
                        setFilter((prev) => ({ ...prev, orderBy: value.map((option) => option.value) }))
                    }
                    options={optionsFields}
                    getOptionLabel={(option) => option.label}
                    disableCloseOnSelect
                    fullWidth
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField {...params} fullWidth variant="standard" label="Order By" placeholder="Order By" />
                    )}
                />

                <Autocomplete
                    multiple
                    onChange={(event, value) =>
                        setFilter((prev) => ({ ...prev, orderByDesc: value.map((option) => option.value) }))
                    }
                    options={optionsFields}
                    getOptionLabel={(option) => option.label}
                    disableCloseOnSelect
                    fullWidth
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            variant="standard"
                            label="Order By Desc"
                            placeholder="Order By Desc"
                        />
                    )}
                />
            </div>

            {isError && (
                <div className="p-4 text-red-500">
                    Error loading customers: {error instanceof Error ? error.message : 'Unknown error'}
                </div>
            )}

            <MaterialReactTable
                muiTablePaperProps={{ elevation: 0 }}
                columns={columns}
                data={list}
                state={{
                    isLoading,
                    pagination,
                }}
                enableColumnFilters={false}
                muiTableContainerProps={{ sx: { maxHeight: '600px' } }}
                initialState={{
                    density: 'compact',
                    pagination,
                }}
                manualFiltering
                manualSorting
                manualPagination
                rowCount={data?.total ?? 0}
                onPaginationChange={setPagination}
                enablePagination
                muiTableHeadCellProps={{
                    sx: {
                        fontWeight: 'bold',
                        fontSize: '0.875rem',
                    },
                }}
                renderEmptyRowsFallback={() => (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-gray-500">No data found</p>
                    </div>
                )}
            />
        </div>
    );
}
