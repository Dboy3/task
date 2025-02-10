import React, { memo } from "react";
import Move from "../Icons/Move";
import LeftArrow from "../Icons/LeftArrow";
import RightArrow from "../Icons/RightArrow";
import Trash from "../Icons/Trash";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ListType {
  item: {
    title: string;
    id: number;
  };
  handleChange(newTitle: string, id: number): void;
  handleDelete(id: number): void;
  lastIndentLevel: string;
}

const ListCard: React.FC<ListType> = memo(
  ({ item, handleChange, handleDelete, lastIndentLevel }) => {
    console.log(lastIndentLevel, " ", item.id);

    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: item.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const [lvl, setLvl] = useState(parseInt(lastIndentLevel) / 20 || 0);

    const handleLeft = () => {
      if (lvl < 0) return;
      setLvl((prev) => Math.max(0, prev - 1));
    };

    const handleRight = () => {
      if (lvl > 5) return;
      setLvl((prev) => Math.min(5, prev + 1));
    };

    const handelOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e.target.value, item.id);
    };

    const handleOnDelete = () => {
      handleDelete(item.id);
    };

    return (
      <>
        <li className="flex mt-2 " ref={setNodeRef} style={style}>
          <div className="w-2/12 flex-none min-w-[150px] flex gap-3 p-1">
            <button onClick={handleLeft} className="bg-gray-500 p-1">
              <LeftArrow />
            </button>
            <button onClick={handleRight} className="bg-gray-500 p-1">
              <RightArrow />
            </button>
            <button className="bg-gray-500 p-1" onClick={handleOnDelete}>
              <Trash />
            </button>
            <button className="bg-gray-500 p-1" {...attributes} {...listeners}>
              <Move />
            </button>
          </div>

          <div className="flex-1 flex items-center rounded-md">
            <input
              className="w-full bg-gray-700 p-1 rounded-md"
              value={item.title}
              style={{ marginLeft: `${lvl * 20}px` }}
              onChange={(e) => handelOnChange(e)}
            />
          </div>
        </li>
      </>
    );
  },
);

export default ListCard;


