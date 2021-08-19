import React from 'react'

function ProfileCard() {
            const dataUser = localStorage.getItem("USERDATA") ? JSON.parse(localStorage.getItem("USERDATA")) : {};
      
    return (
        <div>
            {dataUser !== {} && (<div style={{padding:5, borderLeftStyle:'solid',borderLeftWidth: 1, marginLeft:15}}>
                <div style = {{display:'flex',flexDirection:'row'}}>
                    <input type = "image" img src = {dataUser.images[0].url} style={{width:25, height:25, borderRadius:25/2, marginRight:5}} alt = "Profile Image"/>
                    {dataUser.display_name}
                </div>
        </div>)}
        </div>
    )
}

export default ProfileCard
