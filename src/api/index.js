export const FetchAPI = async (method, url, data = null) => {
  const header = {
    "Content-Type": "application/json",
  };

  let res = [];
  if (method == "get" || method == "delete") {
    res = await fetch(process.env.REACT_APP_API_KEY + url, {
      method: method,
      headers: header,
    });
  } else {
    res = await fetch(process.env.REACT_APP_API_KEY + url, {
      method: method,
      crossDomain: true,
      headers: header,
      body: JSON.stringify(data),
    });
  }
  const json = await res.json();
  if (json.errors) {
    /* console.error(json.errors);
    throw new Error("Failed to fetch API"); */
    return json;
  }

  return { data: json, status: res.status };
};
