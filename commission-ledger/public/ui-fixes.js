/* Commission Ledger UX fixes: local date defaults for filters. */
(function(){
  function localToday(){
    const d=new Date();
    const y=d.getFullYear();
    const m=String(d.getMonth()+1).padStart(2,'0');
    const day=String(d.getDate()).padStart(2,'0');
    return `${y}-${m}-${day}`;
  }
  function setDefaultDates(){
    const value=localToday();
    ['from','to','rf','rt'].forEach(id=>{
      const el=document.getElementById(id);
      if(el && !el.value) el.value=value;
    });
  }
  const observer=new MutationObserver(setDefaultDates);
  observer.observe(document.body,{childList:true,subtree:true});
  setDefaultDates();
})();
