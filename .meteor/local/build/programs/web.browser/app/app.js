var require = meteorInstall({"client":{"game":{"pages":{"about":{"About.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/pages/about/About.jsx                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => About
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);

class About extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, "Here be the presentation of the experiement(ers).");
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"contribution":{"Contribution.css":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/pages/contribution/Contribution.css                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// These styles have already been applied to the document.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Contribution.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/pages/contribution/Contribution.jsx                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => Contribution
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
module.link("./Contribution.css");

class Contribution extends React.Component {
  constructor() {
    super(...arguments);

    this.handleChange = event => {
      const {
        player,
        game
      } = this.props;
      let value = parseFloat(event.target.value);

      if (value > game.treatment.endowment) {
        value = game.treatment.endowment;
      }

      if (!value) {
        value = 0;
      }

      player.round.set("contribution", value);
    };

    this.handleSubmit = event => {
      event.preventDefault();
      this.props.player.stage.submit();
    };

    this.handleSubmitAll = event => {
      const {
        game,
        player
      } = this.props;
      player.round.set("contribution", game.treatment.endowment);
      this.props.player.stage.submit();
    };

    this.handleSubmitNone = event => {
      const {
        player
      } = this.props;
      player.round.set("contribution", 0);
      this.props.player.stage.submit();
    };
  }

  render() {
    const {
      player,
      game
    } = this.props;
    const multiplier = game.treatment.multiplier;
    const contribution = player.round.get("contribution");
    const endowment = game.treatment.endowment;
    const keep = endowment - parseFloat(contribution);

    if (game.treatment.allOrNothing) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "contribution-container"
      }, /*#__PURE__*/React.createElement("h2", null, "Contributions"), /*#__PURE__*/React.createElement("h4", null, " Multiplier: ", multiplier, "x"), /*#__PURE__*/React.createElement("div", {
        className: "contribution-image"
      })), /*#__PURE__*/React.createElement("div", {
        className: "instructions-text"
      }, "You can contribute all or none of your ", endowment, " coins for this round towards the public fund, which will be multiplied then divided equally among the group."), player.stage.submitted ? /*#__PURE__*/React.createElement("div", {
        className: "waiting-response-container"
      }, "Waiting on other players' contributions...") : /*#__PURE__*/React.createElement("div", {
        className: "center"
      }, /*#__PURE__*/React.createElement("button", {
        type: "submit",
        onClick: this.handleSubmitAll
      }, "Contribute"), "\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0", /*#__PURE__*/React.createElement("button", {
        type: "submit",
        onClick: this.handleSubmitNone
      }, "Do not contribute")));
    } else {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "contribution-container"
      }, /*#__PURE__*/React.createElement("h2", null, "Contributions"), /*#__PURE__*/React.createElement("h4", null, " Multiplier: ", multiplier, "x"), /*#__PURE__*/React.createElement("div", {
        className: "contribution-image"
      })), /*#__PURE__*/React.createElement("div", {
        className: "instructions-text"
      }, "You can contribute any of your ", endowment, " coins for this round towards the public fund, which will be multiplied then divided equally among the group."), player.stage.submitted ? /*#__PURE__*/React.createElement("div", {
        className: "waiting-response-container"
      }, "Waiting on other players' contributions...") : /*#__PURE__*/React.createElement("form", {
        className: "center",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("input", {
        type: "number",
        onChange: this.handleChange,
        min: "0",
        value: player.round.get("contribution"),
        max: endowment,
        placeholder: "0 if left blank",
        className: "text-area"
      }), 0 <= parseFloat(contribution) && contribution <= endowment ? /*#__PURE__*/React.createElement("p", null, " You keep: ", keep, " ") : null, /*#__PURE__*/React.createElement("button", {
        type: "submit"
      }, "Contribute")));
    }
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"outcome":{"Outcome.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/pages/outcome/Outcome.jsx                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => Outcome
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Table;
module.link("../../common/Table.jsx", {
  default(v) {
    Table = v;
  }

}, 1);

class Outcome extends React.Component {
  constructor() {
    super(...arguments);

    this.onNext = event => {
      event.preventDefault();
      this.props.player.stage.submit();
    };
  }

  renderSubmitted() {
    return /*#__PURE__*/React.createElement("div", {
      className: "waiting-response-container"
    }, "Waiting on other players... Please wait until all players are ready");
  }

  render() {
    const {
      game,
      player,
      round
    } = this.props;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Table, {
      players: game.players,
      game: game,
      round: round,
      me: player,
      punishment: game.treatment.punishmentExists
    }), /*#__PURE__*/React.createElement("div", {
      className: "center"
    }, player.stage.submitted ? this.renderSubmitted() : /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: this.onNext
    }, "Next Round")));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"punishment":{"ContributionsTableResults.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/pages/punishment/ContributionsTableResults.jsx                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => ContributionsTableResults
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
module.link("./punishment.css");

class ContributionsTableResults extends React.Component {
  render() {
    const {
      game,
      round,
      player
    } = this.props;
    const totalContributions = round.get("totalContributions");
    const contribution = player.round.get("contribution");
    const multiplier = game.treatment.multiplier;
    const playerCount = game.treatment.playerCount;
    const totalReturns = round.get("totalReturns");
    const payoff = round.get("payoff");
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h2", {
      className: "center"
    }, "Total Contributions"), /*#__PURE__*/React.createElement("div", {
      className: "contributions-total-wrapper"
    }, /*#__PURE__*/React.createElement("div", {
      className: "contributions-total-record"
    }, /*#__PURE__*/React.createElement("b", null, "Contributions")), /*#__PURE__*/React.createElement("div", {
      className: "contributions-total-record"
    }, /*#__PURE__*/React.createElement("div", null, "You contributed"), /*#__PURE__*/React.createElement("div", null, contribution)), /*#__PURE__*/React.createElement("div", {
      className: "contributions-total-record"
    }, /*#__PURE__*/React.createElement("div", null, "Others contributed"), /*#__PURE__*/React.createElement("div", null, "+", totalContributions - contribution)), /*#__PURE__*/React.createElement("div", {
      className: "divider"
    }), /*#__PURE__*/React.createElement("div", {
      className: "contributions-total-record"
    }, /*#__PURE__*/React.createElement("div", null, "Total contributions"), /*#__PURE__*/React.createElement("div", null, totalContributions))), /*#__PURE__*/React.createElement("div", {
      className: "contributions-total-wrapper"
    }, /*#__PURE__*/React.createElement("div", {
      className: "contributions-total-record"
    }, /*#__PURE__*/React.createElement("b", null, "Total Returns")), /*#__PURE__*/React.createElement("div", {
      className: "contributions-total-record"
    }, /*#__PURE__*/React.createElement("div", null, "Total contributions"), /*#__PURE__*/React.createElement("div", null, totalContributions)), /*#__PURE__*/React.createElement("div", {
      className: "contributions-total-record"
    }, /*#__PURE__*/React.createElement("div", null, "Multiplier"), /*#__PURE__*/React.createElement("div", null, "x", multiplier)), /*#__PURE__*/React.createElement("div", {
      className: "divider"
    }), /*#__PURE__*/React.createElement("div", {
      className: "contributions-total-record"
    }, /*#__PURE__*/React.createElement("div", null, "Total returns"), /*#__PURE__*/React.createElement("div", null, totalReturns))), /*#__PURE__*/React.createElement("div", {
      className: "contributions-total-wrapper"
    }, /*#__PURE__*/React.createElement("div", {
      className: "contributions-total-record"
    }, /*#__PURE__*/React.createElement("b", null, "Your Returns")), /*#__PURE__*/React.createElement("div", {
      className: "contributions-total-record"
    }, /*#__PURE__*/React.createElement("div", null, "Total returns"), /*#__PURE__*/React.createElement("div", null, totalReturns)), /*#__PURE__*/React.createElement("div", {
      className: "contributions-total-record"
    }, /*#__PURE__*/React.createElement("div", null, "All players"), /*#__PURE__*/React.createElement("div", null, "/", playerCount)), /*#__PURE__*/React.createElement("div", {
      className: "divider"
    }), /*#__PURE__*/React.createElement("div", {
      className: "contributions-total-record"
    }, /*#__PURE__*/React.createElement("div", null, "Your returns"), /*#__PURE__*/React.createElement("div", null, payoff))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Punishment.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/pages/punishment/Punishment.jsx                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => Punishment
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let PunishmentResponse;
module.link("./PunishmentResponse.jsx", {
  default(v) {
    PunishmentResponse = v;
  }

}, 1);
let ContributionsTableResults;
module.link("./ContributionsTableResults.jsx", {
  default(v) {
    ContributionsTableResults = v;
  }

}, 2);

class Punishment extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ContributionsTableResults, this.props), /*#__PURE__*/React.createElement(PunishmentResponse, this.props));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"PunishmentResponse.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/pages/punishment/PunishmentResponse.jsx                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => PunishmentResponse
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
module.link("./punishment.css");

