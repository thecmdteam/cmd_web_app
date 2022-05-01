/* import puppeteer from "puppeteer";
const createBrowser = async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      ignoreHTTPSErrors: true,
      args: ["--disable-setuid-sandbox"],
    });
  } catch (error) {
    console.log("Could not launch browser =>", error);
  }
  return browser;
};

export const launchBrowser = async (codes) => {
  const url = `https://cmd-auth.herokuapp.com/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_CMD_CLIENT_ID}&scope=openid&code_challenge=${codes.code_challenge}&code_challenge_method=S256&redirect_uri=https://cmd-app.netlify.app/login`;
  const user = await getUserInfo(url)
};

async function getUserInfo(url) {
  const user = {};
  new Promise(async (resolve, reject) => {
    try {
      const browser = await createBrowser();
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
      await page.waitForSelector(".container");
      const email = await page.$$eval('input[name="email"]', (e) => {
        return Array.from(e).map((e, index) => e.value);
      });
      const passwordEl = document.querySelector('input[name="password"]');
      const password = await page.$$eval(passwordEl, (p) => {
        return Array.from(p).map((p, index) =>
          p.addEventListener("change", (e) => {
            user["password"] = p.value;
            p.value;
          })
        );
      });
      resolve(user)
    } catch (error) {
      console.log("Error", error.message);
      reject(error)
    }
  })
  
}
 */