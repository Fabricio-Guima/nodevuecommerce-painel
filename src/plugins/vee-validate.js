import { extend } from 'vee-validate'
import {
  required,
  email,
  regex,
  min,
  max,
  image,
  mimes,
  size,
  ext,
} from 'vee-validate/dist/rules'
import { messages as messagePt } from 'vee-validate/dist/locale/pt_BR'

extend('required', {
  ...required,
  message: messagePt.required,
})

extend('email', {
  ...email,
  message: messagePt.email,
})

extend('regex', {
  ...regex,
  message: messagePt.regex,
})

extend('min', {
  ...min,
  message: messagePt.regex,
})

extend('max', {
  ...max,
  message: messagePt.regex,
})

extend('image', {
  ...image,
  message: messagePt.regex,
})

extend('mimes', {
  ...mimes,
  message: messagePt.regex,
})

extend('size', {
  ...size,
  message: messagePt.regex,
})

extend('ext', {
  ...ext,
  message: messagePt.regex,
})
