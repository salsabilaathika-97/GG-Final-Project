import React from 'react'
import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    root:{
        fontWeight: props => props.active ? 'bolder' : 'normal',
        fontSize: props => props.active ? 18 : 15
    },
})

function TbButton({btnText, active, onClick}) {
    const classes = useStyles({active});
    return (
        <div>
            <Button className={classes.root} color="inherit" onClick={onClick}>{btnText}</Button>
        </div>
    )
}

export default TbButton
