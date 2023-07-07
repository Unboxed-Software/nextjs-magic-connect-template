import Spinner from '@/components/card/Spinner'
import {useMagic} from '@/components/provider/MagicProvider'
import Toast from '@/utils/Toast'
import {recoverPersonalSignature} from '@metamask/eth-sig-util'
import {useCallback, useEffect, useState} from 'react'

const SignMessage = () => {
	const {web3} = useMagic()

	const [account, setAccount] = useState<string | null>(null)
	const [message, setMessage] = useState<string | null>(null)
	const [disabled, setDisabled] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setAccount(localStorage.getItem('user'))
	}, [])

	useEffect(() => {
		setDisabled(!message)
	}, [message])

	const handleSendMessage = useCallback(async () => {
		try {
			const signedMessage = await web3?.eth.personal.sign(
				message!,
				account!,
				''
			)

			const recoveredAddress = recoverPersonalSignature({
				data: message!,
				signature: signedMessage as string,
			})

			if (
				recoveredAddress.toLocaleLowerCase() ==
				account?.toLocaleLowerCase()
			) {
				setMessage('')
				Toast({message: 'Message signed', type: 'success'})
			} else {
				Toast({message: 'Message signing failed', type: 'error'})
			}
		} catch (error) {
			console.log(
				`Error signing personal message ${JSON.stringify(error)}`
			)
			Toast({message: 'Something went wrong', type: 'error'})
		} finally {
			setLoading(false)
		}
	}, [web3, message])

	return (
		<div className='my-4'>
			<div className='flex flex-col items-center justify-center'>
				<input
					onChange={(e) => setMessage(e.target.value)}
					placeholder='Personal Message'
					value={message as string}
					className='p-2 border-solid border-[1px] border-[#A799FF] rounded-lg w-full my-2'
				/>
				<button
					className='w-full rounded-3xl px-8 py-2 bg-[#A799FF]/[0.7] disabled:bg-gray-200 enabled:hover:bg-[#A799FF] text-center text-white font-medium disabled:cursor-default cursor-pointer flex items-center justify-center'
					disabled={disabled}
					onClick={() => {
						setLoading(true)
						handleSendMessage()
					}}>
					{loading ? <Spinner /> : 'Send Transaction'}
				</button>
			</div>
		</div>
	)
}

export default SignMessage
