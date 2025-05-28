# UI Skills Test - Occupass

## Overview

This application provides a user interface for managing and viewing customer and order data through the Occupass API services. Built with React and TypeScript, it offers a modern, responsive interface for data management.

## Application Structure

### Pages

- **Home** (`/`)
    - Main landing page with navigation to customers and orders
- **Customers** (`/customers`)
    - List view of all customers with filtering and sorting
    - Server-side pagination
- **Customer Details** (`/customers/:id`)
    - Detailed view of individual customer
    - Associated orders for the customer
- **Orders** (`/orders`)
    - List view of all orders with filtering and sorting
    - Server-side pagination
- **Order Details** (`/orders/:id`)
    - Detailed view of individual order

## API Integration

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

### Data Management

- **Advanced Filtering** (`/customers`, `/orders`)

    - Filter data by any column
    - Multiple filter criteria support
    - Real-time filter updates

- **Sorting Capabilities** (`/customers`, `/orders`)

    - Sort by any column
    - Multi-column sorting
    - Ascending/descending order

- **Pagination** (`/customers`, `/orders`)

    - Server-side pagination implementation
    - Configurable page size
    - Page navigation controls

### User Interface

- **Responsive Design** (All pages)

    - Mobile-friendly layout
    - Adaptive components
    - Consistent user experience across devices

- **Navigation**
    - Intuitive menu structure
    - Breadcrumb navigation
    - Quick access to related data

### Detailed Views

- **Customer Details** (`/customers/:id`)

    - View customer information
    - Associated orders list
    - Order history and status

- **Order Details** (`/orders/:id`)

    - View order information
    - Customer details
    - Order status and history

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
    ```bash
    npm install
    # or
    yarn
    ```
3. Start the development server:
    ```bash
    npm start
    # or
    yarn start
    ```

## Technical Requirements

- React with TypeScript
- Server-side pagination
- Advanced filtering and sorting
- Responsive design
- REST API integration
- Error handling and loading states
