import request from '@/config/axios'

// 网络 API
export const NetworkApi = {
  // 查询网络分页
  getNetworkPage: async (params: any) => {
    return await request.get({ url: `/asset/network/page`, params })
  },

  getNetworkList: async () => {
    return await request.get({ url: `/asset/network/list-simple` })
  },

  // 查询网络详情
  getNetwork: async (id: number) => {
    return await request.get({ url: `/asset/network/get?id=` + id })
  },

  // 新增网络
  createNetwork: async (data: any) => {
    return await request.post({ url: `/asset/network/create`, data })
  },

  // 修改网络
  updateNetwork: async (data: any) => {
    return await request.put({ url: `/asset/network/update`, data })
  },

  // 删除网络
  deleteNetwork: async (id: number) => {
    return await request.delete({ url: `/asset/network/delete?id=` + id })
  },

  // 导出网络 Excel
  exportNetwork: async (params) => {
    return await request.download({ url: `/asset/network/export-excel`, params })
  }
}
