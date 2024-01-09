import { useState, useEffect } from 'react'

import styles from './Message.module.css'
function Message({type, msg}) {
    console.log('eae')

    const [visible, setVisible] = useState(false)

    useEffect(()=>{

        if (!msg){
            console.log("SEM MENSAGEM")
            setVisible(false)
            return
        }
        console.log("COM MENSAGEM")

        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)

        return () => {clearTimeout(timer)}
    }, [msg])

    return (
        <>
            {visible && (
                <div className={`${styles.message} ${styles[type]}`}>    
                {msg}
                </div>
            )}
        </>
    )
}

export default Message