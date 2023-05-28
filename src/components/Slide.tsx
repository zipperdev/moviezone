import React from "react";
import { Dimensions, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import makePreservedSrc from "../functions/makePreservedSrc";
import { Movie } from "../api/types";
import Poster from "./bases/Poster";
import Votes from "./bases/Votes";

interface Props {
    data: Movie;
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

function Slide({ data }: Props): JSX.Element {
    const navigation = useNavigation();
    const source = makePreservedSrc(data.backdrop_path);

    const navigateToDetail = () =>
        navigation.navigate("Stack", {
            screen: "Detail",
            params: {
                ...data,
            },
        });

    return (
        <TouchableWithoutFeedback onPress={navigateToDetail}>
            <Container>
                <BackgroundImg blurRadius={5} source={source}>
                    <BackgroundImageFilter />
                </BackgroundImg>
                <Wrapper>
                    <Poster path={data.poster_path} />
                    <WrapperContent>
                        <Header>
                            <Title screenWidth={SCREEN_WIDTH}>
                                {data.title}
                            </Title>
                            <Votes isPale voteAverage={data.vote_average} />
                        </Header>
                        <Overview numberOfLines={4}>{data.overview}</Overview>
                    </WrapperContent>
                </Wrapper>
            </Container>
        </TouchableWithoutFeedback>
    );
}

export default Slide;
