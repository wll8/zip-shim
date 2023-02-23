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