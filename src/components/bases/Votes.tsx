import React from "react";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled, { css } from "styled-components/native";
import { darkColors } from "../../themes/colors";
import parseVotes from "../../functions/parseVotes";

interface Props {
    isPale?: boolean;
    isCenter?: boolean;
    voteAverage: number;
}

const VotesContent = styled.View<{ isPale: boolean; isCenter: boolean }>`
    border-radius: 4px;
    ${(props) =>
        !props.isCenter &&
        css`
            align-self: flex-start;
        `}
    ${(props) =>
        !props.theme.isDarkMode &&
        props.isPale &&
        css`
            padding: 1px 6px 1px 5px;
            background-color: ${(props) => props.theme.primary + "aa"};
        `}
`;

const VotesText = styled.Text<{ isPale: boolean }>`
    font-size: 14px;
    color: ${(props) =>
        props.isPale ? props.theme.secondary : darkColors.secondary};
`;

function Votes({
    isPale = false,
    isCenter = false,
    voteAverage,
}: Props): JSX.Element {
    const votes = parseVotes(voteAverage);

    return (
        <VotesContent isPale={isPale} isCenter={isCenter}>
            <VotesText isPale={isPale}>
                <Ionicons name="star-sharp" size={14} />
                <Text>{" " + votes}</Text>
            </VotesText>
        </VotesContent>
    );
}

export default Votes;
