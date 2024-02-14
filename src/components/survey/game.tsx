'use client'

import * as React from 'react'
import { Button } from "@/components/ui/button"
import { useSurvey } from '@/components/survey/survey-context'

interface Section {
    section_id: string
    rock_prob: number
    paper_prob: number
    scissor_prob: number
    trial_no: number
}

export function Game ( {onComplete, section_details, isLastTrial} : {onComplete: () => void, section_details: Section, isLastTrial: boolean}) {

    const context = useSurvey()
    const { rock_prob, paper_prob, scissor_prob } = section_details
    const choices = ['rock', 'paper', 'scissors']
    const weights = [rock_prob, paper_prob, scissor_prob]
    console.log('Weights:', weights)

    const [userChoice, setUserChoice] = React.useState('')
    const [computerChoice, setComputerChoice] = React.useState('')
    const [result, setResult] = React.useState('')
    const [hasUserMadeChoice, setHasUserMadeChoice] = React.useState(false)

    function handleUserChoice(choice: string) {
        if (hasUserMadeChoice) return
        setUserChoice(choice)
        console.log('User Choice:', userChoice)
        const computerChoice = handleComputerChoice()
        setHasUserMadeChoice(true)
        handleResult(choice, computerChoice)
    }

    function handleComputerChoice() {
        const cumulativeWeights: number[] = [];

        for (let i = 0; i < weights.length; i++) {
            cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
        }
        
        const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
        const randomNumber = Math.random() * maxCumulativeWeight;
        
        for (let choicesIndex = 0; choicesIndex < choices.length; choicesIndex++) {
            if (cumulativeWeights[choicesIndex] >= randomNumber) {
                const computerChoice = choices[choicesIndex]
                setComputerChoice(computerChoice)
                console.log('Computer Choice:', computerChoice)
                return computerChoice;
            }
        }
    }

    function handleResult(userChoice: string, computerChoice: string|undefined) {
        if (userChoice === computerChoice) setResult('Tie!')
        else if (
          (userChoice === 'rock' && computerChoice === 'scissors') ||
          (userChoice === 'scissors' && computerChoice === 'paper') ||
          (userChoice === 'paper' && computerChoice === 'rock')
        ) {
          setResult('You Win!')
        } else {
          setResult('You Lose!')
        }

        setTimeout(() => {
            if (isLastTrial) {
                console.log('Survey Complete')
            }
            else{
                onComplete()
            }
        }
        , 2000)

    }

    function handleComplete() {
        if (isLastTrial) {
            console.log('Survey Complete')
        }
        else{
            onComplete()
        }
    }

    return (
        <div>
      <h3>Rock, Paper, Scissors</h3>
      <div>
        <Button onClick={() => handleUserChoice('rock')} disabled={hasUserMadeChoice}>Rock</Button>
        <Button onClick={() => handleUserChoice('paper')} disabled={hasUserMadeChoice}>Paper</Button>
        <Button onClick={() => handleUserChoice('scissors')} disabled={hasUserMadeChoice}>Scissors</Button>
      </div>
      {userChoice && computerChoice && result && (
        <div>
          <p>User Choice: {userChoice}</p>
          <p>Computer Choice: {computerChoice}</p>
          <p>Result: {result}</p>
        </div>
      )}
      <div className="fixed bottom right-4 m-6">
        { isLastTrial && hasUserMadeChoice ? (
            <Button onClick={handleComplete}>
                Next Section
            </Button>
        ) : (
            <></>
        )
        }
    </div>
    </div>
    )
}