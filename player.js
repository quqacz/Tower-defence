class Player{

	constructor(){
		this.x = W-400+60;
		this.y = 390;
		this.h = H-450;
		this.w = 120;
		this.money=0;
		this.maxHp = 1000;
		this.hp = this.maxHp;
		this.gun = new Gun(this.x-50,H-300,0,0,0);
		this.baracadeImg = new Image();
		this.baracadeImg.src="imgs/base/zapora.png";
	}

	show(){
		c.lineWidth=2;
		c.beginPath();
		c.moveTo(this.x, H-50);
		c.lineTo(this.x-140, this.h);
		c.lineTo(this.x-140, this.h-175);
		c.lineTo(this.x+65, this.h-175);
		c.lineTo(this.x+240, H-225);
		c.lineTo(this.x+240, H-50);
		c.closePath();
		c.fillStyle='rgb(191, 173, 136)';
		c.fill();
		c.stroke();
		c.beginPath();
		c.moveTo(this.x, H-50);
		c.lineTo(this.x, H-225);
		c.lineTo(this.x-140, this.h-175);
		c.stroke();
		c.beginPath();
		c.moveTo(this.x, H-225);
		c.lineTo(this.x+240, H-225);
		c.stroke();
		c.beginPath();
		c.moveTo(this.x-15,H-148);
		c.lineTo(this.x-130, this.h-25);
		c.lineTo(this.x-130, this.h-110);
		c.lineTo(this.x-15, H-233);
		c.closePath();
		c.fillStyle = 'rgb(82, 59, 11)';
		c.fill();
		c.fillRect(this.gunX,this.gunY, 10,10);
		c.lineWidth=1;
	}
	showBaracade(){
		// c.beginPath();
		// c.moveTo(W-750,4*H/7-100);
		// c.lineTo(W-600, H);
		c.stroke();
		c.drawImage(this.baracadeImg, W-720, 4*H/7-90,160,564);
	}

	getStatus(){
		return {
			ammo: this.gun.ammo,
			maxAmmo: this.gun.maxAmmo+this.gun.additionalAmmo,
			maxHp: this.maxHp, 
			hp: this.hp, 
			money: this.money
		}
	}

	takeDmg(dmg){
		this.hp-=dmg;
	}

	getMoney(money){
		this.money += Math.floor(money);
	}

	spendMoney(cash){
		this.money-=cash;
	}

	increseMaxHp(){
		this.maxHp+=100;
		this.hp+=100;
	}

	restoreHp(){
		this.hp+=this.maxHp/10
		if(this.hp>this.maxHp)
			this.hp = this.maxHp;
	}

	upgradeGun(type, lvl){
		this.gun=new Gun(type, lvl, this.gun.addAmmo());
		this.gun.instantRefill();
	}
}