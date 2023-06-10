import React from "react";
import { Button } from "../components/NormalButton";

import { Centered } from "meteor/empirica:core";

const Radio = ({ selected, name, value, label, onChange }) => (
  <label className="flex space-x-1">
    <input
      type="radio"
      name={name}
      value={value}
      checked={selected === value}
      onChange={onChange}
    />
    <div>{label}</div>
  </label>
);

export default class ExitSurvey extends React.Component {
  static stepName = "ExitSurvey";
  state = { age: "", gender: "", strength: "", fair: "", feedback: "" };

  handleChange = (event) => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    const { game, player } = this.props;
    const { age, gender, strength, fair, feedback, education } = this.state;
    const earnings = Math.max(
      (player.get("cumulativePayoff") / game.treatment.conversionRate).toFixed(
        2
      ),
      0
    );
    
    const basePay = game.treatment.basePay;
    const totalPay = (parseFloat(basePay) + parseFloat(earnings)).toFixed(2);
    return (
      <Centered>
        <div className="prose pb-8">
          <h1> Exit Survey </h1>
          {/* <p>
            Please submit the following code to receive your bonus:{" "}
            <strong>C2A8NL83</strong>
          </p> */}
          {/*<p>Earnings: {earnings}</p>*/}
          {/* {player.urlParams.source == "prolific" ? <p>Your completion code is <strong>C2A8NL83</strong></p> : <></>} */}
          <p>Thank you for participating!</p>
          <p>
            You will receive a participation bonus of <strong>${basePay}</strong>, in
            addition to a performance bonus of <strong>${earnings}</strong>, for
            a total of <strong>${totalPay}</strong>. You will also receive a bonus to compensate for time spent waiting in the lobby, at a rate of $15/hr. 
          </p>
          <p>Please do not share information about this experiment with anyone else, as it compromises the integrity of the experiment.</p>
          {/*
          <p>
            Your final <strong>bonus</strong> is $7 in addition of the{" "}
            <strong> ${basePay} reward</strong> for completing the HIT.
    </p>*/}
          {/*}
          <p>
            Your final <strong>bonus</strong> is in addition of the{" "}
            <strong>1 base reward</strong> for completing the HIT.
    </p>*/}
          <br />
          <p>
            Please answer the following short survey. You do not have to provide
            any information you feel uncomfortable with.
          </p>
          <form onSubmit={this.handleSubmit}>
            <div className="form-line">
              <div>
                <label className="block mt-4 mb-2" htmlFor="age">
                  Age
                </label>
                <div>
                  <input
                    id="age"
                    type="number"
                    min="0"
                    max="150"
                    step="1"
                    dir="auto"
                    name="age"
                    value={age}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="block mt-4 mb-2" htmlFor="gender">
                  Gender
                </label>
                <div>
                  <input
                    id="gender"
                    type="text"
                    dir="auto"
                    name="gender"
                    value={gender}
                    onChange={this.handleChange}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block mt-4 mb-2">
                Highest Education Qualification
              </label>
              <div className="flex space-x-2">
                <Radio
                  selected={education}
                  name="education"
                  value="high-school"
                  label="High School"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={education}
                  name="education"
                  value="bachelor"
                  label="US Bachelor's Degree"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={education}
                  name="education"
                  value="master"
                  label="Master's or higher"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={education}
                  name="education"
                  value="other"
                  label="Other"
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-line thirds">
              <div>
                <label className="block mt-4 mb-2" htmlFor="strength">
                  How would you describe your strategy in the game?
                </label>
                <div>
                  <textarea
                    dir="auto"
                    id="strength"
                    name="strength"
                    value={strength}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="block mt-4 mb-2" htmlFor="fair">
                  Do you feel you were fairly compensated for your time?
                </label>
                <div>
                  <textarea
                    dir="auto"
                    id="fair"
                    name="fair"
                    value={fair}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="block mt-4 mb-2" htmlFor="feedback">
                  Feedback, including problems you encountered.
                </label>
                <div>
                  <textarea
                    dir="auto"
                    id="feedback"
                    name="feedback"
                    value={feedback}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit">Next</Button>
            </div>
          </form>
        </div>
      </Centered>
    );
  }
}
