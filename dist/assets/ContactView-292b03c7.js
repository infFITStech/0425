import{r as i,o as b,c as x,w as p,_ as w,a as y,b as s,d,v as r,S as C,e as m,u as S,f as N,L as k,I as T}from"./index-e77d52a8.js";const V={class:""},E={class:"dashboard-ecommerce"},P={class:"container-fluid dashboard-content"},U={class:"row"},I={class:"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"},M=s("div",{class:"section-block",id:"basicform"},[s("h3",{class:"section-title"},[s("span",{class:"lang-en"},"Contact Us"),s("span",{class:"lang-tw"},"聯絡我們")]),s("p",null,[s("span",{class:"lang-en"},"Got a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible."),s("span",{class:"lang-tw"},"如果有任何問題，歡迎隨時與我們聯絡，將儘快回覆您。")]),s("div",{id:"afterChangingPassword",style:{display:"none"}},[s("span",{class:"lang-en"},"Your message has been sent."),s("span",{class:"lang-tw"},"您的訊息已送出。")])],-1),B={class:"card"},J={class:"card-body"},O={class:"form-group"},Y=s("label",{for:"inputText3",class:"col-form-label"},[s("span",{class:"lang-en"},"Name"),s("span",{class:"lang-tw"},"聯絡人"),m("*")],-1),j={class:"form-group"},D=s("label",{for:"inputEmail"},[s("span",{class:"lang-en"},"Email address"),s("span",{class:"lang-tw"},"電子信箱"),m("*")],-1),F={class:"form-group"},L=s("label",{for:"exampleFormControlTextarea1"},[s("span",{class:"lang-en"},"Message"),s("span",{class:"lang-tw"},"訊息內容"),m("*")],-1),q=s("span",{id:"missingtext",style:{"margin-right":"20px",display:"none",color:"red"}},[s("span",{class:"lang-en"},"Imcomplete Values"),s("span",{class:"lang-tw"},"請確認信件相關內容，再試一次。")],-1),A=s("span",{id:"Completetext",style:{"margin-right":"20px",display:"none",color:"rgba(0,150,0)"}},"Thank You! Your message has been sent",-1),G=s("span",{class:"lang-en"},"Send",-1),R=s("span",{class:"lang-tw"},"送出",-1),W=[G,R],H={__name:"ContactView",setup($){const n=i(""),o=i(""),t=i(""),u=async()=>{const l=S(),a=l.cognitoUser.username+"後台問題";if(n.value!==""&&o.value.includes("@")&&t.value!==""){const g=N().getCognitoIdentityCredentials(l.idToken),_=new k({region:"ap-northeast-2",credentials:g}),h=JSON.stringify({Email:o,Name:n,Phone:"pass",Subject:a,Message:t}),v={FunctionName:"SendEmail",Payload:new TextEncoder().encode(JSON.stringify(h))};try{const c=await _.send(new T(v)),f=JSON.parse(new TextDecoder().decode(c.Payload));n.value="",o.value="",t.value="",console.log(f)}catch(c){console.error(c)}}};return(l,a)=>(b(),x(w,null,{default:p(()=>[y(C,null,{default:p(()=>[s("div",V,[s("div",E,[s("div",P,[s("div",U,[s("div",I,[M,s("div",B,[s("div",J,[s("form",null,[s("div",O,[Y,d(s("input",{id:"contactname","onUpdate:modelValue":a[0]||(a[0]=e=>n.value=e),type:"text",class:"form-control"},null,512),[[r,n.value]])]),s("div",j,[D,d(s("input",{id:"inputEmail","onUpdate:modelValue":a[1]||(a[1]=e=>o.value=e),type:"email",placeholder:"name@example.com",class:"form-control"},null,512),[[r,o.value]])]),s("div",F,[L,d(s("textarea",{"onUpdate:modelValue":a[2]||(a[2]=e=>t.value=e),class:"form-control",id:"mailcontent",rows:"5",style:{"margin-top":"0px","margin-bottom":"0px",height:"150px"}},null,512),[[r,t.value]])])]),s("div",{style:{"text-align":"right"}},[q,A,s("button",{class:"btn btn-primary",onClick:u},W)])])])])])])])])]),_:1})]),_:1}))}};export{H as default};
