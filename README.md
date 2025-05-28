# UI Skills Test - Occupass

## Overview

This application provides a user interface for managing and viewing customer and order data through the Occupass API services. Built with React and TypeScript, it offers a modern, responsive interface for data management.

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **UI Components**: [Material-UI (MUI) v7](https://mui.com/)
- **Routing**: [TanStack Router](https://tanstack.com/router/latest)
- **Table Management**: [Material React Table](https://www.material-react-table.com/docs/guides/sorting)
- **Styling**:
    - Emotion (CSS-in-JS)
    - Tailwind CSS
- **Development Tools**:
    - TypeScript
    - Vite
    - TanStack Router DevTools
    - React Query DevTools
- **Form Validation**: Zod

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

### User Interface

- **Navigation**
    - Navbar for quick access
    - **Filtering, sorting, paging will automatically append to url params => shareable links to retain state under any circumstances.**

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

### Detailed Views

- **Customer Details** (`/customers/:id`)

    - View customer information
    - Associated orders list

- **Order Details** (`/orders/:id`)
    - View order information

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
- REST API integration
- Error handling and loading states
- URL params state
