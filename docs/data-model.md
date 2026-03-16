# Data Model

## Introduction

This document describes the data structure used in the Student Task Manager application.

The purpose of this document is to explain how task information and user information are organized and stored in the system.

The current implementation stores data using the browser's localStorage feature.

---

## Entities in the System

The system mainly uses two types of data:

• Users (Team Members)  
• Tasks

---

## Users Structure

Users represent the team members who can be assigned tasks.

Example structure:


{
id: 1,
name: "Bikash",
role: "Database Analyst"
}


Fields explanation:

| Field | Description |
|------|-------------|
| id | Unique identifier for each user |
| name | Name of the team member |
| role | Role of the member in the project |

---

## Task Structure

Tasks represent the work items created within the project.

Example structure:


{
id: 123456,
title: "Design dashboard UI",
assignedTo: 3,
status: "To Do"
}


Fields explanation:

| Field | Description |
|------|-------------|
| id | Unique task identifier |
| title | Description of the task |
| assignedTo | ID of the user assigned to the task |
| status | Task progress (To Do, In Progress, Done) |

---

## Data Relationships

The relationship between users and tasks is simple.

• Each task is assigned to one user  
• One user can have multiple tasks

This represents a **one-to-many relationship**.

Example:

User → Many Tasks

---

## Current Data Storage

Currently the system stores task information in:


localStorage


This allows the application to keep task data even after the page refreshes.

---

## Future Improvements

In future versions of the system, the following improvements could be implemented:

• Use a backend database such as MySQL or MongoDB  
• Store user accounts securely  
• Implement authentication  
• Enable multi-user access to the system

---
---

## Data Flow Overview

The system follows a simple data flow:

User Input → Task Creation → Task Stored in localStorage → Task Displayed in Dashboard

When a user creates a task, the task data is stored inside the browser's localStorage. 
The application then reads the stored data and updates the task list and dashboard statistics.

This process ensures that tasks remain available even after the page is refreshed.

## Conclusion

The data model of the Student Task Manager is simple and designed to support task creation, assignment, and status tracking.

Although the current system uses localStorage for simplicity, the structure can easily be adapted for use with a real