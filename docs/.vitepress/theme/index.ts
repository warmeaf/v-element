import DefaultTheme from 'vitepress/theme'

import '../../../src/style/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export default DefaultTheme