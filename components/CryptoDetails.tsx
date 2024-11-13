"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import PriceChart from "./PriceChart";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
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
  isOpen: boolean;
}

const CryptoDetails = ({ crypto, onClose, isOpen }: CryptoDetailsProps) => {
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
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="space-x-6">
        <DrawerHeader className="sm:text-center">
          <DrawerTitle className="text-2xl font-bold">
            {crypto.name} Details
          </DrawerTitle>
          <DrawerDescription>
            Current market data and 7-day price chart
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-0 flex flex-col sm:flex-row h-full">
          <div className="sm:w-1/2 mb-4 sm:mb-0 sm:pr-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-semibold">Current Price:</p>
                <p className="text-lg">
                  ${parseFloat(crypto.priceUsd || "0").toFixed(2)}
                </p>
              </div>
              <div>
                <p className="font-semibold">24h Change:</p>
                <p
                  className={`text-lg ${
                    parseFloat(crypto.changePercent24Hr || "0") >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {parseFloat(crypto.changePercent24Hr || "0").toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="font-semibold">Market Cap:</p>
                <p className="text-lg">
                  $
                  {parseFloat(crypto.marketCapUsd || "0").toLocaleString(
                    undefined,
                    { maximumFractionDigits: 0 }
                  )}
                </p>
              </div>
              <div>
                <p className="font-semibold">24h Volume:</p>
                <p className="text-lg">
                  $
                  {parseFloat(crypto.volumeUsd24Hr || "0").toLocaleString(
                    undefined,
                    { maximumFractionDigits: 0 }
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="sm:w-1/2 h-[300px] sm:h-auto">
            <h3 className="text-xl font-semibold mb-2">7-Day Price Chart</h3>
            <div className="h-full">
              <PriceChart data={historicalData} />
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CryptoDetails;
