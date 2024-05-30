import React, { useEffect, useRef, useState } from "react";
import Woman from '../../assets/Woman.jpg'
import classes from './message.module.css'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js'

const Message = ({ messages, own, message }) => {

    const { user } = useSelector((state) => state.auth);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <>
        {!own && 
            <div ref={ref} className={classes.container}>
                <div className={classes.wrapper}>
                    <img src={Woman} className={classes.personImg} />
                    <div className={classes.messageAndTimeAgo}>
                        <div className={classes.text}>{message.messageText}</div>
                        <span className={classes.timeAgo}>{format(message.createdAt)}</span>
                    </div>
                </div>
            </div>
        }
        { own &&
            <div ref={ref} className={`${classes.container} ${classes.own}`}>
                <div className={classes.wrapper}>
                    <div className={classes.messageAndTimeAgo}>
                        <div className={classes.text}>{message.messageText}</div>
                        <span className={classes.timeAgo}>{format(message.createdAt)}</span>
                    </div>
                    <img src={`http://localhost:4000/${user.image}`} className={classes.personImg} />
                </div>
            </div>
        }
        </>
    )
}

export default Message
