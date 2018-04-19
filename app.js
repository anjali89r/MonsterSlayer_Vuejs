new Vue({
  el: '#app',
  data: {
  playerHealth: 100,
  monsterHealth: 100,
  gameIsRunning: false,
  turns: []
  },
  methods: {
    startGame: function(){
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns =[];
    },
    attack: function(){

      var monsterDamage = this.calcDamage(3, 10);
      this.monsterHealth -= monsterDamage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits monster by '+ monsterDamage
      })
      if(this.checkWin()){
        return;
      }
      this.monsterAttacks();
    },
    specialAttack: function(){
      var monsterDamage = this.calcDamage(10, 20);
      this.monsterHealth -= monsterDamage;
      this.turns.unshift({
        isPlayer: true,
        text: 'player hits monster by '+ monsterDamage
      })
      if(this.checkWin()){
        return;
      }
      this.monsterAttacks();
    },
    heal: function(){
      if(this.playerHealth <= 90){
        this.playerHealth += 10;
        this.turns.unshift({
          isPlayer: true,
          text: 'player heals for 10 '
        })
      }
      else{
        this.playerHealth = 100;
      }
      this.monsterAttacks();
    },
    giveUp: function(){
      this.gameIsRunning = false;
    },
    monsterAttacks: function(){
      var playerDamage = this.calcDamage(5, 12);
      this.playerHealth -= playerDamage;
      this.turns.unshift({
        isPlayer: false,
        text: 'monster hits Player by '+ playerDamage
      })
      this.checkWin();
    },
    calcDamage: function(mini, maxi){
      return Math.max(Math.floor(Math.random() * maxi) + 1, mini);
    },
    checkWin: function(){
      if(this.monsterHealth <= 0){
        if(confirm('you won! new game?')){
          this.startGame();
        }
        else{
          this.gameIsRunning = false;
        }
        return true;
      }
      else if (this.playerHealth <= 0){
        if(confirm('you lost! new game?')){
          this.startGame();
        }
        else{
          this.gameIsRunning = false;
        }
        return false;
      }
    }

  }

})
