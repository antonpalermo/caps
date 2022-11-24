export default async function fetcher(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<{ data?: any | null; error?: { message: string } | null }> {
  const request = await fetch(input, init)
  const { data, error } = await request.json()

  if (!request.ok) {
    // if request is not okay then return error
    return { data: null, error }
  }
  // else return data.
  return { data, error: null }
}
