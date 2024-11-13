"use client";

import { useCallback, useEffect, useState } from "react";

import CryptoDetails from "./CryptoDetails";
import CryptoList from "./CryptoList";
import FavoritesList from "./FavoritesList";
import Header from "./Header";
import SearchBar from "./SearchBar";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  priceUsd: string;
  changePercent24Hr: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
}

const CryptoPriceTracker = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCryptoData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://api.coincap.io/v2/assets", {
        params: {
          limit: 50,
        },
      });
      if (response.data && Array.isArray(response.data.data)) {
        setCryptoData(response.data.data);
        console.log(response.data.data);
      } else {
        throw new Error("Invalid data received from the API");
      }
    } catch (error) {
      setError("Failed to fetch crypto data. Please try again later.");
      console.error("Error fetching crypto data:", error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchCryptoData();
  }, [fetchCryptoData]);

  return (
    <div className="container mx-auto p-4">
      <Header />
      <SearchBar />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <CryptoList cryptoData={cryptoData} />
          <CryptoDetails />
          <FavoritesList />
        </>
      )}
    </div>
  );
};

export default CryptoPriceTracker;
