# Shellhacks API Routes

## Create a New Hacker Application

### **POST /hackers**

**Input**: New application schema (see **schemas** folder)

**Purpose**: Takes applicant information, performs validation, sends confirmation emails, and adds everything to the database. Returns a signed URL for the user to upload their resume.

**Output**: **{ url: string }**

## Get Hacker Data

### **GET /hackers/[email]**

**Input**: None

**Purpose**: Retrieves data for the current applicant. If logged in as an admin, this will work for emails other than the account holder.

**Output**: JSON object of the hacker data (see **schema.prisma**)

## Update Hacker Data

### **PUT /hackers/[email]**

**Input**: Applicant update schema (see **schemas** folder)

**Purpose**: Updates data for the current applicant, or any applicant if admin.

**Output**: JSON object of the hacker data (see **schema.prisma**)

## Get Resume URL

### **GET /hackers/[email]/resume**

**Input**: None

**Purpose**: Retrieves a signed resume URL so the hacker can view their resume.

**Output**: **{ url: string }**

## Update Resume

### **PUT /hackers/[email]/resume**

**Input**: None

**Purpose**: Returns a signed URL so the hacker can upload a new copy of their resume.

**Output**: **{ url: string }**

## Get Multiple Hackers (Admin)

### **GET /admin/hackers**

**Input**: Filters (as query parameters), see schema

**Purpose**: Route to get multiple applicants, used for the admin dashboard.

**Output**: Array of hackers (see **schema.prisma**)

## Bulk Update Hacker Status (Admin)

### **PUT /admin/hackers**

**Input**: Application status to change to

**Purpose**: Used to bulk update the application status of hackers.

**Output**: Success message

## Accept Wave of Hackers (Admin)

### **POST /admin/commands/accept_wave**

**Input**: None

**Purpose**: Accept the current wave of hackers (those with **application_status == 'in_wave'**).

**Output**: Success message

## Send Reminder Emails (Admin)

### **POST /admin/commands/send_reminder_email**

**Input**: Type of reminder (**'accepted'** or **'confirmed'**)

**Purpose**: Used to remind hackers with a specific status. If accepted, send an email reminding them to confirm. If confirmed, remind them to check the hacker guide.

**Output**: Success message
