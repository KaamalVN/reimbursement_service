# Reimbursement Service Project Roadmap

## Project Overview
The Reimbursement Service is a web-based application designed to streamline the process of submitting and approving reimbursement requests within a company. Employees can request reimbursement for travel and other expenses, while designated approvers can review and approve these requests. The application also includes an admin interface for managing companies and their configurations.

## Goals
- Develop a user-friendly interface for employees to submit reimbursement requests.
- Implement a multi-tier approval process based on company-specific configurations.
- Provide admin capabilities to manage users, companies, and approval workflows.

## Target Users
- **Employees**: Users who will submit reimbursement requests.
- **Approvers**: Users who will review and approve requests.
- **Company Admins**: Users who can manage company-specific settings and configurations.
- **Super Admin**: A user with access to manage multiple companies and overall application settings.

## Features
### User Features
- User authentication (login/logout).
- Submission form for reimbursement requests.
- Dashboard for viewing submitted requests and their statuses.
- Notifications for request status updates.

### Admin Features
- Manage company profiles and settings.
- Configure approval workflows for different employee levels.
- View and manage all requests submitted by employees.

## UI Design
The UI of the Reimbursement Service is designed to be intuitive and easy to navigate. Here’s an overview of the main components of the user interface:

### 1. Login Page
- **Purpose**: Allows users to log in to their accounts.
- **Components**:
  - Username and password fields.
  - Login button.
  - Option to reset password.

### 2. Dashboard
- **Purpose**: Provides an overview of the user’s submitted requests and their statuses.
- **Components**:
  - Summary of recent requests (approved, pending, rejected).
  - Quick links to submit a new reimbursement request.
  - Notifications section for updates on request status.

### 3. Request Submission Form
- **Purpose**: Enables employees to submit reimbursement requests.
- **Components**:
  - Input fields for expense details (e.g., date, amount, description).
  - Option to upload receipts.
  - Submit button to send the request for approval.

### 4. Requests Management
- **Purpose**: Displays a list of all submitted requests for employees and approvers.
- **Components**:
  - Table with columns for request details (date, amount, status, approver).
  - Filter options to view pending, approved, or rejected requests.
  - Option to view detailed information for each request.

### 5. Admin Interface
- **Purpose**: Allows company admins to manage users and configurations.
- **Components**:
  - User management section to add or remove users.
  - Company settings section to configure approval workflows.
  - Overview of all submitted requests across the organization.

## Tech Stack
- **Frontend**: Next.js (React), CSS for styling.
- **Backend**: Flask API for handling requests and managing data.
- **Database**: PostgreSQL or any other suitable relational database.
- **Deployment**: Vercel for the frontend and Azure for the backend.

## Project Structure
src/
├── app/
│   ├── favicon.ico          # Icon for the web application.
│   ├── globals.css          # Global styles for the application.
│   ├── layout.js            # Main layout component for the application structure.
│   ├── page.js              # Default page component for the main route.
│   ├── login/               # Folder containing login-related components.
│   │   └── page.js          # Component for the login page.
│   ├── dashboard/           # Folder for dashboard-related components.
│   │   └── page.js          # Component for the user dashboard.
│   ├── requests/            # Folder for reimbursement request-related components.
│   │   └── page.js          # Component for displaying and submitting requests.
│   └── api/                 # Folder for API routes.
│       └── hello/           # Example API route for testing.
│           └── route.js     # API route handler for the hello endpoint.
├── components/              # Folder for reusable UI components.
│   ├── Navbar.js            # Navigation bar component.
│   ├── Sidebar.js           # Sidebar component for navigation.
│   ├── RequestForm.js       # Component for the reimbursement request submission form.
│   └── RequestTable.js      # Component for displaying a list of reimbursement requests.
├── hooks/                   # Custom hooks for managing state and side effects.
│   └── useRequests.js       # Custom hook for handling reimbursement requests.
├── styles/                  # Folder for component-specific styles.
│   └── RequestForm.module.css # Styles specific to the RequestForm component.
└── utils/                   # Utility functions for the application.
    └── api.js               # API utility for making requests to the backend.

| **Page**          | **Product Admin** | **Company Admin** | **Employee** | **Low-Level Employee** |
|--------------------|-------------------|-------------------|--------------|-------------------------|
| **Login**          | ✅               | ✅               | ✅           | ✅                     |
| **Notifications**  | ✅               | ✅               | ✅           | ✅                     |
| **Dashboard**      | ❌               | ❌               | ✅           | ✅                     |
| **New Request**    | ❌               | ❌               | ✅           | ✅                     |
| **Requests**       | ❌               | ❌               | ✅           | ✅                     |
| **Approvals**      | ❌               | ❌               | ✅           | ❌                     |
| **Company**        | ✅               | ❌               | ❌           | ❌                     |
| **Companies**      | ✅               | ❌               | ❌           | ❌                     |
| **My Company**     | ❌               | ✅               | ❌           | ❌                     |
| **Employee**       | ❌               | ✅               | ❌           | ❌                     |
| **Employees**      | ❌               | ✅               | ❌           | ❌                     |


