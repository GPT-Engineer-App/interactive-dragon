import { useState, useRef, useEffect } from 'react';
import { BarChart, LineChart, PieChart, Bar, Line, Pie } from 'recharts';
import { useDrag } from 'react-dnd';
import { Resizable } from 're-resizable';
import 'react-resizable/css/styles.css';

const dummyData = [
  { name: 'A', value: 400 },
  { name: 'B', value: 300 },
  { name: 'C', value: 200 },
  { name: 'D', value: 100 },
];

export const Chart = ({ id, type, position, onMove, onResize }) => {
  const [chartData] = useState(dummyData);
  const [chartTitle] = useState(`${type} Chart`);
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
      <ChartComponent width={size.width - 20} height={size.height - 40} data={chartData}>
        <DataComponent dataKey="value" fill="#8884d8" />
      </ChartComponent>
    );
  };

  const handleResize = (e, direction, ref, d) => {
    const newSize = {
      width: size.width + d.width,
      height: size.height + d.height,
    };
    setSize(newSize);
    onResize(id, newSize);
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
      <Resizable
        size={size}
        onResizeStop={handleResize}
        minWidth={100}
        minHeight={100}
        maxWidth={500}
        maxHeight={500}
        enable={{
          top: true,
          right: true,
          bottom: true,
          left: true,
          topRight: true,
          bottomRight: true,
          bottomLeft: true,
          topLeft: true,
        }}
      >
        <div className="bg-white p-4 rounded-lg shadow-md h-full">
          <h3 className="text-lg font-semibold mb-2">{chartTitle}</h3>
          {renderChart()}
        </div>
      </Resizable>
    </div>
  );
};