var ProductShow=document.getElementById("ProductShow");

var productName=document.getElementById("productName");
var description=document.getElementById("productDescription");
var price=document.getElementById("productPrice");
var quantity=document.getElementById("productQuantity");

var goToCart=document.getElementById("goToCart");

goToCart.addEventListener("click",function(){
  window.location.href="cart.html";
})

var products;
var personalInformation;
var loginNo=localStorage.getItem("loginNo");

function init()
{
   products = getProductsFromStorage();
  if(products.length==0)
  ProductShow.innerHTML="<h1>No Entery...</h1>";
  else
  products.forEach(function(product)
  { 
    appendINProductShow(product)
  })
}

init();

function appendINProductShow(product){
    var div=document.createElement("div");
    var nameLable=document.createElement(("lable"));
    var priceLable=document.createElement(("lable"));
   
    nameLable.innerText="Product Name";
    priceLable.innerText="Product Price";
    
    var nameLableText=document.createElement(("input"));
    var priceLableText=document.createElement(("input"));
   
    nameLableText.value=product.ProductName;
   priceLableText.value=product.ProductPrice;

   nameLableText.setAttribute("readonly",true);
   priceLableText.setAttribute("readonly",true);

   nameLableText.style.backgroundColor="white";
   priceLableText.style.backgroundColor="white";
   
   var showBTN=document.createElement("button");
   
    showBTN.setAttribute("id",product.index);
    
    showBTN.innerText="Description";

    var addToCartBTN=document.createElement("button");
   
    addToCartBTN.setAttribute("id",product.index);
    
    addToCartBTN.innerText="Add To Cart";

    div.appendChild(nameLable);
    div.appendChild(nameLableText);
    nameLable.setAttribute("class","form-label col Margin");
    nameLableText.setAttribute("class","form-control col Margin");

    div.appendChild(priceLable);
     div.appendChild(priceLableText);
    priceLable.setAttribute("class","form-label col Margin");
    priceLableText.setAttribute("class","form-control col Margin");

    div.appendChild(showBTN);
    div.appendChild(addToCartBTN);

    showBTN.setAttribute("class","btn btn-primary Margin");
    showBTN.setAttribute("data-bs-toggle","modal")
    showBTN.setAttribute("data-bs-target","#exampleModal");

    addToCartBTN.setAttribute("class","btn btn-warning Margin");

   var goToCart=document.createElement("button");
   goToCart.setAttribute("class","btn btn-info")
   goToCart.setAttribute("id","goToCart")
   goToCart.innerText="Go To Cart";

    div.setAttribute("class","col-4");

    ProductShow.appendChild(div);

    addToCartBTN.addEventListener("click",function()
    {
      addToMyCart(addToCartBTN.id)
      div.append(goToCart);
      addToCartBTN.style.display="none";
    });

    showBTN.addEventListener("click",function(event){
      var id=event.target.id;
    showDescription(id);
     });

     goToCart.addEventListener("click",function(){
      window.location.href="cart.html";
     });
}
function addToMyCart(id){
 
  products = getProductsFromStorage();
 
  var ind=products.filter(function(e){
   if(e.index==id)
   return e;
  });
ind[0].value=1;
  personalInformation=getPersonalInformationFromStorage();
  
  var indPerson= personalInformation.filter(function(e){
    if(e.no==loginNo)
    return e;
   } );

   var indePerson = personalInformation.indexOf(indPerson[0]);
 
   personalInformation[indePerson].inCart.push(ind[0]);

   localStorage.setItem("personalInformation",JSON.stringify(personalInformation))
   
   
}

function showDescription(id){

    products = getProductsFromStorage();
   
    var ind=products.filter(function(e){
         if(e.index==id)
        {
          return e;
        }
        }) ;

    productName.value=ind[0].ProductName;
    description.value=ind[0].ProductDescription;
    price.value=ind[0].ProductPrice;
    quantity.value=ind[0].ProductQuantity;
  
}


function getProductsFromStorage()
{
  var products = localStorage.getItem("products");

  return products ? JSON.parse(products) : [];
}



function getPersonalInformationFromStorage()
{
  var personalInformation = localStorage.getItem("personalInformation");

  return personalInformation ? JSON.parse(personalInformation) : [];
}