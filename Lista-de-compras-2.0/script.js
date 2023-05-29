const modalPesq = document.querySelector('.modal-pesquisa')
const modalIncluir = document.querySelector('.modal-incluir')
const modalEditar = document.querySelector('.modal-editar')
const texto = document.querySelector('.texto')
const display = document.querySelector('.display')
const btnIncluir = document.querySelector('.btn-incluir')
const textoPesq = document.querySelector('.texto-pesq')
let items = []
let itemDigitado = ''
let pesquisado = ''

let indexEdit = ''

let descricao = document.querySelector('.nome-item')
let quantidade = document.querySelector('.qtde-item')
let preco = document.querySelector('.preco-item')
let nomeEdit = document.querySelector(".nome-edit")
let qtdeEdit = document.querySelector(".qtde-edit")
let precoEdit = document.querySelector(".preco-edit")
mostraTodos()

function incluir(){
	if(descricao.value === ''){
		alert('O campo descrição não pode ficar em branco!')
	}else{
		itemDigitado = {
	    descricaoX: descricao.value,
	    quantidadeX: quantidade.value,
	    precoX: preco.value 
	  }
	  console.log(itemDigitado)

	  items.push(itemDigitado)
		descricao.value = ''
	  quantidade.value = ''
	  preco.value = ''
	  modalIncluir.style.display = 'none'

	  localStorage.setItem("compras", JSON.stringify(items))
		mostraTodos()
	}
}

function apagar(e){
	items = JSON.parse(localStorage.compras)
	console.log(e.parentElement.parentElement.id)
    items.splice(e.parentElement.parentElement.id, 1)
    localStorage.setItem("compras", JSON.stringify(items))
    mostraTodos()	
}

let digitado = ''
let itemCorte = ''
let encontrados = 0

function mostraPesquisa(){
	modalPesq.style.display = 'flex'
}

function mostraIncluir() {
	modalIncluir.style.display = 'flex'
}

function mostraEditar(e) {
	indexEdit = e.parentElement.parentElement.id
	modalEditar.style.display = 'flex'
  nomeEdit.value = items[e.parentElement.parentElement.id].descricaoX
  qtdeEdit.value = items[e.parentElement.parentElement.id].quantidadeX
  precoEdit.value = items[e.parentElement.parentElement.id].precoX
}

function pesquisar(){
	if(textoPesq.value === ''){
		alert('Digite o nome do item a ser pesquisado!')
	}else{
		modalPesq.style.display = 'none'
		items = JSON.parse(localStorage.compras)
		display.innerHTML = ''
		for (let i = 0; i < items.length; i++) {
			digitado = textoPesq.value
			itemCorte = items[i].descricaoX.slice(0, digitado.length)
			if(digitado === itemCorte){
			  let tr = document.createElement("tr")
		    tr.setAttribute("id", i)
		    tr.innerHTML += `
            <td class="descricao">${items[i].descricaoX}</td>
            <td class="quantidade">${items[i].quantidadeX}</td>
            <td class="preco">${items[i].precoX}</td>
            <td>
              <button onclick="mostraEditar(this)"><i class="fas fa-edit"></i></button>
              <button onclick="apagar(this)"><i class="fas fa-trash"></i></button>
            </td>
		    `
		display.appendChild(tr)
                encontrados++
			}
		}
		if(encontrados === 0){alert('item não encontrado!')}
		encontrados = 0
    }
}

function fechaModal(janela){
	switch(janela){
	case 'p':
		modalPesq.style.display = 'none'
		break
	case 'e':
		modalEditar.style.display = 'none'
		break
	case 'i':
		modalIncluir.style.display = 'none'
	}
}

function mostraTodos(){
	items = JSON.parse(localStorage.compras)
	display.innerHTML = ''

	for (let i = 0; i < items.length; i++){
		let tr = document.createElement("tr")
		tr.setAttribute("id", i)
		tr.innerHTML += `
            <td class="descricao">${items[i].descricaoX}</td>
            <td class="quantidade">${items[i].quantidadeX}</td>
            <td class="preco">${items[i].precoX}</td>
            <td>
              <button onclick="mostraEditar(this)"><i class="fas fa-edit"></i></button>
              <button onclick="apagar(this)"><i class="fas fa-trash"></i></button>
            </td>
		`
		display.appendChild(tr)
		tr.addEventListener('click', ()=>{
			if(tr.classList.contains('line-through')){
				tr.classList.remove('line-through')
				console.log("line-trhough")
			}else{
				console.log('no')
				tr.classList.add('line-through')
			}
		})
	}
}

function apagaTodos(){
	let confirmar = prompt('Isso ira apagar todos os registros! Digite confirmar para prosseguir.')
	if(confirmar === 'confirmar'){
		items = []
		localStorage.setItem("compras", JSON.stringify(items))
		display.innerHTML = ''
		alert('Todos os registros foram apagados!')
	}else{
		alert('A ação não foi executada!')
	}
}

function gravaEditado(e){
	console.log(indexEdit)
  items[indexEdit].descricaoX = nomeEdit.value
  items[indexEdit].quantidadeX = qtdeEdit.value
  items[indexEdit].precoX = precoEdit.value
  modalEditar.style.display = 'none'
  localStorage.setItem("compras", JSON.stringify(items))
  mostraTodos()
}
