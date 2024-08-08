import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const dummyBankPartners = [
  { id: 1, name: 'Bank A', country: 'USA', status: 'Active' },
  { id: 2, name: 'Bank B', country: 'UK', status: 'Inactive' },
  { id: 3, name: 'Bank C', country: 'Canada', status: 'Active' },
];

const BankPartnersManagement = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bank Partners Management</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyBankPartners.map((partner) => (
            <TableRow key={partner.id}>
              <TableCell>{partner.id}</TableCell>
              <TableCell>{partner.name}</TableCell>
              <TableCell>{partner.country}</TableCell>
              <TableCell>{partner.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                <Button variant="destructive" size="sm">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BankPartnersManagement;
