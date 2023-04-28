const texto = document.querySelector('.texto')
const display = document.querySelector('.display')
let items = []
let itemDigitado = ''
let pesquisado = ''
let editado = false
let indexEdit = ''

mostraTodos()

function incluir(){
	if(texto.value === ''){
		alert('Escreva a tarefa antes de clicar nesse botão!')
	}else{
		if(editado === true){
	        itemDigitado = texto.value
	        items[indexEdit] = itemDigitado
	        texto.value = ''
		}else{
			itemDigitado = texto.value
			items.push(itemDigitado)
			texto.value = ''
	    }
	    editado = false
	    localStorage.setItem("tarefas", JSON.stringify(items))
		mostraTodos()
    }
}

function apagar(e){
	items = JSON.parse(localStorage.tarefas)
	console.log(e.parentElement.parentElement.id)
    items.splice(e.parentElement.parentElement.id, 1)
    localStorage.setItem("tarefas", JSON.stringify(items))
    mostraTodos()	
}

let digitado = ''
let itemCorte = ''
let encontrados = 0
function pesquisar(){
	if(texto.value === ''){
		alert('Digite uma tarefa ou um trecho a ser pesquisado!')
	}else{
		items = JSON.parse(localStorage.tarefas)
		display.innerHTML = ''
		for (let i = 0; i < items.length; i++) {
			digitado = texto.value
			itemCorte = items[i].slice(0, digitado.length)
			if(digitado === itemCorte){
				display.innerHTML += `
				    <div class="item">
				        ${items[i]}
				        <div>
				          <button onclick="editar(this)"><i class="fas fa-edit"></i></button>
				          <button onclick="apagar(this)"><i class="fas fa-trash"></i></button>
				        </div>
				    </div>
			        `
                encontrados++
			}
		}
		if(encontrados === 0){alert('item não encontrado!')}
		encontrados = 0
    }
}

function mostraTodos(){
	items = JSON.parse(localStorage.tarefas)
	display.innerHTML = ''
	for (let i = 0; i < items.length; i++){
		display.innerHTML += `
		    <div id="${i}" class="item">
		        ${items[i]}
		        <div>
		          <button onclick="editar(this)"><i class="fas fa-edit"></i></button>
		          <button onclick="apagar(this)"><i class="fas fa-trash"></i></button>
		        </div>
		    </div>
		    `
	}

}

function apagaTodos(){
	let confirmar = prompt('Isso ira apagar todos os registros! Digite confirmar para prosseguir.')
	if(confirmar === 'confirmar'){
		items = []
		localStorage.setItem("tarefas", JSON.stringify(items))
		display.innerHTML = ''
		alert('Todos os registros foram apagados!')
	}else{
		alert('A ação não foi executada!')
	}
}

function editar(e){
	editado = true
	texto.value = items[e.parentElement.parentElement.id]
	indexEdit = e.parentElement.parentElement.id
	console.log(items[e.parentElement.parentElement.id])
}


