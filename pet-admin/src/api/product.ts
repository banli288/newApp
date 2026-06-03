import request from '../utils/request'

export function getProductList(params?: { page?: number; limit?: number }) {
  return request.get('/home/products', { params })
}

export function createProduct(data: any) {
  return request.post('/admin/products', data)
}

export function updateProduct(id: string, data: any) {
  return request.patch(`/admin/products/${id}`, data)
}

export function removeProduct(id: string) {
  return request.delete(`/admin/products/${id}`)
}
