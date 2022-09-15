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
            <tr className='Tr'>
              <th className='Th'>Player</th>
              <th className='Th'>Contribution</th>
              {punishment && <>
              <th className='th'>Punished</th>
              <th className='th'>Punished by</th>
              </>}
              <th className='Th'>Total round gains</th>
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
                  <td className='Td' ><h2>{contribution}</h2></td>
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
                  <td className='Td'><font color={roundPayoff > 0 ? "green":"red"}><h2>{roundPayoff}</h2></font></td>  
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
