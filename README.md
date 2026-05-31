# Student Task Manager

## Collaborative Student Task Management Web Application

The Student Task Manager is a collaborative web-based application developed to help students organise, assign, and track tasks during group projects. The system was designed to improve teamwork, task management, and progress monitoring within a student environment.

The application allows users to create tasks, assign them to team members, manage workflow stages, and monitor project progress through a simple and user-friendly dashboard interface.

---

# Project Overview

Group projects often create challenges related to communication, task allocation, and progress tracking. This application was developed to provide a simplified task management system where team members can clearly identify responsibilities and monitor ongoing work.

The project was developed collaboratively using HTML, CSS, and JavaScript, with localStorage used to simulate persistent data storage within the browser.

---

# Key Features

- User login system
- Create and assign tasks to team members
- Set task priorities and due dates
- Update task status (To Do, In Progress, Done)
- Delete completed tasks
- Dashboard displaying task statistics
- Task creator tracking feature
- Search functionality for tasks
- Input validation for improved security
- Responsive dark-themed user interface

---

# Business Analysis Contribution

## Requirements

### Functional Requirements
- Users can log in using their name
- Users can create tasks
- Tasks can be assigned to team members
- Tasks can be updated between different workflow stages
- Users can delete completed tasks
- Dashboard statistics should update dynamically

### Non-Functional Requirements
- The system should be easy to use and user-friendly
- The interface should be responsive and visually clear
- The application should work across modern browsers
- Data should persist using localStorage
- The application should respond quickly to user actions

The requirements were analysed and documented to ensure the system meets user needs, usability expectations, and collaborative workflow requirements.

---

# Technologies Used

- HTML5
- CSS3
- JavaScript
- localStorage (browser-based data persistence)
- GitHub (version control and collaboration)

---

# Team Members and Roles

| Team Member | Role |
|---|---|
| Bikash | Database Analyst & System Integration |
| Himanshu | Project Manager |
| Suman | Software Developer |
| Dilip | Software Developer |
| Manoj | Database Analyst |
| Keshang | Business Analyst |
| Sumit | Security Analyst |
| Pradip | Security Analyst |

---

# Development Workflow and Project Management

The project followed a collaborative development workflow using GitHub for version control and team coordination.

A separate `dev` branch was used for implementing and testing features before merging them into the `main` branch for final deployment. Each team member contributed according to their assigned role and responsibilities.

The workflow included:

- Creating feature-specific updates
- Regular commits and push operations
- Collaborative testing and debugging
- Pull request review and merge process
- Final integration into the main branch

This branching strategy helped reduce conflicts, maintain code stability, and improve collaboration between team members.

---

# Database Structure

The application stores task and member data using JavaScript objects and browser localStorage.

Each task contains:
- Task ID
- Task title
- Assigned team member
- Priority level
- Due date
- Workflow status
- Task creator information

Although the current system uses localStorage, the structure was designed so it could later be integrated into a relational database system such as MySQL or PostgreSQL.

---

# Security Considerations

Basic security measures were implemented within the system to improve reliability and prevent invalid user actions.

### Current Security Features
- Input validation prevents empty or invalid task entries
- User login is required before accessing the application
- Data persistence is controlled using localStorage
- Task creation requires valid user input

### Current Limitations
- No backend authentication system
- No password encryption
- No database-level security
- localStorage is client-side only

### Future Security Improvements
- Implement secure backend authentication
- Add encrypted password protection
- Introduce role-based access control
- Implement secure cloud database storage

---

# Challenges Faced

During development, the team experienced several challenges including:

- Coordinating work between multiple team members
- Managing GitHub branches and merge conflicts
- Integrating features developed by different contributors
- Ensuring consistent functionality across the application

---

# Solutions Implemented

To overcome these challenges, the team implemented:

- Clear role allocation among members
- GitHub-based collaboration and version control
- Continuous testing and debugging
- Structured branching workflow using dev and main branches
- Regular communication between team members

---

# Future Improvements

If the project were expanded further, several improvements could be added:

- Backend database integration
- Real-time collaboration features
- Cloud-based data synchronization
- Mobile optimisation
- Notification and reminder system
- Advanced user authentication
- Admin dashboard and analytics

---

# Conclusion

The Student Task Manager project successfully demonstrates the implementation of a collaborative task management system using modern web development technologies. The project highlights teamwork, version control, frontend development, data handling, security considerations, and project management practices within a collaborative software development environment.