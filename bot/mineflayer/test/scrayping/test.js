import assert from 'assert';
import { getEventFromHTML } from '../../src/scrayping/getEvent.js';
import fs from 'fs';

//TODO:write-message
describe("Scrayping", function(){
    it("getEventHTML", async function(){
        const html = fs.readFileSync('./test/scrayping/event_mock.html', 'utf8')
        let event_word = getEventFromHTML(html);
        assert.strictEqual("テストイベント 2021/5/21 21:30", event_word);
    });
});