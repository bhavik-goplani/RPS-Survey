'use client'
import * as React from 'react';


export const SurveyContext = React.createContext({
    participant_id: '',
    survey_id: '',
    sections: [
        {
            section_id: '',
            rock_prob: 0,
            paper_prob: 0,
            scissor_prob: 0,
            trial_no: 0,
        },
    ],
});

export const useSurvey = () => {
    const context = React.useContext(SurveyContext);
    if (!context) {
        throw new Error('useSurvey must be used within a SurveyProvider');
    }
    return context;
}