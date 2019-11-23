
var aAddProduct = document.getElementById("aAddProduct");
var divAddProduct = document.getElementById("divAddProduct");
var divListProduct = document.getElementById("divListProduct");
var divUpdateProduct = document.getElementById("divUpdateProduct");

aAddProduct.addEventListener("click", function (event) {
    createNewProductPanel();
});

function createNewProductPanel() {
    document.getElementById("democlass").innerHTML="Enter Product Details"
    hideaAddProduct();
    var div =  document.createElement("div");
    var txtProductName = document.createElement("input");
    txtProductName.setAttribute("type", "text");
    txtProductName.setAttribute("id", "productname");
    txtProductName.setAttribute("name", "productname");
    txtProductName.setAttribute("placeholder", "Enter Product Name");
    txtProductName.setAttribute("style", "width:250px");
    txtProductName.setAttribute("required","");
    txtProductName.setAttribute('class', 'form-control');
    div.appendChild(txtProductName);

    insertBlankLine(div);

    var txtProductDesc = document.createElement("input");
    txtProductDesc.setAttribute("type", "text");
    txtProductDesc.setAttribute("id", "productdesc");
    txtProductDesc.setAttribute("name", "productdesc");
    txtProductDesc.setAttribute("placeholder", "Enter Product Description");
    txtProductDesc.setAttribute("style", "width:250px;");
    txtProductDesc.setAttribute("required","");
    txtProductDesc.setAttribute('class', 'form-control');
    div.appendChild(txtProductDesc);

    insertBlankLine(div);

    var txtProductPrice = document.createElement("input");
    txtProductPrice.setAttribute("type", "number");
    txtProductPrice.setAttribute("id", "productprice");
    txtProductPrice.setAttribute("name", "productprice");
    txtProductPrice.setAttribute("placeholder", "Enter Product Price");
    txtProductPrice.setAttribute("style", "width:250px");
    txtProductPrice.setAttribute("required","");
    txtProductPrice.setAttribute('class', 'form-control');
    div.appendChild(txtProductPrice);

    insertBlankLine(div);

    var txtProductQty = document.createElement("input");
    txtProductQty.setAttribute("type", "input");
    txtProductQty.setAttribute("id", "productqty");
    txtProductQty.setAttribute("name", "productqty");
    txtProductQty.setAttribute("placeholder", "Enter Product Quantity");
    txtProductQty.setAttribute("style", "width:250px");
    txtProductQty.setAttribute("required","");
    txtProductQty.setAttribute('class', 'form-control');
    div.appendChild(txtProductQty);

    insertBlankLine(div);

    var txtProductValid = document.createElement("input");
    txtProductValid.setAttribute("type", "input");
    txtProductValid.setAttribute("id", "productvalid");
    txtProductValid.setAttribute("name", "productvalid");
    txtProductValid.setAttribute("placeholder", "Enter Product Quantity");
    txtProductValid.setAttribute("style", "width:250px");
    txtProductValid.setAttribute("required","");
    txtProductValid.setAttribute('class', 'form-control');
    div.appendChild(txtProductValid);

    insertBlankLine(div);

    var txtProductQty = document.createElement("input");
    txtProductQty.setAttribute("type", "number");
    txtProductQty.setAttribute("id", "productqty");
    txtProductQty.setAttribute("name", "productqty");
    txtProductQty.setAttribute("placeholder", "Enter Product Quantity");
    txtProductQty.setAttribute("style", "width:250px");
    txtProductQty.setAttribute("required","");
    txtProductQty.setAttribute('class', 'form-control');
    div.appendChild(txtProductQty);

    insertBlankLine(div);
  

    var btnSubmitButton = document.createElement("input");
    btnSubmitButton.setAttribute("type", "submit");
    btnSubmitButton.setAttribute("value","Add")
    btnSubmitButton.setAttribute("id", "btnsubmitbutton");
    btnSubmitButton.setAttribute("style", "margin-right:10px");
    btnSubmitButton.setAttribute("class","btn btn-success");
    div.appendChild(btnSubmitButton);


    var btnCancelButton = document.createElement("button");
    btnCancelButton.setAttribute("type", "submit");
    btnCancelButton.setAttribute("id", "btncancelbutton");
    btnCancelButton.setAttribute("class","btn btn-danger");
    btnCancelButton.innerHTML = "Cancel";
    div.appendChild(btnCancelButton);

    divAddProduct.appendChild(div);    

    btnCancelButton.addEventListener("click", function (event) {
            getProductLink();
            document.getElementById("democlass").innerHTML=""
            divAddProduct.removeChild(div);
           
        });
}


