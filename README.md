# 明日方舟六星 强度投票箱前端

vite + vue3 + typescript

正在跟进主分支进度...

## 使用

安装依赖:

```bash
# pnpm
pnpm install

# npm
npm install
```

运行:

```bash
# pnpm
pnpm dev

# npm
npm run dev
```

## mocks

可以在 `vite.config.ts` 选择是否开启，更改 `enable` 的值

```ts
{
  plugins: [
    // ....

    viteMockServe({
      mockPath: './mocks',
      // enable: env.command === 'serve',
      enable: false,
    }),
  ]
}
```
