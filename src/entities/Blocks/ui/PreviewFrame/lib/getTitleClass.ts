export const getTitleClass = (
  count: number,
  originalCount?: number
): string => {
  if (count > 10) return "PreviewFrameListTitleSpicing";
  if (count === 0) return "indicatorNone";
  if (originalCount !== undefined && count !== originalCount)
    return "PreviewFrameListTitleLow";
  return "";
};
