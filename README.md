# Book Haven - Digital Library

## Project Name: **Book Haven**

## 🌐 Live Url

- 🔗 **Live URL (Netlify):** https://jannatpha10.netlify.app
- **GitHub Client Repository:** https://github.com/JannatMollah/Book-Haven-Client
- **GitHub Server Repository:** https://github.com/JannatMollah/Book-Haven-Server

---

### **Purpose**

Book Haven is a comprehensive digital library platform that provides users with access to an extensive collection of books. The application allows users to browse books, view detailed information, manage personal collections, and interact with other readers through reviews and comments. It features secure authentication and a modern, responsive design for seamless reading experience across all devices.

### **Key Features**

- **Authentication**: Users can register, login, and log out with email/password or Google sign-in.
- **Book Management**: Browse, search, and filter books by title, author, genre, and rating.
- **Personal Library**: Add books to your personal collection and manage your reading list.
- **Book Details**: Each book has its own detailed page with summary, ratings, and user comments.
- **Reviews & Comments**: Users can leave reviews and comments on books they've read.
- **Private Routes**: Book details and personal features are protected and only accessible after login.
- **Password Reset**: Users can reset their password using their email.
- **Profile Management**: Users can update their profile (Name and Photo URL).
- **Responsive Design**: The app is fully responsive and works on both mobile and desktop devices.

### **Technologies Used**

- **React**: JavaScript library for building user interfaces.
- **Node.js**: Runtime environment for server-side development.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing book and user data.
- **Firebase**: Backend-as-a-Service for user authentication.
- **React Router**: For managing the routing of the application.
- **Tailwind CSS**: For styling the application with utility-first classes.
- **Vite**: Fast, modern build tool for React.
- **Axios**: For making HTTP requests to the backend API.

### **npm Packages Used**

- **firebase**: Firebase authentication and backend services.
- **react-router-dom**: For routing and navigation within the app.
- **react-icons**: For adding icons in the UI.
- **axios**: For API calls to the backend server.
- **react-hot-toast**: For displaying user notifications.
- **daisyui**: Tailwind CSS component library.
- **swiper**: For interactive sliders and carousels.

---

### **Installation & Setup**

#### Client Side Setup:
1. Clone the client repository:
    ```bash
    git clone https://github.com/your-username/book-haven-client.git
    ```
2. Navigate to the project directory:
    ```bash
    cd book-haven-client
    ```
3. Install the required npm packages:
    ```bash
    npm install
    ```
4. Set up your Firebase configuration:
    - Create a `.env` file in the root directory and add your Firebase API keys:
    ```plaintext
    VITE_apiKey=your-api-key
    VITE_authDomain=your-auth-domain
    VITE_projectId=your-project-id
    VITE_storageBucket=your-storage-bucket
    VITE_messagingSenderId=your-sender-id
    VITE_appId=your-app-id
    ```

5. Run the development server:
    ```bash
    npm run dev
    ```

6. Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to see the application in action.

#### Server Side Setup:
1. Clone the server repository:
    ```bash
    git clone https://github.com/your-username/book-haven-server.git
    ```
2. Navigate to the project directory:
    ```bash
    cd book-haven-server
    ```
3. Install the required npm packages:
    ```bash
    npm install
    ```
4. Set up your environment variables:
    - Create a `.env` file in the root directory:
    ```plaintext
    DB_USER=your-mongodb-username
    DB_PASS=your-mongodb-password
    PORT=5000
    ```

5. Start the server:
    ```bash
    npm run dev
    ```

6. The server will run on [http://localhost:5000](http://localhost:5000)

---

### **API Endpoints**

- `GET /books` - Get all books
- `GET /books/:id` - Get single book details
- `POST /books` - Add new book (authenticated)
- `PUT /books/:id` - Update book details (authenticated)
- `DELETE /books/:id` - Delete book (authenticated)
- `GET /latest` - Get latest 8 books
- `GET /my-books` - Get user's book collection
- `POST /my-books` - Add book to collection
- `GET /comments/:bookId` - Get comments for a book
- `POST /comments` - Add new comment

---

### **Contributing**

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

---

### **Future Improvements**

- Add book reading functionality with PDF/epub support
- Implement book recommendation algorithms
- Add social features like following other readers
- Integrate with external book APIs for more comprehensive data
- Implement advanced search filters and sorting options
- Add reading progress tracking and reading statistics
- Implement book clubs and group reading features

---