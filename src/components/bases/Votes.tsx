import React from "react";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled, { css } from "styled-components/native";
import { darkColors } from "../../themes/colors";

interface Props {
    isPale?: boolean;
    voteAverage: number;
}

const VotesContent = styled.View<{ isPale: boolean }>`
    border-radius: 4px;
    ${(props) =>
        props.isPale &&
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

function Votes({ isPale = false, voteAverage }: Props): JSX.Element {
    const votes =
        (voteAverage > 0 ? parseFloat(voteAverage.toFixed(1)) : "?") + "/10";

    return (
        <VotesContent isPale={isPale}>
            <VotesText isPale={isPale}>
                <Ionicons name="star-sharp" size={14} />
                <Text>{" " + votes}</Text>
            </VotesText>
        </VotesContent>
    );
}

export default Votes;
