import { useDrag } from 'react-dnd';
import { BarChart, LineChart, PieChart } from 'lucide-react';

const DraggableItem = ({ type, icon: Icon }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CHART',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`flex items-center p-2 mb-2 bg-white rounded shadow cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <Icon className="mr-2" />
      {type} Chart
    </div>
  );
};

export const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-100 p-4">
      <h2 className="text-lg font-semibold mb-4">Chart Types</h2>
      <DraggableItem type="Bar" icon={BarChart} />
      <DraggableItem type="Line" icon={LineChart} />
      <DraggableItem type="Pie" icon={PieChart} />
    </div>
  );
};