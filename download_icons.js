const https = require('https');
const fs = require('fs');
const path = require('path');

const icons = {
  'home.png': 'https://pic.imgdb.cn/item/65bde2d9871b83018ac7c6c2.png',
  'home_selected.png': 'https://pic.imgdb.cn/item/65bde2d9871b83018ac7c6c8.png',
  'user.png': 'https://pic.imgdb.cn/item/65bde2d9871b83018ac7c6ce.png',
  'user_selected.png': 'https://pic.imgdb.cn/item/65bde2d9871b83018ac7c6d4.png',
  'menu.png': 'https://pic.imgdb.cn/item/65bde2d9871b83018ac7c6da.png',
  'category.png': 'https://pic.imgdb.cn/item/65bde2d9871b83018ac7c6e0.png',
  'ranking.png': 'https://pic.imgdb.cn/item/65bde2d9871b83018ac7c6e6.png',
  'article.png': 'https://pic.imgdb.cn/item/65bde2d9871b83018ac7c6ec.png',
  'discover.png': 'https://pic.imgdb.cn/item/65bde2d9871b83018ac7c6f2.png',
  'manga.png': 'https://pic.imgdb.cn/item/65bde2d9871b83018ac7c6f8.png',
  'bookshelf.png': 'https://pic.imgdb.cn/item/65bde2d9871b83018ac7c6fe.png'
};

const iconDir = path.join(__dirname, 'assets', 'icons');

// 确保目录存在
if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir, { recursive: true });
}

// 下载图标
Object.entries(icons).forEach(([filename, url]) => {
  const filepath = path.join(iconDir, filename);
  https.get(url, (response) => {
    const fileStream = fs.createWriteStream(filepath);
    response.pipe(fileStream);
    fileStream.on('finish', () => {
      console.log(`Downloaded: ${filename}`);
      fileStream.close();
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${filename}:`, err.message);
  });
}); 