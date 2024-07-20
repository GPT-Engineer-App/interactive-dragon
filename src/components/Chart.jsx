import { useState } from 'react';
import { BarChart, LineChart, PieChart } from 'recharts';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const dummyData = [
  { name: 'A', value: 400 },
  { name: 'B', value: 300 },
  { name: 'C', value: 200 },
  { name: 'D', value: 100 },
];

export const Chart = ({ type, position }) => {
  const [chartData, setChartData] = useState(dummyData);
  const [chartTitle, setChartTitle] = useState(`${type} Chart`);

  const renderChart = () => {
    switch (type) {
      case 'Bar':
        return (
          <BarChart width={300} height={200} data={chartData}>
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        );
      case 'Line':
        return (
          <LineChart width={300} height={200} data={chartData}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        );
      case 'Pie':
        return (
          <PieChart width={300} height={200}>
            <Pie data={chartData} dataKey="value" nameKey="name" fill="#8884d8" />
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        background: 'white',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <h3 className="text-lg font-semibold mb-2">{chartTitle}</h3>
      {renderChart()}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-2">Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Chart</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={chartTitle}
                onChange={(e) => setChartTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            {/* Add more settings here */}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};