class PunishmentResponse extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = (event, param) => {
      const {
        player
      } = this.props;
      const punished = player.round.get("punished");
      punished[param] = event.target.value;
      player.round.set("punished", punished);
    };

    this.handleClick = (event, player) => {
      event.preventDefault();
      showInput = true;
    };

    this.handleSubmit = event => {
      const {
        player,
        game
      } = this.props;
      event.preventDefault();
      const punished = player.round.get("punished");
      const cumulativePayoff = parseFloat(player.get("cumulativePayoff"));
      let totalPunishmentCost = 0;
      const punishedKeys = Object.keys(punished);
      let negatives = 0;

      for (const key of punishedKeys) {
        if (parseFloat(punished[key]) < 0) {
          negatives += 1;
        }

        totalPunishmentCost += parseFloat(punished[key]) * game.treatment.punishmentCost;
      }

      if (totalPunishmentCost > cumulativePayoff) {
        this.setState({
          formError: "Error: deduction cost exceeds your total coins"
        });
      } else if (negatives > 0) {
        this.setState({
          formError: "Error: deduction cannot be negative"
        });
      } else {
        this.setState({
          formError: ""
        });
      }

      if (totalPunishmentCost > cumulativePayoff || negatives > 0) {} else {
        this.props.player.stage.submit();
      }
    };

    this.state = {
      formError: "",
      amountValid: false,
      punishmentDict: {}
    };
  }

  renderSubmitted() {
    return /*#__PURE__*/React.createElement("div", {
      className: "waiting-response-container"
    }, "Waiting on other players... Please wait until all players are ready");
  }

  renderInput(player) {
    const contribution = player.round.get("contribution");
    return /*#__PURE__*/React.createElement("div", {
      className: "punishment-player-wrapper"
    }, /*#__PURE__*/React.createElement("img", {
      src: player.get("avatar"),
      className: "player-avatar"
    }), /*#__PURE__*/React.createElement("div", null, " Contributed: ", contribution, " Coins "), /*#__PURE__*/React.createElement("input", {
      type: "number",
      id: player._id,
      onChange: event => this.handleChange(event, player._id),
      min: "0",
      placeholder: "# of deductions",
      className: "input-area"
    }));
  }

  renderPlayer(player) {
    const contribution = player.round.get("contribution");
    let showInput = false;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      onClick: event => this.handleClick(event, player)
    }, "Player: ", player._id, /*#__PURE__*/React.createElement("img", {
      src: player.get("avatar"),
      className: "player-avatar"
    }), /*#__PURE__*/React.createElement("div", null, "Contribution: ", contribution, " coins")), showInput ? this.renderInput(player) : null);
  }

  render() {
    const {
      game,
      player
    } = this.props;

    const otherPlayers = _.reject(game.players, p => p._id === player._id);

    const formError = this.state.formError;
    const cumulativePayoff = player.get("cumulativePayoff");
    const punishmentMagnitude = game.treatment.punishmentMagnitude;
    const punishmentCost = game.treatment.punishmentCost;
    const punishmentExists = game.treatment.punishmentExists;

    if (!punishmentExists) {
      if (player.stage.submitted) {
        return this.renderSubmitted();
      } else {
        return /*#__PURE__*/React.createElement("form", {
          onSubmit: this.handleSubmit
        }, /*#__PURE__*/React.createElement("div", {
          className: "center"
        }, /*#__PURE__*/React.createElement("button", {
          type: "submit"
        }, "Next")), /*#__PURE__*/React.createElement("p", {
          className: "center"
        }, formError));
      }
    } // If the player already submitted, don't show the input or submit button


    if (player.stage.submitted) {
      if (cumulativePayoff < 0) {
        return /*#__PURE__*/React.createElement("div", {
          className: "center"
        }, /*#__PURE__*/React.createElement("div", null, "You do not have enough coins to deduct from other players"), this.renderSubmitted());
      }

      return this.renderSubmitted();
    }

    if (cumulativePayoff > 0) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "instructions-text"
      }, /*#__PURE__*/React.createElement("p", null, "It will cost you ", punishmentCost, " coins to impose a deduction of ", punishmentMagnitude, " coins. The costs will be taken directly from your total coins, so you cannot exceed ", Math.floor(cumulativePayoff / punishmentCost), " deductions."), /*#__PURE__*/React.createElement("p", null, "(leaving a deduction input blank is equivalent to no deduction)")), /*#__PURE__*/React.createElement("form", {
        className: "center",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("div", {
        className: "punishment-players-wrapper"
      }, otherPlayers.map(player => this.renderInput(player))), /*#__PURE__*/React.createElement("button", {
        type: "submit"
      }, "Next"), /*#__PURE__*/React.createElement("p", null, formError)));
    } else {
      return /*#__PURE__*/React.createElement("div", null, this.props.player.stage.submit());
    }
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"punishment.css":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/pages/punishment/punishment.css                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// These styles have already been applied to the document.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"common":{"ListView.css":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/common/ListView.css                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// These styles have already been applied to the document.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ListView.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/common/ListView.jsx                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => ListView
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
module.link("./ListView.css");

