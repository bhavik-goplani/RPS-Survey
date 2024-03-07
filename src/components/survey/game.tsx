'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { useSurvey } from '@/components/survey/survey-context'
import { Icons } from "@/components/icons"

interface Section {
    section_id: string
    rock_prob: number
    paper_prob: number
    scissor_prob: number
    trial_no: number
}

export function Game ( {onComplete, section_details, isLastTrial, onUserMadeChoice} : {onComplete: () => void, section_details: Section, isLastTrial: boolean, onUserMadeChoice: (choiceMade: boolean) => void}) {

    const context = useSurvey()
    const { survey_id } = context
    const { rock_prob, paper_prob, scissor_prob, section_id } = section_details
    const choices = ['rock', 'paper', 'scissors']
    const weights = [rock_prob, paper_prob, scissor_prob]

    const [userChoice, setUserChoice] = React.useState('')
    const [computerChoice, setComputerChoice] = React.useState('')
    const [result, setResult] = React.useState('')
    const [hasUserMadeChoice, setHasUserMadeChoice] = React.useState(false)
    const [gameStarted, setGameStarted] = React.useState(false);

    function handleUserChoice(choice: string) {
        setGameStarted(true)
        if (hasUserMadeChoice) return
        setUserChoice(choice)
        console.log('User Choice:', userChoice)
        const computerChoice = handleComputerChoice()
        setHasUserMadeChoice(true)
        if (isLastTrial) onUserMadeChoice(true)
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
        let result
        if (userChoice === computerChoice) result = 'tie'
        else if (
          (userChoice === 'rock' && computerChoice === 'scissors') ||
          (userChoice === 'scissors' && computerChoice === 'paper') ||
          (userChoice === 'paper' && computerChoice === 'rock')
        ) {
          result = 'user'
        } else {
          result = 'computer'
        }
        setResult(result)
        storeData(userChoice, computerChoice, result)

        setTimeout(() => {
            if (isLastTrial) {
                console.log('Section Complete')
            }
            else{
                onComplete()
            }
        }
        , 2000)
    }

    function storeData(userChoice: string, computerChoice: string|undefined, result: string) {
        const trialsData = JSON.parse(localStorage.getItem('trials') || '[]')
        trialsData.push({userChoice, computerChoice, result, survey_id, section_id})
        localStorage.setItem('trials', JSON.stringify(trialsData))
    }

    return (
    <div className='container mx-auto py-20'>
      {!gameStarted && (
      <div className='flex justify-center space-x-8'>
        <motion.button 
          onClick={() => handleUserChoice('rock')} 
          disabled={hasUserMadeChoice}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Icons.rock className= "h-64 w-64"/>
        </motion.button>
        <motion.button 
          onClick={() => handleUserChoice('paper')} 
          disabled={hasUserMadeChoice}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Icons.paper className='h-64 w-64'/>
        </motion.button>
        <motion.button 
          onClick={() => handleUserChoice('scissors')} 
          disabled={hasUserMadeChoice}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Icons.scissors className='h-64 w-64'/>
        </motion.button>
      </div>
      )}
      {gameStarted && userChoice && computerChoice && (
        <div className='flex justify-center space-x-8'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {userChoice === 'rock' && <Icons.rock className='h-64 w-64'/>}
            {userChoice === 'paper' && <Icons.paper className='h-64 w-64'/>}
            {userChoice === 'scissors' && <Icons.scissors className='h-64 w-64'/>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {computerChoice === 'rock' && <Icons.rock className='h-64 w-64'/>}
            {computerChoice === 'paper' && <Icons.paper className='h-64 w-64'/>}
            {computerChoice === 'scissors' && <Icons.scissors className='h-64 w-64'/>}
          </motion.div>
        </div>
      )}

      {result && (
        <motion.div
          className="text-6xl font-semibold tracking-tight flex justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 20, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 12, textAlign: 'center', duration: 0.5, delay: 1}}
        >
          {result === 'user' && <p>You won!</p>}
          {result === 'computer' && <p>Computer won!</p>}
          {result === 'tie' && <p>It&apos;s a tie!</p>}
        </motion.div>
      )}
    </div>
    )
}