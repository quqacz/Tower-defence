class Enemy{
	constructor(x=-20){
		this.x=x;
		this.y=(Math.random()*H/3)+H/2;
		this.h=150;
		this.animationFrame=0;
		this.image = new Image();
		this.frame=0;
		this.alive=true;
		this.hpBarWidth=100;
		this.hpBarHeight=10;
		this.timeout=0;
		this.atDestination = false;
		this.atackTimeout = 0;
		this.imageArray = [];
		this.animationLoop = 0;
		this.atackTimeout = 0;
		this.atackArray = [];
		this.maxHp = 0;
		this.hp = 0;
	}

	damaged(){
		if(this.hp === this.maxHp)
			return 0;
		return 1;
	}

	dead(){
		this.timeout++;
		if(this.timeout === 80){
			return 1;
		} else {
			return 0;
		}
	}

	isAlive(){
		if(this.hp>0)
			return 1;
		return 0;
	}

	maxDistance(){
		const x1 = W-600; 
		const y1 = H;
		const x2 = W-750;
		const y2 = 4*H/7-100;

		const x3 = this.x;
		const y3 = this.y+this.h;
		const x4 = this.x+1;
		const y4 = this.y+this.h;
		
		let mian = (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
		if(mian == 0)
			return;
		let t = ((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4))/mian;
		let u = -((x1-x2)*(y1-y3)-(y1-y2)*(x1-x3))/mian;
		if(t > 0 && t < 1 && u > 0){
			let dx = x1+t*(x2-x1);
			let dy = y1 + t*(y2-y1);
			return dx - 60;
		}
	}

	dangerous(){
		if(this.atDestination)
			return 1;
		return 0;
	}

	dealDmg(){
		this.atackTimeout++;
		if(this.atackTimeout=== this.atackMaxTimeout){
			this.atackTimeout=0;
			return this.dmg;
		} else 
			return 0;
	}

	dropMoney(){
		return this.money;
	}
}
Enemy.prototype.show = function(c){
	// c.beginPath();
	// c.moveTo(this.x,this.y);
	// c.lineTo(this.x, this.y+this.h);
	// c.stroke();
	this.animationFrame++;
	if(this.atDestination===true){
		if(this.animationFrame>=this.atackMaxTimeout/this.atackArray.length){
			this.animationFrame=0;
			this.frame++;
			if(this.frame>=this.atackArray.length)
				this.frame=0;
		}
		this.image.src= this.atackArray[this.frame];
	} else {
		
		if(this.animationFrame===this.animationLoop){
			this.animationFrame=0;
			this.frame++;
			if(this.frame>=this.imageArray.length){
				this.frame=0;
			}
		}
		this.image.src = this.imageArray[this.frame];
	}
	c.drawImage(this.image,this.x-40,this.y,80,this.h);
}
Enemy.prototype.showDeath = function(c){
	this.animationFrame++;
	if(this.animationFrame>=this.deathMaxTimeout/this.deathArray.length){
		this.animationFrame=0;
		this.frame++;
	}
	this.image.src= this.deathArray[this.frame];
	c.drawImage(this.image,this.x-40,this.y,80,this.h);
}

Enemy.prototype.showHpBar = function(c){
	c.rect(this.x-this.hpBarWidth/2, this.y-this.hpBarHeight*2,this.hpBarWidth, this.hpBarHeight);
	c.stroke();
	c.fillStyle = 'red';
	c.fillRect(this.x-this.hpBarWidth/2+1, this.y-this.hpBarHeight*2+1, this.hpBarWidth-2, this.hpBarHeight-2);
	c.fillStyle = 'green';
	if(this.hp>=0)
		c.fillRect(this.x-this.hpBarWidth/2+1, this.y-this.hpBarHeight*2+1, this.hp/this.maxHp*this.hpBarWidth-2, this.hpBarHeight-2);
	c.fillRect(this.x-this.hpBarWidth/2+1, this.y-this.hpBarHeight*2+1, 0, this.hpBarHeight-2);
}

Enemy.prototype.kill = function(){
	this.alive=false;
	this.frame =0;
	this.animationFrame = 0;
}

Enemy.prototype.update = function(){
	this.x<this.maxX ? this.x+=this.v : this.atDestination = true;
}

Enemy.prototype.takeDmg = function(dmg){
	this.hp -= dmg;
}