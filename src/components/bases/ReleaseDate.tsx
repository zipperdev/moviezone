import React from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { darkColors } from "../../themes/colors";

interface Props {
    releaseDate: string | null;
}

const ReleaseDateText = styled.Text`
    font-size: 15px;
    font-weight: 600;
    color: ${darkColors.secondary};
`;

function ReleaseDate({ releaseDate }: Props): JSX.Element {
    const parsedReleaseDate = releaseDate
        ? new Date(releaseDate).toLocaleDateString("ko")
        : "알 수 없음";

    return (
        <ReleaseDateText>
            <Ionicons name="calendar-sharp" size={14} />
            {" " + parsedReleaseDate}
        </ReleaseDateText>
    );
}

export default ReleaseDate;
