import makeImgPath from "./makeImgPath";

const makePreservedSrc = (path: string | null, width?: string) => {
    const preservedSrc = path
        ? {
              uri: makeImgPath(path, width),
          }
        : require("../assets/blank.png");
    return preservedSrc;
};

export default makePreservedSrc;
