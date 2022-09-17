import React from 'react';
import "./Table.css";
import ListView from "./ListView.jsx";


export default class Table extends React.Component {
  render(){
    const { players, game, me, punishment } = this.props;
    
    return(
      <div className='table-wrapper'>
        <table className='wrapper'>
          <tbody>
            <tr className='tr'>
              <th className='th'>Player</th>
              <th className='th'>Contribution</th>
              {punishment && <>
              <th className='th'>Deducted from</th>
              <th className='th'>Deducted by</th>
              </>}
              <th className='th'>Total round gains</th>
            </tr>

            {players.map((player, i) => {
              const punished = player.round.get("punished");
              const punishedBy = player.round.get("punishedBy");
              const contribution = player.round.get("contribution");
              const roundPayoff = player.round.get("roundPayoff");
              return(
                <tr className={i === 0 ? 'tr back-gray' : 'tr'} key={i}>
                  <td className='td' >
                    <img src={player.get("avatar")} className="avatar" />
                  </td>
                  <td className='td'><h2>{contribution}</h2></td>
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
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
