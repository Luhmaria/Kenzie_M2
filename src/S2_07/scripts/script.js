function removeDoCarrinho(produto) {
    const indexRemovido = listaDoCarrinho.findIndex(produtc => produtc.id == produto.id);
    return listaDoCarrinho.splice(indexRemovido, 1);
}