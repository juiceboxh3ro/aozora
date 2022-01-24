/*
import puppeteer from 'puppeteer'

async function getVisual() {
	try {
		const URL = 'https://www.reddit.com/r/programming/'
		const browser = await puppeteer.launch()
		const page = await browser.newPage()

		await page.goto(URL)
		await page.screenshot({ path: 'screenshot.png' })
		await page.pdf({ path: 'page.pdf' })

		await browser.close()
	} catch (error) {
		console.error(error)
	}
}

getVisual()
*/

/**
 * The goal:
 * Once bot's frontend panel is ready, use puppeteer to login
 * navigate to features/image-gen/:token
 * page will generate text over a cutie background
 *    with furi from params.token if it is a valid string
 * take screenshot with puppeteer
 * ???
 * profit
 */

/** */
export default class Scraper {
  constructor() {

  }
}
