import request from '../utils/request'

export function getCarouselList() {
  return request.get('/home/carousels')
}

export function createCarousel(data: any) {
  return request.post('/admin/carousels', data)
}

export function updateCarousel(id: string, data: any) {
  return request.patch(`/admin/carousels/${id}`, data)
}

export function removeCarousel(id: string) {
  return request.delete(`/admin/carousels/${id}`)
}
