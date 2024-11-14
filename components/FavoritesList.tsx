import { Star } from "lucide-react";

import { CryptoData } from "@/types/cryptoData";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface FavoritesListProps {
  favorites: string[];
  cryptoData: CryptoData[];

  onToggleFavorite: (id: string) => void;
}

const FavoritesList = ({
  favorites,
  cryptoData,
  onToggleFavorite,
}: FavoritesListProps) => {
  const favoriteCryptos = cryptoData.filter((crypto) =>
    favorites.includes(crypto.id)
  );

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Favorites</CardTitle>
      </CardHeader>
      <CardContent>
        {favoriteCryptos.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Price (USD)</TableHead>
                <TableHead className="text-right">24h Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {favoriteCryptos.map((crypto) => (
                <TableRow key={crypto.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <span className="mr-2">{crypto.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onToggleFavorite(crypto.id)}
                      >
                        <Star className="h-4 w-4 fill-yellow-400" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    ${parseFloat(crypto.priceUsd || "0").toFixed(2)}
                  </TableCell>
                  <TableCell
                    className={`text-right ${
                      parseFloat(crypto.changePercent24Hr || "0") >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {parseFloat(crypto.changePercent24Hr || "0").toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No favorites added yet.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default FavoritesList;
