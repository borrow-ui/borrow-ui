import { media } from "~theme/breakpoints";

export const main = {
  display: "flex",
  flexDirection: "column",
  minHeight: "calc(100vh - 81px)",
};

export const wrapper = {
  py: 0,
  flex: 1,
  display: "grid",
  gridTemplateColumns: "250px minmax(0, 1fr)",
  minHeight: "calc(100vh - 81px)",
  [media.tablet]: {
    display: "block",
  },
};
