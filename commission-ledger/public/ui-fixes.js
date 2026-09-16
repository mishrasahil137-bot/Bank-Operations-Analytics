/* Commission Ledger — mobile navigation polish */
(function(){
  function bind(){
    const side=document.querySelector('.side');
    const menu=document.querySelector('#mob');
    if(!side||!menu||menu.dataset.bound)return;
    menu.dataset.bound='1';
    document.addEventListener('click',function(e){
      if(!side.classList.contains('show'))return;
      if(e.target.closest('#mob')||e.target.closest('.side'))return;
      side.classList.remove('show');
    });
  }
  new MutationObserver(bind).observe(document.body,{childList:true,subtree:true});
  bind();
})();
