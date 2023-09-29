import React from "react";

import apiService from "@services/apis";

interface Product {
  id: string;
  name: string;
  avatar: string;
  price: number;
  des: string;
  categoryId: string;
  productPictures: {
    id: string;
    path: string;
  }[];
}

export default function useGetProductData() {
  const [data, setData] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    apiService.productApi
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
