//const bigPower = require('periodo.js')

const formulario = document.querySelector('#formulario')
const materias = []


// Funções auxíliares
const limparCampos = () => {
    document.getElementById("periodo").value = ""
    document.getElementById("codigo").value = ""
    document.getElementById("cargaHoraria").value = ""
    document.getElementById("nota").value = ""
    document.getElementById("frequencia").value = ""
}
const soma = (y, x) => y + x
const somatorio = (valores) => valores.reduce(soma, 0)
const alteraSituacao = (lista) => lista.map(item => item.codigo)
const aprovado = (lista) => lista.filter((x) => x.nota >= 5)
const reprovado = (lista) => lista.filter((x) => x.nota < 5)

const mediaPonderada = (lista) => somatorio(lista.map((x) => x.nota * x.cargaHoraria)) / lista.map((x) => x.cargaHoraria).reduce(soma,0)


const addDisciplina = (disciplina) => {
    materias.push(disciplina) // TOMAR CUIDADO COM PUSH
}

const media = (lista) => lista.map((x)=> x.nota).reduce(soma,0)/lista.length
const desvioParcial = (lista) => lista.map((x) => (x.nota-media(materias))**2/lista.length).reduce(soma,0)
const desvioPadrao = Math.sqrt(desvioParcial(materias))

const ehInteiro = numero => divisor => {
    // Caso base 
    if (numero == 0) return 0
    else if (numero == 1) return 1
    else if (numero == divisor) return 1
    else if (numero < divisor) return 'O divisor é maior que o numerador. O resultado não seria um número inteiro.'
    else return ehInteiro(numero)(divisor + 1)
}

const selecDepartamento = (codigo = '') => (lista) => mediaPonderada(lista.filter((x) => x.codigo.replace(/[0-9]/g, '') == codigo))


const cargaHorariaFUnc = (lista) => lista.map((item) => item.cargaHoraria)
const todaCargaHoraria = somatorio(cargaHorariaFUnc(materias))

const filtroPeriodo = (lista) => lista.map((x) => x.anoLetivo)
const organizar = (lista) => lista.sort((a, b) => (a - b))
const ultimo = (lista) => lista[lista.length - 1]
const primeiro = (lista) => lista[0]
const ano = ((ultimo(organizar(filtroPeriodo(materias))) - primeiro(organizar(filtroPeriodo(materias)))))
const periodoHTML = Math.trunc(((ano) + 0.4) * 2)





// Aplicando
formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    const { periodo, codigo, cargaHoraria, nota, frequencia } = event.target
    const curso = {
        periodo: parseFloat(periodo.value) || 'Não registrado',
        codigo: codigo.value || 'Não registrado',
        cargaHoraria: parseFloat(cargaHoraria.value) || 'Não registrado',
        nota: parseFloat(nota.value) || 'Não registrado',
        frequencia: parseInt(frequencia.value) || 'Não registrado'
    }
    //limparCampos()
    addDisciplina(curso)
    const mediaGeral = mediaPonderada(materias)
    const aprovadoHTML = alteraSituacao(aprovado(materias))
    const reprovadoHTML = alteraSituacao(reprovado(materias))
    const departamentoC = selecDepartamento('COMP')(materias)
    console.log(desvioPadrao)
    



    document.querySelector('#resultado').innerHTML = materias.map(e => `<tr>
    <td>${e.periodo}</td>
    <td>${e.codigo}</td>
    <td>${e.cargaHoraria}</td>
    <td>${e.nota}</td>
    <td>${e.frequencia}%</td>
    <br>
    </tr>`).join("")

    document.querySelector('#respPedido').innerHTML =`<tr>
    <td>${periodoHTML}</td>
    <td>${mediaGeral}</td>
    <td>${desvioPadrao}</td>
    <td>${aprovadoHTML}</td>
    <td>${reprovadoHTML}</td>
    <td>${departamentoC}</td>
    <br>
    </tr>`
   
})
