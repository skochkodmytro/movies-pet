import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useBoolean } from "@/hooks";

const FAVORITES_MOVIES_KEY = "FAVORITES_MOVIES_KEY";

interface FavoritesContextType {
  favoritesMoviesIds: number[];
  isLoading: boolean;
  addMovieToFavorite: (id: number) => void;
  removeMovieFromFavorite: (id: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const useFavoritesMoviesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "useFavoritesMoviesContext must be used within a FavoritesProvider"
    );
  }
  return context;
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoritesMoviesIds, setFavoritesMoviesIds] = useState<number[]>([]);
  const { value: isLoadingIds, setFalse: finishLoading } = useBoolean(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const moviesIds = await AsyncStorage.getItem(FAVORITES_MOVIES_KEY);
        if (moviesIds) {
          setFavoritesMoviesIds(JSON.parse(moviesIds));
        }
      } catch (error) {
        console.error("Failed to load favorites:", error);
      } finally {
        finishLoading();
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(
      FAVORITES_MOVIES_KEY,
      JSON.stringify(favoritesMoviesIds)
    );
  }, [favoritesMoviesIds]);

  const addMovieToFavorite = (id: number) => {
    setFavoritesMoviesIds((prevFavorites) => {
      if (prevFavorites.includes(id)) return prevFavorites;
      return [id, ...prevFavorites];
    });
  };

  const removeMovieFromFavorite = (id: number) => {
    setFavoritesMoviesIds((prevFavorites) =>
      prevFavorites.filter((movieId) => movieId !== id)
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoritesMoviesIds,
        isLoading: isLoadingIds,
        addMovieToFavorite,
        removeMovieFromFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
