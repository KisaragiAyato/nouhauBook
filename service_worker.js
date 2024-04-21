// ServiceWorker処理：https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja

// キャッシュ名とキャッシュファイルの指定
var CACHE_VERSION = 'pwa-nouhauBookKanri-caches01';
var DISP_VERSION = '1.1';
var urlsToCache = [
    './index.html',
    './style.css',
    './main.js',
    './data.js',
    './textClass.js',
    './image/app-icon.png'
];
for (var i = 0; i < nouhau.length; i++) {
  let moji = i +1;
  if(moji>= 0 && moji<= 9)moji = "00"+ moji;
  if(moji>=10 && moji <= 99)moji = "0" + moji;
  
  urlsToCache.push('./image/nouhau' + moji + '.png');
}


//https://qiita.com/ichii731/items/0fb38333e8a0f00eb9ff より
// キャッシュ追加
self.addEventListener('install', function (event) {
  console.log('ServiceWorker Install');
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(function (cache) {
        console.log('cache.addAll');
        cache.addAll(urlsToCache);
      })
  );
  event.waitUntil(self.skipWaiting());
});
// キャッシュ表示
self.addEventListener('fetch', function (event) {
  console.log('ServiceWorker fetch');
  event.respondWith(
    // キャッシュが存在するかチェック
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        } else {
          // キャッシュがない場合キャッシュに入れる
          return fetch(event.request)
            .then(function (res) {
              return caches.open(DISP_VERSION)
                .then(function (cache) {
                  console.log('cache.put');
                  cache.put(event.request.url, res.clone());
                  return res;
                });
            })
            .catch(function () {
              // 何もしない
            });
        }
      })
  );
});
// 古いキャッシュを削除
self.addEventListener('activate', function (event) {
  console.log('activate ServiceWorker');
  event.waitUntil(
    caches.keys()
      .then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
          if (key !== CACHE_VERSION && key !== DISP_VERSION) {
            console.log('cache.delete');
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});