var edit_btn=document.getElementsByClassName("editBtn");

for(let i=0;i<edit_btn.length;i++)
    {
        edit_btn[i].onclick=function(e)
        { 
            $.ajax({
                type:"GET",
                url:"/checkEdit",
                success: function(data){
                    document.getElementById("democlass").innerHTML="Enter Product Details"
                    if(divAddProduct.childElementCount!=0){
                        divAddProduct.removeChild(divAddProduct.childNodes[0]); 
                    }
                    if(divUpdateProduct.childElementCount!=0)
                    {
                        divUpdateProduct.removeChild(divUpdateProduct.childNodes[0]);
                    }
        
                        createAgainProductPanel(e);
                },
                error: function(data){
                   window.stop();
                }
            })
            
        }

    }

function createAgainProductPanel(e) 
{
    console.log(e.target.parentNode.id);
    var pid=e.target.parentNode.id;
    hideaAddProduct();
    var div =  document.createElement("div");
    pname=e.target.parentNode.children[1].innerHTML;
    pdesc=e.target.parentNode.children[4].innerHTML;
    pprice=e.target.parentNode.children[7].innerHTML;
    pqty=e.target.parentNode.children[10].innerHTML;

    var txtProductName = document.createElement("input");
    txtProductName.setAttribute("type", "text");
    txtProductName.setAttribute("id", "productname");
    txtProductName.setAttribute("name", "productname");
    txtProductName.setAttribute("placeholder", "Enter Product Name");
    txtProductName.setAttribute("style", "width:250px");
    txtProductName.setAttribute('value',pname);
    txtProductName.setAttribute("required","");
    txtProductName.setAttribute('class', 'form-control');
    div.appendChild(txtProductName);

    insertBlankLine(div);


    var txtProductDesc = document.createElement("textarea");
    txtProductDesc.setAttribute("type", "text");
    txtProductDesc.setAttribute("id", "productdesc");
    txtProductDesc.setAttribute("name", "productdesc");
    txtProductDesc.setAttribute("placeholder", "Enter Product Description");
    txtProductDesc.setAttribute("style", "width:250px;height:50px");
    txtProductDesc.setAttribute("required","");
    txtProductDesc.setAttribute('class', 'form-control');
    var data = document.createTextNode(pdesc);
    txtProductDesc.appendChild(data);
    div.appendChild(txtProductDesc);

    insertBlankLine(div);


    var txtProductPrice = document.createElement("input");
    txtProductPrice.setAttribute("type", "number");
    txtProductPrice.setAttribute("id", "productprice");
    txtProductPrice.setAttribute("name", "productprice");
    txtProductPrice.setAttribute("placeholder", "Enter Product Price");
    txtProductPrice.setAttribute("style", "width:250px");
    txtProductPrice.setAttribute("value", pprice);
    txtProductPrice.setAttribute("required","");
    txtProductPrice.setAttribute('class', 'form-control');
    div.appendChild(txtProductPrice);


    insertBlankLine(div);

    var txtProductQty = document.createElement("input");
    txtProductQty.setAttribute("type", "number");
    txtProductQty.setAttribute("id", "productqty");
    txtProductQty.setAttribute("name", "productqty");
    txtProductQty.setAttribute("placeholder", "Enter Product Quantity");
    txtProductQty.setAttribute("style", "width:250px");
    txtProductQty.setAttribute("value", pqty);
    txtProductQty.setAttribute("required","");
    txtProductQty.setAttribute('class', 'form-control');
    div.appendChild(txtProductQty);

    insertBlankLine(div);

    var btnSubmitButton = document.createElement("input");
    btnSubmitButton.setAttribute("type", "submit");
    btnSubmitButton.setAttribute("value","Update");
    btnSubmitButton.setAttribute("id", "btnsubmitbutton");
    btnSubmitButton.setAttribute("style", "margin-right:10px");
    btnSubmitButton.setAttribute("class","btn btn-success")
    div.appendChild(btnSubmitButton);

    var btnCancelButton = document.createElement("button");
    btnCancelButton.setAttribute("type", "submit");
    btnCancelButton.setAttribute("id", "btncancelbutton");
    btnCancelButton.setAttribute("class","btn btn-danger")
    btnCancelButton.innerHTML = "Cancel";
    div.appendChild(btnCancelButton);

    divUpdateProduct.appendChild(div);

    btnSubmitButton.addEventListener("click",function(event){

        var pn = document.getElementById("productname").value;
        var pd = document.getElementById("productdesc").value;
        var pp = document.getElementById("productprice").value;
        var pq = document.getElementById("productqty").value;
        
        console.log(pp)
        $.ajax({
            type: 'POST',
            url: "/updateProduct/"+pid,
            data: {
                Name:pn,
                Desc:pd,
                Price:pp,
                Quantity:pq,
            },
            success: function (data) {
                // alert(data);
                window.stop();
            },
            error: function (data, status, er) {
                // alert("error: " + data + " status: " + status + " er:" + er);
                alert("Enter valid values");
                event.preventDefault();
            }
        });
    });

    btnCancelButton.addEventListener("click", function (event) {
        getProductLink();
        document.getElementById("democlass").innerHTML="";
        divUpdateProduct.removeChild(div);
    });

}

