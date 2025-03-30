function $(id){
  return document.getElementById(id);
}

const jsVersion = "1.9";
function verHyouki(){
  $("jsVerSpan").innerText = jsVersion;
}
verHyouki();


const wakusenWidth = 1;

const canvas = $("canvas");
canvas.width = 1280;
canvas.height = 960;
const ctx = canvas.getContext('2d');
const touch = {type:null,x:null,y:null};
/*

canvas.addEventListener('touchmove',(event)=>{
  var eventType = event.type;
    
  var x = 0, y = 0;
  const offset = canvas.getBoundingClientRect();

	x = event.changedTouches[0].pageX;
  y = event.changedTouches[0].pageY;
  	
  x = x - offset.left - window.pageXOffset;
  y = y - offset.top - window.pageYOffset;
  	
  touch.type = eventType;
  touch.x = x;
  touch.y = y;
    	
});
    
canvas.addEventListener('touchstart',(event)=>{
  var eventType = event.type;
    
  var x = 0, y = 0;
  const offset = canvas.getBoundingClientRect();

	x = event.changedTouches[0].pageX;
  y = event.changedTouches[0].pageY;
  	
  x = x - offset.left - window.pageXOffset;
  y = y - offset.top - window.pageYOffset;
  	
  touch.type = eventType;
  touch.x = x;
  touch.y = y;
    	
});
    
canvas.addEventListener('touchend',(event)=>{
  var eventType = event.type;
    
  var x = 0, y = 0;
  const offset = canvas.getBoundingClientRect();

	x = event.changedTouches[0].pageX;
  y = event.changedTouches[0].pageY;
  	
  x = x - offset.left - window.pageXOffset;
  	y = y - offset.top - window.pageYOffset;
  	
  touch.type = eventType;
	touch.x = x;
  touch.y = y;
    	
});
*/

canvas.addEventListener('mousedown', (e) => {
      const rect = e.target.getBoundingClientRect();
      
      touch.x = e.clientX - rect.left;
      touch.y = e.clientY - rect.top;
      touch.type = "touchstart";
});

/*
function viewportSet() {
  var ww = window.innerWidth;
  var wh = window.innerHeight;

  var cw = canvas.width
  var ch = canvas.height

  if (ww / wh >= cw / ch) {
    // windowのwidthが長い
    document.querySelector("meta[name='viewport']").setAttribute("content", "width=" + (ch * ww / wh));
  } else {
    // それ以外
    document.querySelector("meta[name='viewport']").setAttribute("content", "width=" + cw);
  }
}
window.addEventListener("DOMContentLoaded", viewportSet, false);
window.addEventListener("resize", viewportSet, false);
window.addEventListener("orientationchange", viewportSet, false);
*/




class Monitor{
  constructor(){
    this.gamen = [];
    
    this.sortBookNums = [[],[],[],[]];  //二次元配列。user.books[n]のnをいれていく。this.sortBookNums[0]にはthis.sortType[0]に対応したならび順にしたものを入れる。ただしsortType[2]とsortType[3]は事前ではなく都度設定する。user.booksに削除したbookがある場合、nullになる。this.getSort()ではnullを飛ばして番号を入れる。
    this.sortTypes = ["当サイト登録順","取得日順","現在表示中のノウハウが多い順","現在非表示のノウハウが少ない順"] //ソート名
    this.sortNum = 1; //現在のソート
    this.gyakujun = false;  //ソートを逆順にするかどうか
    
    this.sortAndShiboriResult = [];
    
    
    this.getSort(1);  //user.booksから読み込んでthis.sortBookNumsを設定。
    this.getSort(2);  //user.booksから読み込んでthis.sortBookNumsを設定。
    //this.shiborikomu();  //this.sortBookNumsからthis.sortAndShiboriResultを設定。これを設定しないとGamen.setScene(1)が行えない。constructerで行うのはサンプルモードのとき必要なため。
    this.sortAndShiboriResult = this.sortBookNums[0];  //this.shiborikomu()にはthis.gamenを使うため、constructorでは使えないため上記をこれに変更。
  }
  
  
  
  bookReload( isUserBookChange = false, isNarabikae = false){
    
    if(isUserBookChange == true){
      //monitorにはbookをソートした順番を持っておく。ソートする度に並び替えるのではなくbookに変更がある度monitor内のsort情報を更新する。
      //そのほうがbook内容変更時に重くなるもののソート操作時は軽くなる
      //user.bookの内容、bookの中身に変更があった場合、
      this.getSort(1);
      this.getSort(2);
      
    }
    //sortNumが3と4の場合は事前ではなく都度ならびを設定。
    if(this.sortNum == 3)this.getSort(3);
    if(this.sortNum == 4)this.getSort(4);
    
    
    this.shiborikomu();
    
    
    this.gamen[1].hyoujiSettei = [].concat(user.hyoujis[this.gamen[1].hyoujiNum -1]);
    
    for (var i = 0; i < this.gamen.length; i++) {
      this.gamen[i].bookReload(isUserBookChange || isNarabikae);
    }
    this.update();
  }
  
  tagHanei(){
    this.gamen[0].tagHanei();
    this.gamen[1].tagHanei();
  }
  
  touchevent(){
    for (var i = 0; i < this.gamen.length; i++) {
      this.gamen[i].touchevent();
    }
  }
  
  update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
    
    
    for (var i = 0; i < this.gamen.length; i++) {
      this.gamen[i].update();
    }
    
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, wakusenWidth, canvas.height);
    ctx.fillRect(0, 0, canvas.width, wakusenWidth);
    ctx.fillRect(0, canvas.height -wakusenWidth,canvas.width, wakusenWidth);
    ctx.fillRect(canvas.width -wakusenWidth, 0, wakusenWidth, canvas.height);
    ctx.closePath();
  }
  
  getSort(_sortNum){
    let sort1  = [];
    for (var i = 0; i < user.books.length; i++) {
      if(user.books[i] != null)sort1.push(i);
    }
    
    if(_sortNum == 1){
      this.sortBookNums[0] = sort1;
    }else if(_sortNum == 2){
      let _n = sort1.length -1;
      while(_n >= 1 ){
        for (var i = 0; i < _n ; i++) {
          let _irekae = false;
          let leftBookDate = user.books[sort1[sort1.length -1 - i -1]].date;
          let rightBookDate = user.books[sort1[sort1.length -1 - i]].date;
          if(rightBookDate[0] == "" || rightBookDate[0] == null ||Number(rightBookDate[0]) == NaN){
            //なにもしない
          }else{
            if(leftBookDate[0] != "" && leftBookDate[0] != null && Number(leftBookDate[0]) != NaN){
              if(leftBookDate[0] < rightBookDate[0])_irekae = true;
              if(leftBookDate[0] == rightBookDate[0]){
                if (rightBookDate[1] == "" || rightBookDate[1] == null || Number(rightBookDate[1]) == NaN) {
                  //なにもしない
                } else {
                  if (leftBookDate[1] != "" && leftBookDate[1] != null && Number(leftBookDate[1]) != NaN) {
                    if (leftBookDate[1] < rightBookDate[1]) _irekae = true;
                    if (leftBookDate[1] == rightBookDate[1]) {
                      if (rightBookDate[2] == "" || rightBookDate[2] == null || Number(rightBookDate[2]) == NaN) {
                        //なにもしない
                      } else {
                        if (leftBookDate[2] != "" && leftBookDate[2] != null && Number(leftBookDate[2]) != NaN) {
                          if (leftBookDate[2] < rightBookDate[2]) _irekae = true;
                          if (leftBookDate[0] == rightBookDate[0]) {
                            //なにもしない
                          }
                        }else{
                          _irekae = true;
                        }
                      }
                    }
                  }else{
                    _irekae = true;
                  }
                }
              }
            }else{
              _irekae = true;
            }
          }
          if(_irekae == true){
            let _irekaeX = sort1[sort1.length -1 - i -1];
            sort1[sort1.length -1 - i -1] = sort1[sort1.length -1 - i];
            sort1[sort1.length -1 - i] = _irekaeX;
          }
        }
        _n--;
      }
      //while終了
      this.sortBookNums[1] = sort1;
      
    }else if(_sortNum == 3){
      let _hyouji = [].concat(this.gamen[1].hyoujiSettei);
      let _n = sort1.length - 1;
      let _kyoyouNouhaus = [];
      if (user.kyoyouNouhauSettei[0] == 1) _kyoyouNouhaus.push("頭ノウハウ");
      if (user.kyoyouNouhauSettei[1] == 1) _kyoyouNouhaus.push("ファンの声援");
      if (user.kyoyouNouhauSettei[2] == 1) _kyoyouNouhaus.push("S.T.E.P.目標達成");
      if (user.kyoyouNouhauSettei[3] == 1) _kyoyouNouhaus.push("S.T.E.P.エキシビジョンマッチ");
      
      while (_n >= 1) {
        for (var i = 0; i < _n; i++) {
          let _irekae = false;
          let leftBook = user.books[sort1[sort1.length - 1 - i - 1]];
          let rightBook = user.books[sort1[sort1.length - 1 - i]];
          
          let leftHyoujisuu = 0;
          let rightHyoujisuu = 0;
          let leftHihyoujisuuWhichCanHikitsugi = 0;
          let rightHihyoujisuuWhichCanHikitsugi = 0;
          for (var l = 0; l < leftBook.nouhau.length; l++) {
            if(_hyouji.includes(leftBook.nouhau[l][0] +1))leftHyoujisuu++;
            if(_hyouji.includes(leftBook.nouhau[l][0] +1) == false && nouhau[leftBook.nouhau[l][0]].canHikitsugi == true && _kyoyouNouhaus.includes(nouhau[leftBook.nouhau[l][0]].type) == false)leftHihyoujisuuWhichCanHikitsugi++;
          }
          for (var r = 0; r < rightBook.nouhau.length; r++) {
            if (_hyouji.includes(rightBook.nouhau[r][0] + 1)) rightHyoujisuu++;
            if(_hyouji.includes(rightBook.nouhau[r][0] +1) == false && nouhau[rightBook.nouhau[r][0]].canHikitsugi == true && _kyoyouNouhaus.includes(nouhau[rightBook.nouhau[r][0]].type) == false)rightHihyoujisuuWhichCanHikitsugi++;
          }
          if(rightHyoujisuu > leftHyoujisuu)_irekae = true;
          if(rightHyoujisuu == leftHyoujisuu){
            //表示ノウハウ数が同じ場合は、総ノウハウ数を比較
            if(rightBook.nouhau.length > leftBook.nouhau.length)_irekae = true;
            if(rightBook.nouhau.length == leftBook.nouhau.length){
              //総ノウハウ数も同じ場合は、非表示の引き継ぎノウハウ数の少なさを比較
              if(rightHihyoujisuuWhichCanHikitsugi < leftHihyoujisuuWhichCanHikitsugi)_irekae = true;
            }
          }
          
          if (_irekae == true) {
            let _irekaeX = sort1[sort1.length - 1 - i - 1];
            sort1[sort1.length - 1 - i - 1] = sort1[sort1.length - 1 - i];
            sort1[sort1.length - 1 - i] = _irekaeX;
          }
        }
        _n--;
      }
      this.sortBookNums[2] = sort1;
      
      
    }else if(_sortNum == 4){
      let _hyouji = [].concat(this.gamen[1].hyoujuSettei);
      let _n = sort1.length - 1;
      let _kyoyouNouhaus = [];
      if (user.kyoyouNouhauSettei[0] == 1) _kyoyouNouhaus.push("頭ノウハウ");
      if (user.kyoyouNouhauSettei[1] == 1) _kyoyouNouhaus.push("ファンの声援");
      if (user.kyoyouNouhauSettei[2] == 1) _kyoyouNouhaus.push("S.T.E.P.目標達成");
      if (user.kyoyouNouhauSettei[3] == 1) _kyoyouNouhaus.push("S.T.E.P.エキシビジョンマッチ");
      
      while (_n >= 1) {
        for (var i = 0; i < _n; i++) {
          let _irekae = false;
          let leftBook = user.books[sort1[sort1.length - 1 - i - 1]];
          let rightBook = user.books[sort1[sort1.length - 1 - i]];
          
          let leftHyoujisuu = 0;
          let rightHyoujisuu = 0;
          let leftHihyoujisuuWhichCanHikitsugi = 0;
          let rightHihyoujisuuWhichCanHikitsugi = 0;
          for (var l = 0; l < leftBook.nouhau.length; l++) {
            if (_hyouji.includes(leftBook.nouhau[l][0] + 1)) leftHyoujisuu++;
            if (_hyouji.includes(leftBook.nouhau[l][0] + 1) == false && nouhau[leftBook.nouhau[l][0]].canHikitsugi == true && _kyoyouNouhaus.includes(nouhau[leftBook.nouhau[l][0]].type) == false) leftHihyoujisuuWhichCanHikitsugi++;
          }
          for (var r = 0; r < rightBook.nouhau.length; r++) {
            if (_hyouji.includes(rightBook.nouhau[r][0] + 1)) rightHyoujisuu++;
            if (_hyouji.includes(rightBook.nouhau[r][0] + 1) == false && nouhau[rightBook.nouhau[r][0]].canHikitsugi == true && _kyoyouNouhaus.includes(nouhau[rightBook.nouhau[r][0]].type) == false) rightHihyoujisuuWhichCanHikitsugi++;
          }
          
          if(rightHihyoujisuuWhichCanHikitsugi < leftHihyoujisuuWhichCanHikitsugi)_irekae = true;
          if(rightHihyoujisuuWhichCanHikitsugi == leftHihyoujisuuWhichCanHikitsugi){
            //非表示中の引き継ぎノウハウの数が同じなら表示ノウハウの多さで比較
            if(rightHyoujisuu > leftHyoujisuu)_irekae = true;
            if(rightHyoujisuu == leftHyoujisuu){
              //表示ノウハウ数も同じなら総ノウハウ数の多さで比較
              if(rightBook.nouhau.length > leftBook.nouhau.length)_irekae = true;
            }
          }
          
          if (_irekae == true) {
            let _irekaeX = sort1[sort1.length - 1 - i - 1];
            sort1[sort1.length - 1 - i - 1] = sort1[sort1.length - 1 - i];
            sort1[sort1.length - 1 - i] = _irekaeX;
          }
        }
        _n--;
      }
      this.sortBookNums[3] = sort1;
    }
    
  }
  
  shiborikomu(){
    let arr = [].concat(this.sortBookNums[this.sortNum -1]);
    let result1 = [];  //arrからタグ絞りこみ条件に該当するものだけを抜き取った配列
    let result2 = [];  //result1からノウハウ絞りこみ条件に該当するものだけを抜き取った配列
    let result3 = [];  //逆順にするならresult2を逆順にしたものをいれる配列
    
    //タグ絞りこみ
    if(this.gamen[1].doTagShibori == true){
      //タグ絞りこみが有効
      let tagShiboriSettei = [].concat(this.gamen[1].tagShiboriSettei); //tag順にnum(0:設定なし、1:必須、2:除外、3:候補)が入った配列
      let tagShiboriSetteiTagNashi = this.gamen[1].tagShiboriSetteiTagNashi;  //0,2,3のいずれか
      let needTags = [];
      let jogaiTags = [];
      let kouhoTags = [];
      for (var k = 0; k < tagShiboriSettei.length; k++) {
        if(tagShiboriSettei[k] == 1)needTags.push(k);
        if(tagShiboriSettei[k] == 2)jogaiTags.push(k);
        if(tagShiboriSettei[k] == 3)kouhoTags.push(k);
      }
    
      //タグ絞りこみの処理
      for (var i = 0; i < arr.length; i++) {
        let _canThisBook = true;
        let _thisBookTag = [].concat(user.books[arr[i]].tag);
        if(_thisBookTag.length == 0){
          //タグなしの場合
          if(tagShiboriSetteiTagNashi == 2)_canThisBook = false;
          if(needTags.length > 0)_canThisBook = false;
        }else{
          //タグありの場合
          if(needTags.length > 0){
            //needTagsが含まれていないなら該当しない
            for (var j = 0; j < needTags.length; j++) {
              if(_thisBookTag.includes(needTags[j]) == false)_canThisBook = false;
            }
          }
        
          if(_canThisBook == true && jogaiTags.length > 0){
            //jogaiTagsが含まれているなら該当しない
            for (var j = 0; j < jogaiTags.length; j++) {
              if (_thisBookTag.includes(jogaiTags[j]) == true) _canThisBook = false;
            }
          }
        
          if( (_canThisBook == true && kouhoTags.length >0) || (_canThisBook == true && tagShiboriSetteiTagNashi == 3)){
            //候補にあるタグがひとつもはいってないなら該当しない
            let haveKouho = false;
            if(kouhoTags.length >0){
              for (var j = 0; j < kouhoTags.length; j++) {
                if(_thisBookTag.includes(kouhoTags[j]) == true){
                  haveKouho = true;
                  continue;
                }
              }
            }
            //ただしタグなしが候補設定且つ必須設定にしたタグが存在する場合、「必須タグのみをもつbook」を該当とする
            if(tagShiboriSetteiTagNashi == 3 && needTags.length > 0){
              let haveNeedlessTag = false;
              for (var t = 0; t < _thisBookTag.length; t++) {
                if(needTags.includes(_thisBookTag[t]) == false)haveNeedlessTag = true;
              }
              if(haveNeedlessTag == false)haveKouho = true;
            }
            
            if(haveKouho == false)_canThisBook = false;
          }
        }
        if(_canThisBook == true)result1.push(arr[i]);
      }
    }else if(this.gamen[1].doTagShibori == false){
      //タグ絞りこみが無効
      result1 = [].concat(arr);
    }//タグ絞りこみ終了
    
    
    if(this.gamen[1].doNouhauShibori == true){
      //ノウハウ絞りこみ
      let nouhauShiboriSettei = this.gamen[2].nouhauShiboriSettei; //[setteiNum(0:設定なし、1:必須、2:候補),lvNum(lv何以上か),setteiNum(0:設定なし、1:除外),lvNum(lv何以下か)]がnouhau順に入っている。lvNumは1から6。
      let needNouhaus = [];
      let kouhoNouhaus = [];
      let jogaiNouhaus = [];
      for (var n = 0; n < nouhauShiboriSettei.length; n++) {
        if(nouhauShiboriSettei[n][0] == 1) needNouhaus.push([n,nouhauShiboriSettei[n][1]]);
        if(nouhauShiboriSettei[n][0] == 2) kouhoNouhaus.push([n,nouhauShiboriSettei[n][1]]);
        if(nouhauShiboriSettei[n][2] == 1) jogaiNouhaus.push([n,nouhauShiboriSettei[n][3]]);
      }
      
      
      for (var i = 0; i < result1.length; i++) {
        let _canThisBook = true;
        let _thisBookNouhau = user.books[result1[i]].nouhau;
        if(_thisBookNouhau.length == 0){
          //ノウハウが設定されていないbookの場合
          if(needNouhaus.length > 0)_canThisBook = false;
          if(kouhoNouhaus.length > 0)_canThisBook = false;
        }else{
          if(needNouhaus.length > 0){
            //needNouhauがすべて入ってないなら該当しない
            let needOk = true;
            for (var h = 0; h < needNouhaus.length; h++) {
              let haveThisNeedNouhau = false;
              for (var k = 0; k < _thisBookNouhau.length; k++) {
                if(_thisBookNouhau[k][0] == needNouhaus[h][0] && _thisBookNouhau[k][1] >= needNouhaus[h][1]){
                  haveThisNeedNouhau = true;
                }
              }
              if(haveThisNeedNouhau == false){
                needOk = false;
                continue;
              }
            }
            if(needOk == false)_canThisBook = false;
          }
          
          if(jogaiNouhaus.length > 0 && _canThisBook == true){
            //除外ノウハウが入っていたら該当しない
            let jogaiOk = true;
            for (var h = 0; h < jogaiNouhaus.length; h++) {
              let haveThisJogaiNouhau = false;
              for (var k = 0; k < _thisBookNouhau.length; k++) {
                if (_thisBookNouhau[k][0] == jogaiNouhaus[h][0] && _thisBookNouhau[k][1] <= jogaiNouhaus[h][1]) {
                  haveThisJogaiNouhau = true;
                }
              }
              if (haveThisJogaiNouhau == true) {
                jogaiOk = false;
                continue;
              }
            }
            if (jogaiOk == false) _canThisBook = false;
          }
          
          if(kouhoNouhaus.length > 0 && _canThisBook == true){
            //候補ノウハウをひとつももっていないなら該当しない
            let kouhoOk = false;
            for (var h = 0; h < kouhoNouhaus.length; h++) {
              let haveThisKouhoNouhau = false;
              for (var k = 0; k < _thisBookNouhau.length; k++) {
                if (_thisBookNouhau[k][0] == kouhoNouhaus[h][0] && _thisBookNouhau[k][1] >= kouhoNouhaus[h][1]) {
                  haveThisKouhoNouhau = true;
                }
              }
              if (haveThisKouhoNouhau == true) {
                kouhoOk = true;
                continue;
              }
            }
            if (kouhoOk == false) _canThisBook = false;
          }
          if(_canThisBook == true)result2.push(result1[i]);
        }
      }
    
    }else{
      result2 = [].concat(result1);
    }
    
    //逆順にするかどうか
    if(this.gyakujun == true){
      for (var g = 0; g < result2.length; g++) {
        result3.push(result2[result2.length -1 -g]);
      }
    }else{
      result3 = [].concat(result2);
    }
    
    
     this.sortAndShiboriResult = result3;
  }
  
}

