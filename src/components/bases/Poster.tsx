import React from "react";
import styled from "styled-components/native";
import makeImgPath from "../../functions/makeImgPath";

interface Props {
    path: string | null;
}

const Container = styled.View`
    width: 95px;
    border-radius: 6px;
    aspect-ratio: 2/3;
    background-color: ${(props) => props.theme.secondary};
`;

const PosterImage = styled.Image`
    flex: 1;
    border-radius: 6px;
`;

function Poster({ path }: Props): JSX.Element {
    const source = path
        ? {
              uri: makeImgPath(path),
          }
        : require("../../assets/blank.png");

    return (
        <Container>
            <PosterImage resizeMode="cover" source={source} />
        </Container>
    );
}

export default Poster;
