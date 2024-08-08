import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const bankPartners = [
  "Standard Chartered", "NatWest Group", "UniCredit", "Intesa Sanpaolo", "Banco Bilbao Vizcaya Argentaria (BBVA)",
  "CaixaBank", "Nordea", "SEB (Skandinaviska Enskilda Banken)", "Swedbank", "Danske Bank", "KBC Group",
  "ING Bank", "ABN AMRO", "Commonwealth Bank of Australia", "Westpac Banking Corporation", "ANZ Banking Group",
  "Macquarie Group", "Bank of New York Mellon", "State Street Corporation", "PNC Financial Services", "U.S. Bancorp",
  "Standard Bank", "Absa Bank", "First National Bank (FNB)", "Nedbank", "Capitec Bank", "Investec Bank",
  "African Bank", "TymeBank", "Bank Zero", "Discovery Bank", "Sasfin Bank", "Grindrod Bank", "Bidvest Bank",
  "GroBank", "Mercantile Bank", "Ubank"
];

const VoucherConversion = ({ voucher, onClose }) => {
  const [selectedBank, setSelectedBank] = useState('');

  const handleConversion = () => {
    // Implement conversion logic here
    console.log(`Converting voucher ${voucher.code} to ${selectedBank}`);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Convert Voucher</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-2">Voucher Code: {voucher.code}</p>
          <p className="mb-2">Current Value: ${voucher.value}</p>
          <p className="mb-4">Current Bank: {voucher.bank}</p>
          <Select onValueChange={setSelectedBank}>
            <SelectTrigger>
              <SelectValue placeholder="Select target bank" />
            </SelectTrigger>
            <SelectContent>
              {bankPartners.filter(bank => bank !== voucher.bank).map((bank) => (
                <SelectItem key={bank} value={bank}>{bank}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button onClick={handleConversion} disabled={!selectedBank}>Convert</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VoucherConversion;
