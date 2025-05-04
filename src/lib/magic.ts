import { Magic } from '@magic-sdk/react-native-expo'
import { MAGIC_PUBLISHABLE_KEY } from '@env'

export const magic = new Magic(MAGIC_PUBLISHABLE_KEY)
