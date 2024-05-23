import{r as x,bh as k,$ as a,y as $,o as I,k as T,b as i,u as y,F as B}from"./index-0734d7b4.js";const C=i("div",{class:"loadingbar",id:"loadingbar"},[i("div",{class:"spinner spinner-circle"})],-1),D=i("div",{class:"container back",id:"containerback"},null,-1),N={class:"container mbinfo animY",id:"container-recom"},G=i("div",{class:"c_header",id:"container-container-recom-header"},[i("span",null,"推薦給您的商品")],-1),S=i("div",{class:"selection_scroll"},[i("div",{class:"selection"})],-1),R={class:"footer"},E=i("div",{id:"pback"},null,-1),P={__name:"IframeContainer",setup(F){var u;const p=x(""),s=x("");let r=k({});const w=()=>{a(".update_delete").remove(),a("#container-recom").hide(),r={}};window.addEventListener("message",async n=>{n.data.header=="from_preview"&&(await w(),p.value=n.data.id,s.value=n.data.brand,console.log("change clothID: brand:",p.value,s.value),f()),console.log("Message received from parent:",n.data)});const f=async()=>{const n={method:"GET",headers:{accept:"application/json"}};try{var t;if(t=await(await fetch("https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/run_product?Brand="+s.value+"&ClothID="+p.value,n)).json(),console.log("obj",t),!t.Product)return;let o=t.Product.Routes[0].TagGroups_order,l={};for(var d=0;d<o.length;d++)l[o[d]]=[];for(var h=0;h<t.RouteConfig.length;h++){let e=t.RouteConfig[h];l[e.TagGroup.S].push(e)}for(var c in l){console.log("TagGroup : "+c),document.getElementById("pback").insertAdjacentHTML("beforebegin",`<div class='container mbinfo animX update_delete' id="container-${c.replaceAll(" ","")}">
                        <div class="c_header" id="container-x-header">
                            <span>${c}</span>
                            <p>${l[c].length>0?l[c][0].Description.S:""}</p>
                        </div>
                        <div class="selection_scroll">
                            <div class="selection">
                            </div>
                        </div>
                        <div class="footer">
                            <img class="type_backarrow" id="container-${c.replaceAll(" ","")}-backarrow" src="/left-arrow.png" width="100%"
                                height="100%">
                            <a class='c-${c.replaceAll(" ","")} skip'>略過</a>
                        </div>
                    </div>`);for(let e=0;e<l[c].length;e++)a(`#container-${c.replaceAll(" ","")}`).find(".selection").append(`
                            <div class="axd_selection">
                            <img class="axd_img c-${c.replaceAll(" ","")}" src=${l[c][e].Imgsrc.S} id="container-x-0" data-item=0>
                            <p>${l[c][e].Name.S}</p>
                        </div>
                    `)}var m=window.ontouchstart===null?"touchend":"click";a("#container-"+o[0]).show();for(var g=0;g<o.length;g++)(function(e){console.log(".c-"+o[e].replaceAll(" ","")),a(".c-"+o[e].replaceAll(" ","")+".skip").on(m,function(b){e==o.length-1?(a("#container-"+o[e].replaceAll(" ","")).hide(),_()):(console.log(".c-"+o[e+1].replaceAll(" ","")),a("#container-"+o[e].replaceAll(" ","")).hide(),a("#container-"+o[e+1].replaceAll(" ","")).show())}),a(".c-"+o[e].replaceAll(" ","")+":not(.skip)").on(m,function(b){e==o.length-1?(a("#container-"+o[e].replaceAll(" ","")).hide(),r[o[e].replaceAll(" ","")]=[{Description:"example",Imgsrc:"https://example.com/imageB1.png",Name:"example",Tag:"example",TagGroup:o[e]}],_()):(a("#container-"+o[e].replaceAll(" ","")).hide(),a("#container-"+o[e+1].replaceAll(" ","")).show(),r[o[e]]=[{Description:"example",Imgsrc:"https://example.com/imageB1.png",Name:"example",Tag:"example",TagGroup:o[e]}])}),a(`#container-${o[e].replaceAll(" ","")}-backarrow`).on(m,function(b){e!=0&&(a("#container-"+o[e].replaceAll(" ","")).hide(),a("#container-"+o[e-1].replaceAll(" ","")).show())}),e==0&&(u=function(){a("#container-"+o[e].replaceAll(" ","")).show(),a("#container-recom").hide(),a("#container-recom").find(".selection").children().remove(),r={}})})(g);a("#loadingbar").hide(),a("#pback").show(),a("#containerback").show()}catch(v){console.error("Fetch error:",v)}};$(()=>{});const _=()=>{a("#loadingbar").show();let n={method:"POST",headers:{accept:"application/json","content-type":"application/json"},body:JSON.stringify({Brand:s.value,Tags:r})};console.log("tags chosen:",r),fetch("https://ldiusfc4ib.execute-api.ap-northeast-1.amazonaws.com/v0/extension/recom_product",n).then(t=>t.json()).then(t=>{A(t)}).catch(t=>console.error(t))},A=n=>{a("#loadingbar").hide(),a("#container-recom").show(),console.log(n);for(let t=0;t<n.Item.length;t++)a("#container-recom").find(".selection").append(`
    <a href="${n.Item[t].Link}" target="_blank" class="update_delete">
        <div class="axd_selection cursor-pointer">
            <img class="c-recom" id="container-recom-${t}" data-item="0" src="${n.Item[t].Imgsrc}">
            <p class="recom-text">${n.Item[t].ItemName}</p>
            <p class="recom-price">NT$ 990</p>
            <div style="position: absolute;right: 14px;top: 10px;border-radius: 3px;width: 60px;height: 30px;background: rgba(255, 255, 255, 0.75);"></div>
        </div>
    </a>
    `)};return(n,t)=>(I(),T(B,null,[C,D,i("div",N,[G,S,i("div",R,[i("button",{id:"startover",class:"startover enabled",onClick:t[0]||(t[0]=d=>y(u)()),style:{width:"auto","margin-bottom":"5px"}},"重新輸入 ")])]),E],64))}};export{P as default};
