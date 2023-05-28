import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
    Dimensions,
    FlatList,
    ImageBackground,
    Linking,
    Platform,
    Share,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import styled, { useTheme } from "styled-components/native";
import { StackScreenProps } from "../navigation/types";
import makePreservedSrc from "../functions/makePreservedSrc";
import Poster from "../components/bases/Poster";
import Loading from "../components/Loading";
import fetchers from "../api/fetchers";
import parseVotes from "../functions/parseVotes";
import parseDate from "../functions/parseDate";
import Votes from "../components/bases/Votes";
import useDarkMode from "../hooks/useDarkMode";

type Props = StackScreenProps<"Detail">;
interface Info {
    name: string;
    value: string | number;
}

const SCREEN_HEIGHT = Dimensions.get("window").height;

const ScrollContainer = styled.ScrollView`
    background-color: ${(props) => props.theme.background};
`;

const Header = styled.View`
    padding: 0 20px;
    height: ${SCREEN_HEIGHT / 3.5}px;
    justify-content: flex-end;
`;

const HeaderRow = styled.View`
    width: 70%;
    flex-direction: row;
`;

const HeaderColumn = styled.View`
    margin-left: 15px;
    align-items: flex-end;
    justify-content: flex-end;
`;

const Title = styled.Text`
    margin-bottom: 3px;
    font-size: 23px;
    font-weight: 600;
    color: ${(props) => props.theme.text};
`;

const Content = styled.View`
    padding: 0 20px;
`;

const InfoContainer = styled.View`
    flex-direction: row;
    margin-top: 20px;
`;

const InfoColumn = styled.View``;

const Info = styled.View`
    margin-bottom: 10px;
`;

const InfoName = styled.Text`
    font-size: 14px;
    font-weight: 600;
    color: ${(props) => props.theme.primary};
`;

const InfoValue = styled.Text`
    font-size: 15px;
    color: ${(props) => props.theme.text};
`;

const Overview = styled.Text`
    margin: 15px 0 30px 0;
    font-size: 15px;
    color: ${(props) => props.theme.text};
`;

const ContentTitle = styled.Text`
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 600;
    color: ${(props) => props.theme.text};
`;

const VideoButton = styled.TouchableOpacity`
    flex-direction: row;
`;

const VideoButtonText = styled.Text`
    margin-left: 8px;
    margin-bottom: 10px;
    font-weight: 600;
    line-height: 18px;
    width: 94%;
    color: ${(props) => props.theme.primary};
`;

const NotifyText = styled.Text`
    margin: 0 auto 10px auto;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color: ${(props) => props.theme.accent};
    opacity: 0.9;
`;

