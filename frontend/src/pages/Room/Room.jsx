import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useWebRTC } from '../../hooks/useWebRTC';
import { useParams, useHistory } from 'react-router-dom';
import { getRoom } from '../../http';

import styles from './Room.module.css';

const Room = () => {
    const { id: roomId } = useParams();
    const user = useSelector((state) => state.auth.user);
    const { clients, provideRef } = useWebRTC(roomId, user);
    const [ numberOfClients, setNumberOfClients ] = useState(clients);

useEffect(() => {
    setNumberOfClients(() => {
        return [...new Set(clients)];
    })
  }, [clients])

    return (
        <div>
            <h1>All connected clients </h1>
        { numberOfClients.map((client) => {
                return (
                    <div key={client.id}>
                        <audio 
                          ref={(instance) => provideRef(instance, client.id)} 
                          controls 
                          autoPlay 
                        ></audio>
                        <h4>{client.name}</h4>
                    </div>
                  )
                })
              }
            



        </div>
                
    
    );
};

export default Room;
