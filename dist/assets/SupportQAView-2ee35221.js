import{m as h,r as w,h as g,o as e,i as s,b as A,c as r,D as u,c4 as x,l as _,j as n,n as i,t as v,c5 as S,c6 as V,F as Q,y as f,w as m,_ as D,a as p,X as B,Y as C,e as N,S as $}from"./index-e77d52a8.js";const j={key:0,class:"pl-2"},z={__name:"SupportQA",props:{item:{type:Object,required:!0}},setup(a){const c=a,l=w(!1),t=g(()=>!!c.item.menu),o=()=>{t.value&&(l.value=!l.value)};return(d,F)=>(e(),s(Q,null,[A("div",{class:i([{"hover:bg-gray-100 dark:hover:bg-slate-700":t.value,"has-dropdown":t.value},"py-3 w-full cursor-pointer bg-gray-50 dark:bg-slate-800 item"]),onClick:o},[t.value?(e(),r(_,{key:0,path:u(x),class:"flex-none",w:"w-16",size:18},null,8,["path"])):n("",!0),A("span",{class:i([{"pl-12":!t.value},"grow text-ellipsis line-clamp-1 inline-block"])},v(a.item.title),3),a.item.ans?(e(),s("span",{key:1,class:i([{"pl-12":!t.value},"grow text-ellipsis line-clamp-1"])},v(a.item.ans),3)):n("",!0),t.value?(e(),r(_,{key:2,path:l.value?u(S):u(V),class:"flex-none",w:"w-12"},null,8,["path"])):n("",!0)],2),l.value?(e(),s("div",j,[(e(!0),s(Q,null,f(a.item.menu,(k,b)=>(e(),r(y,{key:b,item:k},null,8,["item"]))),128))])):n("",!0),t.value?(e(),s("hr",{key:1,class:i(["my-0 dark:border-slate-800","border-t border-gray-100"])})):n("",!0)],64))}},y=h(z,[["__scopeId","data-v-cd71a639"]]),M={__name:"SupportQAView",setup(a){const c=[{title:"About Q1",menu:[{title:"QQ1",ans:"AA1"},{title:"QQ2",ans:"AA2"},{title:"QQ3",ans:"AA3"}]},{title:"About Q2",menu:[{title:"QQ1",ans:"AA1"},{title:"QQ2",ans:"AA2"},{title:"QQ3",ans:"AA3"}]},{title:"About Q3",menu:[{title:"About QQ1",menu:[{title:"QQQ1",ans:"AA1"},{title:"QQQ2",ans:"AA2"},{title:"QQQ3",ans:"AA3"}]},{title:"QQ2",ans:"AA2"},{title:"QQ3",ans:"AA3"}]}];return(l,t)=>(e(),r(D,null,{default:m(()=>[p($,null,{default:m(()=>[p(B,{icon:u(C),title:"支援",main:""},{default:m(()=>[N("   ")]),_:1},8,["icon"]),(e(),s(Q,null,f(c,(o,d)=>p(y,{key:d,item:o},null,8,["item"])),64))]),_:1})]),_:1}))}};export{M as default};
