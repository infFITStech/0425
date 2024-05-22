import{r as v,a2 as o,q as T,o as I,i as $,b as c,D as k,F as y}from"./index-e77d52a8.js";const D=c("div",{class:"loadingbar",id:"loadingbar"},[c("div",{class:"spinner spinner-circle"})],-1),G=c("div",{class:"container back",id:"containerback"},null,-1),N={class:"container mbinfo animY",id:"container-recom"},S=c("div",{class:"c_header",id:"container-container-recom-header"},[c("span",null,"推薦給您的商品")],-1),B=c("div",{class:"selection_scroll"},[c("div",{class:"selection"})],-1),C={class:"footer"},F=c("div",{id:"pback"},null,-1),E={__name:"IframeContainer",setup(A){var g;const l=v("INFS_20240222MT09292040"),p=v("INFS");window.addEventListener("message",async t=>{t.data.header=="from_preview"&&(await o(".update_delete").remove(),await o("#container-recom").hide(),l.value=t.data.id,p.value=t.data.brand,console.log("change clothID: brand:",l.value,p.value),u()),console.log("Message received from parent:",t.data)});const u=async()=>{const t={method:"GET",headers:{accept:"application/json"}};try{var e;const d=await fetch("https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/run_product?Brand="+p.value+"&ClothID="+l.value,t),w=await d.json();console.log(d),e=w;let i=e.Product.Routes[0].TagGroups_order,s={};for(var r=0;r<i.length;r++)s[i[r]]=[];for(var h=0;h<e.RouteConfig.length;h++){let a=e.RouteConfig[h];s[a.TagGroup.S].push(a)}for(var n in s){console.log("TagGroup : "+n),console.log("Description : "+s[n][0].Description.S),document.getElementById("pback").insertAdjacentHTML("beforebegin",`<div class='container mbinfo animX update_delete' id="container-${n}">
                        <div class="c_header" id="container-x-header">
                            <span>${n}</span>
                            <p>${s[n][0].Description.S}</p>
                        </div>
                        <div class="selection_scroll">
                            <div class="selection">
                            </div>
                        </div>
                        <div class="footer">
                            <img class="type_backarrow" id="container-${n}-backarrow" src="/left-arrow.png" width="100%"
                                height="100%">
                            <a class='c-${n}'>略過</a>
                        </div>
                    </div>`);for(let a=0;a<s[n].length;a++)o(`#container-${n}`).find(".selection").append(`
                            <div class="axd_selection">
                            <img class="axd_img c-${n}" src=${s[n][a].Imgsrc.S} id="container-x-0" data-item=0>
                            <p>${s[n][a].Name.S}</p>
                        </div>
                    `)}var _=window.ontouchstart===null?"touchend":"click";o("#container-"+i[0]).show();for(var m=0;m<i.length;m++)(function(a){console.log(".c-"+i[a]),o(".c-"+i[a]).on(_,function(x){a==i.length-1?(o("#container-"+i[a]).hide(),f()):(o("#container-"+i[a]).hide(),o("#container-"+i[a+1]).show())}),o(`#container-${n}-backarrow`).on(_,function(x){o("#container-"+i[a]).hide(),o("#container-"+i[a-1]).show()}),a==0&&(g=function(){o("#container-"+i[a]).show(),o("#container-recom").hide(),o("#container-recom").find(".selection").children().remove()})})(m);o("#loadingbar").hide(),o("#pback").show(),o("#containerback").show()}catch(d){console.error("Fetch error:",d)}};T(()=>{u()});const f=()=>{o("#loadingbar").show();let t={method:"POST",headers:{accept:"application/json","content-type":"application/json"},body:JSON.stringify({Brand:"INFS",Tags:{TagGroupA:[{Description:"eeee",Imgsrc:"https://shoplineimg.com/614d51f4e46907003ed5765f/64d9f64f37fff70016ceed19/2000x.png?",Name:"11111",Tag:"1712894436698",TagGroup:"TagGroupA"},{Description:"2",Imgsrc:"https://shoplineimg.com/614d51f4e46907003ed5765f/64d9f64f37fff70016ceed19/2000x.png?",Name:"可愛5",Tag:"id_T_123457785",TagGroup:"TagGroupA"},{Description:"2",Imgsrc:"https://s3.ap-northeast-2.amazonaws.com/inffitsmanager.assets/tmp/tmp/115-300x400.jpg",Name:"可愛7",Tag:"id_T_123457787",TagGroup:"TagGroupA"}]}})};fetch("https://ldiusfc4ib.execute-api.ap-northeast-1.amazonaws.com/v0/extension/recom_product",t).then(e=>e.json()).then(e=>{b(e)}).catch(e=>console.error(e))},b=t=>{o("#loadingbar").hide(),o("#container-recom").show(),console.log(t);for(let e=0;e<t.Item.length;e++)console.log(t.Item[e]),o("#container-recom").find(".selection").append(`
        <a href="${t.Item[e].Link}" target="_blank" class="update_delete">
            <div class="axd_selection cursor-pointer">
                <img class="c-recom" id="container-recom-${e}" data-item="0" src="${t.Item[e].Imgsrc}">
                <p class="recom-text">${t.Item[e].ItemName}</p>
                <p class="recom-price">NT$ 990</p>
                <div style="position: absolute;right: 14px;top: 10px;border-radius: 3px;width: 60px;height: 30px;background: rgba(255, 255, 255, 0.75);"></div>
            </div>
        </a>
        `)};return(t,e)=>(I(),$(y,null,[D,G,c("div",N,[S,B,c("div",C,[c("button",{id:"startover",class:"startover enabled",onClick:e[0]||(e[0]=r=>k(g)()),style:{width:"auto","margin-bottom":"5px"}},"重新輸入 ")])]),F],64))}};export{E as default};
