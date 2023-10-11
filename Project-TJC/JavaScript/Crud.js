
var tbody  = document.getElementById('tbody')
var listaUse = JSON.parse(localStorage.getItem('listaUser'));
// tbody.deleteRow(1);

tbody.innerHTML = '';

listaUse.forEach((item, index) => { //criando uma linha pra cada pessoa 

    var tr = document.createElement('tr');

    
    tr.innerHTML = `<td>${item.nomeCad}</td>
                    <td>${item.userCad}</td>
                        <td>${item.senhaCad}</td>
                        
                        <td>
                        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
                        <td class="acao">
                        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
                    </td>`;

    tbody.appendChild(tr); //appendChild pra adicionar a linha
});

//remover um usuário
function deleteItem(index) {
    var tr = document.createElement('tr');
    var confirmar = confirm('Tem certeza de que deseja remover este usuário?');

    if (confirmar) {
        listaUse.splice(index, 3); // remove da lista
        localStorage.setItem('listaUser', JSON.stringify(listaUse)); // muda o localStorage
        // location.reload(); // recarrega
        tbody.deleteRow(index);
        localStorage.removeItem(listaUse[index])
}
}

// editar usuario
// Array de exemplo
const meuArray = localStorage.getItem('listaUser')
const arrayDisplay = document.getElementById("userLogado");
const editButton = document.getElementById("editButton");
// Função para atualizar a exibição do array
function atualizarArray() {
    arrayDisplay.textContent = meuArray.join(", "); // Exibe o array como uma string separada por vírgulas
}

// Função que será chamada quando o botão for clicado
function editItem() {
    const indice = prompt("Digite o índice do elemento a ser editado:");
    const novoValor = prompt("Digite o novo valor:");

    if (indice !== null && novoValor !== (",")) {
        const indiceNum = parseInt(indice);
        if (!isNaN(indiceNum) && indiceNum >= 0 && indiceNum < meuArray.length) {
            const array = JSON.parse(meuArray)
            array[indiceNum].senhaCad = novoValor;
            var a = array
            localStorage.removeItem('listaUser')
            localStorage.setItem('listaUser', JSON.stringify(array))
            atualizarArray();
        } else {
            alert("Índice inválido. Certifique-se de fornecer um índice válido.");
        }
    }
}

// Adicionar um ouvinte de evento ao botão para chamar a função de edição
editButton.addEventListener("click", editItem);

// Inicialmente, exiba o array
atualizarArray();
