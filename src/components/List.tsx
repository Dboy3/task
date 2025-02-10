import { useState } from "react";
import ListCard from "./ListCard";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
  closestCenter,
} from "@dnd-kit/core";
// import { useMemo } from "react";

const List: React.FC = () => {
  const [arr, setArr] = useState([{ id: Date.now(), title: "list1" }]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleAdd = () => {
    const lastItemIndex = arr.length - 1;
    const lastIndentLevel = document.querySelectorAll("input").length
      ? parseInt(
          document.querySelectorAll("input")[lastItemIndex]?.style.marginLeft ||
            "0"
        ) / 20
      : 0;

    const newItem = { id: Date.now(), title: "enter input" };
    setArr((prevarr) => [...prevarr, newItem]);
    return lastIndentLevel;
  };

  const handleDelete = (id: number) => {
    setArr((prevarr) => prevarr.filter((item) => item.id !== id));
  };

  const handleChange = (newTitle: string, id: number) => {
    setArr((prevarr) => {
      const index = prevarr.findIndex((item) => item.id === id);
      if (index !== -1) {
        const newArr = [...prevarr];
        newArr[index].title = newTitle;
        return newArr;
      }
      return prevarr;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    // if (!over) return;
    if (!over || active.id === over.id) return;

    // const oldIndex = arr.findIndex((item) => item.id === active.id);
    // const newIndex = arr.findIndex((item) => item.id === over.id);

    // if (oldIndex !== newIndex) {
    //   setArr((items) => arrayMove(items, oldIndex, newIndex));
    // }

    setArr((prevArr) => {
      const oldIndex = prevArr.findIndex((item) => item.id === active.id);
      const newIndex = prevArr.findIndex((item) => item.id === over.id);
      return arrayMove(prevArr, oldIndex, newIndex);
    });
  };



  // const memoizedList = useMemo(() => {
  //   console.log("Update Memo");
  //   return arr;
  // }, [arr]);

  return (
    <>
      <div className="flex flex-w items-start my-1 gap-3">
        <div className="w-2/12 flex-none min-w-[150px]">
          <h1 className="text-2xl">Actions</h1>
          <p className="text-xs break-words">Move,indent,outdent,delete</p>
        </div>

        <div className="w-full">
          <h1 className="text-2xl">Standard</h1>
          <p className="text-xs break-words">The text of standard</p>
        </div>
      </div>

      <hr className="my-2" />

      {/* <ul>
        {arr.map((item, index) => (
          <ListCard
            key={item.id}
            item={item}
            handleChange={handleChange}
            handleDelete={handleDelete}
            lastIndentLevel={
              index > 0
                ? document.querySelectorAll("input")[index - 1]?.style
                    .marginLeft || "0"
                : "0"
            }
          />
        ))}
      </ul> */}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={arr}
          strategy={verticalListSortingStrategy}
        >
          <ul>
            {arr.map((item, index) => (
              <ListCard
                key={item.id}
                item={item}
                handleChange={handleChange}
                handleDelete={handleDelete}
                lastIndentLevel={
                  index > 0
                    ? document.querySelectorAll("input")[index - 1]?.style
                        .marginLeft || "0"
                    : "0"
                }
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      <button
        className="bg-blue-500 w-full mt-4 rounded-md cursor-pointer p-1"
        onClick={handleAdd}
      >
        Add Item
      </button>
    </>
  );
};

export default List;
