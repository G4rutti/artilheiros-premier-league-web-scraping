const axios = require('axios')
const cheerio = require('cheerio')

const fetchData = async(url) => {
    const result = await axios.get(url)
    return result.data
}

const main = async () => {
    const content = await fetchData("https://www.transfermarkt.com.br/premier-league/torschuetzenliste/wettbewerb/GB1/saison_id/2022")
    const $ = cheerio.load(content)
    let artilheiros = []

    $('#yw1 > table.items > tbody > tr').each((i, e) => {
        const AllElements = $(e).find('td')
        const posicaoRanking = $(AllElements[0]).text()
        const imagemArtilheiro = $(AllElements[2]).find('img').attr('src')
        const nomeArtilheiro = $(AllElements[1]).find('table > tbody > tr > td.hauptlink > a').text()
        const nacionalidade = $(AllElements[5]).find('img').attr('title')
        const idade = $(AllElements[6]).text()
        const clube = $(AllElements[7]).find('a').attr('title')
        const imagemClube = $(AllElements[7]).find('a > img').attr('src')
        const jogos = $(AllElements[8]).find('a').text()
        const gols = $(AllElements[9]).find('a').text()
        

        if(nomeArtilheiro != ""){
            const data = {posicaoRanking, imagemArtilheiro, nomeArtilheiro, nacionalidade, idade, clube, imagemClube, jogos, gols}
            artilheiros.push(data)
            console.log(data)
        }

    })
    

}

main()