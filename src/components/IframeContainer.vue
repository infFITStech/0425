<template>
        <!--  Initial Loading  -->
        <div class="loadingbar" id="loadingbar">
            <div class="spinner spinner-circle"></div>
        </div>
    
    
        
        <!-- container -->
        <div class='container back' id='containerback'></div>
        <div class='container mbinfo animY' id="container-recom">
            <div class="c_header" id="container-container-recom-header">
                <span>推薦給您的商品</span>
            </div>
            <div class="selection_scroll">
                <div class="selection">
                </div>
            </div>
            <div class="footer">
                <!-- <button class="enabled" id="confirm-button_recom" style="margin: auto;">選取商品</button> -->
                <button id='startover' class='startover enabled' @click=reset() style='width:auto;margin-bottom:5px'>重新輸入
                </button>
                <!-- <img class="type_backarrow" id="container-recom-backarrow" src="../../img/left-arrow.png" width="100%"
                    height="100%">
                <a class='c-recom'>略過</a> -->
            </div>
        </div>
        <!-- background -->
        <div id='pback'></div>
</template>


<script setup>
import $ from 'jquery';
var reset;



$(function () {
    //Get Route
    var obj;
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    fetch('https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/run_product?Brand=INFS&ClothID=INFS_20240222MT09292040', options)
    .then(response => response.json())
    .then(response => {
        console.log(response);obj = response
        let all_Route = obj.Product.Routes[0]['TagGroups_order']
        let Route_in_frame = {}
        for (var n = 0 ; n < all_Route.length ; n++){
            Route_in_frame[all_Route[n]] = []
        }
        for (var j = 0 ; j < obj.RouteConfig.length ; j++){
            let item = obj.RouteConfig[j]
            // let idx = all_Route.indexOf(item.TagGroup.S)
            Route_in_frame[item.TagGroup.S].push(item)
        }
        for (var r in Route_in_frame){
            console.log('TagGroup : '+r)
            console.log('Description : '+Route_in_frame[r][0].Description.S)
            document.getElementById('pback').insertAdjacentHTML('beforebegin',  
            `<div class='container mbinfo animX' id="container-${r}">
                        <div class="c_header" id="container-x-header">
                            <span>${r}</span>
                            <p>${Route_in_frame[r][0].Description.S}</p>
                        </div>
                        <div class="selection_scroll">
                            <div class="selection">
                            </div>
                        </div>
                        <div class="footer">
                            <img class="type_backarrow" id="container-${r}-backarrow" src="/left-arrow.png" width="100%"
                                height="100%">
                            <a class='c-${r}'>略過</a>
                        </div>
                    </div>`
                )
                for(let rr = 0 ; rr < Route_in_frame[r].length; rr++){
                    $(`#container-${r}`).find('.selection').append(`
                            <div class="axd_selection">
                            <img class="axd_img c-${r}" src=${Route_in_frame[r][rr].Imgsrc.S} id="container-x-0" data-item=0>
                            <p>${Route_in_frame[r][rr].Name.S}</p>
                        </div>
                    `)
                }
        }   
    
        //function series
        var mytap = ( window.ontouchstart === null ) ? 'touchend' : 'click';
        $('#container-'+all_Route[0]).show();
        for(var fs = 0 ; fs < all_Route.length ; fs++){
            
            (function (fs) {
                console.log('.c-'+all_Route[fs])
                $('.c-'+all_Route[fs]).on(mytap ,function(e){
                    if(fs == all_Route.length-1){
                        $('#container-'+all_Route[fs]).hide();
                        get_recom_res();
                    }
                    else{
                        $('#container-'+all_Route[fs]).hide();
                        $('#container-'+all_Route[fs+1]).show();
                    }
                })
                $(`#container-${r}-backarrow`).on(mytap ,function(e){
                    $('#container-'+all_Route[fs]).hide();
                    $('#container-'+all_Route[fs-1]).show();
                })

                if(fs == 0){
                    reset = function(){
                        $('#container-'+all_Route[fs]).show();
                        $('#container-recom').hide();
                        $(`#container-recom`).find('.selection').children().remove();

                    }   
                }

            })(fs);
        }


        //finish Loading
        $('#loadingbar').hide();
        $('#pback').show();
        $("#containerback").show();
    })
.catch(err => console.error(err));
})

