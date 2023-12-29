import  Alex from 'alex';

export async function checkMessage(message, client, logger) {
  var channel,
    channelError,
    channelName,
    errors,
    response,
    text,
    textError,
    ts,
    type,
    typeError,
    user,
    userName;
  channel = client.getChannelGroupOrDMByID(message.channel);
  user = client.getUserByID(message.user);
  response = "";
  (type = message.type), (ts = message.ts), (text = message.text);
  channelName = (channel != null ? channel.is_channel : void 0) ? "#" : "";
  channelName = channelName + (channel ? channel.name : "UNKNOWN_CHANNEL");
  userName =
    (user != null ? user.name : void 0) != null
      ? "@" + user.name
      : "UNKNOWN_USER";
  console.log(
    "Received: " +
      type +
      " " +
      channelName +
      " " +
      userName +
      " " +
      ts +
      ' "' +
      text +
      '"'
  );
  if (type === "message" && text != null && channel != null) {
    var a_messages = Alex(text).messages;

    if (a_messages.length) {
      for (var i = 0; i < a_messages.length; i++) {
        response += Alex(text).messages[i].reason + "\n";
      }

      channel.send(response);
      return console.log(
        "@" + slack.self.name + ' responded with "' + response + '"'
      );
    }
  } else {
    typeError = type !== "message" ? "unexpected type " + type + "." : null;
    textError = text == null ? "text was undefined." : null;
    channelError = channel == null ? "channel was undefined." : null;
    errors = [typeError, textError, channelError]
      .filter(function (element) {
        return element !== null;
      })
      .join(" ");
    return console.log("@" + slack.self.name + " could not respond. " + errors);
  }
}
