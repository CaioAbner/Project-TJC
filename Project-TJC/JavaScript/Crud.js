// selecionar e alocar os itens do localstorage:
var usuario = localStorage.getItem('userLogado')
var logado = localStorage.getItem('listaUser')
logado = JSON.parse(logado)
console.log(usuario)

for(var i = 0; i < logado.length ; i++){
    console.log(logado[i].nomeCad)
    console.log(logado[i].userCad )
    console.log(logado[i].senhaCad)

   document.getElementById('tbody').innerHTML += `<tr><td>${logado[i].nomeCad}</td><td>${logado[i].userCad}</td><td>${logado[i].senhaCad}</td></tr>`
}
// selecionar o elemento que ira aparecer:
document.getElementById('userLogado').textContent = "";

// apagar o user
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
    sNome.value = itens[index].nome
    sUsuario.value = itens[index].funcao
    sSenha.value = itens[index].salario
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
    <td>${item.nome}</td>
    <td>${item.usuario}</td>
    <td>R$ ${item.sSenha}</td>
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
    itens[id].nome = sNome.value
    itens[id].usuario = sUsuario.value
    itens[id].senha = sSenha.value
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
