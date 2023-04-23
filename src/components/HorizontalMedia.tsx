import React from "react";
import styled from "styled-components/native";
import ReleaseDate from "./bases/ReleaseDate";
import Poster from "./bases/Poster";
import Votes from "./bases/Votes";

interface Props {
    title: string;
    overview: string;
    voteAverage?: number;
    releaseDate?: string;
    posterPath: string | null;
}

const Container = styled.View`
    padding: 0 20px;
    flex-direction: row;
`;

const ContentColumn = styled.View`
    width: 80%;
    margin-left: 15px;
`;

const Title = styled.Text`
    width: 80%;
    font-size: 16px;
    font-weight: 600;
    margin-top: 7px;
    margin-bottom: -2px;
    color: ${(props) => props.theme.text};
`;

const Overview = styled.Text`
    width: 80%;
    font-size: 14px;
    margin-top: 7px;
    color: ${(props) => props.theme.text + "dd"};
`;

function HorizontalMedia({
    title,
    overview,
    voteAverage,
    releaseDate,
    posterPath,
}: Props): JSX.Element {
    return (
        <Container>
            <Poster path={posterPath} />
            <ContentColumn>
                <Title numberOfLines={1}>{title}</Title>
                {voteAverage ? (
                    <Votes voteAverage={voteAverage} />
                ) : releaseDate ? (
                    <ReleaseDate releaseDate={releaseDate} />
                ) : null}
                <Overview numberOfLines={4}>{overview}</Overview>
            </ContentColumn>
        </Container>
    );
}

export default HorizontalMedia;
