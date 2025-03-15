import { useState } from "react";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

export const useQueryClientProvider = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 0,
          },
        },
        queryCache: new QueryCache(),
        mutationCache: new MutationCache(),
      })
  );

  return queryClient;
};
