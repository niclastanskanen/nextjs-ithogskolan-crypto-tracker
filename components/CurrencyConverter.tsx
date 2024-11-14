import React, { useState, useCallback, useMemo } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CurrencyConverterProps {
  cryptoName: string;
  cryptoPrice: number;
}

const CurrencyConverter = ({
  cryptoName,
  cryptoPrice,
}: CurrencyConverterProps) => {
  const [cryptoAmount, setCryptoAmount] = useState<string>("1");

  const handleCryptoAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCryptoAmount(e.target.value);
    },
    []
  );

  const usdAmount = useMemo(() => {
    const amount = parseFloat(cryptoAmount);
    return isNaN(amount) ? 0 : amount * cryptoPrice;
  }, [cryptoAmount, cryptoPrice]);

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Currency Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cryptoAmount">{cryptoName}</Label>
            <Input
              id="cryptoAmount"
              type="number"
              value={cryptoAmount}
              onChange={handleCryptoAmountChange}
              min="0"
              step="0.000001"
            />
          </div>
          <div>
            <Label htmlFor="usdAmount">USD</Label>
            <Input
              id="usdAmount"
              type="number"
              value={usdAmount.toFixed(2)}
              readOnly
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;