function getProductLink() {
    unhideaAddProduct();
}

function addProductToList(objProduct) {
    var result = document.createElement("div");
    result.setAttribute("id", objProduct.Id);
    var editList = document.createElement("button");
    editList.innerHTML = "Edit";
    editList.setAttribute("style","margin-right:10px");

    var deleteList = document.createElement("button");
    deleteList.innerHTML = "Delete";


    var str = "Product name : " + objProduct.Name + "<br>Description : " + objProduct.Desc  + "<br>Price : Rs " + objProduct.Price + "<br>Quantity : " + objProduct.Quantity+ "<br>";

 
    product.innerHTML=str;


    
    result.appendChild(product);


    result.appendChild(editList);
    result.appendChild(deleteList);
    divListProduct.appendChild(result);



        
    function findIndex( id )
    {
        for(var i=0;i<products.length;i++)
            {
                if(products[i].Id == id)
                {
                    return i;
                }
            }
    }

    editList.addEventListener("click", function (event) {

        if(divAddProduct.childElementCount!=0)
           divAddProduct.removeChild(divAddProduct.childNodes[0]);

        updateProductPanel(result.id);
        var id = result.id;
        console.log(id);

        for(var i=0;i<products.length;i++)
        {
            if(id==products[i].Id)
            {
                document.getElementById("productname").value = products[i].Name;
                document.getElementById("productdesc").value = products[i].Desc;
                document.getElementById("productprice").value = products[i].Price;
                document.getElementById("productqty").value = products[i].Quantity;
            }
        }


       storeProducts();
        // divListProduct.removeChild(result);
    });

}






