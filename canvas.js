var canvas=document.querySelector("canvas")
var c=canvas.getContext("2d")

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

mouse={
    x: innerWidth/2,
    y: innerHeight/2
}

colorArray=[
    '#00bdff',
    '#4d39ce',
    '#888cff'
]

window.addEventListener('mousemove',function(event) {
    mouse.x=event.x
    mouse.y=event.y
})

addEventListener('resize',function() {
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
})

function randomInt(start,end) {
    return Math.floor(Math.random()*end+start)
}

function Particle(x,y,radius,color) {
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.color=color;
    this.radians=Math.random()*Math.PI*2;
    this.velocity=0.05;
    this.a=randomInt(50,120);
    this.lastMouse={
        x: x,
        y: y
    }

    this.draw=lastPoint => {
        c.beginPath();
        c.strokeStyle=this.color;
        c.lineWidth=this.radius;
        c.moveTo(lastPoint.x,lastPoint.y)
        c.lineTo(this.x,this.y);
        c.stroke();
    }

    this.update=() => {
        this.lastPoint={
            x:this.x,
            y:this.y
        }

        this.lastMouse.x+=(mouse.x-this.lastMouse.x)*0.05;
        this.lastMouse.y+=(mouse.y-this.lastMouse.y)*0.05;

        this.radians+=this.velocity;
        this.x=this.lastMouse.x+Math.cos(this.radians)*this.a;
        this.y=this.lastMouse.y+Math.sin(this.radians)*this.a;
        this.draw(this.lastPoint);
    }
}

particles=[]
var color;
var radius;
for (let index = 0; index < 50; index++) {
    color=randomInt(0,2);
    color=colorArray[color];
    radius=Math.random()*3+1;
    particles.push(new Particle(innerWidth/2,innerHeight/2,radius,color));
    
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle="rgba(255,255,255,0.05)"
    c.fillRect(0,0,innerWidth,innerHeight);
    particles.forEach(element => {
        element.update()
    });
}

animate();
