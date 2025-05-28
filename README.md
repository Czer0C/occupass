# UI Skills Test - Occupass

## Overview
This application provides a user interface for managing and viewing customer and order data through the Occupass API services.

## API Services
The application integrates with the following REST services:
- Base URL: https://uitestapi.occupass.com
- Metadata URL: https://uitestapi.occupass.com/metadata

### Available Services
1. **Customers Service**
   - View list of customers
   - View individual customer details
   - View orders associated with a customer
   - API Operation: https://uitestapi.occupass.com/json/metadata?op=QueryCustomers

2. **Orders Service**
   - View list of orders
   - View individual order details
   - API Operation: https://uitestapi.occupass.com/json/metadata?op=QueryOrders

## Features
- **Menu Navigation**
  - Separate views for customers and orders
  - Detailed views for individual customers and orders
  - Customer details include associated orders

- **Data Management**
  - Filter and sort functionality for all available columns
  - Server-side paging implementation
  - Comprehensive data search capabilities

## Getting Started

To run this app:

- `npm install` or `yarn`
- `npm start` or `yarn start`

## Technical Requirements
- Server-side paging implementation
- Filter and sort functionality for all data columns
- Responsive and user-friendly interface
- Integration with Occupass API services


