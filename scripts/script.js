
var avaliacoes,
    lojas,
    arrLojas;

axios.get('https://cors.io/?https://storage.googleapis.com/dito-questions/survey-responses.json')
    .then(res => { 
        
        avaliacoes = res.data;

        //montando um objeto com o resultado das avaliações

        var pontuacaoGeral = {
            excelente: avaliacoes.filter(item => item.score === 5),
            muitoBoa: avaliacoes.filter(item => item.score === 4),
            razoavel: avaliacoes.filter(item => item.score === 3),
            ruim: avaliacoes.filter(item => item.score === 2),
            horrivel: avaliacoes.filter(item => item.score === 1),
        };


        $('.satisfacao .score-text').text(((pontuacaoGeral.excelente.length + pontuacaoGeral.muitoBoa.length) / avaliacoes.length) * 100 + '%');
        $('.avaliacoes .score-text').text(avaliacoes.length);
        $('.excelente .score-text').text((pontuacaoGeral.excelente.length / avaliacoes.length) * 100 + '%');
        $('.muito-boa .score-text').text((pontuacaoGeral.muitoBoa.length / avaliacoes.length) * 100 + '%');
        $('.razoavel .score-text').text((pontuacaoGeral.razoavel.length / avaliacoes.length) * 100 + '%');
        $('.ruim .score-text').text((pontuacaoGeral.ruim.length / avaliacoes.length) * 100 + '%');
        $('.horrivel .score-text').text((pontuacaoGeral.horrivel.length / avaliacoes.length) * 100 + '%');

      


        //script para a tabela da página


        lojas = _.unionBy(avaliacoes, 'storeId');


        function qtdeAvaliacoesPorLoja(idDaLoja) {
            return _.groupBy(avaliacoes, 'storeId')[idDaLoja].length;
        };

        function porcentagemDevotos(idDaLoja, nota) {
            var numeroDeAvaliacoesPorLoja = qtdeAvaliacoesPorLoja(idDaLoja);
            var avaliacoesDaLoja = _.groupBy(avaliacoes, 'storeId')[idDaLoja];

            var qtdDeNotaPorLoja = _.countBy(avaliacoesDaLoja, {score: nota}).true || 0;

            return qtdDeNotaPorLoja;
        };


        function calculaSatisfacaoIndvidual(idDaLoja) {
            var numeroDeAvaliacoesPorLoja = qtdeAvaliacoesPorLoja(idDaLoja);
            var avaliacoesDaLoja = _.groupBy(avaliacoes, 'storeId')[idDaLoja];

            var notaExcelente = _.countBy(avaliacoesDaLoja, {score: 5}).true || 0;
            var notaMuitoBoa = _.countBy(avaliacoesDaLoja, {score: 4}).true || 0;
            var porcentagemPorLoja = ((notaExcelente + notaMuitoBoa ) / numeroDeAvaliacoesPorLoja) * 100 + '%';
            return porcentagemPorLoja;
        };




        _.forEach(lojas, function(loja) {
            
            $('table#tabela-lojas tbody').append(
                '<tr><td>' + loja.storeName + '</td>'+
                '<td>' + calculaSatisfacaoIndvidual(loja.storeId) + '</td>'+
                '<td>' + qtdeAvaliacoesPorLoja(loja.storeId) + '</td>'+
                '<td>' + porcentagemDevotos(loja.storeId, 5) + '</td>'+
                '<td>' +  porcentagemDevotos(loja.storeId, 4) + '</td>'+
                '<td>' +porcentagemDevotos(loja.storeId, 3) + '</td>'+
                '<td>' + porcentagemDevotos(loja.storeId, 2) + '</td>'+
                '<td>' +  porcentagemDevotos(loja.storeId, 1) + '</td>'+
                '<td><button>+</button></td></tr>'
                );
        });

    })
    .catch(error => {
        console.log('erro', error);
    });


    
//codigo para a caixa de pesquisa

$("#input-loja").on("keyup", function() {
    var value = $(this).val().toLowerCase();

    $("#tbody-loja tr").filter(function() {
        $(this).toggle(
            $(this).text().toLowerCase().indexOf(value) > -1
        )
    });
});






    

   