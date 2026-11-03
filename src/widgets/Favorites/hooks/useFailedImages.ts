import { useState } from "react";

export const useFailedImages = () => {
  const [failedIds, setFailedIds] = useState<ReadonlySet<string>>(new Set());

  const isFailed = (id: string) => failedIds.has(id);

  const markFailed = (id: string) => {
    setFailedIds(ids => new Set(ids).add(id));
  };

  return { isFailed, markFailed };
};
