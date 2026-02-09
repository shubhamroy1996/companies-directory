# Companies Directory

A modern React application that displays a comprehensive directory of companies with filtering and search capabilities.

## Project Overview

Companies Directory is a full-featured web application built with React and TypeScript that allows users to browse, filter, and search through a database of companies. The application provides detailed information about each company including industry, location, employee count, founding date, revenue, and more.

## Features

- **Company Listing**: Display all companies in an organized table/card format
- **Search Functionality**: Search companies by name, industry, or location
- **Filter by Industry**: Filter companies by their industry type
- **Filter by Location**: Filter companies by their geographical location
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Company Details**: View detailed information about each company
- **Unique Data Extraction**: Automatically generates unique industries and locations from the dataset

## Tech Stack

- **Frontend Framework**: React 18+
- **Language**: TypeScript
- **State Management**: React Hooks
- **Data Handling**: JSON data source with type-safe parsing
- **Build Tool**: Vite or Create React App

## Project Structure

```
companies-directory/
├── src/
│   ├── data/
│   │   ├── companies.ts      # Company data and utility functions
│   │   └── data.json         # Raw company data
│   ├── types/
│   │   └── company.ts        # TypeScript type definitions
│   ├── components/           # React components
│   ├── pages/               # Page components
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── public/                  # Static assets
├── package.json             # Dependencies
└── README.md               # This file
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd companies-directory
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in terminal)

## Data Structure

Each company object contains:
- `id`: Unique identifier
- `name`: Company name
- `industry`: Industry category
- `location`: Geographic location
- `employees`: Number of employees
- `founded`: Year founded
- `revenue`: Annual revenue (converted to number)
- `website`: Company website URL
- `description`: Company description
- `logo`: Company logo URL

## Key Functions

### `mockCompanies`
Loads and transforms company data from `data.json`, converting string revenue values to numbers.

### `getUniqueIndustries()`
Returns a sorted array of all unique industries in the dataset.

### `getUniqueLocations()`
Returns a sorted array of all unique locations in the dataset.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run unit tests (if configured)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

