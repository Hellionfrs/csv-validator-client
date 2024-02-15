import { baseUrl } from "../constants";

export const csvFiletoArray = (string) => {
  string = string.trim()
  const csvHeader = string.slice(0, string.indexOf("\n")).split(";").map(element => element.trim());
  const csvRows = string.slice(string.indexOf("\n") + 1).split("\n").map(element => element.trim());

  console.log("csvHeader: ", csvHeader);
  console.log("csvRows", csvRows);
  const array = csvRows.map((i) => {
    const values = i.split(";");
    const obj = csvHeader.reduce((object, header, index) => {
      object[header] = values[index];
      return object;
    }, {});
    return obj;
  });
  console.log("array", array);
  return array;
};

export async function sendForm(data) {
  const options = {
    method: "POST",
    body: JSON.stringify({ data: data }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(baseUrl + "/upload", options);
  if (response.ok) {
    const {data} = await response.json()
    return data
  } else {
    const body = await response.json()
    console.log(body)
    return body
  }
}