# Database Schema for Reimbursement Service Project

Database Schema for Reimbursement Service Project
1. Companies Table
sql
Copy code
CREATE TABLE Companies (
    CompanyID INT PRIMARY KEY AUTO_INCREMENT,
    CompanyName VARCHAR(100),
    Address VARCHAR(255),
    ContactEmail VARCHAR(100),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
Description: Stores information about companies using the reimbursement service, including their name, address, and contact email.

2. Roles Table
sql
Copy code
CREATE TABLE Roles (
    RoleID INT PRIMARY KEY AUTO_INCREMENT,
    RoleName VARCHAR(50),
    CompanyID INT, -- Optionally link roles to specific companies if needed
    FOREIGN KEY (CompanyID) REFERENCES Companies(CompanyID)
);
Description: Defines the various roles employees can have within a company, which can be used for permissions and access control. Optionally linked to a specific company.

3. Employees Table
sql
Copy code
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY AUTO_INCREMENT,
    CompanyID INT, -- Links to Companies table
    Name VARCHAR(100),
    Email VARCHAR(100),
    RoleID INT, -- Links to Roles table
    ManagerID INT, -- References EmployeeID to indicate reporting structure
    FOREIGN KEY (CompanyID) REFERENCES Companies(CompanyID),
    FOREIGN KEY (RoleID) REFERENCES Roles(RoleID),
    FOREIGN KEY (ManagerID) REFERENCES Employees(EmployeeID)
);
Description: Stores employee information, including their name, email, role, and reporting structure (manager). Each employee is linked to a specific company.

4. TravelRequests Table
sql
Copy code
CREATE TABLE TravelRequests (
    RequestID INT PRIMARY KEY AUTO_INCREMENT,
    EmployeeID INT, -- Links to Employees table
    RequestType VARCHAR(50), -- e.g., Travel
    TripType VARCHAR(50), -- e.g., Business, Personal
    DomesticInternational VARCHAR(50), -- e.g., Domestic, International
    DepartureLocation VARCHAR(100),
    ArrivalLocation VARCHAR(100),
    DepartureDate DATE,
    ArrivalDate DATE,
    ModeOfTransport VARCHAR(50), -- e.g., Airplane, Train, Car
    PurposeOfVisit TEXT,
    AdvanceRequest BOOLEAN, -- true if requesting advance, false otherwise
    AmountRequested DECIMAL(10, 2), -- Amount requested as advance, if applicable
    AccommodationCost DECIMAL(10, 2), -- Estimated accommodation cost
    TransportCost DECIMAL(10, 2), -- Estimated transport cost
    TotalAmount DECIMAL(10, 2), -- Auto-calculated field based on input
    Status VARCHAR(50), -- Pending, Approved, Rejected
    SubmissionDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);
Description: Contains details about each travel reimbursement request made by employees, including trip type, locations, costs, and status of the request.

5. ApprovalWorkflow Table
sql
Copy code
CREATE TABLE ApprovalWorkflow (
    WorkflowID INT PRIMARY KEY AUTO_INCREMENT,
    RequestID INT, -- Links to TravelRequests table
    ApproverID INT, -- Employee responsible for approval
    Sequence INT, -- Order of approval
    Status VARCHAR(50), -- Pending, Approved, Rejected
    ApprovalDate DATETIME, -- Date of approval/rejection
    FOREIGN KEY (RequestID) REFERENCES TravelRequests(RequestID),
    FOREIGN KEY (ApproverID) REFERENCES Employees(EmployeeID)
);
Description: Manages the approval process for each travel request, tracking the approver, sequence of approval, and the status of each approval.

6. Attachments Table
sql
Copy code
CREATE TABLE Attachments (
    AttachmentID INT PRIMARY KEY AUTO_INCREMENT,
    RequestID INT, -- Links to TravelRequests table
    FilePath VARCHAR(255), -- Path to the uploaded file
    UploadDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (RequestID) REFERENCES TravelRequests(RequestID)
);
Description: Stores any supporting documents or receipts uploaded by employees with their reimbursement requests.

7. Users Table
sql
Copy code
CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(100) UNIQUE,
    PasswordHash VARCHAR(255), -- For storing hashed passwords
    Role VARCHAR(50), -- e.g., 'Product Admin', 'Company Admin'
    CompanyID INT, -- References the company for Company Admins
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (CompanyID) REFERENCES Companies(CompanyID)
);
Description: Manages user accounts for both product admins and company admins, allowing for user authentication and role management within the application.