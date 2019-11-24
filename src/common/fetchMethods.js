const handleFetchErrors = error => {
  /**
   * This is not a good practice to handle errors,
   * console error is only used temporary
   */

  // eslint-disable-next-line no-console
  console.error(error.message);

  throw new Error(error.message);
};

export const postJsonData = async (url, data) => {
  try {
    const result = await fetch(url, {
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    return result.json();
  } catch (error) {
    return handleFetchErrors(error);
  }
};

export const putData = (url, data) => async userToken => {
  try {
    const result = await fetch(url, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'X-Token': userToken
      },
      method: 'PUT'
    });

    return result.json();
  } catch (error) {
    return handleFetchErrors(error);
  }
};

export const getData = url => async userToken => {
  try {
    const result = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-token': userToken
      },
      method: 'GET'
    });

    return result.json();
  } catch (error) {
    return handleFetchErrors(error);
  }
};
