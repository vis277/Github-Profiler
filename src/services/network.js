export const getRequest = async (url) => {
  try {
    const result = await fetch(url);
    const parsedResponse = await result.json();
    return parsedResponse;
  } catch (err) {
    return null;
  }
};
