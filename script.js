const modalPesq = document.querySelector('.modal-pesquisa')
const texto = document.querySelector('.texto')
const display = document.querySelector('.display')
const btnIncluir = document.querySelector('.btn-incluir')
const textoPesq = document.querySelector('.texto-pesq')
let items = []
let itemDigitado = ''
let pesquisado = ''
let editado = false
let indexEdit = ''

//localStorage.removeItem('compras')

mostraTodos()

function incluir(){
	if(texto.value === ''){
		alert('Escreva o nome de um item antes clicar em incluir!')
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
	    localStorage.setItem("compras", JSON.stringify(items))
		mostraTodos()
		texto.style.backgroundColor = "#fff"
		btnIncluir.innerHTML = "<i class='fas fa-plus'></i>"
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

function pesquisar(){
	if(textoPesq.value === ''){
		alert('Digite o nome do item a ser pesquisado!')
	}else{
		modalPesq.style.display = 'none'
		items = JSON.parse(localStorage.compras)
		display.innerHTML = ''
		for (let i = 0; i < items.length; i++) {
			digitado = textoPesq.value
			itemCorte = items[i].slice(0, digitado.length)
			if(digitado === itemCorte){
				display.innerHTML += `
				    <div id="${i}"class="item">
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

function fechaPesq(){
	modalPesq.style.display = 'none'
}

function mostraTodos(){
	items = JSON.parse(localStorage.compras)
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
		localStorage.setItem("compras", JSON.stringify(items))
		display.innerHTML = ''
		alert('Todos os registros foram apagados!')
	}else{
		alert('A ação não foi executada!')
	}
}

function editar(e){
	texto.style.backgroundColor = "#FBFDC1"
    btnIncluir.innerHTML = "<i class='fas fa-check'></i>"
	texto.focus()
	editado = true
	texto.value = items[e.parentElement.parentElement.id]
	indexEdit = e.parentElement.parentElement.id
	console.log(items[e.parentElement.parentElement.id])
}

texto.addEventListener('keypress', (e)=>{
	if(e.key === 'Enter'){
		incluir()
	}
})


