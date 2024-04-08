import request from '@/config/axios'

// 交易 API
export const TransactionApi = {
  // 查询交易分页
  getTransactionPage: async (params: any) => {
    return await request.get({ url: `/asset/transaction/page`, params })
  },

  // 查询交易详情
  getTransaction: async (id: number) => {
    return await request.get({ url: `/asset/transaction/get?id=` + id })
  },

  // 导出交易 Excel
  exportTransaction: async (params) => {
    return await request.download({ url: `/asset/transaction/export-excel`, params })
  }
}
