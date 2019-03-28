import axios from '@/libs/api.request'

export const getEcsList = parameter => {
  return axios.request({
    url: `/assets/api/ecs?${parameter}`,
    method: 'get'
  })
}

export const createEcs = data => {
  return axios.request({
    url: '/assets/api/ecs',
    data: data,
    method: 'post'
  })
}

export const updateEcs = (id, data) => {
  return axios.request({
    url: `/assets/api/ecs/${id}`,
    data: data,
    method: 'PUT'
  })
}

export const deleteEcs = id => {
  return axios.request({
    url: `/assets/api/ecs/${id}`,
    method: 'delete'
  })
}
