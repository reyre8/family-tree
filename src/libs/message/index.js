const lang = require('./lang');

/**
 * Class that controls the messages used in the application
 */
class Message {
  /**
   * Class constructor
   *
   * @param {Object} messages - Collection of messages on key:value pair.
   * @param {String} replaceKey - placeholder to be replaced on messages.
   * in order to process instructions.
   */
  constructor(messages, replaceKey) {
    this.messages = messages;
    this.replaceKey = replaceKey;
  }

  /**
   * Searches in the messages collection, for a message with the
   * key "messageKey", and return its value.
   *
   * @param {String} messageKey - Key of the message to retrieve
   * @param {String} replaceText - if set, it will replace in
   * the message, the replaceKey placeholder (this.replaceKey),
   * with the value of "replaceText".
   *
   * @return {String} The message found, with any
   * replacements applied. Otherwise, it returns null.
   */
  get(messageKey, replaceText = null) {
    const msg = this.messages[messageKey];
    if (!msg) return null;
    return (replaceText) ? msg.replace(this.replaceKey, replaceText) : msg;
  }
}

module.exports = new Message(lang.messages, lang.replaceKey);
