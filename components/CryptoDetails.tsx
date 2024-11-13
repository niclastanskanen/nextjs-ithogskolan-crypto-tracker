"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import PriceChart from "./PriceChart";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  priceUsd: string;
  changePercent24Hr: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
}

interface CryptoDetailsProps {
  crypto: CryptoData | null;
  onClose: () => void;
}

const CryptoDetails = ({ crypto, onClose }: CryptoDetailsProps) => {
  const [historicalData, setHistoricalData] = useState<
    { date: string; price: number }[]
  >([]);

  useEffect(() => {
    if (crypto) {
      fetchHistoricalData(crypto.id);
    }
  }, [crypto]);

  const fetchHistoricalData = async (id: string) => {
    try {
      const end = Date.now();
      const start = end - 7 * 24 * 60 * 60 * 1000; // 7 days ago
      const response = await axios.get(
        `https://api.coincap.io/v2/assets/${id}/history`,
        {
          params: {
            interval: "h12",
            start,
            end,
          },
        }
      );
      const formattedData = response.data.data.map(
        (item: { time: number; priceUsd: string }) => ({
          date: new Date(item.time).toLocaleDateString(),
          price: parseFloat(item.priceUsd),
        })
      );
      setHistoricalData(formattedData);
    } catch (error) {
      console.error("Failed to fetch historical data:", error);
    }
  };

  if (!crypto) return null;

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{crypto.name} Details</span>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gid-cols-2 gap-4 mb-4">
          <div>
            <p className="font-semibold">Current Price:</p>
            <p>${parseFloat(crypto.priceUsd || "0").toFixed(2)}</p>
          </div>
          <div>
            <p className="font-semibold">24h Change:</p>
            <p
              className={
                parseFloat(crypto.changePercent24Hr || "0") >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {parseFloat(crypto.changePercent24Hr || "0").toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="font-semibold">Market Cap:</p>
            <p>
              $
              {parseFloat(crypto.marketCapUsd || "0").toLocaleString(
                undefined,
                { maximumFractionDigits: 0 }
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold">24h Volume:</p>
            <p>
              $
              {parseFloat(crypto.volumeUsd24Hr || "0").toLocaleString(
                undefined,
                { maximumFractionDigits: 0 }
              )}
            </p>
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2">7-Day Price Chart</h3>
        <PriceChart data={historicalData} />
      </CardContent>
    </Card>
  );
};

export default CryptoDetails;
