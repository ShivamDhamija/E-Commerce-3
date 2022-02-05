var ProductShow=document.getElementById("ProductShow");
var placeOrder=document.getElementById("placeOrder")

var productsOfLogin;
var personalInformation;
var loginNo=localStorage.getItem("loginNo");
var indexOfPersonLogin=indexOfPerson(); 

placeOrder.addEventListener("click",function(){
    ProductShow.innerHTML="";
    products = getProductsFromStorage();
    personalInformation=getPersonalInformationFromStorage();
  
    personalInformation[indexOfPersonLogin].inCart.forEach(function(e){
        
        products.forEach(function(a){
           
            if(e.ProductName==a.ProductName&&e.value<=a.ProductQuantity)
            {
                a.ProductQuantity-=e.value;
               
            }
        });
    });

    localStorage.setItem("products",JSON.stringify(products));

    personalInformation[indexOfPersonLogin].inCart=[];
    localStorage.setItem("personalInformation",JSON.stringify(personalInformation))

    console.log(personalInformation[indexOfPersonLogin].inCart);

    });

function indexOfPerson(){
personalInformation=getPersonalInformationFromStorage();
  
  var indPerson= personalInformation.filter(function(e){
    if(e.no==loginNo)
    return e;
   } );

   var indePerson = personalInformation.indexOf(indPerson[0]);
return indePerson;
}

personalInformation=getPersonalInformationFromStorage();
productsOfLogin=personalInformation[indexOfPersonLogin].inCart;

function init(productsOfLogin)
{
  if(productsOfLogin.length===0)
  {
    ProductShow.innerHTML="<h1>No Entery...</h1>";
    placeOrder.disabled=true;
  }
  else{
    placeOrder.disabled=false;
    productsOfLogin.forEach(function(product)
  { 
    product.value=1;
    
    appendINProductShow(product)
  });
}
}

init(productsOfLogin);

function appendINProductShow(product){
    var div=document.createElement("div");
    var nameLable=document.createElement(("lable"));
    var desLable=document.createElement(("lable"));
    var priceLable=document.createElement(("lable"));
    var quantityLable=document.createElement(("lable"));
    var quantityYouWantLable=document.createElement("label");

    nameLable.innerText="Product Name";
    desLable.innerText="Product Description";
    priceLable.innerText="Product Price";
    quantityLable.innerText="Product Quantinty";
    quantityYouWantLable.innerText="You Want";
    
    var nameLableText=document.createElement(("input"));
    var desLableText=document.createElement(("input"));
    var priceLableText=document.createElement(("input"));
    var quantityLableText=document.createElement(("input"));
    var quantityYouWantText=document.createElement("input");
    
    nameLableText.value=product.ProductName;
   desLableText.value=product.ProductDescription;
   priceLableText.value=product.ProductPrice;
   quantityLableText.value=product.ProductQuantity;
    quantityYouWantText.value=1;

   nameLableText.setAttribute("readonly",true);
   desLableText.setAttribute("readonly",true);
   priceLableText.setAttribute("readonly",true);
   quantityLableText.setAttribute("readonly",true);
    quantityYouWantText.setAttribute("readonly",true);

   nameLableText.style.backgroundColor="white";
   desLableText.style.backgroundColor="white";
   priceLableText.style.backgroundColor="white";
   quantityLableText.style.backgroundColor="white";
   quantityYouWantText.style.backgroundColor="white";

    var addBTN=document.createElement("button");
    addBTN.innerText="+";

    var decBTN=document.createElement("button");
    decBTN.innerText="-";

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

    div.appendChild(quantityYouWantLable);
    div.appendChild(quantityYouWantText);
    quantityYouWantLable.setAttribute("class","form-label col Margin");
    quantityYouWantText.setAttribute("class","form-control col Margin");

    div.appendChild(addBTN);
    div.appendChild(decBTN);

    addBTN.setAttribute("class","btn btn-primary Margin");
   
    decBTN.setAttribute("class","btn btn-warning Margin");
   
    div.setAttribute("class","col-4");

    
 
    addBTN.addEventListener("click",function(){
      var quan=personalInformation[indexOfPersonLogin].inCart[0].value;
      if(quan>=0&&quan<quantityLableText.value){
      quan++;
      quantityYouWantText.value=quan;
      personalInformation[indexOfPersonLogin].inCart[0].value=quan;
      
      localStorage.setItem("personalInformation",JSON.stringify(personalInformation))
      }
      
    });
    decBTN.addEventListener("click",function(){
       var quan=personalInformation[indexOfPersonLogin].inCart[0].value;
       
       if(quan>0&&quan<=quantityLableText.value)
        {quan--;
        quantityYouWantText.value=quan;
        personalInformation[indexOfPersonLogin].inCart[0].value=quan;
       
        localStorage.setItem("personalInformation",JSON.stringify(personalInformation))
       }
        
    });

    ProductShow.appendChild(div);

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

