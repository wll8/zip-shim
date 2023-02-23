一个使用 7za 二进制命令行实现的文件压缩工具, 参数尽量于 7za cli 保持相似.

由于 jszip 不提供加密功能, 所以有了此项目.


``` js
const {
  zipShim,
} = require(`./`)

// 压缩当前目录为 zip
zipShim({
  spf: false, // 不存储绝对地址
  file: [
    __dirname,
  ],
})

// 压缩当前目录为 7z 并加密文件名, 密码为 123, 存储绝对地址
zipShim({
  t: `7z`,
  p: `123`,
  mhe: true,
  file: [
    __dirname,
  ],
})
```

## 选项和默认值
``` js
config = {
  out = `${process.cwd()}/store`, // 输出文件名
  file = [], // 要压缩的文件列表
  v = `1g`, // 分卷大小, 传 false 为不使用分卷. 注: 7za 不支持分卷
  p = undefined, // 压缩密码
  mhe = false, // 是否加密文件名
  t = `zip`, // 文件格式
  spf = true, // 是否存储绝对地址, 如果要压缩的文件名有相同时, 需要指定, 否则会出错
  mx = 0, // 配置压缩等级, 0 为不压缩, 0-9
  ignore = [
    `node_modules*`,
    `httpData*`,
    `.history`,
    `*-cache`,
    `.cache`,
    `cache`,
  ], // 要排除的文件列表
  w, // 临时文件目录
  runOpt  = {}, // runShell.run 参数
}
```

## 相似项目

- [jszip](https://github.com/Stuk/jszip)
- [7z-wasm](https://github.com/use-strict/7z-wasm)