const makeImgPath = (imageUrl: string, width: string = "w500") =>
    `https://image.tmdb.org/t/p/${width + imageUrl}`;

export default makeImgPath;
