const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
}

export const post = async (url: string, body: any) => {
  const response = await fetch(url, {
    headers,
    method: "POST",
    body: JSON.stringify(body),
  })
  return response.json()
}

export const get = async (url: string) => {
  const response = await fetch(url, {
    headers,
  })
  return response.json()
}
