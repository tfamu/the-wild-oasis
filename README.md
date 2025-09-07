# The Wild Oasis

A comprehensive hotel management application built with React, TypeScript, and Vite. This application helps hotel managers handle bookings, cabin management, guest services, and restaurant operations.

## Features

### Current Features
- 🏠 **Cabin Management**
  - View all cabins
  - Add/Edit/Delete cabins
  - Filter cabins by discount status
  - Sort cabins by name, capacity, price, and discount

- 🔐 **Authentication & Authorization**
  - Secure login system
  - Role-based access control
  - Protected routes

### Upcoming Features
- 📅 **Advanced Booking Management**
  - Create bookings for new guests
  - Handle check-in/check-out processes
  - Dynamic pricing for specific dates
  - Automated invoice generation and email delivery

- 🍽️ **Restaurant Management**
  - Register customer bills
  - Link restaurant charges to room bookings
  - Integrate with checkout process
  - Track dining history

- 💰 **Enhanced Pricing System**
  - Set different prices for specific dates
  - Season-based pricing
  - Special event rates
  - Group booking discounts

- 📧 **Automated Communications**
  - Email booking confirmations
  - Send digital invoices
  - Check-out summaries
  - Restaurant receipts

## Tech Stack

- 🎯 **Frontend**
  - React + TypeScript
  - Vite for development
  - Styled Components
  - React Query
  - React Hook Form

- 🔧 **Backend**
  - Supabase
  - PostgreSQL
  - Real-time subscriptions
  - File storage

## Getting Started

1. Clone the repository
```bash
git clone [your-repo-url]
cd the-wild-oasis
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_key
```

4. Start the development server
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Project Structure

```
src/
├── components/     # Reusable components
├── features/      # Feature-specific components
│   ├── cabins/    # Cabin management
│   ├── bookings/  # Booking operations
│   ├── auth/      # Authentication
│   └── restaurant/# Restaurant management
├── services/      # API and external services
├── hooks/         # Custom React hooksV
├── utils/         # Helper functions
├── types/         # TypeScript type definitions
└── ui/            # UI components and styling
```

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.