class Jugador{
  constructor() {
    this.pos = new Vector(260,400);
    this.moveLeft = false;
    this.moveRight = false;
    this.direccion = 0;
    this.width = 14;
    this.height = 20;
    this.div = document.getElementById('jugador');
    this.state = State.QUIET;
  }


  draw(){
    this.div.style.left = this.pos.x.toString() + 'px';
    this.div.style.top = this.pos.y.toString() + 'px';
  }

  bordes(maxL,maxR){
    if (this.pos.x > maxR) {
      this.pos.x = maxR;
    }else if (this.pos.x < maxL) {
      this.pos.x = maxL;
    }
  }

  update(delta,maxL,maxR){
    if (this.moveLeft) {
      this.direccion = -0.3;
    }else if (this.moveRight) {
      this.direccion = 0.3;
    }else{
      this.direccion = 0;
    }
    this.bordes(maxL,maxR);
    this.pos.x += this.direccion * delta;
  }

  intersects(enemigo) {
    if (this.state != State.GOD) {
      let left = this.pos.x + 25;
      let right = this.width + left;
      let top = this.pos.y + 30;
      let bottom = this.height + top;

      return (left > enemigo.right ||
        right < enemigo.left ||
        top > enemigo.bottom ||
        bottom < enemigo.top); // true si no estan chocando
    }else{
      return true;
    }
  }
}
