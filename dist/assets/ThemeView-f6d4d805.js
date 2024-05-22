import{m as S,r as v,q as B,o as n,c as $,w as b,_ as z,c2 as u,a as x,X as V,D as E,Y as L,e as j,b as e,i as c,y,t as h,F as T,n as k,d as f,v as w,S as A,a2 as F,Q as U,R as O}from"./index-e77d52a8.js";import"./bootstrap.min-6e4ebdd2.js";const i=r=>(U("data-v-b996d600"),r=r(),O(),r),P={class:"container pb-3"},R={class:"col-12 font-bold mb-2"},J={class:"col-lg-3 col-md-4 col-sm-12 col-12 mb-3"},W=["onClick"],q=i(()=>e("div",{class:"card-body d-flex flex-column align-items-center justify-content-center"},[e("div",null,[e("div",{class:"profile-img w-100 border-4 mb-3"},[e("div",{class:"img-circle-wrapper text-primary"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"40",height:"40",fill:"currentColor",class:"bi bi-plus img-circle",viewBox:"0 0 16 16"},[e("path",{d:"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"})])])]),e("p",{class:"h5 font-bold text-balck-50 mb-1"},"ADD NEW")])],-1)),H=[q],K={class:"h-100 card text-center border-0 rounded bg-white shadow"},Q={class:"card-header py-4"},X={class:"profile-img mb-3"},Y={class:"img-circle-wrapper"},Z=["src"],ee={class:"h4 font-bold text-body mb-1"},te={class:"text-break text-truncate",style:{"white-space":"wrap"}},se={class:"position-absolute top-0 right-0 dropdown p-3"},oe=i(()=>e("div",{class:"cursor-pointer",type:"button",id:"dropdownMenuButton","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-three-dots-vertical",viewBox:"0 0 16 16"},[e("path",{d:"M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"})])],-1)),ae={class:"dropdown-menu dropdown-menu-right","aria-labelledby":"dropdownMenuButton"},ie=["onClick"],le=["onClick"],ne={class:"row"},de={class:"col-12 mb-3"},ce=i(()=>e("div",{class:"card-body d-flex flex-column align-items-center justify-content-center"},[e("div",{class:"d-flex align-items-center"},[e("div",{class:"profile-img border-4 mr-2",style:{width:"40px"}},[e("div",{class:"img-circle-wrapper text-primary"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"40",height:"40",fill:"currentColor",class:"bi bi-plus img-circle",viewBox:"0 0 16 16"},[e("path",{d:"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"})])])]),e("p",{class:"h5 font-bold text-balck-50 mb-1"},"ADD NEW THEME")])],-1)),re=[ce],me={class:"modal fade",id:"deleteModal",tabindex:"-1",role:"dialog","aria-hidden":"true"},pe={class:"modal-dialog modal-dialog-centered",role:"document"},ue={class:"modal-content"},he=i(()=>e("div",{class:"modal-header border-0"},[e("h5",{class:"modal-title"},"確認刪除"),e("button",{type:"button",class:"close","data-dismiss":"modal","aria-label":"Close"},[e("span",{"aria-hidden":"true"},"×")])],-1)),_e=i(()=>e("div",{class:"modal-body"},[e("h5",null,"是否確認刪除此標籤？")],-1)),ge={class:"modal-footer border-0"},ve=i(()=>e("button",{type:"button",class:"btn btn-secondary","data-dismiss":"modal"},"取消操作",-1)),be={class:"modal fade",id:"editModal",tabindex:"-1",role:"dialog","aria-hidden":"true"},fe={class:"modal-dialog modal-dialog-centered",role:"document"},we={class:"modal-content"},xe={class:"modal-header border-0"},ye={class:"modal-title"},Te=i(()=>e("button",{type:"button",class:"close","data-dismiss":"modal","aria-label":"Close"},[e("span",{"aria-hidden":"true"},"×")],-1)),ke={class:"modal-body"},Ie={id:"form-edit",class:"d-flex align-items-start"},Me={class:"d-block w-25"},Ce={class:"d-flex flex-column w-75 mx-auto cursor-pointer"},De={class:"img-circle-wrapper mb-2"},Ne=["src"],Ge={key:1,class:"img-circle img-fluid bg-gray-light"},Se={class:"w-75 container-fluid"},Be={class:"d-flex align-items-center mb-2"},$e=i(()=>e("label",{class:"pr-2 flex-shrink-0"},"主題名稱",-1)),ze={class:"d-flex align-items-center mb-2"},Ve=i(()=>e("label",{class:"pr-2 flex-shrink-0"},"名稱",-1)),Ee={class:"d-flex align-items-center mb-2"},Le=i(()=>e("label",{class:"pr-2 flex-shrink-0"},"描述",-1)),je={class:"modal-footer flex-column align-items-end border-0"},Ae=i(()=>e("div",{id:"hint-edit",class:"d-none text-right text-danger mb-1"},"請填寫完整資訊",-1)),Fe=i(()=>e("button",{type:"button",class:"btn btn-secondary mr-2","data-dismiss":"modal"},"取消編輯",-1)),Ue={__name:"ThemeView",setup(r){const I=v([]),_=v([]),o=v({}),M=a=>{const t=a.target.files[0];if(!t)return;const s=new Image;s.src=URL.createObjectURL(t),s.onload=()=>{if(s.width/s.height!==3/4){alert("圖片比例不符合3:4");return}else u.put(`https://x24sw7agoh.execute-api.ap-northeast-2.amazonaws.com/v2/inffitsmanager.assets/tmp/tmp/${t.name}`,t,{headers:{"Content-Type":t.type}}).then(m=>{const p="https://s3.ap-northeast-2.amazonaws.com/inffitsmanager.assets/tmp/tmp/"+t.name;console.log(p),o.value.Imgsrc=p}).catch(m=>{console.error(m),console.log("IMG UPLOAD FAIL")})}},g=()=>{u.get("https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/get_tags?Brand=INFS&Per_Page=100&Page=1").then(a=>{const t={};I.value=a.data.models,a.data.models.forEach(s=>{t[s.TagGroup]||(t[s.TagGroup]=[]),t[s.TagGroup].push(s)}),_.value=[];for(const s in t)_.value.push({group:s,tags:t[s]})})},d=(a={TagGroup:"",Tag:String(new Date().getTime()),Name:"",Imgsrc:"",Description:""},t=!0,s="editModal")=>{o.value=Object.assign({TagGroup:"",Tag:String(new Date().getTime()),Name:"",Imgsrc:"",Description:""},JSON.parse(JSON.stringify(a))),t&&C(s)},C=a=>{F(`#${a}`).modal("toggle")},D=()=>{u.post("https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/update_tag",{Brand:"INFS",Data:o.value}).then(a=>{console.log(a),g(),d({},!0,"editModal")})},N=()=>{u.delete(`https://xjsoc4o2ci.execute-api.ap-northeast-1.amazonaws.com/v0/extension/del_tag?Brand=INFS&Tag=${o.value.Tag}`).then(a=>{console.log(a),g(),d({},!0,"deleteModal")})};return B(()=>{g()}),(a,t)=>(n(),$(z,null,{default:b(()=>[x(A,null,{default:b(()=>[x(V,{icon:E(L),title:"主題標籤管理",main:""},{default:b(()=>[j("   ")]),_:1},8,["icon"]),e("div",P,[(n(!0),c(T,null,y(_.value,(s,m)=>(n(),c("div",{key:m,class:"row mb-3"},[e("h4",R,h(s.group),1),e("div",J,[e("div",{class:"h-100 flex-grow-1 card shadow text-center bg-white border-0 rounded cursor-pointer",onClick:l=>d({TagGroup:s.group})},H,8,W)]),(n(!0),c(T,null,y(s.tags,(l,p)=>(n(),c("div",{key:p,class:"col-lg-3 col-md-4 col-sm-12 col-12 mb-3"},[e("div",K,[e("div",Q,[e("div",X,[e("div",Y,[e("div",{class:k(["img-circle img-fluid bg-gray-light",l.Imgsrc?"":"d-none"])},null,2),e("img",{class:k(["img-circle img-fluid",l.Imgsrc?"":"d-none"]),src:l.Imgsrc,alt:""},null,10,Z)])]),e("div",ee,h(l.Name),1),e("small",te,h(l.Description),1),e("div",se,[oe,e("div",ae,[e("a",{class:"dropdown-item",onClick:G=>d(l,!0,"editModal")},"Edit",8,ie),e("a",{class:"dropdown-item",onClick:G=>d(l,!0,"deleteModal")},"Delete",8,le)])])])])]))),128))]))),128)),e("div",ne,[e("div",de,[e("div",{class:"h-100 flex-grow-1 card shadow text-center bg-white border-0 rounded cursor-pointer",onClick:t[0]||(t[0]=s=>d())},re)])])]),e("div",me,[e("div",pe,[e("div",ue,[he,_e,e("div",ge,[ve,e("button",{type:"button",class:"btn btn-primary",onClick:t[1]||(t[1]=s=>N())},"刪除")])])])]),e("div",be,[e("div",fe,[e("div",we,[e("div",xe,[e("h5",ye,h(o.value.Key?"編輯":"新增")+"標籤",1),Te]),e("div",ke,[e("form",Ie,[e("label",Me,[e("label",Ce,[e("div",De,[o.value.Imgsrc?(n(),c("img",{key:0,class:"img-circle img-fluid",id:"img-edit",src:o.value.Imgsrc,alt:""},null,8,Ne)):(n(),c("div",Ge))]),e("input",{type:"file",class:"d-none",onChange:M,accept:"image/*"},null,32)])]),e("div",Se,[e("div",Be,[$e,f(e("input",{type:"text",name:"TagGroup","onUpdate:modelValue":t[2]||(t[2]=s=>o.value.TagGroup=s),class:"form-control"},null,512),[[w,o.value.TagGroup]])]),e("div",ze,[Ve,f(e("input",{type:"text",name:"Name","onUpdate:modelValue":t[3]||(t[3]=s=>o.value.Name=s),class:"form-control"},null,512),[[w,o.value.Name]])]),e("div",Ee,[Le,f(e("input",{type:"text",name:"Description","onUpdate:modelValue":t[4]||(t[4]=s=>o.value.Description=s),class:"form-control"},null,512),[[w,o.value.Description]])])])])]),e("div",je,[Ae,e("div",null,[Fe,e("button",{type:"button",class:"btn btn-primary",onClick:t[5]||(t[5]=s=>D())},"存檔")])])])])])]),_:1})]),_:1}))}},Re=S(Ue,[["__scopeId","data-v-b996d600"]]);export{Re as default};