class Gamen {
  constructor(){
    this.scene ;
    this.basicItems = [];
    this.sceneItems = [];
    this.timelyItems = [];
    
    this.width;
    this.left;
    this.height = canvas.height;
  }
  
  bookReload(){}
  
  tagHanei(){}
  
  touchevent(){
    /*
    this.basicItems[0] = new Text(touch.x + "," + touch.y);
    monitor.update();
    */
    
    for (var i = 0; i < this.basicItems.length; i++) {
      this.basicItems[i].touchevent();
    }
    for (var i = 0; i < this.sceneItems.length; i++) {
      this.sceneItems[i].touchevent();
    }
    for (var i = 0; i < this.timelyItems.length; i++) {
      this.timelyItems[i].touchevent();
    }
    
  }
  
  update(){
    for (var i = 0; i < this.basicItems.length; i++) {
      this.basicItems[i].update();
    }
    for (var i = 0; i < this.sceneItems.length; i++) {
      this.sceneItems[i].update();
    }
    for (var i = 0; i < this.timelyItems.length; i++) {
      this.timelyItems[i].update();
    }
  }
}

class Gamen1 extends Gamen{
  constructor(){
    super();
    this.width = 640;
    this.left = 0;
    
    this.sceneNames = [
      "user.booksの中身が0個",
      "一覧画面",
      "カード詳細画面",
      "カードタグ変更画面"
    ];
    
    this.flag = 0;
    this.wait = 0;
    
    //this.scene 1用
    this.page = 1;
    this.booksuuOnOnePage = 9;
    this.maxpage = Math.ceil(monitor.sortBookNums[0].length / this.booksuuOnOnePage);
    this.targetBookNum = null; //user.booksの何番目か。
    
    //this.scene 2用
    this.syousaiBookNum = null;
    
    
    
    if (user.books.length == 0) {
      this.setScene(0);
    } 
  }
  
  bookReload(isNarabikae = false){
    this.maxpage = Math.ceil(monitor.sortAndShiboriResult.length / this.booksuuOnOnePage);
    
    //選択状態のカードがあるなら、 そのカードのあるページに移る。 詳しくはthis.searchPageByBookNum参照
    if (isNarabikae == true ) {
      this.page = this.searchPageByBookNum(this.targetBookNum);
      if(monitor.sortAndShiboriResult.length > 0 && this.page == 0)this.page = 1;
    }
    
    if (this.flag == 0 && user.books.length > 0) {
      this.flag = 1;
      this.setScene(1);
    }else{
      this.setScene(this.scene);
    }
  }
  
  searchPageByBookNum(_targetBookNum){
    //monitor.sortAndShiboriResultから_targetBookNumが何ページ目にあるかを返す。
    //monitor.sortAndShiboriResultにない場合はthis.pageを返す。
    //ただしthis.pageがMath.ceil( this.pageがmonitor.sortAndShiboriResult.length / this.buuksuuOnOnePage )より大きいなら後者を返す。this.sceneが切り替わってる間(this.pageが変わらないまま)にmonitor.sortAndShiboriResultが変わりうるため。
    if(monitor.sortAndShiboriResult.includes(_targetBookNum)){
      let _index = monitor.sortAndShiboriResult.indexOf(_targetBookNum);
      return Math.floor(_index / this.booksuuOnOnePage) +1;
    }else{
      if(this.page > Math.ceil( monitor.sortAndShiboriResult.length / this.booksuuOnOnePage)){
        return Math.ceil( monitor.sortAndShiboriResult.length / this.booksuuOnOnePage);
      }else{
        
        return this.page;
      }
    }
  }
  
