import { ActivityIndicator, useWindowDimensions } from "react-native";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import "../styles/scrollbar.css";
import Item from "./Item";

export type Movie = {
  id: number;
  poster_path: string;
};

type TV = {
  id: string;
  name: string;
  poster_path: string;
  backdrop_path: string;
  season_number: number;
  showId?: string;
  still_path?: string;
};

type WebMovieListProps = {
  data: Movie[] | TV[];
  loading?: boolean;
  fetchNextPage?: () => void;
  cols?: number;
};

export function WebMovieList({
  data,
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
    // Breakpoints for different screen sizes
    if (width >= 1400) return 6; // Extra large screens
    if (width >= 1200) return 5; // Large screens
    if (width >= 880) return 4; // Medium screens
    if (width >= 600) return 3; // Small screens
    return 2; // Extra small screens
  };

  const responsiveCols = getResponsiveColumns();

  if (data?.length === 0 || data === undefined) return null;

  return (
    <div
      className="movie-list-scroll"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${responsiveCols}, 1fr)`,
        gap: width >= 700 ? "16px" : "8px",
        width: "100%",
        minHeight: "100%",
        overflow: "scroll",
      }}
    >
      {data.map((item) => {
        const path =
          "title" in item ? `/details/${item.id}` : `/details/${item.id}/tv`;
        return (
          <Item
            key={item.id.toString()}
            path={path}
            poster={"still_path" in item ? item.still_path : item.poster_path}
          />
        );
      })}
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
