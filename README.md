# MyanTech ERP Frontend  

This repository contains the frontend source code for the **MyanTech ERP** project, which was built using **React, Redux, and Vite**. This project was developed for the **Code2Career Hackathon** and won **2nd place**.  

## Table of Contents  
- [Overview](#overview)  
- [Key Features](#key-features)  
- [Technology Stack](#technology-stack)  
- [Getting Started](#getting-started)  
- [Project Structure](#project-structure)  
- [Environment Variables](#environment-variables)  
- [Scripts](#scripts)  
- [License](#license)  

## Overview  
**MyanTech ERP** is an enterprise resource planning web application designed to **streamline and manage business processes** such as **sales, warehouse operations, and finance**.  

### Features include:  
- **Order creation and tracking**  
- **Customers and products management**  
- **Delivery scheduling and status updates**  
- **Returns handling and inventory control**  
- **Invoice management**  

## Key Features  

### **Sales Module**  
- Create orders, manage deliveries, and view sales history.  
- Handle product returns through a **ReturnDialog** component.  

### **Warehouse Module**  
- View **Pending Orders**, assign deliveries, and track real-time updates.  
- Manage **Return Orders** for damaged or incorrect items.  

### **Finance Module**  
- Generate invoices, update payment statuses, and filter invoices by date.  

### **System Module**  
- User management, registration, and **role-based access** (if extended).  

## Technology Stack  
- **Frontend Library**: React + Redux  
- **Bundler/Dev Server**: Vite  
- **UI Framework**: MUI v5  
- **HTTP Client**: Axios  

## Getting Started  

### Clone this repository:  
```sh
git clone https://github.com/your-username/myantech-erp-frontend.git
cd myantech-erp-frontend
