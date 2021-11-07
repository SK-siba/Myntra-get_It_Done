$(document).ready(function(){
    //middle//
    log("here...")
    $(".front-show").click(function(){
        $(".front-hide").css("display","block");
        $(".front-show").css("display","none");

    })
    $(".zooming-4").hover(function(){
        $(".zooming-open-4").css("display","block");
        $(".zooming-open-2,.zooming-open-1,.zooming-open-head,.zooming-open-3").css("display","none");
        $(this).css("border","1px solid");
    })
    $(".zooming-4").mouseleave(function(){
        $(this).css("border-color","transparent");
    })
    $(".zooming-3").hover(function(){
        $(".zooming-open-3").css("display","block");
        $(".zooming-open-2,.zooming-open-1,.zooming-open-head,.zooming-open-4").css("display","none");
        $(this).css("border","1px solid");
    })
    $(".zooming-3").mouseleave(function(){
        $(this).css("border-color","transparent");
    })
    $(".zooming").hover(function(){
        $(".zooming-open-head").css("display","block");
        $(".zooming-open-2,.zooming-open-1,.zooming-open-3,.zooming-open-4").css("display","none");
        $(this).css("border","1px solid");
    })
    $(".zooming").mouseleave(function(){
        $(this).css("border-color","transparent");
    })
    $(".zooming-1").hover(function(){
        $(".zooming-open-1").css("display","block");
        $(".zooming-open-head,.zooming-open-2,.zooming-open-3,.zooming-open-4").css("display","none");
        $(this).css("border","1px solid");
    })
    $(".zooming-1").mouseleave(function(){
        $(this).css("border-color","transparent");
    })
    $(".zooming-5").hover(function(){
        $(".zooming-open-2").css("display","block");
        $(".zooming-open-head,.zooming-open-1,.zooming-open-3,.zooming-open-4").css("display","none");
        $(this).css("border","1px solid");
    })
    $(".zooming-5").mouseleave(function(){
        $(this).css("border-color","transparent");
    })
    //pop//
    $(".open-pop-container").click(function(){
        $(".pop-container").css("display","block")
    })
    $(".close-pop").click(function(){
        $(".pop-container").css("display","none")
    })
    //pop//
    //middle//
    //top-content
  $(".menu-bar").click(function(){
    $(".side-bar").css({"width":"30%","display":"block"});
});
$(".menu-bar-1").click(function(){
    $(".side-bar").css({"width":"40%","display":"block"});
});
$(".menu-bar-2").click(function(){
    $(".side-bar").css({"width":"60%","display":"block"});
});
$(".close").click(function(){
    $(".side-bar").css("width","0%");
});
$(window). scroll(function(){
    var scroll = $(window). scrollTop();
    if (scroll > 0) {
    $("#top-containt"). css("background" , "rgb(233, 233, 233)");
    }
    else{
    $("#top-containt"). css("background" , "white");}});
// $('.parallax-window').parallax({imageSrc: 'desktop-1.jpg'});
        main();
})



function log(e){console.log(e);}
// document.addEventListener('load', main());

var id;
var user_details;

var domain = "https://apiforapp.herokuapp.com";
// var domain = "http://localhost:3000";

var hid = ["0", "6186ddf2e1fda8fc421d9093", "6186d7d7e1fda8fc421d908b", "6186d30a7228bd50ff3f0e37", "6186d811e1fda8fc421d908d"];

function drp(g) { return `<button name="${g}" onclick="sendMsg("${g}")" class="dropdown-item" href="#">${g}</button>`; }

function checkGrp(e){
    log("grp check");
    let node = document.getElementById("cart-add");
    let par = node.getElementsByTagName("div")[0];
    log(par)
    let g1 = "diwali", g2 = "hello";
    par.innerHTML = "";
    // par.innerHTML = (drp(g1) + drp(g2));
    // var voiceList = document.querySelector('#cart-add'); //get the dropdown list array
    // var button  = document.querySelector('#button');

    // var options = [] //keep the options of dorpdown here
    var button = document.createElement("button");
    button.classList.add("dropdown-item");
    button.innerHTML = g1;
    button.addEventListener('click', () => {
        sendMsg(g1);
    });

    var button2 = document.createElement("button");
    button2.classList.add("dropdown-item");
    button2.innerHTML = g2;
    button2.addEventListener('click', () => {
        sendMsg(g2);
    });

    par.appendChild(button);
    par.appendChild(button2);

}

// const socket = io("http://localhost:3000");
const socket = io("https://apiforapp.herokuapp.com");

var prd = { name : "", price : "", img : "", link : "", id : ""};

function main(){
    log("starting...");
    let url = window.location.href;
    let pp = url.split("?")[1];
    id = pp.split('=')[1];
    document.getElementById("cart-add").addEventListener('click', checkGrp);
    let dd = document.querySelector("#product-image");
    dd.src = "Images/" + id + ".jpg";
    log(id);
    prd.id = id;
    let getUrl = domain + "/api/products/" + hid[id];
    // let getUrl = "https://apiforapp.herokuapp.com/api/products/6186d30a7228bd50ff3f0e37";
    fetch(getUrl)
        .then( res => res.json())
        .then( data => {
            log(data)
            document.getElementById("product-title").innerHTML = data.name;
            document.getElementById("product-price").innerHTML = data.price;
            prd.name = data.name;
            prd.price = data.price;
        })
        .catch( err => {
            log(err)
        })


    log("ok")
    log(socket);

}

// 
function sendMsg(grp){
    
    log(grp)

    message = grp + "," + prd.name + "," + prd.price + "," + window.location.href + "," + prd.id;

    socket.emit('product-share', message, (error) => {
        
        //enabling the button after the message is sent
        // $messageFormButton.removeAttribute('disabled')
        // $messageFormInput.value = ''  //clear input after message been sent to server
        // $messageFormInput.focus() // refocusing the cursor in the input box

        if(error){
            return console.log(error);
        }

        console.log(`The message was delivered.`)
    })
}