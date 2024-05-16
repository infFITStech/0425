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
import {onMounted, ref, reactive} from 'vue'
var reset;
const ClothID=ref('INFS_20240222MT09292040');
const Brand=ref('INFS');
let tags_chosen = reactive({});

const Initial=()=>{
 $('.update_delete').remove();
 $('#container-recom').hide();
 tags_chosen = {};
}

window.addEventListener('message', async (event) => {
if(event.data.header=='from_preview')
{
await Initial();


ClothID.value=event.data.id;
Brand.value=event.data.brand;
console.log('change clothID: brand:', ClothID.value, Brand.value);
fetchData();

}
else{
;
}
console.log('Message received from parent:', event.data);

});

const fetchData = async () => {
const options = { method: 'GET', headers: { accept: 'application/json' } };
try {

var obj;
const response = await fetch('https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/run_product?Brand='+Brand.value+'&ClothID='+ClothID.value, options);
const data = await response.json();
    obj = data; console.log("obj", obj);
    if(!obj.Product) return;
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
        document.getElementById('pback').insertAdjacentHTML('beforebegin',  
        `<div class='container mbinfo animX update_delete' id="container-${r.replaceAll(' ','')}">
                    <div class="c_header" id="container-x-header">
                        <span>${r}</span>
                        <p>${Route_in_frame[r].length > 0 ? Route_in_frame[r][0].Description.S : ''}</p>
                    </div>
                    <div class="selection_scroll">
                        <div class="selection">
                        </div>
                    </div>
                    <div class="footer">
                        <img class="type_backarrow" id="container-${r.replaceAll(' ','')}-backarrow" src="/left-arrow.png" width="100%"
                            height="100%">
                        <a class='c-${r.replaceAll(' ','')} skip'>略過</a>
                    </div>
                </div>`
            )
            for(let rr = 0 ; rr < Route_in_frame[r].length; rr++){
                $(`#container-${r.replaceAll(' ','')}`).find('.selection').append(`
                        <div class="axd_selection">
                        <img class="axd_img c-${r.replaceAll(' ','')}" src=${Route_in_frame[r][rr].Imgsrc.S} id="container-x-0" data-item=0>
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
            console.log('.c-'+all_Route[fs].replaceAll(' ',''))
           
            
            $('.c-'+all_Route[fs].replaceAll(' ','')+'.skip').on(mytap ,function(e){
                if(fs == all_Route.length-1){
                    $('#container-'+all_Route[fs].replaceAll(' ','')).hide();
                    get_recom_res();
                }
                else{
                    console.log('.c-'+all_Route[fs+1].replaceAll(' ',''))
                    $('#container-'+all_Route[fs].replaceAll(' ','')).hide();
                    $('#container-'+all_Route[fs+1].replaceAll(' ','')).show();
                }
            });
            
            $('.c-'+all_Route[fs].replaceAll(' ','')+':not(.skip)').on(mytap ,function(e){
                if(fs == all_Route.length-1){
                    $('#container-'+all_Route[fs].replaceAll(' ','')).hide();

                    tags_chosen[all_Route[fs].replaceAll(' ','')] = [
                        {
                            Description: 'example',
                            Imgsrc: 'https://example.com/imageB1.png',
                            Name: 'example',
                            Tag: 'example',
                            TagGroup: all_Route[fs]
                        }]

                    get_recom_res();
                }
                else{
                    $('#container-'+all_Route[fs].replaceAll(' ','')).hide();
                    $('#container-'+all_Route[fs+1].replaceAll(' ','')).show();
                    tags_chosen[all_Route[fs]] = [
                        {
                            Description: 'example',
                            Imgsrc: 'https://example.com/imageB1.png',
                            Name: 'example',
                            Tag: 'example',
                            TagGroup: all_Route[fs]
                        }]
                }
            })
            $(`#container-${all_Route[fs].replaceAll(' ','')}-backarrow`).on(mytap ,function(e){
                if(fs!=0){
                $('#container-'+all_Route[fs].replaceAll(' ','')).hide();
                $('#container-'+all_Route[fs-1].replaceAll(' ','')).show();
                }
               
            })

            if(fs == 0){
                reset = function(){
                    $('#container-'+all_Route[fs].replaceAll(' ','')).show();
                    $('#container-recom').hide();
                    $(`#container-recom`).find('.selection').children().remove();

                    tags_chosen = {}

                }   
            }

        })(fs);
    }

    //finish Loading
    $('#loadingbar').hide();
    $('#pback').show();
    $("#containerback").show();
} catch (error) {
console.error('Fetch error:', error);
}
};


onMounted(() => {
fetchData();
});

const get_recom_res = () =>{
$('#loadingbar').show();
let options = {
    method: 'POST',
    headers: {accept: 'application/json', 'content-type': 'application/json'},
    body: JSON.stringify({
        Brand: 'INFS',
        Tags: tags_chosen
    })
    };

console.log("tags chosen:", tags_chosen)

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
    $(`#container-recom`).find('.selection').append(`
    <a href="${response.Item[i].Link}" target="_blank" class="update_delete">
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

</script>
<style>
@import url('@/css/css-in/iframe_style.min.css') ;

.axd_selection{
transition: all .2s;
}
.selection_scroll {
top:24px;
height: calc(50% + 24px);
overflow: scroll;
scroll-behavior: smooth; /* 平滑滚动效果 */
}
.selection{
height:100%;
}
.axd_selection p {
font-size: 12px;
letter-spacing: 0.1em;
margin: 4px;
}
.axd_img{
border-radius:5px;
}
.c-recom{
max-height:300px;
box-shadow:rgba(0,0,0,0.15) 0 2px 8px;
width: 92.5%;
border: solid 1px transparent;
transition: all .5s;
border-radius: 5px;

}
.recom-text{
letter-spacing: .1em !important;
color:black;
font-size: 12px;
font-weight: 500 !important;
line-height: 1.4em;
color: #0a0101;
text-transform: none;
text-align: left;
margin-top: 8px !important;
max-height: 48px;
overflow: scroll;
}
.recom-price{
letter-spacing: 0 !important;
color:gray;
font-size: 12px;
font-weight: 400;
color: #0a0101;
text-align: left;
line-height: 1.2em;
/* font-family: 'Noto Sans TC'; */
}

#container-recom .axd_selection:hover{
transform:scale(1.025);
}

</style>
