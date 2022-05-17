"use strict";
//
const form = document.querySelector("#infos_prod");
const corpoTabela = document.querySelector("#tbody");
const recuperarLocalStorage = () => {
    const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
    return produtos;
};
const salvarProduto = (event) => {
    event.preventDefault();
    const nome = form === null || form === void 0 ? void 0 : form.nome.value;
    const preco = form === null || form === void 0 ? void 0 : form.preco.value;
    const prime = form === null || form === void 0 ? void 0 : form.prime.checked;
    const produtos = recuperarLocalStorage();
    produtos.push({
        id: produtos.length + 1,
        nome,
        preco,
        prime,
    });
    localStorage.setItem("produtos", JSON.stringify(produtos));
    preencherTabela();
    form.reset();
};
const preencherTabela = () => {
    const produtos = recuperarLocalStorage();
    corpoTabela.innerHTML = "";
    for (const produto of produtos) {
        corpoTabela.innerHTML += `
    <tr>
    <td>${produto.id}</td>
    <td>${produto.nome}</td>
    <td>R$${produto.preco}</td>
    <td>${produto.prime ? "Sim" : "Não"}</td>
    <td>
      <img src="./img/delet.svg" alt="deletar item" width="30" onclick="removeProduto(${produto.id})">
    </td>
    </tr>`;
    }
};
const removeProduto = (id) => {
    const produtos = recuperarLocalStorage();
    const indiceProduto = produtos.findIndex((produto) => produto.id === id);
    if (indiceProduto < 0)
        return;
    produtos.splice(indiceProduto, 1);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    preencherTabela();
};
form === null || form === void 0 ? void 0 : form.addEventListener("submit", salvarProduto);
document.addEventListener("DOMContentloaded", preencherTabela);
