import React from "react";
import styled from "styled-components/native";
import makeImgPath from "../../functions/makeImgPath";

interface Props {
    path: string | null;
}

const PosterImage = styled.Image`
    width: 95px;
    border-radius: 6px;
    aspect-ratio: 2/3;
    background-color: ${(props) => props.theme.secondary};
`;

function Poster({ path }: Props): JSX.Element {
    const source = path
        ? {
              uri: makeImgPath(path),
          }
        : require("../../assets/blank.png");

    return <PosterImage resizeMode="cover" source={source} />;
}

export default Poster;
