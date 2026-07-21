/* Gusty Group — maps card/step titles to thin Lucide icons and injects them.
   Runs after lucide UMD is loaded. Skips elements that already carry an icon. */
(function(){
  var MAP={
    'license management':'scroll-text',
    'provider credentialing':'badge-check',
    'provider credentialing & recredentialing':'badge-check',
    'payer enrollment':'file-check-2',
    'payer enrollment & par submissions':'file-check-2',
    'who we serve':'users-round',
    'registered dietitians':'salad',
    'behavioral health':'brain',
    'obesity medicine':'heart-pulse',
    'primary care':'stethoscope',
    'digital health':'monitor-smartphone',
    'managed services organizations':'network',
    'mso':'network','msos':'network',
    /* steps */
    'audit':'clipboard-list','prioritize':'list-filter','file':'send-horizontal','monitor':'radar',
    'map':'git-fork','verify':'search-check','submit':'send-horizontal',
    'scope':'target','prepare':'folder-cog','follow up':'phone-call'
  };
  function norm(t){return (t||'').replace(/\s+/g,' ').trim().toLowerCase().replace(/[.\u2192\u2197\u2794]+$/,'').replace(/\s*\(mso\)$/,'').trim();}
  function icon(name){var i=document.createElement('i');i.setAttribute('data-lucide',name);return i;}
  /* related / specialty cards → bordered icon tile */
  document.querySelectorAll('.rel').forEach(function(card){
    if(card.querySelector('.itile'))return;
    var h=card.querySelector('h3');if(!h)return;
    var name=MAP[norm(h.textContent)]||'arrow-up-right';
    var tile=document.createElement('div');tile.className='itile';tile.appendChild(icon(name));
    card.insertBefore(tile,card.firstChild);
  });
  /* how-it-works steps → small icon above title */
  document.querySelectorAll('.step').forEach(function(step){
    if(step.querySelector('.stepicn'))return;
    var h=step.querySelector('h3');if(!h)return;
    var name=MAP[norm(h.textContent)]||'chevron-right';
    var w=document.createElement('div');w.className='stepicn';w.appendChild(icon(name));
    step.insertBefore(w,step.firstChild);
  });
  /* dense chip / spec grids → uniform marker */
  document.querySelectorAll('.chips .cell').forEach(function(c){
    if(c.querySelector('i,svg'))return;c.insertBefore(icon('check'),c.firstChild);
  });
  document.querySelectorAll('.spec .c').forEach(function(c){
    if(c.querySelector('i,svg'))return;c.insertBefore(icon('check'),c.firstChild);
  });
  if(window.lucide)lucide.createIcons();
})();
