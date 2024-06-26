import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount, selectCount } from '@/lib/redux/reducers/counter';

export function Counter() {
  const count = useSelector(selectCount)
  const dispatch = useDispatch()
  const [incrementAmount, setIncrementAmount] = useState(1)
    
  return (
    <div>
      <div>
        <button onClick={() => dispatch(decrement())}>
            -
        </button>
        <span>{count}</span>
        <button onClick={() => dispatch(increment())}>
            +
        </button>
      </div>
      <div>
        <input
            value={incrementAmount}
            onChange={e => setIncrementAmount(Number(e.target.value) || 0)}
        />
        <button
            onClick={() => dispatch(incrementByAmount(incrementAmount))}
        >
          Add Amount
        </button>
      </div>
    </div>
  )
}