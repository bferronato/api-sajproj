/**
 * Regras:
 * 
 * Caracteres com acentos devem ser substituítos por seus respectivos, por exemplo ã => a, ç => c. í => i e assim sucessivamente.
 * Não pode possuir espacos em branco no inicio ou no final do login
 * Não pode possuir aspas simples ou duplas
 * Não pode possuir qualificadores "filho", "junior", "neto", "segundo", "terceiro", "sobrinho"
 * Não pode possuir separadores  "da", "de", "di", "do", "du", "dos", "das"
 * 
 * O login deve se a combinacao de cada nome/sobrenome e/ou a inicial do nome/sobrenome em todas as combinacoes possiveis
 * concatenados com TRACO ou UNDERLINE
 * 
 * Não pode possuir espaços em branco
 * Login gerado deve possuir no maximo 20 caracteres
 * 
 * font: https://codereview.stackexchange.com/questions/7001/generating-all-combinations-of-an-array
 */
const login = {
    geraLogin(nome) {

        const qualificadores = ["filho", "junior", "neto", "segundo", "terceiro", "sobrinho"];
        const separadores = ["da", "de", "di", "do", "du", "dos", "das"];

        nome = nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        nome = nome.trim().toLowerCase()
        nome = nome.replace('\'', '').replace('"', '');

        let nomesSemQualificadores = nome.split(/\s+/).filter((nomeParte) => {
            return !qualificadores.includes(nomeParte);
        })

        let nomesSemSeparadores = nomesSemQualificadores.filter((nomeParte) => {
            return !separadores.includes(nomeParte);
        })

        var logins = this.getCombinations(nomesSemSeparadores);


        logins = logins.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });

        logins = logins.filter((login) => {
            return login.length <= 20
        })
        
        logins.unshift('Teste: João da Silva Gonçalves Sant\'Ana Junior<hr>')

        result = logins.join('<br>')

        return result
    },
    getCombinations(nomes) {
        var result = [];
        var f = function (prefix, nomes) {
            for (var i = 0; i < nomes.length; i++) {
                if (prefix) {
                    result.push(prefix + '_' + nomes[i]);
                    result.push(prefix + '_' + nomes[i][0]);
                    result.push(prefix + '-' + nomes[i][0]);
                    result.push(prefix[0] + '_' + nomes[i]);
                    result.push(prefix[0] + '-' + nomes[i]);
                }
                if (prefix) {
                    f(prefix + '_' + nomes[i], nomes.slice(i + 1));
                    f(prefix + '-' + nomes[i], nomes.slice(i + 1));
                } else {
                    // Controla a geracao de logins somente para o primeiro nome
                    if (i == 1) {
                        return
                    }
                    f(prefix + nomes[i], nomes.slice(i + 1));
                }
            }
        }
        f('', nomes);
        return result;
    }
}

module.exports = login