class defaultEnemy extends Enemy{
    constructor(x, day){
        super(x);
        this.imageArray=[
            'imgs/default/frame5.png',
            'imgs/default/frame4.png',
            'imgs/default/frame3.png',
            'imgs/default/frame2.png',
            'imgs/default/frame1.png'
        ];
        this.deathArray=[
            "imgs/default/death/frame1.png",
            "imgs/default/death/frame2.png",
            "imgs/default/death/frame3.png",
            "imgs/default/death/frame4.png",
            "imgs/default/death/frame5.png"
        ];
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
        this.hp = this.maxHp;
        this.dmg=12;
        this.atackMaxTimeout = 60;
        this.money = 80+Math.random()*day;
    }
}

class arEnemy extends Enemy{
    constructor(x, day){
        super(x);
        this.imageArray=[
            'imgs/ar/frame1.png',
            'imgs/ar/frame2.png',
            'imgs/ar/frame3.png',
            'imgs/ar/frame4.png'
        ];
        this.deathArray=[
            "imgs/ar/death/frame1.png",
            "imgs/ar/death/frame2.png",
            "imgs/ar/death/frame3.png",
            "imgs/ar/death/frame4.png",
            "imgs/ar/death/frame5.png"
        ];
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
        this.hp = this.maxHp;
        this.dmg=18;
        this.atackMaxTimeout = 80;
        this.money = 120+Math.random()*day;
    }
}

class boomerEnemy extends Enemy{
    constructor(x, day){
        super(x);
        this.imageArray=[
            'imgs/boomer/frame1.png',
            'imgs/boomer/frame2.png',
            'imgs/boomer/frame3.png',
            'imgs/boomer/frame4.png'
        ];
        this.deathArray=[
            "imgs/boomer/death/frame1.png",
            "imgs/boomer/death/frame2.png",
            "imgs/boomer/death/frame3.png",
            "imgs/boomer/death/frame4.png",
            "imgs/boomer/death/frame5.png"
        ];
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
        this.hp = this.maxHp;
        this.dmg=100;
        this.atackMaxTimeout = 100;
        this.money = 100+Math.random()*day;
    }
}

class shieldEnemy extends Enemy{
    constructor(x, day){
        super(x);
        this.imageArray=[
            'imgs/shield/frame1.png',
            'imgs/shield/frame2.png',
            'imgs/shield/frame3.png',
            'imgs/shield/frame4.png'
        ];
        this.deathArray=[
            "imgs/shield/death/frame1.png",
            "imgs/shield/death/frame2.png",
            "imgs/shield/death/frame3.png",
            "imgs/shield/death/frame4.png",
            "imgs/shield/death/frame5.png"
        ];
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
        this.hp = this.maxHp;
        this.dmg=15;
        this.atackMaxTimeout = 100;
        this.money = 250+Math.random()*day;
    }
}