import { ActivityIndicator, useWindowDimensions } from "react-native";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import MovieItem from "./MovieItem";
import "../styles/scrollbar.css";

export type Movie = {
  id: number;
  poster_path: string;
};

type WebMovieListProps = {
  movies: Movie[];
  loading?: boolean;
  fetchNextPage?: () => void;
  cols?: number;
};

export function WebMovieList({
  movies,
  loading,
  fetchNextPage,
  cols,
}: WebMovieListProps) {
  const { width } = useWindowDimensions();
  const sentinelRef = useInfiniteScroll({
    onLoadMore: fetchNextPage || (() => {}),
    loading: loading || false,
    enabled: !!fetchNextPage,
  });

  // Calculate responsive columns
  const getResponsiveColumns = () => {
    if (cols) return cols;
    console.log(width);
    // Breakpoints for different screen sizes
    if (width >= 1400) return 6; // Extra large screens
    if (width >= 1200) return 5; // Large screens
    if (width >= 992) return 4; // Medium screens
    if (width >= 768) return 3; // Small screens
    if (width >= 576) return 2; // Extra small screens
    return 1; // Mobile screens
  };

  const responsiveCols = getResponsiveColumns();

  if (movies?.length === 0 || movies === undefined) return null;

  return (
    <div
      className="movie-list-scroll"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${responsiveCols}, 1fr)`,
        gap: "16px",
        padding: "16px",
        width: "100%",
        minHeight: "100%",
        overflow: "scroll",
      }}
    >
      {movies.map((item) => (
        <MovieItem
          key={item.id.toString()}
          itemID={item.id}
          itemImage={item.poster_path}
        />
      ))}
      <div
        ref={sentinelRef}
        style={{
          gridColumn: "1 / -1",
          height: "20px",
          width: "100%",
        }}
      />
      {loading && (
        <div
          style={{
            gridColumn: "1 / -1",
            padding: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#AA4A44" />
        </div>
      )}
    </div>
  );
}
