import CardBody from '@/components/card/CardBody'
import Spinner from '@/components/card/Spinner'
import {useMagic} from '@/components/provider/MagicProvider'
import Toast from '@/utils/Toast'
import {error} from 'console'
import {useCallback, useEffect, useState} from 'react'
import Web3, {Transaction} from 'web3'
import {isAddress} from 'web3-validator'

const SendTransaction = () => {
	const {web3, magic} = useMagic()

	const [account, setAccount] = useState<string | null>(null)
	const [receiver, setReceiver] = useState<string | null>(null)
	const [receiverError, setReceiverError] = useState(false)
	const [amount, setAmount] = useState<number | null>(null)
	const [disabled, setDisabled] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setAccount(localStorage.getItem('user'))
	}, [])

	useEffect(() => {
		console.log('loading: ' + loading)
	}, [loading])

	useEffect(() => {
		setDisabled(
			receiver == null ||
				receiver.length == 0 ||
				amount == null ||
				amount <= 0
		)

		if (receiverError) {
			setReceiverError(false)
		}
	}, [receiver, amount])

	const handleSendTransaction = useCallback(() => {
		setDisabled(true)
		if (!isAddress(receiver as string)) {
			setReceiverError(true)
		} else {
			setLoading(true)
			const transactionParams: Transaction = {
				from: account!,
				to: receiver,
				gas: 21000,
				value: web3?.utils.toWei(amount! as unknown as number, 'ether'),
			}

			web3?.eth
				.sendTransaction(transactionParams)
				.on('transactionHash', (hash) => {
					Toast({
						message: 'Transaction success with hash: ' + hash,
						type: 'success',
					})
					setReceiver(null)
					setAmount(null)
				})
				.catch((error) => {
					debugger
					console.log('send tsx error: ' + JSON.stringify(error))
					Toast({
						message: 'Transaction failed',
						type: 'error',
					})
				})
				.finally(() => {
					setDisabled(false)
					setLoading(false)
				})
		}
	}, [web3, amount, receiver])

	return (
		<div className='my-4'>
			<div className='flex items-center justify-center'>
				<a
					className='w-full rounded-3xl px-8 py-2 bg-[#A799FF]/[0.7] text-center text-white font-medium hover:bg-[#A799FF] cursor-pointer'
					href='https://faucet.polygon.technology/'
					target='_blank'>
					Get Test Matic
				</a>
			</div>
			<hr className='mt-2 bg-[#BDBDBD]' />
			<div className='flex flex-col items-center justify-center'>
				<input
					onChange={(e) => setReceiver(e.target.value)}
					placeholder='Receiver Address'
					value={receiver as string}
					className='p-2 border-solid border-[1px] border-[#A799FF] rounded-lg w-full mt-2 mb-1'
				/>
				{receiverError && (
					<span className='text-xs text-red-700 justify-self-start self-start'>
						Enter a valid address
					</span>
				)}
				<input
					onChange={(e) =>
						setAmount(e.target.value as unknown as number)
					}
					value={amount as number}
					type='number'
					placeholder='Amount (ETH)'
					className='p-2 border-solid border-[1px] border-[#A799FF] rounded-lg w-full my-2'
				/>
				<button
					className='w-full rounded-3xl px-8 py-2 bg-[#A799FF]/[0.7] disabled:bg-gray-200 disabled:bg-gray-200 enabled:hover:bg-[#A799FF] text-center text-white font-medium disabled:cursor-default cursor-pointer flex items-center justify-center'
					disabled={disabled}
					onClick={handleSendTransaction}>
					{loading ? <Spinner /> : 'Send Transaction'}
				</button>
			</div>
		</div>
	)
}

export default SendTransaction
