
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dashboardData } from "@/data/mockData";

type ChartType = "bar" | "pie";
type DataPeriod = "month" | "year";

const COLORS = ["#1E40AF", "#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE", "#DBEAFE"];

const SalesChart = () => {
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [dataPeriod, setDataPeriod] = useState<DataPeriod>("month");

  const data = dataPeriod === "month" 
    ? dashboardData.charts.salesByMonth
    : dashboardData.charts.salesByBrand;

  const renderChart = () => {
    if (chartType === "bar") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#E5E7EB" }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#E5E7EB" }}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip 
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
              contentStyle={{ borderRadius: "4px" }}
            />
            <Legend wrapperStyle={{ paddingTop: 10 }} />
            <Bar 
              dataKey="value" 
              name="Vendas" 
              fill="#1E40AF" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Análise de Vendas</CardTitle>
        <div className="flex gap-2">
          <Select
            value={dataPeriod}
            onValueChange={(value: DataPeriod) => setDataPeriod(value)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Por Mês</SelectItem>
              <SelectItem value="year">Por Marca</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={chartType}
            onValueChange={(value: ChartType) => setChartType(value)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bar">Barras</SelectItem>
              <SelectItem value="pie">Pizza</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>{renderChart()}</CardContent>
    </Card>
  );
};

export default SalesChart;
