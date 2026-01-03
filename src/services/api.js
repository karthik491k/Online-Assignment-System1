// Mock users database
const MOCK_USERS = [
  {
    id: '1',
    email: 'teacher@example.com',
    password: 'teacher123',
    name: 'John Smith',
    role: 'teacher',
  },
  {
    id: '2',
    email: 'student@example.com',
    password: 'student123',
    name: 'Jane Doe',
    role: 'student',
  },
];

// Simulate API delay
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Auth API
export const authAPI = {
  // Login user
  login: async (email, password) => {
    await delay();
    
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  // Register new user
  register: async (userData) => {
    await delay();
    
    // Check if user already exists
    const existingUser = MOCK_USERS.find((u) => u.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      ...userData,
    };
    
    MOCK_USERS.push(newUser);
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  // Logout user
  logout: async () => {
    await delay(200);
    return { success: true };
  },
};

// File upload API (mock)
export const fileAPI = {
  // Upload file (simulated)
  uploadFile: async (file) => {
    await delay();
    
    // In a real application, this would upload to a server
    // For now, we'll just return a mock file URL
    return {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      fileUrl: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString(),
    };
  },

  // Download file (simulated)
  downloadFile: async (fileUrl, fileName) => {
    await delay();
    
    // In a real application, this would download from a server
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return { success: true };
  },
};

// Helper function to check if deadline has passed
export const isOverdue = (deadline) => {
  return new Date(deadline) < new Date();
};

// Helper function to format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Helper function to get time remaining
export const getTimeRemaining = (deadline) => {
  const now = new Date();
  const end = new Date(deadline);
  const diff = end - now;
  
  if (diff <= 0) {
    return 'Overdue';
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} remaining`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
  } else {
    return 'Due soon';
  }
};
