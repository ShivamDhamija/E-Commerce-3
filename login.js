var login=document.getElementById("logIn");
var loginPassword=document.getElementById("loginPassword");
var loginEmail=document.getElementById("loginEmail");

var personalInformation


login.addEventListener("click",function(event){

    event.preventDefault();
    personalInformation= getPersonalInformationFromStorage();
   console.log(personalInformation);
    var password=loginPassword.value;
    var email=loginEmail.value;
    
    console.log(password);
    console.log(email);
    var ind=personalInformation.filter(function(e){
        if(e.password==password&&e.email===email)
        {
          return e;
        }
      }) ;
      var inde = personalInformation.indexOf(ind[0]);
      console.log(inde);
     //goToAdminPage 
      if(inde===0)
      {
        login.setAttribute("data-bs-toggle","");
        login.setAttribute("data-bs-target","");
        window.location.href="admin.html";
      }
      //goToCustomerPage
      if(inde>0)
      {
        console.log(ind[0].no);
        localStorage.setItem("loginNo",ind[0].no);
        login.setAttribute("data-bs-toggle","");
        login.setAttribute("data-bs-target","");
        window.location.href="customer.html";
      }
      //sendMessageWrongInfo 
     if(inde<0)
     {login.setAttribute("data-bs-toggle","modal")
    login.setAttribute("data-bs-target","#exampleModal");
    resetFormValue();}
})
function resetFormValue(){
    loginPassword.value="";
    loginEmail.value="";
}

function getPersonalInformationFromStorage()
{
  var personalInformation = localStorage.getItem("personalInformation");

  return personalInformation ? JSON.parse(personalInformation) : [];
}