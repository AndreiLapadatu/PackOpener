# FIFA Pack Opening Web Application

A web application that simulates FIFA-style pack opening with player cards. Built with React, Spring Boot, and PostgreSQL.

## Features

- User authentication and account management
- Virtual currency system
- Three types of card packs:
  - Basic Pack (5 cards, 1 guaranteed gold)
  - Premium Pack (8 cards, 4 guaranteed gold)
  - Ultimate Pack (10 cards, 1 guaranteed 85+ rated)
- Card collection management
- Player card database with 500+ players
- Beautiful UI with pack opening animations

## Prerequisites

- Node.js (v14 or higher)
- Java 17 or higher
- PostgreSQL 12 or higher
- Maven

## Setup Instructions

### Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE packopening;
```

2. Run the schema creation script:
```bash
psql -U your_username -d packopening -f schema.sql
```

3. Run the player data insertion script:
```bash
psql -U your_username -d packopening -f insert_players.sql
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```
REACT_APP_API_URL=http://localhost:8080/api
```

4. Start the development server:
```bash
npm start
```

### Backend Setup

1. Update `application.properties` with your database credentials:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/packopening
spring.datasource.username=your_username
spring.datasource.password=your_password
```

2. Run the Spring Boot application:
```bash
./mvnw spring-boot:run
```

## Development

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

## Technologies Used

- Frontend:
  - React
  - TypeScript
  - Material-UI
  - React Router
  - Axios

- Backend:
  - Spring Boot
  - Spring Security
  - Spring Data JPA
  - PostgreSQL

## License