  setScene(_sceneNum){
    this.scene = _sceneNum;
    
    if(_sceneNum == 0){
      this.sceneItems = [];
      this.timelyItems = [];
      this.sceneItems.push(new Text("ノウハウブック管理ツール",10,10));
      let _tx = new Text("初めての方は下からノウハウブックを登録してください。前回jsonファイルを出力した方は読み込んでください。",100,480);
      _tx.max = 19;
      this.sceneItems.push(_tx);
    }else if(_sceneNum == 1){
      this.sceneItems = [];
      this.timelyItems = [];
      //ページ数
      let pageTxt = new Text(this.page + "/" + this.maxpage + "ページ",0,960 - 30);
      if(this.maxpage == 0)pageTxt.text = "0/0ページ";
      pageTxt.x = (this.width - pageTxt.returnWidthAndHeight()[0]) /2;
      this.sceneItems.push(pageTxt);
      //矢印
      if(this.page != 1 && this.maxpage >= 1){
        let yajirushi1 = new Text("▲", 40 - 10, 960 - 40);
        yajirushi1.size = 30;
        yajirushi1.touchevent = () => {
          if(yajirushi1.isTouched(touch)[1] == true && yajirushi1.isTouched(touch)[0] == "touchstart" && this.wait == 0 ){
            this.wait = 1;
            setTimeout(()=>{this.wait = 0;},100);
             this.page--;
             this.setScene(this.scene);
             monitor.update();
          }
        }
        this.sceneItems.push(yajirushi1)
      }
      if(this.page != this.maxpage && this.maxpage>= 1){
        let yajirushi2 = new Text("▼",640 - 40 - 10,960 - 40);
        yajirushi2.size = 30;
        yajirushi2.touchevent = ()=>{
          
          if (yajirushi2.isTouched(touch)[1] == true && yajirushi2.isTouched(touch)[0] == "touchstart" && this.wait == 0) {
            this.wait = 1;
            setTimeout(() => { this.wait = 0; }, 100);
            this.page++;
            this.setScene(this.scene);
            monitor.update();
          }
        }
        this.sceneItems.push(yajirushi2)
      }
      //カードに関する
      let hyoujisuu = this.booksuuOnOnePage;
      if(this.page == this.maxpage)hyoujisuu = monitor.sortAndShiboriResult.length - this.booksuuOnOnePage * (this.maxpage -1);
      let hyoujiLinesuu = 3;
      if (this.booksuuOnOnePage == 16) hyoujiLinesuu = 4;
      
      
      if(hyoujisuu >0 && this.maxpage >= 1){
        for (var i = 0; i < hyoujisuu; i++) {
          let _x = i % hyoujiLinesuu;
          let _y = Math.floor(i / hyoujiLinesuu);
          
          let _thisBookNum = i + (this.page -1) * this.booksuuOnOnePage;
          _thisBookNum = monitor.sortAndShiboriResult[_thisBookNum]; //monitor.sortAndShiboriResultの何番目か→user.booksの何番目か　に変換
          

            
          //カードの中身
          //表示設定分割線の描画
          let _tate = [].concat(monitor.gamen[1].nouhauHyoujiSetteiBunkatsuSetteiTate);
          let _yoko = [].concat(monitor.gamen[1].nouhauHyoujiSetteiBunkatsuSetteiYoko);
          for (var t = 0; t < _tate.length; t++) {
            if(_tate[t] == 0)continue;
            let tx = t % 4;
            let ty = Math.floor(t/4);
            this.sceneItems.push(new Line(37 +(18+ 200*_x  + 33*tx +14)*3/hyoujiLinesuu,24 +(100+ 13+300*_y  + 33*ty-11)*3/hyoujiLinesuu,37 +(18+ 200*_x  + 33*tx +14)*3/hyoujiLinesuu,27 +(100+ 13+300*_y  + 33*ty +20)*3/hyoujiLinesuu));
          }
          
          for (var t = 0; t < _yoko.length; t++) {
            if (_yoko[t] == 0) continue;
            //if(_tate[t] == 0)continue;
            let tx = t % 5;
            let ty = Math.floor(t / 5);
            this.sceneItems.push(new Line(37 + (18 + 200 * _x + 33 * tx -19) * 3 / hyoujiLinesuu, 28 + (100 + 13 + 300 * _y + 33 * ty +18) * 3 / hyoujiLinesuu, 37 + (18 + 200 * _x + 33 * tx + 14) * 3 / hyoujiLinesuu, 28 + (100 + 13 + 300 * _y + 33 * ty + 18) * 3 / hyoujiLinesuu));
          }
          
          
          //hyoujiSetteiに対応してノウハウレベルを表示
          this.sceneItems.push(new Rect(30 + (200 * _x)*3/hyoujiLinesuu, 20  +(100+ 300 * _y)*3/hyoujiLinesuu, 180*3/hyoujiLinesuu, 180*3/hyoujiLinesuu));
          
          let _thisBook = Object.assign({}, JSON.parse(JSON.stringify( user.books[_thisBookNum] )));
          let _thisHyoujiSettei = [].concat(monitor.gamen[1].hyoujiSettei);
          let _thisBookNouhausuu = _thisBook.nouhau.length  //非表示ノウハウ数の計算に使用。
          let _thisBookNouhausuuWhichCanHikitsugi = 0;  //非表示ノウハウ数の計算に使用
          let _kyoyouNouhaus = [];
          if(user.kyoyouNouhauSettei[0] == 1)_kyoyouNouhaus.push("頭ノウハウ");
          if(user.kyoyouNouhauSettei[1] == 1)_kyoyouNouhaus.push("ファンの声援");
          if(user.kyoyouNouhauSettei[2] == 1)_kyoyouNouhaus.push("S.T.E.P.目標達成");
          if(user.kyoyouNouhauSettei[3] == 1)_kyoyouNouhaus.push("S.T.E.P.エキシビジョンマッチ");
          for (var _nouhaux = 0; _nouhaux < _thisBook.nouhau.length; _nouhaux++) {
            if(nouhau[ _thisBook.nouhau[_nouhaux][0]].canHikitsugi == true && _kyoyouNouhaus.includes( nouhau[_thisBook.nouhau[_nouhaux][0]].type) == false)_thisBookNouhausuuWhichCanHikitsugi++;
          }
          let _thisHyoujiNouhausuu = 0; //非表示ノウハウ数の計算に使用。for文の中で加算していく。
          let _thisHyoujiNouhausuuWhichCanHikitsugi = 0; //非表示ノウハウ数の計算に使用。for文の中で加算していく
          for (var k = 0; k < _thisHyoujiSettei.length; k++) {
            let _thisNouhau = _thisHyoujiSettei[k];  //_thisNouhauが1ならnouhau[0]を示す。_thisBook    .nouhau内にある[ノウハウ番号,ノウハウレベル]ではノウハウ番号0がnouhau[0]を示す。
            if(_thisNouhau == 0)continue; //ノウハウが設定されていない
            let _thisNouhauLv = 0;
            for (var m = 0; m < _thisBook.nouhau.length; m++) {
              if(_thisBook.nouhau[m][0] == _thisNouhau -1)_thisNouhauLv = _thisBook.nouhau[m][1];
            }
            //ノウハウが存在していた場合、レベルを表示する
            let _x2 = k % 5;
            let _y2 = Math.floor(k / 5);
            let _moji = "○";
            if(_thisNouhauLv == 1)_moji = "①";
            if(_thisNouhauLv == 2)_moji = "②";
            if(_thisNouhauLv == 3)_moji = "③";
            if(_thisNouhauLv == 4)_moji = "④";
            if(_thisNouhauLv == 5)_moji = "⑤";
            if(_thisNouhauLv == 6)_moji = "⑥";
            this.sceneItems.push(new Text(_moji,25 +(18+ 200*_x  + 33*_x2)*3/hyoujiLinesuu,20 +(100+ 13+300*_y  + 33*_y2)*3/hyoujiLinesuu));
          
            if(_thisNouhauLv != 0){
              _thisHyoujiNouhausuu++;
              if(nouhau[_thisNouhau -1].canHikitsugi == true && _kyoyouNouhaus.includes( nouhau[_thisNouhau -1].type) == false)_thisHyoujiNouhausuuWhichCanHikitsugi++;
            }
          
          }
          
          
          //非表示ノウハウ数を記載
          let _thisHihyoujiNouhausuu = _thisBookNouhausuu - _thisHyoujiNouhausuu;
          let _thisHihyoujiNouhausuuWichCanHikitsugi = _thisBookNouhausuuWhichCanHikitsugi - _thisHyoujiNouhausuuWhichCanHikitsugi;
          let hihyoujiTxt = new Text("+" + _thisHihyoujiNouhausuu + "(" + _thisHihyoujiNouhausuuWichCanHikitsugi + ")",30+(180+200*_x )*3/hyoujiLinesuu,20+(284+300*_y )*3/hyoujiLinesuu,16 );
          //let card = new Rect(30 + 200*_x,20 + 300*_y,180,280);　比較用に転記
          let hihyoujiTxtW = hihyoujiTxt.returnWidthAndHeight()[0];
          let hihyoujiTxtH = hihyoujiTxt.returnWidthAndHeight()[1];
          hihyoujiTxt.x -= hihyoujiTxtW + 4;
          hihyoujiTxt.y -= hihyoujiTxtH /2 ;
          //先にrectをつくってからこのhihyoujiTxtを入れる。
          let hihyoujiRect = new Rect(hihyoujiTxt.x -2,hihyoujiTxt.y -2,hihyoujiTxtW +4,hihyoujiTxtH +4,false);
          hihyoujiRect.color = "black";
          //let hihyoujiRect2 = new Rect(hihyoujiTxt.x -2,hihyoujiTxt.y -2,hihyoujiTxtW +4,hihyoujiTxtH +4);
          //カードを先にpushするため、カードの後にpush。card.toucheventのためにhihyoujiRectの宣言が必要なためcardがここの下に来ている。
          //↑toucheventで使わなくなった。
          
          //詳細ボタン。
          let _syousaiButton = new Rect(30 +(7 + 124 - 12)*3/hyoujiLinesuu+( 200 * _x)*3/hyoujiLinesuu, 20 + (100-85-10)*3/hyoujiLinesuu + (300 * _y)*3/hyoujiLinesuu, 55 *3/hyoujiLinesuu, 36 *3/hyoujiLinesuu);
          _syousaiButton.bookNum = _thisBookNum;
          _syousaiButton.touchevent = () => {
            if (_syousaiButton.isTouched(touch)[0] == "touchstart" && _syousaiButton.isTouched(touch)[1] == true) {
              this.syousaiBookNum = _syousaiButton.bookNum;
              this.targetBookNum = _syousaiButton.bookNum;
              this.scene = 2;
              monitor.bookReload();
            }
          };
          this.sceneItems.push(_syousaiButton);
          this.sceneItems.push( new Text("詳細",30 + (200*_x +7 +126)*3/hyoujiLinesuu ,20 + (300*_y +100 -83)*3/hyoujiLinesuu,13*3/hyoujiLinesuu));
          
          //カード 
          let card = new Rect(30 + (200 * _x)*3/hyoujiLinesuu, 20 + (300 * _y)*3/hyoujiLinesuu, 180*3/hyoujiLinesuu, 280*3/hyoujiLinesuu);
          if(this.targetBookNum == _thisBookNum)card.color = "red";
          card.bookNum = _thisBookNum;
          card.touchevent = () => {
            if (card.isTouched(touch)[0] == "touchstart" && card.isTouched(touch)[1] == true && _syousaiButton.isTouched(touch)[1] == false  && this.wait == 0) {
              this.wait = 1;
              setTimeout(()=>{this.wait = 0},100);
              if(this.targetBookNum != card.bookNum){
                this.targetBookNum = card.bookNum;
              }else{
                this.targetBookNum = null;
              }
              monitor.bookReload();
            }
          }
          this.sceneItems.push(card);
          this.sceneItems.push(hihyoujiRect);
          this.sceneItems.push(hihyoujiTxt);

        
          //book情報を記載
          let _vo = _thisBook.vo;
          if(_vo == undefined || _vo == null)_vo = "";
          let _da = _thisBook.da;
          if (_da == undefined || _da == null) _da = "";
          let _vi = _thisBook.vi;
          if (_vi == undefined || _vi == null) _vi = "";
          let _me = _thisBook.me;
          if (_me == undefined || _me == null) _me = "";
          let _voTxt =  new Text("Vo:" + _vo,30 +7+ (200*_x)*3/hyoujiLinesuu ,20 + (100 -25 + 300*_y)*3/hyoujiLinesuu ,16);
          if(hyoujiLinesuu == 4)_voTxt.text = _vo;
          this.sceneItems.push(_voTxt);
          let _daTxt =  new Text("/Da:" + _da,30 +7+ (58 +200*_x)*3/hyoujiLinesuu ,20 + (100 -25 + 300*_y)*3/hyoujiLinesuu ,16);
          if(hyoujiLinesuu == 4)_daTxt.text ="/" + _da;
          this.sceneItems.push(_daTxt);
          let _viTxt =  new Text("/Vi:" + _vi,30 +7+ (58*2+ 200*_x)*3/hyoujiLinesuu ,20 + (100 -25 + 300*_y)*3/hyoujiLinesuu ,16);
          if(hyoujiLinesuu == 4)_viTxt.text ="/" + _vi;
          this.sceneItems.push(_viTxt);
          let _meTxt = new Text("Me:" + _me, 30 + 7 + (58 * 2 + 200 * _x) * 3 / hyoujiLinesuu, 20 + (100 - 50 + 300 * _y) * 3 / hyoujiLinesuu, 16);
          if (hyoujiLinesuu == 4) _meTxt.text = "" + _me;
          this.sceneItems.push(_meTxt);
          let _date = [].concat(_thisBook.date);
          if(_date[0] == undefined || _date[0] == null)_date[0] = "";
          if(_date[1] == undefined || _date[1] == null)_date[1] = "";
          if(_date[2] == undefined || _date[2] == null)_date[2] = "";
          _date = _date[0] + "-" + _date[1] + "-" + _date[2];
          this.sceneItems.push(new Text(_date,30 + 200*_x*3/hyoujiLinesuu +7 ,20 + (100 -50 + 300*_y)*3/hyoujiLinesuu ,16));
          let _charaBackRect = new Rect(30 + 200*_x*3/hyoujiLinesuu +7 ,20 + 100 + 300*_y*3/hyoujiLinesuu -85 -10,28*3/hyoujiLinesuu,36*3/hyoujiLinesuu,false);
          _charaBackRect.color = "white";
          this.sceneItems.push(_charaBackRect);
          let _charaRect = new Rect(30 +7+ (200*_x +2)*3/hyoujiLinesuu ,20 + 100 + 300*_y*3/hyoujiLinesuu -85 - 8,24*3/hyoujiLinesuu,32*3/hyoujiLinesuu,false);
          _charaRect.color = charactorColor[_thisBook.charactor];
          let _chara = new Text(charactors[_thisBook.charactor],30 + (200 *_x +39)*3/hyoujiLinesuu  ,20 + (100-85 + 300*_y)*3/hyoujiLinesuu);
          this.sceneItems.push(_charaRect);
          this.sceneItems.push(_chara);
          
          
        }
        
      }
      
      
    }else if(_sceneNum == 2){
      //カード詳細画面
      this.sceneItems = [];
      
      let modoruButton = new Rect(20,20,85,30);
      modoruButton.touchevent = ()=>{
        if(modoruButton.isTouched(touch)[0] == "touchstart" && modoruButton.isTouched(touch)[1] == true && this.wait == 0){
          this.wait = 1;
          setTimeout(()=>{this.wait = 0;},100);
          this.scene = 1;
          monitor.bookReload();
        }
      }
      this.sceneItems.push(modoruButton);
      this.sceneItems.push(new Text("←戻る", 30,25));
      
      let _thisBook = user.books[this.syousaiBookNum];
      
      let _charaBackRect = new Rect(50 +85,20, 28, 36, false);
      _charaBackRect.color = "white";
      this.sceneItems.push(_charaBackRect);
      let _charaRect = new Rect(50+85+2,20+2, 24, 32, false);
      _charaRect.color = charactorColor[_thisBook.charactor];
      this.sceneItems.push(_charaRect);
      this.sceneItems.push(new Text(charactors[_thisBook.charactor],50 +85 + 36,30));
      this.sceneItems.push(new Text(_thisBook.date[0] + "-" + _thisBook.date[1] + "-" + _thisBook.date[2],50+85 + 120,24,16));
      this.sceneItems.push(new Text("Vo:" +  _thisBook.vo + " /Da:" + _thisBook.da + " /Vi:" + _thisBook.vi + "/Me:" + _thisBook.me,50 +85 + 120,28 + 20,16));
      for (var i = 0; i < _thisBook.nouhau.length; i++) {
        
        let _moji = "○";
        if(nouhau[_thisBook.nouhau[i][0]].canHikitsugi == false && _thisBook.nouhau[i][0] >= 32)_moji = "×";  //頭ノウハウは引き継ぎ○とする
        let nouhauName =  new Text(nouhau[_thisBook.nouhau[i][0]].name,50,45 + 40*2 + 30*i,16);
        if(monitor.gamen[1].hyoujiSettei.includes(_thisBook.nouhau[i][0] +1))nouhauName.color = "skyblue";
        this.sceneItems.push(nouhauName);
        this.sceneItems.push(new Text("Lv" + _thisBook.nouhau[i][1] +"             " + _moji,50 + 400,45+40*2+30*i,16));
        let _rect = new Rect(50 -8,45 + 40*2 + 30*i -7,530,30);
        _rect.color = "gray";
        this.sceneItems.push(_rect);
      }
      this.sceneItems.push(new Text("ノウハウ名", 50, 45-30 + 40 * 2 , 16));
      this.sceneItems.push(new Text("Lv         引き継ぎ", 50 + 400, 45-30 + 40 * 2 , 16));
      var _rect = new Rect(50 - 8, 45-30 + 40 * 2 - 7, 530, 30)
      //_rect.color = "gray";
      this.sceneItems.push(_rect);
      for (var i = 0; i < _thisBook.tag.length; i++) {
        this.sceneItems.push(new Text(user.tags[_thisBook.tag[i]],50,45 + 40*2 + 30*21 +30 + 30*i,16));
        let _rect = new Rect(50 - 8, 45 + 40 * 2 + 30 * 21 +30 + 30*i - 7, 530, 30);
        _rect.color = "gray";
        this.sceneItems.push(_rect);
      }
      this.sceneItems.push(new Text("タグ",50,45 + 40*2 + 30*20 + 30,16));
      var _rect = new Rect(50 - 8, 45 + 40 * 2 + 30 * 20 +30 - 7, 530, 30);
      this.sceneItems.push(_rect);
      let _tagHenkouButton = new Rect(510,752,50,22);
      _tagHenkouButton.touchevent = ()=>{
        if(_tagHenkouButton.isTouched(touch)[0] == "touchstart" && _tagHenkouButton.isTouched(touch)[1] == true && this.wait == 0){
          this.wait = 1;
          setTimeout(()=>{this.wait = 0;},100);
          this.scene = 3;
          monitor.bookReload();
        }
      };
      this.sceneItems.push(_tagHenkouButton);
      this.sceneItems.push(new Text("変更",510 +9,752 +3,16));
      
      //削除ボタン
      this.sceneItems.push(new Text("削除",522,25));
      let sakujoButton = new Rect(500,20,85,30)
      sakujoButton.touchevent = ()=>{
        if(sakujoButton.isTouched(touch)[0] == "touchstart" && sakujoButton.isTouched(touch)[1] == true && this.wait == 0){
          this.wait = 1;
          setTimeout(()=>{this.wait = 0},100);
          if(monitor.sortBookNums[0].length == 1){
            window.alert("登録されているノウハウブックが1冊の状態では削除することができません。")
            return;
          }
          
          let con = window.confirm("このノウハウブックを削除しますか?");
          if(con == true){
            let con2 = window.confirm("本当に削除しますか?")
            if(con2 == true){
              user.books[this.syousaiBookNum] = null;
              this.syousaiBookNum = null;
              this.scene = 1;
              monitor.bookReload(true);
              window.alert("削除しました")
            }
          }
        }
      };
      this.sceneItems.push(sakujoButton);
    }else if(_sceneNum == 3){
      //タグ変更画面
      this.sceneItems = [];
      
      let modoruButton = new Rect(20, 20, 85, 30);
      modoruButton.touchevent = () => {
        if (modoruButton.isTouched(touch)[0] == "touchstart" && modoruButton.isTouched(touch)[1] == true && this.wait == 0) {
          this.wait = 1;
          setTimeout(() => { this.wait = 0; }, 100);
          this.scene = 2;
          monitor.bookReload(false,true);
        }
      }
      this.sceneItems.push(modoruButton);
      this.sceneItems.push(new Text("←戻る", 30, 25));
      
      let _thisBook = user.books[this.syousaiBookNum];
      
      let _charaBackRect = new Rect(50 + 85, 20, 28, 36, false);
      _charaBackRect.color = "white";
      this.sceneItems.push(_charaBackRect);
      let _charaRect = new Rect(50 + 85 + 2, 20 + 2, 24, 32, false);
      _charaRect.color = charactorColor[_thisBook.charactor];
      this.sceneItems.push(_charaRect);
      this.sceneItems.push(new Text(charactors[_thisBook.charactor], 50 + 85 + 36, 30));
      this.sceneItems.push(new Text(_thisBook.date[0] + "-" + _thisBook.date[1] + "-" + _thisBook.date[2], 50 + 85 + 120, 24, 16));
      this.sceneItems.push(new Text("Vo:" + _thisBook.vo + " /Da:" + _thisBook.da + " /Vi:" + _thisBook.vi, 50 + 85 + 120, 28 + 20, 16));
      for (var i = 0; i < user.tags.length; i++) {
      
        let tagName = new Text(user.tags[i], 50, 45 + 40 * 2 + 30 * i, 16);
        tagName.tagNum = i;
        if (_thisBook.tag.includes(i)) tagName.color = "skyblue";
        tagName.touchevent = ()=>{
          if(tagName.isTouched(touch)[0] == "touchstart" && tagName.isTouched(touch)[1] == true && this.wait == 0){
            this.wait = 1;
            setTimeout(()=>{this.wait = 0;},100);
            if(_thisBook.tag.includes(tagName.tagNum)){
              //タグを消す
              _thisBook.tag.splice(_thisBook.tag.indexOf(tagName.tagNum),1);
              monitor.bookReload();
            }else{
              //タグを追加
              if(_thisBook.tag.length >= 5)return;
              _thisBook.tag.push(tagName.tagNum);
              //順番になるようにいれかえる
              let tagX = _thisBook.tag.length -1;
              if(tagX >= 1){
                while(tagX >= 1){
                  for (var i = 0; i < tagX; i++) {
                    if(_thisBook.tag[_thisBook.tag.length -1 -i] < _thisBook.tag[_thisBook.tag.length -1 -i -1] ){
                      let karioki  =_thisBook.tag[_thisBook.tag.length -1 -i];
                      _thisBook.tag[_thisBook.tag.length -1 -i] = _thisBook.tag[_thisBook.tag.length -1 -i -1];
                      _thisBook.tag[_thisBook.tag.length -1 -i -1] = karioki;
                    }
                  }
                  tagX--;
                }
              }
              monitor.bookReload();
            }
          }
        };
        this.sceneItems.push(tagName);
        let _rect = new Rect(50 - 8, 45 + 40 * 2 + 30 * i - 7, 530, 30);
        _rect.color = "gray";
        this.sceneItems.push(_rect);
      }
      this.sceneItems.push(new Text("タグ名", 50, 45 - 30 + 40 * 2, 16));
      var _rect = new Rect(50 - 8, 45 - 30 + 40 * 2 - 7, 530, 30)
      this.sceneItems.push(_rect);
    }
    
    if (userOkiba.length > 0) {
      this.sceneItems.push(new Text("現在サンプルモードです。",16, 0, 16));
    }
    
  }
  
