export const formatVoteAverage = (voteAverage: number): string => {
  return voteAverage % 1 === 0
    ? voteAverage.toFixed(0)
    : voteAverage.toFixed(1);
};
