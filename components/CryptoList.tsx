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
}

const CryptoList = ({ cryptoData }: CryptoListProps) => {
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
          <CryptoItem key={crypto.id} crypto={crypto} />
        ))}
      </TableBody>
    </Table>
  );
};

export default CryptoList;
