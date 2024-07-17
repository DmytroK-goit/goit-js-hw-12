import{a as i,S as l}from"./assets/vendor-10f61e99.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const c=document.querySelector(".loader");document.querySelector(".btn");function d(){c.style.display="block"}function p(){c.style.display="none"}let u=1;const f=20,m="44758497-ea11318ae0823ef09cb8fbdb5";async function y(s){const o=new URLSearchParams({key:m,q:s,image_type:"photo",per_page:f,page:u});return(await i.get(`https://pixabay.com/api/?${o}`)).data.hits}function g(s){const o=document.querySelector("#gallery");if(!o){console.error("Елемент #gallery не знайдений в DOM.");return}if(s.length===0){o.innerHTML="<p>Нічого не знайдено.</p>";return}const n=s.map(r=>`
      <div class="image-card">
            <a href="${r.largeImageURL}"><img src="${r.webformatURL}" alt="${r.tags}" /></a>
            <div class="image-text">
        <p>likes: ${r.likes}</p>
        <p>views: ${r.views}</p>
        <p>comments: ${r.comments}</p>
        <p>downloads: ${r.downloads}</p>
        </div>
      </div>
    `).join("");o.innerHTML=n,h.refresh()}const h=new l(".image-card a",{captionsData:"alt",captionDelay:250,navText:["&larr;","&rarr;"],closeText:"&times;"}),L=document.querySelector("#search-form");L.addEventListener("submit",async s=>{s.preventDefault();const n=new FormData(s.target).get("query");if(n&&n.trim())try{d();const r=await y(n.trim());g(r)}catch(r){console.log(r)}finally{p()}});
//# sourceMappingURL=commonHelpers.js.map
