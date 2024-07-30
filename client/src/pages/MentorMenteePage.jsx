import { MentorMenteePairing, AnimationLayout} from "../components";
import React from 'react';

const MentorMenteeMatchingPage = () => {
    return (
        <AnimationLayout>
            <div className='navy-bg'>
            <MentorMenteePairing />
            </div>
        </AnimationLayout>
    )
}

export default MentorMenteeMatchingPage;