class ListView extends React.Component {
  renderPlayer(game, playerId, punishments) {
    const player = game.players.find(player => player._id === playerId);
    return /*#__PURE__*/React.createElement("div", {
      className: "center"
    }, /*#__PURE__*/React.createElement("img", {
      src: player.get("avatar"),
      className: "player-avatar-listview"
    }), /*#__PURE__*/React.createElement("div", {
      className: "player-avatar-listview-text"
    }, "x", punishments[playerId]));
  }

  render() {
    const {
      game,
      punishments
    } = this.props;
    let nonzeroPunishments = {};

    for (const key of Object.keys(punishments)) {
      if (punishments[key] != "0") {
        nonzeroPunishments[key] = punishments[key];
      }
    }

    if (Object.keys(nonzeroPunishments).length == 0) {
      return /*#__PURE__*/React.createElement("p", null, " / ");
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "listview-avatar-wrapper"
    }, Object.keys(nonzeroPunishments).map(p => this.renderPlayer(game, p, nonzeroPunishments)));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Table.css":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/common/Table.css                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// These styles have already been applied to the document.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Table.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/common/Table.jsx                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => Table
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
module.link("./Table.css");
let ListView;
module.link("./ListView.jsx", {
  default(v) {
    ListView = v;
  }

}, 1);

class Table extends React.Component {
  render() {
    const {
      players,
      game,
      me,
      punishment,
      round
    } = this.props;
    const poolPayoff = round.get("payoff");
    return /*#__PURE__*/React.createElement("div", {
      className: "table-wrapper"
    }, /*#__PURE__*/React.createElement("table", {
      className: "wrapper"
    }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", {
      className: "tr"
    }, /*#__PURE__*/React.createElement("th", {
      className: "th"
    }, "Player"), /*#__PURE__*/React.createElement("th", {
      className: "th"
    }, "Coins", /*#__PURE__*/React.createElement("br", null), "contributed"), /*#__PURE__*/React.createElement("th", {
      className: "th"
    }, "Coins", /*#__PURE__*/React.createElement("br", null), "withheld"), /*#__PURE__*/React.createElement("th", {
      className: "th"
    }, "Share of public", /*#__PURE__*/React.createElement("br", null), "fund payoff"), punishment && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("th", {
      className: "th"
    }, "Deductions given ", /*#__PURE__*/React.createElement("br", null), " (-", game.treatment.punishmentCost, " coins each)"), /*#__PURE__*/React.createElement("th", {
      className: "th"
    }, "Deductions received ", /*#__PURE__*/React.createElement("br", null), " (-", game.treatment.punishmentMagnitude, " coins each)")), /*#__PURE__*/React.createElement("th", {
      className: "th"
    }, "Total round gains")), players.map((player, i) => {
      const punished = player.round.get("punished");
      const punishedBy = player.round.get("punishedBy");
      const contribution = player.round.get("contribution");
      const endowment = game.treatment.endowment;
      const roundPayoff = player.round.get("roundPayoff");

      if (i == 0 || game.treatment.showOtherSummaries) {
        if (game.treatment.showPunishmentId) {
          return /*#__PURE__*/React.createElement("tr", {
            className: i === 0 ? 'tr back-gray' : 'tr',
            key: i
          }, /*#__PURE__*/React.createElement("td", {
            className: "td"
          }, /*#__PURE__*/React.createElement("img", {
            src: player.get("avatar"),
            className: "avatar"
          })), /*#__PURE__*/React.createElement("td", {
            className: "td"
          }, /*#__PURE__*/React.createElement("h2", null, contribution)), /*#__PURE__*/React.createElement("td", {
            className: "td"
          }, /*#__PURE__*/React.createElement("h2", null, endowment - contribution)), /*#__PURE__*/React.createElement("td", {
            className: "td"
          }, /*#__PURE__*/React.createElement("h2", null, poolPayoff)), punishment && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("td", {
            className: "td"
          }, /*#__PURE__*/React.createElement(ListView, {
            punishments: punished,
            game: game,
            me: me
          })), /*#__PURE__*/React.createElement("td", {
            className: "td"
          }, /*#__PURE__*/React.createElement(ListView, {
            punishments: punishedBy,
            game: game,
            me: me
          }))), /*#__PURE__*/React.createElement("td", {
            className: "td"
          }, /*#__PURE__*/React.createElement("font", {
            color: roundPayoff > 0 ? "green" : "red"
          }, /*#__PURE__*/React.createElement("h2", null, roundPayoff))));
        } else {
          return /*#__PURE__*/React.createElement("tr", {
            className: i === 0 ? 'tr back-gray' : 'tr',
            key: i
          }, /*#__PURE__*/React.createElement("td", {
            className: "td"
          }, /*#__PURE__*/React.createElement("img", {
            src: player.get("avatar"),
            className: "avatar"
          })), /*#__PURE__*/React.createElement("td", {
            className: "td"
          }, /*#__PURE__*/React.createElement("h2", null, contribution)), /*#__PURE__*/React.createElement("td", {
            className: "td"
          }, /*#__PURE__*/React.createElement("h2", null, endowment - contribution)), /*#__PURE__*/React.createElement("td", {
            className: "td"
          }, /*#__PURE__*/React.createElement("h2", null, poolPayoff)), punishment && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("td", {
            className: "td"
          }, /*#__PURE__*/React.createElement("h2", null, Object.values(punished).reduce((a, b) => parseInt(a) + parseInt(b), 0))), /*#__PURE__*/React.createElement("td", {
            className: "td"
          }, /*#__PURE__*/React.createElement("h2", null, Object.values(punishedBy).reduce((a, b) => parseInt(a) + parseInt(b), 0)))), /*#__PURE__*/React.createElement("td", {
            className: "td"
          }, /*#__PURE__*/React.createElement("font", {
            color: roundPayoff > 0 ? "green" : "red"
          }, /*#__PURE__*/React.createElement("h2", null, roundPayoff))));
        }
      }
    }))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Timer.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/common/Timer.jsx                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
