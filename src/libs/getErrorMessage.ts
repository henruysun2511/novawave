export function getErrorMessage(error: unknown, fallback: string) {
  const normalized = error as { response?: { data?: { message?: string } } };
  return normalized?.response?.data?.message || fallback;
}