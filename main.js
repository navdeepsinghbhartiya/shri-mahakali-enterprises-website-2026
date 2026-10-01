(function(){
 var d=document,$=function(i){return d.getElementById(i)};
 d.documentElement.classList.add('js');
 var nav=$('nav'),menu=$('menu'),bur=$('burger'),top=$('top');
 function setMenu(o){menu.classList.toggle('is-open',o);bur.setAttribute('aria-expanded',o);bur.setAttribute('aria-label',o?'Close menu':'Open menu');bur.firstElementChild.firstElementChild.setAttribute('href',o?'#i-x':'#i-menu')}
 bur.addEventListener('click',function(){setMenu(!menu.classList.contains('is-open'))});
 menu.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
 function onScroll(){nav.classList.toggle('is-scrolled',scrollY>30);top.classList.toggle('is-on',scrollY>600)}
 addEventListener('scroll',onScroll,{passive:true});onScroll();
 top.addEventListener('click',function(){scrollTo({top:0,behavior:'smooth'})});
 var els=d.querySelectorAll('.reveal');
 if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target)}})},{threshold:.12});els.forEach(function(e){io.observe(e)})}
 else els.forEach(function(e){e.classList.add('is-in')});
 // lightbox
 var items=[].slice.call(d.querySelectorAll('.gal__it')),lb=$('lb'),img=$('lbi'),cur=0,last=null;
 function show(i){cur=(i+items.length)%items.length;var s=items[cur].firstElementChild;img.src=s.src;img.alt=s.alt}
 function open(i){last=d.activeElement;show(i);lb.hidden=false;d.body.style.overflow='hidden';$('lbx').focus()}
 function close(){lb.hidden=true;d.body.style.overflow='';if(last)last.focus()}
 items.forEach(function(b,i){b.addEventListener('click',function(){open(i)})});
 $('lbx').onclick=close;$('lbp').onclick=function(){show(cur-1)};$('lbn').onclick=function(){show(cur+1)};
 lb.addEventListener('click',function(e){if(e.target===lb)close()});
 d.addEventListener('keydown',function(e){
  if(e.key==='Escape'){if(!lb.hidden)close();else setMenu(false)}
  if(lb.hidden)return;
  if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1);
  if(e.key==='Tab'){var f=[$('lbx'),$('lbp'),$('lbn')],i=f.indexOf(d.activeElement);e.preventDefault();f[(i+(e.shiftKey?-1:1)+3)%3].focus()}
 });
 var t0;lb.addEventListener('touchstart',function(e){t0=e.touches[0].clientX},{passive:true});
 lb.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-t0;if(Math.abs(dx)>50)show(cur+(dx<0?1:-1))});
})();
