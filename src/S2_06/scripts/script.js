function procuraSobremesa(valorDoInput) {
    return listaDeSobremesas.filter(sobremesa => sobremesa.nome.toLowerCase().includes(valorDoInput.toLowerCase()));
}