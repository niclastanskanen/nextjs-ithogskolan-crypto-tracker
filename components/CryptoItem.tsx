import { Star } from "lucide-react";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CryptoData } from "@/types/cryptoData";

interface CryptoItemProps {
  crypto: CryptoData;
  onSelect: (id: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const CryptoItem = ({
  crypto: { id, name, symbol, priceUsd, changePercent24Hr },
  onSelect,
  isFavorite,
  onToggleFavorite,
}: CryptoItemProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center">
          <span className="mr-2">{name}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleFavorite(id)}
          >
            <Star
              className={`h-4 w-4 ${isFavorite ? "fill-yellow-400" : ""}`}
            />
          </Button>
        </div>
      </TableCell>
      <TableCell>{symbol.toUpperCase()}</TableCell>
      <TableCell className="text-right">
        ${parseFloat(priceUsd || "0").toFixed(2)}
      </TableCell>
      <TableCell
        className={`text-right ${
          parseFloat(changePercent24Hr || "0") >= 0
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {parseFloat(changePercent24Hr || "0").toFixed(2)}%
      </TableCell>
      <TableCell className="text-right">
        <Button variant="link" onClick={() => onSelect(id)}>
          Details
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CryptoItem;
