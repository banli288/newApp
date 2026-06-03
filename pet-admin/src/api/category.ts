import request from '../utils/request'

export function getCategoryTree() {
  return request.get('/home/categories')
}

export function createCategory(data: any) {
  return request.post('/admin/categories', data)
}

export function updateCategory(id: string, data: any) {
  return request.patch(`/admin/categories/${id}`, data)
}

export function removeCategory(id: string) {
  return request.delete(`/admin/categories/${id}`)
}
