
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


// crud novo

const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sUsuario = document.querySelector('#m-usuario')
const sSenha = document.querySelector('#m-senha')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nomeCad
    sUsuario.value = itens[index].userCad
    sSenha.value = itens[index].senhaCad
    id = index
  } else {
    sNome.value = ''
    sUsuario.value = ''
    sSenha.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nomeCad}</td>
    <td>${item.userCad}</td>
    <td> ${item.senhaCad}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sUsuario.value == '' || sSenha.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nomeCad = sNome.value
    itens[id].userCad = sUsuario.value
    itens[id].senhaCad = sSenha.value
  } else {
    itens.push({'nome': sNome.value, 'usuario': sUsuario.value, 'senha': sSenha.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('listaUser')) 
const setItensBD = () => localStorage.setItem('listaUser', JSON.stringify(itens))

loadItens()
