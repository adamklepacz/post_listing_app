export const saveToLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

export const readLocalStorage = key => JSON.parse(localStorage.getItem(key));

export const removeLocalStorageItem = key => localStorage.removeItem(key);

/**
 * This methods search for url params like '?order=asc' and creates or updates them
 * @param {urlString: String}
 * @param {params: Array} array of objects eg. [{param: 'order', value: 'asc'}]
 * @returns {updatedUrl: String} url with updated params
 */
export const updateUrlParams = urlString => params => {
  const url = new URL(urlString);
  const queryString = url.search;
  const searchParams = new URLSearchParams(queryString);

  // update param value
  params.forEach(el => {
    searchParams.set(el.param, el.value);
  });
  url.search = searchParams.toString();

  return url.toString();
};