const get_recom_res = () =>{
    $('#loadingbar').show();
    let options = {
        method: 'POST',
        headers: {accept: 'application/json', 'content-type': 'application/json'},
        body: JSON.stringify({
            Brand: 'INFS',
            Tags: {
            TagGroupA: [
                {
                Description: 'eeee',
                Imgsrc: 'https://shoplineimg.com/614d51f4e46907003ed5765f/64d9f64f37fff70016ceed19/2000x.png?',
                Name: '11111',
                Tag: '1712894436698',
                TagGroup: 'TagGroupA'
                },
                {
                Description: '2',
                Imgsrc: 'https://shoplineimg.com/614d51f4e46907003ed5765f/64d9f64f37fff70016ceed19/2000x.png?',
                Name: '可愛5',
                Tag: 'id_T_123457785',
                TagGroup: 'TagGroupA'
                },
                {
                Description: '2',
                Imgsrc: 'https://s3.ap-northeast-2.amazonaws.com/inffitsmanager.assets/tmp/tmp/115-300x400.jpg',
                Name: '可愛7',
                Tag: 'id_T_123457787',
                TagGroup: 'TagGroupA'
                }
            ]
            }
        })
        };

    fetch('https://ldiusfc4ib.execute-api.ap-northeast-1.amazonaws.com/v0/extension/recom_product', options)
        .then(response => response.json())
        .then(response => {show_results(response);})
        .catch(err => console.error(err));

}
const show_results = (response) =>{
    $('#loadingbar').hide();
    $('#container-recom').show();
    console.log(response);
    for(let i = 0 ; i < response.Item.length ; i++){
        console.log(response.Item[i])
        $(`#container-recom`).find('.selection').append(`
        <a href="${response.Item[i].Link}" target="_blank">
            <div class="axd_selection cursor-pointer">
                <img class="c-recom" id="container-recom-${i}" data-item="0" src="${response.Item[i].Imgsrc}">
                <p class="recom-text">${response.Item[i].ItemName}</p>
                <p class="recom-price">NT$ 990</p>
                <div style="position: absolute;right: 14px;top: 10px;border-radius: 3px;width: 60px;height: 30px;background: rgba(255, 255, 255, 0.75);"></div>
            </div>
        </a>
        `)
    }
}
window.addEventListener('message', (event) => {
  console.log('Message received from parent:', event.data);
});
</script>

<style>

html {
    scrollbar-width: none;
    scrollbar-color: rgb(156, 163, 175) rgb(249, 250, 251);
  }

  
* {
    font-family: "Montserrat", "Noto Sans TC", sans-serif;
}
#iframe-container {
    @import url('@/css/css-in/iframe_style.min.css') ;

}  

body{
    background-color: white;
}
.container.back {
    display: block;
    z-index: 99;
    box-shadow: 0 3px 20px -5px rgb(0 0 0 / 50%);
}
.c_header {
    position: relative;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
    line-height: 200%;
    opacity: 1;
    border-bottom: 1px solid #eee;
    padding: 2%;
    letter-spacing: 1px;
}
#startover {
    background: transparent;
    box-shadow: none;
    text-decoration: underline;
    color: rgba(0, 0, 0, 0.8);
    font-weight: 400;
}

.container.animY {
    animation: SlideIn .8s;
    animation-timing-function: cubic-bezier(0.06,0.43,0.26,0.99);
    -webkit-animation-timing-function: cubic-bezier(0.06,0.43,0.26,0.99);
    will-change: transform;
}

