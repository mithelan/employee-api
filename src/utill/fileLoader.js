const fs = require('fs');
const path = require('path');
const _ = require('lodash');

module.exports = {
  load(loaderType, { baseFolder, indexFile = 'index.js' }) {
    const joiners = {};

    fs.readdirSync(baseFolder)
      .filter((file) => {
        return (
          file.indexOf('.') !== 0 &&
          file !== indexFile &&
          file.slice(-3) === '.js'
        );
      })
      .forEach((file) => {
        const joinFile = path.join(baseFolder, file);
        if (loaderType) {
          const joinFileName = _.camelCase(file.split('.')[0]);
          joiners[joinFileName] = loaderType(require(joinFile));
        } else {
          const joinFileName = file.split('.')[0];
          joiners[joinFileName] = require(joinFile);
        }
      });

    return joiners;
  },
};
