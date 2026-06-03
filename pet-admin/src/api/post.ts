import request from '../utils/request'

export function getPostList(params?: { page?: number; limit?: number }) {
  return request.get('/home/posts', { params })
}

export function createPost(data: any) {
  return request.post('/admin/posts', data)
}

export function updatePost(id: string, data: any) {
  return request.patch(`/admin/posts/${id}`, data)
}

export function removePost(id: string) {
  return request.delete(`/admin/posts/${id}`)
}
