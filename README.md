# Health App

A Next.js application for tracking health metrics, meals, exercises, and personal records.

## Problem Statement

This application provides users with a comprehensive health tracking platform. Users can monitor their body metrics, record meals, track exercises, and maintain a personal diary - all in a visually appealing and intuitive interface.

## Solution

The Health App is built using Next.js and features:

- Dashboard with achievement rate visualization and body metrics
- Meal tracking with categorization
- Exercise logging and monitoring
- Personal diary entries
- Health columns and articles

The application implements:

- Server-side rendering for improved performance
- Responsive design that works across devices
- Robust error handling for API failures
- Dynamic data loading with proper fallbacks

## Technologies

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React Hooks
- Server Components

## Project Structure

```
health-app/
├── app/               # Next.js App Router pages
│   ├── column/        # Health columns page
│   ├── my-record/     # Personal records page
│   └── page.tsx       # Homepage
├── components/        # Reusable UI components
├── lib/               # Utility functions and API client
├── public/            # Static assets
└── styles/            # Global styles
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Verification

To verify the application is working correctly:

1. Check that the homepage loads with the achievement rate chart
2. Verify that meal entries display properly and can be loaded more
3. Navigate to My Record page and ensure all sections (Body Record, My Exercise, My Diary) display correctly
4. Check the Column page to verify articles are displayed properly
5. Test responsiveness by resizing the browser window

All data is loaded dynamically with proper error handling, so the application should function even if API calls fail.
