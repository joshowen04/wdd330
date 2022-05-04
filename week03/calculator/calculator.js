let calculator = {
    a: 0,
    b: 0,

    read() {
        this.a = prompt("a?");
        this.b = prompt("b?");
        alert(this.sum());
        alert(this.mul());
2    },
    sum(){
        let answer = parseInt(this.a) + parseInt(this.b);
        return answer


    },
    mul(){
        let answer = parseInt(this.a) * parseInt(this.b);
        return answer

    }


}




calculator.read();

/*
let calculator = {
  sum() {
    return this.a + this.b;
  },

  mul() {
    return this.a * this.b;
  },

  read() {
    this.a = +prompt('a?', 0);
    this.b = +prompt('b?', 0);
  }
};

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );

*/