let StageTimeWrapper;
module.link("meteor/empirica:core", {
  StageTimeWrapper(v) {
    StageTimeWrapper = v;
  }

}, 0);
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 1);

class timer extends React.Component {
  render() {
    const {
      remainingSeconds
    } = this.props;
    var a = Math.floor(remainingSeconds / 60);
    var b = remainingSeconds % 60;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h4", null, "Timer"), a, ":", b < 10 && 0, b);
  }

}

module.exportDefault(Timer = StageTimeWrapper(timer));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"LeftSidebar.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/LeftSidebar.jsx                                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => GroupView
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Timer;
module.link("./common/Timer.jsx", {
  default(v) {
    Timer = v;
  }

}, 1);
module.link("./Sidebar.css");

class GroupView extends React.Component {
  render() {
    const {
      stage,
      game,
      player
    } = this.props;

    if (stage.name == "contribution") {
      return /*#__PURE__*/React.createElement("div", {
        className: "sidebar-wrapper"
      }, /*#__PURE__*/React.createElement("h4", null, "Your Round Coins"), /*#__PURE__*/React.createElement("span", null, game.treatment.endowment), /*#__PURE__*/React.createElement(Timer, {
        stage: stage
      }));
    } else {
      return /*#__PURE__*/React.createElement("div", {
        className: "sidebar-wrapper"
      }, /*#__PURE__*/React.createElement("h4", null, "Your Round Coins"), /*#__PURE__*/React.createElement("span", null, game.treatment.endowment - player.round.get("contribution")), /*#__PURE__*/React.createElement(Timer, {
        stage: stage
      }));
    }
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"RightSidebar.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/RightSidebar.jsx                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => PlayerSidebar
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
module.link("./Sidebar.css");

class PlayerSidebar extends React.Component {
  render() {
    const {
      game,
      player
    } = this.props;

    const otherPlayers = _.reject(game.players, p => p._id === player._id);

    return /*#__PURE__*/React.createElement("div", {
      className: "sidebar-wrapper"
    }, /*#__PURE__*/React.createElement("img", {
      src: player.get("avatar"),
      className: "profile-avatar"
    }), /*#__PURE__*/React.createElement("h4", null, "Your Total Coins"), /*#__PURE__*/React.createElement("span", null, player.get("cumulativePayoff")), /*#__PURE__*/React.createElement("h4", null, "Other players: ", /*#__PURE__*/React.createElement("span", null, game.treatment.playerCount - 1)), /*#__PURE__*/React.createElement("div", {
      className: "players-wrapper"
    }, otherPlayers.map(p => /*#__PURE__*/React.createElement("img", {
      key: p._id,
      src: p.get("avatar"),
      className: "player-avatar"
    }))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Round.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/Round.jsx                                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => Round
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let RightSidebar;
module.link("./RightSidebar.jsx", {
  default(v) {
    RightSidebar = v;
  }

}, 1);
let LeftSidebar;
module.link("./LeftSidebar.jsx", {
  default(v) {
    LeftSidebar = v;
  }

}, 2);
let Contribution;
module.link("./pages/contribution/Contribution.jsx", {
  default(v) {
    Contribution = v;
  }

}, 3);
let Punishment;
module.link("./pages/punishment/Punishment.jsx", {
  default(v) {
    Punishment = v;
  }

}, 4);
let Outcome;
module.link("./pages/outcome/Outcome.jsx", {
  default(v) {
    Outcome = v;
  }

}, 5);
module.link("./Sidebar.css");
const roundSound = new Audio("sounds/round-sound.mp3");
const gameSound = new Audio("sounds/bell.mp3");

class Round extends React.Component {
  componentDidMount() {
    const {
      game
    } = this.props;

    if (game.get("justStarted")) {
      //play the bell sound only once when the game starts
      gameSound.play();
      game.set("justStarted", false);
    } else {
      roundSound.play();
    }
  }

  render() {
    const {
      stage
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: "round"
    }, /*#__PURE__*/React.createElement(RightSidebar, this.props), /*#__PURE__*/React.createElement("div", {
      className: "body-wrapper"
    }, stage.name === "contribution" && /*#__PURE__*/React.createElement(Contribution, this.props), stage.name === "outcome" && /*#__PURE__*/React.createElement(Punishment, this.props), stage.name === "summary" && /*#__PURE__*/React.createElement(Outcome, this.props)), /*#__PURE__*/React.createElement(LeftSidebar, this.props));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Sidebar.css":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/Sidebar.css                                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// These styles have already been applied to the document.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"exit":{"ExitSurvey.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/exit/ExitSurvey.jsx                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => ExitSurvey
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);

const Radio = (_ref) => {
  let {
    selected,
    name,
    value,
    label,
    onChange
  } = _ref;
  return /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    value: value,
    checked: selected === value,
    onChange: onChange
  }), label);
};

class ExitSurvey extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      age: "",
      gender: "",
      strength: "",
      fair: "",
      feedback: ""
    };

    this.handleChange = event => {
      const el = event.currentTarget;
      this.setState({
        [el.name]: el.value
      });
    };

    this.handleSubmit = event => {
      event.preventDefault();
      this.props.onSubmit(this.state);
    };
  }

