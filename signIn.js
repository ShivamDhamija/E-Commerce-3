var sign=document.getElementById("signIn");
var signPassword=document.getElementById("signPassword");
var signEmail=document.getElementById("signEmail");
var signNumber=document.getElementById("signNumber");

var personalInformation;

var no=0;

var adminInformation={
    email:"shivam@gmail.com",
    password:"shivam",
    number:"0123456789",
    no:0
}
personalInformation= getPersonalInformationFromStorage()
if(personalInformation.length==0){
savePersonalInformationToStorage(adminInformation);

}
personalInformation= getPersonalInformationFromStorage()
console.log(personalInformation);

sign.addEventListener("click",function(event){
  no++;
    event.preventDefault();
    var personalInfo={
        email:signEmail.value,
        password:signPassword.value,
        number:signNumber.value,
        no:no,
        inCart:[]
    }
   // console.log(signNumber.value);
   // console.log(signEmail.value);
   // console.log(signPassword.value);
  
    console.log(personalInfo);
    savePersonalInformationToStorage(personalInfo);

    resetFormValue();
})
function resetFormValue(){
    signPassword.value="";
    signEmail.value="";
    signNumber.value="";
}




function savePersonalInformationToStorage(personalInfo)
{
  let personalInformation =  getPersonalInformationFromStorage();

  personalInformation.push(personalInfo)

  localStorage.setItem("personalInformation",JSON.stringify(personalInformation))
}

function getPersonalInformationFromStorage()
{
  var personalInformation = localStorage.getItem("personalInformation");

  return personalInformation ? JSON.parse(personalInformation) : [];
}