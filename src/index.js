const puppeteer = require('puppeteer');
const url = 'https://eldni.com/pe/buscar-datos-por-dni';
const dni = "74997020";

(async () => {

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.setViewport({
        width: 1200,
        height: 1200,
        deviceScaleFactor: 1,
      });

    await page.goto(url);
    
    const dataDNI = [];


    await page.waitForSelector('#dni').then(() => page.type('#dni', dni));
    await page.waitForSelector('#btn-buscar-datos-por-dni').then(() => page.click('#btn-buscar-datos-por-dni'));
    await page.waitForSelector('.table td');

    const [fullName, lastNameFather, lastNameMother] = await page.$$eval(
      '.table td',
      (elements) => [elements[1].textContent, elements[2].textContent, elements[3].textContent]
    );

    var tmp = {};
    tmp.dni  = dni;
    tmp.fullName  = fullName;
    tmp.lastNameFather = lastNameFather;
    tmp.lastNameMother = lastNameMother;

    dataDNI.push(tmp);
    console.log(dataDNI);

    //await browser.close();
})();