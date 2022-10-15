import React from "react";
import { AddCoins, AddCoinsArrows, AddCoinsPurse } from "./AddCoins";

export function AddingCoins() {
  return (
    <div className="grid grid-cols-3 grid-flow-row h-full justify-center">
      <AddingCoinsTester purse={20} multiplier={3} />
      <AddingCoinsTester purse={2500} multiplier={32} />
      <AddingCoinsTester purse={1} multiplier={1} />
    </div>
  );
}

class AddingCoinsTester extends React.Component {
  state = { contributed: 0 };
  render() {
    const { purse, multiplier } = this.props;
    return (
      <div className="h-screen flex justify-center">
        <AddCoins
          header={`You can contribute up to ${purse} coins this round`}
          footer={`The pot will be multiplied by ${multiplier}× and divided equally among the group at the end of the round`}
          purse={purse}
          multiplier={multiplier}
          contributed={this.state.contributed}
          onClick={(amount) =>
            this.setState({ contributed: this.state.contributed + amount })
          }
        />
      </div>
    );
  }
}

export function Elements() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="px-16 w-1/3">
        <AddCoins
          header="You can contribute up to 20 coins this round"
          footer="The pot will be multiplied by x3 and divided equally among the group at the end of the round"
          purse={20}
          multiplier={3}
          contributed={5}
          onClick={(amount) => console.log(`Added ${amount}`)}
        />
      </div>
      <AddCoinsPurse amount={0} />
      <AddCoinsPurse amount={12} />
      <AddCoinsPurse amount={125} />
      <AddCoinsPurse amount={7890} />
      <AddCoinsPurse amount={111} />
      <AddCoinsArrows
        onClick={(amount) => console.log(`Added ${amount}`)}
        canAdd1
        canAdd10
        canRemove1
        canRemove10
      />
      <AddCoinsArrows
        onClick={(amount) => console.log(`Added ${amount}`)}
        canAdd1
        canRemove1
      />
      <AddCoinsArrows
        onClick={(amount) => console.log(`Added ${amount}`)}
        canAdd10
        canRemove10
      />
    </div>
  );
}
