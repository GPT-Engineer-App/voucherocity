import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const fetchTransactions = async () => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, date: '2023-05-01', voucherCode: 'ABC123', fromBank: 'Standard Chartered', toBank: 'NatWest Group', amount: 100, fromCurrency: 'USD', toCurrency: 'GBP' },
    { id: 2, date: '2023-05-02', voucherCode: 'DEF456', fromBank: 'UniCredit', toBank: 'Intesa Sanpaolo', amount: 200, fromCurrency: 'EUR', toCurrency: 'EUR' },
    { id: 3, date: '2023-05-03', voucherCode: 'GHI789', fromBank: 'BBVA', toBank: 'CaixaBank', amount: 150, fromCurrency: 'EUR', toCurrency: 'USD' },
  ];
};

const TransactionHistory = () => {
  const { data: transactions, isLoading, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Voucher Code</TableHead>
            <TableHead>From Bank</TableHead>
            <TableHead>To Bank</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>From Currency</TableHead>
            <TableHead>To Currency</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.voucherCode}</TableCell>
              <TableCell>{transaction.fromBank}</TableCell>
              <TableCell>{transaction.toBank}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.fromCurrency}</TableCell>
              <TableCell>{transaction.toCurrency}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionHistory;
