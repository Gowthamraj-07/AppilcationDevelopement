import React, { useContext } from 'react';

import { ChatEngine } from 'react-chat-engine';
import { MyContext } from '../../MyContext';
export default function GroupChatComponent() {
    const {userdetails}=useContext(MyContext)
    
    console.log(userdetails.userName)
    console.log(userdetails.password)
	return (
		<div style={{margin:'50px 0'}}>

		<ChatEngine
			projectID='2b57e581-62e7-4736-9cd7-0bd0291860bf'
			userName={userdetails.userName}
			userSecret={userdetails.password}
		/>
		</div>
	);
}

