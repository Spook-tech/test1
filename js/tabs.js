"use strict"

// TABS
const tabsArray = document.querySelectorAll('[data-tab]');
if (tabsArray.length > 0){
   for (let i = 0; i < tabsArray.length; i++){
      let tab = tabsArray[i];
      tab.addEventListener('click', function(e){
         clearActiveTab(tabsArray)
         setTabAction(tab)
      });
   }

   function setTabAction(tab){ 

      tab.classList.toggle('_active');
      const text = document.querySelector(`#tab-${tab.dataset.tab}`)
      text.classList.add('_active');
   }

   function clearActiveTab(tabs){
      tabs.forEach(element => {
         element.classList.remove('_active');
      });
      const texts = document.querySelectorAll('.tab-text');
      texts.forEach(element => {
         element.classList.remove('_active');
      });

   }
   
}