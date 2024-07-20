import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { VisualizationArea } from '@/components/VisualizationArea';
import { Sidebar } from '@/components/Sidebar';

const Index = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-full">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">DataViz Pro</h1>
          <VisualizationArea />
        </main>
      </div>
    </DndProvider>
  );
};

export default Index;