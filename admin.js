var ProductNameNode=document.getElementById("ProductName");
var ProductDescriptionNode=document.getElementById("ProductDescription");
var ProductPriceNode=document.getElementById("ProductPrice");
var ProductQuantityNode=document.getElementById("ProductQuantity");
var rongInput=document.getElementById("rongInput");

var updatedBTN=document.getElementById("updated");

var ProductForm=document.getElementById("ProductForm");

var ProductShow=document.getElementById("ProductShow");

var products;

var count=0;

function init()
{
   products = getProductsFromStorage();

  products.forEach(function(product)
  { 
    appendINProductShow(product)
  })
}

init();



ProductForm.addEventListener("submit",function(event){
event.preventDefault();

var ProductName=ProductNameNode.value;
var ProductDescription=ProductDescriptionNode.value;
var ProductPrice=ProductPriceNode.value;
var ProductQuantity=ProductQuantityNode.value;
var index=count;
count++;

var product={
    ProductName,
    ProductDescription,
    ProductPrice,
    ProductQuantity,
    index
}
var areValid=validInput(product);

if(!areValid.status)
{
    rongInput.innerHTML="";
    var rong=document.createElement("p");
    rong.innerText=areValid.message;
    rong.style.color="red";
    rongInput.appendChild(rong);
}
if(areValid.status)
{
    resetFormValue();
    saveProductToStorage(product);
    appendINProductShow(product);
}
});


function validInput(product){
 var {ProductName,
    ProductDescription,
    ProductPrice,
    ProductQuantity}=product;
    if(!ProductName)
  {
    return {
      status: false,
      message:"Name is missing"
    }
  }

  if(!ProductDescription)
  {
    return {
      status: false,
      message:"Description is missing"
    }
  }

  if(!ProductPrice)
  {
    return {
      status: false,
      message:"price is missing"
    }
  }

  if(!ProductQuantity)
  {
    return {
      status: false,
      message:"quantity is missing"
    }
  }

  return {
      status: true,
    }

}
function resetFormValue(){
ProductNameNode.value="";
ProductDescriptionNode.value="";
ProductPriceNode.value="";
ProductQuantityNode.value="";

}

function appendINProductShow(product){
    var div=document.createElement("div");
    var nameLable=document.createElement(("lable"));
    var desLable=document.createElement(("lable"));
    var priceLable=document.createElement(("lable"));
    var quantityLable=document.createElement(("lable"));
   
    nameLable.innerText="Product Name";
    desLable.innerText="Product Description";
    priceLable.innerText="Product Price";
    quantityLable.innerText="Product Quantinty";
    
    var nameLableText=document.createElement(("input"));
    var desLableText=document.createElement(("input"));
    var priceLableText=document.createElement(("input"));
    var quantityLableText=document.createElement(("input"));
   
    nameLableText.value=product.ProductName;
   desLableText.value=product.ProductDescription;
   priceLableText.value=product.ProductPrice;
   quantityLableText.value=product.ProductQuantity;

   nameLableText.setAttribute("readonly",true);
   desLableText.setAttribute("readonly",true);
   priceLableText.setAttribute("readonly",true);
   quantityLableText.setAttribute("readonly",true);

   nameLableText.style.backgroundColor="white";
   desLableText.style.backgroundColor="white";
   priceLableText.style.backgroundColor="white";
   quantityLableText.style.backgroundColor="white";

   var updatBTN=document.createElement("button");
   var deleteBTN=document.createElement("button");
 
    updatBTN.setAttribute("id",product.index);
    deleteBTN.setAttribute("id",product.index);
   
    updatBTN.innerText="update";
    deleteBTN.innerText="Delete";

 div.appendChild(nameLable);
 div.appendChild(nameLableText);
 nameLable.setAttribute("class","form-label col Margin");
 nameLableText.setAttribute("class","form-control col Margin");

 div.appendChild(desLable); 
 div.appendChild(desLableText);
 desLable.setAttribute("class","form-label col Margin");
 desLableText.setAttribute("class","form-control col Margin");

 div.appendChild(priceLable);
 div.appendChild(priceLableText);
 priceLable.setAttribute("class","form-label col Margin");
 priceLableText.setAttribute("class","form-control col Margin");

 div.appendChild(quantityLable);
 div.appendChild(quantityLableText);
 quantityLable.setAttribute("class","form-label col Margin");
 quantityLableText.setAttribute("class","form-control col Margin");

 div.appendChild(updatBTN);
 div.appendChild(deleteBTN);
 
 updatBTN.setAttribute("class","btn btn-primary Margin");
 deleteBTN.setAttribute("class","btn btn-danger Margin");
 
 updatBTN.setAttribute("data-bs-toggle","modal")
 updatBTN.setAttribute("data-bs-target","#exampleModal");


 div.setAttribute("class","col-4");

 ProductShow.appendChild(div);

 
 deleteBTN.addEventListener("click",function(event){
   console.log(event.target.id);
  console.log(JSON.stringify(event.target.parentNode));

  products = getProductsFromStorage();
  console.log(products);

 event.target.parentNode.parentNode.removeChild(event.target.parentNode); 
   
 var ind=products.filter(function(e){
   if(e.index==event.target.id)
   {
     return e;
   }
 }) ;
 
 var inde = products.indexOf(ind[0]);
 products.splice(inde,1);

console.log(products)
  localStorage.setItem("products",JSON.stringify(products))

});

updatBTN.addEventListener("click",function(event){
  updatedBTN.setAttribute("name",event.target.id);

});

 updatedBTN.addEventListener("click",function(event){
   
var productName=document.getElementById("productName");
var description=document.getElementById("productDescription");
var price=document.getElementById("productPrice");
var quantity=document.getElementById("productQuantity");

 products = getProductsFromStorage();
    
 console.log(event.target)
 var ind=products.filter(function(e){
   if(e.index==event.target.name)
   {
     return e;
   }
 }) ;
 
 var inde = products.indexOf(ind[0]);
 
 console.log(ind[0]);
 products[inde].ProductName=productName.value;
 products[inde].ProductDescription=description.value;
 products[inde].ProductPrice=price.value;
 products[inde].ProductQuantity=quantity.value;

 var areValid=validInput(products[inde]);

 if(!areValid.status)
 {  
   rongInput.innerHTML="";
     var rong=document.createElement("p");
     rong.innerText=areValid.message;
     rong.style.color="red";
     rongInput.appendChild(rong);
 }
 if(areValid.status)
 {
     resetFormValue();
     localStorage.setItem("products",JSON.stringify(products))
     ProductShow.innerHTML="";
     init();
 }
 
 clearModel()

});
 

}

function clearModel()
{
  document.getElementById("productName").value="";
document.getElementById("productDescription").value="";
document.getElementById("productPrice").value="";
document.getElementById("productQuantity").value="";

}

function saveProductToStorage(product)
{
  let products = getProductsFromStorage();

  products.push(product)

  localStorage.setItem("products",JSON.stringify(products))
}

function getProductsFromStorage()
{
  var products = localStorage.getItem("products");

  return products ? JSON.parse(products) : [];
}