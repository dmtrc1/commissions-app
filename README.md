# Commissions App

This Node.js application calculates commission fees for cash-in and cash-out transactions for accounts based on specified rules. It supports distinct commission structures for natural and legal persons and applies appropriate rounding to the nearest cent as per financial standards.

## Features

- **Cash In Calculation**: Computes the commission for cashing into an account with a cap on the maximum fee.
- **Cash Out Calculation**:
  - **Natural Persons**: Applies a weekly threshold and calculates fees based on the exceeded amount.
  - **Legal Persons**: Ensures a minimum fee is charged for each transaction.
- **Precision Handling**: Rounds up fees to the nearest cent to ensure compliance with financial transaction rules.
- **Data Driven Approach**: Processes transactions from a provided JSON file, making it flexible for various data inputs.

## Getting Started

These instructions will guide you on how to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before starting, ensure you have Node.js installed on your system. You can check your Node.js version by running:

```bash
node -v
```

If Node.js is not installed, download and install it from [Node.js official website](https://nodejs.org/).

### Installation

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/dmtrc1/commissions-app.git
```

```bash
cd commissions-app
```

Install the necessary dependencies by running:

```bash
npm install
```

### Environment Configuration

The application requires specific environment variables to run properly. These variables contain sensitive information and should not be exposed in public repositories.

#### Steps to Configure Environment Variables:

- Copy the `.env.example` file in the root of the project.

- Rename the copied file to `.env`.

- Fill in the actual values for each variable.

Example of copying and renaming the file in a command line (bash):

```bash
cp .env.example .env
```

## Usage

To run the application, execute the following command in the terminal:

```bash
node app.js input.json
```

## Running the Tests

Ensure the application functions as expected by running tests with:

```bash
npm test
```

This will execute the suite of unit tests designed to verify the logic of commission calculations and API interactions.

## Contributing

Contributions are welcome! If you have suggestions for improving the application, please fork the repository and submit a pull request, or open an issue with the tags "enhancement" or "bug".
