import { useState } from 'react';
import customFetch from './customFetch';

export default function useCustomFetch() {
  const [topItemsLoading, setTopItemsLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [itemLoading, setItemLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [itemsUploading, setItemsUploading] = useState(false);

  function getTopItems() {
    setTopItemsLoading(true);

    return customFetch('top-sales', () => setTopItemsLoading(false));
  }

  getTopItems.loading = topItemsLoading;

  function getItems(searchParams) {
    const filter = searchParams ? `?${searchParams}` : '';

    setItemsLoading(true);

    return customFetch(`items${filter}`, () => setItemsLoading(false));
  }

  getItems.loading = itemsLoading;

  function getItem(id) {
    setItemLoading(true);

    return customFetch(`items/${id}`, () => setItemLoading(false));
  }

  getItem.loading = itemLoading;

  function getCategories() {
    setCategoriesLoading(true);

    return customFetch('categories', () => setCategoriesLoading(false));
  }

  getCategories.loading = categoriesLoading;

  function postItems(body) {
    setItemsUploading(true);

    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }

    return customFetch('order', () => setItemsUploading(false), opts);
  }

  postItems.uploading = itemsUploading;

  return { getTopItems, getItems, getItem, getCategories, postItems };
}
