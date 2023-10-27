/**
 * terminal/sftp/serial class
 */
import _ from 'lodash'
import uid from '../common/uid.js'
import log from '../common/log.js'
import { createLogFileName } from '../common/create-session-log-file-path.js'
import { SessionLog } from './session-log.js'
import { Telnet } from './telnet.js'

class TerminalTelnet {
  constructor (initOptions, ws, isTest) {
    this.pid = initOptions.uid || uid()
    this.initOptions = initOptions
    if (initOptions.saveTerminalLogToFile) {
      this.sessionLogger = new SessionLog({
        fileName: createLogFileName(initOptions.logName)
      })
    }
    this.ws = ws
    this.isTest = isTest
  }

  async init () {
    const connection = new Telnet()

    const { initOptions } = this
    const shellOpts = {
      highWaterMark: 64 * 1024 * 16
    }
    const params = _.pick(
      initOptions,
      [
        'host',
        'port',
        'timeout',
        'username',
        'password',
        'terminalWidth',
        'terminalHeight'
      ]
    )
    Object.assign(
      params,
      {
        negotiationMandatory: false,
        // terminalWidth: initOptions.cols,
        // terminalHeight: initOptions.rows,
        timeout: initOptions.readyTimeout,
        sendTimeout: initOptions.readyTimeout,
        socketConnectOptions: shellOpts
      }
    )
    await connection.connect(params)
    this.port = connection.shell(shellOpts)
    this.channel = connection
    if (this.isTest) {
      this.kill()
      return true
    }
    global.sessions[this.initOptions.sessionId] = {
      id: this.initOptions.sessionId,
      sftps: {},
      terminals: {
        [this.pid]: this
      }
    }
  }

  resize (cols, rows) {
    this.channel.opts.terminalWidth = cols
    this.channel.opts.terminalHeight = rows
  }

  on (event, cb) {
    this.port.on(event, cb)
  }

  write (data) {
    try {
      this.port.write(data)
      if (this.sshLogger) {
        this.sshLogger.write(data)
      }
    } catch (e) {
      log.error(e)
    }
  }

  kill () {
    this.channel && this.channel.end()
    if (this.sshLogger) {
      this.sshLogger.destroy()
    }
    const inst = global.sessions[
      this.initOptions.sessionId
    ]
    if (!inst) {
      return
    }
    delete inst.terminals[this.pid]
    if (
      _.isEmpty(inst.terminals)
    ) {
      delete global.sessions[
        this.initOptions.sessionId
      ]
    }
  }
}

export const terminalTelnet = async function (initOptions, ws) {
  const term = new TerminalTelnet(initOptions, ws)
  await term.init()
  return term
}

/**
 * test ssh connection
 * @param {object} options
 */
export const testConnectionTelnet = (options) => {
  return (new TerminalTelnet(options, undefined, true))
    .init()
    .then(() => true)
    .catch(() => {
      return false
    })
}
