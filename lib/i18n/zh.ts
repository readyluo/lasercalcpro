/**
 * Chinese translations for admin panel (backend management)
 * lasercalcpro.com/admin - Backend Language
 */

export const zh = {
  // 登录
  login: {
    title: '管理员登录',
    subtitle: 'LaserCalc Pro 管理后台',
    username: '用户名',
    password: '密码',
    remember: '记住登录状态',
    submit: '登录',
    loggingIn: '登录中...',
    forgotPassword: '忘记密码？',
    error: '用户名或密码错误',
  },

  // 侧边栏导航
  sidebar: {
    dashboard: '仪表板',
    content: '内容管理',
    articles: '文章管理',
    analytics: '数据分析',
    subscribers: '订阅管理',
    calculations: '计算记录',
    seo: 'SEO监控',
    settings: '系统设置',
    logout: '退出登录',
  },

  // 仪表板
  dashboard: {
    title: '数据概览',
    welcome: '欢迎回来',
    lastUpdated: '最后更新',
    refresh: '刷新数据',

    // 指标卡片
    metrics: {
      todayVisits: '今日访问',
      totalUsers: '总用户数',
      calculations: '计算次数',
      subscribers: '订阅用户',
      revenue: 'AdSense收入',
      conversionRate: '转化率',
      bounceRate: '跳出率',
      avgDuration: '平均停留',
    },

    // 图表
    charts: {
      trafficTrend: '流量趋势（最近30天）',
      popularTools: '热门工具排行',
      userSources: '用户来源分布',
      revenueChart: '收入趋势图',
      deviceBreakdown: '设备分布',
    },

    // 最近活动
    recentActivity: {
      title: '最近活动',
      calculation: '计算',
      subscription: '订阅',
      articleView: '文章浏览',
      noActivity: '暂无活动',
    },
  },

  // 内容管理
  content: {
    title: '内容管理',
    articles: '文章列表',
    addNew: '新建文章',
    edit: '编辑',
    delete: '删除',
    publish: '发布',
    unpublish: '取消发布',
    draft: '保存草稿',
    preview: '预览',

    // 筛选器
    filters: {
      all: '全部',
      published: '已发布',
      draft: '草稿',
      archived: '已归档',
      search: '搜索文章...',
    },

    // 字段
    fields: {
      title: '文章标题',
      slug: 'URL路径',
      category: '分类',
      tags: '标签',
      author: '作者',
      status: '状态',
      publishDate: '发布日期',
      views: '浏览量',
      lastModified: '最后修改',
    },

    // 分类
    categories: {
      tutorials: '教程指南',
      industry: '行业知识',
      caseStudies: '案例分析',
      news: '行业新闻',
    },

    // 编辑器
    editor: {
      title: '文章编辑器',
      basicInfo: '基本信息',
      content: '正文内容',
      seo: 'SEO优化',
      metadata: '元数据',
      preview: '预览',
      save: '保存',
      cancel: '取消',
      titlePlaceholder: '输入文章标题（英文）',
      slugPlaceholder: 'url-friendly-slug',
      excerptPlaceholder: '简短的文章摘要（150-200字符）',
      contentPlaceholder: '开始撰写文章内容...',
      metaTitlePlaceholder: 'SEO标题（建议50-60字符）',
      metaDescPlaceholder: 'SEO描述（建议150-160字符）',
      tagsPlaceholder: '用逗号分隔标签',
    },

    // 操作提示
    actions: {
      saveSuccess: '保存成功',
      saveError: '保存失败',
      publishSuccess: '发布成功',
      publishError: '发布失败',
      deleteConfirm: '确定要删除这篇文章吗？此操作不可恢复。',
      deleteSuccess: '删除成功',
      deleteError: '删除失败',
    },
  },

  // 数据分析
  analytics: {
    title: '数据分析',
    overview: '概览',
    traffic: '流量分析',
    tools: '工具使用统计',
    seo: 'SEO数据',
    revenue: '收入统计',
    export: '导出报表',
    compare: '对比分析',

    // 日期范围
    dateRange: {
      title: '时间范围',
      today: '今天',
      yesterday: '昨天',
      last7days: '最近7天',
      last30days: '最近30天',
      thisMonth: '本月',
      lastMonth: '上月',
      custom: '自定义',
      from: '从',
      to: '到',
      apply: '应用',
    },

    // 流量指标
    traffic: {
      pageViews: '页面浏览量',
      uniqueVisitors: '独立访客',
      newVisitors: '新访客',
      returningVisitors: '回访客户',
      avgSessionDuration: '平均会话时长',
      pagesPerSession: '会话页面数',
    },

    // 工具使用
    toolUsage: {
      totalCalculations: '总计算次数',
      completionRate: '完成率',
      pdfDownloads: 'PDF下载次数',
      topTools: '热门工具',
      usageByTime: '使用时间分布',
    },
  },

  // 订阅管理
  subscribers: {
    title: '订阅用户管理',
    total: '总订阅数',
    confirmed: '已确认',
    unconfirmed: '未确认',
    export: '导出列表',
    search: '搜索邮箱',
    import: '导入订阅者',

    // 表格字段
    fields: {
      email: '邮箱地址',
      source: '订阅来源',
      sourceTool: '来源工具',
      date: '订阅日期',
      status: '状态',
      confirmed: '已确认',
      pending: '待确认',
      actions: '操作',
    },

    // 操作
    actions: {
      view: '查看详情',
      sendEmail: '发送邮件',
      confirmSubscription: '确认订阅',
      unsubscribe: '取消订阅',
      delete: '删除',
      deleteConfirm: '确定要删除此订阅者吗？',
    },

    // 批量操作
    bulk: {
      selectAll: '全选',
      deselectAll: '取消全选',
      exportSelected: '导出选中',
      deleteSelected: '删除选中',
      sendEmailTo: '发送邮件给选中用户',
    },
  },

  // 计算记录
  calculations: {
    title: '计算记录',
    total: '总计算次数',
    today: '今日计算',
    export: '导出记录',

    // 筛选
    filters: {
      tool: '工具类型',
      dateRange: '日期范围',
      country: '国家/地区',
      all: '全部',
    },

    // 表格字段
    fields: {
      id: '记录ID',
      tool: '使用工具',
      params: '输入参数',
      result: '计算结果',
      userIp: '用户IP',
      location: '位置',
      time: '时间',
      actions: '操作',
    },

    // 工具类型
    tools: {
      laserCutting: '激光切割',
      cncMachining: 'CNC加工',
      roi: 'ROI计算',
      energy: '能源成本',
      materialUtilization: '材料利用率',
    },
  },

  // SEO监控
  seo: {
    title: 'SEO监控',
    keywords: '关键词排名',
    backlinks: '外链监控',
    indexStatus: '索引状态',
    performance: '性能指标',
    addKeyword: '添加关键词',
    checkRankings: '检查排名',

    // 关键词表格
    keywordFields: {
      keyword: '关键词',
      position: '排名',
      change: '变化',
      volume: '搜索量',
      difficulty: '难度',
      url: '目标页面',
      lastChecked: '最后检查',
    },

    // 索引状态
    indexing: {
      totalPages: '总页面数',
      indexed: '已索引',
      notIndexed: '未索引',
      errors: '错误',
      submitSitemap: '提交Sitemap',
    },
  },

  // 系统设置
  settings: {
    title: '系统设置',
    save: '保存设置',
    saved: '设置已保存',
    saveError: '保存失败，请重试',

    // 标签页
    tabs: {
      general: '基本设置',
      seo: 'SEO设置',
      adsense: 'AdSense配置',
      email: '邮件设置',
      backup: '数据备份',
      advanced: '高级设置',
    },

    // 基本设置
    general: {
      siteName: '网站名称',
      siteUrl: '网站URL',
      adminEmail: '管理员邮箱',
      timezone: '时区',
      language: '默认语言',
      maintenanceMode: '维护模式',
      maintenanceMessage: '维护提示信息',
    },

    // SEO设置
    seoSettings: {
      defaultTitle: '默认标题',
      defaultDescription: '默认描述',
      keywords: '全局关键词',
      googleAnalytics: 'Google Analytics ID',
      searchConsole: 'Search Console验证',
    },

    // AdSense设置
    adsense: {
      clientId: 'AdSense客户端ID',
      enabled: '启用广告',
      adSlots: '广告位配置',
      headerAd: '页头广告',
      sidebarAd: '侧边栏广告',
      contentAd: '内容广告',
      footerAd: '页脚广告',
    },

    // 邮件设置
    email: {
      smtpHost: 'SMTP主机',
      smtpPort: 'SMTP端口',
      smtpUser: 'SMTP用户名',
      smtpPassword: 'SMTP密码',
      fromEmail: '发件人邮箱',
      fromName: '发件人名称',
      testEmail: '发送测试邮件',
    },

    // 数据备份
    backup: {
      lastBackup: '最后备份时间',
      createBackup: '创建备份',
      downloadBackup: '下载备份',
      autoBackup: '自动备份',
      backupFrequency: '备份频率',
    },
  },

  // 通用
  common: {
    actions: '操作',
    view: '查看',
    edit: '编辑',
    delete: '删除',
    confirm: '确认',
    cancel: '取消',
    save: '保存',
    close: '关闭',
    back: '返回',
    next: '下一步',
    previous: '上一步',
    loading: '加载中...',
    noData: '暂无数据',
    search: '搜索',
    filter: '筛选',
    export: '导出',
    import: '导入',
    refresh: '刷新',
    success: '操作成功',
    error: '操作失败',
    warning: '警告',
    info: '提示',
    confirmDelete: '确定要删除吗？此操作不可恢复。',
    selectFile: '选择文件',
    uploadFile: '上传文件',
    downloadFile: '下载文件',
    copyToClipboard: '复制到剪贴板',
    copied: '已复制',
  },
} as const;

export type ChineseTexts = typeof zh;

