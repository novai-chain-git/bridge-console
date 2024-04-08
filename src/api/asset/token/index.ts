import request from '@/config/axios'

// 代币 API
export const TokenApi = {
  // 查询代币分页
  getTokenPage: async (params: any) => {
    return await request.get({ url: `/asset/token/page`, params })
  },

  getTokenList: async () => {
    return await request.get({ url: `/asset/token/list-simple` })
  },

  // 查询代币详情
  getToken: async (id: number) => {
    return await request.get({ url: `/asset/token/get?id=` + id })
  },

  // 新增代币
  createToken: async (data: any) => {
    return await request.post({ url: `/asset/token/create`, data })
  },

  // 修改代币
  updateToken: async (data: any) => {
    return await request.put({ url: `/asset/token/update`, data })
  },

  // 删除代币
  deleteToken: async (id: number) => {
    return await request.delete({ url: `/asset/token/delete?id=` + id })
  },

  // 导出代币 Excel
  exportToken: async (params) => {
    return await request.download({ url: `/asset/token/export-excel`, params })
  }
}
