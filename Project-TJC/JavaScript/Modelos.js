// let teste = JSON.parse(localStorage.getItem('listCar'));

// function showValues() {
//     let listCar = JSON.parse(localStorage.getItem('listCar') || '[]')

//     const list = document.querySelector('#product-cards')

//     for(let i = 0; i < listCar.length; i++){

//         let $teste = listCar[i]['product-image'].split('\\')
//         console.log($teste)
//         list.innerHTML += `<div class="card">
//         <img class="car" src="./${teste[2]}" accept="/Img/image/*">
//         <h1>${listCar[i]['Nome']}</h1>
//         </div>`
//     }
// }

// showValues()

// console.log($teste, "Teste boy :(")

//     function previewImg() {
//         const imagemBase64 = localStorage.getItem('product-image');

//         if(imagemBase64) {
//             const imagem = new Image();
//             imagem.src = imagemBase64;

//             const images = document.getElementById('images')
//             images.appendChild(imagem);
//         }

//     }

//     console.log(previewImg)

// const cadastreH = document.querySelector("#cdst");
// const formProduct = document.querySelector("product-form");
//     cadastreH.addEventListener("click", function(show) {
//         show = formProduct.style.display = "block";
//     })

    function esconde(el) {
        document.getElementById(el).style.display = "none";
    }
    function mostra(el) {
        document.getElementById(el).style.display = "flex";
    }
    function toggle(el) {
        var display = document.getElementById(el).style.display;
        if(display == "none") {
            document.getElementById(el).style.display = "flex";
        }
        else {
            document.getElementById(el).style.display = "none";
        }
    }

 // Função para adicionar um novo produto
 function addProduct(name, price, imageUrl) {
    const productCards = document.getElementById("product-cards");
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    const productName = document.createElement("h2");
    productName.textContent = name;
    const productPrice = document.createElement("p");
    productPrice.textContent = `Preço: R$ ${price.toFixed(2)}`;
    const productImage = document.createElement("img");
    productImage.className = "product-img";
    productImage.src = imageUrl;
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remover";
    removeButton.addEventListener("click", function() {
        productCard.remove();
        removeProductFromLocalStorage(name);
    });
    productCard.appendChild(productName);
    productCard.appendChild(productPrice);
    productCard.appendChild(productImage);
    productCard.appendChild(removeButton);
    productCards.appendChild(productCard);

    // Salvar no LocalStorage
    saveProductToLocalStorage(name, price, imageUrl);
}

// Função para salvar um produto no LocalStorage
function saveProductToLocalStorage(name, price, imageUrl) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.push({ name, price, imageUrl });
    localStorage.setItem("products", JSON.stringify(products));
}

// Função para remover um produto do LocalStorage
function removeProductFromLocalStorage(name) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = products.filter(product => product.name !== name);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
}

// Função para carregar produtos do LocalStorage e exibir no início
function loadProductsFromLocalStorage() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.forEach(product => {
        addProduct(product.name, product.price, product.imageUrl);
    });
}

// Carregar produtos do LocalStorage ao iniciar a página
// loadProductsFromLocalStorage();

// Event listener para o envio do formulário
document.getElementById("product-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const productName = document.getElementById("product-name").value;
    const productPrice = parseFloat(document.getElementById("product-price").value);
    const productImage = document.getElementById("product-image").files[0];
    if (productName && !isNaN(productPrice) && productImage) {
        const imageUrl = URL.createObjectURL(productImage);
        addProduct(productName, productPrice, imageUrl);
        // Limpar o formulário
        document.getElementById("product-name").value = "";
        document.getElementById("product-price").value = "";
        document.getElementById("product-image").value = "";
    }
})

loadProductsFromLocalStorage();
