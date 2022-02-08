module.exports = {
  title: 'TypeScript4 文档',
  description: 'TypeScript4 最新官方文档翻译',
  theme: 'reco',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  base: '/learn-typescript/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },

      {
        text: 'JavaScript博客',
        items: [
          { text: 'Github', link: 'https://github.com/codehzy' },
          { text: '掘金', link: 'https://juejin.cn/user/1714893872178823' }
        ]
      }
    ],
    sidebar: [
      {
        title: '欢迎学习',
        path: '/',
        collapsable: false, //折叠
        children: [{ title: '学前必读', path: '/' }]
      },
      {
        title: '基础学习',
        path: '/handbook/ConditionalTypes',
        collapsable: false, //折叠
        children: [
          { title: '条件类型', path: '/handbook/ConditionalTypes' },
          { title: '泛型', path: '/handbook/Generics' }
        ]
      },
      {
        title: '用好TS',
        path: '/handbook/betterForTs',
        collapsable: false, //折叠
        children: [
          { title: '怎样在项目中用好TS', path: '/handbook/betterForTs' },
        ]
      }
    ],
    subSidebar: 'auto', //在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容,
    codeTheme: 'tomorrow'
  }
}
