import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setCount } from "@/entities/Blocks/model/blockSlice";

export const useHandleCountChange = () => {
  const dispatch = useDispatch();

  return useCallback(
    (id: string, newCount: number) => {
      if (newCount < 0) return;
      dispatch(setCount({ id, count: newCount }));
    },
    [dispatch]
  );
};
