import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { Chart } from './Chart';

export const VisualizationArea = () => {
  const [charts, setCharts] = useState([]);

  const [, drop] = useDrop(() => ({
    accept: 'CHART',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const newChart = {
        id: Date.now(),
        type: item.type,
        position: { x: offset.x, y: offset.y },
      };
      setCharts((prevCharts) => [...prevCharts, newChart]);
    },
  }));

  return (
    <div
      ref={drop}
      className="border-2 border-dashed border-gray-300 rounded-lg h-[600px] relative"
    >
      {charts.map((chart) => (
        <Chart key={chart.id} {...chart} />
      ))}
      {charts.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          Drag and drop charts here
        </div>
      )}
    </div>
  );
};