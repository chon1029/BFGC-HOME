import { dailyBread } from './dailyBread'
import { discipleshipApplication } from './discipleshipApplication'
import { sermon } from './sermon'
import { weeklyPrayer } from './weeklyPrayer'
import { gallery } from './gallery'
import { bulletin } from './bulletin'
import siteSettings from './siteSettings'
import popupSettings from './popupSettings'
import emailSettings from './emailSettings'

export const schema = {
    types: [
        dailyBread,
        discipleshipApplication,
        sermon,
        weeklyPrayer,
        gallery,
        bulletin,
        siteSettings,
        popupSettings,
        emailSettings,
    ],
}
