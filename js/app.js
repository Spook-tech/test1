"use strict"

const html = document.querySelector('html');

// Событие при клике
document.addEventListener('click', mainEvent);
function mainEvent(e){
   const targetElement = e.target;

   if(targetElement.classList.contains('close-menu') || targetElement.closest('.close-menu')){
      showMenu();
   }
   if(targetElement.classList.contains('header__menu__body') && !targetElement.classList.contains('header__menu')){
      showMenu();
   }

   if(targetElement.classList.contains('show-password-btn')){ 
      e.preventDefault();
      const parent = targetElement.parentNode;
      const input = parent.querySelector('.input-password');
      const type = input.getAttribute('type');
      if (type == 'password') input.setAttribute('type', 'text');
      else if (type == 'text') input.setAttribute('type', 'password');
   }

   if (document.querySelector('.order-page__payment__methods')){
      if (document.querySelector('.order-page__payment__methods').classList.contains('_active')){
         if (!targetElement.closest('.order-page__payment')){
            document.querySelector('.order-page__payment__methods').classList.remove('_active');
         }
      }
      if (targetElement.closest('.order-page__payment__active-method') || targetElement.classList.contains('order-page__payment__active-method')){
         document.querySelector('.order-page__payment__methods').classList.toggle('_active');
      }
   }
   
   if(targetElement.id == 'empty-favourites-change-btn'){
      document.querySelector('.empty-favourites').classList.toggle('_active');
      document.querySelector('.favourites').classList.toggle('_active');
   }
}

function showMenu(){
   const menuBurger = document.querySelector(".header__burger");
   const headerMenu = document.querySelector(".header__menu__body");

   menuBurger.classList.toggle("active");
   headerMenu.classList.toggle("active");
   html.classList.toggle('lock');

   
   let div = document.createElement('div');
   div.style.overflowY = 'scroll';
   div.style.width = '50px';
   div.style.height = '50px';
   document.body.append(div);
   let scrollWidth = div.offsetWidth - div.clientWidth;
   div.remove();
   console.log(document.body.style.paddingRight);
   if (!parseInt(document.body.style.paddingRight)) document.body.style.paddingRight = scrollWidth + 'px';
   else if (parseInt(document.body.style.paddingRight)) document.body.style.paddingRight = '0px';
}



// Проверка емеилов
let toValidate = []

if (document.querySelector('#order-email')){ toValidate.push(document.querySelector('#order-email')); }
if (document.querySelector('#log-in__popup-email')){ toValidate.push(document.querySelector('#log-in__popup-email')); }

toValidate.forEach(input => input.addEventListener('input', function(e){
   const value = input.value;
   if (!validateEmail(value)){
      input.classList.add('_error');
   }else{
      input.classList.remove('_error');
   }
}))

const validateEmail = (email) => {
   return String(email)
     .toLowerCase()
     .match(
       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
     );
};

// Изменение способа оплаты на странице оформления заказа
const paymentMethod = document.getElementsByName("payment-method");
paymentMethod.forEach(item => item.addEventListener('change', function(){
   const parent = item.parentNode;
   const text = parent.querySelector('.order-page__payment__method__text').innerText.replace(/\n/g,'');
   console.log(text);

   const oldText = document.querySelector('.order-page__payment__active-method').querySelector('.order-page__payment__method__text');
   oldText.innerText = text;
   return text;
}));
