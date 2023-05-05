import { createContext } from 'react'
import TIM, { ChatSDK } from 'tim-js-sdk/tim-js-friendship'

export const TimContext = createContext<ChatSDK | undefined>(undefined)
