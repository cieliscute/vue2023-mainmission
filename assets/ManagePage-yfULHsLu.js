import{_ as u,S as m,c,a as t,F as d,r as p,b as n,t as s,d as g,o as i}from"./index-Co-uMUWy.js";const k={data(){return{products:"",temp:"",loading:!0}},computed:{},methods:{checktoken(){const l=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1"),h="https://vue3-course-api.hexschool.io/v2/api/user/check",r="https://vue3-course-api.hexschool.io/v2/api/weiwei324/admin/products/all";this.$http.post(h,null,{headers:{Authorization:l}}).then(()=>this.$http.get(r,{headers:{Authorization:l}})).then(a=>{this.products=Object.values(a.data.products),this.loading=!1}).catch(()=>{m.fire({title:"請正確登入再訪問後台頁面",text:"點選下方按鈕回到登入頁面",icon:"error",allowOutsideClick:!1,confirmButtonText:"OK"}).then(()=>{this.$router.push("/login")})})}},mounted(){this.checktoken()}},v={key:0,class:"loading vw-100 vh-100 d-flex justify-content-center align-items-center"},y=t("div",{class:"loader"},null,-1),x=[y],b={key:1,class:"container"},w={class:"row py-3"},f={class:"col-md-6"},B=t("h2",null,"產品列表",-1),C={class:"table table-hover mt-4"},T=t("thead",null,[t("tr",null,[t("th",{width:"150"},"產品名稱"),t("th",{width:"120"},"原價"),t("th",{width:"120"},"售價"),t("th",{width:"150"},"是否啟用"),t("th",{width:"120"},"查看細節")])],-1),N={width:"150"},O={width:"120"},P={width:"120"},S={width:"150"},V={key:0,class:"text-success"},j={key:1},z={width:"120"},A=["onClick"],D={class:"col-md-6"},F=t("h2",null,"單一產品細節",-1),U={class:"card mb-3"},E=["src"],K={class:"card-body"},L={class:"card-title"},M={class:"badge bg-primary ms-2"},q={class:"card-text"},G={class:"card-text"},H={class:"d-flex"},I={class:"card-text me-2"},J={class:"card-text text-secondary"},Q=["src"],R=t("p",{class:"text-secondary"},"請選擇一個商品查看",-1);function W(l,h,r,a,e,X){return e.loading?(i(),c("div",v,x)):(i(),c("div",b,[t("div",w,[t("div",f,[B,t("div",null,[t("table",C,[T,t("tbody",null,[(i(!0),c(d,null,p(e.products,o=>(i(),c("tr",{key:o.id},[t("td",N,s(o.title),1),t("td",O,s(o.origin_price),1),t("td",P,s(o.price),1),t("td",S,[o.is_enabled?(i(),c("span",V,"啟用")):(i(),c("span",j,"未啟用"))]),t("td",z,[t("button",{type:"button",class:"btn btn-primary",onClick:_=>e.temp=o}," 查看細節 ",8,A)])]))),128))])]),t("p",null,[n(" 目前有"),t("span",null,s(e.products.length),1),n(" 項產品 ")])])]),t("div",D,[F,e.temp?(i(),c(d,{key:0},[t("div",U,[t("img",{src:e.temp.imageUrl,class:"card-img-top primary-image",alt:"主圖"},null,8,E),t("div",K,[t("h5",L,[n(s(e.temp.title)+" ",1),t("span",M,s(e.temp.category),1)]),t("p",q,"商品描述："+s(e.temp.description),1),t("p",G,"商品內容："+s(e.temp.content),1),t("div",H,[t("p",I,s(e.temp.price),1),t("p",J,[t("del",null,s(e.temp.origin_price),1)]),n(" 元 / "+s(e.temp.unit),1)])])]),(i(!0),c(d,null,p(e.temp.imagesUrl,(o,_)=>(i(),c("img",{key:o+_,src:o,alt:"",class:"img-fluid mb-2"},null,8,Q))),128))],64)):g("",!0),R])])]))}const Z=u(k,[["render",W]]);export{Z as default};
