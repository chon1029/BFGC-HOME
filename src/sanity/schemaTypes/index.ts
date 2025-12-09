import { type SchemaTypeDefinition } from 'sanity'
import { sermon } from './sermon'
import { dailyBread } from './dailyBread'
import { discipleshipApplication } from './discipleshipApplication'
import { weeklyPrayer } from './weeklyPrayer'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [sermon, dailyBread, discipleshipApplication, weeklyPrayer],
}
