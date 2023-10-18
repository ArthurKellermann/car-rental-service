# Car Rental Service

A robust car rental service built using modern development tools and architectural patterns.

## About

This project is a Car Rental Service, built with a focus on modern development techniques, tools, and architectural patterns. The main objective is to implement a backend system that offers all the necessary features for a car rental system, like adding new cars, managing users, setting specifications for cars, and processing rentals.

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: Prisma with PostgreSQL
- **Storage**: AWS S3
- **Containerization**: Docker
- **Documentation**: Swagger

## Features

- SOLID and Clean Architecture principles
- Authentication and Password Reset functionalities
- Detailed API documentation available at `/api-docs`
- Routes:
  - Categories (`/categories`)
  - Specifications (`/specifications`)
  - Users (`/users`)
  - Cars (`/cars`)
  - Rentals (`/rentals`)
  - Authentication (`/sessions`)
  - Password Reset (`/password`)

## Installation

1. Clone the repository.
2. Set up the environment variables.
3. Run your Docker containers.
4. Install the dependencies and start the server.

## Running Tests

To run tests, execute the following command:

```bash
npm run test
```

## Lessons Learned

Throughout the development of this project, a deeper understanding of architectural principles like SOLID and Clean Architecture was gained. Incorporating these principles in a Node.js environment provided valuable insights. Additionally, working with tools like Prisma and integrating services like AWS S3 sharpened the development skill set.

## Contributing

Contributions are always welcome! Please ensure you follow the project's code of conduct.

## License

MIT
