import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PriceChartProps {
  data: { date: string; price: number }[];
}

const PriceChart = ({ data }: PriceChartProps) => {
  return (
    <ChartContainer
      config={{
        price: {
          label: "Price",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="price"
            stroke="var(--color-price)"
            dot={{ fill: "var(--color-price)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default PriceChart;
