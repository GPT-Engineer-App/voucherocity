import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const dummyVouchers = [
  { id: 1, code: 'ABC123', value: 100, status: 'Active' },
  { id: 2, code: 'DEF456', value: 200, status: 'Used' },
  { id: 3, code: 'GHI789', value: 150, status: 'Expired' },
];

const Vouchers = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Vouchers</h2>
        <Button>Create Voucher</Button>
      </div>
      <div className="mb-4">
        <Input placeholder="Search vouchers..." className="max-w-sm" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyVouchers.map((voucher) => (
            <TableRow key={voucher.id}>
              <TableCell>{voucher.id}</TableCell>
              <TableCell>{voucher.code}</TableCell>
              <TableCell>${voucher.value}</TableCell>
              <TableCell>{voucher.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Vouchers;
