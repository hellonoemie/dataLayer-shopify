<script>
/*
===================================
| DATALAYER ARCHITECTURE: SHOPIFY |
-----------------------------------

DEFINITION:
A data layer helps you collect more accurate analytics data, that in turn allows you to better understand what potential buyers are doing on your website and where you can make improvements. It also reduces the time to implement marketing tags on a website, and reduces the need for IT involvement, leaving them to get on with implementing new features and fixing bugs.

RESOURCES:
http://www.datalayerdoctor.com/a-gentle-introduction-to-the-data-layer-for-digital-marketers/
http://www.simoahava.com/analytics/data-layer/

AUTHORS:
Mechelle Warneke = [{
Email: mechellewarneke@gmail.com,
Website: mechellewarneke.com,
BVACCEL: [{
  Email: mechelle@bvaccel.com,
  Position: XO Strategist | Technical Web Analyst
}]
}];

Tyler Shambora = [{
Website: tylershambora.com,
BVACCEL: [{
  Email: tyler@bvaccel.com,
  Position: Lead Web Developer
}]
}];

EXTERNAL DEPENDENCIES:
* jQuery
* jQuery Cookie Plugin v1.4.1 - https://github.com/carhartl/jquery-cookie
* cartjs - https://github.com/discolabs/cartjs

DataLayer Architecture: Shopify v1.3.1
COPYRIGHT 2016
LICENSES: MIT ( https://opensource.org/licenses/MIT )
*/

