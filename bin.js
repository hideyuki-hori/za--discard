#!/usr/bin/env node

const { AudioContext } = require('web-audio-api')
const Speaker = require('speaker')
const context = new AudioContext()
const bufferSize = 4096

context.outStream = new Speaker({
  channels: context.format.numberOfChannels,
  bitDepth: context.format.bitDepth,
  sampleRate: context.sampleRate,
})

const whiteNoise = context.createScriptProcessor(bufferSize, 1, 1)

whiteNoise.onaudioprocess = event => {
  const output = event.outputBuffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++)
    output[i] = Math.random() * 2 - 1
}

whiteNoise.connect(context.destination)