  render() {
    const {
      game,
      player
    } = this.props;
    const {
      age,
      gender,
      strength,
      fair,
      feedback,
      education
    } = this.state;
    const earnings = Math.max((player.get("cumulativePayoff") / game.treatment.conversionRate).toFixed(2), 0);
    const basePay = game.treatment.basePay;
    const totalPay = (parseFloat(basePay) + parseFloat(earnings)).toFixed(2);
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "exit-survey"
    }, /*#__PURE__*/React.createElement("h1", null, " Exit Survey "), /*#__PURE__*/React.createElement("p", null, "Please submit the following code to receive your bonus: ", /*#__PURE__*/React.createElement("strong", null, "C2A8NL83")), /*#__PURE__*/React.createElement("p", null, "You will receive a base payment of ", /*#__PURE__*/React.createElement("strong", null, "$", basePay), ", in addition to a performance bonus of ", /*#__PURE__*/React.createElement("strong", null, "$", earnings), ", for a total of ", /*#__PURE__*/React.createElement("strong", null, "$", totalPay), "."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, "Please answer the following short survey. You do not have to provide any information you feel uncomfortable with."), /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-line"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "age"
    }, "Age"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
      id: "age",
      type: "number",
      min: "0",
      max: "150",
      step: "1",
      dir: "auto",
      name: "age",
      value: age,
      onChange: this.handleChange
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "gender"
    }, "Gender"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
      id: "gender",
      type: "text",
      dir: "auto",
      name: "gender",
      value: gender,
      onChange: this.handleChange,
      autoComplete: "off"
    })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, "Highest Education Qualification"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Radio, {
      selected: education,
      name: "education",
      value: "high-school",
      label: "High School",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: education,
      name: "education",
      value: "bachelor",
      label: "US Bachelor's Degree",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: education,
      name: "education",
      value: "master",
      label: "Master's or higher",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: education,
      name: "education",
      value: "other",
      label: "Other",
      onChange: this.handleChange
    }))), /*#__PURE__*/React.createElement("div", {
      className: "form-line thirds"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "strength"
    }, "How would you describe your strategy in the game?"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("textarea", {
      dir: "auto",
      id: "strength",
      name: "strength",
      value: strength,
      onChange: this.handleChange
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "fair"
    }, "Do you feel you were fairly compensated for your time?"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("textarea", {
      dir: "auto",
      id: "fair",
      name: "fair",
      value: fair,
      onChange: this.handleChange
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "feedback"
    }, "Feedback, including problems you encountered."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("textarea", {
      dir: "auto",
      id: "feedback",
      name: "feedback",
      value: feedback,
      onChange: this.handleChange
    })))), /*#__PURE__*/React.createElement("button", {
      type: "submit"
    }, "Submit"))));
  }

}

ExitSurvey.stepName = "ExitSurvey";
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Sorry.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/exit/Sorry.jsx                                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => Sorry
});
let React, Component;
module.link("react", {
  default(v) {
    React = v;
  },

  Component(v) {
    Component = v;
  }

}, 0);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 1);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 2);

