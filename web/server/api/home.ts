import { useApi } from "@/composables/useApi";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const limit = query.limit ? parseInt(query.limit as string) : 4;
  const { get } = useApi();

  try {
    const res = await get(`/home/data?limit=${limit}`);
    return res;
  } catch (error) {
    return error;
  }
})