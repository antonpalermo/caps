export default async function fetcher(
  input: RequestInfo | URL,
  init?: RequestInit
) {
  const request = await fetch(input, init)
  const data = await request.json()

  if (!request.ok) {
    // if request is not okay then return error
    return { errors: { data } }
  }
  // else return data.
  return data
}
