const texto = document.querySelector('.texto')
const display = document.querySelector('.display')
let items = []
let itemDigitado = ''
let pesquisado = ''
let editado = false
let indexEdit = ''

mostraTodos()

function incluir(){
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
	mostraTodos()
}

function apagar(e){
    items.splice(e.parentElement.id, 1)
    


	/*itemDigitado = texto.value
	pesquisado = items.indexOf(itemDigitado)
	items.splice(pesquisado, 1)
	alert(items[pesquisado] + ' deletado')*/
	mostraTodos()
}

function pesquisar(){
	itemDigitado = texto.value
	pesquisado = items.indexOf(itemDigitado)
	if(pesquisado === -1){alert('item não encontrado')}
	display.innerHTML = items[pesquisado]
}

/*function mostraTodos(){
	display.innerHTML = ''
	for (let i = 0; i < items.length; i++){
		display.innerHTML += `${items[i]}<br>`
	}
}*/

function mostraTodos(){
	display.innerHTML = ''
	for (let i = 0; i < items.length; i++){
		display.innerHTML += `
		    <div id="${i}" onclick="select(this)" ondblclick="unselect(this)" class="item">
		        ${items[i]}
		        <div>
		          <button onclick="editar(this)">Editar</button>
		          <button onclick="apagar(this)">Apagar</button>
		        </div>
		    </div>
		    `
	}

}

function apagaTodos(){
	let confirmar = prompt('Isso ira apagar todos os registros! Digite confirmar para prosseguir.')
	if(confirmar === 'confirmar'){
		items = ''
		display.innerHTML = ''
		alert('Todos os registros foram apagados!')
	}else{
		alert('A ação não foi executada')
	}
}

function editar(e){
	editado = true
	texto.value = items[e.parentElement.parentElement.id]
	indexEdit = e.parentElement.parentElement.id
	console.log(items[e.parentElement.parentElement.id])
}

let selecionados = []

function select(e){
	selecionados.push(e.id)
	e.style.backgroundColor = 'lightblue'
}

function unselect(e){
	selecionados.splice(items.indexOf(e.id), 1)
	console.log(selecionados)
	e.style.backgroundColor = 'white'
}

