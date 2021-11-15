
function showProductsInCart(object) {
    
    let htmlContentToAppend = "";
    let cartData = object.articles;
    let subtotal = 0;


    
    for (let i = 0; i < cartData.length; i++) {
         let  table = cartData[i];
         let unitCost = table.unitCost;
         let prodCount = table.count;
         
         if (table.currency == "USD"){ 
             unitCost *= 40;
             table.currency = "UYU";
         }

         

        htmlContentToAppend += `
         <tr class="table-row">
          <td class="tableImageContainer">
            <img src= "${table.src}" class="tableImage"></img>
          </td>
          <td>
            <p>${table.name}</p>
          </td> 
          <td class="item-price">
            ${table.currency}
            ${unitCost}
          </td>
          <td id= "countInputCell">
            <input type="number" class="prodCountInput" id="prodCount`+[i+1]+`" value="${prodCount}">
          </td>
          <td class="item-total-cost">
            ${table.currency}
            ${unitCost*prodCount}
          </td>
          <td>
            <button class="removeArticleBtn">
              <span class="fa fa-trash"></span> 
            </button>
          </td>

        `
        subtotal += getTotalProductCost(unitCost, prodCount);
        console.log(prodCount);
    };
    
    document.getElementById("tableBody").innerHTML += htmlContentToAppend;
    getSubtotal(subtotal);
    
};




function getTotalProductCost (x,y) {
    return x*y;
};

function getSubtotal(x) {

    let htmlContentToAppend = "";

    htmlContentToAppend = `<td id="subtotal" colspan="6"><b>Subtotal</b> 
    UYU
    ${x}
    </td>`;

   document.getElementById("subtotalRow").innerHTML += htmlContentToAppend;
};


// OJO CON ESTO

function updateCartTotal() {
  let cartItemsContainer = document.getElementById("tableBody");

  let cartRows = cartItemsContainer.getElementsByClassName("table-row");
  console.log(cartRows);
  let total = 0;


  for (let i = 0; i < cartRows.length; i++) {

    let cartRow = cartRows[i];
    let itemPrice = cartRow.getElementsByClassName("item-total-cost")[0];
    let itemQuantity = cartRow.getElementById("prodCount ${i+1}");

    let price = parseFloat(itemPrice.innerHTML.replace('UYU', ''));
    let  quantity = itemQuantity.value;


    total += (price*quantity);

  }

  getSubtotal(total);

};

function quantityChanged(event){

  var input = event.target;

  if (isNaN(input.value) || input.value <= 0 ){

    input.value = 1;
  } 

  updateCartTotal();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){


    getJSONData(CART_INFO_URL_2).then(function(resultObj){
        if (resultObj.status == "ok") {
            cartData = resultObj.data;
    
            showProductsInCart(cartData);
         }
    });

    var prodCountInputs = document.getElementsByClassName("prodCountInput");

    for (let i = 0; i < prodCountInputs.length; i++) {

      var input = prodCountInputs[i];

      input.addEventListener('change', quantityChanged);
    }
    // var removeArticleBtns = document.getElementsByClassName("removeArticleBtn");

    // console.log(removeArticleBtns);

    // for (let i = 0; i < removeArticleBtns.length; i++) {

    //   var btn = removeArticleBtns[i];

    //   btn.addEventListener('click', function(e){
    //     var btnClicked = e.target;

    //     btnClicked.parentElement.parentElement.remove();

    //   })
    // }



    
     
});

