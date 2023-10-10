// Função para adicionar um novo produto
function addProduct(name, imageUrl) {
    const productCards = document.getElementById("product-cards");
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    const productName = document.createElement("h2");
    productName.textContent = name;
    const productImage = document.createElement("img");
    productImage.className = "product-img";
    productImage.src = imageUrl;
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remover";
    removeButton.addEventListener("click", function() {
        productCard.remove();
    });
    productCard.appendChild(productName);
    productCard.appendChild(productImage);
    productCard.appendChild(removeButton);
    productCards.appendChild(productCard);
}

// Event listener para o envio do formulário
document.getElementById("product-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const productName = document.getElementById("product-name").value;
    const productImage = document.getElementById("product-image").files[0];
    if (productName && productImage) {
        const imageUrl = URL.createObjectURL(productImage);
        addProduct(productName, imageUrl);
        // Limpar o formulário
        document.getElementById("product-name").value = "";
        document.getElementById("product-image").value = "";
    }
});