  update(){

    
    
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(640 -wakusenWidth/2,0,wakusenWidth,canvas.height);
    ctx.closePath();
    
    super.update();
  }
}

class Gamen2 extends Gamen{
  constructor() {
    super();
    this.width = 448;
    this.left = 640;
    
    this.sceneNames = [
          "user.booksの中身が0個",
          "メニュー画面",
          "ソート画面",
          "タグ絞りこみ画面",
          "ノウハウ絞りこみ画面",
          "ノウハウ表示分割線設定"
        ];
    
    this.flag = 0;
    this.wait = 0;
    
    //絞りこみの有効・無効
    this.doTagShibori = false;
    this.doNouhauShibori = false;
    
    this.tagPage = 1;
    this.tagsuuOnOnePage = 4;
    this.tagMaxPage = Math.ceil (user.tags.length / this.tagsuuOnOnePage);
    this.tagShiboriSettei = []; //tagSetteiNumを入れる。0:指定なし、2:必須、3:除外、4:候補。この配列の中身はthis.tagHanei()で、user.tags.lengthがthis tagShiboriSettei.lengthより多い場合に、その差の数だけ0をpushして増やす。
    this.tagShiboriSetteiTagNashi = 0; //タグなしに対する設定
    
    this.nouhauHyoujiSetteiBunkatsuSetteiTate = [
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0];
    this.nouhauHyoujiSetteiBunkatsuSetteiYoko = [
          0, 0, 0, 0,0,
          0, 0, 0, 0,0,
          0, 0, 0, 0,0,
          0, 0, 0, 0,0];
    
    this.hyoujiSettei = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.hyoujiNum = 1; //user.hyoujisに対応.1~10まで
    this.selectedSettei = 0; //25個のうち選択中のもの。0は選択していない状態
    
    if (user.books.length == 0) {
      this.setScene(0);
    } 
  }
  
  bookReload(){
    //this.hyoujiSettei = [].concat(user.hyoujis[this.hyoujiNum -1]);
    //上記はmonitor.gamen[0].bookReloadより前に行いたいのでmonitor.bookReloadで行うこととする
    if(this.flag == 0 && user.books.length > 0){
      
      this.flag = 1;
      this.setScene(1);
    }
    if(this.scene != 0)this.setScene(this.scene);
  }
  
  tagHanei(){
    if (user.tags.length > this.tagShiboriSettei.length) {
      let x = user.tags.length - this.tagShiboriSettei.length;
      for (var n = 0; n < x; n++) {
        this.tagShiboriSettei.push(0);
      }
    }
    this.tagMaxPage = Math.ceil (user.tags.length / this.tagsuuOnOnePage);
    if(this.tagPage > this.tagMaxPage)this.tagPage = this.tagMaxPage;
    
  }
  
