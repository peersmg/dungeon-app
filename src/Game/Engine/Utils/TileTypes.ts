export type MapTile = 0 | 1 | 2;
export const tileMapper = (tileType: MapTile) => {
  switch (tileType) {
    case 0:
      return "blue";
    case 1:
      return "white";
    case 2:
      return "red";
    default:
      return "grey";
  }
};
