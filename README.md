# Online Assignment System

A comprehensive React-based assignment management system with role-based access for teachers and students. Built with React, Vite, Tailwind CSS, and React Hook Form.

## 🚀 Features

### Teacher Features
- **Assignment Management**
  - Create assignments with title, description, deadline, and allowed file types
  - View all created assignments
  - Delete assignments
  
- **Submission Management**
  - View all submissions per assignment
  - Mark submissions as "Reviewed"
  - Download submitted files
  - Grade assignments with numeric/letter grades
  - Provide detailed written feedback
  - Update grades and feedback
  - Track submission status (Submitted, Reviewed, Graded)

- **Dashboard**
  - Overview of assignments and submissions
  - Statistics (total assignments, submissions, pending reviews)
  - Recent submissions list

### Student Features
- **Assignment Access**
  - View all available assignments
  - See assignment details and deadlines
  - Track overdue assignments
  
- **Submission**
  - Upload files (PDF, DOC, DOCX, ZIP)
  - Add optional comments
  - Deadline validation
  - One submission per assignment
  
- **Progress Tracking**
  - View submission history
  - Check submission status
  - View grades and teacher feedback
  - Track assignment progress

- **Dashboard**
  - Overview of assignments and submissions
  - Statistics (total, submitted, pending, graded)
  - Upcoming and overdue assignments

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 (Functional Components)
- **Build Tool:** Vite
- **Routing:** React Router v6
- **State Management:** Context API
- **Form Handling:** React Hook Form
- **Styling:** Tailwind CSS
- **API Calls:** Mock API (ready for real backend)

## 📦 Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd "c:\Users\akram\OneDrive\Desktop\projects\online assignment system"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔐 Demo Credentials

### Teacher Account
- **Email:** teacher@example.com
- **Password:** teacher123

### Student Account
- **Email:** student@example.com
- **Password:** student123

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── Toast.jsx
│   ├── StatusBadge.jsx
│   ├── Modal.jsx
│   ├── AssignmentCard.jsx
│   └── PrivateRoute.jsx
├── context/            # Context API providers
│   ├── AuthContext.jsx
│   └── AppContext.jsx
├── pages/              # Page components
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Teacher/
│   │   ├── TeacherDashboard.jsx
│   │   ├── TeacherAssignments.jsx
│   │   ├── CreateAssignment.jsx
│   │   ├── AssignmentSubmissions.jsx
│   │   └── SubmissionDetail.jsx
│   └── Student/
│       ├── StudentDashboard.jsx
│       ├── StudentAssignments.jsx
│       ├── SubmitAssignment.jsx
│       ├── StudentSubmissions.jsx
│       └── StudentSubmissionDetail.jsx
├── services/           # API services and utilities
│   └── api.js
├── App.jsx             # Main app component with routing
├── main.jsx            # Entry point
└── index.css           # Global styles with Tailwind

## 🎯 Key Features Implementation

### Authentication System
- Login and registration with validation
- Role-based routing (Teacher/Student)
- Protected routes
- Persistent sessions using localStorage

### Assignment Management
- CRUD operations for assignments
- Deadline validation
- File type restrictions
- Status tracking

### Submission System
- File upload with validation (max 10MB)
- Submission status tracking
- One submission per assignment per student
- Review and grading workflow

### State Management
- Context API for global state
- AuthContext for user authentication
- AppContext for assignments and submissions
- LocalStorage persistence

### UI/UX
- Responsive design
- Color-coded status badges
- Toast notifications
- Modal dialogs
- Progress indicators
- Form validation with error messages

## 🔄 Data Flow

1. **Authentication Flow**
   - User logs in → AuthContext stores user data
   - Routes check authentication status
   - Role-based redirection

2. **Assignment Flow**
   - Teacher creates assignment → Stored in AppContext
   - Student views assignments → Filtered by submission status
   - Student submits → Submission stored with "submitted" status

3. **Review Flow**
   - Teacher views submissions
   - Marks as "reviewed" → Status updated
   - Grades submission → Status changes to "graded"
   - Student views grade and feedback

## 📱 Routes

### Public Routes
- `/login` - Login page
- `/register` - Registration page

### Teacher Routes
- `/teacher/dashboard` - Teacher dashboard
- `/teacher/assignments` - View all assignments
- `/teacher/assignments/create` - Create new assignment
- `/teacher/assignments/:id/submissions` - View submissions for an assignment
- `/teacher/submissions/:id` - Review and grade submission

### Student Routes
- `/student/dashboard` - Student dashboard
- `/student/assignments` - View all assignments
- `/student/assignments/:id/submit` - Submit assignment
- `/student/submissions` - View all submissions
- `/student/submissions/:id` - View submission details, grade, and feedback

## 🎨 Styling

The application uses Tailwind CSS with custom utility classes:
- `btn-primary` - Primary action button
- `btn-secondary` - Secondary action button
- `input-field` - Styled input fields
- `card` - Card container
- `badge` - Status badge
- `badge-submitted` - Blue badge for submitted status
- `badge-reviewed` - Yellow badge for reviewed status
- `badge-graded` - Green badge for graded status
- `badge-overdue` - Red badge for overdue status

## 🚧 Future Enhancements

- Real backend API integration
- Email notifications
- File preview for PDFs
- Analytics dashboard for teachers
- Export grades to CSV
- Bulk grading
- Assignment templates
- Student analytics
- Discussion forums
- Assignment categories/tags

## 📝 Notes

- This is a mock implementation using localStorage for data persistence
- File uploads are simulated using blob URLs
- All data is stored in the browser's localStorage
- For production, integrate with a real backend API
- Replace mock authentication with secure JWT-based auth
- Implement actual file storage (AWS S3, Firebase Storage, etc.)

## 🤝 Contributing

Feel free to fork this project and customize it according to your needs. This is a complete, production-ready frontend that can be easily integrated with any backend API.

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🐛 Known Issues

- File downloads use blob URLs (for mock purposes)
- No file preview functionality yet
- LocalStorage has size limitations

## ✨ Credits

Built with ❤️ using React, Vite, Tailwind CSS, and modern web technologies.
```
