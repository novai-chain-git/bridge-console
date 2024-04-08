import request from '@/config/axios'

// 推广用户 API
export const PromoterApi = {
  // 查询推广用户分页
  getPromoterPage: async (params: any) => {
    return await request.get({ url: `/promotion/promoter/page`, params })
  },

  getPromoterRecordPage: async (params: any) => {
    return await request.get({ url: `/promotion/promoter/page-record`, params })
  },

  // 查询推广用户详情
  getPromoter: async (id: number) => {
    return await request.get({ url: `/promotion/promoter/get?id=` + id })
  },

  // 导出推广用户 Excel
  exportPromoter: async (params) => {
    return await request.download({ url: `/promotion/promoter/export-excel`, params })
  }
}
