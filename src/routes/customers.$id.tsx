import { ArrowBack } from '@mui/icons-material';
import { createFileRoute, Link, useParams, useRouter } from '@tanstack/react-router';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { NotFound } from '../components/NotFound';
import { OrderDict } from '../enum';
import { Customer, Order, OrderDetail } from '../type';
import { formatDotNetDate } from '../utils';
import { Loader } from '../components/Loader';
import { COLS_CONFIG_ORDERS } from './orders.index';

const API_HOST = 'https://uitestapi.occupass.com';

function ErrorCustomerComponent() {
    return (
        <div className="flex flex-col gap-4 items-center justify-center p-4 m-4 max-w-screen-xl mx-auto">
            <div className="text-slate-100 text-xl">Customer not found</div>
            <BackButton />
        </div>
    );
}

export const Route = createFileRoute('/customers/$id')({
    errorComponent: ErrorCustomerComponent,
    component: CustomerDetailComponent,
    notFoundComponent: () => {
        return <NotFound>User not found</NotFound>;
    },
    pendingComponent: Loader,
    loader: async ({ params: { id } }) => {
        const [customerResponse, ordersResponse] = await Promise.all([
            fetch(`${API_HOST}/query/customers?id=${id}&take=1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }),
            fetch(`${API_HOST}/query/orders?customerId=${id}&take=1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }),
        ]);

        const [customer, orders] = await Promise.all([customerResponse.json(), ordersResponse.json()]);

        return {
            customer: customer.results[0],
            orders: orders.results,
        };
    },
});

interface CustomerResponse {
    customer: Customer;
    orders: Order[];
}

function CustomerDetailComponent() {
    const data = Route.useLoaderData();

    const { id } = useParams({ from: '/customers/$id' });

    const { customer, orders } = data as CustomerResponse;

    if (!customer) {
        return (
            <div className="p-4">
                <div className="text-gray-500">Customer not found</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 p-4 m-4 max-w-screen-xl mx-auto">
            <div className="p-4 rounded-lg bg-slate-100">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold mb-4 text-slate-500">Customer Details - {id}</h2>

                    <BackButton />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sky-600">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Company Name</label>
                            <div className="mt-1 text-lg">{customer.companyName}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact Name</label>
                            <div className="mt-1 text-lg">{customer.contactName}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact Title</label>
                            <div className="mt-1 text-lg">{customer.contactTitle}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <div className="mt-1 text-lg">{customer.address}</div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">City</label>
                            <div className="mt-1 text-lg">{customer.city}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Region</label>
                            <div className="mt-1 text-lg">{customer.region}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                            <div className="mt-1 text-lg">{customer.postalCode}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Country</label>
                            <div className="mt-1 text-lg">{customer.country}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <div className="mt-1 text-lg">{customer.phone}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fax</label>
                            <div className="mt-1 text-lg">{customer.fax}</div>
                        </div>
                    </div>
                </div>
            </div>

            <MaterialReactTable
                enableTopToolbar={false}
                enableBottomToolbar={false}
                muiTablePaperProps={{
                    elevation: 0,
                }}
                columns={COLS_CONFIG_ORDERS}
                data={orders}
            />
        </div>
    );
}

function BackButton() {
    const router = useRouter();

    return (
        <>
            <button onClick={() => router.history.back()} className="text-red-400 flex items-center gap-1">
                <ArrowBack />
                Back
            </button>
        </>
    );
}
