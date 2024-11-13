import { Star } from "lucide-react";

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

const FavoritesList = () => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Favorites</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Price (USD)</TableHead>
              <TableHead className="text-right">24h Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  <span className="mr-2">Crypto Name</span>
                  <Button variant="ghost" size="icon">
                    <Star className="h-4 w-4 fill-yellow-400" />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-right">price USD</TableCell>
              <TableCell className="text-right">% change</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FavoritesList;
