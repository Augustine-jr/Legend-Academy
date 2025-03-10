// src/utils/eventBus.ts
import mitt from 'mitt'

// Define types for our events
type Events = {
  toast: { severity: string; summary: string; detail: string }
  [key: string]: any
}

// Create the event emitter
const eventBus = mitt<Events>()

export default eventBus
