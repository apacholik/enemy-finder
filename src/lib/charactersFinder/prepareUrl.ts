const BASE_URL = "https://tibia.bieda.it/api/tibia-eocf/v1/";

function prepareUrl(partialPath: string) {
  const url = new URL(partialPath, BASE_URL);

  return url.toString();
}

export default prepareUrl;
