!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).Dwap={})}(this,(function(e){"use strict";var t=window&&window.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{u(r.next(e))}catch(e){o(e)}}function c(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,c)}u((r=r.apply(e,t||[])).next())}))},n=window&&window.__generator||function(e,t){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}},r=function(){function e(e){this.CDN=e}return e.prototype.request=function(e){return t(this,void 0,void 0,(function(){return n(this,(function(t){switch(t.label){case 0:return[4,fetch(e)];case 1:return[4,t.sent().json()];case 2:return[2,t.sent()]}}))}))},e.prototype.getMany=function(e,r,i,o){return t(this,void 0,void 0,(function(){return n(this,(function(t){return r?i?o?[2,this.request(this.CDN+"/data/provinces/"+r+"/regencies/"+i+"/districts/"+o+"/"+e+".json")]:[2,this.request(this.CDN+"/data/provinces/"+r+"/regencies/"+i+"/"+e+".json")]:[2,this.request(this.CDN+"/data/provinces/"+r+"/"+e+".json")]:[2,this.request(this.CDN+"/data/"+e+".json")]}))}))},e.prototype.getProvinces=function(){return t(this,void 0,void 0,(function(){return n(this,(function(e){return[2,this.getMany("provinces")]}))}))},e.prototype.getRegencies=function(e){return t(this,void 0,void 0,(function(){return n(this,(function(t){return[2,this.getMany("regencies",e)]}))}))},e.prototype.getDistricts=function(e,r){return t(this,void 0,void 0,(function(){return n(this,(function(t){return[2,this.getMany("districts",e,r)]}))}))},e.prototype.getVillages=function(e,r,i){return t(this,void 0,void 0,(function(){return n(this,(function(t){return[2,this.getMany("villages",e,r,i)]}))}))},e.prototype.getProvince=function(e){return t(this,void 0,void 0,(function(){return n(this,(function(t){return[2,this.request(this.CDN+"/data/provinces/"+e+".json")]}))}))},e.prototype.getRegency=function(e,r){return t(this,void 0,void 0,(function(){return n(this,(function(t){return[2,this.request(this.CDN+"/data/provinces/"+e+"/regencies/"+r+".json")]}))}))},e.prototype.getDistrict=function(e,r,i){return t(this,void 0,void 0,(function(){return n(this,(function(t){return[2,this.request(this.CDN+"/data/provinces/"+e+"/regencies/"+r+"/districts/"+i+".json")]}))}))},e.prototype.getVillage=function(e,r,i,o){return t(this,void 0,void 0,(function(){return n(this,(function(t){return[2,this.request(this.CDN+"/data/provinces/"+e+"/regencies/"+r+"/districts/"+i+"/villages/"+o+".json")]}))}))},e}(),i=window&&window.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{u(r.next(e))}catch(e){o(e)}}function c(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,c)}u((r=r.apply(e,t||[])).next())}))},o=window&&window.__generator||function(e,t){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}},s=function(){function e(e,t,n){var r=this;this.el=e,this.repo=t,this.destroy=function(){},this.eventListeners={},this.setValueQueue=Promise.resolve();var i=function(){r.setValue(r.provinceCode)},o=function(){r.setValue(r.provinceCode,r.regencyCode)},s=function(){r.setValue(r.provinceCode,r.regencyCode,r.districtCode)},c=function(){r.emit("change",r.addressCode)};this.provinceSelect.addEventListener("change",i),this.regencySelect.addEventListener("change",o),this.districtSelect.addEventListener("change",s),this.villageSelect.addEventListener("change",c),this.destroy=function(){r.provinceSelect.removeEventListener("change",i),r.regencySelect.removeEventListener("change",o),r.districtSelect.removeEventListener("change",s),r.villageSelect.removeEventListener("change",c),r.el=null,r.repo=null,r.eventListeners=null},this.setAddressCode(n)}return e.prototype.addEventListener=function(e,t){var n=this.eventListeners[e]||(this.eventListeners[e]=[]);-1===n.indexOf(t)&&n.push(t)},e.prototype.removeEventListener=function(e,t){this.eventListeners[e]=(this.eventListeners[e]||[]).filter((function(e){return e!==t}))},Object.defineProperty(e.prototype,"provinceCode",{get:function(){return this.getValueFromSelect(this.provinceSelect)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"regencyCode",{get:function(){return this.getValueFromSelect(this.regencySelect)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"districtCode",{get:function(){return this.getValueFromSelect(this.districtSelect)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"villageCode",{get:function(){return this.getValueFromSelect(this.villageSelect)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"addressCode",{get:function(){return this.provinceCode+this.regencyCode+this.districtCode+this.villageCode},enumerable:!1,configurable:!0}),e.prototype.setValue=function(e,t,n,r){return i(this,void 0,void 0,(function(){var s=this;return o(this,(function(c){return this.regencySelect.disabled=!0,this.districtSelect.disabled=!0,this.villageSelect.disabled=!0,[2,this.setValueQueue=this.setValueQueue.then((function(){return i(s,void 0,void 0,(function(){var i,s,c,u,l=this;return o(this,(function(o){switch(o.label){case 0:return[4,Promise.all([this.renderProvinces(e).then((function(){return!1})),e?this.renderRegencies(e,t).then((function(){return!1})):Promise.resolve(!0),e&&t?this.renderDistricts(e,t,n).then((function(){return!1})):Promise.resolve(!0),e&&t&&n?this.renderVillages(e,t,n,r).then((function(){return!1})):Promise.resolve(!0)])];case 1:return i=o.sent(),s=i[1],c=i[2],u=i[3],[{isEmpty:s,select:this.regencySelect},{isEmpty:c,select:this.districtSelect},{isEmpty:u,select:this.villageSelect}].forEach((function(e){var t=e.isEmpty,n=e.select;t&&(l.emptyOptions(n),n.disabled=!0)})),[2,this.setValueQueue=Promise.resolve()]}}))}))})).catch((function(){return s.setValueQueue=Promise.resolve()}))]}))}))},e.prototype.setAddressCode=function(e){return i(this,void 0,void 0,(function(){return o(this,(function(t){return[2,this.setValue(e.slice(0,2),e.slice(2,4),e.slice(4,6),e.slice(6))]}))}))},e.prototype.decodeAddressCode=function(e){return i(this,void 0,void 0,(function(){var t,n,r,i,s,c,u,l,a,d,h,p,f,v;return o(this,(function(o){switch(o.label){case 0:return t=e.slice(0,2),n=e.slice(2,4),r=e.slice(4,6),i=e.slice(6),s=2===t.length,c=2===n.length,u=2===r.length,l=i.length>1,a=[s?this.repo.getProvince(t):Promise.resolve(null),s&&c?this.repo.getRegency(t,n):Promise.resolve(null),s&&c&&u?this.repo.getDistrict(t,n,r):Promise.resolve(null),s&&c&&u&&l?this.repo.getVillage(t,n,r,i):Promise.resolve(null)],[4,Promise.all(a)];case 1:return d=o.sent(),h=d[0],p=d[1],f=d[2],v=d[3],[2,{province:h,regency:p,district:f,village:v}]}}))}))},e.prototype.emit=function(e,t){(this.eventListeners[e]=this.eventListeners[e]||[]).forEach((function(e){return e(t)}))},Object.defineProperty(e.prototype,"provinceSelect",{get:function(){return this.el.querySelector(e.PROVINCE_SELECT_QUERY)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"regencySelect",{get:function(){return this.el.querySelector(e.REGENCY_SELECT_QUERY)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"districtSelect",{get:function(){return this.el.querySelector(e.DISTRICT_SELECT_QUERY)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"villageSelect",{get:function(){return this.el.querySelector(e.VILLAGE_SELECT_QUERY)},enumerable:!1,configurable:!0}),e.prototype.getValueFromSelect=function(e){if(!e)return null;var t=e.options.item(e.selectedIndex);return t?t.value:null},e.prototype.emptyOptions=function(e){for(;0!==e.options.length;)e.options.remove(0)},e.prototype.renderOptions=function(e,t){this.emptyOptions(e),t.forEach((function(t){var n=document.createElement("option");n.value=t.id,n.textContent=t.name,e.appendChild(n)}))},e.prototype.setSelected=function(e,t){if(t){var n=Array.from(e.options).findIndex((function(e){return e.value===t}));-1===n?(this.renderPlaceholderOption(e),e.selectedIndex=0):e.selectedIndex=n}else this.renderPlaceholderOption(e),e.selectedIndex=0},e.prototype.renderPlaceholderOption=function(e){var t=e.options.item(0);if(!(!!t&&"placeholder"===t.dataset.placeholder)){var n=document.createElement("option");n.dataset.placeholder="placeholder",n.disabled=!0,n.textContent="--- Pilih ---",e.insertAdjacentElement("afterbegin",n)}},e.prototype.renderProvinces=function(e){return i(this,void 0,void 0,(function(){var t,n;return o(this,(function(r){switch(r.label){case 0:return(t=this.provinceSelect).disabled=!0,"rendered"===t.dataset.rendered?[3,2]:[4,this.repo.getProvinces()];case 1:n=r.sent(),this.renderOptions(t,n),t.dataset.rendered="rendered",r.label=2;case 2:return this.setSelected(t,e),t.disabled=!1,[2]}}))}))},e.prototype.renderRegencies=function(e,t){return i(this,void 0,void 0,(function(){var n,r;return o(this,(function(i){switch(i.label){case 0:return(n=this.regencySelect).disabled=!0,n.dataset.provinceId===e?[3,2]:[4,this.repo.getRegencies(e)];case 1:r=i.sent(),this.renderOptions(n,r),n.dataset.provinceId=e,i.label=2;case 2:return this.setSelected(n,t),n.disabled=!1,[2]}}))}))},e.prototype.renderDistricts=function(e,t,n){return i(this,void 0,void 0,(function(){var r,i;return o(this,(function(o){switch(o.label){case 0:return(r=this.districtSelect).disabled=!0,r.dataset.regencyId===t?[3,2]:[4,this.repo.getDistricts(e,t)];case 1:i=o.sent(),this.renderOptions(r,i),r.dataset.regencyId=t,o.label=2;case 2:return this.setSelected(r,n),r.disabled=!1,[2]}}))}))},e.prototype.renderVillages=function(e,t,n,r){return i(this,void 0,void 0,(function(){var i,s;return o(this,(function(o){switch(o.label){case 0:return(i=this.villageSelect).disabled=!0,i.dataset.districtId===n?[3,2]:[4,this.repo.getVillages(e,t,n)];case 1:s=o.sent(),this.renderOptions(i,s),i.dataset.districtId=n,o.label=2;case 2:return this.setSelected(i,r),i.disabled=!1,[2]}}))}))},e.PROVINCE_SELECT_QUERY=".dwap-province",e.REGENCY_SELECT_QUERY=".dwap-regency",e.DISTRICT_SELECT_QUERY=".dwap-district",e.VILLAGE_SELECT_QUERY=".dwap-village",e}();e.Repository=r,e.ViewBinder=s,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=index.browser.js.map
