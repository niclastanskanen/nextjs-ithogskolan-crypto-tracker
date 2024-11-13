"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import axios from "axios";

import CryptoDetails from "./CryptoDetails";
import CryptoList from "./CryptoList";
import FavoritesList from "./FavoritesList";
import Header from "./Header";
import SearchBar from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner";
import ErrorBoundary from "./ErrorBoundary";

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

const CryptoPriceTracker = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [filteredData, setFilteredData] = useState<CryptoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

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
        setFilteredData(response.data.data);
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

  const handleSearch = useCallback(
    (query: string) => {
      const filtered = cryptoData.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(query.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    },
    [cryptoData]
  );

  const handleSelect = useCallback(
    (id: string) => {
      const selected = cryptoData.find((crypto) => crypto.id === id);
      setSelectedCrypto(selected || null);
    },
    [cryptoData]
  );

  const handleToggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Header />
      <div className="flex justify-between items-center my-4">
        <SearchBar onSearch={handleSearch} />
        <Button onClick={fetchCryptoData} disabled={isLoading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
      <ErrorBoundary error={error} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <CryptoList
            cryptoData={filteredData}
            onSelect={handleSelect}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
          {selectedCrypto && (
            <CryptoDetails
              crypto={selectedCrypto}
              onClose={() => setSelectedCrypto(null)}
            />
          )}
          <FavoritesList
            favorites={favorites}
            cryptoData={cryptoData}
            onSelect={handleSelect}
            onToggleFavorite={handleToggleFavorite}
          />
        </>
      )}
    </div>
  );
};

export default CryptoPriceTracker;
