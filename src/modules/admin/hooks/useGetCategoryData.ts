import React from "react";

import apiService from "@services/apis";

interface Category {
  id: string;
  title: string;
  avatar: string;
}

export default function useGetCategoryData() {
  const [data, setData] = React.useState<Category[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    apiService.categoryApi
      .findMany()
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    data,
    isLoading,
    error,
  };
}
