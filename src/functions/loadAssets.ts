import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Image } from "react-native";

type LoadFontsPromises = Promise<void>[];
type LoadImagesPromises = (Promise<boolean> | Promise<Asset[]>)[];

export const loadFonts = (fonts: { [key: string]: any }): LoadFontsPromises =>
    fonts.map((font: any) => Font.loadAsync(font));

export const loadImages = (images: any[]): LoadImagesPromises =>
    images.map((image) => {
        if (typeof image === "string") {
            return Image.prefetch(image);
        } else {
            return Asset.loadAsync(image);
        }
    });
