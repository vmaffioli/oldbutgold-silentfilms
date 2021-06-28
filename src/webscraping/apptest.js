const cheerio = require('cheerio'),
  axios = require('axios'),
  config = require('./data/config.json'),
  database = require('../firebase/database/app');

  
async function getFilmsPages() { // valida pagina
  let condition = false;
  let videoPageLinks = [];

  for (let iii = 0; iii >= 0; iii++) {

    await axios.get(config.URL_LIST.page + iii)
      .then((response) => {
        let $ = cheerio.load(response.data);
        // validate page
        $('div').each(function (i, e) {
          let content = $(e).text();
          if (content.includes(config.NORESULTS)) {
            condition = true;
          }
        })
        if (!condition) {
          $('a').each(function (i, e) {
            let links = $(e).attr("href");
            videoPageLinks.push(links);
          })
        } else {
          iii = -10;
        }
      }).catch(function (e) {
        //console.log(e);
      });
  }
  console.log(videoPageLinks)
  return videoPageLinks;
}



async function getFilmsLinks(url) { // captura url do video e conteudo do titulo
  let result = { 
    title:"",
    url:""
  }
  let videoUrl = url.replace("details/", "")
  let urlBuilder = config.URL_LIST.build_page + url;

  await axios.get(urlBuilder)
    .then((response) => {
      let $ = cheerio.load(response.data);

      $('a').each(function (i, e) {
        let content = $(e).attr('href');
        if (content.includes('.mp4')) {
          result.url = content;
        } 
      })


      $('span.breaker-breaker').each(function (i, e) {
        let content = $(e).text();
        result.title = content;
      })

     database(result.title, result.url, "silent_films")


    }).catch(function (e) {
      //console.log(e);
    });

    
  return result;
}

async function scrapeSilentFilms() {
  let results = [];
  await getFilmsPages().then((response) => {
    response.forEach(e => {
      results.push(getFilmsLinks(e))
      
    });
  }).then((response) => {
  });
  return results
}

scrapeSilentFilms()


// montar list de languages para executar antes de validar paginas
// esta retornando lista de links de download (mp4)
// capturar data de publicacao, language, atores, diretor, fonte, genero, imagem
// pegar sinopse imdb