.selection_scroll {
    top: 24px;
    height: calc(50% + 24px);
    overflow: scroll;
    scroll-behavior: smooth;
    width: 100%;
    display: block;
    position: relative;

}
.axd_selection p {
    font-size: 12px;
    letter-spacing: 0.1em;
    margin: 4px;
    font-weight: 400;
    cursor: auto;
}
.axd_img {
    width: 92.5%;
    border: solid 1px transparent;
    transition: all .5s;
    border-radius: 5px;
}
::-webkit-scrollbar {
    display: none;
}
*{
    -ms-overflow-style: none; scrollbar-width: none; 
}
.axd_selection {
    width: 30%;
    display: inline-block;
    position: relative;
    font-weight: 400;
    text-align: center;
    background-color: white;
    opacity: 1;
    border-radius: 2px;
    transition: background-color .10s ease-in-out;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 1%;
    cursor: pointer;
    color: gray;
    transition: all .2s;
}
.selection {
    position: relative;
    width: 100%;
    display: inline-block;
    height: 100%;
    -webkit-transform: translate(0);
}
.container {
    position: absolute;
    height: 65%;
    width: 100%;
    bottom: 0;
    background-color: rgba(255, 255, 255, 1);
    background-size: cover;
    color: black;
    z-index: 12;
    text-align: center;
    vertical-align: middle;
    display: none;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    padding:0px;


}
.axd_img:hover {
    border: solid 1px gray;
}
.c-recom {
    max-height: 300px;
    box-shadow: rgba(0, 0, 0, 0.15) 0 2px 8px;
    width: 92.5%;
    border: solid 1px transparent;
    transition: all .5s;
    border-radius: 5px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
}
#container-recom .axd_selection:hover {
    transform: scale(1.025);
}
.footer a {
    position: absolute;
    right: 4%;
    font-size: 12px;
    font-weight: 400;
    color: gray !important;
    top: 10px;
    text-decoration: underline !important;
    cursor: pointer;
    letter-spacing: .1em;
    line-height: 20px;
}
.type_backarrow {
    position: absolute;
    top: 7.5px;
    z-index: 10;
    height: 25px;
    width: 25px;
    left: 4%;
    cursor: pointer;
    background-color: lightgray;
    border-radius: 50%;
    padding: 5px;
}
.footer {
    position: absolute;
    height: 20%;
    width: 100%;
    bottom: 0;

    border-top: none;
    padding: 0px;
    color: black;
    background-color: #fff;
}
img{
    display: inline;
}
.mbinfo{
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}

html, body {
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.2);
    font-family: "Montserrat", "Noto Sans TC", sans-serif;
    width: 100% !important;
    height: 100%;
    padding: 0;
    margin: 0;
}

*:not(input.field) {
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.container.animX {
    animation: SlideInX .8s;
    animation-timing-function: cubic-bezier(0.06,0.43,0.26,0.99);
    -webkit-animation-timing-function: cubic-bezier(0.06,0.43,0.26,0.99);
    will-change: transform;
}
.footer button {
    display: block;
    cursor: pointer;
    width: 68%;
    height: 40px;
    font-weight: 600;
    color: #eee;
    background-color: rgba(0, 0, 0, 0.8);
    transition: .2s ease-in-out;
    border: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    cursor: pointer;
    outline: 0;
    border-radius: 5px;
    letter-spacing: .1em;
    font-size: 12px;
    margin: auto;
    box-shadow: rgba(50, 50, 93, 0.25) 0 6px 12px -2px, rgba(0, 0, 0, 0.3) 0 3px 7px -3px;
}

@media (min-width: 0px) {
    .container {
        max-width: 100%;
    }
}
@keyframes SlideIn {
	0% {
		transform: translateY(100%);
		visibility: visible
	}
	100% {
		transform: translateY(0)
	}
}
@-webkit-keyframes SlideIn {
	0% {
		-webkit-transform: translateY(100%);
		-webkit-visibility: visible
	}
	100% {
		-webkit-transform: translateY(0)
	}
}
@-webkit-keyframes SlideInm {
	0% {
		-webkit-transform: translateY(-25%);
		-webkit-visibility: visible
	}
	100% {
		-webkit-transform: translateY(0)
	}
}
@keyframes SlideOut {
	0% {
		transform: translateY(0)
	}
	100% {
		transform: translateY(100%);
		visibility: hidden;
		bottom: 0
	}
}
@keyframes SlideInbck {
	0% {
		transform: translateY(-100%);
		visibility: visible
	}
	100% {
		transform: translateY(0)
	}
}
@keyframes SlideOutbck {
	0% {
		transform: translateY(0)
	}
	100% {
		transform: translateY(-100%);
		visibility: hidden;
		bottom: 0
	}
}
@keyframes SlideInX {
	0% {
		transform: translateX(100%);
		visibility: visible
	}
	10% {
		transform: translateX(100%);
		visibility: visible
	}
	100% {
		transform: translateX(0)
	}
}

</style>