function updateProductPanel(id) {
    if(divAddProduct.childElementCount!=0)
        divAddProduct.removeChild(divAddProduct.childNodes[0]); 
    console.log("child element "+divAddProduct.childElementCount)
    console.log(id);
    hideaAddProduct();
    var div = document.createElement("div");

    var txtProductName = document.createElement("input");
    txtProductName.setAttribute("type", "text");
    txtProductName.setAttribute("id", "productname");
    txtProductName.setAttribute("placeholder", "Enter Product Name");
    txtProductName.setAttribute("style", "width:250px");
    div.appendChild(txtProductName);


    insertBlankLine(div);
    insertBlankLine(div);

    var txtProductDesc = document.createElement("textarea");
    txtProductDesc.setAttribute("type", "text");
    txtProductDesc.setAttribute("id", "productdesc");
    txtProductDesc.setAttribute("placeholder", "Enter Product Description");
    txtProductDesc.setAttribute("style", "width:250px;height:50px");
    div.appendChild(txtProductDesc);


    insertBlankLine(div);
    insertBlankLine(div);

    var txtProductPrice = document.createElement("input");
    txtProductPrice.setAttribute("type", "number");
    txtProductPrice.setAttribute("id", "productprice");
    txtProductPrice.setAttribute("placeholder", "Enter Product Price");
    txtProductPrice.setAttribute("style", "width:250px");
    div.appendChild(txtProductPrice);

    insertBlankLine(div);
    insertBlankLine(div);

    var txtProductQty = document.createElement("input");
    txtProductQty.setAttribute("type", "text");
    txtProductQty.setAttribute("id", "productqty");
    txtProductQty.setAttribute("placeholder", "Enter ProductQty");
    txtProductQty.setAttribute("style", "width:250px");
    div.appendChild(txtProductQty);

    insertBlankLine(div);
    insertBlankLine(div);

    var btnUpdateButton = document.createElement("button");
    btnUpdateButton.setAttribute("type", "submit");
    btnUpdateButton.setAttribute("id", "btnupdatebutton");
    btnUpdateButton.innerHTML = "Update";

    btnUpdateButton.setAttribute("style", "margin-right:10px");
    div.appendChild(btnUpdateButton);
    divAddProduct.appendChild(div); 


    btnUpdateButton.addEventListener("click", function (event) {
        
        var productObj = new Object();

        productObj.Id = parseInt(id);
        productObj.Name = document.getElementById("productname").value;
        productObj.Desc = document.getElementById("productdesc").value;
        productObj.Price = document.getElementById("productprice").value;
        productObj.Quantity = document.getElementById("productqty").value;
        console.log(productObj);

        for(var i=0;i<products.length;i++)
        {
            if(products[i].Id == productObj.Id)
            {
                products[i] = productObj;
            }
        }

        storeProducts();
        replaceProductInDOM(productObj);
        
        divAddProduct.removeChild(div);
    });


}

// function deleteList(e) {
//     var parentNode = e.target.parentNode;
//     var index = findIndex(parseInt(parentNode.id))
//     console.log(products);
//     products.splice(index,1);

//     divListProduct.removeChild(parentNode);

// };



function replaceProductInDOM(productObj) {
    var str = "Product name : " + productObj.Name + "<br>Description : " + productObj.Desc + "<br>Price : Rs " + productObj.Price + "<br>Quantity : " + productObj.Quantity+ "<br>";
    var divRow = document.createElement("div");
    console.log("This is working");
    divRow.setAttribute("id", productObj.Id);
    var product = document.createElement("p");
    product.innerHTML = str;
    divRow.appendChild(product);


    var editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    // editBtn.setAttribute("style", "margin-left: 20px");

    var deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.setAttribute("style", "margin-left: 10px");

    divRow.appendChild(editBtn);
    divRow.appendChild(deleteBtn);
    console.log("Lost id:- "+productObj.Id);
    console.log(divRow.innerHTML)
    var temp;
    for(var i=0;i<divListProduct.childElementCount;i++)
        if(productObj.Id==divListProduct.childNodes[i].id)
            temp = i;
    console.log(temp);
    divListProduct.replaceChild(divRow, divListProduct.childNodes[temp]);


    editBtn.addEventListener("click", function (event) {
        updateProductPanel(productObj.Id);
        var id = productObj.Id;
        console.log(id);
        for(var i=0;i<products.length;i++)
        {
            if(id==products[i].Id)
            {
                document.getElementById("productname").value = products[i].Name;
                document.getElementById("productdesc").value = products[i].Desc;
                document.getElementById("productprice").value = products[i].Price;
                document.getElementById("productqty").value = products[i].Quantity;
            }
        }

    });

    deleteBtn.addEventListener("click", function (event) {
        var id = productObj.id;
        console.log(products);
        products.splice(id,1);

        divListProduct.removeChild(divRow);
        // deleteFromProduct(e);
    });

}


function clear(id) {
    document.getElementById(id).innerHTML = "";
}

function insertBlankLine(target) {
    var br = document.createElement("br");
    target.appendChild(br);
}

function unhideaAddProduct() {
    aAddProduct.setAttribute("style", "visibility:visible");
}


function hideaAddProduct() {
    aAddProduct.setAttribute("style", "visibility:hidden");
}