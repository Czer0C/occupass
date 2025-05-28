import { ArrowBack } from '@mui/icons-material';
import { createFileRoute, useParams, useRouter } from '@tanstack/react-router';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { NotFound } from '../components/NotFound';
import { Order, OrderDetail } from '../type';
import { formatDotNetDate } from '../utils';
import { Loader } from '../components/Loader';

const API_HOST = 'https://uitestapi.occupass.com';

function ErrorOrderComponent() {
    return (
        <div className="flex flex-col gap-4 items-center justify-center p-4 m-4 max-w-screen-xl mx-auto">
            <div className="text-slate-100 text-xl">Order not found</div>
            <BackButton />
        </div>
    );
}

export const Route = createFileRoute('/orders/$id')({
    errorComponent: ErrorOrderComponent,
    component: OrderDetailComponent,
    notFoundComponent: () => {
        return <NotFound>Order not found</NotFound>;
    },
    pendingComponent: Loader,
    loader: async ({ params: { id } }) => {
        const response = await fetch(`${API_HOST}/query/orders?id=${id}&take=1`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        const order = await response.json();

        return order?.results?.[0];
    },
});

function OrderDetailComponent() {
    const order = Route.useLoaderData();

    const { id } = useParams({ from: '/orders/$id' });

    if (!order) {
        return (
            <div className="p-4">
                <div className="text-gray-500">Order not found</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 p-4 m-4 max-w-screen-xl mx-auto">
            <div className="p-4 rounded-lg bg-slate-100">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold mb-4 text-slate-500">Order Details - {id}</h2>
                    <BackButton />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sky-600">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Customer ID</label>
                            <div className="mt-1 text-lg">{order.customerId}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                            <div className="mt-1 text-lg">{order.employeeId}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Order Date</label>
                            <div className="mt-1 text-lg">{formatDotNetDate(order.orderDate)}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Required Date</label>
                            <div className="mt-1 text-lg">{formatDotNetDate(order.requiredDate)}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Shipped Date</label>
                            <div className="mt-1 text-lg">{formatDotNetDate(order.shippedDate)}</div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ship Via</label>
                            <div className="mt-1 text-lg">{order.shipVia}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Freight</label>
                            <div className="mt-1 text-lg">{order.freight}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ship Name</label>
                            <div className="mt-1 text-lg">{order.shipName}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ship Address</label>
                            <div className="mt-1 text-lg">{order.shipAddress}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ship City</label>
                            <div className="mt-1 text-lg">{order.shipCity}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ship Postal Code</label>
                            <div className="mt-1 text-lg">{order.shipPostalCode}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ship Country</label>
                            <div className="mt-1 text-lg">{order.shipCountry}</div>
                        </div>
                    </div>
                </div>
            </div>
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
