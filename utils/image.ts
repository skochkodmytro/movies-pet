import { IMAGE_URL } from "@/constants/Config";

// size: w200, w300, etc
export const getImageUrl = (path: string, size: string = "original") => {
  return `${IMAGE_URL}${size}/${path}`;
};
