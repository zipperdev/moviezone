const parseVotes = (voteAverage: number) => {
    const votes =
        (voteAverage > 0 ? parseFloat(voteAverage.toFixed(1)) : "?") + "/10";
    return votes;
};

export default parseVotes;
