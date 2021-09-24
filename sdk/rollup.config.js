import babel from 'rollup-plugin-babel'; //处理es6语法
let isDev = process.env.NODE_ENV === 'development'
let babelConfig = {
  "presets": [
    [
      "env", {
        "modules": false,
        "targets": {
          "browsers": ["chrome > 40", "safari >= 7"]
        }
      }
    ]
  ],
};

export default {
  input:'index.js',
  watch:{
    exclude: 'node_modules/**'
  },
  output:{
    file:isDev?'../website/client/js/monitor/bundle.umd.js':'../dist/bundle.umd.js',
    name:'yyMonitor' ,//window 上 会多一个变量 就是这个名字
    format:'umd', //格式
    sourcemap:true 
  },
  plugins:[
    babel({
      babelrc: false,
      presets: babelConfig.presets,
      plugins: babelConfig.plugins,
      exclude: 'node_modules/**' // only transpile our source code
    })
  ],
}