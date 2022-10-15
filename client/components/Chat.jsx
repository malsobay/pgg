import React from "react";
import { Avatar } from "./Avatar";

export class Chat extends React.Component {
  state = { open: false, focused: false };

  constructor(props) {
    super(props);

    this.messagesRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (!prevState.open && this.state.open) ||
      (!prevState.focused && this.state.focused)
    ) {
      this.messagesRef.current.scrollTop =
        this.messagesRef.current.scrollHeight;
    }
    if (prevProps.messages.length !== this.props.messages.length) {
      this.messagesRef.current.scrollTop =
        this.messagesRef.current.scrollHeight;
    }
  }

  handleMouseEnter = () => {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  };

  handleMouseLeave = () => {
    this.closeTimeout = setTimeout(() => {
      this.setState({ open: false });
    }, 2000);
  };

  renderOpen() {
    const { messages, avatar, onNewMessage } = this.props;

    return (
      <div
        className="absolute w-full h-full px-2 py-2"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="rounded-2xl outline outline-2 outline-gray-300 pb-2 w-full h-full flex flex-col font-mono bg-white/95">
          <div className="overflow-auto px-2 pb-2" ref={this.messagesRef}>
            <Messages messages={messages} />
          </div>
          <div className="px-2">
            <Input
              autoFocus
              avatar={avatar}
              onNewMessage={onNewMessage}
              onFocus={() => {
                this.setState({ focused: true });
              }}
              onBlur={() => {
                this.setState({ focused: false });
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  renderClosed() {
    const { messages, avatar, onNewMessage } = this.props;

    return (
      <div className="absolute bottom-0 w-full font-mono">
        <div className="pb-4 pl-4 w-full font-mono">
          {messages.length > 3 && (
            <button
              onClick={() => this.setState({ open: true })}
              className="text-gray-400 pl-2"
            >
              See full conversation
            </button>
          )}
          <div className="pb-2">
            <Messages messages={messages.slice(-3)} />
          </div>
          <div className="pr-4">
            <Input
              avatar={avatar}
              onNewMessage={onNewMessage}
              onFocus={() => {
                console.log("focus");
                this.setState({ focused: true });
              }}
              onBlur={() => {
                console.log("blur");
                this.setState({ focused: false });
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.open || this.state.focused) {
      return this.renderOpen();
    } else {
      return this.renderClosed();
    }
  }
}

function Messages({ messages }) {
  return messages.map((message, i) => {
    return (
      <div className="pl-2 flex items-start space-x-2" key={message.id}>
        <div className="w-6 h-6 pt-2 py-0.5 shrink-0">
          <Avatar animal={message.avatar} />
        </div>

        <div className="p-2">{message.text}</div>
      </div>
    );
  });
}

class Input extends React.Component {
  state = { text: "" };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onNewMessage(this.state.text);
    this.setState({ text: "" });
  };

  handleKeyDown = (e) => {
    if (this.state.text.length === 1024) {
      e.preventDefault();

      alert("Max message length is 1024");

      return;
    }

    if (e.keyCode === 13 && e.shiftKey === false) {
      this.handleSubmit(e);
      this.resize(e);
    }
  };

  handleKeyUp = (e) => {
    this.resize(e);
  };

  resize(e) {
    e.target.style.height = "inherit";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  }

  render() {
    const { avatar, onFocus, onBlur, autoFocus } = this.props;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="w-full font-semibold flex flex-row items-start rounded-xl pl-2 pr-1 py-1 ring-2 bg-gray-50 ring-gray-200 focus-within:ring-gray-400 space-x-2.5"
      >
        <div className="w-6 h-6 py-0.5 shrink-0">
          <Avatar animal={avatar} />
        </div>

        <textarea
          autoFocus={autoFocus}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          className="peer resize-none w-full py-1 px-0 ring-none border-none leading-snug bg-transparent placeholder:text-gray-300 text-md focus:ring-0 text-gray-600"
          rows={1}
          placeholder="Say something..."
          value={this.state.text}
          onChange={(e) => {
            this.setState({ text: e.currentTarget.value });
          }}
        />

        <button
          type="submit"
          className="py-0.5 px-2 rounded-lg bg-transaprent text-gray-300 peer-focus:text-gray-500 mt-[1px]"
        >
          Send
        </button>
      </form>
    );
  }
}
