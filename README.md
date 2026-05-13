# student-task-manager
Collaborative Student Task Management Web App
Project Overview
The Student Task Manager is a web-based application designed to help students manage and track tasks within a group project. The system allows users to create tasks, assign them to team members, and monitor progress.

Features
Create tasks
Assign tasks to team members
Update task status (To Do, In Progress, Done)
Delete tasks
Mark all tasks as done
Dashboard showing task statistics
### Business Analysis contribution
## Requirements

### Functional Requirements
- Users can log in using their name
- Users can create tasks
- Tasks can be assigned to team members
- Tasks can be updated (To Do, In Progress, Done)
- Tasks can be deleted

### Non-Functional Requirements
- The system should be easy to use
- The interface should be clean and responsive
- The application should work on modern browsers
- Data should be stored locally using localStorage
Requirements were analysed and documented to ensure the system meets user needs and usability standards.

Technologies Used
HTML
CSS
JavaScript
localStorage (for data persistence)

Team Members and Roles
Bikash – Data Analyst & System Integration
Sumit – Security Analysis
Pradip – Security Improvements
Manoj – Data Model
Kesang – Business analyst
Dilip – Software Development
Suman – Software Development
Himanshu – Project Manager

Development Workflow
The project followed a collaborative development approach using GitHub.
Each member created a separate feature branch
Changes were committed and pushed to GitHub
Pull requests were created for review
The Project Manager merged changes into the dev branch

Challenges Faced
Coordination between team members
Managing GitHub branches and workflow
Limited participation from some members

Solutions
Clear role assignment
Use of GitHub for version control
Continuous integration of work


## Security Considerations

- Basic input validation has been implemented to prevent empty or invalid task entries
- User login is handled using localStorage to ensure only logged-in users can access the system
- Data is stored securely in the browser using localStorage

### Limitations
- No encryption is applied to stored data
- No backend authentication system is implemented

### Future Improvements
- Implement secure authentication using a backend system
- Add password protection and user accounts
- Use encryption for sensitive data storage
- Implement role-based access control


