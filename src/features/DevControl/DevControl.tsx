import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/shared/hooks";
import {
  selectBlocks,
  setText,
  setCount,
  setOriginalCount,
} from "@entities/Blocks/model/blockSlice";

export const DevControls = () => {
  const dispatch = useDispatch();
  const blocks = useAppSelector(selectBlocks);
  const [countInput, setCountInput] = useState("");

  const handleTextChangeAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newText = e.target.value;
      blocks.forEach((block) => {
        dispatch(setText({ id: block.id, text: newText }));
      });
    },
    [blocks, dispatch]
  );

  const handleCountChangeAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      if (value === "") {
        setCountInput("");
        blocks.forEach((block) => {
          dispatch(setCount({ id: block.id, count: 0 }));
          dispatch(setOriginalCount({ id: block.id, originalCount: 0 }));
        });
        return;
      }
      if (value.startsWith("+")) {
        let num = Number(value.slice(1));
        if (isNaN(num)) return;
        if (num > 9999) num = 9999;
        setCountInput(value);
        blocks.forEach((block) =>
          dispatch(setCount({ id: block.id, count: num }))
        );
      } else {
        let num = Number(value);
        if (isNaN(num)) return;
        if (num > 9999) num = 9999;
        setCountInput(String(num));
        blocks.forEach((block) => {
          dispatch(setCount({ id: block.id, count: num }));
          dispatch(setOriginalCount({ id: block.id, originalCount: num }));
        });
      }
    },
    [blocks, dispatch]
  );

  return (
    <div
      style={{ display: "flex", gap: "16px", marginBottom: 20, width: "500px" }}
    >
      <div style={{ flex: 1 }}>
        <input
          type="text"
          onChange={handleTextChangeAll}
          placeholder="Новый текст для всех блоков"
          style={{
            padding: "8px",
            width: "100%",
            borderColor: "#00c3ddff",
            borderRadius: "1rem",
          }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <input
          type="text"
          value={countInput}
          onChange={handleCountChangeAll}
          placeholder="Новое значение count"
          style={{
            padding: "8px",
            marginLeft: "1rem",
            width: "100%",
            borderColor: "#00c3ddff",
            borderRadius: "1rem",
          }}
        />
      </div>
    </div>
  );
};