class Sorry extends Component {
  render() {
    const {
      player,
      game
    } = this.props;
    const basePay = game.treatment.basePay;
    let msg;

    switch (player.exitStatus) {
      case "gameFull":
        msg = "Unfortunately, all games are full. Please submit the task with the code C5LWTCFM, and you will be compensated for your time via partial payment.";
        break;

      case "gameLobbyTimedOut":
        msg = "Unfortunately, not enough players joined to begin the game. Please submit the task with the code C5LWTCFM, and you will be compensated for your time via partial payment.";
        break;

      case "playerEndedLobbyWait":
        msg = "You decided to stop waiting, we are sorry it was too long a wait. Please return the task.";
        break;

      default:
        msg = "Unfortunately, the game is unable to launch. Please submit the task with the code C5LWTCFM";
        break;
    }

    if (player.exitReason === "failedQuestion") {
      msg = "Unfortunately, you did not meet the conditions required to play the game. Please submit the task with the code CGUQ2ZQU, and you will be compensated for your time via partial payment. ";
    } // Only for dev


    if (!game && Meteor.isDevelopment) {
      msg = "Unfortunately the Game was cancelled because of failed to init Game (only visible in development, check the logs).";
    }

    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Sorry!"), /*#__PURE__*/React.createElement("p", null, "Sorry, you were not able to play today! ", msg), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Please contact the researcher to see if there are more games available."))));
  }

}

Sorry.stepName = "Sorry";
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Thanks.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/exit/Thanks.jsx                                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => Thanks
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);

class Thanks extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "finished"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Finished!"), /*#__PURE__*/React.createElement("p", null, "Thank you for participating! Please submit the following code: ", /*#__PURE__*/React.createElement("strong", null, "C2A8NL83"))));
  }

}

Thanks.stepName = "Thanks";
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"intro":{"Consent.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/Consent.jsx                                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => Consent
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Centered, ConsentButton;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  },

  ConsentButton(v) {
    ConsentButton = v;
  }

}, 1);

class Consent extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "consent"
    }, /*#__PURE__*/React.createElement("h1", null, " Consent Form "), /*#__PURE__*/React.createElement("p", null, "This experiment is part of a MIT scientific project. Your decision to participate in this experiment is entirely voluntary. There are no known or anticipated risks to participating in this experiment. There is no way for us to identify you. The only information we will have, in addition to your responses, is the timestamps of your interactions with our site. The results of our research may be presented at scientific meetings or published in scientific journals. Clicking on the \"AGREE\" button indicates that you are at least 18 years of age, and agree to participate voluntary."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(ConsentButton, {
      text: "I AGREE"
    })));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"InstructionStepOne.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/InstructionStepOne.jsx                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => InstructionStepOne
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
module.link("./Instructions.css");
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);

class InstructionStepOne extends React.Component {
  render() {
    const {
      hasPrev,
      hasNext,
      onNext,
      onPrev,
      game
    } = this.props;
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "instructions"
    }, /*#__PURE__*/React.createElement("h1", null, " How the game works: "), /*#__PURE__*/React.createElement("p", null, "In this multi-player game, you will be in a group. Each person is given a set amount of coins at the start of each round. You will also be shown a money multiplier. There will be a public fund that you can choose to contribute to\u2014you will not be able to see others' contributions before making your own. After everyone has contributed, the amount in the public fund will be multiplied by the money multiplier."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, "This amount is then evenly divided among the group as the \"payoff\". You get to keep the payoff and whatever you have left of your private funds. The diagram below shows an example:"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("img", {
      className: "public-fund-img",
      src: "/experiment/images/explanation.png"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, "In this example, three players chose to contribute all 20 coins they were granted for the round, while one player contributed 0 coins. The total contribution, 60 coins, is then multiplied by a factor of 2, making the total size of the public fund then 120 coins, which is equally distributed among the four players."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("h1", null, " Total coins and cash earnings: "), /*#__PURE__*/React.createElement("p", null, "You will have a total balance of coins throughout the game, with each round's earnings being added to this amount. Try to maximize your total coins! When the game concludes, the coins will be converted to a cash bonus towards your final payment."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "You will receive a base payment of $", game.treatment.basePay, " for your participation in the game, in addition to $1 per ", game.treatment.conversionRate, " coins earned. To receive the bonus payment, please be sure to stay for all rounds of the game; the exit survey marks the end of the game and contains the code for submission. If you are detected to be idle, you forfeit the bonus amount.")), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onPrev,
      disabled: !hasPrev
    }, "Previous"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onNext,
      disabled: !hasNext
    }, "Next")), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null)));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"InstructionStepTwo.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/InstructionStepTwo.jsx                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => InstructionStepTwo
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
module.link("./Instructions.css");
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);

class InstructionStepTwo extends React.Component {
  render() {
    const {
      hasPrev,
      hasNext,
      onNext,
      onPrev,
      game
    } = this.props;
    const punishmentMagnitude = game.treatment.punishmentMagnitude;
    const punishmentCost = game.treatment.punishmentCost;
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "instructions"
    }, /*#__PURE__*/React.createElement("h1", null, " Viewing the group's contributions: "), /*#__PURE__*/React.createElement("p", null, "After each round of contributions, you will be able to see how much each member contributed, as shown below:"), /*#__PURE__*/React.createElement("img", {
      src: "/experiment/images/InstructionsPunishment.png",
      className: "instructions-img-punishment"
    }), /*#__PURE__*/React.createElement("h1", null, " Deductions: "), /*#__PURE__*/React.createElement("p", null, "You have the ability to deduct coins from other players, but doing so comes at a cost. Each deduction you impose will deduct ", punishmentMagnitude, " coins from the intended player and ", punishmentCost, " coins from your total coins. You can deduct coins from other players as long as you have a positive number of total coins."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onPrev,
      disabled: !hasPrev
    }, "Previous"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onNext,
      disabled: !hasNext
    }, "Next"))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Instructions.css":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/Instructions.css                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// These styles have already been applied to the document.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"NewPlayer.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/NewPlayer.jsx                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => NewPlayer
});
let React, Component;
module.link("react", {
  default(v) {
    React = v;
  },

  Component(v) {
    Component = v;
  }

}, 0);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);

