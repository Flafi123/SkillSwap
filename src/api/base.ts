//база для основных fetch из json
const BASE = import.meta.env.BASE_URL;
export const request = async <T>(url: string): Promise<T> => {
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
  const result = await fetch(`${BASE}${cleanUrl}`);
  if (!result.ok) {
    throw new Error(`Ошибка: ${result.status}`)
  }
  return result.json()
}
