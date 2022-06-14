import puppeteer from "puppeteer";

describe("App.js", () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    it("e2e : X win", async () => {
        await page.goto("https://woverlin.github.io/tac-tic-toe2/");
        await page.waitForSelector(".title");
        await page.click(".tactic00");
        await page.click(".tactic01");
        await page.click(".tactic11");
        await page.click(".tactic12");
        await page.click(".tactic22");
        const text = await page.$eval(".result", (e) => e.textContent);
        expect(text).toContain("X win");
    });

    it("e2e : 0 win", async () => {
        await page.goto("https://woverlin.github.io/tac-tic-toe2/");
        await page.waitForSelector(".title");
        await page.click(".tactic00");
        await page.click(".tactic01");
        await page.click(".tactic10");
        await page.click(".tactic11");
        await page.click(".tactic22");
        await page.click(".tactic21");
        const text = await page.$eval(".result", (e) => e.textContent);
        expect(text).toContain("O win");
    });

    it("e2e : No one win", async () => {
      await page.goto("http://localhost:3001/tac-tic-toe2");
      await page.waitForSelector(".title");
      await page.click(".tactic00");
      await page.click(".tactic01");
      await page.click(".tactic02");
      await page.click(".tactic12");
      await page.click(".tactic11");
      await page.click(".tactic20");
      await page.click(".tactic10");
      await page.click(".tactic22");
      await page.click(".tactic21");
      const text = await page.$eval(".result", (e) => e.textContent);
      expect(text).toContain("No one win");
  });


    afterAll(() => browser.close());
});
