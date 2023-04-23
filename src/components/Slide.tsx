import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import makeImgPath from "../functions/makeImgPath";
import Poster from "./bases/Poster";
import Votes from "./bases/Votes";

interface Props {
    title: string;
    overview: string;
    voteAverage: number;
    backdropPath: string | null;
    posterPath: string | null;
}

const Container = styled.View`
    flex: 1;
`;

const Wrapper = styled.View`
    height: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const WrapperContent = styled.View`
    width: 48%;
    margin-left: 20px;
`;

const Header = styled.View`
    width: 100%;
`;

const Title = styled.Text<{ screenWidth: number }>`
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 3px;
    color: ${(props) => props.theme.text};
`;

const Overview = styled.Text`
    margin-top: 9px;
    font-size: 14px;
    color: ${(props) => props.theme.text + "dd"};
`;

const BackgroundImg = styled.ImageBackground`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: ${(props) => props.theme.inactive};
`;

const BackgroundImageFilter = styled.View`
    flex: 1;
    background-color: ${(props) => props.theme.background + "88"};
`;

const SCREEN_WIDTH = Dimensions.get("window").width;

function Slide({
    title,
    overview,
    voteAverage,
    backdropPath,
    posterPath,
}: Props): JSX.Element {
    const source = backdropPath
        ? {
              uri: makeImgPath(backdropPath),
          }
        : require("../assets/blank.png");

    return (
        <Container>
            <BackgroundImg blurRadius={4} source={source}>
                <BackgroundImageFilter />
            </BackgroundImg>
            <Wrapper>
                <Poster path={posterPath} />
                <WrapperContent>
                    <Header>
                        <Title screenWidth={SCREEN_WIDTH}>{title}</Title>
                        <Votes isPale voteAverage={voteAverage} />
                    </Header>
                    <Overview numberOfLines={4}>{overview}</Overview>
                </WrapperContent>
            </Wrapper>
        </Container>
    );
}

export default Slide;
