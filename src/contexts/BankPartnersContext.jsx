import React, { createContext, useContext, useState } from 'react';

const BankPartnersContext = createContext();

export const useBankPartners = () => useContext(BankPartnersContext);

export const BankPartnersProvider = ({ children }) => {
  const [bankPartners] = useState([
    "Standard Chartered", "NatWest Group", "UniCredit", "Intesa Sanpaolo", "Banco Bilbao Vizcaya Argentaria (BBVA)",
    "CaixaBank", "Nordea", "SEB (Skandinaviska Enskilda Banken)", "Swedbank", "Danske Bank", "KBC Group",
    "ING Bank", "ABN AMRO", "Commonwealth Bank of Australia", "Westpac Banking Corporation", "ANZ Banking Group",
    "Macquarie Group", "Bank of New York Mellon", "State Street Corporation", "PNC Financial Services", "U.S. Bancorp",
    "Standard Bank", "Absa Bank", "First National Bank (FNB)", "Nedbank", "Capitec Bank", "Investec Bank",
    "African Bank", "TymeBank", "Bank Zero", "Discovery Bank", "Sasfin Bank", "Grindrod Bank", "Bidvest Bank",
    "GroBank", "Mercantile Bank", "Ubank"
  ]);

  return (
    <BankPartnersContext.Provider value={{ bankPartners }}>
      {children}
    </BankPartnersContext.Provider>
  );
};
