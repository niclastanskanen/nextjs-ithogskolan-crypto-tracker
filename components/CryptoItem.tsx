import { Star } from "lucide-react";

import { Table, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const CryptoItem = () => {
  return (
    <Table>
      <TableCell className="font-medium">
        <div className="flex items-center">
          <span className="mr-2">Crypto Name</span>
          <Button size="icon" variant="ghost">
            <Star className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
      <TableCell>Symbol</TableCell>
      <TableCell className="text-right">Price</TableCell>
      <TableCell className="text-right">% change</TableCell>
      <TableCell className="text-right">
        <Button variant="link">Details</Button>
      </TableCell>
    </Table>
  );
};

export default CryptoItem;
