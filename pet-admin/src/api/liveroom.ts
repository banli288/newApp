import request from '../utils/request'

export function getLiveRoomList() {
  return request.get('/home/live-rooms')
}

export function createLiveRoom(data: any) {
  return request.post('/admin/live-rooms', data)
}

export function updateLiveRoom(id: string, data: any) {
  return request.patch(`/admin/live-rooms/${id}`, data)
}

export function removeLiveRoom(id: string) {
  return request.delete(`/admin/live-rooms/${id}`)
}
