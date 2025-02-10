import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  useDraggable,
  useDroppable,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

const DroppableArea: React.FC<{ id: string; droppedItems: string[] }> = ({
  id,
  droppedItems,
}) => {
  const { isOver, setNodeRef } = useDroppable({ id });
  //   return (
  //     <div
  //       className={`p-4 my-2 text-black bg-gray-200 rounded-lg ${
  //         isOver ? "bg-green-400" : "bg-gray-200"
  //       }`}
  //       ref={setNodeRef}
  //     >
  //       {isOver ? "Release to Drop" : "Drop Here"}
  //     </div>
  //   );

  return (
    // <div
    //   className={`p-4 my-2 text-black rounded-lg transition-colors ${
    //     isOver ? "bg-green-400" : "bg-gray-200"
    //   }`}
    //   ref={setNodeRef}
    //   style={{
    //     minHeight: "100px",
    //     minWidth: "150px",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //   }}
    // >
    //   {isOver ? "Release to Drop" : "Drop Here"}
    // </div>

    <div className="flex items-center space-x-4">
      <div
        className={`p-4 my-2 text-black rounded-lg transition-colors ${
          isOver ? "bg-green-400" : "bg-gray-200"
        }`}
        ref={setNodeRef}
        style={{
          minHeight: "100px",
          minWidth: "150px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isOver ? "Release to Drop" : "Drop Here"}
      </div>
      <div className="flex flex-col">
        {droppedItems.map((item) => (
          <div key={item} className="p-4 bg-blue-500 text-white rounded-lg">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

const DraggableItem: React.FC<{ id: string }> = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      className="p-4 mb-2 bg-blue-500 text-white rounded-lg cursor-grab"
      style={{
        transform: CSS.Transform.toString(transform), // Ensure movement applies
        touchAction: "none", // Fixes drag issues on mobile
      }}
    >
      {id}
    </div>
  );
};

const DragNDrop = () => {
  const [draggedItem, setDraggedItem] = useState<UniqueIdentifier | null>(null);
  const [droppedItems, setDroppedItems] = useState<{ [key: string]: string[] }>(
    {
      droppable1: [],
      droppable2: [],
    }
  );

  const handleDragStart = (event: DragStartEvent) => {
    setDraggedItem(event.active.id);
  };

  //   const handleDragEnd = (event: DragEndEvent) => {
  //     const { active, over } = event;

  //     if (active.id !== over?.id) {
  //       console.log(`Item ${active.id} dropped over ${over?.id}`);
  //     }

  //     setDraggedItem(null);
  //   };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      setDroppedItems((prev) => ({
        ...prev,
        [over.id]: [...(prev[over.id] || []), String(active.id)],
      }));
    }

    setDraggedItem(null);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex space-x-8 p-8">
        {/* Draggable Items */}
        <div>
          <DraggableItem id="Item 1" />
          <DraggableItem id="Item 2" />
          <DraggableItem id="Item 3" />
        </div>

        {/* Droppable Areas */}
        <div>
          <DroppableArea
            id="droppable1"
            droppedItems={droppedItems.droppable1}
          />
          <DroppableArea
            id="droppable2"
            // droppedItems={droppedItems.droppable1}
            droppedItems={droppedItems.droppable2}
          />
        </div>
      </div>
    </DndContext>
  );
};

export default DragNDrop;