  setScene(_sceneNum){
    this.scene = _sceneNum;
    if(_sceneNum != 0){
      this.basicItems = [];
      //basicを設定
      this.basicItems.push(new Rect(640,960-448,448,448));
      this.basicItems.push(new Rect(640,25,448,960-448-96));
      this.basicItems.push(new Rect(640 +3,25 +3,448 -6,960-448-96 -6));
      let txt1 = new Text("ノウハウ表示設定",640 + 20,960-448-25,22);
      this.basicItems.push(txt1);
      let txt2 = new Text("メニュー", 640 + 20, 0, 22);
      this.basicItems.push(txt2);
      //マスの描画
      for (var i = 0; i < 25; i++) {
        let _x = i % 5;
        let _y = Math.floor(i / 5);
        let r = new Rect(640 +3 + _x * (86 +3),960-448 +3 + _y * (86 +3),86,86);
        r.num = i +1;
        if(this.selectedSettei == r.num)r.color = "red";
        r.touchevent = ()=>{
          if(r.isTouched(touch)[0] == "touchstart" && r.isTouched(touch)[1] == true && this.wait == 0){
            this.wait = 1;
            setTimeout(()=>{this.wait = 0;},100);
            if(this.selectedSettei == 0){
              this.selectedSettei = r.num;
              this.setScene(this.scene);
              monitor.update();
            }else{
              //入れ換える
              let _karioki = this.hyoujiSettei[r.num -1];
              this.hyoujiSettei[r.num -1] = this.hyoujiSettei[this.selectedSettei -1];
              this.hyoujiSettei[this.selectedSettei -1] = _karioki;
              user.hyoujis[this.hyoujiNum -1][this.selectedSettei -1] = this.hyoujiSettei[this.selectedSettei -1];
              user.hyoujis[this.hyoujiNum -1][r.num -1] = this.hyoujiSettei[r.num -1];
              
              this.selectedSettei = 0;
              monitor.bookReload();
              
              
            }
          }
          
        };
        this.basicItems.push(r);
      }
      let toright = new Text(">",640 +20 + 22*8 + 90,960-448-25-20,50);
      toright.touchevent = ()=>{
        if(toright.isTouched(touch)[0] == "touchstart" && toright.isTouched(touch)[1] == true && this.wait == 0){
          this.wait = 1;
          setTimeout(() => { this.wait = 0; }, 100);
          this.hyoujiNum++;
          if(this.hyoujiNum > user.hyoujis.length)this.hyoujiNum = 1;
          this.hyoujiSettei = [].concat(user.hyoujis[this.hyoujiNum -1]);
          monitor.bookReload();
          
        }
      }
      this.basicItems.push(toright);
      this.basicItems.push(new Text(this.hyoujiNum,640 +20 + 22*8 + 60,960-448-25,20));
      let toleft = new Text("<", 640 + 20 + 22 * 8 + 20, 960 - 448 - 25 - 20, 50);
      toleft.touchevent = () => {
        if (toleft.isTouched(touch)[0] == "touchstart" && toleft.isTouched(touch)[1] == true && this.wait == 0) {
          this.wait = 1;
          setTimeout(() => { this.wait = 0; }, 100);
          this.hyoujiNum--;
          if (this.hyoujiNum < 1) this.hyoujiNum = user.hyoujis.length;
          this.hyoujiSettei = [].concat(user.hyoujis[this.hyoujiNum -1]);
          monitor.bookReload();

        }
      }
      this.basicItems.push(toleft);

      let kaijobutton = new Rect(640 +20 + 22*8 + 90 + 50,960-448-25-20,90,40);
      kaijobutton.touchevent = ()=>{
        if (kaijobutton.isTouched(touch)[0] == "touchstart" && kaijobutton.isTouched(touch)[1] == true && this.wait == 0) {
          if(this.selectedSettei == 0)return;
          let _selected = this.selectedSettei;
          this.selectedSettei = 0;
          this.wait = 1;
          setTimeout(() => { this.wait = 0; }, 100);
          if(this.hyoujiSettei[_selected -1] != 0){
            this.hyoujiSettei[_selected -1] = 0;
            user.hyoujis[this.hyoujiNum -1][_selected -1] = 0;
          }
          monitor.bookReload(false,true);
          
        }
      }
      this.basicItems.push(kaijobutton);
      this.basicItems.push(new Text("ノウハウ削除",640+20+22*8+90+50 +25 -18,960-448-25-20 +15,12));
      
      //対応するノウハウマークを表示設定に描画
      for (var i = 0; i < 25; i++) {
        let _nouhauNum = this.hyoujiSettei[i];
        if (_nouhauNum == 0) continue;
        let _x = i % 5;
        let _y = Math.floor(i / 5);
        let _sprite = new Sprite(nouhauImages[_nouhauNum - 1], 640 + 3 + _x * (86 + 3) + 10, 960 - 448 + 3 + _y * (86 + 3) + 10);
        this.basicItems.push(_sprite);
      
      }
      
      //basicここまで
    }
    
    if(_sceneNum == 1){
      this.sceneItems = [];
      let sortTxt = new Text("ソート",680,60,22);
      sortTxt.touchevent = ()=>{
        if(sortTxt.isTouched(touch)[0] == "touchstart" && sortTxt.isTouched(touch)[1] == true && this.wait == 0){
          this.wait = 1;
          setTimeout(() => { this.wait = 0; }, 100);
          this.setScene(2);
          monitor.update();
          
        }
      };
      this.sceneItems.push(sortTxt);
      let tagshiboriTxt = new Text("タグ絞りこみ", 680, 60 +50*1);
      tagshiboriTxt.touchevent = () => {
        if (tagshiboriTxt.isTouched(touch)[0] == "touchstart" && tagshiboriTxt.isTouched(touch)[1] == true && this.wait == 0) {
          this.wait = 1;
          setTimeout(() => { this.wait = 0; }, 100);
          this.setScene(3);
          monitor.update();
        }
      };
      this.sceneItems.push(tagshiboriTxt);
      let doTagShiboriTxt = new Text("有効",680 + 200 + 20,60 + 50*1);
      if(this.doTagShibori == false)doTagShiboriTxt.color = "gray";
      if(this.doTagShibori == true)doTagShiboriTxt.color = "white";
      doTagShiboriTxt.touchevent = ()=>{
        if(doTagShiboriTxt.isTouched(touch)[0] == "touchstart" && doTagShiboriTxt.isTouched(touch)[1] == true && this.wait == 0){
          this.wait = 1;
          setTimeout(()=>{this.wait = 0},100);
          this.doTagShibori = true;
          monitor.bookReload(false,true);
        }
      };
      this.sceneItems.push(doTagShiboriTxt);
      let dontTagShiboriTxt = new Text("無効", 680 + 200 + 90, 60 + 50 * 1);
      if (this.doTagShibori == false) dontTagShiboriTxt.color = "white";
      if (this.doTagShibori == true) dontTagShiboriTxt.color = "gray";
      dontTagShiboriTxt.touchevent = () => {
        if (dontTagShiboriTxt.isTouched(touch)[0] == "touchstart" && dontTagShiboriTxt.isTouched(touch)[1] == true && this.wait == 0) {
          this.wait = 1;
          setTimeout(() => { this.wait = 0 }, 100);
          this.doTagShibori = false;
          monitor.bookReload(false,true);
        }
      };
      this.sceneItems.push(dontTagShiboriTxt);
      
      let nouhaushiboriTxt = new Text("ノウハウ絞りこみ", 680, 60 + 50 * 2);
      nouhaushiboriTxt.touchevent = () => {
        if (nouhaushiboriTxt.isTouched(touch)[0] == "touchstart" && nouhaushiboriTxt.isTouched(touch)[1] == true && this.wait == 0) {
          this.wait = 1;
          setTimeout(() => { this.wait = 0; }, 100);
          this.setScene(4);
          monitor.update();
        }
      };
      this.sceneItems.push(nouhaushiboriTxt);
      let doNouhauShiboriTxt = new Text("有効", 680 + 200 + 20, 60 + 50 * 2);
      if (this.doNouhauShibori == false) doNouhauShiboriTxt.color = "gray";
      if (this.doNouhauShibori == true) doNouhauShiboriTxt.color = "white";
      doNouhauShiboriTxt.touchevent = () => {
        if (doNouhauShiboriTxt.isTouched(touch)[0] == "touchstart" && doNouhauShiboriTxt.isTouched(touch)[1] == true && this.wait == 0) {
          this.wait = 1;
          setTimeout(() => { this.wait = 0 }, 100);
          this.doNouhauShibori = true;
          monitor.bookReload(false,true);
        }
      };
      this.sceneItems.push(doNouhauShiboriTxt);
      let dontNouhauShiboriTxt = new Text("無効", 680 + 200 + 90, 60 + 50 * 2);
      if (this.doNouhauShibori == false) dontNouhauShiboriTxt.color = "white";
      if (this.doNouhauShibori == true) dontNouhauShiboriTxt.color = "gray";
      dontNouhauShiboriTxt.touchevent = () => {
        if (dontNouhauShiboriTxt.isTouched(touch)[0] == "touchstart" && dontNouhauShiboriTxt.isTouched(touch)[1] == true && this.wait == 0) {
          this.wait = 1;
          setTimeout(() => { this.wait = 0 }, 100);
          this.doNouhauShibori = false;
          monitor.bookReload(false,true);
        }
      };
      this.sceneItems.push(dontNouhauShiboriTxt);
      
      let bookHyoujisuuTxt = new Text("ノウハウブック表示数変更", 680, 60 + 50 * 3);
      bookHyoujisuuTxt.touchevent = () => {
        if (bookHyoujisuuTxt.isTouched(touch)[0] == "touchstart" && bookHyoujisuuTxt.isTouched(touch)[1] == true && this.wait == 0) {
          this.wait = 1;
          setTimeout(() => { this.wait = 0; }, 100);
          let _booksuu =  monitor.gamen[0].booksuuOnOnePage;
          if(_booksuu == 9){_booksuu = 16;}else if(_booksuu == 16){_booksuu = 9;}
          monitor.gamen[0].booksuuOnOnePage = _booksuu;
          monitor.bookReload(false,true);
        }
      };
      this.sceneItems.push(bookHyoujisuuTxt);
      
      let nouhauHyoujiSetteiBunkatsuTxt = new Text("ノウハウ表示分割線設定", 680, 60 + 50 * 4);
      nouhauHyoujiSetteiBunkatsuTxt.touchevent = () => {
        if (nouhauHyoujiSetteiBunkatsuTxt.isTouched(touch)[0] == "touchstart" && nouhauHyoujiSetteiBunkatsuTxt.isTouched(touch)[1] == true && this.wait == 0) {
          this.wait = 1;
          setTimeout(() => { this.wait = 0; }, 100);
          this.setScene(5);
          monitor.update();
        }
      };
      this.sceneItems.push(nouhauHyoujiSetteiBunkatsuTxt);
      
      let kyoyouNouhauSetteiTxt = new Text("許容ノウハウ設定", 680, 60 + 50 * 5);
      kyoyouNouhauSetteiTxt.touchevent = () => {
        if (kyoyouNouhauSetteiTxt.isTouched(touch)[0] == "touchstart" && kyoyouNouhauSetteiTxt.isTouched(touch)[1] == true && this.wait == 0) {
          this.wait = 1;
          setTimeout(() => { this.wait = 0; }, 100);
          this.setScene(6);
          monitor.update();
        }
      };
      this.sceneItems.push(kyoyouNouhauSetteiTxt);
      
      
    }else if(_sceneNum == 2){
      //ソート画面
      this.sceneItems = [];
      
      let _txt = new Text("当サイト登録順", 680, 60 + 50 * 0 , 22);
      if(monitor.sortNum != 1)_txt.color = "gray";
      if(monitor.sortNum == 1)_txt.color = "white";
      _txt.touchevent = () => {
        if (_txt.isTouched(touch)[0] == "touchstart" && _txt.isTouched(touch)[1] == true && this.wait == 0) {
          this.wait = 1;
          setTimeout(() => { this.wait = 0; }, 100);
          if(monitor.sortNum != 1){
            monitor.sortNum = 1;
            monitor.gyakujun = false;
          }else{
            if(monitor.gyakujun == true){
              monitor.gyakujun = false;
            }else{
              monitor.gyakujun = true;
            }
          }
          monitor.bookReload(false,true);
        }
      };
      this.sceneItems.push(_txt);
      
      let _txt2 = new Text("取得日順", 680, 60 + 50 * 1, 22);
      if(monitor.sortNum != 2)_txt2.color = "gray";
      if(monitor.sortNum == 2)_txt2.color = "white";
      _txt2.touchevent = () => {
        if (_txt2.isTouched(touch)[0] == "touchstart" && _txt2.isTouched(touch)[1] == true && this.wait == 0) {
          this.wait = 1;
          setTimeout(() => { this.wait = 0; }, 100);
          if (monitor.sortNum != 2) {
            monitor.sortNum = 2;
            monitor.gyakujun = false;
          } else {
            if (monitor.gyakujun == true) {
              monitor.gyakujun = false;
            } else {
              monitor.gyakujun = true;
            }
          }
          monitor.bookReload(false,true);
        }
      };
      this.sceneItems.push(_txt2);
      
      let _txt3 = new Text("表示中のノウハウが多い順", 680, 60 + 50 * 2, 22);
      if (monitor.sortNum != 3) _txt3.color = "gray";
      if(monitor.sortNum == 3)_txt3.color = "white";
      _txt3.touchevent = () => {
        if (_txt3.isTouched(touch)[0] == "touchstart" && _txt3.isTouched(touch)[1] == true && this.wait == 0) {
          this.wait = 1;
          setTimeout(() => { this.wait = 0; }, 100);
          if (monitor.sortNum != 3) {
            monitor.sortNum = 3;
            monitor.gyakujun = false;
          } else {
            if (monitor.gyakujun == true) {
              monitor.gyakujun = false;
            } else {
              monitor.gyakujun = true;
            }
          }
          monitor.bookReload(false,true);
        }
      };
      this.sceneItems.push(_txt3);
      
      let _txt4 = new Text("非表示中の引き継ぎノウハウが少ない順(許容ノウハウを除く)", 680, 60 + 50 * 3, 22);
      _txt4.max = 18;
      if (monitor.sortNum != 4) _txt4.color = "gray";
      if(monitor.sortNum == 4)_txt4.color = "white";
      _txt4.touchevent = ()=>{
        if (_txt4.isTouched(touch)[0] == "touchstart" && _txt4.isTouched(touch)[1] == true && this.wait == 0) {
          this.wait = 1;
          setTimeout(() => { this.wait = 0; }, 100);
          if (monitor.sortNum != 4) {
            monitor.sortNum = 4;
            monitor.gyakujun = false;
          } else {
            if (monitor.gyakujun == true) {
              monitor.gyakujun = false;
            } else {
              monitor.gyakujun = true;
            }
          }
          monitor.bookReload(false,true);
        }
      };
      this.sceneItems.push(_txt4);
      
      let _txtB = new Text("(←戻る)", 680, 60 + 50 * 6 +40, 22);
      _txtB.touchevent = () => {
        if (_txtB.isTouched(touch)[0] == "touchstart" && _txtB.isTouched(touch)[1] == true && this.wait == 0) {
          this.wait = 1;
          setTimeout(() => { this.wait = 0; }, 100);
          this.setScene(1);
          monitor.update();
        }
      };
      this.sceneItems.push(_txtB);
      
    }else if (_sceneNum == 3) {
      //タグ絞りこみ画面
      this.sceneItems = [];
      
      let _tagHyoujisuu = this.tagsuuOnOnePage;
      if(this.tagPage == this.tagMaxPage){
        _tagHyoujisuu = (this.tagShiboriSettei.length +1) % this.tagsuuOnOnePage; //タグなしの項目もあるため+1している
        if(_tagHyoujisuu == 0 )_tagHyoujisuu = this.tagsuuOnOnePage;
      }
      if(user.tags.length == 0){
        _tagHyoujisuu = 0;
        this.sceneItems.push(new Text("タグが登録されていません",680,60,20));
      }
      
      
      
      
      for (var i = 0; i < _tagHyoujisuu; i++) {
        this.sceneItems.push(new Rect(680 - 14,60 + 80*i + 10,5+ 90*3 + 20*4 + 24,60))
        
        let _tagNum = i + this.tagsuuOnOnePage * (this.tagPage -1);
        _tagNum--; //タグなしに対する設定を最初にもってくるため
        let _tagName = new Text("(タグなし)",680,60 + 80*i,20);
        if(_tagNum >= 0)_tagName.text = user.tags[_tagNum];
        let _rect =  new Rect(680 -2,60 + 80*i,_tagName.returnWidthAndHeight()[0] +4,_tagName.returnWidthAndHeight()[1],false);
        _rect.color = "black";
        this.sceneItems.push(_rect);
        this.sceneItems.push(_tagName);
        
        if(_tagNum >= 0){
          let _tagSetteiText1 = new Text("必須",680,60 + 80*i + 30,20);
          _tagSetteiText1.tagNum = _tagNum;
          if(this.tagShiboriSettei[_tagNum] != 1)_tagSetteiText1.color = "gray";
          if(this.tagShiboriSettei[_tagNum] == 1)_tagSetteiText1.color = "white";
          _tagSetteiText1.touchevent = ()=>{
            if(_tagSetteiText1.isTouched(touch)[0] == "touchstart" && _tagSetteiText1.isTouched(touch)[1] == true && this.wait == 0){
              this.wait = 1;
              setTimeout(()=>{this.wait = 0},100);
              this.tagShiboriSettei[_tagSetteiText1.tagNum] = 1;
              monitor.bookReload(false,true);
            }
          };
          this.sceneItems.push(_tagSetteiText1);
        
          let _tagSetteiText2 = new Text("除外", 680 + 90*1, 60 + 80 * i + 30, 20);
          _tagSetteiText2.tagNum = _tagNum;
          if (this.tagShiboriSettei[_tagNum] != 2) _tagSetteiText2.color = "gray";
          if (this.tagShiboriSettei[_tagNum] == 2) _tagSetteiText2.color = "white";
          _tagSetteiText2.touchevent = () => {
            if (_tagSetteiText2.isTouched(touch)[0] == "touchstart" && _tagSetteiText2.isTouched(touch)[1] == true && this.wait == 0) {
              this.wait = 1;
              setTimeout(() => { this.wait = 0 }, 100);
              this.tagShiboriSettei[_tagSetteiText2.tagNum] = 2;
              monitor.bookReload(false,true);
            }
          };
          this.sceneItems.push(_tagSetteiText2);
        
          let _tagSetteiText3 = new Text("候補", 680 + 90*2, 60 + 80 * i + 30, 20);
          _tagSetteiText3.tagNum = _tagNum;
          if (this.tagShiboriSettei[_tagNum] != 3) _tagSetteiText3.color = "gray";
          if (this.tagShiboriSettei[_tagNum] == 3) _tagSetteiText3.color = "white";
          _tagSetteiText3.touchevent = () => {
            if (_tagSetteiText3.isTouched(touch)[0] == "touchstart" && _tagSetteiText3.isTouched(touch)[1] == true && this.wait == 0) {
              this.wait = 1;
              setTimeout(() => { this.wait = 0 }, 100);
              this.tagShiboriSettei[_tagSetteiText1.tagNum] = 3;
              monitor.bookReload(false,true);
            }
          };
          this.sceneItems.push(_tagSetteiText3);
          
          let _tagSetteiText4 = new Text("設定なし", 680 + 90*3, 60 + 80 * i + 30, 20);
          _tagSetteiText4.tagNum = _tagNum;
          if (this.tagShiboriSettei[_tagNum] != 0) _tagSetteiText4.color = "gray";
          if (this.tagShiboriSettei[_tagNum] == 0) _tagSetteiText4.color = "white";
          _tagSetteiText4.touchevent = () => {
            if (_tagSetteiText4.isTouched(touch)[0] == "touchstart" && _tagSetteiText4.isTouched(touch)[1] == true && this.wait == 0) {
              this.wait = 1;
              setTimeout(() => { this.wait = 0 }, 100);
              this.tagShiboriSettei[_tagSetteiText1.tagNum] = 0;
              monitor.bookReload(false,true);
            }
          };
          this.sceneItems.push(_tagSetteiText4);
        }else if(_tagNum == -1){
          //タグなしに対する設定ボタン
          let _tagSetteiText2 = new Text("除外", 680 + 90 * 1, 60 + 80 * i + 30, 20);
          _tagSetteiText2.tagNum = _tagNum;
          if (this.tagShiboriSetteiTagNashi != 2) _tagSetteiText2.color = "gray";
          if (this.tagShiboriSetteiTagNashi == 2) _tagSetteiText2.color = "white";
          _tagSetteiText2.touchevent = () => {
            if (_tagSetteiText2.isTouched(touch)[0] == "touchstart" && _tagSetteiText2.isTouched(touch)[1] == true && this.wait == 0) {
              this.wait = 1;
              setTimeout(() => { this.wait = 0 }, 100);
              this.tagShiboriSetteiTagNashi = 2;
              monitor.bookReload(false,true);
            }
          };
          this.sceneItems.push(_tagSetteiText2);
          
          let _tagSetteiText3 = new Text("候補", 680 + 90 * 2, 60 + 80 * i + 30, 20);
          _tagSetteiText3.tagNum = _tagNum;
          if (this.tagShiboriSetteiTagNashi != 3) _tagSetteiText3.color = "gray";
          if (this.tagShiboriSetteiTagNashi == 3) _tagSetteiText3.color = "white";
          _tagSetteiText3.touchevent = () => {
            if (_tagSetteiText3.isTouched(touch)[0] == "touchstart" && _tagSetteiText3.isTouched(touch)[1] == true && this.wait == 0) {
              this.wait = 1;
              setTimeout(() => { this.wait = 0 }, 100);
              this.tagShiboriSetteiTagNashi = 3;
              monitor.bookReload(false,true);
            }
          };
          this.sceneItems.push(_tagSetteiText3);
          
          let _tagSetteiText4 = new Text("設定なし", 680 + 90 * 3, 60 + 80 * i + 30, 20);
          _tagSetteiText4.tagNum = _tagNum;
          if (this.tagShiboriSetteiTagNashi != 0) _tagSetteiText4.color = "gray";
          if (this.tagShiboriSetteiTagNashi == 0) _tagSetteiText4.color = "white";
          _tagSetteiText4.touchevent = () => {
            if (_tagSetteiText4.isTouched(touch)[0] == "touchstart" && _tagSetteiText4.isTouched(touch)[1] == true && this.wait == 0) {
              this.wait = 1;
              setTimeout(() => { this.wait = 0 }, 100);
              this.tagShiboriSetteiTagNashi = 0;
              monitor.bookReload(false,true);
            }
          };
          this.sceneItems.push(_tagSetteiText4);
        }
      }
      
      let tagPageText = new Text(this.tagPage,680+220 + 40,60+50*6+30 +20,20);
      this.sceneItems.push(tagPageText);
      let leftButton = new Text("<",680 + 220,60+50*6+30,50);
      leftButton.touchevent = ()=>{
        if(leftButton.isTouched(touch)[0] = "touchstart" && leftButton.isTouched(touch)[1] == true && this.wait == 0){
          this.wait = 1;
          setTimeout(()=>{this.wait = 0;},100);
          this.tagPage--;
          if(this.tagPage < 1)this.tagPage = this.tagMaxPage;
          this.setScene(this.scene);
          monitor.update();
        }
      };
      this.sceneItems.push(leftButton);
      
      let rightButton = new Text(">", 680 + 220 +70, 60 + 50 * 6 + 30, 50);
      rightButton.touchevent = () => {
        if (rightButton.isTouched(touch)[0] = "touchstart" && rightButton.isTouched(touch)[1] == true && this.wait == 0) {
          this.wait = 1;
          setTimeout(() => { this.wait = 0; }, 100);
          this.tagPage++;
          if (this.tagPage > this.tagMaxPage) this.tagPage = 1;
          this.setScene(this.scene);
          monitor.update();
        }
      };
      this.sceneItems.push(rightButton);
      
      
      let _txtB = new Text("(←戻る)", 680, 60 + 50 * 6 + 40, 22);
      _txtB.touchevent = () => {
        if (_txtB.isTouched(touch)[0] == "touchstart" && _txtB.isTouched(touch)[1] == true && this.wait == 0) {
          this.wait = 1;
          setTimeout(() => { this.wait = 0; }, 100);
          this.setScene(1);
          monitor.update();
        }
      };
      this.sceneItems.push(_txtB);
      
    }else if (_sceneNum == 4) {
      this.sceneItems = [];
      
      let _txt = new Text("ノウハウ絞りこみ設定の表示",680,60,20);
      this.sceneItems.push(_txt);
      
      let _hyoujiTxt = new Text("表示",680,60+30,20);
      if(monitor.gamen[2].showNouhauShiboriSettei == false)_hyoujiTxt.color = "gray";
      if(monitor.gamen[2].showNouhauShiboriSettei == true)_hyoujiTxt.color = "white";
      _hyoujiTxt.touchevent = ()=>{
        if(_hyoujiTxt.isTouched(touch)[0] == "touchstart" && _hyoujiTxt.isTouched(touch)[1] == true && this.wait == 0){
          this.wait = 1;
          setTimeout(()=>{this.wait = 0},100);
          monitor.gamen[2].showNouhauShiboriSettei = true;
          monitor.bookReload();
        }
      };
      this.sceneItems.push(_hyoujiTxt);
      
      let _hihyoujiTxt = new Text("非表示", 680 + 120, 60 + 30, 20);
      if (monitor.gamen[2].showNouhauShiboriSettei == true) _hihyoujiTxt.color = "gray";
      if (monitor.gamen[2].showNouhauShiboriSettei == false) _hihyoujiTxt.color = "white";
      _hihyoujiTxt.touchevent = () => {
        if (_hihyoujiTxt.isTouched(touch)[0] == "touchstart" && _hihyoujiTxt.isTouched(touch)[1] == true && this.wait == 0) {
          this.wait = 1;
          setTimeout(() => { this.wait = 0 }, 100);
          monitor.gamen[2].showNouhauShiboriSettei = false;
          monitor.bookReload();
        }
      };
      this.sceneItems.push(_hihyoujiTxt);
      
      let _hihyoujiJogai = new Text("非表示中の引き継ぎノウハウをすべて除外設定にする(許容ノウハウを除く)",680,60+50*2 ,20);
      _hihyoujiJogai.max = 19;
      _hihyoujiJogai.touchevent = ()=>{
        if(_hihyoujiJogai.isTouched(touch)[0] == "touchstart" && _hihyoujiJogai.isTouched(touch)[1] == true && this.wait == 0){
          this.wait = 1;
          setTimeout(() => { this.wait = 0 }, 100);
          let con = window.confirm("表示設定されていない引き継ぎノウハウ(許容ノウハウを除く)をすべて除外設定にしますか?");
          if(con == false)return;
          
          let kyoyouNouhaus = [];
          if(user.kyoyouNouhauSettei[0] == 1)kyoyouNouhaus.push("頭ノウハウ");
          if(user.kyoyouNouhauSettei[0] == 1)kyoyouNouhaus.push("ファンの声援");
          if(user.kyoyouNouhauSettei[0] == 1)kyoyouNouhaus.push("S.T.E.P.目標達成");
          if(user.kyoyouNouhauSettei[0] == 1)kyoyouNouhaus.push("S.T.E.P.エキシビジョンマッチ");
          
          for (var i = 0; i < monitor.gamen[2].nouhauShiboriSettei.length; i++) {
            if(nouhau[i].canHikitsugi == true && this.hyoujiSettei.includes(i +1) == false &&kyoyouNouhaus.includes (nouhau[i].type) == false){
              monitor.gamen[2].nouhauShiboriSettei[i][2] = 1;
            }
          }
          monitor.bookReload(false,true);
        }
      };
      this.sceneItems.push(_hihyoujiJogai);
      
      let _hissuClear = new Text("必須設定をクリア",680,190+50*1,20);
      _hissuClear.touchevent = ()=>{
        if(_hissuClear.isTouched(touch)[0] == "touchstart" && _hissuClear.isTouched(touch)[1] == true && this.wait == 0){
          this.wait =1;
          setTimeout(() => { this.wait = 0 }, 100);
          let con = window.confirm("必須設定にしたノウハウをすべて戻しますか?");
          if (con == false) return;
          
          for (var i = 0; i < monitor.gamen[2].nouhauShiboriSettei.length; i++) {
            if (monitor.gamen[2].nouhauShiboriSettei[i][0] == 1) {
              monitor.gamen[2].nouhauShiboriSettei[i][0] = 0;
            }
          }
          monitor.bookReload(false,true);
        }
      };
      this.sceneItems.push(_hissuClear);
      
      let _kouhoClear = new Text("候補設定をクリア", 680, 190 + 50 * 2, 20);
      _kouhoClear.touchevent = () => {
        if (_kouhoClear.isTouched(touch)[0] == "touchstart" && _kouhoClear.isTouched(touch)[1] == true && this.wait == 0) {
          this.wait = 1;
          setTimeout(() => { this.wait = 0 }, 100);
          let con = window.confirm("候補設定にしたノウハウをすべて戻しますか?");
          if (con == false) return;
      
          for (var i = 0; i < monitor.gamen[2].nouhauShiboriSettei.length; i++) {
            if (monitor.gamen[2].nouhauShiboriSettei[i][0] == 2) {
              monitor.gamen[2].nouhauShiboriSettei[i][0] = 0;
            }
          }
          monitor.bookReload(false, true);
        }
      };
      this.sceneItems.push(_kouhoClear);
      
      let _jogaiClear = new Text("除外設定をクリア", 680, 190 + 50 * 3, 20);
      _jogaiClear.touchevent = () => {
        if (_jogaiClear.isTouched(touch)[0] == "touchstart" && _jogaiClear.isTouched(touch)[1] == true && this.wait == 0) {
          this.wait = 1;
          setTimeout(() => { this.wait = 0 }, 100);
          let con = window.confirm("除外設定にしたノウハウをすべて戻しますか?");
          if (con == false) return;
      
          for (var i = 0; i < monitor.gamen[2].nouhauShiboriSettei.length; i++) {
            if (monitor.gamen[2].nouhauShiboriSettei[i][2] == 1) {
              monitor.gamen[2].nouhauShiboriSettei[i][2] = 0;
            }
          }
          monitor.bookReload(false, true);
        }
      };
      this.sceneItems.push(_jogaiClear);
      
      let _txtB = new Text("(←戻る)", 680, 60 + 50 * 6 + 40, 22);
      _txtB.touchevent = () => {
        if (_txtB.isTouched(touch)[0] == "touchstart" && _txtB.isTouched(touch)[1] == true && this.wait == 0) {
          this.wait = 1;
          setTimeout(() => { this.wait = 0; }, 100);
          this.setScene(1);
          monitor.update();
        }
      };
      this.sceneItems.push(_txtB);
      
    }else if(_sceneNum == 5){
      this.sceneItems = [];
      
      let _txtB = new Text("(←戻る)", 680, 60 + 50 * 6 + 40, 22);
      _txtB.touchevent = () => {
        if (_txtB.isTouched(touch)[0] == "touchstart" && _txtB.isTouched(touch)[1] == true && this.wait == 0) {
          this.wait = 1;
          setTimeout(() => { this.wait = 0; }, 100);
          this.setScene(1);
          monitor.update();
        }
      };
      this.sceneItems.push(_txtB);
      
      this.sceneItems.push(new Rect(680,60,300,300));
      this.sceneItems.push(new Rect(680,60,300/5,300));
      this.sceneItems.push(new Rect(680,60,300*2/5,300));
      this.sceneItems.push(new Rect(680,60,300*3/5,300));
      this.sceneItems.push(new Rect(680,60,300*4/5,300));
      this.sceneItems.push(new Rect(680,60,300,300/5));
      this.sceneItems.push(new Rect(680,60,300,300*2/5));
      this.sceneItems.push(new Rect(680,60,300,300*3/5));
      this.sceneItems.push(new Rect(680,60,300,300*4/5));
      for (var i = 0; i < this.nouhauHyoujiSetteiBunkatsuSetteiTate.length; i++) {
        let _x = i % 4;
        let _y = Math.floor(i/ 4);
        let _button = new Rect(680+ 50 + 60*_x ,60 + 20 + 60*_y,20,20,false);
        if(this.nouhauHyoujiSetteiBunkatsuSetteiTate[i] == 0)_button.color = "gray";
        _button.num = i;
        _button.touchevent = ()=>{
          if(_button.isTouched(touch)[0] = "touchstart" && _button.isTouched(touch)[1] == true && this.wait == 0){
            this.wait = 1;
            setTimeout(()=>{this.wait = 0},100);
            this.nouhauHyoujiSetteiBunkatsuSetteiTate[_button.num] = 1- this.nouhauHyoujiSetteiBunkatsuSetteiTate[_button.num];
            monitor.bookReload();
          }
        };
        this.sceneItems.push(_button);
      }
      
      for (var i = 0; i < this.nouhauHyoujiSetteiBunkatsuSetteiYoko.length; i++) {
        let _x = i % 5;
        let _y = Math.floor(i / 5);
        let _button = new Rect(680 + 20 + 60 * _x, 60 + 50 + 60 * _y, 20, 20,false);
        if (this.nouhauHyoujiSetteiBunkatsuSetteiYoko[i] == 0) _button.color = "gray";
        _button.num = i;
        _button.touchevent = () => {
          if (_button.isTouched(touch)[0] = "touchstart" && _button.isTouched(touch)[1] == true && this.wait == 0) {
            this.wait = 1;
            setTimeout(() => { this.wait = 0 }, 100);
            this.nouhauHyoujiSetteiBunkatsuSetteiYoko[_button.num] = 1 - this.nouhauHyoujiSetteiBunkatsuSetteiYoko[_button.num];
            monitor.bookReload();
          }
        };
        this.sceneItems.push(_button);
      }
      
    }else if(_sceneNum == 6){
      //許容ノウハウ設定
      this.sceneItems = [];
      
      let _txtB = new Text("(←戻る)", 680, 60 + 50 * 6 + 40, 22);
      _txtB.touchevent = () => {
        if (_txtB.isTouched(touch)[0] == "touchstart" && _txtB.isTouched(touch)[1] == true && this.wait == 0) {
          this.wait = 1;
          setTimeout(() => { this.wait = 0; }, 100);
          this.setScene(1);
          monitor.update();
        }
      };
      this.sceneItems.push(_txtB);
      
      let kyoyouNouhaus = ["頭ノウハウ","ファンの声援","目標達成","エキシビジョンマッチ"];
      for (var i = 0; i < kyoyouNouhaus.length; i++) {
        let _txt = new Text(kyoyouNouhaus[i], 680, 60 + 50 * i, 22);
        _txt.setteiNum = i;
        if (user.kyoyouNouhauSettei[i] != 1) _txt.color = "gray";
        if (user.kyoyouNouhauSettei[i] == 1) _txt.color = "white";
        _txt.touchevent = () => {
          if (_txt.isTouched(touch)[0] == "touchstart" && _txt.isTouched(touch)[1] == true && this.wait == 0) {
            this.wait = 1;
            setTimeout(() => { this.wait = 0; }, 100);
            if (user.kyoyouNouhauSettei[_txt.setteiNum] != 1) {
              user.kyoyouNouhauSettei[_txt.setteiNum] = 1;
            } else {
              user.kyoyouNouhauSettei[_txt.setteiNum] = 0;
            }
            monitor.bookReload();
          }
        };
        this.sceneItems.push(_txt);
      }
    }
  }
  
