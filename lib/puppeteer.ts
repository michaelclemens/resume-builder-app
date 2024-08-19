"use server"

import puppeteer, { ScreenshotOptions } from "puppeteer-core";
import path from 'node:path';
import * as fs from 'node:fs';
import { headers } from "next/headers";
import { resumePrintPreviewID } from "@/util/template";

const A4Heightpx = 1122;

const getPreviewUrl = (resumeId: string) => {
    const headersList = headers();
    const host = headersList.get('x-forwarded-host');
    const url = `http://${host}/resume/${resumeId}/preview`;
    return url;
}

export async function generateScreenshot(resumeId: string, basePath: string, filename: string = 'preview', elementSelector: string = `#${resumePrintPreviewID}`) {
    const browser = await puppeteer.launch({
        executablePath: process.env.CHROME_EXECUTABLE_PATH,
    });
    const page = await browser.newPage();

    try {
        await page.goto(getPreviewUrl(resumeId));

        const fullPath = path.resolve('./public', basePath);
    
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
        }
    
        const options: Readonly<ScreenshotOptions> = {
            path: `${fullPath}/${filename}.jpg`,
            type: 'jpeg',
            quality: 80
        }
    
        const element = await page.waitForSelector(elementSelector);
        if (element) await element.screenshot(options);
    } catch (error) {
        console.error(error);
    } finally {
        await page.close();
        await browser.close();
    }
}

export async function generatePDF(resumeId: string, elementId: string = resumePrintPreviewID) {
    const browser = await puppeteer.launch({
        executablePath: process.env.CHROME_EXECUTABLE_PATH,
    });
    const page = await browser.newPage();

    try {
        await page.goto(getPreviewUrl(resumeId));
        await page.evaluate((elementId, A4Heightpx) => {
            const element = document.getElementById(elementId);
            if (!element) return;

            const resumeHeight = element.clientHeight;
            if (!resumeHeight) return

            const numberOfPages = Math.ceil(resumeHeight / A4Heightpx);
            if (numberOfPages > 1) {
                const newHeight = A4Heightpx * numberOfPages;
                element.style.setProperty('--print-height', `${newHeight}px`);
            }
        }, elementId, A4Heightpx)

        const pdf = await page.pdf({
            format: 'A4',
            preferCSSPageSize: true
        })
        return pdf;
    } catch (error) {
        console.error(error);
    } finally {
        await page.close();
        await browser.close();
    }    
}