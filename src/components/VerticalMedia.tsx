import React from "react";
import styled from "styled-components/native";
import ReleaseDate from "./bases/ReleaseDate";
import Poster from "./bases/Poster";
import Votes from "./bases/Votes";

interface Props {
    title: string;
    voteAverage?: number;
    releaseDate?: string;
    posterPath: string | null;
}

const Container = styled.View`
    width: 95px;
    align-items: center;
`;

const Title = styled.Text`
    font-size: 15px;
    font-weight: 600;
    margin-top: 7px;
    color: ${(props) => props.theme.text};
`;

function VerticalMedia({
    title,
    voteAverage,
    releaseDate,
    posterPath,
}: Props): JSX.Element {
    return (
        <Container>
            <Poster path={posterPath} />
            <Title numberOfLines={1}>{title}</Title>
            {voteAverage ? (
                <Votes voteAverage={voteAverage} />
            ) : releaseDate ? (
                <ReleaseDate releaseDate={releaseDate} />
            ) : null}
        </Container>
    );
}

export default VerticalMedia;
