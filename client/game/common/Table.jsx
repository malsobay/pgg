import React from 'react';
import "./Table.css";
import ListView from "./ListView.jsx";


export default class Table extends React.Component {
  render(){
    const { players, game, me, punishment, round} = this.props;
    const poolPayoff = round.get("payoff");

    return(
      <div className='table-wrapper'>
        <table className='wrapper'>
          <tbody>
            <tr className='tr'>
              <th className='th'>Player</th>
              <th className='th'>Remaining coins<br></br>in round</th>
              <th className='th'>Share of public<br></br>fund payoff</th>
              {punishment && <>
              <th className='th'>Deductions given <br></br> (-{game.treatment.punishmentCost} coins each)</th>
              <th className='th'>Deductions received <br></br> (-{game.treatment.punishmentMagnitude} coins each)</th>
              </>}
              <th className='th'>Total round gains</th>
            </tr>

            {players.map((player, i) => {
              const punished = player.round.get("punished");
              const punishedBy = player.round.get("punishedBy");
              const contribution = player.round.get("contribution");
              const endowment = game.treatment.endowment;
              const roundPayoff = player.round.get("roundPayoff");

              if (i == 0 || game.treatment.showOtherSummaries){
                if (game.treatment.showPunishmentId){
                  return(
                      <tr className={i === 0 ? 'tr back-gray' : 'tr'} key={i}>
                        <td className='td' >
                          <img src={player.get("avatar")} className="avatar" />
                        </td>

                        <td className='td'><h2>{endowment - contribution}</h2></td>
                        <td className='td'><h2>{poolPayoff}</h2></td>
                        {punishment && 
                          <>
                          <td className='td'>
                            <ListView
                              punishments={punished}
                              game={game}
                              me={me}
                            />
                            
                          </td>
                          <td className='td' >
                            <ListView
                              punishments={punishedBy}
                              game={game}
                              me={me}
                            />
                          </td>
                        </>
                        } 
                        <td className='td'><font color={roundPayoff > 0 ? "green":"red"}><h2>{roundPayoff}</h2></font></td>  
                      </tr>
                  )
                  }
                else{
                  return(
                    <tr className={i === 0 ? 'tr back-gray' : 'tr'} key={i}>
                      <td className='td' >
                        <img src={player.get("avatar")} className="avatar" />
                      </td>
                      <td className='td'><h2>{endowment - contribution}</h2></td>
                      <td className='td'><h2>{poolPayoff}</h2></td>
                      {punishment && 
                        <>
                        <td className='td'>
                          <h2>{Object.values(punished).reduce((a, b) => parseInt(a) + parseInt(b), 0)}</h2>
                        </td>
                        <td className='td'>
                          <h2>{Object.values(punishedBy).reduce((a, b) => parseInt(a) + parseInt(b), 0)}</h2>
                        </td>
                      </>
                      } 
                      <td className='td'><font color={roundPayoff > 0 ? "green":"red"}><h2>{roundPayoff}</h2></font></td>  
                    </tr>
                )
                }
            }})
            }
          </tbody>
        </table>
      </div>
    )
  }
}
