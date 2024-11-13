import CryptoItem from "./CryptoItem";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CryptoData } from "@/types/cryptoData";

interface CryptoListProps {
  cryptoData: CryptoData[];
  onSelect: (id: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const CryptoList = ({
  cryptoData,
  onSelect,
  favorites,
  onToggleFavorite,
}: CryptoListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Symbol</TableHead>
          <TableHead className="text-right">Price (USD)</TableHead>
          <TableHead className="text-right">24h Change</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cryptoData.map((crypto) => (
          <CryptoItem
            key={crypto.id}
            crypto={crypto}
            onSelect={onSelect}
            isFavorite={favorites.includes(crypto.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default CryptoList;
