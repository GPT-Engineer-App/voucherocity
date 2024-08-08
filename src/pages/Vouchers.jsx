import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useBankPartners } from '../contexts/BankPartnersContext';
import toast from 'react-hot-toast';

const fetchVouchers = async () => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, code: 'ABC123', value: 100, currency: 'USD', status: 'Active', bank: 'Standard Chartered' },
    { id: 2, code: 'DEF456', value: 200, currency: 'EUR', status: 'Active', bank: 'NatWest Group' },
    { id: 3, code: 'GHI789', value: 150, currency: 'GBP', status: 'Active', bank: 'UniCredit' },
  ];
};

const createVoucher = async (voucherData) => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { id: Date.now(), ...voucherData, status: 'Active' };
};

const Vouchers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newVoucher, setNewVoucher] = useState({ code: '', value: '', currency: 'USD', bank: '' });
  const [conversionVoucher, setConversionVoucher] = useState({ code: '', value: '', fromCurrency: 'USD', toCurrency: 'USD', fromBank: '', toBank: '' });

  const queryClient = useQueryClient();
  const { bankPartners } = useBankPartners();

  const { data: vouchers, isLoading, error } = useQuery({
    queryKey: ['vouchers'],
    queryFn: fetchVouchers,
  });

  const createVoucherMutation = useMutation({
    mutationFn: createVoucher,
    onSuccess: (data) => {
      queryClient.setQueryData(['vouchers'], (old) => [...old, data]);
      setIsCreateDialogOpen(false);
      setNewVoucher({ code: '', value: '', currency: 'USD', bank: '' });
    },
  });

  const convertVoucherMutation = useMutation({
    mutationFn: async (voucherData) => {
      // Simulated API call for voucher conversion
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { ...voucherData, status: 'Converted' };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['vouchers']);
      setConversionVoucher({ code: '', value: '', fromCurrency: 'USD', toCurrency: 'USD', fromBank: '', toBank: '' });
      toast.success('Voucher converted successfully');
    },
  });

  const filteredVouchers = vouchers?.filter(voucher =>
    voucher.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    voucher.bank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateVoucher = () => {
    createVoucherMutation.mutate(newVoucher);
  };

  const handleConvertVoucher = () => {
    convertVoucherMutation.mutate(conversionVoucher);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Vouchers</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>Create Voucher</Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Quick Voucher Conversion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Input 
              placeholder="Voucher Code" 
              value={conversionVoucher.code}
              onChange={(e) => setConversionVoucher({...conversionVoucher, code: e.target.value})}
            />
            <Input 
              type="number" 
              placeholder="Value" 
              value={conversionVoucher.value}
              onChange={(e) => setConversionVoucher({...conversionVoucher, value: e.target.value})}
            />
            <Select value={conversionVoucher.fromCurrency} onValueChange={(value) => setConversionVoucher({...conversionVoucher, fromCurrency: value})}>
              <SelectTrigger>
                <SelectValue placeholder="From Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>
            <Select value={conversionVoucher.toCurrency} onValueChange={(value) => setConversionVoucher({...conversionVoucher, toCurrency: value})}>
              <SelectTrigger>
                <SelectValue placeholder="To Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>
            <Select value={conversionVoucher.fromBank} onValueChange={(value) => setConversionVoucher({...conversionVoucher, fromBank: value})}>
              <SelectTrigger>
                <SelectValue placeholder="From Bank" />
              </SelectTrigger>
              <SelectContent>
                {bankPartners.map((bank) => (
                  <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={conversionVoucher.toBank} onValueChange={(value) => setConversionVoucher({...conversionVoucher, toBank: value})}>
              <SelectTrigger>
                <SelectValue placeholder="To Bank" />
              </SelectTrigger>
              <SelectContent>
                {bankPartners.map((bank) => (
                  <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="mt-4 w-full" onClick={handleConvertVoucher}>Convert Voucher</Button>
        </CardContent>
      </Card>

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
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Voucher</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="code" className="text-right">Code</label>
              <Input id="code" value={newVoucher.code} onChange={(e) => setNewVoucher({...newVoucher, code: e.target.value})} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="value" className="text-right">Value</label>
              <Input id="value" type="number" value={newVoucher.value} onChange={(e) => setNewVoucher({...newVoucher, value: e.target.value})} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="currency" className="text-right">Currency</label>
              <Select value={newVoucher.currency} onValueChange={(value) => setNewVoucher({...newVoucher, currency: value})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="bank" className="text-right">Bank</label>
              <Select value={newVoucher.bank} onValueChange={(value) => setNewVoucher({...newVoucher, bank: value})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  {bankPartners.map((bank) => (
                    <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleCreateVoucher}>Create Voucher</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Vouchers;
