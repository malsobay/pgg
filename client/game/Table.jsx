import React from 'react';
import "./Table.css";
import ListView from "./ListView.jsx";

export default class Table extends React.Component {
  render(){
    const { players, game, me, punishment } = this.props;
    
    return(
      <div className='TableWrapper'>
        <table className='Wrapper'>
          <tbody>
            <tr className='Tr'>
              <th className='Th'>Player</th>
              <th className='Th'>Contribution</th>
              {punishment && <>
              <th className='Th'>Deducted from</th>
              <th className='Th'>Deducted by</th>
              </>}
              <th className='Th'>Total round gains</th>
            </tr>

            {players.map((player, i) => {
              const punished = player.round.get("punished");
              const punishedBy = player.round.get("punishedBy");
              const contribution = player.round.get("contribution");
              const roundPayoff = player.round.get("roundPayoff");
              return(
                <tr className={i === 0 ? 'Tr back-gray' : 'Tr'} key={i}>
                  <td className='Td' >
                    <img src={player.get("avatar")} className="avatar" />
                  </td>
                  <td className='Td' ><h2>{contribution}</h2></td>
                  {punishment && 
                  <>
                    <td className='Td'>
                      <ListView
                        punishments={punished}
                        game={game}
                        className="punishment-social-view"
                        me={me}
                      />
                    </td>
                    <td className='Td' >
                      <ListView
                        punishments={punishedBy}
                        game={game}
                        className="punishment-social-view"
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
