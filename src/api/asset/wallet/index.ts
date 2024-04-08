import request from '@/config/axios'

// 钱包 API
export const WalletApi = {
  // 查询钱包分页
  getWalletPage: async (params: any) => {
    return await request.get({ url: `/asset/wallet/page`, params })
  },

  // 查询钱包详情
  getWallet: async (id: number) => {
    return await request.get({ url: `/asset/wallet/get?id=` + id })
  },

  // 导出钱包 Excel
  exportWallet: async (params) => {
    return await request.download({ url: `/asset/wallet/export-excel`, params })
  }
}
