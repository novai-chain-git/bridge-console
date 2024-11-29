import request from '@/config/axios'

// 交易 API
export const TransactionApi = {
  // 查询交易分页
  getPage: async (params: any) => {
    return await request.get({ url: `/transaction/page`, params })
  },

  // 查询交易详情
  get: async (id?: number) => {
    return await request.get({ url: `/transaction/get?id=` + id })
  },

  // 审核成功
  auditSuccess: async (id?: number) => {
    return await request.put({ url: `/transaction/audit-success?id=` + id })
  },

  // 审核成功
  confirmTransfer: async (data: any) => {
    return await request.post({ url: `/transaction/confirm-transfer`, data })
  },

  // 统计
  count: async (data: any) => {
    return await request.post({ url: `/transaction/count`, data })
  },

  // 查询交易配置
  getConfig: async () => {
    return await request.get({ url: `/transaction/config` })
  },

  // 修改交易配置
  updateConfig: async (params: any) => {
    return await request.put({ url: `/transaction/update-config`, params })
  },
}
