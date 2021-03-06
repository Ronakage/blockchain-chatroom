import { useRef } from "react";
import { ByMoralis, useMoralis, useMoralisQuery } from "react-moralis";
import Message from "./Message";
import SendMessage from "./SendMessage";

const DURATION = 1440;

function Messages() {
    const {user} = useMoralis();
    const endOfMessagesRef = useRef(null);
    const  { data, error } = useMoralisQuery(
        'Messages',
        (query) => query.ascending('createdAt').greaterThan('createdAt', new Date(Date.now() - 1000 * 60 * DURATION)),
        [],
        {
            live: true,
        }
    );


    return (
        <div>
            <div className="pb-56">

                <div className="space-y-10 p-4">
                    {/* Each Message */}
                    {data.map(message => (
                        <Message key={message.id} message={message}/>
                    ))}
                </div>

                <div className="flex justify-center">
                    <SendMessage endOfMessagesRef={endOfMessagesRef}/>
                </div>

                <div ref={endOfMessagesRef} className="text-center text-gray-600 mt-5">
                    <p>You're up-to-date {user.getUsername()}! 🎉</p>
                </div>

            </div>
        </div>
    )
}

export default Messages;
