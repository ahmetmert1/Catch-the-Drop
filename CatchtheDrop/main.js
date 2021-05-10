var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");


cvs.width = 1200;
cvs.height = 680;


// değişkenlerin tanımlanması
var bg = new Image();
var damla = new Image();
var bitki1 = new Image();
var asit = new Image();
var agac = new Image();

var damlaSesi = new Audio();
var asitSesi = new Audio();
var agacSesi = new Audio();
var kayipSesi = new Audio();
var arkaPlanSesi = new Audio();

var damlaKonumY = 0;
var damlaKonumX = 0;
var saksıKonumX = 0;
var asitKonumX = 300;
var damlaKonumRastgele;
var asitKonumRastgele;
var yakalananDamlaSayisi = 0;
var Agaclar = [];
var skorTutucu;
var agacSayisi = 0;

//değer atanışı
bg.src = "images\\arkaPlan.png";
damla.src = "images\\damlaYeni.png";
bitki1.src = "images\\bitki1.png";
asit.src = "images\\asitYeni.png";
agac.src = "images\\agac.png";

damlaSesi.src = "sounds\\susesi.mp3";
asitSesi.src = "sounds\\asit.mp3";
kayipSesi.src = "sounds\\kayip.mp3";
agacSesi.src = "sounds\\agaceklendi.mp3";
arkaPlanSesi.src ="sounds\\arkaPlan.mp3"





var Damlalar = [];
var Asitler = [];

Damlalar[0] = {
    x : 0,
    y : 0
};

Asitler[0] = {
    x : 300,
    y : 0
};

Agaclar[0] = {
    x : -250,
    y : -250

};

//saksının konumunu ayarlıyoruz
document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '37') {
        if(saksıKonumX <= 0){
            saksıKonumX == saksıKonumX;
        }else{
            saksıKonumX -= 150;
        }
    }
    else if (e.keyCode == '39') {
        if(saksıKonumX >= 1050){
            saksıKonumX == saksıKonumX;
        }else{
            saksıKonumX += 150;
        }
        
    }
}

var animationId;

function again() {
    document.addEventListener('click', function (e) {
        location.reload();
    })
}


