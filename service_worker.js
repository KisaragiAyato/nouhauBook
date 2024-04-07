// ServiceWorker処理：https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja

// キャッシュ名とキャッシュファイルの指定
var CACHE_NAME = 'pwa-nouhauBookKanri-caches';
var urlsToCache = [
    './',
    './style.css',
    './main.js',
    './data.js',
    './textClass.js',
    './image/app-icon.png'
];
for (var i = 0; i < nouhau.length; i++) {
  let moji = i;
  if(i>= 0 && i<= 9)moji = "00"+ i;
  if(i>=10 && i <= 99)moji = "0" + i;
  
  urlsToCache.push('./image/nouhau' + moji + '.png');
}

// インストール処理
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches
    .open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// https://qiita.com/y_fujieda/items/f9e765ac9d89ba241154　より
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
              .then((response) => {
                  if (response) {
                      return response;
                  }

                  // 重要：リクエストを clone する。リクエストは Stream なので
                  // 一度しか処理できない。ここではキャッシュ用、fetch 用と2回
                  // 必要なので、リクエストは clone しないといけない
                  let fetchRequest = event.request.clone();

                  return fetch(fetchRequest)
                      .then((response) => {
                          if (!response || response.status !== 200 || response.type !== 'basic') {
                              return response;
                          }

                          // 重要：レスポンスを clone する。レスポンスは Stream で
                          // ブラウザ用とキャッシュ用の2回必要。なので clone して
                          // 2つの Stream があるようにする
                          let responseToCache = response.clone();

                          caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                });

                          return response;
                      });
              })
    );}
);
