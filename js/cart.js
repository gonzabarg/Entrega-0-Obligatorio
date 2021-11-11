



function showProductsInCart(object) {
    
    let htmlContentToAppend = "";
    let cartData = object.articles;
    let subtotal = 0;
    
    for (let i = 0; i < cartData.length; i++) {
         let  table = cartData[i];
         let unitCost = table.unitCost;
         
         if (table.currency == "USD"){ 
             unitCost *= 40;

         }

        htmlContentToAppend += `
         <tr>
          <td class="tableImageContainer">
            <img src= "${table.src}" class="tableImage"></img>
          </td>
          <td>
            <p>${table.name}</p>
          </td> 
          <td>
            ${table.currency}
            ${table.unitCost}
          </td>
          <td>
            <input type= "number" value= "${table.count}">
          </td>
          <td>
            ${table.currency}
            ${table.unitCost * table.count}
          </td>

        `
        subtotal += getTotalProductCost(unitCost, table.count);
    };
    
    document.getElementById("tableBody").innerHTML += htmlContentToAppend;
    getSubtotal(subtotal);
};

{/* <div class="border border-gainsboro p-3 mt-3 clearfix item">
<div class="text-lg-left">
  <i class="fa fa-ticket fa-2x text-center" aria-hidden="true"></i>
</div>
<div class="col-lg-5 col-5 text-lg-left">
  <h3 class="h6 mb-0"><img src= "${table.src}></img>
    <small>${table.unitCost}</small>
  </h3>
</div>
<div class="product-price d-none">50</div>
<div class="pass-quantity col-lg-3 col-md-4 col-sm-3">
  <label for="pass-quantity" class="pass-quantity">Quantity</label>
  <input class="form-control" type="number" value="${table.count}" min="1">
</div>
<div class="col-lg-2 col-md-1 col-sm-2 product-line-price pt-4">
  <span class="product-line-price">${table.unitCost*table.count}
  </span>
</div>
<div class="remove-item pt-4">
  <button class="remove-product btn-light">
    Delete
  </button>
</div>
</div> */}


function getTotalProductCost (x,y) {
    return x*y;
};

function getSubtotal(x) {

    let htmlContentToAppend = "";

    htmlContentToAppend = `<td id="subtotal" colspan="5"><b>Subtotal</b> 
    UYU
    ${x}
    </td>`;

   document.getElementById("subtotalRow").innerHTML += htmlContentToAppend;
};





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
    

     
});

