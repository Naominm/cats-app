const catFact=document.getElementById("cat-fact");
const catPic=document.getElementById("cat-pic");
const catElement=document.getElementById("result");
const buttonFact=document.getElementById("fact")
const buttonImage=document.getElementById("image");
const imageContainer=document.querySelector(".bottom-container")
const errorElement=document.querySelector("#error-box")
const loader=document.querySelector(".loader")

const message=`An error occurred please try again later`

 function showLoader(){
    loader.style.display="flex";
    
 }

 function hideLoader(){
    loader.style.display="none";
 }


async function getCatFacts(){
 
    showLoader();
  try {
    let numFacts = catFact.value || 1; 

    if (numFacts > 50) {
        numFacts = 50; 
    }
  
   
    const response=await fetch(`https://meowfacts.herokuapp.com/?count=${numFacts}`);
    const data=await response.json();
    if(!response.ok){
       throw new Error("Failed to fetch cat facts. Please try again later.");
    }

    let facts = Array.isArray(data.data) ? data.data : [data.data];
   const factList=document.createElement("ol");
       factList.style.paddingLeft = "10rem"; 

       facts.forEach((fact) => {
           const listItem = document.createElement("li");
           listItem.style.lineHeight = "2.2rem";
           listItem.style.fontSize = "1.3rem";
           listItem.textContent = fact;
           factList.appendChild(listItem);
       });
    catElement.appendChild(factList);
    
  } catch (error) {
      errorElement.classList.add("error-box");
    errorElement.innerHTML=`<p class="error-message">${message}</p>`
  }finally{
    hideLoader();
  }
     
    }
   



async function getCatImages(){
  imageContainer.innerHTML="";
    showLoader();

   try {
    let numImages = catPic.value || 1; 

    if (numImages > 10) {
        numImages = 10; 
    }
    
    const response=await fetch(`https://api.thecatapi.com/v1/images/search?limit=${numImages}`);
    const data=await response.json();
    let loadedImages=0;
    data.forEach((cat) => {
      Image.onload=()=>{
        loadedImages++;
        if(loadedImages==numImages){
          hideLoader();
        }
      }
    const img=document.createElement("img");
    img.src=cat.url ;
    img.alt="A cat";   
    img.style.width = "19rem";
    img.style.margin = "0.5rem";
    imageContainer.appendChild(img);
});
    
   } catch (error) {
      errorElement.classList.add("error-box");
    errorElement.innerHTML=`<p class="error-message">${message}</p>`
   
   }finally{
    hideLoader();
   }
}


buttonFact.addEventListener("click", getCatFacts);

buttonImage.addEventListener("click", getCatImages);