/**
 * Created by AlphaHome
 *
 * 枚举类
 */

// ========== COMMON 模块 ==========
// 全局通用状态枚举
export const CommonStatusEnum = {
  ENABLE: 0, // 开启
  DISABLE: 1 // 禁用
}

export const YesNoEnum = {
  NO: 0, // 否
  YES: 1 // 是
}

// 全局用户类型枚举
export const UserTypeEnum = {
  MEMBER: 1, // 会员
  ADMIN: 2 // 管理员
}

// ========== SYSTEM 模块 ==========
/**
 * 菜单的类型枚举
 */
export const SystemMenuTypeEnum = {
  DIR: 1, // 目录
  MENU: 2, // 菜单
  BUTTON: 3 // 按钮
}

/**
 * 角色的类型枚举
 */
export const SystemRoleTypeEnum = {
  SYSTEM: 1, // 内置角色
  CUSTOM: 2 // 自定义角色
}

/**
 * 数据权限的范围枚举
 */
export const SystemDataScopeEnum = {
  ALL: 1, // 全部数据权限
  DEPT_CUSTOM: 2, // 指定部门数据权限
  DEPT_ONLY: 3, // 部门数据权限
  DEPT_AND_CHILD: 4, // 部门及以下数据权限
  DEPT_SELF: 5 // 仅本人数据权限
}

/**
 * 用户的社交平台的类型枚举
 */
export const SystemUserSocialTypeEnum = {
  DINGTALK: {
    title: '钉钉',
    type: 20,
    source: 'dingtalk',
    img: 'https://s1.ax1x.com/2022/05/22/OzMDRs.png'
  },
  WECHAT_ENTERPRISE: {
    title: '企业微信',
    type: 30,
    source: 'wechat_enterprise',
    img: 'https://s1.ax1x.com/2022/05/22/OzMrzn.png'
  }
}

// ========== INFRA 模块 ==========
/**
 * 代码生成模板类型
 */
export const InfraCodegenTemplateTypeEnum = {
  CRUD: 1, // 基础 CRUD
  TREE: 2, // 树形 CRUD
  SUB: 3 // 主子表 CRUD
}

/**
 * 任务状态的枚举
 */
export const InfraJobStatusEnum = {
  INIT: 0, // 初始化中
  NORMAL: 1, // 运行中
  STOP: 2 // 暂停运行
}

/**
 * API 异常数据的处理状态
 */
export const InfraApiErrorLogProcessStatusEnum = {
  INIT: 0, // 未处理
  DONE: 1, // 已处理
  IGNORE: 2 // 已忽略
}

// ========== PAY 模块 ==========
export const WithdrawStatus = {
  AUDITING: 0,
  AUDIT_SUCCESS: 1,
  TRANSFER: 2,
  WITHDRAW_SUCCESS: 3,
  AUDIT_FAIL: 4,
  WITHDRAW_FAIL: 5
}

export const WithdrawType = {
  TOKEN: 0,
  CURRENCY: 1
}

export const ListingStatus = {
  WAITING: 0,
  AUDITING: 1,
  HIDE: 2,
  SIGN: 3,
  END: 4
}

export const ListingAuditStatus = {
  WAITING: 0,
  PASS: 1,
  FAIL: 2
}

export const RentalType = {
  WHOLE: 1,
  SHARED: 2
}

export const HouseStatus = {
  WAITING_AUDIT: 0,
  AUDIT_YES: 1
}

export const HouseRoomStatus = {
  WAITING: 0,
  RENTAL_NO: 1,
  RENTAL_YES: 3,
  HIDE: 9
}

export const HouseContractStatus = {
  NO_PAY: 0,
  RENTING: 1,
  APPLY_OUT: 2,
  REFUNDING: 3,
  FINISH: 4,
  RE_RENT_WAITING: -1
}

export const HouseRepairStatus = {
  UNRESOLVED: 0,
  PROCESSING: 1,
  FIXED: 2
}
