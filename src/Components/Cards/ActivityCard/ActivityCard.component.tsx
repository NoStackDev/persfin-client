import React from 'react'

import "./ActivityCard.style.scss"

type Props = {
    title: string;
    _type: string;
    _date: string;
    _time: string;
    amount: number;
}


const ActivityCard = (props: Props) => {
  return (
    <div>ActivityCard</div>
  )
}

export default ActivityCard