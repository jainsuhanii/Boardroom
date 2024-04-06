import { useState, useRef, useEffect, useCallback } from 'react';
import { useStateWithCallback } from './useStateWithCallback';
import {socketInit} from '../socket/index';
import { ACTIONS } from '../actions';

export const useWebRTC = (roomId, user) => {
    const [clients, setClients]= useStateWithCallback([]);
    const audioElements = useRef({});
    const connections = useRef({});
    const localMediaStream = useRef(null);
    const socket = useRef(null);
    
    useEffect(() =>{
        socket.current = socketInit();
    },[])

    const addNewClients = useCallback(
        (newClient, cb) => {
            const lookingFor = clients.find((client) => client.id === newClient.id);
            if (lookingFor === undefined){
                setClients((existingClients) => [...existingClients, newClient], 
                cb
            );}

        },
        [clients, setClients]
    );

    //capture media
    useEffect(() => {   
        const startCapture = async() => {
            localMediaStream.current = 
            await navigator.mediaDevices.getUserMedia({
                audio: true
            });
        };
        startCapture().then((stream) => {
            addNewClients(user, ()=>{
                const localElement = audioElements.current[user.id];
                if (localElement){
                    localElement.volume = 0;
                    localElement.srcObject = localMediaStream.current;
                }

                // socket emit JOIN socket.io
                socket.current.emit(ACTIONS.JOIN, {});

            })
        })
    }, []);

    const provideRef = (instance, userId) => {
        audioElements.current[userId] = instance;

};
    return {clients, provideRef};
};

