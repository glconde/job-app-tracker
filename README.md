# Job Application Tracker

A full-stack job application tracking app built with Angular and ASP.NET Core Web API. It allows users to manage job applications through a simple workflow, including creating, viewing, updating, deleting, and filtering records.

## Features

- Add new job applications
- View all saved applications
- Edit existing applications
- Delete applications
- Filter by application status
- Search by company name or job title
- Persist data using SQLite
- Track status values such as Interested, Applied, Interviewing, Offer, Rejected, and Archived

## Tech Stack

### Frontend
- Angular
- TypeScript
- Template-driven forms
- HttpClient

### Backend
- ASP.NET Core Web API
- C#
- Entity Framework Core
- SQLite

## Architecture

```text
Angular UI
   ↓
ASP.NET Core Web API
   ↓
Entity Framework Core
   ↓
SQLite
```

The frontend communicates with the backend through REST endpoints. The backend uses Entity Framework Core for data access and SQLite for lightweight local persistence.

## Screenshots
-todo
### Dashboard
### Add/Edit Form

## Project Structure
```text
job-app-tracker
├── api
│   └── JobAppTrackerApi
├── ui
│   └── job-app-tracker-ui
├── README.md
└── .gitignore
```

## Getting Started
### Prerequisites
- .NET 8 SDK
- Node.js
- Angular CLI

### Backend Setup
```bash
cd api/JobAppTrackerApi
dotnet restore
dotnet ef database update
dotnet run
```

### Frontend Setup
```
cd ui/job-app-tracker-ui
npm install
ng serve
```
The Angular app will run locally on
```
http://localhost:4200
```

## API Endpoints
### Job Applications

- GET /api/jobapplications
- GET /api/jobapplications/{id}
- POST /api/jobapplications
- PUT /api/jobapplications/{id}
- DELETE /api/jobapplications/{id}

## Status Values

The application currently supports the following statuses:
- Interested
- Applied
- Interviewing
- Offer
- Rejected
- Archived

## Current MVP Scope

This project is currently at MVP stage and supports the core job application tracking workflow from the UI through to persistent storage.

## Future Improvements

- Authentication and per-user data
- Dashboard analytics and charts
- Sorting and pagination
- Better form validation
- Export to CSV
- Responsive mobile-friendly layout improvements

## Why I Built This

I built this project as a practical full-stack application using Angular and ASP.NET Core, while also solving a real workflow problem: keeping job applications organized in one place.

## 👤 Author

George Louie Conde  
Software Developer  
Calgary, AB  
[LinkedIn](https://linkedin.com/in/glconde)  
[GitHub](https://github.com/glconde)

## License
This project is licensed under the MIT License.
See the LICENSE file for details.

