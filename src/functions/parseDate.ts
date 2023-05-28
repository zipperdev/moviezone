const parseDate = (date: string | null) => {
    const parsedDate = date
        ? new Date(date).toLocaleDateString("ko")
        : "알 수 없음";
    return parsedDate;
};

export default parseDate;
