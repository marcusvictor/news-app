import http from "./httpService";

const apiEndpointSuffix = "/api/news";

export async function getNews() {
  const { data } = await http.get(`${apiEndpointSuffix}/`);
  return data;
}

export async function getNewsById(id) {
  return await http.get(`${apiEndpointSuffix}/${id}`);
}

export async function deleteNews(id) {
  return await http.delete(`${apiEndpointSuffix}/${id}`);
}

export async function saveNews(news) {
  if (news._id) {
    const body = { ...news };
    return await http.put(`${apiEndpointSuffix}/${news._id}`, body);
  }

  return await http.post(`${apiEndpointSuffix}/`, news);
}
