// ServiceWorker処理：https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja
function $(id){return document.getElementById(id)}

// キャッシュ名とキャッシュファイルの指定
var CACHE_VERSION = 'pwa-nouhauBookKanri-cachesV4';
var urlsToCache1 = [
    'index.html',
    'style.css',
    'main.js',
    'data.js',
    'textClass.js',
    './image/app-icon.png'
];
var _nouhauImages = [];
for (var i = 0; i < 268; i++) {
  let moji = i + 1;
  if (moji >= 0 && moji <= 9) moji = "00" + moji;
  if (moji >= 10 && moji <= 99) moji = "0" + moji;

  _nouhauImages.push('./image/nouhau' + moji + '.png');
}

var urlsToCache = urlsToCache1.concat(_nouhauImages);



//https://qiita.com/ichii731/items/0fb38333e8a0f00eb9ff より
// キャッシュ追加
self.addEventListener('install', (event)=> {
  console.log('ServiceWorker Install');
  $("logdiv").innerText +="ServiceWorker Install/"
  event.waitUntil(
    caches.open(CACHE_VERSION)
    .then((cache) => {
      console.log('cache.addAll');
      $("logdiv").innerText +="cache addAll/";
      skipWaiting();
      cache.addAll(urlsToCache);
    })
  );
});
// キャッシュ表示
self.addEventListener('fetch', (event) => {
  console.log('ServiceWorker fetch' + event.request.url);
  $("logdiv").innerText +="ServiceWorker fetch" + event.request.url + "/";
  event.respondWith(
    // キャッシュが存在するかチェック
    caches.match(event.request)
    .then((response)=> {
      if (response) {
        return response;
      } else {
        // キャッシュがない場合キャッシュに入れる
        var fetchRequest = event.request.clone();
        return fetch(fetchRequest)
          .then((res)=> {
            return caches.open(CACHE_VERSION)
              .then((cache)=> {
                console.log('cache.put');
                $("logdiv").innerText +="cache.put/";
                cache.put(event.request, res.clone());
                return res;
              });
          })
          .catch(function() {
            // 何もしない
          });
      }
    })
  );
});
// 古いキャッシュを削除
self.addEventListener('activate', (event)=> {
  console.log('activate ServiceWorker');
  $("logdiv").innerText +="active ServiceWorker/";
  event.waitUntil(
    caches.keys()
    .then((keyList)=> {
      return Promise.all(keyList.map((key)=> {
        if (key !== CACHE_VERSION ) {
          console.log('cache.delete');
          $("logdiv").innerText +="cache.delete/";
          return caches.delete(key);
        }
      }));
    })
  );
  clients.claim();
});
