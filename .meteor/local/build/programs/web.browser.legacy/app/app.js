var require = meteorInstall({"client":{"game":{"pages":{"about":{"About.jsx":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/game/pages/about/About.jsx                                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _createSuper;

module.link("@babel/runtime/helpers/createSuper", {
  default: function (v) {
    _createSuper = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);
module.export({
  "default": function () {
    return About;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);

var About = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(About, _React$Component);

  var _super = _createSuper(About);

  function About() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = About.prototype;

  _proto.render = function () {
    function render() {
      return /*#__PURE__*/React.createElement("div", null, "Here be the presentation of the experiement(ers).");
    }

    return render;
  }();

  return About;
}(React.Component);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"contribution":{"Contribution.css":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/game/pages/contribution/Contribution.css                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
// These styles have already been applied to the document.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Contribution.jsx":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/game/pages/contribution/Contribution.jsx                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _createSuper;

module.link("@babel/runtime/helpers/createSuper", {
  default: function (v) {
    _createSuper = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);
module.export({
  "default": function () {
    return Contribution;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
module.link("./Contribution.css");

var Contribution = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Contribution, _React$Component);

  var _super = _createSuper(Contribution);

  function Contribution() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleChange = function (event) {
      var _this$props = _this.props,
          player = _this$props.player,
          game = _this$props.game;
      var value = parseFloat(event.target.value);

      if (value > game.treatment.endowment) {
        value = game.treatment.endowment;
      }

      if (!value) {
        value = 0;
      }

      player.round.set("contribution", value);
    };

    _this.handleSubmit = function (event) {
      event.preventDefault();

      _this.props.player.stage.submit();
    };

    _this.handleSubmitAll = function (event) {
      var _this$props2 = _this.props,
          game = _this$props2.game,
          player = _this$props2.player;
      player.round.set("contribution", game.treatment.endowment);

      _this.props.player.stage.submit();
    };

    _this.handleSubmitNone = function (event) {
      var player = _this.props.player;
      player.round.set("contribution", 0);

      _this.props.player.stage.submit();
    };

    return _this;
  }

  var _proto = Contribution.prototype;

  _proto.render = function () {
    function render() {
      var _this$props3 = this.props,
          player = _this$props3.player,
          game = _this$props3.game;
      var multiplier = game.treatment.multiplier;
      var contribution = player.round.get("contribution");
      var endowment = game.treatment.endowment;
      var keep = endowment - parseFloat(contribution);

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

    return render;
  }();

  return Contribution;
}(React.Component);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"outcome":{"Outcome.jsx":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/game/pages/outcome/Outcome.jsx                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _createSuper;

module.link("@babel/runtime/helpers/createSuper", {
  default: function (v) {
    _createSuper = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);
module.export({
  "default": function () {
    return Outcome;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var Table;
module.link("../../common/Table.jsx", {
  "default": function (v) {
    Table = v;
  }
}, 1);

var Outcome = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Outcome, _React$Component);

  var _super = _createSuper(Outcome);

  function Outcome() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.onNext = function (event) {
      event.preventDefault();

      _this.props.player.stage.submit();
    };

    return _this;
  }

  var _proto = Outcome.prototype;

  _proto.renderSubmitted = function () {
    function renderSubmitted() {
      return /*#__PURE__*/React.createElement("div", {
        className: "waiting-response-container"
      }, "Waiting on other players... Please wait until all players are ready");
    }

    return renderSubmitted;
  }();

  _proto.render = function () {
    function render() {
      var _this$props = this.props,
          game = _this$props.game,
          player = _this$props.player,
          round = _this$props.round;
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

    return render;
  }();

  return Outcome;
}(React.Component);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"punishment":{"ContributionsTableResults.jsx":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/game/pages/punishment/ContributionsTableResults.jsx                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _createSuper;

module.link("@babel/runtime/helpers/createSuper", {
  default: function (v) {
    _createSuper = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);
module.export({
  "default": function () {
    return ContributionsTableResults;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
module.link("./punishment.css");

var ContributionsTableResults = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(ContributionsTableResults, _React$Component);

  var _super = _createSuper(ContributionsTableResults);

  function ContributionsTableResults() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ContributionsTableResults.prototype;

  _proto.render = function () {
    function render() {
      var _this$props = this.props,
          game = _this$props.game,
          round = _this$props.round,
          player = _this$props.player;
      var totalContributions = round.get("totalContributions");
      var contribution = player.round.get("contribution");
      var multiplier = game.treatment.multiplier;
      var playerCount = game.treatment.playerCount;
      var totalReturns = round.get("totalReturns");
      var payoff = round.get("payoff");
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

    return render;
  }();

  return ContributionsTableResults;
}(React.Component);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Punishment.jsx":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/game/pages/punishment/Punishment.jsx                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _createSuper;

module.link("@babel/runtime/helpers/createSuper", {
  default: function (v) {
    _createSuper = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);
module.export({
  "default": function () {
    return Punishment;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var PunishmentResponse;
module.link("./PunishmentResponse.jsx", {
  "default": function (v) {
    PunishmentResponse = v;
  }
}, 1);
var ContributionsTableResults;
module.link("./ContributionsTableResults.jsx", {
  "default": function (v) {
    ContributionsTableResults = v;
  }
}, 2);

var Punishment = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Punishment, _React$Component);

  var _super = _createSuper(Punishment);

  function Punishment() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Punishment.prototype;

  _proto.render = function () {
    function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ContributionsTableResults, this.props), /*#__PURE__*/React.createElement(PunishmentResponse, this.props));
    }

    return render;
  }();

  return Punishment;
}(React.Component);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"PunishmentResponse.jsx":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/game/pages/punishment/PunishmentResponse.jsx                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _createSuper;

module.link("@babel/runtime/helpers/createSuper", {
  default: function (v) {
    _createSuper = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);
module.export({
  "default": function () {
    return PunishmentResponse;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
module.link("./punishment.css");

var PunishmentResponse = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(PunishmentResponse, _React$Component);

  var _super = _createSuper(PunishmentResponse);

  function PunishmentResponse(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleChange = function (event, param) {
      var player = _this.props.player;
      var punished = player.round.get("punished");
      punished[param] = event.target.value;
      player.round.set("punished", punished);
    };

    _this.handleClick = function (event, player) {
      event.preventDefault();
      showInput = true;
    };

    _this.handleSubmit = function (event) {
      var _this$props = _this.props,
          player = _this$props.player,
          game = _this$props.game;
      event.preventDefault();
      var punished = player.round.get("punished");
      var cumulativePayoff = parseFloat(player.get("cumulativePayoff"));
      var totalPunishmentCost = 0;
      var punishedKeys = Object.keys(punished);
      var negatives = 0;

      for (var _i = 0, _punishedKeys = punishedKeys; _i < _punishedKeys.length; _i++) {
        var key = _punishedKeys[_i];

        if (parseFloat(punished[key]) < 0) {
          negatives += 1;
        }

        totalPunishmentCost += parseFloat(punished[key]) * game.treatment.punishmentCost;
      }

      if (totalPunishmentCost > cumulativePayoff) {
        _this.setState({
          formError: "Error: deduction cost exceeds your total coins"
        });
      } else if (negatives > 0) {
        _this.setState({
          formError: "Error: deduction cannot be negative"
        });
      } else {
        _this.setState({
          formError: ""
        });
      }

      if (totalPunishmentCost > cumulativePayoff || negatives > 0) {} else {
        _this.props.player.stage.submit();
      }
    };

    _this.state = {
      formError: "",
      amountValid: false,
      punishmentDict: {}
    };
    return _this;
  }

  var _proto = PunishmentResponse.prototype;

  _proto.renderSubmitted = function () {
    function renderSubmitted() {
      return /*#__PURE__*/React.createElement("div", {
        className: "waiting-response-container"
      }, "Waiting on other players... Please wait until all players are ready");
    }

    return renderSubmitted;
  }();

  _proto.renderInput = function () {
    function renderInput(player) {
      var _this2 = this;

      var contribution = player.round.get("contribution");
      return /*#__PURE__*/React.createElement("div", {
        className: "punishment-player-wrapper"
      }, /*#__PURE__*/React.createElement("img", {
        src: player.get("avatar"),
        className: "player-avatar"
      }), /*#__PURE__*/React.createElement("div", null, " Contributed: ", contribution, " Coins "), /*#__PURE__*/React.createElement("input", {
        type: "number",
        id: player._id,
        onChange: function (event) {
          return _this2.handleChange(event, player._id);
        },
        min: "0",
        placeholder: "# of deductions",
        className: "input-area"
      }));
    }

    return renderInput;
  }();

  _proto.renderPlayer = function () {
    function renderPlayer(player) {
      var _this3 = this;

      var contribution = player.round.get("contribution");
      var showInput = false;
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
        onClick: function (event) {
          return _this3.handleClick(event, player);
        }
      }, "Player: ", player._id, /*#__PURE__*/React.createElement("img", {
        src: player.get("avatar"),
        className: "player-avatar"
      }), /*#__PURE__*/React.createElement("div", null, "Contribution: ", contribution, " coins")), showInput ? this.renderInput(player) : null);
    }

    return renderPlayer;
  }();

  _proto.render = function () {
    function render() {
      var _this4 = this;

      var _this$props2 = this.props,
          game = _this$props2.game,
          player = _this$props2.player;

      var otherPlayers = _.reject(game.players, function (p) {
        return p._id === player._id;
      });

      var formError = this.state.formError;
      var cumulativePayoff = player.get("cumulativePayoff");
      var punishmentMagnitude = game.treatment.punishmentMagnitude;
      var punishmentCost = game.treatment.punishmentCost;
      var punishmentExists = game.treatment.punishmentExists;

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
        }, otherPlayers.map(function (player) {
          return _this4.renderInput(player);
        })), /*#__PURE__*/React.createElement("button", {
          type: "submit"
        }, "Next"), /*#__PURE__*/React.createElement("p", null, formError)));
      } else {
        return /*#__PURE__*/React.createElement("div", null, this.props.player.stage.submit());
      }
    }

    return render;
  }();

  return PunishmentResponse;
}(React.Component);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"punishment.css":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/game/pages/punishment/punishment.css                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
// These styles have already been applied to the document.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"common":{"ListView.css":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/game/common/ListView.css                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
// These styles have already been applied to the document.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ListView.jsx":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/game/common/ListView.jsx                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _createSuper;

module.link("@babel/runtime/helpers/createSuper", {
  default: function (v) {
    _createSuper = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);
module.export({
  "default": function () {
    return ListView;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
module.link("./ListView.css");

var ListView = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(ListView, _React$Component);

  var _super = _createSuper(ListView);

  function ListView() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ListView.prototype;

  _proto.renderPlayer = function () {
    function renderPlayer(game, playerId, punishments) {
      var player = game.players.find(function (player) {
        return player._id === playerId;
      });
      return /*#__PURE__*/React.createElement("div", {
        className: "center"
      }, /*#__PURE__*/React.createElement("img", {
        src: player.get("avatar"),
        className: "player-avatar-listview"
      }), /*#__PURE__*/React.createElement("div", {
        className: "player-avatar-listview-text"
      }, "x", punishments[playerId]));
    }

    return renderPlayer;
  }();

  _proto.render = function () {
    function render() {
      var _this = this;

      var _this$props = this.props,
          game = _this$props.game,
          punishments = _this$props.punishments;
      var nonzeroPunishments = {};

      for (var _i = 0, _Object$keys = Object.keys(punishments); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];

        if (punishments[key] != "0") {
          nonzeroPunishments[key] = punishments[key];
        }
      }

      if (Object.keys(nonzeroPunishments).length == 0) {
        return /*#__PURE__*/React.createElement("p", null, " / ");
      }

      return /*#__PURE__*/React.createElement("div", {
        className: "listview-avatar-wrapper"
      }, Object.keys(nonzeroPunishments).map(function (p) {
        return _this.renderPlayer(game, p, nonzeroPunishments);
      }));
    }

    return render;
  }();

  return ListView;
}(React.Component);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Table.css":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/game/common/Table.css                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
// These styles have already been applied to the document.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Table.jsx":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/game/common/Table.jsx                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _createSuper;

module.link("@babel/runtime/helpers/createSuper", {
  default: function (v) {
    _createSuper = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);
module.export({
  "default": function () {
    return Table;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
module.link("./Table.css");
var ListView;
module.link("./ListView.jsx", {
  "default": function (v) {
    ListView = v;
  }
}, 1);

var Table = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Table, _React$Component);

  var _super = _createSuper(Table);

  function Table() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Table.prototype;

  _proto.render = function () {
    function render() {
      var _this$props = this.props,
          players = _this$props.players,
          game = _this$props.game,
          me = _this$props.me,
          punishment = _this$props.punishment,
          round = _this$props.round;
      var poolPayoff = round.get("payoff");
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
      }, "Total round gains")), players.map(function (player, i) {
        var punished = player.round.get("punished");
        var punishedBy = player.round.get("punishedBy");
        var contribution = player.round.get("contribution");
        var endowment = game.treatment.endowment;
        var roundPayoff = player.round.get("roundPayoff");

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
            }, /*#__PURE__*/React.createElement("h2", null, Object.values(punished).reduce(function (a, b) {
              return parseInt(a) + parseInt(b);
            }, 0))), /*#__PURE__*/React.createElement("td", {
              className: "td"
            }, /*#__PURE__*/React.createElement("h2", null, Object.values(punishedBy).reduce(function (a, b) {
              return parseInt(a) + parseInt(b);
            }, 0)))), /*#__PURE__*/React.createElement("td", {
              className: "td"
            }, /*#__PURE__*/React.createElement("font", {
              color: roundPayoff > 0 ? "green" : "red"
            }, /*#__PURE__*/React.createElement("h2", null, roundPayoff))));
          }
        }
      }))));
    }

    return render;
  }();

  return Table;
}(React.Component);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Timer.jsx":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/game/common/Timer.jsx                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _createSuper;

module.link("@babel/runtime/helpers/createSuper", {
  default: function (v) {
    _createSuper = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);
var StageTimeWrapper;
module.link("meteor/empirica:core", {
  StageTimeWrapper: function (v) {
    StageTimeWrapper = v;
  }
}, 0);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 1);

var timer = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(timer, _React$Component);

  var _super = _createSuper(timer);

  function timer() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = timer.prototype;

  _proto.render = function () {
    function render() {
      var remainingSeconds = this.props.remainingSeconds;
      var a = Math.floor(remainingSeconds / 60);
      var b = remainingSeconds % 60;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h4", null, "Timer"), a, ":", b < 10 && 0, b);
    }

    return render;
  }();

  return timer;
}(React.Component);

module.exportDefault(Timer = StageTimeWrapper(timer));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"LeftSidebar.jsx":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/game/LeftSidebar.jsx                                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _createSuper;

module.link("@babel/runtime/helpers/createSuper", {
  default: function (v) {
    _createSuper = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);
module.export({
  "default": function () {
    return GroupView;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var Timer;
module.link("./common/Timer.jsx", {
  "default": function (v) {
    Timer = v;
  }
}, 1);
module.link("./Sidebar.css");

var GroupView = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(GroupView, _React$Component);

  var _super = _createSuper(GroupView);

  function GroupView() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = GroupView.prototype;

  _proto.render = function () {
    function render() {
      var _this$props = this.props,
          stage = _this$props.stage,
          game = _this$props.game,
          player = _this$props.player;

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

    return render;
  }();

  return GroupView;
}(React.Component);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"RightSidebar.jsx":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/game/RightSidebar.jsx                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _createSuper;

module.link("@babel/runtime/helpers/createSuper", {
  default: function (v) {
    _createSuper = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);
module.export({
  "default": function () {
    return PlayerSidebar;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
module.link("./Sidebar.css");

var PlayerSidebar = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(PlayerSidebar, _React$Component);

  var _super = _createSuper(PlayerSidebar);

  function PlayerSidebar() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = PlayerSidebar.prototype;

  _proto.render = function () {
    function render() {
      var _this$props = this.props,
          game = _this$props.game,
          player = _this$props.player;

      var otherPlayers = _.reject(game.players, function (p) {
        return p._id === player._id;
      });

      return /*#__PURE__*/React.createElement("div", {
        className: "sidebar-wrapper"
      }, /*#__PURE__*/React.createElement("img", {
        src: player.get("avatar"),
        className: "profile-avatar"
      }), /*#__PURE__*/React.createElement("h4", null, "Your Total Coins"), /*#__PURE__*/React.createElement("span", null, player.get("cumulativePayoff")), /*#__PURE__*/React.createElement("h4", null, "Other players: ", /*#__PURE__*/React.createElement("span", null, game.treatment.playerCount - 1)), /*#__PURE__*/React.createElement("div", {
        className: "players-wrapper"
      }, otherPlayers.map(function (p) {
        return /*#__PURE__*/React.createElement("img", {
          key: p._id,
          src: p.get("avatar"),
          className: "player-avatar"
        });
      })));
    }

    return render;
  }();

  return PlayerSidebar;
}(React.Component);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Round.jsx":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/game/Round.jsx                                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _createSuper;

module.link("@babel/runtime/helpers/createSuper", {
  default: function (v) {
    _createSuper = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);
module.export({
  "default": function () {
    return Round;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var RightSidebar;
module.link("./RightSidebar.jsx", {
  "default": function (v) {
    RightSidebar = v;
  }
}, 1);
var LeftSidebar;
module.link("./LeftSidebar.jsx", {
  "default": function (v) {
    LeftSidebar = v;
  }
}, 2);
var Contribution;
module.link("./pages/contribution/Contribution.jsx", {
  "default": function (v) {
    Contribution = v;
  }
}, 3);
var Punishment;
module.link("./pages/punishment/Punishment.jsx", {
  "default": function (v) {
    Punishment = v;
  }
}, 4);
var Outcome;
module.link("./pages/outcome/Outcome.jsx", {
  "default": function (v) {
    Outcome = v;
  }
}, 5);
module.link("./Sidebar.css");
var roundSound = new Audio("sounds/round-sound.mp3");
var gameSound = new Audio("sounds/bell.mp3");

var Round = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Round, _React$Component);

  var _super = _createSuper(Round);

  function Round() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Round.prototype;

  _proto.componentDidMount = function () {
    function componentDidMount() {
      var game = this.props.game;

      if (game.get("justStarted")) {
        //play the bell sound only once when the game starts
        gameSound.play();
        game.set("justStarted", false);
      } else {
        roundSound.play();
      }
    }

    return componentDidMount;
  }();

  _proto.render = function () {
    function render() {
      var stage = this.props.stage;
      return /*#__PURE__*/React.createElement("div", {
        className: "round"
      }, /*#__PURE__*/React.createElement(RightSidebar, this.props), /*#__PURE__*/React.createElement("div", {
        className: "body-wrapper"
      }, stage.name === "contribution" && /*#__PURE__*/React.createElement(Contribution, this.props), stage.name === "outcome" && /*#__PURE__*/React.createElement(Punishment, this.props), stage.name === "summary" && /*#__PURE__*/React.createElement(Outcome, this.props)), /*#__PURE__*/React.createElement(LeftSidebar, this.props));
    }

    return render;
  }();

  return Round;
}(React.Component);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Sidebar.css":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/game/Sidebar.css                                                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
// These styles have already been applied to the document.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"exit":{"ExitSurvey.jsx":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/exit/ExitSurvey.jsx                                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _createSuper;

module.link("@babel/runtime/helpers/createSuper", {
  default: function (v) {
    _createSuper = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);
module.export({
  "default": function () {
    return ExitSurvey;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var Centered;
module.link("meteor/empirica:core", {
  Centered: function (v) {
    Centered = v;
  }
}, 1);

var Radio = function (_ref) {
  var selected = _ref.selected,
      name = _ref.name,
      value = _ref.value,
      label = _ref.label,
      onChange = _ref.onChange;
  return /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    value: value,
    checked: selected === value,
    onChange: onChange
  }), label);
};

var ExitSurvey = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(ExitSurvey, _React$Component);

  var _super = _createSuper(ExitSurvey);

  function ExitSurvey() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      age: "",
      gender: "",
      strength: "",
      fair: "",
      feedback: ""
    };

    _this.handleChange = function (event) {
      var _this$setState;

      var el = event.currentTarget;

      _this.setState((_this$setState = {}, _this$setState[el.name] = el.value, _this$setState));
    };

    _this.handleSubmit = function (event) {
      event.preventDefault();

      _this.props.onSubmit(_this.state);
    };

    return _this;
  }

  var _proto = ExitSurvey.prototype;

  _proto.render = function () {
    function render() {
      var _this$props = this.props,
          game = _this$props.game,
          player = _this$props.player;
      var _this$state = this.state,
          age = _this$state.age,
          gender = _this$state.gender,
          strength = _this$state.strength,
          fair = _this$state.fair,
          feedback = _this$state.feedback,
          education = _this$state.education;
      var earnings = Math.max((player.get("cumulativePayoff") / game.treatment.conversionRate).toFixed(2), 0);
      var basePay = game.treatment.basePay;
      var totalPay = (parseFloat(basePay) + parseFloat(earnings)).toFixed(2);
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

    return render;
  }();

  return ExitSurvey;
}(React.Component);

ExitSurvey.stepName = "ExitSurvey";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Sorry.jsx":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/exit/Sorry.jsx                                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _createSuper;

module.link("@babel/runtime/helpers/createSuper", {
  default: function (v) {
    _createSuper = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);
module.export({
  "default": function () {
    return Sorry;
  }
});
var React, Component;
module.link("react", {
  "default": function (v) {
    React = v;
  },
  Component: function (v) {
    Component = v;
  }
}, 0);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 1);
var Centered;
module.link("meteor/empirica:core", {
  Centered: function (v) {
    Centered = v;
  }
}, 2);

var Sorry = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Sorry, _Component);

  var _super = _createSuper(Sorry);

  function Sorry() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Sorry.prototype;

  _proto.render = function () {
    function render() {
      var _this$props = this.props,
          player = _this$props.player,
          game = _this$props.game;
      var basePay = game.treatment.basePay;
      var msg;

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

    return render;
  }();

  return Sorry;
}(Component);

Sorry.stepName = "Sorry";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Thanks.jsx":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/exit/Thanks.jsx                                                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _createSuper;

module.link("@babel/runtime/helpers/createSuper", {
  default: function (v) {
    _createSuper = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);
module.export({
  "default": function () {
    return Thanks;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var Centered;
module.link("meteor/empirica:core", {
  Centered: function (v) {
    Centered = v;
  }
}, 1);

var Thanks = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Thanks, _React$Component);

  var _super = _createSuper(Thanks);

  function Thanks() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Thanks.prototype;

  _proto.render = function () {
    function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "finished"
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Finished!"), /*#__PURE__*/React.createElement("p", null, "Thank you for participating! Please submit the following code: ", /*#__PURE__*/React.createElement("strong", null, "C2A8NL83"))));
    }

    return render;
  }();

  return Thanks;
}(React.Component);

Thanks.stepName = "Thanks";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"intro":{"Consent.jsx":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/intro/Consent.jsx                                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _createSuper;

module.link("@babel/runtime/helpers/createSuper", {
  default: function (v) {
    _createSuper = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);
module.export({
  "default": function () {
    return Consent;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var Centered, ConsentButton;
module.link("meteor/empirica:core", {
  Centered: function (v) {
    Centered = v;
  },
  ConsentButton: function (v) {
    ConsentButton = v;
  }
}, 1);

var Consent = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Consent, _React$Component);

  var _super = _createSuper(Consent);

  function Consent() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Consent.prototype;

  _proto.render = function () {
    function render() {
      return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
        className: "consent"
      }, /*#__PURE__*/React.createElement("h1", null, " Consent Form "), /*#__PURE__*/React.createElement("p", null, "This experiment is part of a MIT scientific project. Your decision to participate in this experiment is entirely voluntary. There are no known or anticipated risks to participating in this experiment. There is no way for us to identify you. The only information we will have, in addition to your responses, is the timestamps of your interactions with our site. The results of our research may be presented at scientific meetings or published in scientific journals. Clicking on the \"AGREE\" button indicates that you are at least 18 years of age, and agree to participate voluntary."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(ConsentButton, {
        text: "I AGREE"
      })));
    }

    return render;
  }();

  return Consent;
}(React.Component);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"InstructionStepOne.jsx":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/intro/InstructionStepOne.jsx                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _createSuper;

module.link("@babel/runtime/helpers/createSuper", {
  default: function (v) {
    _createSuper = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);
module.export({
  "default": function () {
    return InstructionStepOne;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
module.link("./Instructions.css");
var Centered;
module.link("meteor/empirica:core", {
  Centered: function (v) {
    Centered = v;
  }
}, 1);

var InstructionStepOne = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(InstructionStepOne, _React$Component);

  var _super = _createSuper(InstructionStepOne);

  function InstructionStepOne() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = InstructionStepOne.prototype;

  _proto.render = function () {
    function render() {
      var _this$props = this.props,
          hasPrev = _this$props.hasPrev,
          hasNext = _this$props.hasNext,
          onNext = _this$props.onNext,
          onPrev = _this$props.onPrev,
          game = _this$props.game;
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

    return render;
  }();

  return InstructionStepOne;
}(React.Component);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"InstructionStepTwo.jsx":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/intro/InstructionStepTwo.jsx                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _createSuper;

module.link("@babel/runtime/helpers/createSuper", {
  default: function (v) {
    _createSuper = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);
module.export({
  "default": function () {
    return InstructionStepTwo;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
module.link("./Instructions.css");
var Centered;
module.link("meteor/empirica:core", {
  Centered: function (v) {
    Centered = v;
  }
}, 1);

var InstructionStepTwo = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(InstructionStepTwo, _React$Component);

  var _super = _createSuper(InstructionStepTwo);

  function InstructionStepTwo() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = InstructionStepTwo.prototype;

  _proto.render = function () {
    function render() {
      var _this$props = this.props,
          hasPrev = _this$props.hasPrev,
          hasNext = _this$props.hasNext,
          onNext = _this$props.onNext,
          onPrev = _this$props.onPrev,
          game = _this$props.game;
      var punishmentMagnitude = game.treatment.punishmentMagnitude;
      var punishmentCost = game.treatment.punishmentCost;
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

    return render;
  }();

  return InstructionStepTwo;
}(React.Component);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Instructions.css":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/intro/Instructions.css                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
// These styles have already been applied to the document.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"NewPlayer.jsx":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/intro/NewPlayer.jsx                                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _createSuper;

module.link("@babel/runtime/helpers/createSuper", {
  default: function (v) {
    _createSuper = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);
module.export({
  "default": function () {
    return NewPlayer;
  }
});
var React, Component;
module.link("react", {
  "default": function (v) {
    React = v;
  },
  Component: function (v) {
    Component = v;
  }
}, 0);
var Centered;
module.link("meteor/empirica:core", {
  Centered: function (v) {
    Centered = v;
  }
}, 1);

var NewPlayer = /*#__PURE__*/function (_Component) {
  _inheritsLoose(NewPlayer, _Component);

  var _super = _createSuper(NewPlayer);

  function NewPlayer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      id: ""
    };

    _this.handleUpdate = function (event) {
      var _this$setState;

      var _event$currentTarget = event.currentTarget,
          value = _event$currentTarget.value,
          name = _event$currentTarget.name;

      _this.setState((_this$setState = {}, _this$setState[name] = value, _this$setState));
    };

    _this.handleSubmit = function (event) {
      event.preventDefault();
      var handleNewPlayer = _this.props.handleNewPlayer;
      var id = _this.state.id;
      handleNewPlayer(id);
    };

    return _this;
  }

  var _proto = NewPlayer.prototype;

  _proto.render = function () {
    function render() {
      var id = this.state.id;
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

    return render;
  }();

  return NewPlayer;
}(Component);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Quiz.jsx":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/intro/Quiz.jsx                                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _createSuper;

module.link("@babel/runtime/helpers/createSuper", {
  default: function (v) {
    _createSuper = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);
module.export({
  "default": function () {
    return Quiz;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var Centered;
module.link("meteor/empirica:core", {
  Centered: function (v) {
    Centered = v;
  }
}, 1);

var Quiz = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Quiz, _React$Component);

  var _super = _createSuper(Quiz);

  function Quiz() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      players: "",
      punishment: "",
      payoff: "",
      kept: ""
    };

    _this.handleChange = function (event) {
      var _this$setState;

      var el = event.currentTarget;

      _this.setState((_this$setState = {}, _this$setState[el.name] = el.value.trim().toLowerCase(), _this$setState));
    };

    _this.handleSubmit = function (players, punishmentMagnitude, punishmentExists) {
      return function (event) {
        event.preventDefault();

        if (_this.state.players !== String(players - 1) || _this.state.punishment !== String(2 * punishmentMagnitude) && punishmentExists || _this.state.payoff != "10" || _this.state.kept != "6") {
          alert("You have an incorrect answer; please read the instructions and try again.");
        } else {
          _this.props.onNext();
        }
      };
    };

    return _this;
  }

  var _proto = Quiz.prototype;

  _proto.render = function () {
    function render() {
      var _this$props = this.props,
          hasPrev = _this$props.hasPrev,
          hasNext = _this$props.hasNext,
          onNext = _this$props.onNext,
          onPrev = _this$props.onPrev,
          game = _this$props.game;
      var _this$state = this.state,
          players = _this$state.players,
          punishment = _this$state.punishment,
          payoff = _this$state.payoff,
          kept = _this$state.kept;
      var playerCount = game.treatment.playerCount;
      var punishmentExists = game.treatment.punishmentExists;
      var punishmentMagnitude = game.treatment.punishmentMagnitude;
      var punishmentCost = game.treatment.punishmentCost;
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

    return render;
  }();

  return Quiz;
}(React.Component);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"QuizCopy.jsx":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/intro/QuizCopy.jsx                                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _createSuper;

module.link("@babel/runtime/helpers/createSuper", {
  default: function (v) {
    _createSuper = v;
  }
}, 0);

var _inheritsLoose;

module.link("@babel/runtime/helpers/inheritsLoose", {
  default: function (v) {
    _inheritsLoose = v;
  }
}, 1);
module.export({
  "default": function () {
    return QuizCopy;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var Centered;
module.link("meteor/empirica:core", {
  Centered: function (v) {
    Centered = v;
  }
}, 1);

var QuizCopy = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(QuizCopy, _React$Component);

  var _super = _createSuper(QuizCopy);

  function QuizCopy() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      both: "",
      falseB: "",
      falseA: "",
      neither: ""
    };

    _this.onChangeValue = function (event) {
      var _this$setState;

      console.log(event.target.value);
      console.log(event.target.name);

      _this.setState((_this$setState = {}, _this$setState[event.target.name] = event.target.value, _this$setState));
    };

    _this.handleSubmit = function (event) {
      event.preventDefault();

      if (_this.state.both !== "220 points" || _this.state.falseB !== "105 points" || _this.state.falseA !== "205 points" || _this.state.neither !== "100 points") {
        alert("Incorrect! Read the instructions, and please try again.");
      } else {
        _this.props.onNext();
      }
    };

    return _this;
  }

  var _proto = QuizCopy.prototype;

  _proto.render = function () {
    function render() {
      var _this2 = this;

      var _this$props = this.props,
          hasPrev = _this$props.hasPrev,
          hasNext = _this$props.hasNext,
          onNext = _this$props.onNext,
          onPrev = _this$props.onPrev;
      var _this$state = this.state,
          both = _this$state.both,
          falseA = _this$state.falseA,
          falseB = _this$state.falseB,
          neither = _this$state.neither;
      var answerOptions = [{
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
      }, "Imagine that you contributed to the common pool. If Player B contributes, you get:"), answerOptions.map(function (answerOption) {
        return /*#__PURE__*/React.createElement("div", {
          onChange: _this2.onChangeValue
        }, /*#__PURE__*/React.createElement("input", {
          type: "radio",
          name: "both",
          value: answerOption.answerText
        }), answerOption.answerText);
      })), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", {
        htmlFor: "horse"
      }, "Imagine that you contributed to the common pool. If Player B doesn't contribute, you get:"), answerOptions.map(function (answerOption) {
        return /*#__PURE__*/React.createElement("div", {
          onChange: _this2.onChangeValue
        }, /*#__PURE__*/React.createElement("input", {
          type: "radio",
          name: "falseB",
          value: answerOption.answerText
        }), answerOption.answerText);
      })), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", {
        htmlFor: "sum"
      }, "Imagine that you didn't contribute to the common pool. If Player B contributes, you get:"), answerOptions.map(function (answerOption) {
        return /*#__PURE__*/React.createElement("div", {
          onChange: _this2.onChangeValue
        }, /*#__PURE__*/React.createElement("input", {
          type: "radio",
          name: "falseA",
          value: answerOption.answerText
        }), answerOption.answerText);
      })), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", {
        htmlFor: "sum"
      }, "Imagine that you didn't contribute to the common pool. If Player B doesn't contribute, you get:"), answerOptions.map(function (answerOption) {
        return /*#__PURE__*/React.createElement("div", {
          onChange: _this2.onChangeValue
        }, /*#__PURE__*/React.createElement("input", {
          type: "radio",
          name: "neither",
          value: answerOption.answerText
        }), answerOption.answerText);
      })), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: onPrev,
        disabled: !hasPrev
      }, "Back to instructions"), /*#__PURE__*/React.createElement("button", {
        type: "submit"
      }, "Submit")))));
    }

    return render;
  }();

  return QuizCopy;
}(React.Component);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"main.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/main.js                                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var Empirica;
module.link("meteor/empirica:core", {
  "default": function (v) {
    Empirica = v;
  }
}, 0);
var render;
module.link("react-dom", {
  render: function (v) {
    render = v;
  }
}, 1);
var ExitSurvey;
module.link("./exit/ExitSurvey", {
  "default": function (v) {
    ExitSurvey = v;
  }
}, 2);
var Thanks;
module.link("./exit/Thanks", {
  "default": function (v) {
    Thanks = v;
  }
}, 3);
var Sorry;
module.link("./exit/Sorry", {
  "default": function (v) {
    Sorry = v;
  }
}, 4);
var About;
module.link("./game/pages/about/About", {
  "default": function (v) {
    About = v;
  }
}, 5);
var Round;
module.link("./game/Round", {
  "default": function (v) {
    Round = v;
  }
}, 6);
var Consent;
module.link("./intro/Consent", {
  "default": function (v) {
    Consent = v;
  }
}, 7);
var InstructionStepOne;
module.link("./intro/InstructionStepOne", {
  "default": function (v) {
    InstructionStepOne = v;
  }
}, 8);
var InstructionStepTwo;
module.link("./intro/InstructionStepTwo", {
  "default": function (v) {
    InstructionStepTwo = v;
  }
}, 9);
var QuizCopy;
module.link("./intro/QuizCopy", {
  "default": function (v) {
    QuizCopy = v;
  }
}, 10);
var Quiz;
module.link("./intro/Quiz", {
  "default": function (v) {
    Quiz = v;
  }
}, 11);
var NewPlayer;
module.link("./intro/NewPlayer", {
  "default": function (v) {
    NewPlayer = v;
  }
}, 12);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 13);
// Set the About Component you want to use for the About dialog (optional).
Empirica.about(About); // Set the Consent Component you want to present players (optional).

Empirica.consent(Consent); // Set the component for getting the player id (optional)

Empirica.newPlayer(NewPlayer); // Introduction pages to show before they play the game (optional).
// At this point they have been assigned a treatment. You can return
// different instruction steps depending on the assigned treatment.

Empirica.introSteps(function (game, treatment) {
  var steps = [InstructionStepOne];

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

Empirica.exitSteps(function (game, player) {
  if (!game || player.exitStatus && player.exitStatus !== "finished" && player.exitReason !== "playerQuit") {
    return [Sorry];
  }

  return [ExitSurvey, Thanks];
});

var Breadcrumb = function (_ref) {
  var round = _ref.round,
      stage = _ref.stage,
      game = _ref.game;
  return /*#__PURE__*/React.createElement("ul", {
    className: "bp3-breadcrumbs round-nav"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    className: "bp3-breadcrumb",
    tabIndex: "0"
  }, "Round ", round.index + 1, game.treatment.showNRounds ? "/" + game.treatment.numRounds : "")), round.stages.map(function (s) {
    return /*#__PURE__*/React.createElement("li", {
      key: s.name,
      className: s.name === stage.name ? "bp3-breadcrumb-current" : "bp3-breadcrumb"
    }, s.displayName);
  }));
};

Empirica.breadcrumb(Breadcrumb); // Start the app render tree.
// NB: This must be called after any other Empirica calls (Empirica.round(),
// Empirica.introSteps(), ...).
// It is required and usually does not need changing.

Meteor.startup(function () {
  render(Empirica.routes(), document.getElementById("app"));
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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