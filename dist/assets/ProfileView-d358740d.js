import{i as K,j as w,o,k as r,t as i,l as k,b as e,n as L,p as y,c as N,q as O,s as B,x as z,r as g,y as T,z as J,f as S,A as Y,F as C,B as U,v as G,C as Q,g as j,w as c,a,D as h,E as W,G as X,u as _,H as A,J as P,K as V,M as H,N as Z,O as ee,P as le,Q as ae,R as se,T as te,U as M,_ as oe,d as E,V as ne,e as F,W as de,X as ce,Y as re,Z as I,S as ie}from"./index-46194475.js";const ue={class:"mb-6 last:mb-0"},me=["for"],be={key:1,class:"text-xs text-gray-500 dark:text-slate-400 mt-1"},x={__name:"FormField",props:{label:{type:String,default:null},labelFor:{type:String,default:null},help:{type:String,default:null}},setup(l){const n=K(),t=w(()=>{const s=[],u=n.default().length;return u>1&&s.push("grid grid-cols-1 gap-3"),u===2&&s.push("md:grid-cols-2"),s});return(s,u)=>(o(),r("div",ue,[l.label?(o(),r("label",{key:0,for:l.labelFor,class:"block font-bold mb-2"},i(l.label),9,me)):k("",!0),e("div",{class:y(t.value)},[L(s.$slots,"default")],2),l.help?(o(),r("div",be,i(l.help),1)):k("",!0)]))}},pe={__name:"FormControlIcon",props:{icon:{type:String,default:null},h:{type:String,default:null}},setup(l){return(n,t)=>(o(),N(O,{path:l.icon,w:"w-10",h:l.h,class:"absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400"},null,8,["path","h"]))}};const _e={class:"relative"},ve=["id","name"],fe=["value"],ge=["id","name","maxlength","placeholder","required"],he=["id","name","maxlength","inputmode","autocomplete","required","placeholder","type"],xe={__name:"FormControl",props:{name:{type:String,default:null},id:{type:String,default:null},autocomplete:{type:String,default:null},maxlength:{type:String,default:null},placeholder:{type:String,default:null},inputmode:{type:String,default:null},icon:{type:String,default:null},options:{type:Array,default:null},type:{type:String,default:"text"},modelValue:{type:[String,Number,Boolean,Array,Object],default:""},required:Boolean,borderless:Boolean,transparent:Boolean,ctrlKFocus:Boolean},emits:["update:modelValue","setRef"],setup(l,{emit:n}){const t=l,s=w({get:()=>t.modelValue,set:f=>{n("update:modelValue",f)}}),u=w(()=>{const f=["px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full","dark:placeholder-gray-400 p25",v.value==="textarea"?"h-24":"h-12",t.borderless?"border-0":"border",t.transparent?"bg-transparent":"bg-white dark:bg-slate-800"];return t.icon&&f.push("pl-10"),f}),v=w(()=>t.options?"select":t.type),m=w(()=>t.type==="textarea"?"h-full":"h-12"),d=z(),D=g(null),R=g(null),$=g(null);if(T(()=>{D.value?n("setRef",D.value):R.value?n("setRef",R.value):n("setRef",$.value)}),t.ctrlKFocus){const f=b=>{b.ctrlKey&&b.key==="k"?(b.preventDefault(),$.value.focus()):b.key==="Escape"&&$.value.blur()};T(()=>{d.isFieldFocusRegistered||(window.addEventListener("keydown",f),d.isFieldFocusRegistered=!0)}),J(()=>{window.removeEventListener("keydown",f),d.isFieldFocusRegistered=!1})}return(f,b)=>(o(),r("div",_e,[v.value==="select"?S((o(),r("select",{key:0,id:l.id,"onUpdate:modelValue":b[0]||(b[0]=p=>s.value=p),name:l.name,class:y(u.value)},[(o(!0),r(C,null,U(l.options,p=>(o(),r("option",{key:p.id??p,value:p},i(p.label??p),9,fe))),128))],10,ve)),[[Y,s.value]]):v.value==="textarea"?S((o(),r("textarea",{key:1,id:l.id,"onUpdate:modelValue":b[1]||(b[1]=p=>s.value=p),class:y(u.value),name:l.name,maxlength:l.maxlength,placeholder:l.placeholder,required:l.required},null,10,ge)),[[G,s.value]]):S((o(),r("input",{key:2,id:l.id,ref_key:"inputEl",ref:$,"onUpdate:modelValue":b[2]||(b[2]=p=>s.value=p),name:l.name,maxlength:l.maxlength,inputmode:l.inputmode,autocomplete:l.autocomplete,required:l.required,placeholder:l.placeholder,type:v.value,class:y([u.value,"p25"])},null,10,he)),[[Q,s.value]]),l.icon?(o(),N(pe,{key:3,icon:l.icon,h:m.value},null,8,["icon","h"])):k("",!0)]))}},q=B(xe,[["__scopeId","data-v-b01aba47"]]),we=e("label",{class:"block font-bold mb-0 text-lg"},"品牌基本資訊 及 方案時間",-1),ye={class:"grid grid-cols-1 lg:grid-cols-2 gap-6"},ke={class:"lg:col-span-1"},$e={class:"lg:col-span-1"},Se={class:"space-y-3 text-center md:text-left lg:mx-12"},Ve={class:"text-2xl"},Ce=e("br",null,null,-1),Fe={key:0,class:"text-sm"},Ne={class:"flex justify-center md:block"},qe={__name:"UserCard",setup(l){const n=j(),t=n.cognitoUser?n.cognitoUser.username:"";return(s,u)=>(o(),N(V,null,{default:c(()=>[we,a(h),a(W,{type:"justify-around lg:justify-center"},{default:c(()=>[e("div",ye,[e("div",ke,[a(X,{class:"lg:mx-12"})]),e("div",$e,[e("div",Se,[e("h1",Ve,[e("b",null,i(_(t)),1),Ce,_(n).MainConfig?(o(),r("label",Fe,i(_(n).MainConfig.BrandName),1)):k("",!0)]),e("div",Ne,[a(A,{label:"啟用中",color:"success",icon:_(P)},null,8,["icon"])])])])])]),_:1})]),_:1}))}};const Be=l=>(se("data-v-a98081b2"),l=l(),te(),l),Ue={class:"text-sm"},De=Be(()=>e("label",{class:"font-bold mb-0 text-lg mr-3"},"付費訂閱",-1)),Re={class:"sm:flex mt-3 h-full"},Te={class:"sm:w-1/2 p-4"},Me={class:"text-sm"},Ee=ae('<div class="hidden lg:block lg:w-px bg-gray-300" data-v-a98081b2></div><div class="sm:w-1/2 p-4" data-v-a98081b2><div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-a98081b2><div class="lg:col-span-1" data-v-a98081b2><label class="block font-bold mb-2 text-sm" data-v-a98081b2>繳費週期:</label></div><div class="lg:col-span-2" data-v-a98081b2><label class="block mb-2 text-sm" data-v-a98081b2>123</label></div><div class="lg:col-span-1" data-v-a98081b2><label class="block font-bold mb-2 text-sm" data-v-a98081b2>方案開始日:</label></div><div class="lg:col-span-2" data-v-a98081b2><label class="block mb-2 text-sm" data-v-a98081b2>123</label></div><div class="lg:col-span-1" data-v-a98081b2><label class="block font-bold mb-2 text-sm" data-v-a98081b2>方案到期日:</label></div><div class="lg:col-span-2" data-v-a98081b2><label class="block mb-2 text-sm" data-v-a98081b2>123</label></div><div class="lg:col-span-1" data-v-a98081b2><label class="block font-bold mb-2 text-sm" data-v-a98081b2>付款方式:</label></div><div class="lg:col-span-2" data-v-a98081b2><label class="block mb-2 text-sm" data-v-a98081b2>123</label></div></div></div>',2),Ie={__name:"OrderNow",setup(l){const n=g(["項目1","項目2","項目3","項目4","項目5","項目6","項目7","項目4","項目5","項目6","項目7"]),t=g(!1),s=()=>{t.value=!t.value};return(u,v)=>(o(),r(C,null,[e("div",Ue,[De,a(A,{label:"啟用中",color:"success",icon:_(P)},null,8,["icon"]),a(H,{label:"購買方案",color:"info",class:y({"float-right":!0})})]),e("div",Re,[e("div",Te,[e("div",Me,[e("div",{class:"flex justify-between items-center cursor-pointer",onClick:s},[e("span",null,"擴充功能 ("+i(n.value.length)+")",1),a(O,{path:t.value?_(Z):_(ee),class:"hidden lg:inline-flex transition-colors"},null,8,["path"])]),S(e("div",null,[e("ul",null,[(o(!0),r(C,null,U(n.value,(m,d)=>(o(),r("li",{key:d},i(m),1))),128))])],512),[[le,t.value]])])]),Ee])],64))}},Oe=B(Ie,[["__scopeId","data-v-a98081b2"]]),je={};function Ae(l,n){return" hello2 "}const Pe=B(je,[["render",Ae]]),He={style:{"padding-left":"15px","padding-right":"15px"}},Ke={class:"grid grid-cols-1 lg:grid-cols-2 gap-6"},Le=e("label",{class:"block font-bold mb-2 text-lg"},"更改密碼",-1),ze=e("label",{class:"block font-bold mb-2 text-lg"},"品牌帳單資訊",-1),Je={key:0,class:"block mb-2 text-lg"},Ye=e("thead",{class:"TH"},[e("tr",null,[e("th",null,"項目名稱"),e("th",null,"描述"),e("th",null,"數量"),e("th",null,"單位"),e("th",null,"金額")])],-1),Ge={class:"TD","data-label":"項目名稱"},Qe={class:"TD","data-label":"描述"},We={class:"TD","data-label":"數量"},Xe={class:"TD","data-label":"單位"},Ze={class:"TD","data-label":"金額"},el={class:"grid grid-cols-1 lg:grid-cols-2 gap-6"},ll=e("label",{class:"block font-bold mb-2 text-lg"},"線下匯款",-1),al=e("div",{class:"grid grid-cols-1 md:grid-cols-3 lg:gap-6"},[e("div",{class:"md:col-span-1"},[e("label",{class:"block mb-2 text-sm"},"帳戶:")]),e("div",{class:"md:col-span-2"},[e("label",{class:"block mb-2 text-sm"},"123")]),e("div",{class:"md:col-span-1"},[e("label",{class:"block mb-2 text-sm"},"銀行:")]),e("div",{class:"md:col-span-2"},[e("label",{class:"block mb-2 text-sm"},"123")]),e("div",{class:"md:col-span-1"},[e("label",{class:"block mb-2 text-sm"},"分行代碼:")]),e("div",{class:"md:col-span-2"},[e("label",{class:"block mb-2 text-sm"},"123")]),e("div",{class:"md:col-span-1"},[e("label",{class:"block mb-2 text-sm"},"銀行代碼:")]),e("div",{class:"md:col-span-2"},[e("label",{class:"block mb-2 text-sm"},"123")]),e("div",{class:"md:col-span-1"},[e("label",{class:"block mb-2 text-sm"},"帳戶號碼:")]),e("div",{class:"md:col-span-2"},[e("label",{class:"block mb-2 text-sm"},"123")])],-1),sl=e("label",{class:"block mb-2 text-sm"},[F("請通知線上顧問後五碼，或以電子郵件方式回覆至，"),e("a",{href:"mailto:example@example.com"},"example@example.com"),F(" 我們會為您確認款項。")],-1),ol={__name:"ProfileView",setup(l){const n=j(),t=g(n.MainConfig.Billing[0].Item),s=g({password_current:"",password:"",password_confirmation:""});g([{name:"本期訂閱",component:M(Oe)},{name:"下期訂閱",component:M(Pe)}]);const u=async()=>{if(s.value.password!==s.value.password_confirmation){alert("New passwords do not match.");return}n.cognitoUser.changePassword(s.value.password_current,s.value.password,(v,m)=>{if(v){alert(v.message||JSON.stringify(v));return}alert("Password changed successfully!"),s.value={password_current:"",password:"",password_confirmation:""}})};return(v,m)=>(o(),N(oe,null,{default:c(()=>[a(ie,null,{default:c(()=>[a(E,{icon:_(ne),title:"商家設定",main:""},{default:c(()=>[F("   ")]),_:1},8,["icon"]),e("div",He,[a(qe,{class:"mb-6"}),e("div",Ke,[a(V,{"is-form":"",onSubmit:de(u,["prevent"])},{footer:c(()=>[a(ce,null,{default:c(()=>[a(H,{type:"submit",color:"info",label:"Submit"})]),_:1})]),default:c(()=>[Le,a(h),a(x,{label:"Current password",help:"Required. Your current password"},{default:c(()=>[a(q,{modelValue:s.value.password_current,"onUpdate:modelValue":m[0]||(m[0]=d=>s.value.password_current=d),icon:_(re),name:"password_current",type:"password",required:"",autocomplete:"current-password"},null,8,["modelValue","icon"])]),_:1}),a(h),a(x,{label:"New password",help:"Required. New password"},{default:c(()=>[a(q,{modelValue:s.value.password,"onUpdate:modelValue":m[1]||(m[1]=d=>s.value.password=d),icon:_(I),name:"password",type:"password",required:"",autocomplete:"new-password"},null,8,["modelValue","icon"])]),_:1}),a(x,{label:"Confirm password",help:"Required. New password one more time"},{default:c(()=>[a(q,{modelValue:s.value.password_confirmation,"onUpdate:modelValue":m[2]||(m[2]=d=>s.value.password_confirmation=d),icon:_(I),name:"password_confirmation",type:"password",required:"",autocomplete:"new-password"},null,8,["modelValue","icon"])]),_:1})]),_:1},8,["onSubmit"]),a(V,null,{default:c(()=>[ze,a(h),t.value.length?k("",!0):(o(),r("label",Je,"沒有服務費用")),e("table",null,[Ye,e("tbody",null,[(o(!0),r(C,null,U(t.value,d=>(o(),r("tr",{key:d["#"]},[e("td",Ge,i(d.項目名稱),1),e("td",Qe,i(d.描述),1),e("td",We,i(d.數量),1),e("td",Xe,i(d.單位),1),e("td",Ze,i(d.金額?d.金額:"-"),1)]))),128))])])]),_:1})]),a(h),a(E,{title:"匯款資訊"},{default:c(()=>[F("  ")]),_:1}),e("div",el,[a(V,null,{default:c(()=>[ll,a(h),a(x,{label:"付款指示"},{default:c(()=>[al]),_:1}),a(x,{label:"付款完成後"},{default:c(()=>[sl]),_:1})]),_:1})])])]),_:1})]),_:1}))}};export{ol as default};