function Detail({ navigation, route: { params } }: Props): JSX.Element {
    const isTvShow = "name" in params;
    const theme = useTheme();
    const isDarkMode = useDarkMode();
    const [infos, setInfos] = useState<Info[]>([]);
    const detailResult = useQuery(
        [isTvShow ? "tvShows" : "movies", params.id],
        fetchers[isTvShow ? "tvShows" : "movies"].detail
    );

    const title = isTvShow ? params.name : params.title;
    const source = makePreservedSrc(params.backdrop_path, "original");

    const openYoutubeLink = async (videoId: string) => {
        const baseUrl = `https://m.youtube.com/watch?v=${videoId}`;
        await Linking.openURL(baseUrl);
    };
    const shareMedia = async () => {
        const isAndroid = Platform.OS === "android";
        const sharingLink = isTvShow
            ? detailResult.data?.homepage
            : `https://www.imdb.com/title/${detailResult.data?.imdb_id}`;
        await Share.share(
            isAndroid
                ? {
                      message: sharingLink,
                      title,
                  }
                : {
                      message: title,
                      url: sharingLink,
                  }
        );
    };
    const ShareButton = () => (
        <TouchableOpacity activeOpacity={0.6} onPress={shareMedia}>
            <Feather
                name="share"
                color={theme.isDarkMode ? theme.primary : theme.text}
                size={20}
            />
        </TouchableOpacity>
    );

    useEffect(() => {
        navigation.setOptions({
            title: isTvShow ? "TV 쇼" : "영화",
        });
    }, []);
    useEffect(() => {
        if (detailResult.data) {
            navigation.setOptions({
                headerRight: () => <ShareButton />,
            });

            const krCurrency = new Intl.NumberFormat("ko-KR", {
                style: "currency",
                currency: "KRW",
            });
            const isNotReleased =
                new Date(detailResult.data.release_date).getTime() >
                new Date().getTime();
            setInfos([
                {
                    name:
                        "release_date" in detailResult.data
                            ? isNotReleased
                                ? "개봉 예정일"
                                : "최초 개봉일"
                            : "최초 방영일",
                    value: parseDate(
                        detailResult.data[
                            isTvShow ? "first_air_date" : "release_date"
                        ]
                    ),
                },
                {
                    name: isTvShow ? "마지막 러닝타임" : "러닝타임",
                    value:
                        (isTvShow
                            ? detailResult.data.last_episode_to_air.runtime
                            : detailResult.data.runtime) + "분",
                },
                {
                    name: "제작사",
                    value:
                        detailResult.data.production_companies.length > 0
                            ? detailResult.data.production_companies
                                  .map(
                                      (company: any) =>
                                          company.name.slice(0, 20) +
                                          (company.name.length > 20
                                              ? "..."
                                              : "")
                                  )
                                  .join("\n")
                            : "알 수 없음",
                },
                ...(!isTvShow
                    ? [
                          {
                              name: "총 예산",
                              value: krCurrency.format(
                                  detailResult.data.budget
                              ),
                          },
                          {
                              name: "총 수익",
                              value: isNotReleased
                                  ? "개봉 예정"
                                  : detailResult.data.revenue === 0
                                  ? "알 수 없음"
                                  : krCurrency.format(
                                        detailResult.data.revenue
                                    ),
                          },
                      ]
                    : [
                          {
                              name: "시즌",
                              value: detailResult.data.number_of_seasons,
                          },
                          {
                              name: "마지막 방영 날짜",
                              value: parseDate(detailResult.data.last_air_date),
                          },
                          {
                              name: "총 에피소드",
                              value:
                                  detailResult.data.number_of_episodes + "편",
                          },
                      ]),
            ]);
        }
    }, [detailResult.data]);

    return (
        <ScrollContainer
            contentContainerStyle={{ paddingBottom: 10 }}
            showsVerticalScrollIndicator={false}
        >
            <Header>
                <ImageBackground
                    source={source}
                    style={StyleSheet.absoluteFill}
                />
                <LinearGradient
                    colors={["transparent", theme.background]}
                    style={StyleSheet.absoluteFill}
                />
                <HeaderRow>
                    <Poster path={params.poster_path} />
                    <HeaderColumn>
                        <Title>{title}</Title>
                        <Votes
                            voteAverage={params.vote_average}
                            isPale={!isDarkMode}
                        />
                    </HeaderColumn>
                </HeaderRow>
            </Header>
            <Content>
                <InfoContainer>
                    <InfoColumn style={{ marginRight: 14 }}>
                        {infos
                            .filter((_, index) => index % 2 === 0)
                            .map((info) => (
                                <Info key={info.name}>
                                    <InfoName>{info.name}</InfoName>
                                    <InfoValue>{info.value}</InfoValue>
                                </Info>
                            ))}
                    </InfoColumn>
                    <InfoColumn>
                        {infos
                            .filter((_, index) => index % 2 === 1)
                            .map((info) => (
                                <Info key={info.name}>
                                    <InfoName>{info.name}</InfoName>
                                    <InfoValue>{info.value}</InfoValue>
                                </Info>
                            ))}
                    </InfoColumn>
                </InfoContainer>

                {params.overview ? (
                    <Overview>{params.overview}</Overview>
                ) : (
                    <Overview
                        style={{ fontWeight: "600", color: theme.accent }}
                    >
                        설명이 없어요.
                    </Overview>
                )}
                {detailResult.isLoading ? (
                    <Loading containerStyle={{ marginTop: 40 }} />
                ) : null}
                <ContentTitle>영상 자료</ContentTitle>
                {detailResult.data?.videos?.results?.length > 0 ? (
                    detailResult.data?.videos?.results?.map((video: any) => (
                        <VideoButton
                            key={video.key}
                            activeOpacity={0.6}
                            onPress={async () =>
                                await openYoutubeLink(video.key)
                            }
                        >
                            <Ionicons
                                name="logo-youtube"
                                color={theme.primary}
                                size={18}
                            />
                            <VideoButtonText>{video.name}</VideoButtonText>
                        </VideoButton>
                    ))
                ) : (
                    <NotifyText>영상 자료가 없어요.</NotifyText>
                )}
            </Content>
        </ScrollContainer>
    );
}

export default Detail;
