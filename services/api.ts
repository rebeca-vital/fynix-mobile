import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export async function buscarPosts() {
  const response = await api.get('/posts');

  return response.data;
}