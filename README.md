# Full Stack App

This is a full stack application built with a React frontend and a NestJS backend.

## Prerequisites

- Docker
- Docker Compose 2.x.x (Plugin)
- Node.js 18.x

## Project Structure

- `frontend/` - React application
- `backend/` - NestJS application

## Getting Started

### Running the Application with Docker Compose

1. Clone the repository:

```bash
git clone https://github.com/viniqrz/full-stack-assignment.git
cd full-stack-assignment
```

2. Start the application using Docker Compose:

```bash
docker-compose up --build
```

3. The application should now be running. You can access the frontend at `http://localhost:3000` and the backend at `http://localhost:5000`.

### Running the Application Locally

If Docker is not available, you can run the application locally.

#### Running the Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install the dependencies:

```bash
npm install
```

3. Start the backend server:

```bash
npm run start
```

The backend should now be running at `http://localhost:5000`.

#### Running the Frontend

1. Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
```

2. Install the dependencies:

```bash
npm install
```

3. Start the frontend server:

```bash
npm dev
```

The frontend should now be running at `http://localhost:3000`.

### Running Tests on the Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install the dependencies:

```bash
npm install
```

3. Run the tests:

```bash
npm run test
```

## License

This project is licensed under the MIT License.
