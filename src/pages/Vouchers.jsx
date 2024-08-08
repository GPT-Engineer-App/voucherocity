import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import VoucherConversion from '../components/VoucherConversion';
import { useQuery } from '@tanstack/react-query';

const fetchVouchers = async () => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, code: 'ABC123', value: 100, currency: 'USD', status: 'Active', bank: 'Standard Chartered' },
    { id: 2, code: 'DEF456', value: 200, currency: 'EUR', status: 'Active', bank: 'NatWest Group' },
    { id: 3, code: 'GHI789', value: 150, currency: 'GBP', status: 'Active', bank: 'UniCredit' },
  ];
};

const Vouchers = () => {
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: vouchers, isLoading, error } = useQuery({
    queryKey: ['vouchers'],
    queryFn: fetchVouchers,
  });

  const filteredVouchers = vouchers?.filter(voucher =>
    voucher.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    voucher.bank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Vouchers</h2>
        <Button>Create Voucher</Button>
      </div>
      <div className="mb-4">
        <Input 
          placeholder="Search vouchers..." 
          className="max-w-sm" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Bank</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredVouchers.map((voucher) => (
            <TableRow key={voucher.id}>
              <TableCell>{voucher.id}</TableCell>
              <TableCell>{voucher.code}</TableCell>
              <TableCell>{voucher.value}</TableCell>
              <TableCell>{voucher.currency}</TableCell>
              <TableCell>{voucher.status}</TableCell>
              <TableCell>{voucher.bank}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => setSelectedVoucher(voucher)}>Convert</Button>
                <Button variant="outline" size="sm">View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedVoucher && (
        <VoucherConversion
          voucher={selectedVoucher}
          onClose={() => setSelectedVoucher(null)}
        />
      )}
    </div>
  );
};

export default Vouchers;