class NewPlayer extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      id: ""
    };

    this.handleUpdate = event => {
      const {
        value,
        name
      } = event.currentTarget;
      this.setState({
        [name]: value
      });
    };

    this.handleSubmit = event => {
      event.preventDefault();
      const {
        handleNewPlayer
      } = this.props;
      const {
        id
      } = this.state;
      handleNewPlayer(id);
    };
  }

  render() {
    const {
      id
    } = this.state;
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("h1", null, "Identification"), /*#__PURE__*/React.createElement("p", null, "Please enter your id:"), /*#__PURE__*/React.createElement("input", {
      dir: "auto",
      type: "text",
      name: "id",
      id: "id",
      value: id,
      onChange: this.handleUpdate,
      required: true,
      autoComplete: "off"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("button", {
      type: "submit"
    }, "Submit")))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Quiz.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/Quiz.jsx                                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => Quiz
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);

class Quiz extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      players: "",
      punishment: "",
      payoff: "",
      kept: ""
    };

    this.handleChange = event => {
      const el = event.currentTarget;
      this.setState({
        [el.name]: el.value.trim().toLowerCase()
      });
    };

    this.handleSubmit = (players, punishmentMagnitude, punishmentExists) => event => {
      event.preventDefault();

      if (this.state.players !== String(players - 1) || this.state.punishment !== String(2 * punishmentMagnitude) && punishmentExists || this.state.payoff != "10" || this.state.kept != "6") {
        alert("You have an incorrect answer; please read the instructions and try again.");
      } else {
        this.props.onNext();
      }
    };
  }

  render() {
    const {
      hasPrev,
      hasNext,
      onNext,
      onPrev,
      game
    } = this.props;
    const {
      players,
      punishment,
      payoff,
      kept
    } = this.state;
    const playerCount = game.treatment.playerCount;
    const punishmentExists = game.treatment.punishmentExists;
    const punishmentMagnitude = game.treatment.punishmentMagnitude;
    const punishmentCost = game.treatment.punishmentCost;
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "quiz"
    }, /*#__PURE__*/React.createElement("h1", null, " Quiz "), /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handleSubmit(playerCount, punishmentMagnitude, punishmentExists)
    }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "sum"
    }, " ", "In this game there will be a total of ", playerCount, " players. How many players are there other than yourself?", " "), /*#__PURE__*/React.createElement("input", {
      type: "text",
      dir: "auto",
      id: "sum",
      name: "players",
      placeholder: "e.g. 1",
      value: players,
      onChange: this.handleChange,
      autoComplete: "off",
      required: true
    })), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "horse"
    }, " ", "Imagine that in a given round, you have a starting fund of 10 coins. If you contribute 4 coins, how much of your starting funds do you keep?"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      dir: "auto",
      id: "kept",
      name: "kept",
      placeholder: "e.g. 10",
      value: kept,
      onChange: this.handleChange,
      autoComplete: "off",
      required: true
    })), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "horse"
    }, "Imagine that in a given round, the money multiplier is 2, there are only 3 players, and players contributed the following amounts:", /*#__PURE__*/React.createElement("div", null, " Player 1: 10 Coins "), " ", /*#__PURE__*/React.createElement("div", null, " Player 2: 4 Coins "), /*#__PURE__*/React.createElement("div", null, " Player 3: 1 Coins "), /*#__PURE__*/React.createElement("br", null), "What is the round payoff? (round payoff = sum of contributions x multiplier / the number of players)", " "), /*#__PURE__*/React.createElement("input", {
      type: "text",
      dir: "auto",
      id: "payoff",
      name: "payoff",
      placeholder: "e.g. 20",
      value: payoff,
      onChange: this.handleChange,
      autoComplete: "off",
      required: true
    })), punishmentExists && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "horse"
    }, "Each deduction you impose on another player deducts", " ", punishmentMagnitude, " coins from them, and costs you ", " ", punishmentCost, " coins. If you spend ", " ", 2 * punishmentCost, " coins to deduct from another player, how many coins will be deducted from them?"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      dir: "auto",
      id: "punishment",
      name: "punishment",
      placeholder: "e.g. 2",
      value: punishment,
      onChange: this.handleChange,
      autoComplete: "off",
      required: true
    }))), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onPrev,
      disabled: !hasPrev
    }, "Back to instructions"), /*#__PURE__*/React.createElement("button", {
      type: "submit"
    }, "Submit")))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"QuizCopy.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/QuizCopy.jsx                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => QuizCopy
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);

