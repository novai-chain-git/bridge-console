import request from '@/config/axios'

// 推广配置 API
export const ConfigApi = {

  // 查询推广配置详情
  getConfig: async () => {
    return await request.get({ url: `/promotion/config/get` })
  },

  // 修改推广配置
  updateConfig: async (data: any) => {
    return await request.put({ url: `/promotion/config/update`, data })
  }
}
