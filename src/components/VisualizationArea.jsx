import { useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { Chart } from './Chart';

export const VisualizationArea = () => {
  const [charts, setCharts] = useState([]);

  const moveChart = useCallback((id, left, top) => {
    setCharts((prevCharts) =>
      prevCharts.map((chart) =>
        chart.id === id ? { ...chart, position: { x: left, y: top } } : chart
      )
    );
  }, []);

  const resizeChart = useCallback((id, size) => {
    setCharts((prevCharts) =>
      prevCharts.map((chart) =>
        chart.id === id ? { ...chart, size } : chart
      )
    );
  }, []);

  const [, drop] = useDrop(() => ({
    accept: 'CHART',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const containerRect = document.getElementById('visualization-area').getBoundingClientRect();
      const newChart = {
        id: Date.now(),
        type: item.type,
        position: { 
          x: offset.x - containerRect.left, 
          y: offset.y - containerRect.top 
        },
      };
      setCharts((prevCharts) => [...prevCharts, newChart]);
    },
  }));

  return (
    <div
      id="visualization-area"
      ref={drop}
      className="border-2 border-dashed border-gray-300 rounded-lg h-[600px] relative overflow-hidden"
    >
      {charts.map((chart) => (
        <Chart 
          key={chart.id} 
          {...chart} 
          onMove={moveChart}
          onResize={resizeChart}
        />
      ))}
      {charts.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          Drag and drop charts here
        </div>
      )}
    </div>
  );
};