function draw(){
    //Arka plan eklenişi
    ctx.drawImage(bg,0,0,cvs.width,cvs.height);
    arkaPlanSesi.volume = 0.1;
    arkaPlanSesi.play();

    //Damla sayımız her 15 skorda bir arkada ağaca dönüşüyor 
    //yeni bir ağac yapıyor
    if(yakalananDamlaSayisi % 15 == 0 && yakalananDamlaSayisi!=0 && skorTutucu != yakalananDamlaSayisi)
    {
        yakalananDamlaSayisi = 0;
        skorTutucu = yakalananDamlaSayisi;
        Agaclar.push({
            x : Math.floor(Math.random()*950),
            y : 400

        })
        agacSesi.play();
        agacSayisi++;
        bitki1.src="images\\bitki5.png";
        
        
        
    }

    for(var e = 0 ; e < Agaclar.length ; e++)
    {
        //Agac çiziyoruz
        ctx.drawImage(agac,Agaclar[e].x,Agaclar[e].y,280,280);
        
    }
    
    for(var i = 0 ; i < Damlalar.length ; i++)
    {
        //damla görüntüsü eklenişi
        ctx.drawImage(damla , Damlalar[i].x , Damlalar[i].y , 150 , 100);
        //ctx.drawImage(asit, Asitler[i].x , Asitler[i].y , 150,100 );

        //damlanın aşağı düşüşü
        Damlalar[i].y+=2;
        //Asitler[i].y+=2;


        //damlaya rastgele konum atanması
        damlaKonumRastgele = Math.floor(Math.random()*8);
        switch(damlaKonumRastgele){
    case 0:
        damlaKonumX = 0;
        break;

    case 1:
        damlaKonumX = 150;
        break;

    case 2:
        damlaKonumX = 300;
        break;
    
    case 3:
        damlaKonumX = 450;
        break;

    case 4:
        damlaKonumX = 600;
        break;

    case 5:
        damlaKonumX = 750;
        break;

    case 6:
        damlaKonumX = 900;
        break;

    case 7:
        damlaKonumX = 1050;
        break;

    default:
        damlaKonumX = 0;

            }

        





        //yeni damla oluşturulması
        if(Damlalar[i].y == 200){
            Damlalar.push({
                x : damlaKonumX,
                y : -150
            });
        }

        

        //çarpışma yönetimi
        if(Damlalar[i].y == 530 && Damlalar[i].x == saksıKonumX )
        {
            yakalananDamlaSayisi++;
            damlaSesi.play();
            Damlalar[i].x = 1500;
 
            if(yakalananDamlaSayisi<3)
            {
                bitki1.src="images\\bitki1.png";
            }
            else if(yakalananDamlaSayisi>=3 && yakalananDamlaSayisi<6)
            {
                bitki1.src="images\\bitki2.png";
            }
            else if(yakalananDamlaSayisi>= 6 && yakalananDamlaSayisi < 9)
            {
                bitki1.src="images\\bitki3.png";
            }
            else if(yakalananDamlaSayisi >= 9 && yakalananDamlaSayisi <12)
            {
                bitki1.src="images\\bitki4.png";
            }
            else{
                bitki1.src="images\\bitki5.png";
            }

            console.log(yakalananDamlaSayisi);

        }

        ctx.fillStyle = "#000";
        ctx.font = "20px Verdana";
        ctx.fillText("Saksıdaki Damla Sayısı : "+yakalananDamlaSayisi,10,20);
        ctx.fillText("Yetiştirilen Ağaç Sayısı :"+agacSayisi,930,20);

    }

    for(var z = 0 ; z < Asitler.length ; z++)
    {
        //asit görüntüsünün eklenişi
        ctx.drawImage(asit, Asitler[z].x , Asitler[z].y , 150,100 );

        //asitin aşağı düşüşü
        Asitler[z].y+=2;

        //asite rastgele konum atanması
        asitKonumRastgele = Math.floor(Math.random()*8);
        switch(asitKonumRastgele){
    case 0:
        asitKonumX = 0;
        break;

    case 1:
        asitKonumX = 150;
        break;

    case 2:
        asitKonumX = 300;
        break;
    
    case 3:
        asitKonumX = 450;
        break;

    case 4:
        asitKonumX = 600;
        break;

    case 5:
        asitKonumX = 750;
        break;

    case 6:
        asitKonumX = 900;
        break;

    case 7:
        asitKonumX = 1050;
        break;

    default:
        asitKonumX = 0;

            }

        //yeni asit oluşturulması
        if(Asitler[z].y == 300){
            Asitler.push({
                x : asitKonumX,
                y : -180
            });
        }

        //çarpışma yönetimi
        if(Asitler[z].y == 530 && Asitler[z].x == saksıKonumX )
        {
            if(yakalananDamlaSayisi<4)
            {
                setTimeout(() => {
                    cancelAnimationFrame(animationId);
                  }, 0);

                ctx.fillText("Tohumunuz Eridi ",500,340);
                ctx.fillText("Tekrar başlamak için tıklayınız ",450,370);
                kayipSesi.play();

                again();
                
            }
            yakalananDamlaSayisi-=5;
            asitSesi.play();
            Asitler[z].x = 1500;

            if(yakalananDamlaSayisi<5)
            {
                bitki1.src="images\\bitki1.png";
            }
            else if(yakalananDamlaSayisi>=5 && yakalananDamlaSayisi<10)
            {
                bitki1.src="images\\bitki2.png";
            }
            else if(yakalananDamlaSayisi>= 10 && yakalananDamlaSayisi < 15)
            {
                bitki1.src="images\\bitki3.png";
            }
            else if(yakalananDamlaSayisi >= 15 && yakalananDamlaSayisi <20)
            {
                bitki1.src="images\\bitki4.png";
            }
            else{
                bitki1.src="images\\bitki5.png";
            }
        }


    }
    
    
    
    ctx.drawImage(bitki1,saksıKonumX,cvs.height-150,150,150);

    
    animationId =  requestAnimationFrame(draw);
}

draw();