import { MutableRefObject, useState, useEffect, useCallback } from "react";
import { useIsomorphicEffect } from "./useIsomorphicEffect";

const useIsOverflow = ({
  ref,
  selectedOptions,
}: {
  ref: MutableRefObject<HTMLDivElement | null>;
  selectedOptions: any[];
}) => {
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const isomorphicEffect = useIsomorphicEffect();

  const checkOverflow = useCallback(() => {
    const { current } = ref;
    if (current) {
      const hasOverflow = current.scrollWidth > current.clientWidth;
      setIsOverflow(hasOverflow);
    }
  }, [ref]);

  isomorphicEffect(() => {
    checkOverflow();
  }, [ref, checkOverflow]);

  useEffect(() => {
    checkOverflow();
  }, [selectedOptions, checkOverflow]);

  return isOverflow;
};

export default useIsOverflow;
