export interface Customer {
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

export interface Order {
    id: number;
    customerId: string;
    employeeId: number;
    orderDate: string;
    requiredDate: string;
    shippedDate: string;
    shipVia: number;
    freight: number;
    shipName: string;
    shipAddress: string;
    shipCity: string;
    shipPostalCode: string;
    shipCountry: string;
}

export interface OrderDetail {
    orderId: number;
    productId: number;
    unitPrice: number;
    quantity: number;
    discount: number;
}
