import fetch from 'node-fetch';
import jsdom from 'jsdom';

const FETCH_FAIL = '取得に失敗しました。';
export const getEvent = async (url)=>{
    const res = await fetch(url).catch(() => false);

    if(!res){
        return FETCH_FAIL;
    }

    const html = await res.text();
    return getEventFromHTML(html);
}

export const getEventFromHTML = (html) =>{
    const { JSDOM } = jsdom;
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const userBody = document.querySelector(".user_body")
    const eventName = userBody.querySelector("h3").textContent;

    let timeNode = false;
    let eventTime = '';
    const tr  = userBody.querySelectorAll("table tr");

    for (let i=0; i<tr.length; i++) {
        const td = tr[i].querySelectorAll("td");

        for(let j=0; j< td.length; j++){
            if(timeNode){
                eventTime = td[j].textContent;
                break;
           }
           if(td[j].textContent === "時間") timeNode = true;
        }

        if(eventTime !==''){
            break;
        }
    };

    return eventName + ' ' + eventTime;
}