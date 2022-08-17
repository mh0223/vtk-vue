const vtkChainWebpack = require("vtk.js/Utilities/config/chainWebpack");

module.exports = {
  chainWebpack: config => {
    vtkChainWebpack(config);
  }
};