  update() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(640 + 448 - wakusenWidth/2, 0, wakusenWidth, canvas.height);
    ctx.closePath();
    
    super.update();
  }
}

class Gamen3 extends Gamen{
  constructor() {
    super();
    this.width = 192;
    this.left = 1088;
    
    this.sceneNames = [
              "user.booksの中身が0個",
              "ノウハウ一覧画面"
            ];
    
    this.flag = 0;
    this.wait = 0;
    
    this.showNouhauShiboriSettei = false;
    
    this.page = 1;
    this.nouhausuuOnOnePage = 10;
    this.maxpage = Math.ceil(nouhau.length / this.nouhausuuOnOnePage);
    
    this.nouhauShiboriSettei = [];  //nouhauの順番に[setteiNum(0:設定なし、1:必須、2:候補),lvNum(lv何以上か),setteiNum(0:設定なし、1:除外),lvNum(lv何以下か)]をいれていく。
    for (var i = 0; i < nouhau.length; i++) {
      this.nouhauShiboriSettei.push([0,5,0,6]);
    }
    
    if (user.books.length == 0) {
      this.setScene(0);
    } 
    
  }
  
  bookReload(){
    if(this.flag == 0 && user.books.length > 0){
      this.flag = 1;
      this.setScene(1);
    }else{
      this.setScene(this.scene);
    }
  }
  
