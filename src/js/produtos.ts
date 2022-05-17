//

const form = document.querySelector("#infos_prod") as HTMLFormElement;
const corpoTabela = document.querySelector("#tbody") as HTMLElement;

const recuperarLocalStorage = (): Array<any> => {
  const produtos = JSON.parse(
    localStorage.getItem("produtos") || "[]"
  ) as Array<any>;

  return produtos;
};

const salvarProduto = (event: Event) => {
  event.preventDefault();

  const nome = form?.nome.value;
  const preco = form?.preco.value;
  const prime = form?.prime.checked;

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
      <img src="./img/delet.svg" alt="deletar item" width="30" onclick="removeProduto(${
        produto.id
      })">
    </td>
    </tr>`;
  }
};

const removeProduto = (id: number) => {
  const produtos = recuperarLocalStorage();

  const indiceProduto = produtos.findIndex((produto) => produto.id === id);

  if (indiceProduto < 0) return;

  produtos.splice(indiceProduto, 1);

  localStorage.setItem("produtos", JSON.stringify(produtos));

  preencherTabela();
};

form?.addEventListener("submit", salvarProduto);

document.addEventListener("DOMContentloaded", preencherTabela);