/* PRELOADS */ 
// load jquery if it doesn't exist
if(!window.jQuery){var jqueryScript=document.createElement('script');jqueryScript.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js');document.head.appendChild(jqueryScript);}

__bva__jQueryinterval = setInterval(function(){
// --------------------------------------------- wait for jQuery to load
if(window.jQuery){
// --------------- run script after jQuery has loaded

// search parameters
getURLParams = function(name, url){
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };

/* =====================
| DYNAMIC DEPENDENCIES |
--------------------- */

__bva__ = {
  dynamicCart: true,  // if cart is dynamic (meaning no refresh on cart add) set to true
  debug: true, // if true, console messages will be displayed
  cart: true,
  wishlist: true,
  removeCart: true
};

customBindings = {
  cartTriggers: ['#add-to-cart'/*,[rv-href*="index | increaseQuantityUrl item"]'*/],
  variantSelect: ['option'],
  viewCart: ['a[data-action="open-mini-cart"]'],
  removeCartTrigger: ['.icon-cross__container'],
  cartVisableSelector: ['.header__cart-count'],
  promoSubscriptionsSelectors: [],
  promoSuccess: [],
  ctaSelectors: [],
  newsletterSelectors: [],
  newsletterSuccess: [],
  searchPage: [],
  wishlistSelector: ['.swym-add-to-wishlist'],
  removeWishlist: ['.swym-close-grey'],
  wishlistPage: ['.header__item header__item-wishlist'],
  searchTermQuery: [getURLParams('q')], // replace var with correct query
};

/* DO NOT EDIT */
defaultBindings = {
  cartTriggers: [/*'form[action="/cart/add"] [type="submit"],.add-to-cart,.cart-btn'*/],
  viewCart: [/*'form[action="/cart"],.my-cart,.trigger-cart,#mobileCart'*/],
  removeCartTrigger: ['[rv-href*="index | decreaseQuantityUrl item"]'],
  cartVisableSelector: ['.inlinecart.is-active,.inline-cart.is-active'],
  promoSubscriptionsSelectors: [],
  promoSuccess: [],
  ctaSelectors: [],
  newsletterSelectors: ['input.contact_email'],
  newsletterSuccess: ['.success_message'],
  searchPage: ['search'],
  wishlistSelector: [],
  removeWishlist: [],
  wishlistPage: []
};

// stitch bindings
objectArray = customBindings;
outputObject = __bva__;

applyBindings = function(objectArray, outputObject){
  for (var x in objectArray) {  
    var key = x;
    var objs = objectArray[x]; 
    values = [];    
    if(objs.length > 0){    
      values.push(objs);
      if(key in outputObject){              
        values.push(outputObject[key]); 
        outputObject[key] = values.join(", "); 
      }else{        
        outputObject[key] = values.join(", ");
      }   
    }  
  }
};

applyBindings(customBindings, __bva__);
applyBindings(defaultBindings, __bva__);

/* =======================
| PREREQUISITE LIBRARIES |
----------------------- */
  
  clearInterval(__bva__jQueryinterval);

    // jquery-cookies.js
    if(typeof $.cookie!==undefined){(function(a){if(typeof define==='function'&&define.amd){define(['jquery'],a)}else if(typeof exports==='object'){module.exports=a(require('jquery'))}else{a(jQuery)}}(function($){var g=/\+/g;function encode(s){return h.raw?s:encodeURIComponent(s)}function decode(s){return h.raw?s:decodeURIComponent(s)}function stringifyCookieValue(a){return encode(h.json?JSON.stringify(a):String(a))}function parseCookieValue(s){if(s.indexOf('"')===0){s=s.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,'\\')}try{s=decodeURIComponent(s.replace(g,' '));return h.json?JSON.parse(s):s}catch(e){}}function read(s,a){var b=h.raw?s:parseCookieValue(s);return $.isFunction(a)?a(b):b}var h=$.cookie=function(a,b,c){if(arguments.length>1&&!$.isFunction(b)){c=$.extend({},h.defaults,c);if(typeof c.expires==='number'){var d=c.expires,t=c.expires=new Date();t.setMilliseconds(t.getMilliseconds()+d*864e+5)}return(document.cookie=[encode(a),'=',stringifyCookieValue(b),c.expires?'; expires='+c.expires.toUTCString():'',c.path?'; path='+c.path:'',c.domain?'; domain='+c.domain:'',c.secure?'; secure':''].join(''))}var e=a?undefined:{},cookies=document.cookie?document.cookie.split('; '):[],i=0,l=cookies.length;for(;i<l;i++){var f=cookies[i].split('='),name=decode(f.shift()),cookie=f.join('=');if(a===name){e=read(cookie,b);break}if(!a&&(cookie=read(cookie))!==undefined){e[name]=cookie}}return e};h.defaults={};$.removeCookie=function(a,b){$.cookie(a,'',$.extend({},b,{expires:-1}));return!$.cookie(a)}}))}

    /* ======================
    | Begin dataLayer Build |
    ---------------------- */

    // if debug
    if(__bva__.debug){
      console.log('=====================\n| DATALAYER SHOPIFY |\n---------------------');
      console.log('Page Template: {{ template }}');
    }
    
    window.dataLayer = window.dataLayer || [];  // init data layer if doesn't already exist
    dataLayer.push({'event': 'Begin DataLayer'}); // begin datalayer

    var template = "{{template}}"; 

    /* Landing Page Cookie
    -----------------------
    1. Detect if user just landed on the site
    2. Only fires if Page Title matches website */

    $.cookie.raw = true;
    if ($.cookie('landingPage') === undefined || $.cookie('landingPage').length === 0) {
      var landingPage = true;
      $.cookie('landingPage', unescape);
      $.removeCookie('landingPage', {path: '/'});
      $.cookie('landingPage', 'landed', {path: '/'});
    } else {
      var landingPage = false;
      $.cookie('landingPage', unescape);
      $.removeCookie('landingPage', {path: '/'});
      $.cookie('landingPage', 'refresh', {path: '/'});
    }
    if (__bva__.debug) {
      console.log('Landing Page: ' + landingPage);
    }

    /* Log State Cookie
    ------------------- */
    {% if customer %}
    var isLoggedIn = true;
    {% else %}
    var isLoggedIn = false;
    {% endif %}
    if (!isLoggedIn) {
      $.cookie('logState', unescape);
      $.removeCookie('logState', {path: '/'});
      $.cookie('logState', 'loggedOut', {path: '/'});
    } else {
      if ($.cookie('logState') === 'loggedOut' || $.cookie('logState') === undefined) {
        $.cookie('logState', unescape);
        $.removeCookie('logState', {path: '/'});
        $.cookie('logState', 'firstLog', {path: '/'});
      } else if ($.cookie('logState') === 'firstLog') {
        $.cookie('logState', unescape);
        $.removeCookie('logState', {path: '/'});
        $.cookie('logState', 'refresh', {path: '/'});
      }
    }

    if ($.cookie('logState') === 'firstLog') {
      var firstLog = true;
    } else {
      var firstLog = false;
    }

    /* ==========
    | DATALAYERS |
    ----------- */

    /* DATALAYER: Landing Page
    --------------------------
    Fires any time a user first lands on the site. */

    if ($.cookie('landingPage') === 'landed') {
      dataLayer.push({
        'pageType': 'Landing',
        'event': 'Landing'
      });

      if (__bva__.debug) {
        console.log('DATALAYER: Landing Page fired.');
      }
    }

    /* DATALAYER: Log State
    -----------------------
    1. Determine if user is logged in or not.
    2. Return User specific data. */

    var logState = {
      {% if shop.customer_accounts_enabled %}
      {% if customer %}
      'userId'        : '{{customer.id}}',
      'customerEmail' : '{{customer.email}}',
      'logState'      : "Logged In",
      'customerInfo'  : {
        'firstName'   : '{{customer_address.first_name}}',
        'lastName'    : '{{customer_address.last_name}}',
        'address1'    : '{{customer_address.address1}}',
        'address2'    : '{{customer_address.address2}}',
        'street'      : '{{customer_address.street}}',
        'city'        : '{{customer_address.city}}',
        'province'    : '{{customer_address.province}}',
        'provinceCode': '{{customer_address.province_code}}',
        'zip'         : '{{customer_address.zip}}',
        'country'     : '{{customer_address.country}}',
        'countryCode' : '{{customer_address.country_code}}',
        'phone'       : '{{customer_address.phone}}',
        'totalOrders' : '{{customer.orders_count}}',
        'totalSpent'  : '{{customer.total_spent | money_without_currency}}',
        'orderIds'    : '{% for order in customer.orders %}{% if forloop.last == true %}{{ order.id }},{% else %}{{ order.id }}{% endif%}{% endfor %}',
      },
      {% else %}
      'logState' : "Logged Out",
      {% endif %}
      {% endif %}
      'firstLog'      : firstLog,
      'customerEmail' : '{{customer.email}}',
      'timestamp'     : Date.now(),
      'hasAccount'    : '{{customer.has_account}}',
      {% if customer.orders_count > 2 %}
      'customerType'       : 'Returning',
      'customerTypeNumber' : '0',
      {% else %}
      'customerType'       : 'New',
      'customerTypeNumber' :'1', 
      {% endif %}
      'shippingInfo' : {
        'fullName'  : '{{checkout.shipping_address.name}}',
        'firstName' : '{{checkout.shipping_address.first_name}}',
        'lastName'  : '{{checkout.shipping_address.last_name}}',
        'address1'  : '{{checkout.shipping_address.address1}}',
        'address2'  : '{{checkout.shipping_address.address2}}',
        'street'    : '{{checkout.shipping_address.street}}',
        'city'      : '{{checkout.shipping_address.city}}',
        'province'  : '{{checkout.shipping_address.province}}',
        'zip'       : '{{checkout.shipping_address.zip}}',
        'country'   : '{{checkout.shipping_address.country}}',
        'phone'     : '{{checkout.shipping_address.phone}}',
      },
      'billingInfo' : {
        'fullName'  : '{{checkout.billing_address.name}}',
        'firstName' : '{{checkout.billing_address.first_name}}',
        'lastName'  : '{{checkout.billing_address.last_name}}',
        'address1'  : '{{checkout.billing_address.address1}}',
        'address2'  : '{{checkout.billing_address.address2}}',
        'street'    : '{{checkout.billing_address.street}}',
        'city'      : '{{checkout.billing_address.city}}',
        'province'  : '{{checkout.billing_address.province}}',
        'zip'       : '{{checkout.billing_address.zip}}',
        'country'   : '{{checkout.billing_address.country}}',
        'phone'     : '{{checkout.billing_address.phone}}',
      },
      'checkoutEmail' : '{{checkout.email}}',
      'currency'      : '{{shop.currency}}',
      'pageType'      : 'Log State',
      'event'         : 'Log State'
    }

    dataLayer.push(logState);
    if(__bva__.debug){
      console.log("Log State"+" :"+JSON.stringify(logState, null, " "));
    }
  
    /*DATALAYER: Homepage
    --------------------------- */

    if(document.location.pathname == "/"){
      var homepage = {
        'pageType' : 'Homepage',
        'event'    : 'Homepage'
      };
      dataLayer.push(homepage);
      if(__bva__.debug){
        console.log("Homepage"+" :"+JSON.stringify(homepage, null, " "));
      }
    }	

    /* DATALAYER: Blog Articles
    ---------------------------
    Fire on Blog Article Pages */

    {% if template contains 'article' %}
    var blog = {
      'author'      : '{{article.author}}',
      'title'       : '{{article.title}}',
      'dateCreated' : '{{article.created_at}}',
      'pageType'    : 'Blog',
      'event'       : 'Blog'
    };
    dataLayer.push(blog);
    if(__bva__.debug){
      console.log("Blog"+" :"+JSON.stringify(blog, null, " "));
    }
    {% endif %}

    /* DATALAYER: Product List Page (Collections, Category)
    -------------------------------------------------------
    Fire on all product listing pages. */

    {% if template contains 'collection' %}
    var product = {
      'products': [
      {% for product in collection.products %}       
        {
        'product_id'	  : '{{ product.id }}',
        'id'	  : '{{ product.id }}',
        'sku'             : '{{product.selected_variant.sku}}',
        'variantId'       : '{{product.selected_variant.variant.id}}',
        'productType'     : '{{product.type}}',
        'name'            : '{{product.title}}',
        'price'           : '{{product.price | money_without_currency | remove: ","}}',
        'image_url'        : 'https:{{product.featured_image|img_url:'grande'}}', 
        'productURL'      : '{{shop.secure_url}}{{product.url}}',
        'brand'           : '{{shop.name}}',              
        'comparePrice'    : '{{product.compare_at_price_max|money_without_currency}}',
        'categories'      : {{product.collections|map:"title"|json}},
        'currentCategory' : '{{collection.title}}',
        'currentCategoryId': '{{collection.id}}',
        'productOptions'  : {
          {% for option in product.options_with_values %}
          {% for value in option.values %}
          {% if option.selected_value == value %}
          "{{option.name}}" : "{{value}}",
          {% endif %}
          {% endfor %}
          {% endfor %}
        }
      },
      {% endfor %}]
    };
    var collections = {
      'productList' : "{{collection.title}}",
      'pageType'    : 'Collection',
      'event'       : 'Collection'
    };
    dataLayer.push(product);
    dataLayer.push(collections);
    if(__bva__.debug){
      console.log("Collections"+" :"+JSON.stringify(product, null, " "));
      console.log("Collections"+" :"+JSON.stringify(collections, null, " "));
    }
    {% endif %}

    /* DATALAYER: Product Page
    --------------------------
    Fire on all Product View pages. */

    if (template.match(/.*product.*/gi) && !template.match(/.*collection.*/gi)) {

      sku = '';
      var product = {
        'products': [{
          'product_id'      : '{{product.id}}',
          'id'      : '{{product.id}}',
          'sku'             : '{{product.selected_or_first_available_variant.sku}}',
          'variant'       : '{{product.selected_or_first_available_variant.id}}',
          'productType'     : '{{product.type}}',
          'name'            : '{{product.title}}',
          'price'           : '{{product.price | money_without_currency | remove: ","}}',
          'description'     : '{{product.description | strip_newlines | strip_html | escape }}',
          'brand'           : '{{shop.name}}',              
          'comparePrice'    : '{{product.compare_at_price_max|money_without_currency}}',
          'categories'      : {{product.collections|map:"title"|json}},
          'category'		: '{{collection.title}}',
          'currentCategory' : '{{collection.title}}',
          'productURL'      : '{{shop.secure_url}}{{product.url}}',
          'image_url'        : "https:{{product.featured_image|img_url:'grande'}}", 
          'productOptions'  : {
            {% for option in product.options_with_values %}
            {% for value in option.values %}
            {% if option.selected_value == value %}
            "{{option.name}}" : "{{value}}",
            {% endif %}
            {% endfor %}
            {% endfor %}
          }
        }]
      };

      function productView(){
        var sku = '{{product.selected_variant.sku}}';
        dataLayer.push(product, {
          'pageType' : 'Product',
          'event'    : 'Product'});
        if(__bva__.debug){
          console.log("Product"+" :"+JSON.stringify(product, null, " "));
        }
      }
      productView();

      $(__bva__.variantSelector).click(function(){
        var skumatch = '{{product.selected_variant.sku}}';
        if(sku != skumatch){
          productView();
        }
        console.log('variantSelector');
      });
    }

    /* DATALAYER: Cart View
    -----------------------
    1. Fire anytime a user views their cart (non-dynamic) */

    {% if template contains 'cart' %}
    var cart = {
      'products':[{% for line_item in cart.items %}{
        'product_id': '{{line_item.product_id}}',
        'id'       : '{{line_item.product_id}}',
        'sku'      : '{{line_item.sku}}',
        'variant'  : '{{line_item.variant_id}}',
        'name'     : '{{line_item.title}}',
        'price'    : '{{line_item.price | money_without_currency}}',
        'quantity' : '{{line_item.quantity}}',
        'image_url': 'https:{{line_item | img_url: 'grande'}}',
        'url'	   : 'https://www.hellonoemie.com{{line_item.url}}',
        'tanner'   : true
      },{% endfor %}],
      'pageType' : 'Cart',
      'event'    : 'Cart'
    };

    dataLayer.push(cart);
    if(__bva__.debug){
      console.log("Cart"+" :"+JSON.stringify(cart, null, " "));
    }

    __bva__.cart = cart.products;
    $(__bva__.removeCartTrigger).on('click', function (event) {
    console.log('removeCartTrigger 469');

    setTimeout(function(){
    // ------------------------------------------------------------------- remove from cart
    
      jQuery.getJSON("/cart", function (response) {
      // --------------------------------------------- get Json response 
        console.log('removeCartTrigger 469 inside getJSON');
        __bva__.removeCart = response;
        console.log(__bva__.removeCart);
        var removeFromCart = {
          'products': __bva__.removeCart.items.map(function (line_item) {
            return {
              'product_id': line_item.product_id,
              'id'       : line_item.product_id,
              'sku'      : line_item.sku,
              'variant'  : line_item.variant_id,
              'name'     : line_item.title,
              'price'    : (line_item.price/100),
              'quantity' : line_item.quantity,
              'image_url': line_item.image_url,
              'url'      : line_item.url
            }
          }),
          'pageType' : 'Remove from Cart',
          'event'    : 'Remove from Cart'         
        };
        __bva__.removeCart = removeFromCart;
        var cartIDs = [];
        var removeIDs = [];
        var removeCart = [];

        // remove from cart logic
        for(var i=__bva__.cart.length-1;i>=0;i--){var x=parseFloat(__bva__.cart[i].variant);cartIDs.push(x)}for(var i=__bva__.removeCart.products.length-1;i>=0;i--){var x=parseFloat(__bva__.removeCart.products[i].variant);removeIDs.push(x)}function arr_diff(b,c){var a=[],diff=[];for(var i=0;i<b.length;i++){a[b[i]]=true}for(var i=0;i<c.length;i++){if(a[c[i]]){delete a[c[i]]}else{a[c[i]]=true}}for(var k in a){diff.push(k)}return diff};var x=arr_diff(cartIDs,removeIDs)[0];for(var i=__bva__.cart.length-1;i>=0;i--){if(__bva__.cart[i].variant==x){removeCart.push(__bva__.cart[i])}}
		
        console.log('dataLayer.push(removeFromCart)');
        dataLayer.push(removeFromCart);
        if (__bva__.debug) {
          console.log("Cart"+" :"+JSON.stringify(removeCart, null, " "));
        }

      // --------------------------------------------- get Json response 
      });

    // ------------------------------------------------------------------- remove from cart
    }, 500);

    });

    {% endif %}

    /* DATALAYER Variable: Checkout & Transaction Data */

    __bva__products = [];

    {% for line_item in checkout.line_items %}
    __bva__products.push({
      'product_id'  : '{{line_item.product_id}}',
      'id'          : '{{line_item.product_id}}',
      'sku'         : '{{line_item.sku}}',
      'variantId'   : '{{line_item.variant_id}}',
      'name'        : '{{line_item.title}}',
      'productType' : "{{line_item.product.type}}",
      'price'       : '{{line_item.price | money_without_currency| remove: ","}}',
      'quantity'    : '{{line_item.quantity}}',
      'description' : '{{line_item.product.description | strip_newlines | strip_html | escape }}',
      'image_url'    : "https:{{line_item.product.featured_image.src|img_url:'grande'}}", 
      'productURL'  : '{{shop.secure_url}}{{line_item.product.url}}'
    });

    {% endfor %}
 	
  	if (document.location.pathname.startsWith("/apps/bread/orders/confirmation/")) {
      var orderNumber = $('.order-info-label').next().html();
      var orderSubtotal = $('.order-total').html().split('<br>')[0].replace(/\s|\$/g, '');
      var orderTax = $('.order-total').html().split('<br>')[1].replace(/\s|\$/g, '');
      var orderShipping = $('.order-total').html().split('<br>')[2].replace(/\s|\$/g, '');
      var orderTotal = $('.order-total strong').html().replace(/\s|\$/g, '');
	} else if (('{{checkout.subtotal_price}}' == false && document.location.href.indexOf("thank_you") > -1) || ('{{checkout.subtotal_price}}' == false && document.location.href.indexOf("orders") > -1 )) {
      var orderSubtotal = $('.total-line--subtotal .order-summary__emphasis').html().replace(/\s|\$|\,/g, '').toString();
      var orderTax = $('.total-line--taxes .order-summary__emphasis').html().replace(/\s|\$|\,/g, '').toString();
      var orderShipping = $('.total-line--shipping .order-summary__emphasis').html().replace(/\s|\$|\,/g, '').toString();
      var orderTotal = $('.total-line__price .payment-due__price').html().replace(/\s|\$|\,/g, '').toString();
    } else {
      var orderSubtotal = {% if checkout.subtotal_price %}{{checkout.subtotal_price |  money_without_currency| remove: ","}}{% else %}0{% endif %};
      var orderTax = {% if checkout.tax_price %}{{checkout.tax_price |  money_without_currency| remove: ","}}{% else %}0{% endif %};
      var orderShipping = {% if checkout.shipping_price %}{{checkout.shipping_price |  money_without_currency| remove: ","}}{% else %}0{% endif %};
      var orderTotal = {% if checkout.total_price %}{{checkout.total_price |  money_without_currency| remove: ","}}{% else %}0{% endif %};
    }

      var orderGift = {% assign giftamount = checkout.gift_cards_amount|money_without_currency | remove: ',' %}{% if checkout.gift_cards_amount %}{{ giftamount }}{% else %}0{% endif %};
      var orderSubtotalMinusGift = {{checkout.subtotal_price | money_without_currency | minus: checkout.gift_cards_amount}};
      var orderDiscountTotal = {% assign gift_total = gift_card.balance | money_without_currency %}{% assign discount_total = checkout.discounts_amount | money_without_currency | plus: gift_total %}{{discount_total}};
      var orderPriceList = 	'{% for item in checkout.line_items %}{% assign total_cartprice = checkout.subtotal_price %}{% assign ratio = dtotal | divided_by: total_cartprice %}{% assign ratioless = 1 | minus: ratio %}{% assign final_item_price = item.price | times: ratioless %}{% if forloop.last == true %}{{ final_item_price | money_without_currency | remove: ',' }}{% else %}{{final_item_price | money_without_currency | remove: ',' | append: ','}}{% endif %}{% endfor %}';
      var orderQuantityList = '{% for item in checkout.line_items %}{% if forloop.last == true %}{{ item.quantity }}{% else %}{{ item.quantity | append: ','}}{% endif %}{% endfor %}';
      var orderCouponCode = '{% for discount in checkout.discounts %}{% if forloop.last == true %}{{ discount.code }}{% else %}{{ discount.code | append: ',' }}{% endif %}{% endfor %}';                                    
  	  var newCustomer = {% if customer.orders_count > 1 %}0{% else %}'true'{% endif %};
      var SKUList = '{% for item in checkout.line_items %}{% if forloop.last == true %}{{ item.sku }}_{{item.variant_id}}{% else %}{{item.sku}}_{{ item.variant_id | append: ','}}{% endif %}{% endfor %}';
  
  
    transactionData = {
      'transactionNumber'      : '{{checkout.order_number}}',
      'transactionId'          : '{{checkout.order_id}}',
      'transactionAffiliation' : '{{shop.name}}',
      'transactionTotal'       : orderTotal,
      'transactionTax'         : orderTax,
      'transactionShipping'    : orderShipping,
      'transactionSubtotal'    : orderSubtotal,
      'transactionSKUList'	   : SKUList,
      'transactionGiftAmount'  : orderGift,
      'transactionTotalMinusGift': orderSubtotal - orderGift,
      'transactionPriceList'   : orderPriceList,
      'transactionQuantityList': orderQuantityList,
      'transactionCouponCode'  : orderCouponCode,
      'transactionDiscountTotal': orderDiscountTotal,
      'transactionShippingMethod': '{{checkout.shipping_method.title}}',
      'transactionPaymentMethod': '{{transaction.payment_gateway}}',
      'firstTimeAccessed'      : {% if first_time_accessed %}'true'{% else %}'false'{% endif %},
      'newCustomer'            : newCustomer,
      {% for discount in checkout.discounts %}
      'promoCode' : '{{discount.code}}',
      'discount'  : '{{discount.amount | money_without_currency}}',
      {% endfor %}

      'products': __bva__products
    };

    if(__bva__.debug == true){
      /* DATALAYER: Transaction
      -------------------------- */
      if(document.location.pathname.match(/.*order.*/g)){
        dataLayer.push(transactionData,{
          'pageType' :'Transaction',
          'event'    :'Transaction'
        });       
        console.log("Transaction Data"+" :"+JSON.stringify(transactionData, null, " "));
      }
    }

    /* DATALAYER: Checkout
    -------------------------- */
    if(Shopify.Checkout){
      if(Shopify.Checkout.step){ 
        if(Shopify.Checkout.step.length > 0){
          if (Shopify.Checkout.step === 'contact_information'){
            dataLayer.push(transactionData,{
              'event'    :'Customer Information',
              'pageType' :'Customer Information'});
              console.log("Customer Information - Transaction Data"+" :"+JSON.stringify(transactionData, null, " "));
          }else if (Shopify.Checkout.step === 'shipping_method'){
            dataLayer.push(transactionData,{
              'event'    :'Shipping Information',
              'pageType' :'Shipping Information'});
              console.log("Shipping - Transaction Data"+" :"+JSON.stringify(transactionData, null, " "));
          }else if( Shopify.Checkout.step === "payment_method" ){
            dataLayer.push(transactionData,{
              'event'    :'Add Payment Info',
              'pageType' :'Add Payment Info'});
              console.log("Payment - Transaction Data"+" :"+JSON.stringify(transactionData, null, " "));
          }
        }

        if(__bva__.debug == true){
          /* DATALAYER: Transaction
          -------------------------- */
            if(Shopify.Checkout.page == "thank_you"){
              dataLayer.push(transactionData,{
                'pageType' :'Transaction',
                'event'    :'Transaction'
              });       
              console.log("Transaction Data"+" :"+JSON.stringify(transactionData, null, " "));  
            }
        }else{
          /* DATALAYER: Transaction
          -------------------------- */
          if(Shopify.Checkout.page == "thank_you"){
            dataLayer.push(transactionData,{
              'pageType' :'Transaction',
              'event'    :'Transaction'
            });
          }
        }
      }
    }  

    /* DATALAYER: All Pages
    -----------------------
    Fire all pages trigger after all additional dataLayers have loaded. */

    dataLayer.push({
      'event': 'DataLayer Loaded'
    });

    console.log('DATALAYER: DataLayer Loaded.');

    /*==========================
    | dataLayer Event Bindings |
    --------------------------*/

    /* DATALAYER: Add to Cart / Dynamic Cart View
    ---------------------------------------------
    Fire all pages trigger after all additional dataLayers have loaded. */

    $(document).ready(function() {

      /* DATALAYER: Search Results
      --------------------------- */

      var searchPage = new RegExp(__bva__.searchPage, "g");
      if(document.location.pathname.match(searchPage)){
        var search = {
          'searchTerm' : __bva__.searchTermQuery,
          'pageType'   : "Search",
          'event'      : "Search"
        };

        dataLayer.push(search);
        if(__bva__.debug){
          console.log("Search"+" :"+JSON.stringify(search, null, " "));
        }
      }

      /* DATALAYER: Cart
      ------------------- */

      /* STAGE CART DATA */
      function mapJSONcartData(){
        jQuery.getJSON('/cart.js', function (response) {
        // --------------------------------------------- get Json response 
          __bva__.cart = response;
          var cart = {
            'products': __bva__.cart.items.map(function (line_item) {
              return {
                'product_id': line_item.id,
                'id': line_item.id,
                'sku'      : line_item.sku,
                'variant'  : line_item.variant_id,
                'name'     : line_item.title,
                'price'    : (line_item.price/100),
                'quantity' : line_item.quantity
              }
              }),
            'pageType' : 'Cart',
            'event'    : 'Cart'     
          };
          if(cart.products.length > 0){
            dataLayer.push(cart);
            if (__bva__.debug) {
              console.log("Cart"+" :"+JSON.stringify(cart, null, " "));
            }
          }
        // --------------------------------------------- get Json response 
        });
      }

      viewcartfire = 0;

      /* VIEW CART */
      $(__bva__.viewCart).on('click', function (event) {
      // ------------------------------------------------------------------------- view cart
      
        if(viewcartfire !== 1){ 

        viewcartfire = 1;
        // IF DYNAMIC CART IS TRUE
        if (__bva__.dynamicCart) {
        // ---------------------------------- if dynamic cart is true
        cartCheck = setInterval(function () {
        // -------------------------------------- begin check interval
          if ($(__bva__.cartVisableSelector).length > 0) {
          // ------------------------------------------------------------------ check visible selectors
            clearInterval(cartCheck);
            mapJSONcartData();
            // ------------------------------------------------------------------ check visible selectors
            $(__bva__.removeCartTrigger).on('click', function (event) {
            // ------------------------------------------------------------------- remove from cart
              console.log('removeCartTrigger 743');
              var link = $(this).attr("href");
              var linkLineItem = getURLParams('line',link);
              var linkQty = getURLParams('quantity',link);

              //explode link to get line item and quantity
              jQuery.getJSON(link, function (response) {
              // --------------------------------------------- get Json response 
                __bva__.removeCart = response;
                
                var new_cart = __bva__.removeCart.items.map(function (line_item) {
                    return {
                      'product_id'       : line_item.id,
                      'id'       : line_item.id,
                      'sku'      : line_item.sku,
                      'variant'  : line_item.variant_id,
                      'name'     : line_item.title,
                      'price'    : (line_item.price/100),
                      'quantity' : line_item.quantity
                    }
                  });
                
                jQuery.getJSON('/cart.js', function (cartResponse) {
                // --------------------------------------------- get Json response 
                  var old_cart = cartResponse.items.map(function (line_item) {
                      return {
                        'product_id': line_item.id,
                        'id': line_item.id,
                        'sku'      : line_item.sku,
                        'variant'  : line_item.variant_id,
                        'name'     : line_item.title,
                        'price'    : (line_item.price/100),
                        'quantity' : line_item.quantity
                      }
                  });
                  
               	  var delta_cart = old_cart;
                  
                  console.log(new_cart);
                  console.log(old_cart);
                  console.log(delta_cart);
                  
                 // delta_cart[linkLineItem].quantity = delta_cart[linkLineItem].quantity - new_cart[linkLineItem].quantity;
                  
                  var removeFromCart = {
                    'products': new_cart,
                    //'products_old': old_cart,
                    //'products_delta': delta_cart,
                    'pageType' : 'Remove from Cart',
                    'event'    : 'Remove from Cart'         
                  };
                  dataLayer.push(removeFromCart);
                  if (__bva__.debug) {
                    console.log("Cart"+" :"+JSON.stringify(removeFromCart, null, " "));
                  }
                
                });
                

              // --------------------------------------------- get Json response 
              });
            // ------------------------------------------------------------------- remove from cart
            });
            }
          // -------------------------------------- begin check interval
          }, 500);
        // ---------------------------------- if dynamic cart is true
        }       
      }
      // ------------------------------------------------------------------------- view cart
      });
      
      /* ADD TO CART */
      jQuery.getJSON('/cart.js', function (response) {
      // --------------------------------------------- get Json response 
        __bva__.cart = response;
        var cart = {
          'products': __bva__.cart.items.map(function (line_item) {
            return {
              'product_id'       : line_item.id,
              'id'       : line_item.id,
              'sku'      : line_item.sku,
              'variant'  : line_item.variant_id,
              'name'     : line_item.title,
              'price'    : (line_item.price/100),
              'quantity' : line_item.quantity
            }
          })
        }
      // --------------------------------------------- get Json response 
      __bva__.cart = cart;
      collection_cartIDs = [];
      collection_matchIDs = [];
      collection_addtocart = [];
      for (var i = __bva__.cart.products.length - 1; i >= 0; i--) {
          var x = parseFloat(__bva__.cart.products[i].variant);
          collection_cartIDs.push(x);
      }
      });

      function __bva__addtocart(){
        {% if template contains 'collection' %}         

        setTimeout(function(){
          jQuery.getJSON('/cart.js', function (response) {
            // --------------------------------------------- get Json response 
            __bva__.cart = response;
            var cart = {
              'products': __bva__.cart.items.map(function (line_item) {
                return {
                  'product_id'       : line_item.product_id,
                  'sku'      : line_item.sku,
                  'variant'  : line_item.variant_id,
                  'name'     : line_item.title,
                  'price'    : (line_item.price/100),
                  'quantity' : line_item.quantity
                }
              })
            }
            __bva__.cart = cart;
            for (var i = __bva__.cart.products.length - 1; i >= 0; i--) {
              var x = parseFloat(__bva__.cart.products[i].variant);
              collection_matchIDs.push(x);
            }
            function arr_diff(b, c) {
              var a = [],
              diff = [];
              for (var i = 0; i < b.length; i++) {
                a[b[i]] = true
              }
              for (var i = 0; i < c.length; i++) {
                if (a[c[i]]) {
                  delete a[c[i]]
                } else {
                  a[c[i]] = true
                }
              }
              for (var k in a) {
                diff.push(k)
              }
              return diff
            };
            var x = arr_diff(collection_cartIDs, collection_matchIDs).pop();
            console.log(x);
            for (var i = __bva__.cart.products.length - 1; i >= 0; i--) {
              if (__bva__.cart.products[i].variant.toString() === x) {
                product = {'products':[__bva__.cart.products[i]]};
                dataLayer.push({'products':product});
                dataLayer.push(product);
                dataLayer.push({
                  'pageType' : 'Add to Cart',
                  'event'    : 'Add to Cart'
                });
                if (__bva__.debug) {
                  console.log("Add to Cart"+" :"+JSON.stringify(product, null, " "));
                }
              }
            }
            // --------------------------------------------- get Json response 
          });
        },1000);

        {% else %}
		console.log('in else');
        console.log(product);
        dataLayer.push(product, {
          'pageType' : 'Add to Cart',
          'event'    : 'Add to Cart'
        });

        if (__bva__.debug) {
          console.log("Add to Cart"+" :"+JSON.stringify(product, null, " "));
        }

        {% endif %}

          // IF DYNAMIC CART IS TRUE
          if (__bva__.dynamicCart) {
            // ---------------------------------- if dynamic cart is true
            var cartCheck = setInterval(function () {
            // -------------------------------------- begin check interval
            if ($(__bva__.cartVisableSelector).length > 0) {
              // ------------------------------------------------------------------ check visible selectors
              clearInterval(cartCheck);
              mapJSONcartData();
              // ------------------------------------------------------------------ check visible selectors
              $(__bva__.removeCartTrigger).on('click', function (event) {
              // ------------------------------------------------------------------- remove from cart
              console.log('removeCartTrigger 931');
              var link = $(this).attr("href");
              jQuery.getJSON(link, function (response) {
                // --------------------------------------------- get Json response 
                __bva__.removeCart = response;
                var removeFromCart = {
                  'products': __bva__.removeCart.items.map(function (line_item) {
                    return {
                      'product_id'       : line_item.product_id,
                      'id'       : line_item.product_id,
                      'sku'      : line_item.sku,
                      'variant'  : line_item.variant_id,
                      'name'     : line_item.title,
                      'price'    : (line_item.price/100),
                      'quantity' : line_item.quantity
                    }
                  }),
                  'pageType' : 'Remove from Cart',
                  'event'    : 'Remove from Cart'         
                };
                dataLayer.push(removeFromCart);
                if (__bva__.debug) {
                  console.log("Cart"+" :"+JSON.stringify(removeFromCart, null, " "));
                }
                // --------------------------------------------- get Json response 
              });
              // ------------------------------------------------------------------- remove from cart
            });
            }
            // -------------------------------------- begin check interval
          }, 500);
          // ---------------------------------- if dynamic cart is true
        }       
      }   
      
      $(__bva__.cartTriggers).on('click', function(event) {
        __bva__addtocart();
      });

      /* DATALAYER: Newsletter Subscription
      ------------------------------------- */
      __bva__newsletter_fire = 0;
      $(document).on('click', __bva__.newsletterSelectors, function () {
        if(__bva__newsletter_fire !== 1){
        __bva__newsletter_fire = 1;
        var newsletterCheck = setInterval(function () {
        // -------------------------------------- begin check interval
          if ($(__bva__.newsletterSuccess).length > 0) {
          // ------------------------------------------------------------------ check visible selectors
            clearInterval(newsletterCheck);
            dataLayer.push({'event': 'Newsletter Subscription'});
          // ------------------------------------------------------------------ check visible selectors
          }
        // -------------------------------------- begin check interval
        },500);
      }
      });

      /* DATALAYER: Wishlist
      ------------------------------------- */
      setTimeout( function(){

        $(document).on('click',__bva__.wishlistSelector,function () {
          console.log('clicked wishlist');
          dataLayer.push(product,
            {'event': 'Add to Wishlist'});
          if(__bva__.debug){
            console.log("Wishlist"+" :"+JSON.stringify(product, null, " "));
          }
        });

        if(document.location.pathname == __bva__.wishlistPage){
          var __bva__productLinks = $('[href*="product"]');
          var __bva__prods        = [];
          var __bva__links        = [];
          var __bva__count        = 1;

          $(__bva__productLinks).each(function(){
            var href = $(this).attr("href");
            if(!__bva__links.includes(href)){
              __bva__links.push(href);
              $(this).attr("dataLayer-wishlist-item",__bva__count++);
              jQuery.getJSON(href, function (response) {
              // --------------------------------------------- get Json response 
                __bva__.wishlist = response;
                var wishlistproducts = {
                'id'   : __bva__.wishlist.product.id,
                'name' : __bva__.wishlist.product.title,
                };
                __bva__prods.push(wishlistproducts);
              // --------------------------------------------- get Json response 
              });
            }
          });

          dataLayer.push({'products': __bva__prods, 
            'pageType' : 'Wishlist',
            'event'    : 'Wishlist'});
          }

        var __bva__count = 1;
        var wishlistDel  = $(__bva__.removeWishlist);
        wishlistDel.each(function(){
          $(this).attr("dataLayer-wishlist-item-del",__bva__count++);
        });

        $(document).on('click',__bva__.removeWishlist,function(){
          console.log('click')
          var index = $(this).attr("dataLayer-wishlist-item-del");
          var link  = $("[dataLayer-wishlist-item="+index+"]").attr("href");
          console.log(index)
          console.log(link)
          jQuery.getJSON(link, function (response) {
          // --------------------------------------------- get Json response 
            __bva__.wishlist     = response;
            var wishlistproducts = {
              'id'   : __bva__.wishlist.product.id,
              'name' : __bva__.wishlist.product.title,
            };

            dataLayer.push({'products': wishlistproducts,
            'pageType' : 'Wishlist',
            'event'    : 'Wishlist Delete Product'});
          // --------------------------------------------- get Json response 
          });
        })
      }, 3000);

      /* DATALAYER: CTAs
      ------------------ */
      $(__bva__.ctaSelectors).on('click', function () {
        var ctaCheck = setInterval(function () {
        // -------------------------------------- begin check interval
          if ($(__bva__.ctaSuccess).length > 0) {
          // ------------------------------------------------------------------ check visible selectors
            clearInterval(ctaCheck);
            dataLayer.push({'event': 'CTA'});
          // ------------------------------------------------------------------ check visible selectors
          }
        // -------------------------------------- begin check interval
        },500);
      });

      /* DATALAYER: Promo Subscriptions
      --------------------------------- */
      $(__bva__.promoSubscriptionsSelectors).on('click', function () {
        var ctaCheck = setInterval(function () {
        // -------------------------------------- begin check interval
          if ($(__bva__.promoSuccess).length > 0) {
          // ------------------------------------------------------------------ check visible selectors
            clearInterval(ctaCheck);
            dataLayer.push({'event': 'Promo Subscription'});
          // ------------------------------------------------------------------ check visible selectors
          }
        // -------------------------------------- begin check interval
        },500);
      });

    }); // document ready

  // --------------- run script after jQuery has loaded
  }
// --------------------------------------------- wait for jQuery to load
}, 500);
</script>
