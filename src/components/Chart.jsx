import { useState, useRef, useEffect } from 'react';
import { BarChart, LineChart, PieChart, Bar, Line, Pie } from 'recharts';
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
import { useDrag } from 'react-dnd';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const dummyData = [
  { name: 'A', value: 400 },
  { name: 'B', value: 300 },
  { name: 'C', value: 200 },
  { name: 'D', value: 100 },
];

export const Chart = ({ id, type, position, onMove, onResize }) => {
  const [chartData, setChartData] = useState(dummyData);
  const [chartTitle, setChartTitle] = useState(`${type} Chart`);
  const [size, setSize] = useState({ width: 300, height: 200 });
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CHART',
    item: { id, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [id, type]);

  useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [drag]);

  const renderChart = () => {
    const ChartComponent = type === 'Bar' ? BarChart : type === 'Line' ? LineChart : PieChart;
    const DataComponent = type === 'Bar' ? Bar : type === 'Line' ? Line : Pie;

    return (
      <ChartComponent width={size.width} height={size.height} data={chartData}>
        <DataComponent dataKey="value" fill="#8884d8" />
      </ChartComponent>
    );
  };

  const handleResize = (event, { size }) => {
    setSize({ width: size.width, height: size.height });
    onResize(id, size);
  };

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <ResizableBox
        width={size.width}
        height={size.height}
        onResize={handleResize}
        minConstraints={[100, 100]}
        maxConstraints={[500, 500]}
      >
        <div className="bg-white p-4 rounded-lg shadow-md">
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
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </ResizableBox>
    </div>
  );
};