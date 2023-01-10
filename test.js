const {
  zipShim,
} = require(`./`)

zipShim({
  t: `7z`,
  p: `123`,
  mhe: true,
  mx: 9,
  v: false,
  spf: false,
  file: [
    `./`,
  ],
  runOpt: {
    stdout: () => {},
    stderr: () => {},
  }
})