class Pokemon {
  constructor(x,y,id) {
    this.div = document.getElementById('pokemon'+id);
    this.posInicial = x;
    this.pos = new Vector(x,y);
    this.top = this.pos.y + 30;
    this.left = this.pos.x + 25;
    this.bottom = this.top + 25;
    this.right = this.left + 14;
    this.velocidad = 0.1;
    this.state = State.HIDDEN;
    this.direccion = 'right';
  }

  draw(){
    this.div.style.left = this.pos.x.toString() + 'px';
    this.div.style.top = this.pos.y.toString() + 'px';
  }

  update(delta,maxL,maxR){
    if (this.state == State.RUNNING) {
      this.div.style.display = 'block';
      if (this.pos.y > 650) {
        this.state = State.HIDDEN;
        this.div.style.display = 'none';
        this.pos.y = -100;
        this.pos.x = this.posInicial;
      }else{
        this.top = this.pos.y;
        this.left = this.pos.x;
        this.bottom = this.top + this.div.offsetHeight;
        this.right = this.left + this.div.offsetWidth;

        if (this.direccion == 'right') {
          if (this.pos.x < maxR) {
            this.pos.x += 0.1 * delta;
          }else {
            this.direccion = 'left';
            this.div.className = 'pokemon pokemon_corriendo_left';
          }
        }
        if (this.direccion == 'left') {
          if (this.pos.x > maxL) {
            this.pos.x -= 0.1 * delta;
          }else {
            this.direccion = 'right';
            this.div.className = 'pokemon pokemon_corriendo_right';
          }
        }
        this.pos.y += this.velocidad * delta;
      }
    }
  }
}
