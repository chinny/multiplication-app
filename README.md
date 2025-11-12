# Multiplication Practice App

This is a simple web application for practicing multiplication. It features a multiplication tester with selectable difficulty and an interactive multiplication table.

## Features

*   **Multiplication Tester**: Practice multiplication problems with selectable difficulty (single, two, or three digits).
*   **Printable Sheets**: Generate and print custom multiplication worksheets.
*   **Interactive Multiplication Table**: View and hide a 12x12 multiplication table.

## Running the Application

This application is containerized using Docker. To run it, you'll need to have Docker installed on your system.

### Build the Docker Image

From the root directory of the project, run the following command to build the Docker image:

```bash
docker build -t multiplication-app .
```

### Run the Docker Container

Once the image is built, you can run the application in a Docker container with the following command:

```bash
docker run -p 3000:3000 multiplication-app
```

The application will be available at [http://localhost:3000](http://localhost:3000) in your web browser.
