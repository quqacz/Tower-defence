class Enemy{

	constructor(type=0, x=-20){
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
		switch(type){
			case 0:
				this.imageArray=[
				'imgs/default/frame5.png',
				'imgs/default/frame4.png',
				'imgs/default/frame3.png',
				'imgs/default/frame2.png',
				'imgs/default/frame1.png'];
				this.deathArray=[
				"imgs/default/death/frame1.png",
				"imgs/default/death/frame2.png",
				"imgs/default/death/frame3.png",
				"imgs/default/death/frame4.png",
				"imgs/default/death/frame5.png"];
				this.atackArray=[
				'imgs/default/atack/frame5.png',
				'imgs/default/atack/frame4.png',
				'imgs/default/atack/frame3.png',
				'imgs/default/atack/frame2.png',
				'imgs/default/atack/frame1.png'
				];
				this.animationLoop=7;
				this.deathMaxTimeout=60;
				this.deathFrame = 10;
				this.v=1.5;
				this.maxX = this.maxDistance();
				this.maxHp=100+day;
				this.dmg=12;
				this.atackMaxTimeout = 60;
				this.money = 80+Math.random()*day;
			break;
			case 1:
				this.imageArray=[
				'imgs/ar/frame1.png',
				'imgs/ar/frame2.png',
				'imgs/ar/frame3.png',
				'imgs/ar/frame4.png'];
				this.deathArray=[
				"imgs/ar/death/frame1.png",
				"imgs/ar/death/frame2.png",
				"imgs/ar/death/frame3.png",
				"imgs/ar/death/frame4.png",
				"imgs/ar/death/frame5.png"];
				this.atackArray=[
				'imgs/ar/atack/frame5.png',
				'imgs/ar/atack/frame4.png',
				'imgs/ar/atack/frame3.png',
				'imgs/ar/atack/frame2.png',
				'imgs/ar/atack/frame1.png'
				];
				this.animationLoop=11;
				this.deathMaxTimeout=50;
				this.deathFrame = 10;
				this.v=1;
				this.maxX = this.maxDistance()-200;
				this.maxHp=150+day;
				this.dmg=18;
				this.atackMaxTimeout = 80;
				this.money = 120+Math.random()*day;
			break;
			case 2:
				this.imageArray=[
				'imgs/boomer/frame1.png',
				'imgs/boomer/frame2.png',
				'imgs/boomer/frame3.png',
				'imgs/boomer/frame4.png'];
				this.deathArray=[
				"imgs/boomer/death/frame1.png",
				"imgs/boomer/death/frame2.png",
				"imgs/boomer/death/frame3.png",
				"imgs/boomer/death/frame4.png",
				"imgs/boomer/death/frame5.png"];
				this.atackArray=[
				'imgs/boomer/atack/frame5.png',
				'imgs/boomer/atack/frame4.png',
				'imgs/boomer/atack/frame3.png',
				'imgs/boomer/atack/frame2.png',
				'imgs/boomer/atack/frame1.png'
				];
				this.animationLoop=10;
				this.deathMaxTimeout=40;
				this.deathFrame = 7;
				this.v=1.9;
				this.maxX = this.maxDistance();
				this.maxHp=50+day;
				this.dmg=100;
				this.atackMaxTimeout = 100;
				this.money = 100+Math.random()*day;
			break;
			case 3:
				this.imageArray=[
				'imgs/shield/frame1.png',
				'imgs/shield/frame2.png',
				'imgs/shield/frame3.png',
				'imgs/shield/frame4.png'];
				this.deathArray=[
				"imgs/shield/death/frame1.png",
				"imgs/shield/death/frame2.png",
				"imgs/shield/death/frame3.png",
				"imgs/shield/death/frame4.png",
				"imgs/shield/death/frame5.png"];
				this.atackArray=[
				'imgs/shield/atack/frame5.png',
				'imgs/shield/atack/frame4.png',
				'imgs/shield/atack/frame3.png',
				'imgs/shield/atack/frame2.png',
				'imgs/shield/atack/frame1.png'
				];
				this.animationLoop=10;
				this.deathMaxTimeout=40;
				this.deathFrame = 7;
				this.v=.9;
				this.maxX = this.maxDistance();
				this.maxHp=300+day;
				this.dmg=15;
				this.atackMaxTimeout = 100;
				this.money = 250+Math.random()*day;
			break;
			default:
				this.imageArray=[
				'imgs/default/frame5.png',
				'imgs/default/frame4.png',
				'imgs/default/frame3.png',
				'imgs/default/frame2.png',
				'imgs/default/frame1.png'];
				this.deathArray=[
				"imgs/default/death/frame1.png",
				"imgs/default/death/frame2.png",
				"imgs/default/death/frame3.png",
				"imgs/default/death/frame4.png",
				"imgs/default/death/frame5.png"];
				this.atackArray=[
				'imgs/default/atack/frame5.png',
				'imgs/default/atack/frame4.png',
				'imgs/default/atack/frame3.png',
				'imgs/default/atack/frame2.png',
				'imgs/default/atack/frame1.png'
				];
				this.animationLoop=7;
				this.deathMaxTimeout=60;
				this.deathFrame = 10;
				this.v=1.5;
				this.maxX = this.maxDistance();
				this.maxHp=100+day;
				this.dmg=12;
				this.atackMaxTimeout = 60;
				this.money = 80+Math.random()*day;
				break;
		}
		this.image.src=this.imageArray[0];
		this.hp=this.maxHp;

	}

	show(){
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
	showDeath(){
		this.animationFrame++;
		if(this.animationFrame>=this.deathMaxTimeout/this.deathArray.length){
			this.animationFrame=0;
			this.frame++;
		}
		this.image.src= this.deathArray[this.frame];
		c.drawImage(this.image,this.x-40,this.y,80,this.h);
	}

	showHpBar(){
		c.rect(this.x-this.hpBarWidth/2, this.y-this.hpBarHeight*2,this.hpBarWidth, this.hpBarHeight);
		c.stroke();
		c.fillStyle = 'red';
		c.fillRect(this.x-this.hpBarWidth/2+1, this.y-this.hpBarHeight*2+1, this.hpBarWidth-2, this.hpBarHeight-2);
		c.fillStyle = 'green';
		if(this.hp>=0)
			c.fillRect(this.x-this.hpBarWidth/2+1, this.y-this.hpBarHeight*2+1, this.hp/this.maxHp*this.hpBarWidth-2, this.hpBarHeight-2);
		c.fillRect(this.x-this.hpBarWidth/2+1, this.y-this.hpBarHeight*2+1, 0, this.hpBarHeight-2);
	}

	damaged(){
		if(this.hp === this.maxHp)
			return 0;
		return 1;
	}

	kill(){
		this.alive=false;
		this.frame =0;
		this.animationFrame =0;
	}

	update(){
		this.x<this.maxX ? this.x+=this.v : this.atDestination = true;
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

	takeDmg(dmg){
		this.hp -= dmg;
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