  setScene(_sceneNum){
    this.scene = _sceneNum;
    if(_sceneNum == 1){
      this.sceneItems = [];
      
      //上下ボタンの表示
      let _upButton = new Rect(1090,2,188,26);
      _upButton.touchevent =()=>{
        if(_upButton.isTouched(touch)[0] == "touchstart" && _upButton.isTouched(touch)[1] == true && this.wait == 0){
          this.wait = 1;
          setTimeout(()=>{this.wait = 0;},100);
          this.page--;
          if(this.page <=0)this.page = this.maxpage;
          this.setScene(this.scene);
          monitor.update();
        }
      }
      this.sceneItems.push(new Text("▲",1090 + 188 /2 -10,2 +2));
      this.sceneItems.push(new Text("▼",1090 + 188 /2 -10,960 - 2 - 20 -2));
      let _downButton = new Rect(1090, 960 - 2 - 26, 188, 26);
      _downButton.touchevent = () => {
        if (_downButton.isTouched(touch)[0] == "touchstart" && _downButton.isTouched(touch)[1] == true && this.wait == 0) {
          this.wait = 1;
          setTimeout(() => { this.wait = 0; }, 100);
          this.page++;
          if (this.page > this.maxpage) this.page = 1;
          this.setScene(this.scene);
          monitor.update();
        }
      }
      this.sceneItems.push(_upButton);
      this.sceneItems.push(_downButton);
      
      //ノウハウ一覧の表示
      for(let _num = 0;_num < this.nouhausuuOnOnePage; _num++){
        if(this.page == this.maxpage && nouhau.length - this.nouhausuuOnOnePage *(this.page -1)-1 < _num )continue;
        let _nouhauNum = _num + this.nouhausuuOnOnePage *(this.page -1);
        
        let _rect = new Rect(1090, 30 + (900 / this.nouhausuuOnOnePage) * _num , 188,900 / this.nouhausuuOnOnePage -2);
        this.sceneItems.push(_rect);
        let _img = new Sprite(nouhauImages[_nouhauNum],1090 + 10,30 + (900 / this.nouhausuuOnOnePage) * _num + 10);
        _img.nouhauNum = _nouhauNum +1;  //nouhau[0]のノウハウは、_img.nouhauNum==1。ひとつずれる。
        _img.touchevent = () =>{
          if(_img.isTouched(touch)[0] == "touchstart" && _img.isTouched(touch)[1] == true){
            if(monitor.gamen[1].selectedSettei != 0){
              //すでに同じノウハウがhyoujisetteiにあるならなにもしない
              let _haveSameNouhau = false;
              for (var i = 0; i < monitor.gamen[1].hyoujiSettei.length; i++) {
                if(monitor.gamen[1].hyoujiSettei[i] == _img.nouhauNum)_haveSameNouhau = true;
              }
              if(_haveSameNouhau == true)return;
              
              //hyoujisetteiに反映させる処理
              monitor.gamen[1].hyoujiSettei[monitor.gamen[1].selectedSettei -1] = _img.nouhauNum ;
              user.hyoujis[monitor.gamen[1].hyoujiNum -1][monitor.gamen[1].selectedSettei -1] = _img.nouhauNum;
              monitor.gamen[1].selectedSettei = 0;
              monitor.bookReload(false,true);
            }
          }
        }
        this.sceneItems.push(_img);
        
        if(this.showNouhauShiboriSettei == true){
          //ノウハウ絞りこみ設定の表示
          let _thisSettei = this.nouhauShiboriSettei[_nouhauNum];
          let mongon1 = ["ーー","必須","候補"];
          
          let _setteiTxt1 = new Text(mongon1[ _thisSettei[0] ],1090 + 64+20, 30 + (900 / this.nouhausuuOnOnePage) * _num +11);
          _setteiTxt1.touchevent = ()=>{
            if(_setteiTxt1.isTouched(touch)[0] == "touchstart" && _setteiTxt1.isTouched(touch)[1] == true && this.wait == 0){
              this.wait = 1;
              setTimeout(()=>{this.wait = 0},100);
              let x = _thisSettei[0];
              x++;
              if(x >2)x = 0;
              _thisSettei[0] = x;
              monitor.bookReload(false,true);
            }
          };
          this.sceneItems.push(_setteiTxt1);
          let _lvTxt1 = new Text("Lv" +  _thisSettei[1] + "~",1090 + 64+20 + 50, 30 + (900 / this.nouhausuuOnOnePage) * _num +11);
          _lvTxt1.touchevent = ()=>{
            if (_lvTxt1.isTouched(touch)[0] == "touchstart" && _lvTxt1.isTouched(touch)[1] == true && this.wait == 0){
              this.wait = 1;
              setTimeout(() => { this.wait = 0 }, 100);
              let x =  _thisSettei[1];
              x++;
              if(x > 6)x = 1;
              _thisSettei[1] = x;
              monitor.bookReload(false,true);
            }
          };
          this.sceneItems.push(_lvTxt1);
          
          let mongon2 = ["ーー", "除外"];
          
          let _setteiTxt2 = new Text(mongon2[_thisSettei[2]], 1090 + 64 + 20, 30 + (900 / this.nouhausuuOnOnePage) * _num + 11 +42);
          _setteiTxt2.touchevent = () => {
            if (_setteiTxt2.isTouched(touch)[0] == "touchstart" && _setteiTxt2.isTouched(touch)[1] == true && this.wait == 0) {
              this.wait = 1;
              setTimeout(() => { this.wait = 0 }, 100);
              let x = _thisSettei[2];
              x++;
              if (x > 1) x = 0;
              _thisSettei[2] = x;
              monitor.bookReload(false,true);
            }
          };
          this.sceneItems.push(_setteiTxt2);
          let _lvTxt2 = new Text("~Lv" + _thisSettei[3] , 1090 + 64 + 20 + 50, 30 + (900 / this.nouhausuuOnOnePage) * _num + 11 +42);
          _lvTxt2.touchevent = () => {
            if (_lvTxt2.isTouched(touch)[0] == "touchstart" && _lvTxt2.isTouched(touch)[1] == true && this.wait == 0) {
              this.wait = 1;
              setTimeout(() => { this.wait = 0 }, 100);
              let x = _thisSettei[3];
              x++;
              if (x > 6) x = 1;
              _thisSettei[3] = x;
              monitor.bookReload(false,true);
            }
          };
          this.sceneItems.push(_lvTxt2);
          
          
        }
      }
    }
  }
  
  update() {
    super.update();
  }
}

let monitor = new Monitor();
monitor.gamen = [null , new Gamen2() , new Gamen3()];
monitor.gamen[0] = new Gamen1();
//canvas.addEventListener('touchstart', () => { monitor.touchevent() });
canvas.addEventListener('mousedown', () => { monitor.touchevent() });



function readjson1() {
  var result = window.confirm('上書き読み込みをしますか?\n現在のデータは失われます。');
  if (result == false) { return; }

  var file = $('uploadfileInput1').files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    let res = JSON.parse(e.target.result);
    //反映する
    user.tags = res[0];
    user.books = res[1];
    user.hyoujis = res[2];
    userOkiba = [];
    monitorOkiba = [];
    monitor.gamen[1].tagShiboriSettei = [];
    monitor.bookReload(true);
    tagHanei();
    bookTourokuInputReset();
    window.alert("読み込み成功");

  };
  reader.onerror = () => {
    window.alert("読み込みに失敗しました");
  }
  reader.readAsText(file);
}

function readjson2(){
  var result = window.confirm('追加読み込みをしますか?\n登録されているタグ数がより多いデータは読み込めません。\n登録されているタグ名が異なる場合、現在登録されているものに置き換わります。');
  if (result == false) { return; }
  
  var file = $('uploadfileInput2').files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    let res = JSON.parse(e.target.result);
    if(res[0].length > user.tags.length){
      window.alert("タグの登録数が現在の登録数より多いため読み込めませんでした。");
      return;
    }
    //反映する
    if(userOkiba.length > 0){
      //サンプルモードを終える
      user = userOkiba[0];
      userOkiba = [];
      monitor = monitorOkiba[0];
      monitorOkiba = [];
      tagHanei();
      bookTourokuInputReset();
      window.alert("サンプルモードを終了しました")
    }
    user.books = user.books.concat(res[1]);
    monitor.bookReload(true);
    monitor.update();
    window.alert("読み込み成功");
    
  
  };
  reader.onerror = ()=>{
    window.alert("読み込みに失敗しました");
  }
  reader.readAsText(file);
}

function downloadJson() {
  let _keikoku = window.confirm("jsonファイルをダウンロードしますか?");
  if(_keikoku == false)return;
  
  //ファイル名に使用するため日時の文字列を取得
  let dateTxt = "";
  let date = new Date(); 
  let theYear = date.getFullYear() ;
  let theMonth = date.getMonth() +1;
  if(theMonth < 10)theMonth = "0" + theMonth;
  let theDate = date.getDate() ;
  if(theDate < 10)theDate = "0" + theDate;
  let theHours = date.getHours();
  if(theHours < 10)theHours = "0" + theHours;
  let theMinutes = date.getMinutes(); 
  if(theMinutes < 10)theMinutes = "0" + theMinutes;
  dateTxt += "" + theYear; 
  dateTxt += "" + theMonth; 
  dateTxt += "" + theDate; 
  dateTxt += "" + theHours; 
  dateTxt += "" + theMinutes; 
  
  let _user = user;
  if(userOkiba.length > 0){
    //サンプルモードならuserOkiba[0]を用いる
    _user = userOkiba[0];
  }
  _books = [];
  for (var b = 0; b < _user.books.length; b++) {
    //削除されたbookは除外する
    if(_user.books[b] != null)_books.push(_user.books[b]);
  }
  
  let booklength = _books.length;
  const booksuuAtOneJsonFile = 50;
  let num = Math.ceil(booklength / booksuuAtOneJsonFile);
  
  let downLoadLink = document.createElement("a");
  
  for(var i=0;i<num;i++){
    let startNum = booksuuAtOneJsonFile * i ;
    let lastNum = booksuuAtOneJsonFile * (i +1) -1;
    if(i == num -1 && _books.length % booksuuAtOneJsonFile != 0)lastNum = _books.length -1;
    let _book = [];
    for (var j = startNum ; j <= lastNum; j++) {
      _book.push(_books[j]);
    }
    let _userdate = [
      [].concat(_user.tags),
      [].concat(_book),
      [].concat(_user.hyoujis)
    ];
    const resultJson = JSON.stringify(_userdate);
    
    downLoadLink.download = "nouhauKanriData" + dateTxt + "(" + (i +1) + ").json";
    downLoadLink.href = URL.createObjectURL(new Blob([resultJson], { type: "application/json" }));
    downLoadLink.dataset.downloadurl = ["text/plain", downLoadLink.download, downLoadLink.href].join(":");
    downLoadLink.click();
  }
  document.body.removeChild(downLoadLink);
  return;
  
  
  //const blob = new Blob([json], { type: 'application/json' });

  // a 要素の href 属性に Object URL を セット
  //event.currentTarget.href = window.URL.createObjectURL(blob);
}


