import request from '@/config/axios'

// 会员用户 API
export const UserApi = {
  // 查询会员用户分页
  getUserPage: async (params: any) => {
    return await request.get({ url: `/member/user/page`, params })
  },

  // 查询会员用户详情
  getUser: async (id: number) => {
    return await request.get({ url: `/member/user/get?id=` + id })
  },

  // 修改会员用户
  updateUser: async (data: any) => {
    return await request.put({ url: `/member/user/update`, data })
  },

  // 导出会员用户 Excel
  exportUser: async (params) => {
    return await request.download({ url: `/member/user/export-excel`, params })
  }
}