class QuizCopy extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      both: "",
      falseB: "",
      falseA: "",
      neither: ""
    };

    this.onChangeValue = event => {
      console.log(event.target.value);
      console.log(event.target.name);
      this.setState({
        [event.target.name]: event.target.value
      });
    };

    this.handleSubmit = event => {
      event.preventDefault();

      if (this.state.both !== "220 points" || this.state.falseB !== "105 points" || this.state.falseA !== "205 points" || this.state.neither !== "100 points") {
        alert("Incorrect! Read the instructions, and please try again.");
      } else {
        this.props.onNext();
      }
    };
  }

  render() {
    const {
      hasPrev,
      hasNext,
      onNext,
      onPrev
    } = this.props;
    const {
      both,
      falseA,
      falseB,
      neither
    } = this.state;
    const answerOptions = [{
      answerText: "220 points",
      correct: "both"
    }, {
      answerText: "105 points",
      correct: "falseB"
    }, {
      answerText: "205 points",
      correct: "falseA"
    }, {
      answerText: "100 points",
      correct: "neither"
    }];
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "quiz"
    }, /*#__PURE__*/React.createElement("h1", null, "Quiz "), /*#__PURE__*/React.createElement("h3", null, "Before we start, we would like to introduce the structure of the game and check whether you have truly understood the structure of the game."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Imagine the following game:"), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null), /*#__PURE__*/React.createElement("th", null, "Player B contributes"), /*#__PURE__*/React.createElement("th", null, "Player B doesn't contribute")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "You contribute"), /*#__PURE__*/React.createElement("th", null, "220 / 220"), /*#__PURE__*/React.createElement("th", null, "105 / 205")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, " You don't contribute "), /*#__PURE__*/React.createElement("th", null, "205 / 105"), /*#__PURE__*/React.createElement("th", null, "100 / 100")))), /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "sum"
    }, "Imagine that you contributed to the common pool. If Player B contributes, you get:"), answerOptions.map(answerOption => /*#__PURE__*/React.createElement("div", {
      onChange: this.onChangeValue
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "both",
      value: answerOption.answerText
    }), answerOption.answerText))), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "horse"
    }, "Imagine that you contributed to the common pool. If Player B doesn't contribute, you get:"), answerOptions.map(answerOption => /*#__PURE__*/React.createElement("div", {
      onChange: this.onChangeValue
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "falseB",
      value: answerOption.answerText
    }), answerOption.answerText))), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "sum"
    }, "Imagine that you didn't contribute to the common pool. If Player B contributes, you get:"), answerOptions.map(answerOption => /*#__PURE__*/React.createElement("div", {
      onChange: this.onChangeValue
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "falseA",
      value: answerOption.answerText
    }), answerOption.answerText))), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "sum"
    }, "Imagine that you didn't contribute to the common pool. If Player B doesn't contribute, you get:"), answerOptions.map(answerOption => /*#__PURE__*/React.createElement("div", {
      onChange: this.onChangeValue
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "neither",
      value: answerOption.answerText
    }), answerOption.answerText))), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onPrev,
      disabled: !hasPrev
    }, "Back to instructions"), /*#__PURE__*/React.createElement("button", {
      type: "submit"
    }, "Submit")))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"main.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/main.js                                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
let Empirica;
module.link("meteor/empirica:core", {
  default(v) {
    Empirica = v;
  }

}, 0);
let render;
module.link("react-dom", {
  render(v) {
    render = v;
  }

}, 1);
let ExitSurvey;
module.link("./exit/ExitSurvey", {
  default(v) {
    ExitSurvey = v;
  }

}, 2);
let Thanks;
module.link("./exit/Thanks", {
  default(v) {
    Thanks = v;
  }

}, 3);
let Sorry;
module.link("./exit/Sorry", {
  default(v) {
    Sorry = v;
  }

}, 4);
let About;
module.link("./game/pages/about/About", {
  default(v) {
    About = v;
  }

}, 5);
let Round;
module.link("./game/Round", {
  default(v) {
    Round = v;
  }

}, 6);
let Consent;
module.link("./intro/Consent", {
  default(v) {
    Consent = v;
  }

}, 7);
let InstructionStepOne;
module.link("./intro/InstructionStepOne", {
  default(v) {
    InstructionStepOne = v;
  }

}, 8);
let InstructionStepTwo;
module.link("./intro/InstructionStepTwo", {
  default(v) {
    InstructionStepTwo = v;
  }

}, 9);
let QuizCopy;
module.link("./intro/QuizCopy", {
  default(v) {
    QuizCopy = v;
  }

}, 10);
let Quiz;
module.link("./intro/Quiz", {
  default(v) {
    Quiz = v;
  }

}, 11);
let NewPlayer;
module.link("./intro/NewPlayer", {
  default(v) {
    NewPlayer = v;
  }

}, 12);
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 13);
// Set the About Component you want to use for the About dialog (optional).
Empirica.about(About); // Set the Consent Component you want to present players (optional).

Empirica.consent(Consent); // Set the component for getting the player id (optional)

Empirica.newPlayer(NewPlayer); // Introduction pages to show before they play the game (optional).
// At this point they have been assigned a treatment. You can return
// different instruction steps depending on the assigned treatment.

Empirica.introSteps((game, treatment) => {
  const steps = [InstructionStepOne];

  if (treatment.punishmentExists) {
    steps.push(InstructionStepTwo);
  }

  steps.push(Quiz);
  return steps;
}); // The Round component containing the game UI logic.
// This is where you will be doing the most development.
// See client/game/Round.jsx to learn more.

Empirica.round(Round); // End of Game pages. These may vary depending on player or game information.
// For example we can show the score of the user, or we can show them a
// different message if they actually could not participate the game (timed
// out), etc.
// The last step will be the last page shown to user and will be shown to the
// user if they come back to the website.
// If you don't return anything, or do not define this function, a default
// exit screen will be shown.

Empirica.exitSteps((game, player) => {
  if (!game || player.exitStatus && player.exitStatus !== "finished" && player.exitReason !== "playerQuit") {
    return [Sorry];
  }

  return [ExitSurvey, Thanks];
});

const Breadcrumb = (_ref) => {
  let {
    round,
    stage,
    game
  } = _ref;
  return /*#__PURE__*/React.createElement("ul", {
    className: "bp3-breadcrumbs round-nav"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    className: "bp3-breadcrumb",
    tabIndex: "0"
  }, "Round ", round.index + 1, game.treatment.showNRounds ? "/" + game.treatment.numRounds : "")), round.stages.map(s => /*#__PURE__*/React.createElement("li", {
    key: s.name,
    className: s.name === stage.name ? "bp3-breadcrumb-current" : "bp3-breadcrumb"
  }, s.displayName)));
};

Empirica.breadcrumb(Breadcrumb); // Start the app render tree.
// NB: This must be called after any other Empirica calls (Empirica.round(),
// Empirica.introSteps(), ...).
// It is required and usually does not need changing.

Meteor.startup(() => {
  render(Empirica.routes(), document.getElementById("app"));
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".less",
    ".css",
    ".mjs",
    ".jsx"
  ]
});

var exports = require("/client/main.js");