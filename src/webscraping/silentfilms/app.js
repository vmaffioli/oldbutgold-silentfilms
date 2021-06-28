const axios = require('axios');
const cheerio = require('cheerio');
const database = require('../../../../../database/app');
if(process.env.NODE_ENV!=='production'){
  require('dotenv').config({path:'../../../.env'})
}

function scrapSilentFilmes() {
  for (i = 0; i < 9; i++) {
    axios(process.env.SILENTFILMS_URL + i).then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      const elements = $('.C234');
      const links = [];
      elements.each(function () {
        const link = $(this).find('.item-ttl > a').attr('href');
        if (link != undefined) {
          getItemData(link)
        }
      })
    }).catch(console.error);
  }
}

function getItemData(link) {
  axios(process.env.SILENTFILMS_URLBOILERPLATE + link).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const downloads = $('.summary-rite')
    const details = $('.metadata-definition')
    let result = {
      id:"",
      title:"",
      video:"",
      image:"",
      actors:"",
      director:"",
      genres:"",
      publication:"",
      language:""
    }
    result.title = $('.item-title > span').text()
    downloads.each(function () {
      const link = $(this).find('a').attr('href');
      if (link.includes('.mp4')) {
        result.video = link
      } else if (link.includes('.jpg')) {
        result.image = link
      }
    })
    details.each(function () {
      const identifier = $(this).find('dt').text()
      const content = $(this).find('dd').text()
      if(identifier.includes('Actor')){
        result.actors = content.replace(/([A-Z])/g, ' $1')
      } else if(identifier.includes('Genre')){
        result.genres = content.replace(/\s\s+/g, ' ')
      } else if(identifier.includes('Director')){
        result.director = content.replace(/\s\s+/g, ' ')
      } else if(identifier.includes('Publication date')){
        result.publication = content.replace(/\s\s+/g, ' ')
      } else if(identifier.includes('Language')){
        result.language = content.replace(/\s\s+/g, ' ')
      } else if(identifier.includes('Identifier')){
        result.id = content.replace(/\s\s+/g, '')
      }
    })
    database({database:process.env.SILENTFILMS_DATABASE,collection:process.env.SILENTFILMS_COLLECTION},'push',result)
  }).catch(console.error);
}
