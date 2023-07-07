import {ReactNode} from 'react'

const Card = ({children}: {children: ReactNode}) => {
	return (
		<div className='bg-white p-4 rounded-lg drop-shadow-lg my-4 w-[300px]'>
			{children}
		</div>
	)
}

export default Card
