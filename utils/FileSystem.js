const fs    = require('fs');
const Axios = require('axios');
const path = require('path');

module.exports = class Functions {

    static async DownloadFile(url, path) {  
        const writer = fs.createWriteStream(path)
      
        const response = await Axios({
          url,
          method: 'GET',
          responseType: 'stream'
        })
      
        response.data.pipe(writer)
      
        return new Promise((resolve, reject) => {
          writer.on('finish', resolve)
          writer.on('error', reject)
        })
      }
}