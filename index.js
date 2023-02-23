#!/usr/bin/env node

const shelljs = require(`shelljs`)
const zipBin = require(`7zip-bin`)
const runShell = require(`run-shell-text`)

/**
 * 压缩文件
 * @param {*} param0 
 */
function zipShim({
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
} = {}) {
  const fs = require(`fs`)
  const path = require(`path`)
  ;(fs.existsSync(`${out}.${t}`) || fs.existsSync(`${out}.${t}.001`)) && shelljs.rm(`${out}.${t}*`) // 删除已存在的文件
  w = w || path.parse(out).dir
  const arr = [
    `"${zipBin.path7za}"`,
    `a`,
    `"${out}"`,
    ...file.map(item => `"${item}"`),
    v ? `-v${v}` : undefined,
    mhe ? `-mhe` : undefined,
    p ? `-p${p}` : undefined, // -mhe 可以加密文件名, 但 .zip 格式不支持
    spf ? `-spf` : undefined,
    `-t${t}`,
    `-mx${mx}`,
    ...ignore.map(item => `-xr!"${item}"`),
    `-w"${w}"`,
  ]
  const cmd = arr.filter(Boolean).join(` `)
  runShell.run(cmd, {
    saveCmdFile: false,
    stdout: console.log,
    stderr: console.log,
    ...runOpt,
  })
}

module.exports = {
  zipShim,
}

