import { MentorMenteePairing} from "../components";
import React, {useEffect} from 'react';

const MentorMenteeMatchingPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <div className='navy-bg'>
            <MentorMenteePairing />
        </div>
    )
}

export default MentorMenteeMatchingPage;