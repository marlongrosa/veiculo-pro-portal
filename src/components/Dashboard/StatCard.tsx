
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  className?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  description,
  className = ""
}: StatCardProps) => {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        {icon && <div className="text-gray-500">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
};

export default StatCard;
