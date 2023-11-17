# BookIt: Accommodation Booking Platform

BookIt is a web application designed for users to find and book accommodations seamlessly. Whether you're a traveler looking for a place to stay or a property owner wanting to list your space, BookIt has got you covered. Users can register, log in, search for accommodations, make bookings, and even process payments securely.

## Features

1. **User Authentication:**

   - New users can easily create an account by registering with a unique username and email.
   - Existing users can log in securely to access their accounts.
2. **Accommodation Search:**

   - Users can search for accommodations based on location, dates, and preferences.
   - Filters allow users to narrow down their search based on various criteria like price, amenities, and more.
3. **Booking Process:**

   - Seamless booking experience with an intuitive interface.
   - Users can view details of available accommodations, including photos, descriptions, and pricing.
   - Booking confirmation with details sent to the user's email.
4. **Payment Processing:**

   - Secure payment gateway integration for processing accommodation payments.
   - Multiple payment options, ensuring flexibility for users.
5. **User Dashboard:**

   - User-friendly dashboard for managing bookings, personal information, and preferences.
   - History of past bookings and upcoming reservations.
6. **Property Owner Privileges:**

   - Property owners can register and log in to create listings for accommodations.
   - Owners can manage their listed apartments, update details, and view booking history.

## Technologies Used

- **Frontend:**

  - React.js for building the user interface.
  - Redux for state management.
  - React Router for navigation.
- **Backend:**

  - Node.js and Express for server-side logic.
  - MongoDB for database storage.
  - JWT for user authentication.
- **Payment Processing:**

  - Integration with a secure payment gateway (e.g., Stripe,Paystack).

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/ochosteve08/Book-It.git
   ```
2. **Setup Frontend:**

   ```bash
   cd BookIt/client 
   npm install
   npm run dev
   ```
3. **Setup Backend:**

   ```bash
   cd BookIt/server
   npm install
   npm run dev
   ```
4. **Database Configuration:**

   - Configure MongoDB and update the database connection in the backend.
5. **Payment Gateway Integration:**

   - Set up an account with a payment gateway provider (e.g., Stripe,Paystack) and integrate the API keys in the backend.
6. **Run the Application:**

   - Visit `http://localhost:5173` in your browser to access the BookIt application.


## Acknowledgments

- This project was inspired by the need for a user-friendly accommodation booking platform.

Feel free to contribute to the project by submitting bug reports, feature requests, or pull requests. Happy booking! 🏠✈️
