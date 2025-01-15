module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    "@babel/plugin-transform-class-static-block", // 重要：添加此插件
    // 其他插件
  ],
};
