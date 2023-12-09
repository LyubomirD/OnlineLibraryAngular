# OnlineLibrary

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.0.

## Description
- The Online Library Management System is a web application built using 
Angular for the frontend and Spring Boot for the backend. The system provides 
a user-friendly interface for users to register, log in, and manage their 
personal library. Administrators have additional privileges, allowing them 
to maintain the online library by adding, updating, and deleting books.

## Features
### 1. User Registration and Authentication: 
- Users can register themselves, providing necessary information to create an account. Upon registration, a session cookie is generated, ensuring a seamless login experience. Users, once authenticated, receive a personalized profile with a session cookie for convenient access to the application.

### 2. User Roles:
- The system supports different user roles, distinguishing between regular users and administrators (ADMIN). Administrators have extended capabilities, including the ability to manage the online library.

### 3. Online Library: 
- The main page of the application represents an online library. All users, including administrators, can browse the collection of books available in the library. Each book is displayed with relevant details such as title, author, co-author, and category.

### 4. Admin Privileges: 
- Administrators can perform administrative tasks, including adding new books to the library, updating existing book information, and removing books from the collection.

### 5. Personal Library Management:
- Users can borrow books from the online library, adding them to their personal library. Subsequently, users can remove books from their personal library once they have finished reading them.

## Technologies Used
### 1. Development
- Angular
- TypeScript
- Bootstrap
- HTML
- CSS