function tagTouroku(){
  let newTagName = $("tagTourokuInput").value;
  if(newTagName == "")return;
  if(user.tags.includes(newTagName)){window.alert("すでに同じ名前のタグが存在します");return;}
  if(user.tags.length >= 20){
    window.alert("タグの登録数が上限に達しています。");
    return;
  }
  if(newTagName.includes("<") || newTagName.includes(">") || newTagName.includes("$") || newTagName.includes("'") || newTagName.includes('"') ||newTagName.includes("`")){
    window.alert("以下の文字は使えません\n < > $ ' " + ' " `');
    return;
  }
  
  user.tags.push(newTagName);
  $("tagTourokuInput").value = "";
  tagHanei(user.tags.length -1);
  monitor.bookReload();
}

function tagHanei(){
  //tagNumは0~19。user.tagsに対応
  let _txt1 = "";
  let _txt2 = "";
  for (var i = 0; i < user.tags.length; i++) {
    _txt1 += user.tags[i] +"<br><input type='text' id='tagHenkouInput" + i +  "' maxlength='12' placeholder='最大文字数は12文字です'><button id='tagHenkouButton" + i +"' onclick='tagHenkou(" + i +")'>タグ名を変更</button>" + "<hr>";
    _txt2 += "<option value = '" + i + "'>" + user.tags[i] + "</option>";
    
  }
  $("tagIchiranDiv").innerHTML = _txt1;
  $("bookTourokuTagSelect").innerHTML = _txt2;
  monitor.tagHanei();
}

function tagHenkou(tagNum){
  let newTagName = $("tagHenkouInput" + tagNum).value;
  if (newTagName == "") return;
  if (user.tags.includes(newTagName)) {window.alert("すでに同じ名前のタグが存在します");return;}
  if (newTagName.includes("<") || newTagName.includes(">") || newTagName.includes("$") || newTagName.includes("'") || newTagName.includes('"') || newTagName.includes("`")) {
    window.alert("以下の文字は使えません\n < > $ ' " + ' " `');
    return;
  }
  
  user.tags[tagNum] = newTagName;
  $("tagHenkouInput" + tagNum).value = "";
  tagHanei();
  monitor.bookReload();
  
}

function bookTourokuNouhauTouroku(){
  let _nouhauNum = Number($("bookTourokuNouhauNameSelect").value);
  let _nouhauLv = Number($("bookTourokuNouhauLv").value);
  let _nouhauType = nouhau[_nouhauNum].type;
  let _isOnlyNouhauType = false; //同typeのノウハウを複数持っていいノウハウかどうか
  if(onlyNouhauTypes.includes(_nouhauType))_isOnlyNouhauType = true;
  
  if(bookTourokuJouhou.nouhauNums.includes(_nouhauNum))return; //すでに同じノウハウが登録されていたら何もしない
  if (_isOnlyNouhauType == true){
    let _haveSameTypeNouhau = false;
    for (var i = 0; i < bookTourokuJouhou.nouhauNums.length; i++) {
      if(bookTourokuJouhou.nouhauNums[i] == null)continue;
      if(nouhau[bookTourokuJouhou.nouhauNums[i]].type == _nouhauType)_haveSameTypeNouhau = true;
    }
    if(_haveSameTypeNouhau == true)return;
  } 
  
  //ノウハウが21個登録されているか確認する
  let _nouhausuu = 0;
  for (var i = 0; i < bookTourokuJouhou.nouhau.length; i++) {
    if (bookTourokuJouhou.nouhau[i] != null) _nouhausuu++;
  }
  if (_nouhausuu >= 21) {
    window.alert("ひとつのノウハウブックに登録できるノウハウは21個までです。");
    return;
  }
    
  //ノウハウ追加
  bookTourokuJouhou.nouhauNums.push(_nouhauNum);
  bookTourokuJouhou.nouhau.push([_nouhauNum,_nouhauLv]);
  
  //表示
  let _txt = "";
  let _sakujoNum = bookTourokuJouhou.nouhauNums.length -1;
  _txt += "<div id='tourokuNouhauDiv" + _sakujoNum + "'> <button onclick='tourokuNouhauSakujo( " + _sakujoNum + ")'>削除</button>"
  _txt += "   Lv" + _nouhauLv + " " + nouhau[_nouhauNum].name + "</div>";
  $("tourokuNouhauIchiranDiv").innerHTML += _txt;
}

function tourokuNouhauSakujo(_num){
  bookTourokuJouhou.nouhauNums[_num] = null;
  bookTourokuJouhou.nouhau[_num] = null;
  $("tourokuNouhauDiv" + _num).remove();
}

function bookTourokuTagTouroku(){
  if(user.tags.length == 0)return;
  let _tagNum = Number($("bookTourokuTagSelect").value);
  if(_tagNum == null || _tagNum == undefined)return;
  if(bookTourokuJouhou.tag.includes(_tagNum))return;
  //タグが5つ登録されているか確認する
  let _tagsuu = 0;
  for (var i = 0; i < bookTourokuJouhou.tag.length; i++) {
    if(bookTourokuJouhou.tag[i] != null)_tagsuu++;
  }
  if(_tagsuu >= 5){
    window.alert("ひとつのノウハウブックに登録できるタグは5つまでです。");
    return;
  }
  
  bookTourokuJouhou.tag.push(_tagNum);
  let _txt = "";
  let _sakujoNum = bookTourokuJouhou.tag.length -1;
  _txt += "<div id='tourokuTagDiv" + _sakujoNum + "'> <button onclick='tourokuTagSakujo( " + _sakujoNum + ")'>削除</button>"
  _txt += user.tags[_tagNum] + "</div>";
  $("tourokuTagIchiranDiv").innerHTML += _txt;
}

function tourokuTagSakujo(_num) {
  bookTourokuJouhou.tag[_num] = null;
  $("tourokuTagDiv" + _num).remove();
}

function bookTouroku(){
  let _keikoku = window.confirm("新たにノウハウブックを登録します");
  if(_keikoku == false) return;
  
  let _book = new Book();
  _book.charactor = Number($("bookTourokuCharactorSelect").value);
  _book.date = [Number($("bookTourokuNen").value),Number($("bookTourokuGatsu").value),Number($("bookTourokuNichi").value)];
  _book.vo= Number($("bookTourokuVo").value);
  _book.da= Number($("bookTourokuDa").value);
  _book.vi= Number($("bookTourokuVi").value);
  _book.me= Number($("bookTourokuMe").value);
  let x = bookTourokuJouhou.tag.length;
  for (var i = 0; i < x; i++) {
    if(bookTourokuJouhou.tag[i] != null)_book.tag.push(bookTourokuJouhou.tag[i]);
  }
  let y = bookTourokuJouhou.nouhau.length;
  for (var i = 0; i < y; i++) {
    if (bookTourokuJouhou.nouhau[i] != null) _book.nouhau.push([].concat([bookTourokuJouhou.nouhau[i][0],bookTourokuJouhou.nouhau[i][1]]));
  }
  //タグ及びノウハウを順番になるように入れ換える
  let tagX = _book.tag.length -1;
  if(tagX > 0){
    while(tagX >0){
      for (var i = 0; i < tagX; i++) {
        if(_book.tag[_book.tag.length -1 - i] < _book.tag[_book.tag.length -1 -i -1]){
          let karioki = _book.tag[_book.tag.length -1 -i];
          _book.tag[_book.tag.length -1 -i] = _book.tag[_book.tag.length -1 -i -1];
          _book.tag[_book.tag.length -1 -i -1] = karioki;
        }
      }
      tagX--;
    }
  }
  let nouhauX = _book.nouhau.length - 1;
  if (nouhauX > 0) {
    while (nouhauX > 0) {
      for (var i = 0; i < nouhauX; i++) {
        if (_book.nouhau[_book.nouhau.length - 1 - i][0] < _book.nouhau[_book.nouhau.length - 1 - i - 1][0]) {
          let karioki =[ _book.nouhau[_book.nouhau.length - 1 - i][0] , _book.nouhau[_book.nouhau.length - 1 - i][1] ];
          _book.nouhau[_book.nouhau.length - 1 - i] =[ _book.nouhau[_book.nouhau.length - 1 - i - 1][0] , _book.nouhau[_book.nouhau.length - 1 - i - 1][1] ];
          _book.nouhau[_book.nouhau.length - 1 - i - 1] = karioki;
        }
      }
      nouhauX--;
    }
  }
  
  user.addBook(_book);
  window.alert("登録しました");
  monitor.bookReload(true);
}

function bookTourokuInputResetButton(){
  let _keikoku = window.confirm("入力されている内容をリセットします");
  if (_keikoku == false) return;
  bookTourokuInputReset();
}


function bookTourokuInputReset(){
  
  $("bookTourokuCharactorSelect").value = 0;
  $("bookTourokuNen").value = "";
  $("bookTourokuGatsu").value = "";
  $("bookTourokuNichi").value = "";
  $("bookTourokuVo").value = "";
  $("bookTourokuDa").value = "";
  $("bookTourokuVi").value = "";
  $("bookTourokuMe").value = "";
  $("tourokuNouhauIchiranDiv").innerHTML = "";
  $("tourokuTagIchiranDiv").innerHTML = "";
  bookTourokuJouhou = new BookTourokuJouhou();
  
}




  //indexedDBに関する処理
function indexedDBRead(){

  var dbName = 'nouhauBookKanri_DB';
  var dbVersion = 1;
  var kerValue = 'userData';

  var openReq = indexedDB.open(dbName,dbVersion);
  //　DB名を指定して接続。DBがなければ新規作成される。

  
  openReq.onsuccess = function(event) {
   //onupgradeneededの後に実行。更新がない場合はこれだけ実行
    console.log('db open success');
    var storeName = 'nouhauBookKanriUser';
    var db = event.target.result;
    var trans = db.transaction(storeName, 'readonly');
    var store = trans.objectStore(storeName);
    var getReq = store.get('userData');
  
    getReq.onsuccess = function(event) {
      let  _data = event.target.result.data; // event.resultは{id : 'userData', data : [userObj,nouhauShiboriSettei]}
      if(userOkiba.length > 0)userOkiba = [];
      //_data[0].booksの中身から、削除されたbookを取り除く。nullになっている。
      let _cleanedBooks = [];
      for (var k = 0; k < _data[0].books.length; k++) {
        if(_data[0].books[k] != null)_cleanedBooks.push(_data[0].books[k]);
      }
      _data[0].books = _cleanedBooks;
      
      user =  Object.assign(new User(), _data[0]);
      if(_data.length >= 2)monitor.gamen[2].nouhauShiboriSettei = _data[1];
      if(_data.length >= 4){
        monitor.gamen[1].nouhauHyoujiSetteiBunkatsuSetteiTate = [].concat(_data[2]);
        monitor.gamen[1].nouhauHyoujiSetteiBunkatsuSetteiYoko = [].concat(_data[3]);
      }
      tagHanei();
      monitor.bookReload(true);
    }
    
    
  
  
    // 接続を解除する
    db.close();
  }
  openReq.onupgradeneeded = function(event) {
    //onupgradeneededは、DBのバージョン更新(DBの新規作成も含む)時のみ実行
    console.log('db upgrade');
    var db = event.target.result;
    var storeName = 'nouhauBookKanriUser';
    db.createObjectStore(storeName, { keyPath: 'id' })
  }
  openReq.onerror = function(event) {
    // 接続に失敗
    console.log('db open error');
  }

}

function indexedDBAdd(){
  let _con = window.confirm("ブラウザのindexedDBにデータを保存しますか?");
  if(_con == false)return;
  
  var dbName = 'nouhauBookKanri_DB';
  var _user = user;
  var _monitor = monitor;
  if (userOkiba.length > 0) {_user = userOkiba[0];_monitor = monitorOkiba[0]};
  //monitor.gamen[2].nouhauShiboriSetteiも保存する
  let  _data = [_user,_monitor.gamen[2].nouhauShiboriSettei,_monitor.gamen[1].nouhauHyoujiSetteiBunkatsuSetteiTate,_monitor.gamen[1].nouhauHyoujiSetteiBunkatsuSetteiYoko];
  var data = {id:'userData',data:_data};
  
  var storeName = 'nouhauBookKanriUser';
  
  var openReq = indexedDB.open(dbName);
  
  openReq.onsuccess = function(event) {
    var db = event.target.result;
    var trans = db.transaction(storeName, 'readwrite');
    var store = trans.objectStore(storeName);
    var putReq = store.put(data);
  
    putReq.onsuccess = function() {
      console.log('put data success');
    }
  
    trans.oncomplete = function() {
      // トランザクション完了時(putReq.onsuccessの後)に実行
      console.log('transaction complete');
      window.alert("indexedDBへの保存が完了しました");
    }
  
  }
  openReq.onerror = function() {
    // 接続に失敗
    console.log('db open error');
    window.alert("indexedDBを開けませんでした");
  }

}




indexedDBRead();

window.onload = () => {
  let _htmltxt1 = "";
  for (var i = 0; i < charactors.length; i++) {
    _htmltxt1 += "<option value = '" + i + "'>" + charactors[i] + "</option>";
  }
  $("bookTourokuCharactorSelect").innerHTML = _htmltxt1;

  let _htmltxt2 = "";
  for (var i = 0; i < nouhau.length; i++) {
    _htmltxt2 += "<option value = '" + i + "'>" + nouhau[i].name + "</option>";
  }
  $("bookTourokuNouhauNameSelect").innerHTML = _htmltxt2;

  monitor.bookReload();
}
