if(!self.define){let e,a={};const i=(i,s)=>(i=new URL(i+".js",s).href,a[i]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=a,document.head.appendChild(e)}else e=i,importScripts(i),a()})).then((()=>{let e=a[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(s,n)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(a[r])return;let o={};const d=e=>i(e,r),c={module:{uri:r},exports:o,require:d};a[r]=Promise.all(s.map((e=>c[e]||d(e)))).then((e=>(n(...e),o)))}}define(["./workbox-62f137f2"],(function(e){"use strict";importScripts("fallback-bQQVhHyudQvfQPPauAs13.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/bQQVhHyudQvfQPPauAs13/_buildManifest.js",revision:"bQQVhHyudQvfQPPauAs13"},{url:"/_next/static/bQQVhHyudQvfQPPauAs13/_middlewareManifest.js",revision:"bQQVhHyudQvfQPPauAs13"},{url:"/_next/static/bQQVhHyudQvfQPPauAs13/_ssgManifest.js",revision:"bQQVhHyudQvfQPPauAs13"},{url:"/_next/static/chunks/580-bfc9dd810f6b4757.js",revision:"bQQVhHyudQvfQPPauAs13"},{url:"/_next/static/chunks/8-3646d7b19a8cfef0.js",revision:"bQQVhHyudQvfQPPauAs13"},{url:"/_next/static/chunks/framework-91d7f78b5b4003c8.js",revision:"bQQVhHyudQvfQPPauAs13"},{url:"/_next/static/chunks/main-99ae50f8efdaf2f4.js",revision:"bQQVhHyudQvfQPPauAs13"},{url:"/_next/static/chunks/pages/%5Bparam%5D-9f01e39c9aba3b50.js",revision:"bQQVhHyudQvfQPPauAs13"},{url:"/_next/static/chunks/pages/_app-356354d46ab42075.js",revision:"bQQVhHyudQvfQPPauAs13"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"bQQVhHyudQvfQPPauAs13"},{url:"/_next/static/chunks/pages/_offline-2f539ba95d54f0b3.js",revision:"bQQVhHyudQvfQPPauAs13"},{url:"/_next/static/chunks/pages/index-ce867ed57a7afd45.js",revision:"bQQVhHyudQvfQPPauAs13"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"bQQVhHyudQvfQPPauAs13"},{url:"/_next/static/chunks/webpack-5752944655d749a0.js",revision:"bQQVhHyudQvfQPPauAs13"},{url:"/_next/static/css/a6fbaaaf70c6f900.css",revision:"bQQVhHyudQvfQPPauAs13"},{url:"/_offline",revision:"bQQVhHyudQvfQPPauAs13"},{url:"/android/android-launchericon-144-144.png",revision:"715867de978c532865084b7ba325dcb4"},{url:"/android/android-launchericon-192-192.png",revision:"b1be39b62e6fcc0508dd706b359be757"},{url:"/android/android-launchericon-48-48.png",revision:"1ef4ea11c387513f043ce532af66dba2"},{url:"/android/android-launchericon-512-512.png",revision:"6852b33b7ec21c28c8160f49abefc730"},{url:"/android/android-launchericon-72-72.png",revision:"429cbb1c3d7254dbeae6837c7526433d"},{url:"/android/android-launchericon-96-96.png",revision:"fbeb30097319812b95828927e84e566d"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/ios/100.png",revision:"375914c81a77170b10d0a117615ab01a"},{url:"/ios/1024.png",revision:"621a8ee3562b38e433ffa2a228cc0c5b"},{url:"/ios/114.png",revision:"196d7fcfe0649e32b4091fb0ef103bb8"},{url:"/ios/120.png",revision:"79e49711f8b6e71909ededb04aa9afea"},{url:"/ios/128.png",revision:"1852934fb7c088e0631b44dd682f00ca"},{url:"/ios/144.png",revision:"715867de978c532865084b7ba325dcb4"},{url:"/ios/152.png",revision:"b58dc1969e08f947b2037657cfbfe57a"},{url:"/ios/16.png",revision:"14a6b48d80113880170eb04248ba8fb7"},{url:"/ios/167.png",revision:"d2f6cfdc162f07f2627fac0129d897de"},{url:"/ios/180.png",revision:"043b379d78b4828ad3ee91757b552fd0"},{url:"/ios/192.png",revision:"b1be39b62e6fcc0508dd706b359be757"},{url:"/ios/20.png",revision:"62ff9fd3c26a51d6083efc5cdf6514d6"},{url:"/ios/256.png",revision:"d0cccc9e5cfe161c0bdaf34c8f40c5b6"},{url:"/ios/29.png",revision:"a7868a6bdc526969b8aede17627b10fd"},{url:"/ios/32.png",revision:"338620173b52c3daa79be5dccb5df054"},{url:"/ios/40.png",revision:"08299f315586d36825f741a782618e70"},{url:"/ios/50.png",revision:"bcad8985c33c5b7ed8bc6b927571993b"},{url:"/ios/512.png",revision:"6852b33b7ec21c28c8160f49abefc730"},{url:"/ios/57.png",revision:"4684c55567859a57044057830d36d441"},{url:"/ios/58.png",revision:"bbc922cdd0175969c6ca244aa9bda9bf"},{url:"/ios/60.png",revision:"a336470cc2f0b92bcedae0ef450837b2"},{url:"/ios/64.png",revision:"bb3f679d293ae9af060f25560fa65f84"},{url:"/ios/72.png",revision:"429cbb1c3d7254dbeae6837c7526433d"},{url:"/ios/76.png",revision:"f229a2071dfdcb62959f129dc35076ce"},{url:"/ios/80.png",revision:"f98127fecd4b99aa5a9d83e60abbb185"},{url:"/ios/87.png",revision:"38decb1fce1a43004c1c5ef8f9522f0b"},{url:"/manifest.json",revision:"df81243de23c8a543db1037c85b2b788"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"},{url:"/windows11/LargeTile.scale-100.png",revision:"82b7f2e119ffd241393b7a097d8c592b"},{url:"/windows11/LargeTile.scale-125.png",revision:"0a65c99853d9255688b959a030e2bef9"},{url:"/windows11/LargeTile.scale-150.png",revision:"24132d92a66c5225b0d710b74860d3a7"},{url:"/windows11/LargeTile.scale-200.png",revision:"65a453be3f0f140176d0541b2ed67898"},{url:"/windows11/LargeTile.scale-400.png",revision:"09d65146ddfe007858b854b535c46962"},{url:"/windows11/SmallTile.scale-100.png",revision:"71e9181b215de5a533c61878641ecf09"},{url:"/windows11/SmallTile.scale-125.png",revision:"0bc1dd0d7f76056762c5afacad5d65e5"},{url:"/windows11/SmallTile.scale-150.png",revision:"4408c1a6326f780783e0af45563eb2f9"},{url:"/windows11/SmallTile.scale-200.png",revision:"da08f367a46ed7018925c5a335682042"},{url:"/windows11/SmallTile.scale-400.png",revision:"3b918646ba1df518229b94b4fb5a0bf3"},{url:"/windows11/SplashScreen.scale-100.png",revision:"ad7e8a60bb936dda5b08f82a993bf0e3"},{url:"/windows11/SplashScreen.scale-125.png",revision:"63719305e86868fe08999e125abb7bda"},{url:"/windows11/SplashScreen.scale-150.png",revision:"7748c93a3515244f9f4ca40e5b0d3365"},{url:"/windows11/SplashScreen.scale-200.png",revision:"2f643a0ec4d87715e1dfe4f5891bd865"},{url:"/windows11/SplashScreen.scale-400.png",revision:"b37a4baac578fb354246e26994ad674c"},{url:"/windows11/Square150x150Logo.scale-100.png",revision:"6e244b2e85ec070ac87edf403f11533b"},{url:"/windows11/Square150x150Logo.scale-125.png",revision:"d4492c41917de49011594d0e8b381876"},{url:"/windows11/Square150x150Logo.scale-150.png",revision:"4aa18c58d868b5aa062cc9faf6df09f5"},{url:"/windows11/Square150x150Logo.scale-200.png",revision:"4ddec6a1b99099359682a7be0cd1c67a"},{url:"/windows11/Square150x150Logo.scale-400.png",revision:"41c98cb58da2a3dfb846446d2acc9fe2"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",revision:"14a6b48d80113880170eb04248ba8fb7"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",revision:"4a0017f61cf3b5fe01600ddbdd6c2885"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",revision:"c51c3ca3a584b45776bc7c78da21a354"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",revision:"98de45e90d183612cdf2580625d03d12"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",revision:"6a728c89362e91657ec5b410cd0b07fd"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",revision:"e7f74abef1fe5db59d14009c45eaf78d"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",revision:"6115d1e214ababdbfcdfc3f132492299"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",revision:"446aeb4a13ffa091b6a8e987afb364d0"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",revision:"109149519a1ededa94d34636cefafa18"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",revision:"b33ca22900cda4346ed04a351a602e2f"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",revision:"a32e72b30855afce41836f6ae07e5268"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",revision:"7d4fa9c6205a5c1f9b48577e6753dbc8"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",revision:"7892cd3f503dac1b62cd6f98576e394f"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",revision:"0e44fe4dadca7bd731d4d508b37252c5"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",revision:"92d1f71cd68a5f653473bb3e0a169a30"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",revision:"14a6b48d80113880170eb04248ba8fb7"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",revision:"4a0017f61cf3b5fe01600ddbdd6c2885"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",revision:"c51c3ca3a584b45776bc7c78da21a354"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",revision:"98de45e90d183612cdf2580625d03d12"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",revision:"6a728c89362e91657ec5b410cd0b07fd"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",revision:"e7f74abef1fe5db59d14009c45eaf78d"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",revision:"6115d1e214ababdbfcdfc3f132492299"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",revision:"446aeb4a13ffa091b6a8e987afb364d0"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",revision:"109149519a1ededa94d34636cefafa18"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",revision:"b33ca22900cda4346ed04a351a602e2f"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",revision:"a32e72b30855afce41836f6ae07e5268"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",revision:"7d4fa9c6205a5c1f9b48577e6753dbc8"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",revision:"7892cd3f503dac1b62cd6f98576e394f"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",revision:"0e44fe4dadca7bd731d4d508b37252c5"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",revision:"92d1f71cd68a5f653473bb3e0a169a30"},{url:"/windows11/Square44x44Logo.scale-100.png",revision:"109149519a1ededa94d34636cefafa18"},{url:"/windows11/Square44x44Logo.scale-125.png",revision:"af9d4e8cd72d2f36e5bc8e3874cc5bae"},{url:"/windows11/Square44x44Logo.scale-150.png",revision:"154424ba048dde33eba35873e84b92bd"},{url:"/windows11/Square44x44Logo.scale-200.png",revision:"ec54f6192bf884377561839b73f0342a"},{url:"/windows11/Square44x44Logo.scale-400.png",revision:"e61c834c8fe768334375d4e262990bc7"},{url:"/windows11/Square44x44Logo.targetsize-16.png",revision:"14a6b48d80113880170eb04248ba8fb7"},{url:"/windows11/Square44x44Logo.targetsize-20.png",revision:"4a0017f61cf3b5fe01600ddbdd6c2885"},{url:"/windows11/Square44x44Logo.targetsize-24.png",revision:"c51c3ca3a584b45776bc7c78da21a354"},{url:"/windows11/Square44x44Logo.targetsize-256.png",revision:"98de45e90d183612cdf2580625d03d12"},{url:"/windows11/Square44x44Logo.targetsize-30.png",revision:"6a728c89362e91657ec5b410cd0b07fd"},{url:"/windows11/Square44x44Logo.targetsize-32.png",revision:"e7f74abef1fe5db59d14009c45eaf78d"},{url:"/windows11/Square44x44Logo.targetsize-36.png",revision:"6115d1e214ababdbfcdfc3f132492299"},{url:"/windows11/Square44x44Logo.targetsize-40.png",revision:"446aeb4a13ffa091b6a8e987afb364d0"},{url:"/windows11/Square44x44Logo.targetsize-44.png",revision:"109149519a1ededa94d34636cefafa18"},{url:"/windows11/Square44x44Logo.targetsize-48.png",revision:"b33ca22900cda4346ed04a351a602e2f"},{url:"/windows11/Square44x44Logo.targetsize-60.png",revision:"a32e72b30855afce41836f6ae07e5268"},{url:"/windows11/Square44x44Logo.targetsize-64.png",revision:"7d4fa9c6205a5c1f9b48577e6753dbc8"},{url:"/windows11/Square44x44Logo.targetsize-72.png",revision:"7892cd3f503dac1b62cd6f98576e394f"},{url:"/windows11/Square44x44Logo.targetsize-80.png",revision:"0e44fe4dadca7bd731d4d508b37252c5"},{url:"/windows11/Square44x44Logo.targetsize-96.png",revision:"92d1f71cd68a5f653473bb3e0a169a30"},{url:"/windows11/StoreLogo.scale-100.png",revision:"19268535f76d4782369875b10eeda7d3"},{url:"/windows11/StoreLogo.scale-125.png",revision:"c1a55cb81be2c2b488a75c6a89c4e316"},{url:"/windows11/StoreLogo.scale-150.png",revision:"1e902b157ba05abc683ce5a670f3c03f"},{url:"/windows11/StoreLogo.scale-200.png",revision:"3c763d160c66f22e038bcb04f148c838"},{url:"/windows11/StoreLogo.scale-400.png",revision:"7e259d65c66447c2fe07e33bfebc328b"},{url:"/windows11/Wide310x150Logo.scale-100.png",revision:"9630293c739760c3387dd3e3492d04e7"},{url:"/windows11/Wide310x150Logo.scale-125.png",revision:"e7fb8c9217f1fd470aca44ce5002d3ba"},{url:"/windows11/Wide310x150Logo.scale-150.png",revision:"c6071c5152d81a781e37a40c1f30d194"},{url:"/windows11/Wide310x150Logo.scale-200.png",revision:"ad7e8a60bb936dda5b08f82a993bf0e3"},{url:"/windows11/Wide310x150Logo.scale-400.png",revision:"2f643a0ec4d87715e1dfe4f5891bd865"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:i,state:s})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
