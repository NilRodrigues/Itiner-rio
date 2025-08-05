const SPREADSHEET_ID = '2PACX-1vRS_Bl9a5lIxzjh59OdIZAWrLQf1pXCJHYNChCDkUdytCPTScPn4i3p1YE5k_S1vaVDasUVOMB-pCik';

const filiais = {
    'Valinhos': '0', 
    'Lucas do Rio Verde': '204255522',
    'Itapira Urbano': '2098118246', 
    'Cajati': '394115207', 
    'Birigui': '551093153',
    'Jatai Urbano': '1978942762', 
    'Estrela do Norte': '1074014605', 
    'São Carlos': '1715230837',
    'Orlandia': '725857319', 
    'Junqueiropolis': '1042778922', 
    'Rubiacia': '1204676444',
};

let dados = [];
let selectFilial = document.getElementById("filial");
let selectLinha = document.getElementById("linha");
let codigoSpan = document.getElementById("codigo");

window.onload = function() {
    for (const nomeFilial in filiais) {
        const option = document.createElement("option");
        option.value = filiais[nomeFilial];
        option.textContent = nomeFilial;
        selectFilial.appendChild(option);
    }
    carregarDados();
};

function carregarDados() {
    const gid = selectFilial.value;
    const csvUrl = `https://docs.google.com/spreadsheets/d/e/${SPREADSHEET_ID}/pub?gid=${gid}&single=true&output=csv`;
    
    selectLinha.innerHTML = '<option value="">-- Selecione uma linha --</option>';
    codigoSpan.textContent = "";

    fetch(csvUrl)
        .then(response => response.text())
        .then(csvText => {
            dados = csvText
                .trim()
                .split('\n')
                .slice(0, 280)
                .map(row => row.split(',').slice(0, 14));

            dados.forEach((row, index) => {
                const option = document.createElement("option");
                option.value = index;
                option.textContent = row[0] || `Linha ${index + 1}`;
                selectLinha.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os dados da planilha:', error);
            codigoSpan.textContent = 'Erro ao carregar dados da filial.';
        });
}

function mostrarCodigo() {
    const index = selectLinha.value;
    if (index !== "") {
        codigoSpan.textContent = dados[index][1] || "";
    } else {
        codigoSpan.textContent = "";
    }

}
