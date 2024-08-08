import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useMutation, useQuery } from '@tanstack/react-query';
import { Alert, AlertDescription } from "@/components/ui/alert";

const fetchBankPartners = async () => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    "Standard Chartered", "NatWest Group", "UniCredit", "Intesa Sanpaolo", "Banco Bilbao Vizcaya Argentaria (BBVA)",
    "CaixaBank", "Nordea", "SEB (Skandinaviska Enskilda Banken)", "Swedbank", "Danske Bank", "KBC Group",
    "ING Bank", "ABN AMRO", "Commonwealth Bank of Australia", "Westpac Banking Corporation", "ANZ Banking Group",
    "Macquarie Group", "Bank of New York Mellon", "State Street Corporation", "PNC Financial Services", "U.S. Bancorp",
    "Standard Bank", "Absa Bank", "First National Bank (FNB)", "Nedbank", "Capitec Bank", "Investec Bank",
    "African Bank", "TymeBank", "Bank Zero", "Discovery Bank", "Sasfin Bank", "Grindrod Bank", "Bidvest Bank",
    "GroBank", "Mercantile Bank", "Ubank"
  ];
};

const fetchConversionRate = async (fromCurrency, toCurrency) => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return Math.random() * (1.5 - 0.5) + 0.5; // Random rate between 0.5 and 1.5
};

const convertVoucher = async ({ voucherCode, targetBank }) => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (Math.random() < 0.1) { // 10% chance of error
    throw new Error("Conversion failed. Please try again.");
  }
  return { success: true, message: "Voucher converted successfully" };
};

const VoucherConversion = ({ voucher, onClose }) => {
  const [selectedBank, setSelectedBank] = useState('');
  const [conversionRate, setConversionRate] = useState(null);

  const { data: bankPartners, isLoading: isLoadingBanks } = useQuery({
    queryKey: ['bankPartners'],
    queryFn: fetchBankPartners,
  });

  const { data: rate, isLoading: isLoadingRate } = useQuery({
    queryKey: ['conversionRate', voucher.currency, 'USD'],
    queryFn: () => fetchConversionRate(voucher.currency, 'USD'),
    enabled: !!selectedBank,
  });

  useEffect(() => {
    if (rate) {
      setConversionRate(rate);
    }
  }, [rate]);

  const mutation = useMutation({
    mutationFn: convertVoucher,
    onSuccess: (data) => {
      console.log(data.message);
      onClose();
    },
    onError: (error) => {
      console.error("Error converting voucher:", error);
    },
  });

  const handleConversion = () => {
    mutation.mutate({ voucherCode: voucher.code, targetBank: selectedBank });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Convert Voucher</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-2">Voucher Code: {voucher.code}</p>
          <p className="mb-2">Current Value: {voucher.value} {voucher.currency}</p>
          <p className="mb-4">Current Bank: {voucher.bank}</p>
          <Select onValueChange={setSelectedBank}>
            <SelectTrigger>
              <SelectValue placeholder="Select target bank" />
            </SelectTrigger>
            <SelectContent>
              {!isLoadingBanks && bankPartners.filter(bank => bank !== voucher.bank).map((bank) => (
                <SelectItem key={bank} value={bank}>{bank}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {conversionRate && (
            <Alert className="mt-4">
              <AlertDescription>
                Conversion Rate: 1 {voucher.currency} = {conversionRate.toFixed(4)} USD
              </AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button 
            onClick={handleConversion} 
            disabled={!selectedBank || isLoadingRate || mutation.isLoading}
          >
            {mutation.isLoading ? "Converting..." : "Convert"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VoucherConversion;
