import { defineRule } from 'vee-validate'
import * as rules from '@vee-validate/rules'
import { configure } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import ru from '@vee-validate/i18n/dist/locale/ru.json'

// Loop over all rules
Object.keys(rules).forEach(rule => {
  defineRule(rule, rules[rule])
})

// Set up default configuration
configure({
  generateMessage: localize({ ru }),
  validateOnInput: true // This is optional
})

setLocale('ru')
