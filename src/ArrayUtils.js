export const isEmptyArray = (emptyArray) => {
  return (
    typeof emptyArray != "undefined" &&
    emptyArray != null &&
    emptyArray.length != null &&
    emptyArray.length > 0
  );
};
