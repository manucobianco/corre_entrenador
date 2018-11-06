class Enemigo {
  constructor(x,y,id) {
    this.div = document.getElementById('enemigo'+id);
    this.pos = new Vector(x,y);
    this.top = this.pos.y + 30;
    this.left = this.pos.x + 25;
    this.bottom = this.top + 25;
    this.right = this.left + 14;
    this.velocidad = 0.3;
    this.state = State.HIDDEN;
  }

  draw(){
    this.div.style.left = this.pos.x.toString() + 'px';
    this.div.style.top = this.pos.y.toString() + 'px';
  }

  update(delta){
    if (this.state == State.RUNNING) {
      this.div.style.display = 'block';
      if (this.pos.y > 650) {
        this.state = State.HIDDEN;
        this.div.style.display = 'none';
        this.pos.y = -100;
      }else{
        this.top = this.pos.y;
        this.left = this.pos.x;
        this.bottom = this.top + this.div.offsetHeight;
        this.right = this.left + this.div.offsetWidth;

        this.pos.y += this.velocidad * delta;
      }
    }
  }
}
