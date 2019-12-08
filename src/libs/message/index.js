const lang = require('./lang');

// Entity to handle the messages used in the API
class Message {
  constructor(messages, replaceKey) {
    this.messages = messages;
    this.replaceKey = replaceKey;
  }

  get(messageKey, replaceText = null) {
    const msg = this.messages[messageKey];
    return (replaceText) ? msg.replace(this.replaceKey, replaceText) : msg;
  }
}

module.exports = new Message(lang.messages, lang.replaceKey);
