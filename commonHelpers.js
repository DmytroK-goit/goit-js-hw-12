import{a as y,S as h,i as c}from"./assets/vendor-ee72e1a4.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const d=document.querySelector(".loader");function m(){d.style.display="block"}function u(){d.style.display="none"}async function f(o,s){const n="44758497-ea11318ae0823ef09cb8fbdb5",t=new URLSearchParams({key:n,q:o,image_type:"photo",per_page:20,page:s}),{data:r}=await y.get(`https://pixabay.com/api/?${t}`);return console.log(r),r}const w=document.querySelector("#gallery");function g(o){const s=o.map(e=>`
     <div class="image-card">
            <a href="${e.largeImageURL}"><img src="${e.webformatURL}" width=360 height=200 alt="${e.tags}" /></a>
            <div class="image-text">
            <ul>
        <li><p>likes:</p><p>${e.likes}</p></li>
        <li><p>views:</p><p>${e.views}</p></li>
        <li><p>comments:</p><p>${e.comments}</p></li>
        <li><p>downloads:</p><p>${e.downloads}</p></li>
        </ul>
        </div>
      </div>
    `).join("");w.insertAdjacentHTML("beforeend",s),b.refresh()}const b=new h(".image-card a",{captionsData:"alt",captionDelay:250,navText:["&larr;","&rarr;"],closeText:"&times;"}),p=document.querySelector(".btn"),L=document.querySelector("#search-form");let i=1,a="";L.addEventListener("submit",async o=>{if(o.preventDefault(),i=1,a=new FormData(o.target).get("query"),!a.trim())return c.show({position:"topRight",backgroundColor:"orange",message:"Будь ласка, введіть пошуковий запит."});if(a&&a.trim())try{m();const e=await f(a.trim(),i);console.log(e.hits),e.totalHits>0&&c.show({position:"topRight",backgroundColor:"green",message:`Found ${e.totalHits} results.`}),g(e.hits),i+=1,i>1&&(p.textContent="Fetch more posts",p.style.display="block")}catch(e){console.log(e),c.error({title:"Error",message:"Something went wrong. Please try again later."})}finally{u()}});p.addEventListener("click",async()=>{if(a&&a.trim())try{m();const o=await f(a.trim(),i);g(o.hits),i+=1}catch(o){console.log(o),c.error({title:"Error",message:"Something went wrong. Please try again later."})}finally{u()}});
//# sourceMappingURL=commonHelpers.js.map
