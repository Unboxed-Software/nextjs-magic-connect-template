import React, {useCallback, useState} from 'react'
import Loading from 'public/loading.svg'
import {useMagicContext} from '@/components/magic/MagicProvider'
import Image from 'next/image'

interface Props {
	setAccount: React.Dispatch<React.SetStateAction<string | null>>
}

const Disconnect = ({setAccount}: Props) => {
	const {magic} = useMagicContext()
	const [disabled, setDisabled] = useState(false)

	const disconnect = useCallback(async () => {
		if (!magic) return
		try {
			setDisabled(true)
			await magic.wallet.disconnect()
			localStorage.removeItem('user')
			setDisabled(false)
			setAccount(null)
		} catch (error) {
			setDisabled(false)
			console.error(error)
		}
	}, [magic, setAccount])

	return (
		<div className='text-left'>
			<button
				className='w-fit text-[#522fd4] bg-[#edebff] text-base cursor-pointer font-medium transition-[0.1s]
				h-8 px-3 py-1.5 rounded-[32px] border-[none] active:enabled:opacity-50 active:enabled:scale-[0.99] font-[monospace]
				hover:enabled:bg-gradient-to-r from-[#0000000d] to-[#0000000d] active:enabled:bg-[#0000000d]'
				onClick={disconnect}
				disabled={disabled}>
				{disabled ? (
					<div className='w-[115px] text-center flex items-center justify-center cursor-default'>
						<Image
							className='animate-spin cursor-default'
							alt='loading'
							src={Loading}
						/>
					</div>
				) : (
					'disconnect()'
				)}
			</button>
			<div className='text-[#77767a] text-left text-sm mt-2.5'>
				Disconnects user from dApp.
			</div>
		</div>
	)
}

export default Disconnect
