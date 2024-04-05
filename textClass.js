class Text{
  constructor(text,x = 0,y = 0,size = 20){
    this.text = text;
    
		this.font = "游ゴシック体, 'Yu Gothic', YuGothic, sans-serif";
		//テキストを表示する位置
		this.x = x;
		this.y = y;
		//数値によってテキストを移動させることができる（移動速度）
		this.vx = this.vy = 0;
		//テキストのベースラインの位置
		this.baseline = 'top';
		//テキストのサイズ
		this.size = size;
		//テキストの色
		this.color = '#fff';
		//テキストの太さ
		this.weight = 'normal';
		
		this._width = 0;
		
		this._height = 0;
		
		this.max= 0; //1行当たりの最大文字数を設定できる。改行される。 
		
		this.globalAlpha = 1;
		
		this.hidden = false;
		
		this.tenmetu = 0;  //1を入れたら点滅する。
  }
  
  update(){
    if(this.hidden || this.tenmetu == 4)return;
    if(this.tenmetu == 1){
      this.tenmetu = 2;
      setTimeout( ()=>{
        if(this.tenmetu !=0)this.tenmetu = 3;
      },1000 / (3/2));
    }
    if (this.tenmetu == 3) {
      this.tenmetu = 4;
      setTimeout(() => {
        if(this.tenmetu != 0)this.tenmetu = 1;
      }, 1000 / 5);
      return;
    }
    
    const _ctx = canvas.getContext('2d');
    _ctx.beginPath();
    
    _ctx.font = this.weight + ' ' + this.size + 'px ' + this.font;
    _ctx.fillStyle = this.color;
    _ctx.textBaseline = this.baseline;
    _ctx.globalAlpha = this.globalAlpha;
    
    this._width = _ctx.measureText(this.text).width;
    this._height = Math.abs(_ctx.measureText(this.text).actualBoundingBoxAscent) + Math.abs(_ctx.measureText(this.text).actualBoundingBoxDescent);
    
    if(this.max > 0){
      let howmanylines = Math.ceil( this.text.length / this.max);
      for(let li=0;li<howmanylines;li++){
        let _texts = this.text.substr(li * this.max,this.max);
        _ctx.fillText( _texts ,this.x,this.y + (this._height + 4)*li);
      }
    }else{
      this.render();
    }
    
    _ctx.closePath();
    
    this.onenterframe();
    
    this.x += this.vx;
    this.y += this.vy;
    
  }
  
  render(){
    if (this.x < -1 * this._width || this.x > canvas.width) return;
    if (this.y < -1 * this._height || this.y > canvas.height + this._height) return;
    //テキストを表示
    ctx.fillText(this.text,this.x,this.y);
  }
  
  onenterframe(){}
  
  touchevent(){}
  
  gethani(){
    const _ctx = canvas.getContext('2d');
    _ctx.beginPath();
    
    _ctx.font = this.weight + ' ' + this.size + 'px ' + this.font;
    _ctx.textBaseline = this.baseline;
    
    this._width = _ctx.measureText(this.text).width;
    this._height = Math.abs(_ctx.measureText(this.text).actualBoundingBoxAscent) + Math.abs(_ctx.measureText(this.text).actualBoundingBoxDescent);
    _ctx.closePath();
    
    if(this.max == 0)return [this.x,this.x + this._width,this.y,this.y + this._height];
    
    //this.max>0の場合
    let howmanylines = Math.ceil(this.text.length / this.max);
    let re = [this.x,0,this.y,this.y + (this._height + 4) * howmanylines];
    for (let li = 0; li < howmanylines; li++) {
      let _texts = this.text.substr(li * this.max, this.max);
     // _ctx.fillText(_texts, this.x, this.y + (this._height + 4) * li);
     _ctx.beginPath();
     
     _ctx.font = this.weight + ' ' + this.size + 'px ' + this.font;
     _ctx.textBaseline = this.baseline;
     
     re[1] = Math.max(Number( _ctx.measureText(_texts).width ) ,re[1] );
     if(li == howmanylines -1){
       re[3] += Math.abs(_ctx.measureText(_texts).actualBoundingBoxAscent) + Math.abs(_ctx.measureText(_texts).actualBoundingBoxDescent);
     }
     _ctx.closePath();
    }
    re[1] += this.x;
    return re;
  }

  isTouched(_touch){
    let t = false;
    if(_touch.x >= this.gethani()[0] &&
       _touch.x <= this.gethani()[1] &&
       _touch.y >= this.gethani()[2] &&
       _touch.y <= this.gethani()[3])t=true;
    return [_touch.type,t];
    

  }
  
  returnWidthAndHeight(){
        const _ctx = canvas.getContext('2d');
        _ctx.beginPath();
    
        _ctx.font = this.weight + ' ' + this.size + 'px ' + this.font;
        _ctx.textBaseline = this.baseline;
    
        this._width = _ctx.measureText(this.text).width;
        this._height = Math.abs(_ctx.measureText(this.text).actualBoundingBoxAscent) + Math.abs(_ctx.measureText(this.text).actualBoundingBoxDescent);
        _ctx.closePath();
        return[this._width,this._height];
  }
}

class Sprite {
  constructor(imgobj , x = 0, y = 0) {
    this.img = imgobj
    this.x = x;
    this.y = y;
    this.width = this.img.width;
    this.height = this.img.height;
    this.hidden = false;
    this.vx = this.vy = 0; //移動速度
    this.globalAlpha = 1;

  }

  update() {
    if (this.hidden == false) {
      this.onenterframe();
      this.render();


      this.x += this.vx;
      this.y += this.vy;
    }
  }

  render() {
    ctx.beginPath();
    ctx.globalAlpha = this.globalAlpha;
    ctx.drawImage(this.img, this.x, this.y);
    ctx.closePath();

  }
  
  isTouched(_touch) {
    let t = false;
    if (_touch.x >= this.x &&
      _touch.x <= this.x + this.width &&
      _touch.y >= this.y &&
      _touch.y <= this.y + this.width) t = true;
    return [_touch.type, t];
  
  
  }
  
  touchevent(){}

  onenterframe() {}

}

class Rect{
  constructor(x,y,width,height,isStroke = true){
  this.x = x;;
  this.y = y;
  this.width = width;
  this.height = height;
  this.hidden = false;
  this.vx = 0;
  this.vy = 0; //移動速度
  this.globalAlpha = 1;
  this.color = "white";
  this.isStroke = isStroke;
  this.lineWidth = 2;
  }
  
  update() {
    if (this.hidden == false) {
      this.onenterframe();
      this.render();
  
  
      this.x += this.vx;
      this.y += this.vy;
    }
  }
  
  render() {
    ctx.beginPath();
    if(this.isStroke == false){
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.globalAlpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }else{
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.lineWidth;
      ctx.globalAlpha = this.globalAlpha;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    ctx.closePath();
  
  
  }
  
  isTouched(_touch){
    let t = false;
    if (_touch.x >= this.x &&
      _touch.x <= this.x + this.width &&
      _touch.y >= this.y &&
      _touch.y <= this.y + this.height) t = true;
    return [_touch.type, t];
  }
  
  touchevent(){}
  
  onenterframe() {}
  
}
