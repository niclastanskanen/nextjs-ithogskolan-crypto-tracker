import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CryptoDetails = () => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>crypto name details</span>
          <Button variant="outline" size="sm">
            Close
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gid-cols-2 gap-4 mb-4">
          <div>
            <p className="font-semibold">Current Price :</p>
            <p>Price USD</p>
          </div>
          <div>
            <p className="font-semibold">24 h change : </p>
            <p>change 24 %</p>
          </div>
          <div>
            <p className="font-semibold">Market Cap:</p>
            <p>$</p>
          </div>
          <div>
            <p className="font-semibold">24h Volume:</p>
            <p>$</p>
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2">7-Day Price Chart</h3>
        {/* TODO: pricechart here */}
        PriceChart
      </CardContent>
    </Card>
  );
};

export default CryptoDetails;
