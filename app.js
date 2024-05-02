const fs = require('fs');
const { processTransaction } = require('./src/services/transactionProcessor');

function readTransactions(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading file:", err);
    return [];
  }
}

function main(inputFile) {
  const transactions = readTransactions(inputFile);
  const fees = transactions.map(transaction => processTransaction(transaction));
  fees.forEach(fee => console.log(fee.toFixed(2)));
}

const inputFile = process.argv[2];
if (!inputFile) {
  console.error('Please provide a file path.');
  process.exit(1);
}

main(inputFile);
